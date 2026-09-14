import { head } from '@vercel/blob'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import config from '@/payload.config'
import { getCustomerSupportBlobToken } from '../../../../lib/customerSupportBlob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 32_000
const MAX_FILE_SIZE = 2 * 1024 * 1024
const MAX_FILES = 5

const SUPPORT_AREAS = [
  'SAP Applications',
  'AI & Automation',
  'Integration & Technology',
  'Operate',
  'Other Enquiry',
] as const

type SupportArea = (typeof SUPPORT_AREAS)[number]

const SUPPORT_PRIORITIES = ['Low', 'Medium', 'High', 'Critical / Urgent'] as const

type SupportPriority = (typeof SUPPORT_PRIORITIES)[number]

function isSupportArea(value: string): value is SupportArea {
  return SUPPORT_AREAS.includes(value as SupportArea)
}

function isSupportPriority(value: string): value is SupportPriority {
  return SUPPORT_PRIORITIES.includes(value as SupportPriority)
}

const ALLOWED_CONTENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'image/png',
  'image/jpeg',
  'application/zip',
])

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function isValidPhone(value: string): boolean {
  if (!value) return true

  return value.length >= 7 && value.length <= 40 && /^[+0-9().\-\s]+$/.test(value)
}

function generateTicketId(): string {
  const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14)

  return `CS-${stamp}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

function isAttachment(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)

    if (contentLength > MAX_BODY_BYTES) {
      return jsonError('Request is too large.', 413)
    }

    const body = (await request.json()) as Record<string, unknown>

    const fullName = text(body.fullName)
    const company = text(body.company)
    const workEmail = text(body.workEmail).toLowerCase()
    const phone = text(body.phone)
    const supportArea = text(body.supportArea)
    const supportPriority = text(body.supportPriority)
    const customerProjectReference = text(body.customerProjectReference)
    const issue = text(body.issue)
    const website = text(body.website)
    const privacyConsent = body.privacyConsent === true
    const marketingConsent = body.marketingConsent === true

    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Your support request has been received.',
      })
    }

    if (fullName.length < 2 || fullName.length > 100) {
      return jsonError('Please enter your full name.')
    }

    if (company.length < 2 || company.length > 150) {
      return jsonError('Please enter your company name.')
    }

    if (!isValidEmail(workEmail)) {
      return jsonError('Please enter a valid work email address.')
    }

    if (!isValidPhone(phone)) {
      return jsonError('Please enter a valid phone number.')
    }

    if (!isSupportArea(supportArea)) {
      return jsonError('Please select a valid support area.')
    }

    if (!isSupportPriority(supportPriority)) {
      return jsonError('Please select a valid support priority.')
    }

    if (customerProjectReference.length > 200) {
      return jsonError('Customer / Project Reference must be 200 characters or fewer.')
    }

    if (issue.length < 10 || issue.length > 5000) {
      return jsonError('Please describe the issue in between 10 and 5000 characters.')
    }

    if (!privacyConsent) {
      return jsonError('Please agree to the Privacy Policy before submitting.')
    }

    const rawAttachments = Array.isArray(body.attachments) ? body.attachments : []

    if (rawAttachments.length > MAX_FILES) {
      return jsonError(`A maximum of ${MAX_FILES} files may be attached.`)
    }

    const attachments: Array<{
      fileName: string
      blobPathname: string
      contentType: string
      fileSize: number
      uploadedAt: string
    }> = []

    for (let index = 0; index < rawAttachments.length; index += 1) {
      const raw = rawAttachments[index]

      if (!isAttachment(raw)) {
        return jsonError(`Attachment ${index + 1} is invalid.`)
      }

      const fileName = text(raw.fileName)
      const blobPathname = text(raw.blobPathname)
      const contentType = text(raw.contentType).toLowerCase()
      const fileSize = Number(raw.fileSize)

      if (!fileName || fileName.length > 255) {
        return jsonError(`Attachment ${index + 1} has an invalid file name.`)
      }

      if (
        !blobPathname ||
        blobPathname.includes('..') ||
        !blobPathname.startsWith('support-pending/')
      ) {
        return jsonError(`Attachment "${fileName}" has an invalid storage path.`)
      }

      if (!contentType || !ALLOWED_CONTENT_TYPES.has(contentType)) {
        return jsonError(`Attachment "${fileName}" has an unsupported file type.`)
      }

      if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_FILE_SIZE) {
        return jsonError(`Attachment "${fileName}" exceeds the 2 MB limit.`)
      }

      let blob

      try {
        blob = await head(blobPathname, {
          token: getCustomerSupportBlobToken(),
        })
      } catch (error) {
        console.error(`[TRYVION Customer Support Blob Verification] ${fileName}`, error)

        return jsonError(
          `The uploaded attachment "${fileName}" could not be verified in secure storage.`,
        )
      }

      if (!blob) {
        return jsonError(
          `The uploaded attachment "${fileName}" could not be found in secure storage.`,
        )
      }

      if (blob.pathname !== blobPathname) {
        return jsonError(
          `The uploaded attachment "${fileName}" could not be verified in secure storage.`,
        )
      }

      if (!blob.pathname.startsWith('support-pending/')) {
        return jsonError(`The uploaded attachment "${fileName}" is not a valid support attachment.`)
      }

      if (blob.size <= 0 || blob.size > MAX_FILE_SIZE) {
        return jsonError(`The uploaded attachment "${fileName}" exceeds the 2 MB limit.`)
      }

      if (!ALLOWED_CONTENT_TYPES.has(blob.contentType)) {
        return jsonError(`The uploaded attachment "${fileName}" has an unsupported content type.`)
      }

      if (blob.contentType !== contentType) {
        return jsonError(
          `The uploaded attachment "${fileName}" could not be verified in secure storage.`,
        )
      }

      attachments.push({
        fileName,
        blobPathname: blob.pathname,
        contentType: blob.contentType,
        fileSize: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      })
    }

    const payload = await getPayload({
      config,
    })

    const ticketId = generateTicketId()

    const routingTeam =
      supportArea === 'SAP Applications'
        ? 'SAP Applications'
        : supportArea === 'AI & Automation'
          ? 'AI & Automation'
          : supportArea === 'Integration & Technology'
            ? 'Integration & Technology'
            : supportArea === 'Operate'
              ? 'Operate'
              : 'Customer Support'

    const submission = await payload.create({
      collection: 'customer-support',
      draft: false,
      overrideAccess: true,
      data: {
        ticketId,
        fullName,
        company,
        workEmail,
        ...(phone ? { phone } : {}),
        supportArea,
        supportPriority,
        ...(customerProjectReference ? { customerProjectReference } : {}),
        issue,
        ...(attachments.length
          ? {
              attachments: attachments.map((attachment) => ({
                ...attachment,
                uploadedAt: attachment.uploadedAt,
              })),
            }
          : {}),
        privacyConsent: true,
        privacyConsentAt: new Date().toISOString(),
        marketingConsent,
        website: '',
        routingTeam,
        status: 'new',
        source: 'website-customer-support',
        submittedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Your support request has been received. Our team will contact you shortly.',
        ticketId,
        id: submission.id,
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch (error) {
    console.error('[TRYVION Customer Support]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your support request. Please try again shortly.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }
}
