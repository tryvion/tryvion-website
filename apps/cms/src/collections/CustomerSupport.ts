import type {
  CollectionBeforeValidateHook,
  CollectionConfig,
} from 'payload';

const SUPPORT_AREAS = [
  'SAP Applications',
  'AI & Automation',
  'Integration & Technology',
  'Operate',
  'Other Enquiry',
] as const;

const SUPPORT_PRIORITIES = [
  'Low',
  'Medium',
  'High',
  'Critical / Urgent',
] as const;

const SUPPORT_STATUSES = [
  'new',
  'in_progress',
  'awaiting_customer',
  'resolved',
  'closed',
  'spam',
] as const;

const ROUTING_TEAMS = [
  'SAP Applications',
  'AI & Automation',
  'Integration & Technology',
  'Operate',
  'Customer Support',
] as const;

const normalizeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const normalizeEmail = (value: unknown): string => {
  return normalizeText(value).toLowerCase();
};

const validateRequiredText = (
  value: unknown,
  label: string,
  minLength: number,
  maxLength: number,
) => {
  if (typeof value !== 'string' || !value.trim()) {
    return `${label} is required.`;
  }

  const normalized = value.trim();

  if (normalized.length < minLength) {
    return `${label} must be at least ${minLength} characters.`;
  }

  if (normalized.length > maxLength) {
    return `${label} must be ${maxLength} characters or fewer.`;
  }

  return true;
};

function routingTeamForSupportArea(area: string) {
  if (area === 'SAP Applications') return 'SAP Applications';
  if (area === 'AI & Automation') return 'AI & Automation';
  if (area === 'Integration & Technology') return 'Integration & Technology';
  if (area === 'Operate') return 'Operate';

  return 'Customer Support';
}

const beforeValidate: CollectionBeforeValidateHook = async ({ data, operation }) => {
  if (!data) return data;

  const normalized: Record<string, unknown> = {
    ...data,
    fullName: normalizeText(data.fullName),
    company: normalizeText(data.company),
    workEmail: normalizeEmail(data.workEmail),
    phone: normalizeText(data.phone),
    supportArea: normalizeText(data.supportArea),
    supportPriority: normalizeText(data.supportPriority),
    customerProjectReference: normalizeText(data.customerProjectReference),
    issue: normalizeText(data.issue),
    website: normalizeText(data.website),
  };

  if (operation === 'create') {
    if (normalized.privacyConsent !== true) {
      throw new Error('Privacy consent is required to submit a support request.');
    }

    normalized.privacyConsentAt = new Date().toISOString();

    if (!normalized.status) {
      normalized.status = 'new';
    }

    if (!normalized.source) {
      normalized.source = 'website-customer-support';
    }

    if (!normalized.submittedAt) {
      normalized.submittedAt = new Date().toISOString();
    }

    if (typeof normalized.marketingConsent !== 'boolean') {
      normalized.marketingConsent = false;
    }

    const supportArea =
      typeof normalized.supportArea === 'string'
        ? normalized.supportArea
        : '';

    normalized.routingTeam = routingTeamForSupportArea(supportArea);
  }

  return normalized;
};

export const CustomerSupport: CollectionConfig = {
  slug: 'customer-support',

  labels: {
    singular: 'Customer Support Request',
    plural: 'Customer Support Requests',
  },

  admin: {
    useAsTitle: 'ticketId',
    defaultColumns: [
      'ticketId',
      'fullName',
      'company',
      'supportArea',
      'supportPriority',
      'status',
      'createdAt',
    ],
    group: 'Support Management',
    description:
      'Customer support requests submitted through the TRYVION Customer Support page.',
  },

  /*
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
        description: 'Public-facing support ticket identifier.',
      },
    },

    {
      name: 'fullName',
      type: 'text',
      required: true,
      maxLength: 100,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Full name', 2, 100),
    },

    {
      name: 'company',
      type: 'text',
      required: true,
      maxLength: 150,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Company', 2, 150),
    },

    {
      name: 'workEmail',
      type: 'email',
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string') {
          return 'Work email is required.';
        }

        const email = value.trim().toLowerCase();

        if (!email) return 'Work email is required.';
        if (email.length > 254) {
          return 'Email address must be 254 characters or fewer.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return 'Please enter a valid work email address.';
        }

        return true;
      },
    },

    {
      name: 'phone',
      type: 'text',
      required: false,
      maxLength: 40,
      validate: (value: unknown) => {
        if (value == null || value === '') return true;

        if (typeof value !== 'string') {
          return 'Phone must be text.';
        }

        const phone = value.trim();

        if (phone.length < 7 || phone.length > 40) {
          return 'Phone must be between 7 and 40 characters.';
        }

        if (!/^[+0-9().\-\s]+$/.test(phone)) {
          return 'Enter a valid phone number.';
        }

        return true;
      },
    },

    {
      name: 'supportArea',
      type: 'select',
      required: true,
      options: SUPPORT_AREAS.map((value) => ({
        label: value,
        value,
      })),
      admin: {
        description: 'Primary support service area used for routing.',
      },
    },

    {
      name: 'supportPriority',
      type: 'select',
      required: true,
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
      required: true,
      maxLength: 5000,
      validate: (value: unknown) =>
        validateRequiredText(value, 'Issue description', 10, 5000),
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
        description: 'Support team selected automatically from the support area.',
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
        { label: 'Awaiting Customer', value: 'awaiting_customer' },
        { label: 'Resolved', value: 'resolved' },
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
      defaultValue: 'website-customer-support',
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
};
