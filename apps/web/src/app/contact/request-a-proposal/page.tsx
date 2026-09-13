'use client';

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  LockKeyhole,
  Paperclip,
  ShieldCheck,
  Target,
  Upload,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────
   TRYVION — REQUEST A PROPOSAL

   Route:
   /contact/request-a-proposal

   Front-end + API submission implementation.
   RFP documents upload directly to private Vercel Blob using Vercel OIDC.
   Final submission sends document metadata through /api/rfp.

   Design:
   • Premium enterprise RFP experience
   • Five-step progressive disclosure
   • Responsive desktop / tablet / mobile
   • Existing TRYVION design tokens
   • Lucide icons
   • Framer Motion
───────────────────────────────────────────────────────────────── */

const HERO_IMAGE = '/images/request-a-proposal.png';

const STEPS = [
  {
    number: 1,
    title: 'Organisation',
    description: 'Basic information about you.',
  },
  {
    number: 2,
    title: 'Project Details',
    description: 'Tell us about your project.',
  },
  {
    number: 3,
    title: 'Requirements',
    description: 'Share key information.',
  },
  {
    number: 4,
    title: 'Documents',
    description: 'Upload relevant documents.',
  },
  {
    number: 5,
    title: 'Review & Submit',
    description: 'Review and send your request.',
  },
] as const;

const INDUSTRIES = [
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
];

const ORGANISATION_SIZES = [
  '1–499 employees',
  '500–4,999 employees',
  '5,000–24,999 employees',
  '25,000–49,999 employees',
  '50,000+ employees',
];

const BUSINESS_FUNCTIONS = [
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
];

const CAPABILITIES = [
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
];

const AFFECTED_FUNCTIONS = [
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
];

const TRANSFORMATION_STAGES = [
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
];

const EXISTING_TECHNOLOGIES = [
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
];

const PROCUREMENT_STAGES = [
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
];

const COMMERCIAL_MODELS = [
  'Fixed Price',
  'Time & Materials',
  'Managed Services',
  'Subscription / Recurring',
  'Outcome-Based',
  'Milestone-Based',
  'Hybrid',
  'Not Yet Determined',
];

const BUDGET_RANGES = [
  'Not Yet Determined',
  'Under USD 50K',
  'USD 50K – 250K',
  'USD 250K – 1M',
  'USD 1M – 5M',
  'USD 5M+',
  'Prefer Not to Disclose',
];

const DELIVERY_MODELS = [
  'Onsite',
  'Remote',
  'Hybrid',
  'Global Delivery',
  'Regional Delivery',
  'Not Yet Determined',
];

const DOCUMENT_TYPES = [
  'RFP / RFQ',
  'Statement of Work',
  'Technical Requirements',
  'Commercial / Pricing Schedule',
  'Architecture / Process Documentation',
  'Business Requirements',
  'Existing Solution Documentation',
  'Supporting Document',
  'Other',
];

const ALLOWED_FILE_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'csv',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 10;

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  csv: 'text/csv',
};

type FormData = {
  organisationLegalName: string;
  organisationWebsite: string;
  industrySector: string;
  headquartersCountry: string;
  primaryOperatingMarket: string;
  organisationSize: string;
  businessFunction: string;
  proposalContactName: string;
  proposalContactRole: string;
  procurementInvolvement: string;
  proposalContactEmail: string;
  proposalContactPhone: string;

  initiativeName: string;
  transformationObjective: string;
  businessChallenge: string;
  desiredOutcomes: string;
  primaryCapability: string;
  secondaryCapabilities: string[];
  affectedFunctions: string[];
  targetGeography: string;
  estimatedUserCount: string;
  deploymentScale: string;
  transformationStage: string;

  scopeOfWork: string;
  expectedDeliverables: string;
  functionalRequirements: string;
  technicalRequirements: string;
  integrationRequirements: string;
  dataMigrationRequirements: string;
  securityComplianceRequirements: string;
  reportingRequirements: string;
  serviceLevelRequirements: string;
  existingTechnologyLandscape: string[];
  constraintsDependencies: string;
  successMeasures: string;

  procurementReference: string;
  rfpReference: string;
  procurementStage: string;
  proposalDeadline: string;
  expectedStartDate: string;
  expectedAwardDate: string;
  engagementDuration: string;
  commercialModel: string;
  budgetRange: string;
  proposalCurrency: string;
  contractingEntityCountry: string;
  deliveryModel: string;
  deliveryLocations: string;

  privacyConsent: boolean;
  marketingConsent: boolean;
};

type UploadedDocument = {
  id: string;
  file: File;
  documentType: string;
  blobPathname: string;
  contentType: string;
  fileSize: number;
};

const INITIAL_FORM: FormData = {
  organisationLegalName: '',
  organisationWebsite: '',
  industrySector: '',
  headquartersCountry: '',
  primaryOperatingMarket: '',
  organisationSize: '',
  businessFunction: '',
  proposalContactName: '',
  proposalContactRole: '',
  procurementInvolvement: '',
  proposalContactEmail: '',
  proposalContactPhone: '',

  initiativeName: '',
  transformationObjective: '',
  businessChallenge: '',
  desiredOutcomes: '',
  primaryCapability: '',
  secondaryCapabilities: [],
  affectedFunctions: [],
  targetGeography: '',
  estimatedUserCount: '',
  deploymentScale: '',
  transformationStage: '',

  scopeOfWork: '',
  expectedDeliverables: '',
  functionalRequirements: '',
  technicalRequirements: '',
  integrationRequirements: '',
  dataMigrationRequirements: '',
  securityComplianceRequirements: '',
  reportingRequirements: '',
  serviceLevelRequirements: '',
  existingTechnologyLandscape: [],
  constraintsDependencies: '',
  successMeasures: '',

  procurementReference: '',
  rfpReference: '',
  procurementStage: '',
  proposalDeadline: '',
  expectedStartDate: '',
  expectedAwardDate: '',
  engagementDuration: '',
  commercialModel: '',
  budgetRange: '',
  proposalCurrency: 'USD',
  contractingEntityCountry: '',
  deliveryModel: '',
  deliveryLocations: '',

  privacyConsent: false,
  marketingConsent: false,
};

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return (
    <label
      style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: 'var(--content-primary)',
        fontSize: '0.875rem',
        fontWeight: 700,
        lineHeight: 1.4,
      }}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          style={{
            color: 'var(--content-accent)',
            marginLeft: 3,
          }}
        >
          *
        </span>
      )}
    </label>
  );
}

function TextInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

function SelectInput({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          style={{
            ...inputStyle,
            appearance: 'none',
            paddingRight: '2.75rem',
          }}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '0.9rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--content-tertiary)',
          }}
        />
      </div>
    </div>
  );
}

function TextArea({
  label,
  required,
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{
          ...inputStyle,
          resize: 'vertical',
          minHeight: rows * 28,
          lineHeight: 1.55,
        }}
      />
    </div>
  );
}

function MultiSelect({
  label,
  options,
  selected,
  onChange,
  required = false,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}) {
  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    );
  };

  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.55rem',
        }}
      >
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={active}
              style={{
                border: active
                  ? '1px solid var(--content-accent)'
                  : '1px solid var(--border-default)',
                background: active
                  ? 'var(--surface-accent-subtle, rgba(201,162,75,0.10))'
                  : 'var(--surface-default)',
                color: active ? 'var(--content-accent)' : 'var(--content-secondary)',
                borderRadius: '999px',
                padding: '0.55rem 0.8rem',
                fontFamily: 'var(--family-text)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--motion-duration-fast) var(--motion-easing-standard)',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      {eyebrow && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '0.65rem',
            color: 'var(--content-accent)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 24,
              height: 2,
              background: 'var(--brand-accent)',
              display: 'inline-block',
            }}
          />
          {eyebrow}
        </div>
      )}

      <h2
        style={{
          margin: 0,
          color: 'var(--content-primary)',
          fontFamily: 'var(--family-display)',
          fontSize: 'clamp(1.5rem,2.5vw,2.15rem)',
          lineHeight: 1.18,
          letterSpacing: '-0.025em',
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            margin: '0.7rem 0 0',
            maxWidth: 680,
            color: 'var(--content-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-sunken)',
        color: 'var(--content-accent)',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function StepRail({
  currentStep,
  onSelect,
}: {
  currentStep: number;
  onSelect: (step: number) => void;
}) {
  return (
    <aside className="rfp-step-rail">
      {STEPS.map((stepItem) => {
        const active = currentStep === stepItem.number;
        const completed = currentStep > stepItem.number;

        return (
          <button
            key={stepItem.number}
            type="button"
            onClick={() => {
              if (stepItem.number <= currentStep) {
                onSelect(stepItem.number);
              }
            }}
            disabled={stepItem.number > currentStep}
            className={`rfp-step-button ${active ? 'is-active' : ''}`}
          >
            <span
              className={`rfp-step-number ${active ? 'is-active' : completed ? 'is-complete' : ''}`}
            >
              {completed ? <Check size={15} strokeWidth={2.5} /> : stepItem.number}
            </span>

            <span style={{ minWidth: 0 }}>
              <strong>{stepItem.title}</strong>
              <small>{stepItem.description}</small>
            </span>
          </button>
        );
      })}
    </aside>
  );
}

function FormCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface-default)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: 'clamp(1.25rem,3vw,2rem)',
        boxShadow: 'var(--elevation-01)',
      }}
    >
      {children}
    </div>
  );
}

function InfoAccordion({
  title,
  children,
  open,
  onClick,
}: {
  title: string;
  children: ReactNode;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        background: 'var(--surface-default)',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem 1.15rem',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          color: 'var(--content-primary)',
          fontFamily: 'var(--family-text)',
          fontSize: '0.9rem',
          fontWeight: 700,
          textAlign: 'left',
        }}
      >
        {title}

        <ChevronDown
          size={17}
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--motion-duration-fast) var(--motion-easing-standard)',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.1rem 1.15rem',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: 46,
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-xs)',
  background: 'var(--surface-default)',
  color: 'var(--content-primary)',
  padding: '0 0.85rem',
  outline: 'none',
  fontFamily: 'var(--family-text)',
  fontSize: '0.875rem',
  boxSizing: 'border-box' as const,
};

export default function RequestAProposalPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);
  const [openAccordion, setOpenAccordion] = useState<string | null>('project');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploadingDocuments, setUploadingDocuments] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const canContinue = useMemo(() => {
    if (step === 1) {
      return Boolean(
        form.organisationLegalName &&
        form.organisationWebsite &&
        form.industrySector &&
        form.headquartersCountry &&
        form.primaryOperatingMarket &&
        form.organisationSize &&
        form.businessFunction &&
        form.proposalContactName &&
        form.proposalContactRole &&
        form.procurementInvolvement &&
        form.proposalContactEmail,
      );
    }

    if (step === 2) {
      return Boolean(
        form.initiativeName &&
        form.transformationObjective &&
        form.businessChallenge &&
        form.desiredOutcomes &&
        form.primaryCapability &&
        form.affectedFunctions.length > 0 &&
        form.targetGeography &&
        form.transformationStage,
      );
    }

    if (step === 3) {
      return Boolean(form.scopeOfWork && form.expectedDeliverables);
    }

    if (step === 4) {
      return Boolean(form.procurementStage);
    }

    return true;
  }, [form, step]);

  const goNext = () => {
    setError('');

    if (!canContinue) {
      setError('Please complete the required fields before continuing.');
      return;
    }

    setStep((current) => Math.min(5, current + 1));
    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  };

  const goBack = () => {
    setError('');

    setStep((current) => Math.max(1, current - 1));

    window.scrollTo({
      top: 500,
      behavior: 'smooth',
    });
  };

  const handleDocuments = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const currentCount = documents.length;
    const availableSlots = Math.max(0, MAX_FILES - currentCount);

    if (!files.length) {
      event.target.value = '';
      return;
    }

    if (availableSlots === 0) {
      setError('You can upload a maximum of 10 documents.');
      event.target.value = '';
      return;
    }

    const selectedFiles = files.slice(0, availableSlots);

    const invalidFile = selectedFiles.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';

      return !ALLOWED_FILE_EXTENSIONS.has(extension) || file.size <= 0 || file.size > MAX_FILE_SIZE;
    });

    if (invalidFile) {
      const extension = invalidFile.name.split('.').pop()?.toLowerCase() || '';

      if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
        setError(
          `"${invalidFile.name}" is not an accepted file type. Use PDF, Word, Excel, PowerPoint, TXT or CSV.`,
        );
      } else if (invalidFile.size <= 0) {
        setError(`"${invalidFile.name}" is empty and cannot be uploaded.`);
      } else {
        setError(`"${invalidFile.name}" exceeds the 10 MB file size limit.`);
      }

      event.target.value = '';
      return;
    }

    setError('');
    setUploadingDocuments(true);

    try {
      const uploadedDocuments: UploadedDocument[] = [];

      for (const file of selectedFiles) {
        const extension = file.name.split('.').pop()?.toLowerCase() || '';
        const contentType =
          file.type || CONTENT_TYPE_BY_EXTENSION[extension] || 'application/octet-stream';

        /*
         * The CMS upload endpoint generates the pathname server-side.
         * The browser must send fileName, contentType and fileSize.
         */
        const authorizationResponse = await fetch('/api/rfp-documents/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType,
            fileSize: file.size,
          }),
          cache: 'no-store',
        });

        const authorizationContentType = authorizationResponse.headers.get('content-type') || '';

        let authorizationResult: {
          success?: boolean;
          message?: string;
          presignedUrl?: string;
          pathname?: string;
          fileName?: string;
          contentType?: string;
          expiresAt?: string;
        };

        if (authorizationContentType.includes('application/json')) {
          authorizationResult = await authorizationResponse.json();
        } else {
          const responseText = await authorizationResponse.text();

          authorizationResult = {
            success: false,
            message: responseText || 'Unable to authorize the document upload.',
          };
        }

        if (
          !authorizationResponse.ok ||
          !authorizationResult.success ||
          !authorizationResult.presignedUrl ||
          !authorizationResult.pathname
        ) {
          throw new Error(
            authorizationResult.message || 'Unable to authorize the document upload.',
          );
        }

        const signedContentType = authorizationResult.contentType || contentType;
        const signedPathname = authorizationResult.pathname;

        if (!signedPathname) {
          throw new Error('The document upload service did not return a secure storage pathname.');
        }

        const blobResponse = await fetch(authorizationResult.presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': signedContentType,
          },
          body: file,
        });
        console.log('[TRYVION RFP Blob PUT]', {
          status: blobResponse.status,
          statusText: blobResponse.statusText,
          ok: blobResponse.ok,
          pathname: authorizationResult.pathname,
          responseHeaders: Object.fromEntries(blobResponse.headers.entries()),
        });

        if (!blobResponse.ok) {
          const blobError = await blobResponse.text().catch(() => '');

          throw new Error(
            blobError
              ? `Unable to upload "${file.name}" to secure storage. ${blobError}`
              : `Unable to upload "${file.name}" to secure storage.`,
          );
        }

        uploadedDocuments.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${uploadedDocuments.length}`,
          file,
          documentType,
          blobPathname: authorizationResult.pathname,
          contentType: signedContentType,
          fileSize: file.size,
        });
      }

      setDocuments((current) => [...current, ...uploadedDocuments]);
    } catch (uploadError) {
      console.error('[TRYVION RFP Document Upload]', uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'Unable to upload the document. Please try again.',
      );
    } finally {
      setUploadingDocuments(false);
      event.target.value = '';
    }
  };

  const removeDocument = (id: string) => {
    setDocuments((current) => current.filter((document) => document.id !== id));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (submitting || uploadingDocuments) {
      return;
    }

    if (!form.privacyConsent) {
      setError('Please accept the Privacy Policy acknowledgement.');
      return;
    }

    if (
      !form.businessFunction ||
      form.affectedFunctions.length === 0 ||
      !form.targetGeography ||
      !form.procurementStage
    ) {
      setError('Please complete all required RFP fields before submitting.');
      return;
    }

    if (documents.some((document) => !document.blobPathname)) {
      setError(
        'One or more documents are not securely uploaded. Please remove and upload them again.',
      );
      return;
    }

    const payload = new window.FormData();

    const textFields: Array<keyof FormData> = [
      'organisationLegalName',
      'organisationWebsite',
      'industrySector',
      'headquartersCountry',
      'primaryOperatingMarket',
      'organisationSize',
      'businessFunction',
      'proposalContactName',
      'proposalContactRole',
      'procurementInvolvement',
      'proposalContactEmail',
      'proposalContactPhone',
      'initiativeName',
      'transformationObjective',
      'businessChallenge',
      'desiredOutcomes',
      'primaryCapability',
      'targetGeography',
      'estimatedUserCount',
      'deploymentScale',
      'transformationStage',
      'scopeOfWork',
      'expectedDeliverables',
      'functionalRequirements',
      'technicalRequirements',
      'integrationRequirements',
      'dataMigrationRequirements',
      'securityComplianceRequirements',
      'reportingRequirements',
      'serviceLevelRequirements',
      'constraintsDependencies',
      'successMeasures',
      'procurementReference',
      'rfpReference',
      'procurementStage',
      'proposalDeadline',
      'expectedStartDate',
      'expectedAwardDate',
      'engagementDuration',
      'commercialModel',
      'budgetRange',
      'proposalCurrency',
      'contractingEntityCountry',
      'deliveryModel',
      'deliveryLocations',
    ];

    if (form.estimatedUserCount.trim()) {
      const normalizedUserCount = form.estimatedUserCount.replace(/,/g, '').trim();
      const numericUserCount = Number(normalizedUserCount);

      if (!Number.isFinite(numericUserCount) || numericUserCount < 0) {
        setError('Estimated user count must be a valid number.');
        return;
      }
    }

    textFields.forEach((key) => {
      const value = form[key];

      if (typeof value !== 'string' || !value.trim()) {
        return;
      }

      if (key === 'estimatedUserCount') {
        const normalizedUserCount = value.replace(/,/g, '').trim();
        const numericUserCount = Number(normalizedUserCount);

        payload.append(key, String(Math.floor(numericUserCount)));

        return;
      }

      payload.append(key, value.trim());
    });

    form.secondaryCapabilities.forEach((value) => {
      payload.append('secondaryCapabilities', value);
    });

    form.affectedFunctions.forEach((value) => {
      payload.append('affectedFunctions', value);
    });

    form.existingTechnologyLandscape.forEach((value) => {
      payload.append('existingTechnologyStack', value);
    });

    payload.append('privacyConsent', String(form.privacyConsent));

    payload.append('marketingConsent', String(form.marketingConsent));

    payload.append(
      'uploadedDocuments',
      JSON.stringify(
        documents.map((document) => ({
          documentType: document.documentType,
          documentDescription: '',
          fileName: document.file.name,
          blobPathname: document.blobPathname,
        })),
      ),
    );

    setSubmitting(true);

    try {
      const response = await fetch('/api/rfp', {
        method: 'POST',
        body: payload,
        cache: 'no-store',
      });

      const contentType = response.headers.get('content-type') || '';

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        submissionId?: string;
      };

      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();

        result = {
          success: response.ok,
          message: text || undefined,
        };
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || result.error || 'Unable to submit your proposal request.',
        );
      }

      setSubmissionId(result.submissionId || '');

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (submitError) {
      console.error('[TRYVION RFP Submission]', submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to submit your proposal request. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <style>{responsiveStyles}</style>

        <main
          style={{
            minHeight: '70vh',
            background: 'var(--surface-default)',
            padding: 'clamp(9rem,14vw,12rem) clamp(1.25rem,5vw,4rem) 6rem',
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
              }}
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'var(--surface-sunken)',
                color: 'var(--content-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
              }}
            >
              <Check size={36} strokeWidth={2} />
            </motion.div>

            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--family-display)',
                color: 'var(--content-primary)',
                fontSize: 'clamp(2rem,5vw,3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
              }}
            >
              Your proposal request is ready.
            </h1>

            <p
              style={{
                maxWidth: 620,
                margin: '1.25rem auto 1rem',
                color: 'var(--content-secondary)',
                fontSize: '1rem',
                lineHeight: 1.75,
              }}
            >
              Thank you for sharing your requirements with TRYVION. Our team will review your
              information and respond with a tailored next step.
            </p>

            {submissionId && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '2rem',
                  padding: '0.7rem 0.9rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--surface-sunken)',
                  color: 'var(--content-secondary)',
                  fontSize: '0.78rem',
                }}
              >
                <strong
                  style={{
                    color: 'var(--content-primary)',
                  }}
                >
                  Submission ID:
                </strong>

                <span>{submissionId}</span>
              </div>
            )}

            <div>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  minHeight: 48,
                  padding: '0 1.25rem',
                  background: 'var(--action-primary-default)',
                  color: 'var(--action-primary-on-action)',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                }}
              >
                Return to TRYVION
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{responsiveStyles}</style>

      <main
        style={{
          background: 'var(--surface-default)',
          color: 'var(--content-primary)',
          fontFamily: 'var(--family-text)',
        }}
      >
        <section
          className="rfp-hero"
          style={{
            minHeight: 500,
            position: 'relative',
            overflow: 'hidden',
            background: '#071C35',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(90deg, rgba(4,25,48,0.98) 0%, rgba(4,25,48,0.94) 35%, rgba(4,25,48,0.58) 60%, rgba(4,25,48,0.18) 100%), url("${HERO_IMAGE}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 'var(--layout-content-wide)',
              minHeight: 500,
              margin: '0 auto',
              padding: 'clamp(8rem,12vw,10rem) clamp(1.25rem,4vw,2.5rem) 4rem',
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 22,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                ease: 'easeOut',
              }}
              style={{
                maxWidth: 650,
                color: '#fff',
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontSize: '0.8rem',
                  marginBottom: '1.25rem',
                }}
              >
                <Link
                  href="/"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Link>

                <span
                  style={{
                    margin: '0 0.5rem',
                  }}
                >
                  ›
                </span>

                <Link
                  href="/contact"
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  Contact
                </Link>

                <span
                  style={{
                    margin: '0 0.5rem',
                    color: '#fff',
                  }}
                >
                  ›
                </span>

                <span
                  style={{
                    color: '#fff',
                  }}
                >
                  Request a Proposal
                </span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontFamily: 'var(--family-display)',
                  fontSize: 'clamp(2.5rem,5vw,4.4rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.045em',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                Request a Proposal
              </h1>

              <h2
                style={{
                  margin: '0.75rem 0 0',
                  maxWidth: 560,
                  color: '#fff',
                  fontSize: 'clamp(1.15rem,2vw,1.65rem)',
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                Let's turn your requirements into a transformation plan.
              </h2>

              <p
                style={{
                  maxWidth: 580,
                  margin: '1rem 0 0',
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                }}
              >
                Share your project requirements, objectives and timeline with TRYVION. Our team will
                review your information and respond with a tailored proposal for your business.
              </p>

              <div
                className="rfp-hero-benefits"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.2rem',
                  marginTop: '2rem',
                }}
              >
                {[
                  {
                    icon: <FileText size={28} />,
                    title: 'Comprehensive Review',
                    text: 'We carefully analyse your requirements.',
                  },
                  {
                    icon: <Users size={28} />,
                    title: 'Right Expertise',
                    text: 'Engage the right specialists for your needs.',
                  },
                  {
                    icon: <Target size={28} />,
                    title: 'Tailored Proposal',
                    text: 'Receive a solution designed for your business.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      borderLeft: '1px solid rgba(255,255,255,0.22)',
                      paddingLeft: '0.9rem',
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        border: '1px solid rgba(201,162,75,0.7)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#C9A24B',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {item.icon}
                    </div>

                    <strong
                      style={{
                        display: 'block',
                        fontSize: '1rem',
                        color: '#fff',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </strong>

                    <span
                      style={{
                        display: 'block',
                        color: 'rgba(255,255,255,0.62)',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section
          style={{
            padding: 'clamp(3.5rem,7vw,5.5rem) clamp(1.25rem,4vw,2.5rem)',
            background: 'var(--surface-default)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--layout-content-wide)',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: 'var(--brand-accent)',
                  margin: '0 auto 1rem',
                }}
              />

              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--family-display)',
                  color: 'var(--content-primary)',
                  fontSize: 'clamp(1.65rem,3vw,2.25rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                What you can submit
              </h2>
            </div>

            <div
              className="rfp-submit-types"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
              }}
            >
              {[
                {
                  icon: <FileText size={28} />,
                  title: 'RFP / RFQ',
                  text: 'Share your formal procurement documents and requirements.',
                },
                {
                  icon: <FileText size={28} />,
                  title: 'Project Scope',
                  text: 'Provide your scope of work, deliverables and objectives.',
                },
                {
                  icon: <Target size={28} />,
                  title: 'Transformation Programme',
                  text: 'Tell us about your broader programme and outcomes.',
                },
                {
                  icon: <ShieldCheck size={28} />,
                  title: 'Managed Services',
                  text: 'Outline your ongoing support and operational needs.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  style={{
                    minHeight: 155,
                    padding: '1.35rem',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: 'var(--elevation-01)',
                    background: 'var(--surface-default)',
                    boxSizing: 'border-box',
                  }}
                >
                  <IconCircle>{item.icon}</IconCircle>

                  <div
                    style={{
                      width: 20,
                      height: 2,
                      background: 'var(--brand-accent)',
                      margin: '0.7rem 0',
                    }}
                  />

                  <h3
                    style={{
                      margin: 0,
                      color: 'var(--content-primary)',
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      margin: '0.5rem 0 0',
                      color: 'var(--content-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="proposal-form"
          style={{
            background: 'var(--surface-sunken)',
            padding: 'clamp(3.5rem,7vw,5rem) clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                marginBottom: '2.75rem',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--family-display)',
                  color: 'var(--content-primary)',
                  fontSize: 'clamp(1.65rem,3vw,2.2rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                Tell us about your requirement
              </h2>

              <p
                style={{
                  margin: '0.65rem 0 0',
                  color: 'var(--content-secondary)',
                  fontSize: '1.1rem',
                }}
              >
                Complete the form below and our team will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                className="rfp-form-layout"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '250px minmax(0,1fr)',
                  gap: '2.5rem',
                  alignItems: 'start',
                }}
              >
                <StepRail currentStep={step} onSelect={setStep} />

                <div
                  style={{
                    minWidth: 0,
                  }}
                >
                  <motion.div
                    key={step}
                    initial={{
                      opacity: 0,
                      x: 12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    {step === 1 && (
                      <FormCard>
                        <SectionTitle
                          eyebrow="Step 01"
                          title="Organisation Details"
                          description="Tell us who you are and how we can reach the right stakeholders."
                        />

                        <div className="rfp-grid-2">
                          <TextInput
                            label="Organisation Legal Name"
                            required
                            value={form.organisationLegalName}
                            onChange={(value) => update('organisationLegalName', value)}
                            placeholder="Enter organisation name"
                          />

                          <TextInput
                            label="Organisation Website"
                            required
                            type="url"
                            value={form.organisationWebsite}
                            onChange={(value) => update('organisationWebsite', value)}
                            placeholder="https://www.company.com"
                          />

                          <SelectInput
                            label="Industry / Sector"
                            required
                            value={form.industrySector}
                            onChange={(value) => update('industrySector', value)}
                            options={INDUSTRIES}
                          />

                          <TextInput
                            label="Organisation Headquarters"
                            required
                            value={form.headquartersCountry}
                            onChange={(value) => update('headquartersCountry', value)}
                            placeholder="Country"
                          />

                          <TextInput
                            label="Primary Operating Market"
                            required
                            value={form.primaryOperatingMarket}
                            onChange={(value) => update('primaryOperatingMarket', value)}
                            placeholder="Country or region"
                          />

                          <SelectInput
                            label="Organisation Size"
                            required
                            value={form.organisationSize}
                            onChange={(value) => update('organisationSize', value)}
                            options={ORGANISATION_SIZES}
                          />

                          <SelectInput
                            label="Business Unit / Function"
                            required
                            value={form.businessFunction}
                            onChange={(value) => update('businessFunction', value)}
                            options={BUSINESS_FUNCTIONS}
                          />

                          <TextInput
                            label="Proposal Contact"
                            required
                            value={form.proposalContactName}
                            onChange={(value) => update('proposalContactName', value)}
                            placeholder="Full name"
                          />

                          <TextInput
                            label="Contact Role"
                            required
                            value={form.proposalContactRole}
                            onChange={(value) => update('proposalContactRole', value)}
                            placeholder="Job title / role"
                          />

                          <SelectInput
                            label="Procurement Involvement"
                            required
                            value={form.procurementInvolvement}
                            onChange={(value) => update('procurementInvolvement', value)}
                            options={[
                              'Procurement Lead',
                              'Business Sponsor',
                              'Technology / IT Lead',
                              'Transformation Lead',
                              'Project / Programme Manager',
                              'Executive Decision Maker',
                              'Procurement + Business Sponsor',
                              'Other',
                            ]}
                          />

                          <TextInput
                            label="Proposal Contact Email"
                            required
                            type="email"
                            value={form.proposalContactEmail}
                            onChange={(value) => update('proposalContactEmail', value)}
                            placeholder="name@company.com"
                          />

                          <TextInput
                            label="Proposal Contact Phone"
                            type="tel"
                            value={form.proposalContactPhone}
                            onChange={(value) => update('proposalContactPhone', value)}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </FormCard>
                    )}

                    {step === 2 && (
                      <FormCard>
                        <SectionTitle
                          eyebrow="Step 02"
                          title="Project Details"
                          description="Help us understand the initiative, its objectives and the transformation context."
                        />

                        <div className="rfp-stack">
                          <TextInput
                            label="Initiative / Project Name"
                            required
                            value={form.initiativeName}
                            onChange={(value) => update('initiativeName', value)}
                            placeholder="Enter project name"
                          />

                          <TextArea
                            label="Transformation Objective"
                            required
                            value={form.transformationObjective}
                            onChange={(value) => update('transformationObjective', value)}
                            placeholder="What are you trying to achieve?"
                            rows={4}
                          />

                          <TextArea
                            label="Business Challenge"
                            required
                            value={form.businessChallenge}
                            onChange={(value) => update('businessChallenge', value)}
                            placeholder="What business problem or opportunity is driving this initiative?"
                            rows={4}
                          />

                          <TextArea
                            label="Desired Outcomes"
                            required
                            value={form.desiredOutcomes}
                            onChange={(value) => update('desiredOutcomes', value)}
                            placeholder="What outcomes would define success?"
                            rows={4}
                          />

                          <SelectInput
                            label="Primary Capability"
                            required
                            value={form.primaryCapability}
                            onChange={(value) => update('primaryCapability', value)}
                            options={CAPABILITIES}
                          />

                          <MultiSelect
                            label="Secondary Capabilities"
                            options={CAPABILITIES.filter((item) => item !== form.primaryCapability)}
                            selected={form.secondaryCapabilities}
                            onChange={(value) => update('secondaryCapabilities', value)}
                          />

                          <MultiSelect
                            label="Affected Functions"
                            required
                            options={AFFECTED_FUNCTIONS}
                            selected={form.affectedFunctions}
                            onChange={(value) => update('affectedFunctions', value)}
                          />

                          <div className="rfp-grid-2">
                            <TextInput
                              label="Target Geography"
                              required
                              value={form.targetGeography}
                              onChange={(value) => update('targetGeography', value)}
                              placeholder="Countries / regions"
                            />

                            <TextInput
                              label="Estimated User Count"
                              value={form.estimatedUserCount}
                              onChange={(value) => update('estimatedUserCount', value)}
                              placeholder="e.g. 10,000"
                            />

                            <SelectInput
                              label="Deployment Scale"
                              value={form.deploymentScale}
                              onChange={(value) => update('deploymentScale', value)}
                              options={[
                                'Single Business Unit',
                                'Single Country',
                                'Multiple Countries',
                                'Regional',
                                'Global',
                                'Enterprise-Wide',
                                'Not Yet Determined',
                              ]}
                            />

                            <SelectInput
                              label="Transformation Stage"
                              required
                              value={form.transformationStage}
                              onChange={(value) => update('transformationStage', value)}
                              options={TRANSFORMATION_STAGES}
                            />
                          </div>
                        </div>
                      </FormCard>
                    )}

                    {step === 3 && (
                      <FormCard>
                        <SectionTitle
                          eyebrow="Step 03"
                          title="Requirements"
                          description="Give our specialists enough context to understand the scope and shape an appropriate response."
                        />

                        <div className="rfp-stack">
                          <TextArea
                            label="Scope of Work"
                            required
                            value={form.scopeOfWork}
                            onChange={(value) => update('scopeOfWork', value)}
                            placeholder="Describe the scope of the required services."
                            rows={6}
                          />

                          <TextArea
                            label="Expected Deliverables"
                            required
                            value={form.expectedDeliverables}
                            onChange={(value) => update('expectedDeliverables', value)}
                            placeholder="What deliverables do you expect from the selected partner?"
                            rows={5}
                          />

                          <InfoAccordion
                            title="Functional Requirements"
                            open={openAccordion === 'functional'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'functional' ? null : 'functional')
                            }
                          >
                            <TextArea
                              label="Functional Requirements"
                              value={form.functionalRequirements}
                              onChange={(value) => update('functionalRequirements', value)}
                              placeholder="Key business, process or functional requirements."
                              rows={5}
                            />
                          </InfoAccordion>

                          <InfoAccordion
                            title="Technical Requirements"
                            open={openAccordion === 'technical'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'technical' ? null : 'technical')
                            }
                          >
                            <TextArea
                              label="Technical Requirements"
                              value={form.technicalRequirements}
                              onChange={(value) => update('technicalRequirements', value)}
                              placeholder="Architecture, platform, technical or infrastructure requirements."
                              rows={5}
                            />
                          </InfoAccordion>

                          <InfoAccordion
                            title="Integration Requirements"
                            open={openAccordion === 'integration'}
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === 'integration' ? null : 'integration',
                              )
                            }
                          >
                            <TextArea
                              label="Integration Requirements"
                              value={form.integrationRequirements}
                              onChange={(value) => update('integrationRequirements', value)}
                              placeholder="Systems, applications, APIs or platforms that must integrate."
                              rows={5}
                            />
                          </InfoAccordion>

                          <InfoAccordion
                            title="Data Migration Requirements"
                            open={openAccordion === 'migration'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'migration' ? null : 'migration')
                            }
                          >
                            <TextArea
                              label="Data Migration Requirements"
                              value={form.dataMigrationRequirements}
                              onChange={(value) => update('dataMigrationRequirements', value)}
                              placeholder="Data volumes, migration scope, legacy systems or migration constraints."
                              rows={5}
                            />
                          </InfoAccordion>

                          <InfoAccordion
                            title="Security & Compliance"
                            open={openAccordion === 'security'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'security' ? null : 'security')
                            }
                          >
                            <TextArea
                              label="Security & Compliance Requirements"
                              value={form.securityComplianceRequirements}
                              onChange={(value) => update('securityComplianceRequirements', value)}
                              placeholder="Security, regulatory, privacy or compliance requirements."
                              rows={5}
                            />
                          </InfoAccordion>

                          <InfoAccordion
                            title="Reporting & Service Levels"
                            open={openAccordion === 'reporting'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'reporting' ? null : 'reporting')
                            }
                          >
                            <div className="rfp-stack">
                              <TextArea
                                label="Reporting Requirements"
                                value={form.reportingRequirements}
                                onChange={(value) => update('reportingRequirements', value)}
                                placeholder="Reporting, dashboards, KPIs or governance requirements."
                                rows={4}
                              />

                              <TextArea
                                label="Service Level Requirements"
                                value={form.serviceLevelRequirements}
                                onChange={(value) => update('serviceLevelRequirements', value)}
                                placeholder="Availability, response times, support coverage or SLA expectations."
                                rows={4}
                              />
                            </div>
                          </InfoAccordion>

                          <MultiSelect
                            label="Existing Technology Landscape"
                            options={EXISTING_TECHNOLOGIES}
                            selected={form.existingTechnologyLandscape}
                            onChange={(value) => update('existingTechnologyLandscape', value)}
                          />

                          <TextArea
                            label="Constraints & Dependencies"
                            value={form.constraintsDependencies}
                            onChange={(value) => update('constraintsDependencies', value)}
                            placeholder="Known constraints, dependencies, deadlines or assumptions."
                            rows={4}
                          />

                          <TextArea
                            label="Success Measures"
                            value={form.successMeasures}
                            onChange={(value) => update('successMeasures', value)}
                            placeholder="How will you measure the success of the programme?"
                            rows={4}
                          />
                        </div>
                      </FormCard>
                    )}

                    {step === 4 && (
                      <FormCard>
                        <SectionTitle
                          eyebrow="Step 04"
                          title="Documents & Commercial"
                          description="Provide procurement context and upload the documents that will help TRYVION evaluate your request."
                        />

                        <div className="rfp-stack">
                          <div className="rfp-grid-2">
                            <TextInput
                              label="Procurement Reference"
                              value={form.procurementReference}
                              onChange={(value) => update('procurementReference', value)}
                              placeholder="Internal procurement reference"
                            />

                            <TextInput
                              label="RFP Reference"
                              value={form.rfpReference}
                              onChange={(value) => update('rfpReference', value)}
                              placeholder="RFP / tender number"
                            />

                            <SelectInput
                              label="Procurement Stage"
                              required
                              value={form.procurementStage}
                              onChange={(value) => update('procurementStage', value)}
                              options={PROCUREMENT_STAGES}
                            />

                            <TextInput
                              label="Proposal Deadline"
                              type="date"
                              value={form.proposalDeadline}
                              onChange={(value) => update('proposalDeadline', value)}
                            />

                            <TextInput
                              label="Expected Start Date"
                              type="date"
                              value={form.expectedStartDate}
                              onChange={(value) => update('expectedStartDate', value)}
                            />

                            <TextInput
                              label="Expected Award Date"
                              type="date"
                              value={form.expectedAwardDate}
                              onChange={(value) => update('expectedAwardDate', value)}
                            />

                            <SelectInput
                              label="Engagement Duration"
                              value={form.engagementDuration}
                              onChange={(value) => update('engagementDuration', value)}
                              options={[
                                'Less than 3 months',
                                '3–6 months',
                                '6–12 months',
                                '12–24 months',
                                '24+ months',
                                'Ongoing / Managed Service',
                                'Not Yet Determined',
                              ]}
                            />

                            <SelectInput
                              label="Commercial Model"
                              value={form.commercialModel}
                              onChange={(value) => update('commercialModel', value)}
                              options={COMMERCIAL_MODELS}
                            />

                            <SelectInput
                              label="Budget Range"
                              value={form.budgetRange}
                              onChange={(value) => update('budgetRange', value)}
                              options={BUDGET_RANGES}
                            />

                            <TextInput
                              label="Proposal Currency"
                              value={form.proposalCurrency}
                              onChange={(value) => update('proposalCurrency', value)}
                              placeholder="USD"
                            />

                            <TextInput
                              label="Contracting Entity Country"
                              value={form.contractingEntityCountry}
                              onChange={(value) => update('contractingEntityCountry', value)}
                              placeholder="Country"
                            />

                            <SelectInput
                              label="Delivery Model"
                              value={form.deliveryModel}
                              onChange={(value) => update('deliveryModel', value)}
                              options={DELIVERY_MODELS}
                            />
                          </div>

                          <TextArea
                            label="Delivery Locations"
                            value={form.deliveryLocations}
                            onChange={(value) => update('deliveryLocations', value)}
                            placeholder="Countries, cities or delivery centres relevant to the engagement."
                            rows={3}
                          />

                          <div>
                            <FieldLabel>Documents</FieldLabel>

                            <div
                              style={{
                                border: '1px dashed var(--border-default)',
                                borderRadius: 'var(--radius-xs)',
                                padding: '1.5rem',
                                background: 'var(--surface-sunken)',
                              }}
                            >
                              <div
                                className="rfp-upload-controls"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <div
                                  style={{
                                    position: 'relative',
                                    minWidth: 210,
                                  }}
                                >
                                  <select
                                    value={documentType}
                                    onChange={(event) => setDocumentType(event.target.value)}
                                    disabled={uploadingDocuments}
                                    style={{
                                      ...inputStyle,
                                      appearance: 'none',
                                      paddingRight: '2.5rem',
                                    }}
                                  >
                                    {DOCUMENT_TYPES.map((type) => (
                                      <option key={type} value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select>

                                  <ChevronDown
                                    size={16}
                                    style={{
                                      position: 'absolute',
                                      right: 12,
                                      top: '50%',
                                      transform: 'translateY(-50%)',
                                      pointerEvents: 'none',
                                      color: 'var(--content-tertiary)',
                                    }}
                                  />
                                </div>

                                <label
                                  style={{
                                    minHeight: 46,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.55rem',
                                    padding: '0 1rem',
                                    borderRadius: 'var(--radius-xs)',
                                    background: 'var(--action-primary-default)',
                                    color: 'var(--action-primary-on-action)',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    cursor: uploadingDocuments ? 'wait' : 'pointer',
                                    opacity: uploadingDocuments ? 0.7 : 1,
                                  }}
                                >
                                  <Upload size={17} />

                                  {uploadingDocuments ? 'Uploading…' : 'Add Documents'}

                                  <input
                                    type="file"
                                    multiple
                                    disabled={uploadingDocuments}
                                    onChange={handleDocuments}
                                    style={{
                                      display: 'none',
                                    }}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                                  />
                                </label>
                              </div>

                              <p
                                style={{
                                  margin: '0.8rem 0 0',
                                  color: 'var(--content-tertiary)',
                                  fontSize: '0.75rem',
                                  lineHeight: 1.5,
                                }}
                              >
                                Accepted formats: PDF, Word, Excel, PowerPoint, TXT and CSV. Maximum
                                10 MB per document, up to 10 documents. Credentials, banking
                                information, passwords and source code should not be uploaded.
                              </p>

                              {documents.length > 0 && (
                                <div
                                  style={{
                                    display: 'grid',
                                    gap: '0.55rem',
                                    marginTop: '1rem',
                                  }}
                                >
                                  {documents.map((document) => (
                                    <div
                                      key={document.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.7rem',
                                        background: 'var(--surface-default)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-xs)',
                                      }}
                                    >
                                      <Paperclip
                                        size={16}
                                        style={{
                                          flexShrink: 0,
                                          color: 'var(--content-accent)',
                                        }}
                                      />

                                      <div
                                        style={{
                                          flex: 1,
                                          minWidth: 0,
                                        }}
                                      >
                                        <div
                                          style={{
                                            color: 'var(--content-primary)',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                          }}
                                        >
                                          {document.file.name}
                                        </div>

                                        <div
                                          style={{
                                            color: 'var(--content-tertiary)',
                                            fontSize: '0.7rem',
                                            marginTop: 2,
                                          }}
                                        >
                                          {document.documentType}
                                          {' · '}
                                          {(document.file.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => removeDocument(document.id)}
                                        disabled={uploadingDocuments || submitting}
                                        style={{
                                          border: 0,
                                          background: 'transparent',
                                          color: 'var(--content-tertiary)',
                                          cursor: 'pointer',
                                          fontSize: '0.75rem',
                                          fontWeight: 700,
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </FormCard>
                    )}

                    {step === 5 && (
                      <FormCard>
                        <SectionTitle
                          eyebrow="Step 05"
                          title="Review & Submit"
                          description="Review the information below before sending your proposal request to TRYVION."
                        />

                        <div className="rfp-stack">
                          <div className="rfp-review-grid">
                            <ReviewItem label="Organisation" value={form.organisationLegalName} />

                            <ReviewItem label="Industry" value={form.industrySector} />

                            <ReviewItem label="Proposal Contact" value={form.proposalContactName} />

                            <ReviewItem label="Contact Email" value={form.proposalContactEmail} />

                            <ReviewItem label="Initiative" value={form.initiativeName} />

                            <ReviewItem label="Primary Capability" value={form.primaryCapability} />

                            <ReviewItem
                              label="Transformation Stage"
                              value={form.transformationStage}
                            />

                            <ReviewItem label="Procurement Stage" value={form.procurementStage} />

                            <ReviewItem label="Commercial Model" value={form.commercialModel} />

                            <ReviewItem label="Budget Range" value={form.budgetRange} />

                            <ReviewItem label="Delivery Model" value={form.deliveryModel} />

                            <ReviewItem
                              label="Documents"
                              value={
                                documents.length
                                  ? `${documents.length} uploaded`
                                  : 'No documents uploaded'
                              }
                            />
                          </div>

                          <InfoAccordion
                            title="Project Details"
                            open={openAccordion === 'project'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'project' ? null : 'project')
                            }
                          >
                            <div
                              style={{
                                display: 'grid',
                                gap: '1rem',
                              }}
                            >
                              <ReviewText
                                label="Transformation Objective"
                                value={form.transformationObjective}
                              />

                              <ReviewText
                                label="Business Challenge"
                                value={form.businessChallenge}
                              />

                              <ReviewText label="Desired Outcomes" value={form.desiredOutcomes} />
                            </div>
                          </InfoAccordion>

                          <InfoAccordion
                            title="Requirements"
                            open={openAccordion === 'requirements'}
                            onClick={() =>
                              setOpenAccordion(
                                openAccordion === 'requirements' ? null : 'requirements',
                              )
                            }
                          >
                            <div
                              style={{
                                display: 'grid',
                                gap: '1rem',
                              }}
                            >
                              <ReviewText label="Scope of Work" value={form.scopeOfWork} />

                              <ReviewText
                                label="Expected Deliverables"
                                value={form.expectedDeliverables}
                              />
                            </div>
                          </InfoAccordion>

                          <InfoAccordion
                            title="Documents"
                            open={openAccordion === 'documents'}
                            onClick={() =>
                              setOpenAccordion(openAccordion === 'documents' ? null : 'documents')
                            }
                          >
                            {documents.length ? (
                              <div
                                style={{
                                  display: 'grid',
                                  gap: '0.5rem',
                                }}
                              >
                                {documents.map((document) => (
                                  <div
                                    key={document.id}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '0.65rem',
                                      fontSize: '0.8rem',
                                      color: 'var(--content-secondary)',
                                    }}
                                  >
                                    <FileText size={15} color="var(--content-accent)" />

                                    <span>{document.file.name}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p
                                style={{
                                  margin: 0,
                                  color: 'var(--content-tertiary)',
                                  fontSize: '0.8rem',
                                }}
                              >
                                No documents uploaded.
                              </p>
                            )}
                          </InfoAccordion>

                          <div
                            style={{
                              padding: '1.25rem',
                              borderRadius: 'var(--radius-xs)',
                              background: 'var(--surface-sunken)',
                              border: '1px solid var(--border-subtle)',
                            }}
                          >
                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.7rem',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={form.privacyConsent}
                                onChange={(event) => update('privacyConsent', event.target.checked)}
                                required
                                style={{
                                  marginTop: 3,
                                  width: 16,
                                  height: 16,
                                  accentColor: 'var(--brand-accent)',
                                }}
                              />

                              <span
                                style={{
                                  color: 'var(--content-secondary)',
                                  fontSize: '0.78rem',
                                  lineHeight: 1.6,
                                }}
                              >
                                I acknowledge that the information provided may be used by TRYVION
                                to evaluate and respond to this proposal request, in accordance with
                                the{' '}
                                <Link
                                  href="/privacy"
                                  style={{
                                    color: 'var(--content-accent)',
                                    fontWeight: 700,
                                  }}
                                >
                                  Privacy Policy
                                </Link>
                                .
                              </span>
                            </label>

                            <label
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.7rem',
                                cursor: 'pointer',
                                marginTop: '1rem',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={form.marketingConsent}
                                onChange={(event) =>
                                  update('marketingConsent', event.target.checked)
                                }
                                style={{
                                  marginTop: 3,
                                  width: 16,
                                  height: 16,
                                  accentColor: 'var(--brand-accent)',
                                }}
                              />

                              <span
                                style={{
                                  color: 'var(--content-secondary)',
                                  fontSize: '0.78rem',
                                  lineHeight: 1.6,
                                }}
                              >
                                I would like TRYVION to contact me regarding relevant services,
                                insights and future opportunities.
                              </span>
                            </label>
                          </div>
                        </div>
                      </FormCard>
                    )}

                    {error && (
                      <div
                        role="alert"
                        style={{
                          marginTop: '1rem',
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--border-default)',
                          background: 'var(--surface-default)',
                          color: 'var(--content-primary)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        {error}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: step === 1 ? 'flex-end' : 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '1.25rem',
                      }}
                    >
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={goBack}
                          disabled={submitting || uploadingDocuments}
                          style={{
                            minHeight: 46,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0 1rem',
                            border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--surface-default)',
                            color: 'var(--content-primary)',
                            fontFamily: 'var(--family-text)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <ChevronLeft size={17} />
                          Previous
                        </button>
                      )}

                      {step < 5 ? (
                        <button
                          type="button"
                          onClick={goNext}
                          disabled={submitting || uploadingDocuments}
                          style={{
                            minHeight: 46,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0 1.25rem',
                            border: 0,
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--action-primary-default)',
                            color: 'var(--action-primary-on-action)',
                            fontFamily: 'var(--family-text)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Next Step
                          <ChevronRight size={17} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting || uploadingDocuments}
                          style={{
                            minHeight: 48,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0 1.35rem',
                            border: 0,
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--action-primary-default)',
                            color: 'var(--action-primary-on-action)',
                            fontFamily: 'var(--family-text)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: submitting || uploadingDocuments ? 'wait' : 'pointer',
                            opacity: submitting || uploadingDocuments ? 0.7 : 1,
                          }}
                        >
                          {uploadingDocuments
                            ? 'Uploading…'
                            : submitting
                              ? 'Submitting…'
                              : 'Submit Proposal Request'}

                          {!submitting && !uploadingDocuments && <ArrowRight size={17} />}
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section
          style={{
            padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,4vw,2.5rem)',
            background: 'var(--surface-default)',
          }}
        >
          <div
            className="rfp-security"
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              padding: '1.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-sunken)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr 1fr',
              gap: '1.75rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--surface-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--content-accent)',
                boxShadow: 'var(--elevation-01)',
              }}
            >
              <LockKeyhole size={28} />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  color: 'var(--content-primary)',
                  fontFamily: 'var(--family-display)',
                  fontSize: '1.25rem',
                }}
              >
                Your information is secure
              </h2>

              <p
                style={{
                  margin: '0.45rem 0 0',
                  maxWidth: 520,
                  color: 'var(--content-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                }}
              >
                We take the privacy and security of your information seriously. Your details and
                documents will be handled confidentially and used only to prepare your proposal.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gap: '1.1rem',
              }}
            >
              <SecurityItem
                icon={<ShieldCheck size={36} />}
                title="Confidential & Secure"
                text="Your data is handled with strict confidentiality."
              />

              <SecurityItem
                icon={<LockKeyhole size={36} />}
                title="For Proposal Purposes Only"
                text="We use your information solely to respond to your request."
              />
            </div>
          </div>
        </section>

        <section
          style={{
            background: '#031A33',
            color: '#fff',
            padding: 'clamp(3rem,6vw,4.5rem) clamp(1.25rem,4vw,2.5rem)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--family-display)',
              fontSize: 'clamp(1.55rem,3vw,2.2rem)',
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            Not ready to submit an RFP?
          </h2>

          <p
            style={{
              margin: '0.6rem 0 1.5rem',
              color: 'rgba(255,255,255,0.72)',
              fontSize: '1rem',
            }}
          >
            Talk to our experts first to explore solutions tailored to your business.
          </p>

          <Link
            href="/contact/talk-to-an-expert"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              minHeight: 46,
              padding: '0 1.15rem',
              border: '1px solid #C9A24B',
              borderRadius: 'var(--radius-xs)',
              color: '#C9A24B',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            Talk to an Expert
            <ArrowRight size={16} />
          </Link>
        </section>

        <section
          style={{
            background: 'var(--surface-default)',
            padding: '5.75rem clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div
            className="rfp-value-strip"
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '1.25rem',
            }}
          >
            <ValueItem
              icon={<Target size={28} />}
              title="Global Expertise"
              text="Access specialists across industries and technologies."
            />

            <ValueItem
              icon={<ShieldCheck size={28} />}
              title="Proven Experience"
              text="Delivering complex transformation programmes worldwide."
            />

            <ValueItem
              icon={<Users size={28} />}
              title="End-to-End Support"
              text="From strategy to implementation and beyond."
            />

            <ValueItem
              icon={<Target size={28} />}
              title="Business Outcomes"
              text="Focused on measurable value and long-term success."
            />
          </div>
        </section>
      </main>
    </>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: '0.85rem 0.95rem',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xs)',
        background: 'var(--surface-sunken)',
      }}
    >
      <div
        style={{
          color: 'var(--content-tertiary)',
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: 'var(--content-primary)',
          fontSize: '0.82rem',
          fontWeight: 600,
          wordBreak: 'break-word',
        }}
      >
        {value || 'Not provided'}
      </div>
    </div>
  );
}

function ReviewText({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          color: 'var(--content-tertiary)',
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.3rem',
        }}
      >
        {label}
      </div>

      <p
        style={{
          margin: 0,
          color: 'var(--content-secondary)',
          fontSize: '0.8rem',
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
        }}
      >
        {value || 'Not provided'}
      </p>
    </div>
  );
}

function SecurityItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          color: 'var(--content-accent)',
          display: 'flex',
          marginTop: 2,
        }}
      >
        {icon}
      </div>

      <div>
        <strong
          style={{
            display: 'block',
            color: 'var(--content-primary)',
            fontSize: '1rem',
          }}
        >
          {title}
        </strong>

        <span
          style={{
            display: 'block',
            marginTop: 2,
            color: 'var(--content-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.45,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

function ValueItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          color: 'var(--content-primary)',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </div>

      <div>
        <strong
          style={{
            display: 'block',
            color: 'var(--content-primary)',
            fontSize: '1.15rem',
            marginBottom: 2,
          }}
        >
          {title}
        </strong>

        <span
          style={{
            display: 'block',
            color: 'var(--content-tertiary)',
            fontSize: '0.9rem',
            lineHeight: 1.45,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

const responsiveStyles = `
  .rfp-step-button {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 34px minmax(0,1fr);
    gap: 0.7rem;
    align-items: start;
    padding: 0 0 1.6rem;
    border: 0;
    background: transparent;
    text-align: left;
    color: var(--content-secondary);
    font-family: var(--family-text);
    cursor: pointer;
  }

  .rfp-step-button:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 16px;
    top: 34px;
    bottom: 5px;
    width: 1px;
    background: var(--border-subtle);
  }

  .rfp-step-button:disabled {
    cursor: default;
  }

  .rfp-step-button strong {
    display: block;
    font-size: 1.1rem;
    line-height: 1.25;
    color: var(--content-secondary);
  }

  .rfp-step-button small {
    display: block;
    margin-top: 0.35rem;
    color: var(--content-tertiary);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .rfp-step-button.is-active strong {
    color: var(--content-primary);
  }

  .rfp-step-number {
    position: relative;
    z-index: 1;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-default);
    border-radius: 50%;
    background: var(--surface-default);
    color: var(--content-secondary);
    font-size: 1rem;
    font-weight: 700;
    box-sizing: border-box;
  }

  .rfp-step-number.is-active {
    border-color: var(--ink-950);
    background: var(--ink-950);
    color: #fff;
  }

  .rfp-step-number.is-complete {
    border-color: var(--brand-accent);
    background: var(--brand-accent);
    color: #fff;
  }

  .rfp-grid-2 {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 1.1rem 1.2rem;
  }

  .rfp-stack {
    display: grid;
    gap: 1rem;
  }

  .rfp-review-grid {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 0.75rem;
  }

  @media (max-width: 900px) {
    .rfp-form-layout {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }

    .rfp-step-rail {
      display: grid;
      grid-template-columns: repeat(5,minmax(0,1fr));
      gap: 0.45rem;
      overflow-x: auto;
      padding-bottom: 0.25rem;
    }

    .rfp-step-button {
      display: block;
      padding: 0;
      text-align: center;
      min-width: 85px;
    }

    .rfp-step-button::after {
      display: none !important;
    }

    .rfp-step-button strong {
      margin-top: 0.4rem;
      font-size: 0.68rem;
    }

    .rfp-step-button small {
      display: none;
    }

    .rfp-step-number {
      margin: 0 auto;
    }

    .rfp-submit-types {
      grid-template-columns: repeat(2,1fr) !important;
    }

    .rfp-security {
      grid-template-columns: 1fr !important;
    }

    .rfp-value-strip {
      grid-template-columns: repeat(2,1fr) !important;
    }
  }

  @media (max-width: 640px) {
    .rfp-hero {
      min-height: 650px !important;
    }

    .rfp-hero > div:nth-child(2) {
      min-height: 650px !important;
      align-items: flex-start !important;
    }

    .rfp-hero-benefits {
      grid-template-columns: 1fr !important;
      gap: 0.8rem !important;
    }

    .rfp-grid-2 {
      grid-template-columns: 1fr;
    }

    .rfp-submit-types {
      grid-template-columns: 1fr !important;
    }

    .rfp-review-grid {
      grid-template-columns: 1fr;
    }

    .rfp-value-strip {
      grid-template-columns: 1fr !important;
    }

    .rfp-upload-controls {
      align-items: stretch !important;
      flex-direction: column;
    }

    .rfp-upload-controls > div,
    .rfp-upload-controls label {
      width: 100%;
      box-sizing: border-box;
    }
  }
`;
