import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

/**
 * Canonical TRYVION service structure.
 *
 * IMPORTANT:
 * These values must remain identical to the select-field
 * values generated into payload-types.ts.
 */
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
} as const

type MainService = keyof typeof SERVICE_DATA

type SubService = {
  [K in MainService]: (typeof SERVICE_DATA)[K][number]
}[MainService]

const serviceOptions = (Object.keys(SERVICE_DATA) as MainService[]).map((value) => ({
  label: value,
  value,
}))

const subServiceOptions = Array.from(
  new Set(Object.values(SERVICE_DATA).flat() as readonly string[]),
).map((value) => ({
  label: value,
  value,
}))

/**
 * Normalise text values without changing non-string values.
 */
const normalizeText = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim()
}

/**
 * Normalise email values.
 */
const normalizeEmail = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim().toLowerCase()
}

/**
 * Required text validator.
 */
const validateRequiredText = (
  value: unknown,
  label: string,
  minLength: number,
  maxLength: number,
): true | string => {
  if (typeof value !== 'string') {
    return `${label} is required.`
  }

  const normalized = value.trim()

  if (!normalized) {
    return `${label} is required.`
  }

  if (normalized.length < minLength) {
    return `${label} must be at least ${minLength} characters.`
  }

  if (normalized.length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`
  }

  return true
}

/**
 * Optional text validator.
 */
const validateOptionalText = (value: unknown, label: string, maxLength: number): true | string => {
  if (value == null || value === '') {
    return true
  }

  if (typeof value !== 'string') {
    return `${label} must be text.`
  }

  if (value.trim().length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`
  }

  return true
}

/**
 * Collection beforeValidate hook.
 *
 * Explicitly types the normalised object so TypeScript knows that
 * privacyConsent and privacyConsentAt exist.
 */
const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (!data) {
    return data
  }

  const normalized: Record<string, unknown> = {
    ...data,

    fullName: normalizeText(data.fullName),

    company: normalizeText(data.company),

    email: normalizeEmail(data.email),

    phone: normalizeText(data.phone),

    mainService: normalizeText(data.mainService),

    subService: normalizeText(data.subService),

    message: normalizeText(data.message),
  }

  /**
   * Privacy consent is mandatory for every new submission.
   */
  if (operation === 'create') {
    if (normalized.privacyConsent !== true) {
      throw new Error('Privacy consent is required to submit this form.')
    }

    if (!normalized.privacyConsentAt) {
      normalized.privacyConsentAt = new Date().toISOString()
    }
  }

  const mainService =
    typeof normalized.mainService === 'string' ? normalized.mainService : undefined

  const subService = typeof normalized.subService === 'string' ? normalized.subService : undefined

  /**
   * Validate main service.
   */
  if (mainService && !Object.prototype.hasOwnProperty.call(SERVICE_DATA, mainService)) {
    throw new Error('Invalid main service.')
  }

  /**
   * Validate sub-service against main service.
   */
  if (subService && mainService) {
    const allowedSubServices = SERVICE_DATA[mainService as MainService]

    if (!allowedSubServices.includes(subService as never)) {
      throw new Error('Invalid sub-service for the selected main service.')
    }
  }

  /**
   * A sub-service cannot exist without a main service.
   */
  if (subService && !mainService) {
    throw new Error('A main service is required when a sub-service is provided.')
  }

  return normalized
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',

  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },

  admin: {
    useAsTitle: 'fullName',

    defaultColumns: ['fullName', 'company', 'email', 'mainService', 'status', 'createdAt'],

    group: 'Lead Management',

    description: 'Website contact and business enquiry submissions received through TRYVION.',
  },

  /**
   * Public users cannot directly create/read/update/delete
   * records through Payload's generic collection API.
   *
   * The dedicated /api/contact endpoint performs validation
   * and uses Payload Local API with overrideAccess.
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
    /*
     * FULL NAME
     */
    {
      name: 'fullName',

      type: 'text',

      required: true,

      maxLength: 100,

      admin: {
        description: 'Name provided by the website visitor.',
      },

      validate: (value: unknown) => validateRequiredText(value, 'Full name', 2, 100),
    },

    /*
     * COMPANY
     */
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

    /*
     * EMAIL
     *
     * Do NOT use maxLength here because Payload's
     * EmailField does not expose maxLength in this version.
     * The API performs the 254-character validation.
     */
    {
      name: 'email',

      type: 'email',

      required: true,

      admin: {
        description: 'Business email address.',
      },

      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Email is required.'
        }

        const email = value.trim().toLowerCase()

        if (!email) {
          return 'Email is required.'
        }

        if (email.length > 254) {
          return 'Email address must be 254 characters or fewer.'
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return 'Please enter a valid email address.'
        }

        return true
      },
    },

    /*
     * PHONE
     */
    {
      name: 'phone',

      type: 'text',

      required: false,

      maxLength: 40,

      admin: {
        description: 'Optional international telephone number.',
      },

      validate: (value: unknown) => {
        if (value == null || value === '') {
          return true
        }

        if (typeof value !== 'string') {
          return 'Phone must be text.'
        }

        const phone = value.trim()

        if (phone.length < 7 || phone.length > 40) {
          return 'Phone must be between 7 and 40 characters.'
        }

        if (!/^[+0-9().\-\s]{7,40}$/.test(phone)) {
          return 'Enter a valid phone number.'
        }

        return true
      },
    },

    /*
     * MAIN SERVICE
     */
    {
      name: 'mainService',

      type: 'select',

      required: true,

      options: serviceOptions,

      admin: {
        description: 'Primary TRYVION service selected by the visitor.',
      },

      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Main service is required.'
        }

        if (!Object.prototype.hasOwnProperty.call(SERVICE_DATA, value)) {
          return 'Please select a valid main service.'
        }

        return true
      },
    },

    /*
     * SUB SERVICE
     */
    {
      name: 'subService',

      type: 'select',

      required: false,

      options: subServiceOptions,

      admin: {
        description:
          'Specific service selected under the primary service. Server-side validation enforces the valid pairing.',
      },

      validate: (value: unknown) => {
        return validateOptionalText(value, 'Specific capability', 200)
      },
    },

    /*
     * MESSAGE
     */
    {
      name: 'message',

      type: 'textarea',

      required: true,

      maxLength: 5000,

      admin: {
        description: 'Business requirement or enquiry submitted by the visitor.',
      },

      validate: (value: unknown) => validateRequiredText(value, 'Message', 20, 5000),
    },

    /*
     * PRIVACY CONSENT
     */
    {
      name: 'privacyConsent',

      type: 'checkbox',

      required: true,

      admin: {
        description: 'Visitor confirmed the applicable TRYVION privacy notice/consent statement.',
      },
    },

    /*
     * PRIVACY CONSENT TIMESTAMP
     */
    {
      name: 'privacyConsentAt',

      type: 'date',

      admin: {
        readOnly: true,

        description: 'Timestamp recorded when privacy consent was accepted.',
      },
    },

    /*
     * NEWSLETTER OPT-IN
     */
    {
      name: 'newsletterOptIn',

      type: 'checkbox',

      defaultValue: false,

      admin: {
        description: 'Optional consent to receive TRYVION marketing/newsletter communications.',
      },
    },

    /*
     * LEAD STATUS
     */
    {
      name: 'status',

      type: 'select',

      required: true,

      defaultValue: 'new',

      options: [
        {
          label: 'New',
          value: 'new',
        },

        {
          label: 'In Progress',
          value: 'in_progress',
        },

        {
          label: 'Contacted',
          value: 'contacted',
        },

        {
          label: 'Qualified',
          value: 'qualified',
        },

        {
          label: 'Closed',
          value: 'closed',
        },

        {
          label: 'Spam',
          value: 'spam',
        },
      ],

      admin: {
        position: 'sidebar',
      },
    },

    /*
     * SOURCE
     */
    {
      name: 'source',

      type: 'text',

      maxLength: 100,

      defaultValue: 'website-contact-form',

      admin: {
        position: 'sidebar',

        description: 'Origin of the submission.',
      },
    },

    /*
     * SUBMITTED AT
     */
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
