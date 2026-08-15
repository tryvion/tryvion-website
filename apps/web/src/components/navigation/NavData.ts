import type { NavItemConfig } from '@tryvion/ui';

/* ─────────────────────────────────────────────────────────────────
   TRYVION NAVIGATION
   Single source of truth for desktop + mobile navigation.
───────────────────────────────────────────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading?: string;
  links: NavLink[];
}

export interface MegaMenu {
  columns: NavColumn[];
  cta?: {
    label: string;
    href: string;
  };
}

export interface ServiceGroup {
  heading: string;
  href: string;
  links: NavLink[];
}

/* ─────────────────────────────────────────────────────────────────
   UTILITY BAR
───────────────────────────────────────────────────────────────── */

export const UTILITY_LEFT: NavLink[] = [
  {
    label: 'Offices',
    href: '/about/locations',
  },
  {
    label: 'Media Center',
    href: '/media',
  },
  {
    label: 'Subscribe',
    href: '/subscribe',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

/* ─────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────── */

export const ABOUT_LINKS: NavLink[] = [
  {
    label: 'Our Story',
    href: '/about/our-story',
  },
  {
    label: 'Leadership',
    href: '/about/leadership',
  },
  {
    label: 'Our Values',
    href: '/about/our-values',
  },
  {
    label: 'Global Presence',
    href: '/about/locations',
  },
];

/* ─────────────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────────────── */

export const SERVICES_GROUPS: ServiceGroup[] = [
  {
    heading: 'Tryvion Applications',
    href: '/services/applications',
    links: [
      {
        label: 'SAP S/4HANA',
        href: '/services/applications/sap-s4hana',
      },
      {
        label: 'SAP SuccessFactors',
        href: '/services/applications/sap-successfactors',
      },
      {
        label: 'SAP Business Technology Platform (BTP)',
        href: '/services/applications/sap-btp',
      },
    ],
  },

  {
    heading: 'Tryvion AI',
    href: '/services/artificial-intelligence',
    links: [
      {
        label: 'Enterprise AI Strategy',
        href: '/services/artificial-intelligence/enterprise-ai-strategy',
      },
      {
        label: 'Enterprise AI Platforms',
        href: '/services/artificial-intelligence/enterprise-ai-platforms',
      },
      {
        label: 'Intelligent Automation',
        href: '/services/artificial-intelligence/intelligent-automation',
      },
    ],
  },

  {
    heading: 'Tryvion Talent',
    href: '/services/talent',
    links: [
      {
        label: 'SAP Talent Solutions',
        href: '/services/talent/sap-talent-solutions',
      },
      {
        label: 'Permanent Hiring',
        href: '/services/talent/permanent-hiring',
      },
      {
        label: 'Executive Search',
        href: '/services/talent/executive-search',
      },
    ],
  },

  {
    heading: 'Tryvion Academy',
    href: '/services/academy',
    links: [
      {
        label: 'Tryvion Learning Platform (TLP)',
        href: '/services/academy/learning-platform',
      },
    ],
  },

  {
    heading: 'Tryvion Operate',
    href: '/services/operate',
    links: [
      {
        label: 'SAP Run in the New',
        href: '/services/operate/sap-run-in-the-new',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   INDUSTRIES
───────────────────────────────────────────────────────────────── */

export const INDUSTRY_LINKS: NavLink[] = [
  { label: 'Manufacturing', href: '/industries' },
  { label: 'Energy & Utilities', href: '/industries' },
  { label: 'Financial Services', href: '/industries' },
  { label: 'Healthcare & Life Sciences', href: '/industries' },
  { label: 'Retail & Consumer Products', href: '/industries' },
  { label: 'Automotive', href: '/industries' },
  { label: 'Technology', href: '/industries' },
  { label: 'Public Sector', href: '/industries' },
  { label: 'Aerospace & Defense', href: '/industries' },
  { label: 'Chemicals', href: '/industries' },
  { label: 'Transportation & Logistics', href: '/industries' },
  { label: 'Travel & Leisure', href: '/industries' },
];

/* ─────────────────────────────────────────────────────────────────
   CAREERS
───────────────────────────────────────────────────────────────── */

export const CAREERS_LINKS: NavLink[] = [
  {
    label: 'Life at Tryvion',
    href: '/careers/life-at-tryvion',
  },
];

/* ─────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────── */

export const CONTACT_COLUMNS: NavColumn[] = [
  {
    heading: 'Get in touch',
    links: [
      {
        label: 'Talk to an Expert',
        href: '/contact/talk-to-an-expert',
      },
      {
        label: 'Book a Consultation',
        href: '/contact/book-a-consultation',
      },
      {
        label: 'Request a Proposal (RFP)',
        href: '/contact/request-a-proposal',
      },
    ],
  },

  {
    heading: 'Support',
    links: [
      {
        label: 'Sales Enquiries',
        href: '/contact/sales-enquiries',
      },
      {
        label: 'Customer Support',
        href: '/contact/customer-support',
      },
      {
        label: 'Global Offices',
        href: '/about/locations',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────────────────────────── */

export const POPULAR_SEARCHES = [
  'SAP S/4HANA',
  'Enterprise AI',
  'Clean Core',
  'Intelligent Automation',
  'Executive Search',
];

export const RECENT_PAGES: NavLink[] = [
  {
    label: 'TRYVION — Home',
    href: '/',
  },
];

export interface SearchEntry {
  label: string;
  href: string;
  group: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  ...SERVICES_GROUPS.flatMap((group) =>
    group.links.map((link) => ({
      label: link.label,
      href: link.href,
      group: group.heading,
    })),
  ),

  ...INDUSTRY_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
    group: 'Industries',
  })),

  ...ABOUT_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
    group: 'About',
  })),

  ...CONTACT_COLUMNS.flatMap((column) =>
    column.links.map((link) => ({
      label: link.label,
      href: link.href,
      group: 'Contact',
    })),
  ),

  ...CAREERS_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
    group: 'Careers',
  })),
];

/* ─────────────────────────────────────────────────────────────────
   PRIMARY NAVIGATION
   SHARED BY DESKTOP + MOBILE
───────────────────────────────────────────────────────────────── */

export const PRIMARY_NAV: NavItemConfig[] = [
  /* HOME */

  {
    label: 'Home',
    href: '/',
  },

  /* ABOUT */

  {
    label: 'About',
    href: '/about',

    megaMenu: {
      columns: [
        {
          links: ABOUT_LINKS,
        },
      ],
    },
  },

  /* SERVICES */

  {
    label: 'Services',
    href: '/services',

    megaMenu: {
      columns: SERVICES_GROUPS.map((group) => ({
        heading: group.heading,
        links: group.links,
      })),

      cta: {
        label: 'Explore all services',
        href: '/services',
      },
    },
  },

  /* INDUSTRIES */

  {
    label: 'Industries',
    href: '/industries',
  },

  /* CAREERS */

  {
    label: 'Careers',
    href: '/careers',

    megaMenu: {
      columns: [
        {
          links: CAREERS_LINKS,
        },
      ],

      cta: {
        label: 'View all careers',
        href: '/careers',
      },
    },
  },

  /* CONTACT */

  {
    label: 'Contact',
    href: '/contact',

    megaMenu: {
      columns: CONTACT_COLUMNS,
    },
  },
];
