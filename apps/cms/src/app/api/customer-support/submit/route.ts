import { head } from '@vercel/blob'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

import config from '@/payload.config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 32_000
const MAX_FILE_SIZE = 2 * 1024 * 1024
const MAX_FILES = 5

const CONTACT_INTENTS = ['expert', 'consultation', 'support'] as const

const SERVICE_INTERESTS = [
  'SAP S/4HANA',
  'SAP SuccessFactors',
  'SAP Business Technology Platform (BTP)',
  'SAP Ariba',
  'SAP Customer Experience',
  'Enterprise AI Strategy',
  'Enterprise AI Platforms',
  'Intelligent Automation',
  'Data & Analytics',
  'Cloud Transformation',
  'Enterprise Integration',
  'Digital Engineering',
  'SAP Talent Solutions',
  'Permanent Hiring',
  'Executive Search',
  'TRYVION Academy / Learning',
  'Managed Services / SAP Run in the New',
  'Business Transformation',
  'Multiple / Cross-Capability',
  'Other',
] as const

const SUPPORT_AREAS = [
  'SAP S/4HANA',
  'SAP SuccessFactors',
  'SAP Business Technology Platform (BTP)',
  'SAP Ariba',
  'SAP Customer Experience',
  'Enterprise AI & Automation',
  'Data & Analytics',
  'Cloud & Infrastructure',
  'Enterprise Integration',
  'Digital Engineering',
  'Managed Services / SAP Run in the New',
  'Talent & Learning Platforms',
  'Security & Access',
  'Performance & Availability',
  'Incident / Service Disruption',
  'Other Support Enquiry',
] as const

const SUPPORT_PRIORITIES = ['Low', 'Medium', 'High', 'Critical / Urgent'] as const

const PREFERRED_CONTACT_METHODS = ['email', 'phone', 'video_call'] as const

const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'image/png',
  'image/jpeg',
  'application/zip',
] as const

const normalizeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : ''
}

const normalizeEmail = (value: unknown): string => {
  return normalizeText(value).toLowerCase()
}

const isOneOf = <T extends readonly string[]>(value: string, values: T): value is T[number] => {
  return values.includes(value)
}

const jsonError = (message: string, status = 400): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
    },
  )
}

const routingTeamForSupportArea = (area: string): string => {
  if (
    area === 'SAP S/4HANA' ||
    area === 'SAP SuccessFactors' ||
    area === 'SAP Business Technology Platform (BTP)' ||
    area === 'SAP Ariba' ||
    area === 'SAP Customer Experience'
  ) {
    return 'SAP Applications'
  }

  if (area === 'Enterprise AI & Automation') {
    return 'AI & Automation'
  }

  if (
    area === 'Enterprise Integration' ||
    area === 'Cloud & Infrastructure' ||
    area === 'Digital Engineering'
  ) {
    return 'Integration & Technology'
  }

  if (
    area === 'Managed Services / SAP Run in the New' ||
    area === 'Performance & Availability' ||
    area === 'Incident / Service Disruption'
  ) {
    return 'Operate'
  }

  return 'Customer Support'
}

const validateCommonFields = (data: {
  fullName: string
  company: string
  workEmail: string
  privacyConsent: unknown
}): string | null => {
  if (!data.fullName || data.fullName.length < 2) {
    return 'Full name is required.'
  }

  if (data.fullName.length > 100) {
    return 'Full name must be 100 characters or fewer.'
  }

  if (!data.company || data.company.length < 2) {
    return 'Company is required.'
  }

  if (data.company.length > 150) {
    return 'Company must be 150 characters or fewer.'
  }

  if (!data.workEmail) {
    return 'Work email is required.'
  }

  if (data.workEmail.length > 254) {
    return 'Email address must be 254 characters or fewer.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail)) {
    return 'Please enter a valid work email address.'
  }

  if (data.privacyConsent !== true) {
    return 'Privacy consent is required.'
  }

  return null
}

const validatePhone = (phone: string): string | null => {
  if (!phone) {
    return null
  }

  if (phone.length < 7 || phone.length > 40) {
    return 'Phone must be between 7 and 40 characters.'
  }

  if (!/^[+0-9().\-\s]+$/.test(phone)) {
    return 'Enter a valid phone number.'
  }

  return null
}

const validateIntentFields = (data: {
  intent: string
  serviceInterest: string
  businessChallenge: string
  preferredConsultationDate: string
  preferredConsultationTime: string
  preferredContactMethod: string
  supportArea: string
  supportPriority: string
  issue: string
}): string | null => {
  if (!isOneOf(data.intent, CONTACT_INTENTS)) {
    return 'Please select a valid contact intent.'
  }

  if (data.intent === 'expert') {
    if (!data.serviceInterest) {
      return 'Area of interest is required.'
    }

    if (!isOneOf(data.serviceInterest, SERVICE_INTERESTS)) {
      return 'Please select a valid area of interest.'
    }

    if (!data.businessChallenge) {
      return 'What you are looking to achieve is required.'
    }

    if (data.businessChallenge.length > 5000) {
      return 'What you are looking to achieve must be 5000 characters or fewer.'
    }

    if (!isOneOf(data.preferredContactMethod, PREFERRED_CONTACT_METHODS)) {
      return 'Please select a preferred contact method.'
    }

    return null
  }

  if (data.intent === 'consultation') {
    if (!data.serviceInterest) {
      return 'Area of interest is required.'
    }

    if (!isOneOf(data.serviceInterest, SERVICE_INTERESTS)) {
      return 'Please select a valid area of interest.'
    }

    if (!data.businessChallenge) {
      return 'Business challenge is required.'
    }

    if (data.businessChallenge.length > 5000) {
      return 'Business challenge must be 5000 characters or fewer.'
    }

    if (!data.preferredConsultationDate) {
      return 'Preferred consultation date is required.'
    }

    const consultationDate = new Date(data.preferredConsultationDate)

    if (Number.isNaN(consultationDate.getTime())) {
      return 'Please select a valid consultation date.'
    }

    if (!data.preferredConsultationTime) {
      return 'Preferred consultation time is required.'
    }

    if (data.preferredConsultationTime.length > 50) {
      return 'Preferred consultation time must be 50 characters or fewer.'
    }

    if (!isOneOf(data.preferredContactMethod, PREFERRED_CONTACT_METHODS)) {
      return 'Please select a preferred contact method.'
    }

    return null
  }

  if (!data.supportArea) {
    return 'Support area is required.'
  }

  if (!isOneOf(data.supportArea, SUPPORT_AREAS)) {
    return 'Please select a valid support area.'
  }

  if (!data.supportPriority) {
    return 'Support priority is required.'
  }

  if (!isOneOf(data.supportPriority, SUPPORT_PRIORITIES)) {
    return 'Please select a valid support priority.'
  }

  if (!data.issue) {
    return 'Issue description is required.'
  }

  if (data.issue.length > 5000) {
    return 'Issue description must be 5000 characters or fewer.'
  }

  return null
}

type AttachmentInput = {
  fileName?: unknown
  blobPathname?: unknown
  contentType?: unknown
  fileSize?: unknown
  uploadedAt?: unknown
}

const validateAttachments = async (
  attachments: unknown,
): Promise<
  | {
      valid: true
      data: Array<{
        fileName: string
        blobPathname: string
        contentType: string
        fileSize: number
        uploadedAt: string
      }>
    }
  | {
      valid: false
      message: string
    }
> => {
  if (attachments == null) {
    return {
      valid: true,
      data: [],
    }
  }

  if (!Array.isArray(attachments)) {
    return {
      valid: false,
      message: 'Invalid attachment data.',
    }
  }

  if (attachments.length > MAX_FILES) {
    return {
      valid: false,
      message: `You can upload a maximum of ${MAX_FILES} files.`,
    }
  }

  const validated: Array<{
    fileName: string
    blobPathname: string
    contentType: string
    fileSize: number
    uploadedAt: string
  }> = []

  for (const item of attachments as AttachmentInput[]) {
    const fileName = normalizeText(item?.fileName)
    const blobPathname = normalizeText(item?.blobPathname)
    const contentType = normalizeText(item?.contentType)
    const fileSize = Number(item?.fileSize)
    const uploadedAt = normalizeText(item?.uploadedAt)

    if (!fileName) {
      return {
        valid: false,
        message: 'Attachment file name is required.',
      }
    }

    if (!blobPathname) {
      return {
        valid: false,
        message: 'Attachment path is required.',
      }
    }

    if (
      !contentType ||
      !ALLOWED_CONTENT_TYPES.includes(contentType as (typeof ALLOWED_CONTENT_TYPES)[number])
    ) {
      return {
        valid: false,
        message: 'One or more attachments have an unsupported file type.',
      }
    }

    if (!Number.isFinite(fileSize) || fileSize < 1 || fileSize > MAX_FILE_SIZE) {
      return {
        valid: false,
        message: 'One or more attachments exceed the 2 MB file-size limit.',
      }
    }

    if (!uploadedAt) {
      return {
        valid: false,
        message: 'Attachment upload timestamp is required.',
      }
    }

    try {
      const blob = await head(blobPathname)

      if (!blob) {
        return {
          valid: false,
          message: `Attachment could not be verified: ${fileName}.`,
        }
      }

      if (blob.size > MAX_FILE_SIZE) {
        return {
          valid: false,
          message: `Attachment exceeds the 2 MB limit: ${fileName}.`,
        }
      }

      if (blob.contentType && blob.contentType !== contentType) {
        return {
          valid: false,
          message: `Attachment content type could not be verified: ${fileName}.`,
        }
      }
    } catch {
      return {
        valid: false,
        message: `Attachment could not be verified: ${fileName}.`,
      }
    }

    validated.push({
      fileName,
      blobPathname,
      contentType,
      fileSize,
      uploadedAt,
    })
  }

  return {
    valid: true,
    data: validated,
  }
}

export async function POST(request: Request) {
  try {
    const contentLength = request.headers.get('content-length')

    if (contentLength) {
      const contentLengthNumber = Number(contentLength)

      if (Number.isFinite(contentLengthNumber) && contentLengthNumber > MAX_BODY_BYTES) {
        return jsonError('Request is too large.', 413)
      }
    }

    const body = await request.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return jsonError('Invalid request body.', 400)
    }

    const intent = normalizeText(body.intent)

    const fullName = normalizeText(body.fullName)
    const company = normalizeText(body.company)
    const workEmail = normalizeEmail(body.workEmail)
    const phone = normalizeText(body.phone)

    const serviceInterest = normalizeText(body.serviceInterest)

    const businessChallenge = normalizeText(body.businessChallenge)

    const preferredConsultationDate = normalizeText(body.preferredConsultationDate)

    const preferredConsultationTime = normalizeText(body.preferredConsultationTime)

    /*
     * The frontend uses display labels while Payload stores
     * normalized select values.
     */
    const preferredContactMethodRaw = normalizeText(body.preferredContactMethod)

    const preferredContactMethod =
      preferredContactMethodRaw === 'Email'
        ? 'email'
        : preferredContactMethodRaw === 'Phone'
          ? 'phone'
          : preferredContactMethodRaw === 'Video Call'
            ? 'video_call'
            : preferredContactMethodRaw

    const supportArea = normalizeText(body.supportArea)

    const supportPriority = normalizeText(body.supportPriority)

    const customerProjectReference = normalizeText(body.customerProjectReference)

    const issue = normalizeText(body.issue)

    const website = normalizeText(body.website)

    const privacyConsent = body.privacyConsent
    const marketingConsent =
      typeof body.marketingConsent === 'boolean' ? body.marketingConsent : false

    const commonValidationError = validateCommonFields({
      fullName,
      company,
      workEmail,
      privacyConsent,
    })

    if (commonValidationError) {
      return jsonError(commonValidationError, 400)
    }

    const phoneValidationError = validatePhone(phone)

    if (phoneValidationError) {
      return jsonError(phoneValidationError, 400)
    }

    const intentValidationError = validateIntentFields({
      intent,
      serviceInterest,
      businessChallenge,
      preferredConsultationDate,
      preferredConsultationTime,
      preferredContactMethod,
      supportArea,
      supportPriority,
      issue,
    })

    if (intentValidationError) {
      return jsonError(intentValidationError, 400)
    }

    /*
     * Attachments are strictly support-only.
     *
     * Expert and Consultation submissions must never
     * carry support attachment metadata into Payload.
     */
    let validatedAttachments:
      | Array<{
          fileName: string
          blobPathname: string
          contentType: string
          fileSize: number
          uploadedAt: string
        }>
      | undefined

    if (intent === 'support') {
      const attachmentValidation = await validateAttachments(body.attachments)

      if (!attachmentValidation.valid) {
        return jsonError(attachmentValidation.message, 400)
      }

      validatedAttachments = attachmentValidation.data
    }

    const payload = await getPayload({
      config,
    })

    const ticketId = `CS-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`

    /*
     * IMPORTANT:
     *
     * Build the Payload object by intent.
     *
     * This prevents empty supportArea/supportPriority
     * values from being submitted for Expert/Consultation,
     * which is critical because those fields are support-only.
     */
    const createData: Record<string, unknown> = {
      ticketId,
      intent,

      fullName,
      company,
      workEmail,
      phone: phone || undefined,

      privacyConsent: true,
      privacyConsentAt: new Date().toISOString(),
      marketingConsent,

      website: website || undefined,

      status: 'new',
      source: 'website-contact-engagement',
      submittedAt: new Date().toISOString(),
    }

    /*
     * TALK TO AN EXPERT
     */
    if (intent === 'expert') {
      createData.serviceInterest = serviceInterest
      createData.businessChallenge = businessChallenge
      createData.preferredContactMethod = preferredContactMethod

      createData.routingTeam = 'Customer Support'
    }

    /*
     * BOOK A CONSULTATION
     */
    if (intent === 'consultation') {
      createData.serviceInterest = serviceInterest
      createData.businessChallenge = businessChallenge

      createData.preferredConsultationDate = preferredConsultationDate

      createData.preferredConsultationTime = preferredConsultationTime

      createData.preferredContactMethod = preferredContactMethod

      createData.routingTeam = 'Customer Support'
    }

    /*
     * CUSTOMER SUPPORT
     */
    if (intent === 'support') {
      createData.supportArea = supportArea
      createData.supportPriority = supportPriority

      if (customerProjectReference) {
        createData.customerProjectReference = customerProjectReference
      }

      createData.issue = issue

      if (validatedAttachments && validatedAttachments.length > 0) {
        createData.attachments = validatedAttachments
      }

      createData.routingTeam = routingTeamForSupportArea(supportArea)
    }

    const createdRequest = await payload.create({
      collection: 'customer-support',
      data: createData as any,
    })

    return NextResponse.json(
      {
        success: true,
        message:
          intent === 'expert'
            ? 'Your request has been submitted successfully. Our team will contact you shortly.'
            : intent === 'consultation'
              ? 'Your consultation request has been submitted successfully. Our team will contact you to confirm the consultation.'
              : 'Your support request has been submitted successfully.',
        ticketId: typeof createdRequest.ticketId === 'string' ? createdRequest.ticketId : ticketId,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error('[customer-support-submit] FULL ERROR:', error)

    const message = error instanceof Error ? error.message : String(error)

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      },
    )
  }
}
