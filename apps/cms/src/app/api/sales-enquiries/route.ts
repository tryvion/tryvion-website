import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ENQUIRY_TYPES = [
  'Services & Solutions',
  'Commercial Enquiries',
  'Existing Opportunities',
  'Partnerships',
  'General Enquiries',
] as const

type EnquiryType = (typeof ENQUIRY_TYPES)[number]

function isEnquiryType(value: string): value is EnquiryType {
  return ENQUIRY_TYPES.includes(value as EnquiryType)
}

const MAX_BODY_BYTES = 32_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 8

type RateEntry = {
  count: number
  resetAt: number
}

const globalStore = globalThis as typeof globalThis & {
  __tryvionSalesEnquiryRateLimit?: Map<string, RateEntry>
}

const rateLimit = globalStore.__tryvionSalesEnquiryRateLimit ?? new Map<string, RateEntry>()

globalStore.__tryvionSalesEnquiryRateLimit = rateLimit

function getClientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  return (forwarded?.split(',')[0]?.trim() || realIp || 'unknown').slice(0, 120)
}

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = rateLimit.get(key)

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return true
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false
  }

  current.count += 1
  return true
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value: string) {
  if (!value) return true
  return value.length >= 7 && value.length <= 40 && /^[+0-9().\-\s]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)

    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request is too large.',
        },
        { status: 413 },
      )
    }

    if (!checkRateLimit(getClientKey(request))) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many submissions. Please try again later.',
        },
        { status: 429 },
      )
    }

    const body = (await request.json()) as Record<string, unknown>

    const fullName = text(body.fullName)
    const jobTitle = text(body.jobTitle)
    const company = text(body.company)
    const countryRegion = text(body.countryRegion)
    const workEmail = text(body.workEmail).toLowerCase()
    const enquiryType = text(body.enquiryType)
    const phone = text(body.phone)
    const message = text(body.message)
    const website = text(body.website)
    const privacyConsent = body.privacyConsent === true
    const marketingConsent = body.marketingConsent === true

    // Honeypot: never create a record for automated submissions.
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Thank you. Your enquiry has been received.',
      })
    }

    if (fullName.length < 2 || fullName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please enter your full name.' },
        { status: 400 },
      )
    }

    if (jobTitle.length > 150) {
      return NextResponse.json(
        { success: false, message: 'Job title must be 150 characters or fewer.' },
        { status: 400 },
      )
    }

    if (company.length < 2 || company.length > 150) {
      return NextResponse.json(
        { success: false, message: 'Please enter your company name.' },
        { status: 400 },
      )
    }

    if (countryRegion.length < 2 || countryRegion.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please enter your country or region.' },
        { status: 400 },
      )
    }

    if (!isValidEmail(workEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid business email address.' },
        { status: 400 },
      )
    }

    if (!isEnquiryType(enquiryType)) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid enquiry type.' },
        { status: 400 },
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid phone number.' },
        { status: 400 },
      )
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Your enquiry must be between 10 and 5000 characters.',
        },
        { status: 400 },
      )
    }

    if (!privacyConsent) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please agree to the Privacy Policy before submitting.',
        },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const submission = await payload.create({
      collection: 'sales-enquiries',
      overrideAccess: true,
      data: {
        fullName,
        jobTitle,
        company,
        countryRegion,
        workEmail,
        enquiryType,
        phone,
        message,
        privacyConsent: true,
        privacyConsentAt: new Date().toISOString(),
        marketingConsent,
        website: '',
        status: 'new',
        source: 'website-sales-enquiries',
        submittedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Your enquiry has been received. Our team will contact you shortly.',
        id: submission.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[TRYVION Sales Enquiries]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your enquiry. Please try again shortly.',
      },
      { status: 500 },
    )
  }
}
