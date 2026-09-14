import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

const ENQUIRY_TYPES = [
  'Services & Solutions',
  'Commercial Enquiries',
  'Existing Opportunities',
  'Partnerships',
  'General Enquiries',
] as const

const normalizeText = (value: unknown): string => {
  if (typeof value !== 'string') return ''
  return value.trim()
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

const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (!data) return data

  const normalized: Record<string, unknown> = {
    ...data,
    fullName: normalizeText(data.fullName),
    jobTitle: normalizeText(data.jobTitle),
    company: normalizeText(data.company),
    countryRegion: normalizeText(data.countryRegion),
    workEmail: normalizeEmail(data.workEmail),
    enquiryType: normalizeText(data.enquiryType),
    phone: normalizeText(data.phone),
    message: normalizeText(data.message),
    website: normalizeText(data.website),
  }

  if (operation === 'create') {
    if (normalized.privacyConsent !== true) {
      throw new Error('Privacy consent is required to submit this enquiry.')
    }

    normalized.privacyConsentAt = new Date().toISOString()

    if (!normalized.status) normalized.status = 'new'
    if (!normalized.source) normalized.source = 'website-sales-enquiries'
    if (typeof normalized.marketingConsent !== 'boolean') {
      normalized.marketingConsent = false
    }
  }

  const enquiryType =
    typeof normalized.enquiryType === 'string' ? normalized.enquiryType : ''

  if (enquiryType && !ENQUIRY_TYPES.includes(enquiryType as (typeof ENQUIRY_TYPES)[number])) {
    throw new Error('Invalid enquiry type.')
  }

  return normalized
}

export const SalesEnquiries: CollectionConfig = {
  slug: 'sales-enquiries',

  labels: {
    singular: 'Sales Enquiry',
    plural: 'Sales Enquiries',
  },

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'fullName',
      'company',
      'workEmail',
      'enquiryType',
      'countryRegion',
      'status',
      'createdAt',
    ],
    group: 'Lead Management',
    description:
      'Sales and commercial enquiries submitted through the TRYVION Sales Enquiries page.',
  },

  // Public visitors must use the dedicated API route.
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
      name: 'fullName',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Full name provided by the website visitor.',
      },
      validate: (value: unknown) => validateRequiredText(value, 'Full name', 2, 100),
    },

    {
      name: 'jobTitle',
      type: 'text',
      required: false,
      maxLength: 150,
      admin: {
        description: 'Optional job title or role.',
      },
    },

    {
      name: 'company',
      type: 'text',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Company or organisation name.',
      },
      validate: (value: unknown) => validateRequiredText(value, 'Company', 2, 150),
    },

    {
      name: 'countryRegion',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Country or region entered as free text.',
      },
      validate: (value: unknown) =>
        validateRequiredText(value, 'Country / Region', 2, 100),
    },

    {
      name: 'workEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Business email address.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string') return 'Work email is required.'

        const email = value.trim().toLowerCase()

        if (!email) return 'Work email is required.'
        if (email.length > 254) return 'Email address must be 254 characters or fewer.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return 'Please enter a valid business email address.'
        }

        return true
      },
    },

    {
      name: 'enquiryType',
      type: 'select',
      required: true,
      options: ENQUIRY_TYPES.map((value) => ({
        label: value,
        value,
      })),
      admin: {
        description: 'Commercial intent selected by the website visitor.',
      },
    },

    {
      name: 'phone',
      type: 'text',
      required: false,
      maxLength: 40,
      admin: {
        description: 'Optional international telephone number.',
      },
      validate: (value: unknown) => {
        if (value == null || value === '') return true
        if (typeof value !== 'string') return 'Phone must be text.'

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

    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 5000,
      admin: {
        description: 'Business requirement, question, or commercial enquiry.',
      },
      validate: (value: unknown) =>
        validateRequiredText(value, 'How can we help?', 10, 5000),
    },

    {
      name: 'privacyConsent',
      type: 'checkbox',
      required: true,
      admin: {
        description: 'Mandatory privacy consent supplied by the website visitor.',
      },
    },

    {
      name: 'privacyConsentAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Timestamp at which mandatory privacy consent was accepted.',
      },
    },

    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Optional consent to receive TRYVION insights, updates, and promotional communications.',
      },
    },

    {
      name: 'website',
      type: 'text',
      required: false,
      maxLength: 200,
      admin: {
        hidden: true,
        description: 'Honeypot anti-spam field. Genuine submissions must leave this empty.',
      },
    },

    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'source',
      type: 'text',
      maxLength: 100,
      defaultValue: 'website-sales-enquiries',
      admin: {
        position: 'sidebar',
        description: 'Submission source.',
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
