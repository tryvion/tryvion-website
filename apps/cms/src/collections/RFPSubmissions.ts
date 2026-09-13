import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

/**
 * TRYVION RFP / Request a Proposal controlled vocabulary.
 *
 * These values are intentionally kept stable because they will be used by
 * both the public RFP form and the Payload collection.
 */

const INDUSTRY_OPTIONS = [
  'Consumer Products',
  'Retail',
  'Fashion',
  'Wholesale & Distribution',
  'Life Sciences',
  'Agribusiness',
  'Financial Services',
  'Banking',
  'Insurance',
  'Public Sector',
  'Healthcare',
  'Education & Research',
  'Defence & Security',
  'Industrial Manufacturing',
  'High Tech',
  'Automotive',
  'Aerospace & Defence',
  'Energy & Utilities',
  'Mining',
  'Chemicals',
  'Oil & Gas',
  'Construction & Operations',
  'Commercial Real Estate',
  'Sports & Entertainment',
  'Travel & Leisure',
  'Professional Services',
  'Other',
] as const

const ORGANISATION_SIZE_OPTIONS = [
  '1–499 employees',
  '500–4,999 employees',
  '5,000–24,999 employees',
  '25,000–49,999 employees',
  '50,000+ employees',
] as const

const BUSINESS_FUNCTION_OPTIONS = [
  'Executive / Leadership',
  'IT / Technology',
  'Digital Transformation',
  'Finance',
  'Procurement',
  'Operations',
  'Human Resources',
  'Supply Chain',
  'Sales / Commercial',
  'Strategy',
  'Other',
] as const

const PROCUREMENT_INVOLVEMENT_OPTIONS = [
  'Procurement Lead',
  'Business Sponsor',
  'Technology / IT Lead',
  'Transformation Lead',
  'Project / Programme Manager',
  'Executive Decision Maker',
  'Procurement + Business Sponsor',
  'Other',
] as const

const PRIMARY_CAPABILITY_OPTIONS = [
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

const AFFECTED_FUNCTION_OPTIONS = [
  'Finance',
  'Procurement',
  'Supply Chain',
  'Manufacturing',
  'Sales',
  'Marketing',
  'Customer Service',
  'Human Resources',
  'IT / Technology',
  'Data & Analytics',
  'Cybersecurity',
  'Operations',
  'Legal / Compliance',
  'Strategy / Transformation Office',
  'Executive / Corporate Functions',
  'Multiple / Enterprise-Wide',
  'Other',
] as const

const DEPLOYMENT_SCALE_OPTIONS = [
  'Single Business Unit',
  'Single Country',
  'Multiple Countries',
  'Regional',
  'Global',
  'Enterprise-Wide',
  'Not Yet Determined',
] as const

const TRANSFORMATION_STAGE_OPTIONS = [
  'Exploring / Early Discovery',
  'Business Case Development',
  'Requirements Definition',
  'Solution Evaluation',
  'RFI / Market Research',
  'RFP / Tender Preparation',
  'RFP / Tender Issued',
  'Vendor Shortlisting',
  'Final Evaluation',
  'Contract / Commercial Negotiation',
  'Implementation Planning',
  'Existing Programme / Transformation',
  'Optimisation / Managed Services',
  'Not Yet Determined',
] as const

const PROCUREMENT_STAGE_OPTIONS = [
  'Internal Requirement Identified',
  'Business Case Approved',
  'Market Research / RFI',
  'RFP / RFQ Preparation',
  'RFP / RFQ Issued',
  'Vendor Evaluation',
  'Shortlisting',
  'Commercial Negotiation',
  'Final Approval',
  'Award Pending',
  'Direct Procurement / No Formal Tender',
  'Not Yet Determined',
] as const

const ENGAGEMENT_DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  '12–24 months',
  '24+ months',
  'Ongoing / Managed Service',
  'Not Yet Determined',
] as const

const COMMERCIAL_MODEL_OPTIONS = [
  'Fixed Price',
  'Time & Materials',
  'Managed Services',
  'Subscription / Recurring',
  'Outcome-Based',
  'Milestone-Based',
  'Hybrid',
  'Not Yet Determined',
] as const

const BUDGET_RANGE_OPTIONS = [
  'Not Yet Determined',
  'Under USD 50K',
  'USD 50K – 250K',
  'USD 250K – 1M',
  'USD 1M – 5M',
  'USD 5M+',
  'Prefer Not to Disclose',
] as const

const DELIVERY_MODEL_OPTIONS = [
  'Onsite',
  'Remote',
  'Hybrid',
  'Global Delivery',
  'Regional Delivery',
  'Not Yet Determined',
] as const

const DOCUMENT_TYPE_OPTIONS = [
  'RFP / RFQ',
  'Statement of Work',
  'Technical Requirements',
  'Commercial / Pricing Schedule',
  'Architecture / Process Documentation',
  'Business Requirements',
  'Existing Solution Documentation',
  'Supporting Document',
  'Other',
] as const

const SUBMISSION_STATUS_OPTIONS = [
  'New',
  'Under Review',
  'Qualified',
  'Proposal in Preparation',
  'Proposal Submitted',
  'Won',
  'Lost',
  'On Hold',
  'Disqualified',
] as const

const QUALIFICATION_STATUS_OPTIONS = [
  'Not Reviewed',
  'Pending Qualification',
  'Qualified',
  'Unqualified',
  'Needs More Information',
] as const

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'] as const

const ACCOUNT_STATUS_OPTIONS = [
  'Prospect',
  'Existing Customer',
  'Former Customer',
  'Strategic Account',
  'Partner / Alliance',
  'Unknown',
] as const

const normalizeText = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim()
}

const normalizeEmail = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim().toLowerCase()
}

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

const validateEmail = (value: unknown): true | string => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Proposal contact email is required.'
  }

  const email = value.trim()

  if (email.length > 254) {
    return 'Proposal contact email must be 254 characters or fewer.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    return 'Please enter a valid proposal contact email.'
  }

  return true
}

const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (!data) {
    return data
  }

  const normalized: Record<string, unknown> = {
    ...data,

    organisationLegalName: normalizeText(data.organisationLegalName),
    organisationWebsite: normalizeText(data.organisationWebsite),
    industrySector: normalizeText(data.industrySector),
    headquartersCountry: normalizeText(data.headquartersCountry),
    primaryOperatingMarket: normalizeText(data.primaryOperatingMarket),
    organisationSize: normalizeText(data.organisationSize),
    businessFunction: normalizeText(data.businessFunction),

    proposalContactName: normalizeText(data.proposalContactName),
    proposalContactRole: normalizeText(data.proposalContactRole),
    procurementInvolvement: normalizeText(data.procurementInvolvement),
    proposalContactEmail: normalizeEmail(data.proposalContactEmail),
    proposalContactPhone: normalizeText(data.proposalContactPhone),

    initiativeName: normalizeText(data.initiativeName),
    transformationObjective: normalizeText(data.transformationObjective),
    businessChallenge: normalizeText(data.businessChallenge),
    desiredOutcomes: normalizeText(data.desiredOutcomes),
    primaryCapability: normalizeText(data.primaryCapability),

    scopeOfWork: normalizeText(data.scopeOfWork),
    expectedDeliverables: normalizeText(data.expectedDeliverables),
    functionalRequirements: normalizeText(data.functionalRequirements),
    technicalRequirements: normalizeText(data.technicalRequirements),
    integrationRequirements: normalizeText(data.integrationRequirements),
    dataMigrationRequirements: normalizeText(data.dataMigrationRequirements),
    securityComplianceRequirements: normalizeText(data.securityComplianceRequirements),
    reportingRequirements: normalizeText(data.reportingRequirements),
    serviceLevelRequirements: normalizeText(data.serviceLevelRequirements),
    existingTechnologyLandscape: normalizeText(data.existingTechnologyLandscape),
    constraintsDependencies: normalizeText(data.constraintsDependencies),
    successMeasures: normalizeText(data.successMeasures),

    procurementReference: normalizeText(data.procurementReference),
    rfpReference: normalizeText(data.rfpReference),
    proposalDeadline: normalizeText(data.proposalDeadline),
    expectedAwardDate: normalizeText(data.expectedAwardDate),
    expectedStartDate: normalizeText(data.expectedStartDate),
    contractingEntityCountry: normalizeText(data.contractingEntityCountry),
    deliveryLocations: normalizeText(data.deliveryLocations),

    sourceUrl: normalizeText(data.sourceUrl),
    sourcePage: normalizeText(data.sourcePage),
    landingPage: normalizeText(data.landingPage),
    referrerUrl: normalizeText(data.referrerUrl),
    utmSource: normalizeText(data.utmSource),
    utmMedium: normalizeText(data.utmMedium),
    utmCampaign: normalizeText(data.utmCampaign),
    utmTerm: normalizeText(data.utmTerm),
    utmContent: normalizeText(data.utmContent),
    serviceContext: normalizeText(data.serviceContext),
    industryContext: normalizeText(data.industryContext),
    locale: normalizeText(data.locale),
    userAgent: normalizeText(data.userAgent),

    privacyConsent: data.privacyConsent,
    marketingConsent: data.marketingConsent,
    consentTimestamp: data.consentTimestamp,
    consentVersion: normalizeText(data.consentVersion),
    privacyPolicyVersion: normalizeText(data.privacyPolicyVersion),
  }

  /**
   * Privacy consent is mandatory for every new public submission.
   */
  if (operation === 'create') {
    if (normalized.privacyConsent !== true) {
      throw new Error('Privacy consent is required to submit this form.')
    }

    if (!normalized.consentTimestamp) {
      normalized.consentTimestamp = new Date().toISOString()
    }

    if (!normalized.formType) {
      normalized.formType = 'RFP'
    }

    if (!normalized.submissionStatus) {
      normalized.submissionStatus = 'New'
    }

    if (!normalized.qualificationStatus) {
      normalized.qualificationStatus = 'Not Reviewed'
    }
  }

  return normalized
}

export const RFPSubmissions: CollectionConfig = {
  slug: 'rfp-submissions',

  labels: {
    singular: 'RFP Submission',
    plural: 'RFP Submissions',
  },

  admin: {
    useAsTitle: 'initiativeName',

    defaultColumns: [
      'initiativeName',
      'organisationLegalName',
      'proposalContactEmail',
      'primaryCapability',
      'procurementStage',
      'submissionStatus',
      'createdAt',
    ],

    group: 'Lead Management',

    description:
      'Formal RFP / Request a Proposal submissions received through the TRYVION website.',
  },

  /**
   * Public users cannot directly create/read/update/delete records
   * through Payload's generic collection API.
   *
   * The dedicated /api/rfp endpoint will perform validation and use
   * Payload Local API with overrideAccess.
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
    /**
     * ================================================================
     * ORGANISATION
     * ================================================================
     */

    {
      name: 'organisationLegalName',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Legal name of the organisation submitting the proposal request.',
      },
      validate: (value: unknown) => validateRequiredText(value, 'Organisation legal name', 2, 200),
    },

    {
      name: 'organisationWebsite',
      type: 'text',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Official organisation website.',
      },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value.trim()) {
          return 'Organisation website is required.'
        }

        try {
          const url = new URL(value.trim())

          if (!['http:', 'https:'].includes(url.protocol)) {
            return 'Organisation website must use HTTP or HTTPS.'
          }

          return true
        } catch {
          return 'Please enter a valid organisation website.'
        }
      },
    },

    {
      name: 'industrySector',
      type: 'select',
      required: true,
      options: INDUSTRY_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'headquartersCountry',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Country where the organisation is headquartered.',
      },
      validate: (value: unknown) =>
        validateRequiredText(value, 'Organisation headquarters', 2, 100),
    },

    {
      name: 'primaryOperatingMarket',
      type: 'text',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Primary country or regional market relevant to this opportunity.',
      },
      validate: (value: unknown) => validateRequiredText(value, 'Primary operating market', 2, 150),
    },

    {
      name: 'organisationSize',
      type: 'select',
      required: true,
      options: ORGANISATION_SIZE_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'businessFunction',
      type: 'select',
      required: true,
      options: BUSINESS_FUNCTION_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'proposalContactName',
      type: 'text',
      required: true,
      maxLength: 150,
      validate: (value: unknown) => validateRequiredText(value, 'Proposal contact name', 2, 150),
    },

    {
      name: 'proposalContactRole',
      type: 'text',
      required: true,
      maxLength: 150,
      validate: (value: unknown) => validateRequiredText(value, 'Contact role / title', 2, 150),
    },

    {
      name: 'procurementInvolvement',
      type: 'select',
      required: true,
      options: PROCUREMENT_INVOLVEMENT_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'proposalContactEmail',
      type: 'email',
      required: true,
      validate: validateEmail,
    },

    {
      name: 'proposalContactPhone',
      type: 'text',
      maxLength: 50,
      validate: (value: unknown) => validateOptionalText(value, 'Proposal contact phone', 50),
    },

    /**
     * ================================================================
     * INITIATIVE
     * ================================================================
     */

    {
      name: 'initiativeName',
      type: 'text',
      required: true,
      maxLength: 200,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Initiative / project name', 2, 200),
    },

    {
      name: 'transformationObjective',
      type: 'textarea',
      required: true,
      maxLength: 5000,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Transformation objective', 20, 5000),
    },

    {
      name: 'businessChallenge',
      type: 'textarea',
      required: true,
      maxLength: 10000,
      validate: (value: unknown) => validateRequiredText(value, 'Business challenge', 20, 10000),
    },

    {
      name: 'desiredOutcomes',
      type: 'textarea',
      required: true,
      maxLength: 10000,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Desired business outcomes', 20, 10000),
    },

    {
      name: 'primaryCapability',
      type: 'select',
      required: true,
      options: PRIMARY_CAPABILITY_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'secondaryCapabilities',
      type: 'select',
      hasMany: true,
      options: PRIMARY_CAPABILITY_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'affectedFunctions',
      type: 'select',
      required: true,
      hasMany: true,
      options: AFFECTED_FUNCTION_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'targetGeography',
      type: 'text',
      required: true,
      maxLength: 500,
      admin: {
        description: 'Countries or regions where the proposed solution will be delivered or used.',
      },
      validate: (value: unknown) => validateRequiredText(value, 'Target geography', 2, 500),
    },

    {
      name: 'estimatedUserCount',
      type: 'number',
      min: 0,
      admin: {
        description: 'Estimated number of users or stakeholders affected by the initiative.',
      },
    },

    {
      name: 'deploymentScale',
      type: 'select',
      options: DEPLOYMENT_SCALE_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'transformationStage',
      type: 'select',
      required: true,
      options: TRANSFORMATION_STAGE_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    /**
     * ================================================================
     * REQUIREMENTS
     * ================================================================
     */

    {
      name: 'scopeOfWork',
      type: 'textarea',
      required: true,
      maxLength: 20000,
      validate: (value: unknown) => validateRequiredText(value, 'Scope of work', 30, 20000),
    },

    {
      name: 'expectedDeliverables',
      type: 'textarea',
      required: true,
      maxLength: 15000,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Key deliverables expected', 20, 15000),
    },

    {
      name: 'functionalRequirements',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'technicalRequirements',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'integrationRequirements',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'dataMigrationRequirements',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'securityComplianceRequirements',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'reportingRequirements',
      type: 'textarea',
      maxLength: 10000,
    },

    {
      name: 'serviceLevelRequirements',
      type: 'textarea',
      maxLength: 10000,
    },

    {
      name: 'existingTechnologyStack',
      type: 'select',
      hasMany: true,
      options: [
        'SAP',
        'Oracle',
        'Microsoft',
        'Salesforce',
        'Workday',
        'ServiceNow',
        'AWS',
        'Microsoft Azure',
        'Google Cloud',
        'Snowflake',
        'Databricks',
        'Other',
        'None / Greenfield',
      ].map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'existingTechnologyLandscape',
      type: 'textarea',
      maxLength: 15000,
    },

    {
      name: 'constraintsDependencies',
      type: 'textarea',
      maxLength: 10000,
    },

    {
      name: 'successMeasures',
      type: 'textarea',
      maxLength: 10000,
    },

    /**
     * ================================================================
     * PROCUREMENT & COMMERCIAL
     * ================================================================
     */

    {
      name: 'procurementReference',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'rfpReference',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'procurementStage',
      type: 'select',
      required: true,
      options: PROCUREMENT_STAGE_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'proposalDeadline',
      type: 'date',
    },

    {
      name: 'expectedAwardDate',
      type: 'date',
    },

    {
      name: 'expectedStartDate',
      type: 'date',
    },

    {
      name: 'engagementDuration',
      type: 'select',
      options: ENGAGEMENT_DURATION_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'commercialModel',
      type: 'select',
      options: COMMERCIAL_MODEL_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'budgetRange',
      type: 'select',
      options: BUDGET_RANGE_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'proposalCurrency',
      type: 'text',
      maxLength: 10,
      admin: {
        description:
          'Currency expected for the proposal, preferably ISO 4217 code such as USD or EUR.',
      },
      validate: (value: unknown) => validateOptionalText(value, 'Proposal currency', 10),
    },

    {
      name: 'contractingEntityCountry',
      type: 'text',
      maxLength: 100,
    },

    {
      name: 'deliveryModel',
      type: 'select',
      options: DELIVERY_MODEL_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'deliveryLocations',
      type: 'textarea',
      maxLength: 5000,
    },

    /**
     * ================================================================
     * DOCUMENTS
     * ================================================================
     */

    {
      name: 'documents',
      type: 'array',
      labels: {
        singular: 'Document',
        plural: 'Documents',
      },
      fields: [
        {
          name: 'documentType',
          type: 'select',
          required: true,
          options: DOCUMENT_TYPE_OPTIONS.map((value) => ({
            label: value,
            value,
          })),
        },

        {
          name: 'documentDescription',
          type: 'text',
          maxLength: 500,
        },

        {
          name: 'fileName',
          type: 'text',
          required: true,
          maxLength: 255,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'blobPathname',
          type: 'text',
          required: true,
          maxLength: 1000,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'blobUrl',
          type: 'text',
          required: true,
          maxLength: 2000,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'contentType',
          type: 'text',
          required: true,
          maxLength: 150,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'fileSize',
          type: 'number',
          required: true,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'etag',
          type: 'text',
          maxLength: 500,
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'uploadedAt',
          type: 'date',
          required: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    /**
     * ================================================================
     * CONSENT
     * ================================================================
     */

    {
      name: 'privacyConsent',
      type: 'checkbox',
      required: true,
      admin: {
        description:
          'Required: acknowledgement that TRYVION may use the submitted information to evaluate and respond to this proposal request.',
      },
    },

    {
      name: 'marketingConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Optional consent to receive relevant TRYVION services, insights and future opportunities.',
      },
    },

    {
      name: 'consentTimestamp',
      type: 'date',
    },

    {
      name: 'consentVersion',
      type: 'text',
      maxLength: 50,
    },

    {
      name: 'privacyPolicyVersion',
      type: 'text',
      maxLength: 50,
    },

    /**
     * ================================================================
     * SYSTEM / ATTRIBUTION
     * ================================================================
     */

    {
      name: 'submissionId',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Unique identifier assigned to the RFP submission.',
      },
    },

    {
      name: 'formType',
      type: 'text',
      defaultValue: 'RFP',
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'sourceUrl',
      type: 'text',
      maxLength: 2000,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'sourcePage',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'landingPage',
      type: 'text',
      maxLength: 2000,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'referrerUrl',
      type: 'text',
      maxLength: 2000,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'utmSource',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'utmMedium',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'utmCampaign',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'utmTerm',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'utmContent',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'serviceContext',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'industryContext',
      type: 'text',
      maxLength: 500,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'locale',
      type: 'text',
      maxLength: 50,
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'userAgent',
      type: 'text',
      maxLength: 2000,
      admin: {
        readOnly: true,
      },
    },

    /**
     * ================================================================
     * INTERNAL LEAD MANAGEMENT
     * ================================================================
     */

    {
      name: 'submissionStatus',
      type: 'select',
      defaultValue: 'New',
      options: SUBMISSION_STATUS_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'leadPriority',
      type: 'select',
      options: PRIORITY_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'leadScore',
      type: 'number',
      min: 0,
      max: 100,
    },

    {
      name: 'qualificationStatus',
      type: 'select',
      defaultValue: 'Not Reviewed',
      options: QUALIFICATION_STATUS_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'assignedOwner',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'assignedTeam',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'market',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'salesRegion',
      type: 'text',
      maxLength: 150,
    },

    {
      name: 'accountStatus',
      type: 'select',
      options: ACCOUNT_STATUS_OPTIONS.map((value) => ({
        label: value,
        value,
      })),
    },

    {
      name: 'internalNotes',
      type: 'textarea',
      maxLength: 20000,
    },

    {
      name: 'followUpDate',
      type: 'date',
    },
  ],
}
