import { head } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { getRFPBlobAuthOptions } from '../../../../lib/rfpBlob'

import config from '@payload-config'

import type { RfpSubmission } from '../../../../payload-types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/*
 * ================================================================
 * PAYLOAD TYPES
 * ================================================================
 */

type IndustrySector = NonNullable<RfpSubmission['industrySector']>
type OrganisationSize = NonNullable<RfpSubmission['organisationSize']>
type BusinessFunction = NonNullable<RfpSubmission['businessFunction']>
type ProcurementInvolvement = NonNullable<RfpSubmission['procurementInvolvement']>
type PrimaryCapability = NonNullable<RfpSubmission['primaryCapability']>
type SecondaryCapability = NonNullable<RfpSubmission['secondaryCapabilities']>[number]
type AffectedFunction = NonNullable<RfpSubmission['affectedFunctions']>[number]
type DeploymentScale = NonNullable<RfpSubmission['deploymentScale']>
type TransformationStage = NonNullable<RfpSubmission['transformationStage']>
type ProcurementStage = NonNullable<RfpSubmission['procurementStage']>
type EngagementDuration = NonNullable<RfpSubmission['engagementDuration']>
type CommercialModel = NonNullable<RfpSubmission['commercialModel']>
type BudgetRange = NonNullable<RfpSubmission['budgetRange']>
type DeliveryModel = NonNullable<RfpSubmission['deliveryModel']>
type DocumentType = NonNullable<RfpSubmission['documents']>[number]['documentType']
type ExistingTechnology = NonNullable<RfpSubmission['existingTechnologyStack']>[number]

/*
 * ================================================================
 * CONTROLLED VOCABULARIES
 * ================================================================
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
] as const satisfies readonly IndustrySector[]

const ORGANISATION_SIZE_OPTIONS = [
  '1–499 employees',
  '500–4,999 employees',
  '5,000–24,999 employees',
  '25,000–49,999 employees',
  '50,000+ employees',
] as const satisfies readonly OrganisationSize[]

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
] as const satisfies readonly BusinessFunction[]

const PROCUREMENT_INVOLVEMENT_OPTIONS = [
  'Procurement Lead',
  'Business Sponsor',
  'Technology / IT Lead',
  'Transformation Lead',
  'Project / Programme Manager',
  'Executive Decision Maker',
  'Procurement + Business Sponsor',
  'Other',
] as const satisfies readonly ProcurementInvolvement[]

const PRIMARY_CAPABILITY_OPTIONS = [
  'SAP S/4HANA',
  'SAP SuccessFactors',
  'SAP Customer Experience',
  'SAP Ariba',
  'SAP Business Technology Platform (BTP)',
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
] as const satisfies readonly PrimaryCapability[]

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
] as const satisfies readonly AffectedFunction[]

const DEPLOYMENT_SCALE_OPTIONS = [
  'Single Business Unit',
  'Single Country',
  'Multiple Countries',
  'Regional',
  'Global',
  'Enterprise-Wide',
  'Not Yet Determined',
] as const satisfies readonly DeploymentScale[]

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
] as const satisfies readonly TransformationStage[]

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
] as const satisfies readonly ProcurementStage[]

const ENGAGEMENT_DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  '12–24 months',
  '24+ months',
  'Ongoing / Managed Service',
  'Not Yet Determined',
] as const satisfies readonly EngagementDuration[]

const COMMERCIAL_MODEL_OPTIONS = [
  'Fixed Price',
  'Time & Materials',
  'Managed Services',
  'Subscription / Recurring',
  'Outcome-Based',
  'Milestone-Based',
  'Hybrid',
  'Not Yet Determined',
] as const satisfies readonly CommercialModel[]

const BUDGET_RANGE_OPTIONS = [
  'Not Yet Determined',
  'Under USD 50K',
  'USD 50K – 250K',
  'USD 250K – 1M',
  'USD 1M – 5M',
  'USD 5M+',
  'Prefer Not to Disclose',
] as const satisfies readonly BudgetRange[]

const DELIVERY_MODEL_OPTIONS = [
  'Onsite',
  'Remote',
  'Hybrid',
  'Global Delivery',
  'Regional Delivery',
  'Not Yet Determined',
] as const satisfies readonly DeliveryModel[]

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
] as const satisfies readonly DocumentType[]

const EXISTING_TECHNOLOGY_OPTIONS = [
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
] as const satisfies readonly ExistingTechnology[]

/*
 * ================================================================
 * REQUEST LIMITS
 * ================================================================
 */

const MAX_REQUEST_SIZE = 25 * 1024 * 1024
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
]
const MAX_FILES = 10

/*
 * ================================================================
 * HELPERS
 * ================================================================
 */

function text(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

function booleanValue(value: FormDataEntryValue | null): boolean {
  if (typeof value !== 'string') {
    return false
  }

  return value === 'true' || value === '1' || value === 'on'
}

function isOneOf<T extends string>(value: string, options: readonly T[]): value is T {
  return options.includes(value as T)
}

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

function generateSubmissionId(): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14)

  const random = Math.random().toString(36).slice(2, 8).toUpperCase()

  return `RFP-${timestamp}-${random}`
}

function getStringArray(formData: FormData, fieldName: string): string[] {
  return formData
    .getAll(fieldName)
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())
    .filter(Boolean)
}

/*
 * ================================================================
 * POST
 * ================================================================
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    /*
     * ==============================================================
     * REQUEST VALIDATION
     * ==============================================================
     */

    const contentLength = request.headers.get('content-length')

    if (contentLength && Number(contentLength) > MAX_REQUEST_SIZE) {
      return jsonError('The uploaded request is too large.', 413)
    }

    const contentType = request.headers.get('content-type') || ''

    if (!contentType.toLowerCase().includes('multipart/form-data')) {
      return jsonError('This endpoint requires a multipart/form-data request.')
    }

    const formData = await request.formData()

    /*
     * ==============================================================
     * HONEYPOT
     * ==============================================================
     */

    const website = text(formData.get('website'))

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you. Your proposal request has been received.',
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      )
    }

    /*
     * ==============================================================
     * ORGANISATION
     * ==============================================================
     */

    const organisationLegalName = text(formData.get('organisationLegalName'))

    const organisationWebsite = text(formData.get('organisationWebsite'))

    const industrySectorValue = text(formData.get('industrySector'))

    if (!isOneOf(industrySectorValue, INDUSTRY_OPTIONS)) {
      return jsonError('Please select a valid industry sector.')
    }

    const industrySector: IndustrySector = industrySectorValue

    const headquartersCountry = text(formData.get('headquartersCountry'))

    const primaryOperatingMarket = text(formData.get('primaryOperatingMarket'))

    const organisationSizeValue = text(formData.get('organisationSize'))

    if (!isOneOf(organisationSizeValue, ORGANISATION_SIZE_OPTIONS)) {
      return jsonError('Please select a valid organisation size.')
    }

    const organisationSize: OrganisationSize = organisationSizeValue

    const businessFunctionValue = text(formData.get('businessFunction'))

    if (!isOneOf(businessFunctionValue, BUSINESS_FUNCTION_OPTIONS)) {
      return jsonError('Please select a valid business function.')
    }

    const businessFunction: BusinessFunction = businessFunctionValue

    const proposalContactName = text(formData.get('proposalContactName'))

    const proposalContactRole = text(formData.get('proposalContactRole'))

    const procurementInvolvementValue = text(formData.get('procurementInvolvement'))

    if (!isOneOf(procurementInvolvementValue, PROCUREMENT_INVOLVEMENT_OPTIONS)) {
      return jsonError('Please select a valid procurement involvement.')
    }

    const procurementInvolvement: ProcurementInvolvement = procurementInvolvementValue

    const proposalContactEmail = text(formData.get('proposalContactEmail')).toLowerCase()

    const proposalContactPhone = text(formData.get('proposalContactPhone'))

    /*
     * ==============================================================
     * INITIATIVE
     * ==============================================================
     */

    const initiativeName = text(formData.get('initiativeName'))

    const transformationObjective = text(formData.get('transformationObjective'))

    const businessChallenge = text(formData.get('businessChallenge'))

    const desiredOutcomes = text(formData.get('desiredOutcomes'))

    const primaryCapabilityValue = text(formData.get('primaryCapability'))

    if (!isOneOf(primaryCapabilityValue, PRIMARY_CAPABILITY_OPTIONS)) {
      return jsonError('Please select a valid primary capability.')
    }

    const primaryCapability: PrimaryCapability = primaryCapabilityValue

    const secondaryCapabilityValues = getStringArray(formData, 'secondaryCapabilities')

    const secondaryCapabilities = secondaryCapabilityValues.filter(
      (value): value is SecondaryCapability => isOneOf(value, PRIMARY_CAPABILITY_OPTIONS),
    )

    if (secondaryCapabilities.length !== secondaryCapabilityValues.length) {
      return jsonError('One or more secondary capabilities are invalid.')
    }

    const affectedFunctionValues = getStringArray(formData, 'affectedFunctions')

    if (!affectedFunctionValues.length) {
      return jsonError('Please select at least one affected business function.')
    }

    const affectedFunctions = affectedFunctionValues.filter((value): value is AffectedFunction =>
      isOneOf(value, AFFECTED_FUNCTION_OPTIONS),
    )

    if (affectedFunctions.length !== affectedFunctionValues.length) {
      return jsonError('One or more affected business functions are invalid.')
    }

    const targetGeography = text(formData.get('targetGeography'))

    const estimatedUserCountRaw = text(formData.get('estimatedUserCount'))

    const deploymentScaleValue = text(formData.get('deploymentScale'))

    let deploymentScale: DeploymentScale | undefined

    if (deploymentScaleValue) {
      if (!isOneOf(deploymentScaleValue, DEPLOYMENT_SCALE_OPTIONS)) {
        return jsonError('Please select a valid deployment scale.')
      }

      deploymentScale = deploymentScaleValue
    }

    const transformationStageValue = text(formData.get('transformationStage'))

    if (!isOneOf(transformationStageValue, TRANSFORMATION_STAGE_OPTIONS)) {
      return jsonError('Please select a valid transformation stage.')
    }

    const transformationStage: TransformationStage = transformationStageValue

    /*
     * ==============================================================
     * REQUIREMENTS
     * ==============================================================
     */

    const scopeOfWork = text(formData.get('scopeOfWork'))

    const expectedDeliverables = text(formData.get('expectedDeliverables'))

    const functionalRequirements = text(formData.get('functionalRequirements'))

    const technicalRequirements = text(formData.get('technicalRequirements'))

    const integrationRequirements = text(formData.get('integrationRequirements'))

    const dataMigrationRequirements = text(formData.get('dataMigrationRequirements'))

    const securityComplianceRequirements = text(formData.get('securityComplianceRequirements'))

    const reportingRequirements = text(formData.get('reportingRequirements'))

    const serviceLevelRequirements = text(formData.get('serviceLevelRequirements'))

    const existingTechnologyValues = getStringArray(formData, 'existingTechnologyStack')

    const existingTechnologyStack = existingTechnologyValues.filter(
      (value): value is ExistingTechnology => isOneOf(value, EXISTING_TECHNOLOGY_OPTIONS),
    )

    if (existingTechnologyStack.length !== existingTechnologyValues.length) {
      return jsonError('One or more existing technology selections are invalid.')
    }

    const existingTechnologyLandscape = text(formData.get('existingTechnologyLandscape'))

    const constraintsDependencies = text(formData.get('constraintsDependencies'))

    const successMeasures = text(formData.get('successMeasures'))

    /*
     * ==============================================================
     * PROCUREMENT & COMMERCIAL
     * ==============================================================
     */

    const procurementReference = text(formData.get('procurementReference'))

    const rfpReference = text(formData.get('rfpReference'))

    const procurementStageValue = text(formData.get('procurementStage'))

    if (!isOneOf(procurementStageValue, PROCUREMENT_STAGE_OPTIONS)) {
      return jsonError('Please select a valid procurement stage.')
    }

    const procurementStage: ProcurementStage = procurementStageValue

    const proposalDeadline = text(formData.get('proposalDeadline'))

    const expectedStartDate = text(formData.get('expectedStartDate'))

    const expectedAwardDate = text(formData.get('expectedAwardDate'))

    const engagementDurationValue = text(formData.get('engagementDuration'))

    let engagementDuration: EngagementDuration | undefined

    if (engagementDurationValue) {
      if (!isOneOf(engagementDurationValue, ENGAGEMENT_DURATION_OPTIONS)) {
        return jsonError('Please select a valid engagement duration.')
      }

      engagementDuration = engagementDurationValue
    }

    const commercialModelValue = text(formData.get('commercialModel'))

    let commercialModel: CommercialModel | undefined

    if (commercialModelValue) {
      if (!isOneOf(commercialModelValue, COMMERCIAL_MODEL_OPTIONS)) {
        return jsonError('Please select a valid commercial model.')
      }

      commercialModel = commercialModelValue
    }

    const budgetRangeValue = text(formData.get('budgetRange'))

    let budgetRange: BudgetRange | undefined

    if (budgetRangeValue) {
      if (!isOneOf(budgetRangeValue, BUDGET_RANGE_OPTIONS)) {
        return jsonError('Please select a valid budget range.')
      }

      budgetRange = budgetRangeValue
    }

    const proposalCurrency = text(formData.get('proposalCurrency'))

    const contractingEntityCountry = text(formData.get('contractingEntityCountry'))

    const deliveryModelValue = text(formData.get('deliveryModel'))

    let deliveryModel: DeliveryModel | undefined

    if (deliveryModelValue) {
      if (!isOneOf(deliveryModelValue, DELIVERY_MODEL_OPTIONS)) {
        return jsonError('Please select a valid delivery model.')
      }

      deliveryModel = deliveryModelValue
    }

    const deliveryLocations = text(formData.get('deliveryLocations'))

    /*
     * ==============================================================
     * CONSENT
     * ==============================================================
     */

    const privacyConsent = booleanValue(formData.get('privacyConsent'))

    const marketingConsent = booleanValue(formData.get('marketingConsent'))

    if (!privacyConsent) {
      return jsonError('Privacy consent is required to submit this proposal request.')
    }

    /*
     * ==============================================================
     * BASIC VALIDATION
     * ==============================================================
     */

    if (organisationLegalName.length < 2 || organisationLegalName.length > 200) {
      return jsonError('Organisation legal name must be between 2 and 200 characters.')
    }

    if (!headquartersCountry || headquartersCountry.length > 100) {
      return jsonError('Please provide the organisation headquarters.')
    }

    if (!primaryOperatingMarket || primaryOperatingMarket.length > 150) {
      return jsonError('Please provide the primary operating market.')
    }

    if (!organisationWebsite || organisationWebsite.length > 300) {
      return jsonError('Please provide a valid organisation website.')
    }

    try {
      const websiteUrl = new URL(organisationWebsite)

      if (!['http:', 'https:'].includes(websiteUrl.protocol)) {
        return jsonError('Organisation website must use HTTP or HTTPS.')
      }
    } catch {
      return jsonError('Please provide a valid organisation website.')
    }

    if (
      !proposalContactName ||
      proposalContactName.length < 2 ||
      proposalContactName.length > 150
    ) {
      return jsonError('Proposal contact name must be between 2 and 150 characters.')
    }

    if (
      !proposalContactRole ||
      proposalContactRole.length < 2 ||
      proposalContactRole.length > 150
    ) {
      return jsonError('Contact role / title must be between 2 and 150 characters.')
    }

    if (
      !proposalContactEmail ||
      proposalContactEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(proposalContactEmail)
    ) {
      return jsonError('Please provide a valid proposal contact email.')
    }

    if (
      proposalContactPhone &&
      (proposalContactPhone.length < 7 ||
        proposalContactPhone.length > 50 ||
        !/^[+0-9().\-\s]{7,50}$/.test(proposalContactPhone))
    ) {
      return jsonError('Please provide a valid proposal contact phone.')
    }

    if (!initiativeName || initiativeName.length < 2 || initiativeName.length > 200) {
      return jsonError('Initiative / project name must be between 2 and 200 characters.')
    }

    if (transformationObjective.length < 20 || transformationObjective.length > 5000) {
      return jsonError('Transformation objective must be between 20 and 5000 characters.')
    }

    if (businessChallenge.length < 20 || businessChallenge.length > 10000) {
      return jsonError('Business challenge must be between 20 and 10000 characters.')
    }

    if (desiredOutcomes.length < 20 || desiredOutcomes.length > 10000) {
      return jsonError('Desired business outcomes must be between 20 and 10000 characters.')
    }

    if (!targetGeography || targetGeography.length > 500) {
      return jsonError('Please provide the target geography.')
    }

    if (scopeOfWork.length < 30 || scopeOfWork.length > 20000) {
      return jsonError('Scope of work must be between 30 and 20000 characters.')
    }

    if (expectedDeliverables.length < 20 || expectedDeliverables.length > 15000) {
      return jsonError('Expected deliverables must be between 20 and 15000 characters.')
    }

    let estimatedUserCount: number | undefined

    if (estimatedUserCountRaw) {
      const parsed = Number(estimatedUserCountRaw)

      if (!Number.isFinite(parsed) || parsed < 0) {
        return jsonError('Estimated user count must be a valid number.')
      }

      estimatedUserCount = parsed
    }

    /*
     * ==============================================================
     * DATE VALIDATION
     * ==============================================================
     */

    const validateDate = (value: string, label: string): string | null => {
      if (!value) {
        return null
      }

      const parsed = new Date(value)

      if (Number.isNaN(parsed.getTime())) {
        return `${label} must be a valid date.`
      }

      return null
    }

    const proposalDeadlineError = validateDate(proposalDeadline, 'Proposal deadline')

    if (proposalDeadlineError) {
      return jsonError(proposalDeadlineError)
    }

    const expectedStartDateError = validateDate(expectedStartDate, 'Expected start date')

    if (expectedStartDateError) {
      return jsonError(expectedStartDateError)
    }

    const expectedAwardDateError = validateDate(expectedAwardDate, 'Expected award date')

    if (expectedAwardDateError) {
      return jsonError(expectedAwardDateError)
    }

    /*
     * ==============================================================
     * PAYLOAD
     * ==============================================================
     */

    const payload = await getPayload({ config })

    const submittedAt = new Date().toISOString()

    const submissionId = generateSubmissionId()

    /*
     * ==============================================================
     * DOCUMENT UPLOADS
     * ==============================================================
     */

    const documents: NonNullable<RfpSubmission['documents']> = []

    const uploadedDocumentsRaw = formData.get('uploadedDocuments')

    if (typeof uploadedDocumentsRaw !== 'string') {
      return jsonError('No uploaded documents were provided.')
    }

    let uploadedDocuments: Array<{
      documentType?: string
      documentDescription?: string
      fileName?: string
      blobPathname?: string
    }>

    try {
      uploadedDocuments = JSON.parse(uploadedDocumentsRaw)
    } catch {
      return jsonError('The uploaded document information is invalid.')
    }

    if (!Array.isArray(uploadedDocuments)) {
      return jsonError('The uploaded document information is invalid.')
    }

    if (uploadedDocuments.length > MAX_FILES) {
      return jsonError(`A maximum of ${MAX_FILES} documents may be uploaded.`)
    }

    for (let index = 0; index < uploadedDocuments.length; index += 1) {
      const uploadedDocument = uploadedDocuments[index]

      const fileName = uploadedDocument.fileName?.trim()

      if (!fileName) {
        return jsonError(`The file name for document ${index + 1} is missing.`)
      }

      if (fileName.length > 255) {
        return jsonError(`The file name for "${fileName}" is too long.`)
      }

      const blobPathname = uploadedDocument.blobPathname?.trim()

      if (!blobPathname) {
        return jsonError(`The Blob pathname for "${fileName}" is missing.`)
      }

      if (!blobPathname.startsWith('rfp-pending/') || blobPathname.includes('..')) {
        return jsonError(`The Blob pathname for "${fileName}" is invalid.`)
      }

      const documentTypeValue = uploadedDocument.documentType || 'Supporting Document'

      if (!isOneOf(documentTypeValue, DOCUMENT_TYPE_OPTIONS)) {
        return jsonError(`The document type for "${fileName}" is invalid.`)
      }

      const documentType: DocumentType = documentTypeValue

      const documentDescription = uploadedDocument.documentDescription?.trim() || undefined

      let blob

      try {
        blob = await head(blobPathname, {
          ...getRFPBlobAuthOptions(),
        })
      } catch (blobError) {
        console.error(
          `[TRYVION RFP Blob Verification] Unable to verify "${blobPathname}"`,
          blobError,
        )

        return jsonError(
          `The uploaded document "${fileName}" could not be verified in secure storage.`,
        )
      }

      if (!blob) {
        return jsonError(
          `The uploaded document "${fileName}" could not be found in secure storage.`,
        )
      }

      if (blob.pathname !== blobPathname) {
        return jsonError(
          `The uploaded document "${fileName}" could not be verified in secure storage.`,
        )
      }

      if (!blob.pathname.startsWith('rfp-pending/')) {
        return jsonError(`The uploaded document "${fileName}" is not a valid RFP document.`)
      }

      if (blob.size <= 0) {
        return jsonError(`The uploaded document "${fileName}" is empty.`)
      }

      if (blob.size > MAX_FILE_SIZE) {
        return jsonError(`"${fileName}" exceeds the 10 MB file size limit.`)
      }

      if (!ALLOWED_CONTENT_TYPES.includes(blob.contentType)) {
        return jsonError(`The file type for "${fileName}" is not allowed.`)
      }

      documents.push({
        documentType,
        ...(documentDescription
          ? {
              documentDescription,
            }
          : {}),
        fileName,
        blobPathname: blob.pathname,
        blobUrl: blob.url,
        contentType: blob.contentType,
        fileSize: blob.size,
        ...(blob.etag
          ? {
              etag: blob.etag,
            }
          : {}),
        uploadedAt: blob.uploadedAt.toISOString(),
      })
    }

    /*
     * ==============================================================
     * CREATE RFP SUBMISSION
     * ==============================================================
     */

    const submission = await payload.create({
      collection: 'rfp-submissions',

      draft: false,

      overrideAccess: true,

      data: {
        /*
         * ORGANISATION
         */

        organisationLegalName,

        organisationWebsite,

        industrySector,

        headquartersCountry,

        primaryOperatingMarket,

        organisationSize,

        businessFunction,

        /*
         * CONTACT
         */

        proposalContactName,

        proposalContactRole,

        procurementInvolvement,

        proposalContactEmail,

        ...(proposalContactPhone
          ? {
              proposalContactPhone,
            }
          : {}),

        /*
         * INITIATIVE
         */

        initiativeName,

        transformationObjective,

        businessChallenge,

        desiredOutcomes,

        primaryCapability,

        ...(secondaryCapabilities.length
          ? {
              secondaryCapabilities,
            }
          : {}),

        affectedFunctions,

        targetGeography,

        ...(estimatedUserCount !== undefined
          ? {
              estimatedUserCount,
            }
          : {}),

        ...(deploymentScale
          ? {
              deploymentScale,
            }
          : {}),

        transformationStage,

        /*
         * REQUIREMENTS
         */

        scopeOfWork,

        expectedDeliverables,

        ...(functionalRequirements
          ? {
              functionalRequirements,
            }
          : {}),

        ...(technicalRequirements
          ? {
              technicalRequirements,
            }
          : {}),

        ...(integrationRequirements
          ? {
              integrationRequirements,
            }
          : {}),

        ...(dataMigrationRequirements
          ? {
              dataMigrationRequirements,
            }
          : {}),

        ...(securityComplianceRequirements
          ? {
              securityComplianceRequirements,
            }
          : {}),

        ...(reportingRequirements
          ? {
              reportingRequirements,
            }
          : {}),

        ...(serviceLevelRequirements
          ? {
              serviceLevelRequirements,
            }
          : {}),

        ...(existingTechnologyStack.length
          ? {
              existingTechnologyStack,
            }
          : {}),

        ...(existingTechnologyLandscape
          ? {
              existingTechnologyLandscape,
            }
          : {}),

        ...(constraintsDependencies
          ? {
              constraintsDependencies,
            }
          : {}),

        ...(successMeasures
          ? {
              successMeasures,
            }
          : {}),

        /*
         * PROCUREMENT & COMMERCIAL
         */

        ...(procurementReference
          ? {
              procurementReference,
            }
          : {}),

        ...(rfpReference
          ? {
              rfpReference,
            }
          : {}),

        procurementStage,

        ...(proposalDeadline
          ? {
              proposalDeadline,
            }
          : {}),

        ...(expectedStartDate
          ? {
              expectedStartDate,
            }
          : {}),

        ...(expectedAwardDate
          ? {
              expectedAwardDate,
            }
          : {}),

        ...(engagementDuration
          ? {
              engagementDuration,
            }
          : {}),

        ...(commercialModel
          ? {
              commercialModel,
            }
          : {}),

        ...(budgetRange
          ? {
              budgetRange,
            }
          : {}),

        ...(proposalCurrency
          ? {
              proposalCurrency,
            }
          : {}),

        ...(contractingEntityCountry
          ? {
              contractingEntityCountry,
            }
          : {}),

        ...(deliveryModel
          ? {
              deliveryModel,
            }
          : {}),

        ...(deliveryLocations
          ? {
              deliveryLocations,
            }
          : {}),

        /*
         * DOCUMENTS
         */

        ...(documents.length
          ? {
              documents,
            }
          : {}),

        /*
         * CONSENT
         */

        privacyConsent: true,

        marketingConsent,

        consentTimestamp: submittedAt,

        consentVersion: 'v1',

        privacyPolicyVersion: 'v1',

        /*
         * SYSTEM
         */

        submissionId,

        formType: 'RFP',

        /*
         * ATTRIBUTION
         */

        sourceUrl: text(formData.get('sourceUrl')),

        sourcePage: text(formData.get('sourcePage')),

        landingPage: text(formData.get('landingPage')),

        referrerUrl: text(formData.get('referrerUrl')),

        utmSource: text(formData.get('utmSource')),

        utmMedium: text(formData.get('utmMedium')),

        utmCampaign: text(formData.get('utmCampaign')),

        utmTerm: text(formData.get('utmTerm')),

        utmContent: text(formData.get('utmContent')),

        serviceContext: text(formData.get('serviceContext')),

        industryContext: text(formData.get('industryContext')),

        locale: text(formData.get('locale')),

        userAgent: request.headers.get('user-agent') || '',
      },
    })

    /*
     * ==============================================================
     * SUCCESS
     * ==============================================================
     */

    return NextResponse.json(
      {
        success: true,

        message:
          'Thank you. Your proposal request has been received. Our team will review it and contact you shortly.',

        submissionId,

        id: submission.id,
      },
      {
        status: 200,

        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch (error) {
    console.error('[TRYVION RFP API]', error)

    return NextResponse.json(
      {
        success: false,

        message: 'Unable to submit your proposal request at this time. Please try again shortly.',
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
