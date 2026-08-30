import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { ContactSubmission } from '../../../payload-types'

// Nodemailer is a server-only dependency. Using require here avoids requiring
// a separate @types/nodemailer package for this route.
const nodemailer = require('nodemailer') as {
  createTransport: (options: {
    host: string
    port: number
    secure: boolean
    auth: { user: string; pass: string }
  }) => {
    sendMail: (options: {
      from: string
      to: string
      replyTo: string
      subject: string
      text: string
      html: string
    }) => Promise<unknown>
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type MainService = ContactSubmission['mainService']
type SubService = NonNullable<ContactSubmission['subService']>

const SERVICE_DATA = {
  'Tryvion Applications': [
    'SAP S/4HANA',
    'SAP SuccessFactors',
    'SAP Customer Experience (CX)',
    'SAP Ariba',
    'SAP Business Technology Platform (BTP)',
  ],
  'Tryvion AI': ['Enterprise AI Strategy', 'Enterprise AI Platforms', 'Intelligent Automation'],
  'Tryvion Data & Analytics': [
    'Data Engineering',
    'Data Platforms',
    'Data Integration',
    'Data Governance',
    'Business Intelligence',
    'Enterprise Reporting',
    'Advanced & Predictive Analytics',
  ],
  'Tryvion Cloud': [
    'Cloud Strategy',
    'Cloud Migration & Modernization',
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
  ],
  'Tryvion Labs': [
    'Custom Application Development',
    'API Management & Integration',
    'Enterprise Integration',
    'DevSecOps & Platform Engineering',
  ],
  'Tryvion Talent': [
    'SAP Talent Solutions',
    'Technology Contract Staffing',
    'Permanent Hiring',
    'Executive Search',
    'Global Resource Augmentation',
    'Freelancer Marketplace',
  ],
  'Tryvion Academy': [
    'Tryvion Learning Platform (TLP)',
    'Inside TLP - SAP Learning',
    'Corporate Learning - Change & Adoption',
    'Leadership Development',
  ],
  'Tryvion Operate': ['SAP Run in the New', 'Cloud Operations', 'Application Support'],
} satisfies Record<MainService, readonly SubService[]>

type ContactBody = {
  fullName?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  mainService?: unknown
  subService?: unknown
  message?: unknown
  privacyConsent?: unknown
  newsletterOptIn?: unknown
  website?: unknown
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(value: string): boolean {
  return /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(value)
}

function isMainService(value: string): value is MainService {
  return Object.prototype.hasOwnProperty.call(SERVICE_DATA, value)
}

function isSubServiceForMainService(mainService: MainService, value: string): value is SubService {
  return SERVICE_DATA[mainService].some((item) => item === value)
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { success: false, message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function createTransporter() {
  const host = text(process.env.SMTP_HOST)
  const user = text(process.env.SMTP_USER)
  const pass = text(process.env.SMTP_PASS)

  const portRaw = text(process.env.SMTP_PORT) || '465'
  const port = Number(portRaw)

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is incomplete.')
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SMTP_PORT is invalid.')
  }

  const secureValue = text(process.env.SMTP_SECURE).toLowerCase()
  const secure = secureValue ? secureValue === 'true' : port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    let body: ContactBody

    try {
      body = (await request.json()) as ContactBody
    } catch {
      return jsonError('Invalid JSON request.')
    }

    // Honeypot: bots that fill this field receive a normal-looking success.
    const website = text(body.website)

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you. Your enquiry has been received.',
        },
        {
          status: 200,
          headers: { 'Cache-Control': 'no-store' },
        },
      )
    }

    const fullName = text(body.fullName)
    const company = text(body.company)
    const email = text(body.email).toLowerCase()
    const phone = text(body.phone)
    const mainServiceValue = text(body.mainService)
    const subServiceValue = text(body.subService)
    const message = text(body.message)

    const privacyConsent = body.privacyConsent === true
    const newsletterOptIn = body.newsletterOptIn === true

    if (fullName.length < 2 || fullName.length > 100) {
      return jsonError('Full name must be between 2 and 100 characters.')
    }

    if (company.length < 2 || company.length > 150) {
      return jsonError('Company name must be between 2 and 150 characters.')
    }

    if (!email || email.length > 254 || !isValidEmail(email)) {
      return jsonError('Please enter a valid business email address.')
    }

    if (phone && (phone.length < 7 || phone.length > 40 || !/^[+0-9().\-\s]{7,40}$/.test(phone))) {
      return jsonError('Please enter a valid phone number.')
    }

    if (!isMainService(mainServiceValue)) {
      return jsonError('Please select a valid service area.')
    }

    if (!subServiceValue) {
      return jsonError('Please select a specific capability.')
    }

    if (!isSubServiceForMainService(mainServiceValue, subServiceValue)) {
      return jsonError('The selected capability does not belong to the selected service.')
    }

    if (message.length < 20 || message.length > 5000) {
      return jsonError('Your message must be between 20 and 5000 characters.')
    }

    if (!privacyConsent) {
      return jsonError('Privacy consent is required to submit this form.')
    }

    const mainService: MainService = mainServiceValue
    const subService: SubService = subServiceValue

    const payload = await getPayload({ config })

    const submittedAt = new Date().toISOString()

    const submission = await payload.create({
      collection: 'contact-submissions',
      draft: false,
      overrideAccess: true,
      data: {
        fullName,
        company,
        email,
        phone: phone || undefined,
        mainService,
        subService,
        message,
        privacyConsent: true,
        privacyConsentAt: submittedAt,
        newsletterOptIn,
        status: 'new',
        source: 'website-contact-form',
        submittedAt,
      },
    })

    const fromEmail = text(process.env.CONTACT_FROM_EMAIL) || text(process.env.SMTP_USER)

    const toEmail = text(process.env.CONTACT_TO_EMAIL) || 'vr@thetryvion.com'

    // Database success is authoritative. Email notification failure must not
    // cause the visitor to submit the same enquiry again.
    if (fromEmail && toEmail) {
      try {
        const transporter = createTransporter()

        await transporter.sendMail({
          from: fromEmail,
          to: toEmail,
          replyTo: email,
          subject: `New TRYVION Website Enquiry — ${fullName}`,
          text: [
            'NEW TRYVION WEBSITE ENQUIRY',
            '',
            `Name: ${fullName}`,
            `Company: ${company}`,
            `Email: ${email}`,
            `Phone: ${phone || 'Not provided'}`,
            '',
            `Service: ${mainService}`,
            `Capability: ${subService}`,
            '',
            'MESSAGE',
            '-------',
            message,
            '',
            `Newsletter opt-in: ${newsletterOptIn ? 'Yes' : 'No'}`,
            `Submission ID: ${String(submission.id)}`,
            `Submitted: ${submittedAt}`,
          ].join('\n'),
          html: `
<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#0B1E3D;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e2e6eb;border-radius:12px;padding:28px;">
      <h2 style="margin:0 0 24px;">New TRYVION Website Enquiry</h2>

      <table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="font-weight:700;width:150px;">Name</td>
          <td>${escapeHtml(fullName)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Company</td>
          <td>${escapeHtml(company)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Email</td>
          <td>${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Phone</td>
          <td>${escapeHtml(phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Service</td>
          <td>${escapeHtml(mainService)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Capability</td>
          <td>${escapeHtml(subService)}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Newsletter</td>
          <td>${newsletterOptIn ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td style="font-weight:700;">Submission ID</td>
          <td>${escapeHtml(String(submission.id))}</td>
        </tr>
      </table>

      <h3 style="margin:28px 0 10px;">Message</h3>

      <div style="white-space:pre-wrap;border:1px solid #e2e6eb;background:#fafbfc;padding:16px;border-radius:8px;">
        ${escapeHtml(message)}
      </div>
    </div>
  </body>
</html>
          `,
        })
      } catch (emailError) {
        console.error('[TRYVION Contact] Email notification failed:', emailError)
      }
    } else {
      console.error('[TRYVION Contact] CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not configured.')
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Your enquiry has been received. Our team will contact you shortly.',
        id: submission.id,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' },
      },
    )
  } catch (error) {
    console.error('[TRYVION Contact API]', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your enquiry at this time. Please try again shortly.',
      },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      },
    )
  }
}
