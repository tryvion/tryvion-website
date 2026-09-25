import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

const CONTACT_INTENTS = [
  {
    label: 'Talk to an Expert',
    value: 'expert',
  },
  {
    label: 'Book a Consultation',
    value: 'consultation',
  },
  {
    label: 'Customer Support',
    value: 'support',
  },
] as const

/**
 * Commercial capability taxonomy used by:
 * - Talk to an Expert
 * - Book a Consultation
 *
 * Aligned with the TRYVION capability taxonomy already used
 * across the project.
 */
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

/**
 * Operational support taxonomy used only by:
 * - Customer Support
 */
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

const SUPPORT_STATUSES = [
  'new',
  'in_progress',
  'awaiting_customer',
  'resolved',
  'closed',
  'spam',
] as const

const ROUTING_TEAMS = [
  'SAP Applications',
  'AI & Automation',
  'Integration & Technology',
  'Operate',
  'Customer Support',
] as const

const PREFERRED_CONTACT_METHODS = [
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Phone',
    value: 'phone',
  },
  {
    label: 'Video Call',
    value: 'video_call',
  },
] as const

const normalizeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : ''
}

const normalizeEmail = (value: unknown): string => {
  return normalizeText(value).toLowerCase()
}

const validateRequiredText = (
  value: unknown,
  label: string,
  minLength: number,
  maxLength: number,
) => {
  if (typeof value !== 'string' || !value.trim()) {
    return `${label} is required.`
  }

  const normalized = value.trim()

  if (normalized.length < minLength) {
    return `${label} must be at least ${minLength} characters.`
  }

  if (normalized.length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`
  }

  return true
}

const validateOptionalText = (value: unknown, label: string, maxLength: number) => {
  if (value == null || value === '') return true

  if (typeof value !== 'string') {
    return `${label} must be text.`
  }

  const normalized = value.trim()

  if (normalized.length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`
  }

  return true
}

function routingTeamForSupportArea(area: string) {
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

const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (!data) return data

  const normalized: Record<string, unknown> = {
    ...data,

    intent: normalizeText(data.intent),

    fullName: normalizeText(data.fullName),
    company: normalizeText(data.company),
    workEmail: normalizeEmail(data.workEmail),
    phone: normalizeText(data.phone) || undefined,

    serviceInterest: normalizeText(data.serviceInterest) || undefined,
    businessChallenge: normalizeText(data.businessChallenge) || undefined,
    preferredContactMethod: normalizeText(data.preferredContactMethod) || undefined,
    preferredConsultationTime: normalizeText(data.preferredConsultationTime) || undefined,

    supportArea: normalizeText(data.supportArea) || undefined,
    supportPriority: normalizeText(data.supportPriority) || undefined,
    customerProjectReference: normalizeText(data.customerProjectReference) || undefined,
    issue: normalizeText(data.issue) || undefined,

    website: normalizeText(data.website) || undefined,
  }

  if (operation === 'create') {
    if (normalized.privacyConsent !== true) {
      throw new Error('Privacy consent is required to submit this request.')
    }

    normalized.privacyConsentAt = new Date().toISOString()

    if (!normalized.status) {
      normalized.status = 'new'
    }

    if (!normalized.source) {
      normalized.source = 'website-contact-engagement'
    }

    if (!normalized.submittedAt) {
      normalized.submittedAt = new Date().toISOString()
    }

    if (typeof normalized.marketingConsent !== 'boolean') {
      normalized.marketingConsent = false
    }

    const intent = typeof normalized.intent === 'string' ? normalized.intent : ''

    if (!intent) {
      throw new Error('Intent is required.')
    }

    if (intent !== 'expert' && intent !== 'consultation' && intent !== 'support') {
      throw new Error('Invalid contact intent.')
    }

    /**
     * TALK TO AN EXPERT
     */
    if (intent === 'expert') {
      if (!normalized.serviceInterest) {
        throw new Error('Area of interest is required.')
      }

      if (!normalized.businessChallenge) {
        throw new Error('What you are looking to achieve is required.')
      }

      if (!normalized.preferredContactMethod) {
        throw new Error('Preferred contact method is required.')
      }

      normalized.routingTeam = 'Customer Support'
    }

    /**
     * BOOK A CONSULTATION
     */
    if (intent === 'consultation') {
      if (!normalized.serviceInterest) {
        throw new Error('Area of interest is required.')
      }

      if (!normalized.businessChallenge) {
        throw new Error('Business challenge is required.')
      }

      if (!normalized.preferredConsultationDate) {
        throw new Error('Preferred consultation date is required.')
      }

      if (!normalized.preferredConsultationTime) {
        throw new Error('Preferred consultation time is required.')
      }

      if (!normalized.preferredContactMethod) {
        throw new Error('Preferred contact method is required.')
      }

      normalized.routingTeam = 'Customer Support'
    }

    /**
     * CUSTOMER SUPPORT
     */
    if (intent === 'support') {
      if (!normalized.supportArea) {
        throw new Error('Support area is required.')
      }

      if (!normalized.supportPriority) {
        throw new Error('Support priority is required.')
      }

      if (!normalized.issue) {
        throw new Error('Issue description is required.')
      }

      const supportArea = typeof normalized.supportArea === 'string' ? normalized.supportArea : ''

      normalized.routingTeam = routingTeamForSupportArea(supportArea)
    }
  }

  return normalized
}

export const CustomerSupport: CollectionConfig = {
  slug: 'customer-support',

  labels: {
    singular: 'Contact Request',
    plural: 'Contact Requests',
  },

  admin: {
    useAsTitle: 'ticketId',

    defaultColumns: [
      'ticketId',
      'intent',
      'fullName',
      'company',
      'serviceInterest',
      'supportArea',
      'supportPriority',
      'status',
    ],

    group: 'Support Management',

    description:
      'Contact, consultation and customer support requests submitted through the TRYVION website.',
  },

  /**
   * Public visitors must use the dedicated API route.
   * Direct collection CRUD remains authenticated.
   */
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    beforeValidate: [beforeValidate],
  },

  fields: [
    {
      name: 'ticketId',
      type: 'text',
      required: true,
      unique: true,

      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Public-facing contact request identifier.',
      },
    },

    {
      name: 'intent',
      type: 'select',
      required: true,

      options: CONTACT_INTENTS.map((item) => ({
        label: item.label,
        value: item.value,
      })),

      admin: {
        position: 'sidebar',
        description: 'The type of engagement requested by the website visitor.',
      },
    },

    {
      name: 'fullName',
      type: 'text',
      required: true,
      maxLength: 100,

      validate: (value: unknown) => validateRequiredText(value, 'Full name', 2, 100),
    },

    {
      name: 'company',
      type: 'text',
      required: true,
      maxLength: 150,

      validate: (value: unknown) => validateRequiredText(value, 'Company', 2, 150),
    },

    {
      name: 'workEmail',
      type: 'email',
      required: true,

      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Work email is required.'
        }

        const email = value.trim().toLowerCase()

        if (!email) {
          return 'Work email is required.'
        }

        if (email.length > 254) {
          return 'Email address must be 254 characters or fewer.'
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return 'Please enter a valid work email address.'
        }

        return true
      },
    },

    {
      name: 'phone',
      type: 'text',
      required: false,
      maxLength: 40,

      validate: (value: unknown) => {
        if (value == null || value === '') return true

        if (typeof value !== 'string') {
          return 'Phone must be text.'
        }

        const phone = value.trim()

        if (phone.length < 7 || phone.length > 40) {
          return 'Phone must be between 7 and 40 characters.'
        }

        if (!/^[+0-9().\-\s]+$/.test(phone)) {
          return 'Enter a valid phone number.'
        }

        return true
      },
    },

    /*
     * ============================================================
     * TALK TO AN EXPERT / BOOK A CONSULTATION
     * ============================================================
     */

    {
      name: 'serviceInterest',
      type: 'select',
      required: false,

      options: SERVICE_INTERESTS.map((value) => ({
        label: value,
        value,
      })),

      admin: {
        description: 'Area of interest for Talk to an Expert and Book a Consultation requests.',
      },
    },

    {
      name: 'businessChallenge',
      type: 'textarea',
      required: false,
      maxLength: 5000,

      validate: (value: unknown) => validateOptionalText(value, 'Business challenge', 5000),

      admin: {
        description: 'Business challenge or objective for Expert and Consultation requests.',
      },
    },

    {
      name: 'preferredConsultationDate',
      type: 'date',
      required: false,

      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },

        description: 'Preferred date for a consultation.',
      },
    },

    {
      name: 'preferredConsultationTime',
      type: 'text',
      required: false,
      maxLength: 50,

      validate: (value: unknown) => validateOptionalText(value, 'Preferred consultation time', 50),

      admin: {
        description: 'Preferred time for a consultation.',
      },
    },

    {
      name: 'preferredContactMethod',
      type: 'select',
      required: false,

      options: PREFERRED_CONTACT_METHODS.map((item) => ({
        label: item.label,
        value: item.value,
      })),

      admin: {
        description: 'Preferred method for TRYVION to contact the requester.',
      },
    },

    /*
     * ============================================================
     * CUSTOMER SUPPORT
     * ============================================================
     */

    {
      name: 'supportArea',
      type: 'select',
      required: false,

      options: SUPPORT_AREAS.map((value) => ({
        label: value,
        value,
      })),

      admin: {
        description: 'Affected TRYVION service, technology or operational support area.',
      },
    },

    {
      name: 'supportPriority',
      type: 'select',
      required: false,

      options: SUPPORT_PRIORITIES.map((value) => ({
        label: value,
        value,
      })),

      admin: {
        description: 'Priority selected by the customer based on business impact.',
      },
    },

    {
      name: 'customerProjectReference',
      type: 'text',
      required: false,
      maxLength: 200,

      admin: {
        description: 'Optional customer, project, contract or reference identifier.',
      },
    },

    {
      name: 'issue',
      type: 'textarea',
      required: false,
      maxLength: 5000,

      validate: (value: unknown) => validateOptionalText(value, 'Issue description', 5000),

      admin: {
        description:
          'Issue or support request description. Required for Customer Support requests.',
      },
    },

    {
      name: 'attachments',
      type: 'array',
      required: false,

      admin: {
        description:
          'Private Vercel Blob metadata. Files are uploaded directly to Blob and verified before the ticket is created.',
      },

      fields: [
        {
          name: 'fileName',
          type: 'text',
          required: true,
          maxLength: 255,
        },

        {
          name: 'blobPathname',
          type: 'text',
          required: true,
          maxLength: 500,
        },

        {
          name: 'contentType',
          type: 'text',
          required: true,
          maxLength: 150,
        },

        {
          name: 'fileSize',
          type: 'number',
          required: true,
          min: 1,
          max: 2 * 1024 * 1024,
        },

        {
          name: 'uploadedAt',
          type: 'date',
          required: true,
        },
      ],
    },

    /*
     * ============================================================
     * COMPLIANCE / SYSTEM FIELDS
     * ============================================================
     */

    {
      name: 'privacyConsent',
      type: 'checkbox',
      required: true,
    },

    {
      name: 'privacyConsentAt',
      type: 'date',

      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },

    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'website',
      type: 'text',
      required: false,
      maxLength: 200,

      admin: {
        hidden: true,
        description: 'Honeypot anti-spam field.',
      },
    },

    {
      name: 'routingTeam',
      type: 'select',
      required: true,

      options: ROUTING_TEAMS.map((value) => ({
        label: value,
        value,
      })),

      admin: {
        position: 'sidebar',
        description:
          'Support team assigned automatically based on the request intent and support area.',
      },
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',

      options: SUPPORT_STATUSES.map((value) => ({
        label:
          value === 'in_progress'
            ? 'In Progress'
            : value === 'awaiting_customer'
              ? 'Awaiting Customer'
              : value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),

      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'source',
      type: 'text',
      maxLength: 100,
      defaultValue: 'website-contact-engagement',

      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date(),

      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
