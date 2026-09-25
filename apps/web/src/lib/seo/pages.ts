import type { Metadata } from 'next';

import { buildMetadata, type PageMetadataInput } from '@/lib/metadata';

export interface PageSeoDefinition extends PageMetadataInput {
  /**
   * Breadcrumb hierarchy used by page-level structured data.
   */
  breadcrumbs?: Array<{
    name: string;
    path: string;
  }>;

  /**
   * Schema.org page type.
   * Defaults to WebPage.
   */
  schemaType?: 'WebPage' | 'ContactPage';
}

/**
 * TRYVION SEO source of truth.
 *
 * This object contains the canonical SEO definition for each page:
 * - title
 * - description
 * - canonical path
 * - indexing directive
 * - structured-data type
 * - breadcrumb hierarchy
 *
 * pageMetadata below is generated from this object and remains the
 * interface consumed by the existing Next.js route layouts.
 */
export const pageSeo = {
  home: {
    title: 'Enterprise Transformation Partner',
    description:
      'TRYVION is a global enterprise transformation partner delivering SAP, enterprise AI, cloud, data, digital engineering, talent and managed services to help organisations modernise, innovate and grow.',
    path: '/',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },

  services: {
    title: 'Enterprise Transformation Services',
    description:
      'Explore TRYVION enterprise transformation services across SAP applications, AI, talent, learning and intelligent operations.',
    path: '/services',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  },

  industries: {
    title: 'Industries',
    description:
      'Explore the industries TRYVION serves across service, consumer, financial, public, discrete, energy and natural resource sectors through enterprise transformation, technology and intelligence.',
    path: '/industries',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ],
  },

  about: {
    title: 'About',
    description:
      'Learn about TRYVION, an enterprise transformation partner helping organisations create momentum across technology, talent and operations.',
    path: '/about',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },

  leadership: {
    title: 'TRYVION Leadership',
    description:
      'Meet the TRYVION leaders guiding enterprise transformation across SAP, AI, cloud, talent and operations.',
    path: '/about/leadership',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Leadership', path: '/about/leadership' },
    ],
  },

  ourStory: {
    title: 'Our Story',
    description:
      'Discover the TRYVION story, purpose and approach to helping organisations make defining transformation choices.',
    path: '/about/our-story',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Our Story', path: '/about/our-story' },
    ],
  },

  ourValues: {
    title: 'TRYVION Values',
    description:
      'See the values that shape how TRYVION partners with clients, builds teams and delivers lasting transformation.',
    path: '/about/our-values',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Our Values', path: '/about/our-values' },
    ],
  },

  whatWeBelieve: {
    title: 'What TRYVION Believes',
    description:
      'Explore the TRYVION belief that the future is a choice, and how purposeful action creates enterprise momentum.',
    path: '/about/what-we-believe',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      {
        name: 'What We Believe',
        path: '/about/what-we-believe',
      },
    ],
  },

  careers: {
    title: 'Careers at TRYVION',
    description:
      'Build your career at TRYVION and help organisations navigate enterprise transformation through technology, talent and innovation.',
    path: '/careers',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
    ],
  },

  lifeAtTryvion: {
    title: 'Life at TRYVION',
    description:
      'Explore life at TRYVION, our culture and the opportunities to build meaningful transformation careers.',
    path: '/careers/life-at-tryvion',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      {
        name: 'Life at TRYVION',
        path: '/careers/life-at-tryvion',
      },
    ],
  },

  careerRoles: {
    title: 'Current Career Opportunities',
    description:
      'Explore current TRYVION opportunities across enterprise technology, transformation, SAP, AI and operations.',
    path: '/careers/roles',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      {
        name: 'Current Career Opportunities',
        path: '/careers/roles',
      },
    ],
  },

  contact: {
    title: 'Contact Us | Connect With Our Team',
    description:
      'Connect with TRYVION to explore enterprise transformation, SAP, AI, cloud, data, talent and digital solutions. Speak with our experts, book a consultation or find the right team for your needs.',
    path: '/contact',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
  },

  contactCustomerSupport: {
    title: 'Contact Us | Enterprise Transformation & Support',
    description:
      'Connect with TRYVION to speak with an enterprise transformation expert, book a consultation, or get support for an existing TRYVION engagement.',
    path: '/contact/customer-support',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
      {
        name: 'Customer Support',
        path: '/contact/customer-support',
      },
    ],
  },

  globalOffices: {
    title: 'TRYVION Global Offices',
    description:
      'Find TRYVION global office locations and connect with the right enterprise transformation team.',
    path: '/contact/global-offices',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
      {
        name: 'Global Offices',
        path: '/contact/global-offices',
      },
    ],
  },

  salesEnquiries: {
    title: 'Sales Enquiries',
    description:
      'Connect with TRYVION to discuss services, solutions, commercial opportunities, partnerships, or an active business requirement.',
    path: '/contact/sales-enquiries',
    schemaType: 'ContactPage',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
      {
        name: 'Sales Enquiries',
        path: '/contact/sales-enquiries',
      },
    ],
  },

  requestAProposal: {
    title: 'Request a Proposal (RFP)',
    description:
      'Submit your RFP, project scope or transformation requirements to TRYVION and receive a tailored proposal from our enterprise transformation specialists.',
    path: '/contact/request-a-proposal',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
      {
        name: 'Request a Proposal',
        path: '/contact/request-a-proposal',
      },
    ],
  },

  applications: {
    title: 'Enterprise Applications & SAP Services',
    description:
      'Modernise your enterprise with TRYVION enterprise transformation and advisory services across SAP S/4HANA, SAP SuccessFactors and SAP Business Technology Platform.',
    path: '/services/applications',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
    ],
  },

  sapS4HanaPublicEdition: {
    title: 'SAP S/4HANA Cloud Public Edition Services',
    description:
      'Adopt SAP S/4HANA Cloud Public Edition with a fit-to-standard approach that accelerates implementation and continuous innovation.',
    path: '/services/applications/sap-s4hana/public-edition',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
      {
        name: 'SAP S/4HANA',
        path: '/services/applications/sap-s4hana',
      },
      {
        name: 'Public Edition',
        path: '/services/applications/sap-s4hana/public-edition',
      },
    ],
  },

  sapS4HanaPrivateEdition: {
    title: 'SAP S/4HANA Cloud Private Edition Services',
    description:
      'Modernise complex SAP landscapes with S/4HANA Cloud Private Edition, combining enterprise flexibility with cloud operating benefits.',
    path: '/services/applications/sap-s4hana/private-edition',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
      {
        name: 'SAP S/4HANA',
        path: '/services/applications/sap-s4hana',
      },
      {
        name: 'Private Edition',
        path: '/services/applications/sap-s4hana/private-edition',
      },
    ],
  },

  sapSuccessFactors: {
    title: 'SAP SuccessFactors Implementation Services',
    description:
      'Transform workforce experiences with TRYVION SAP SuccessFactors implementation, integration and people strategy services.',
    path: '/services/applications/sap-successfactors',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
      {
        name: 'SAP SuccessFactors',
        path: '/services/applications/sap-successfactors',
      },
    ],
  },

  sapBtp: {
    title: 'SAP Business Technology Platform Services',
    description:
      'Connect, extend and innovate with TRYVION SAP BTP consulting, integration, data and application development services.',
    path: '/services/applications/sap-btp',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
      {
        name: 'SAP BTP',
        path: '/services/applications/sap-btp',
      },
    ],
  },

  artificialIntelligence: {
    title: 'Enterprise AI Strategy & Implementation',
    description:
      'Turn enterprise AI ambition into governed, scalable value with TRYVION AI strategy, platforms and intelligent automation services.',
    path: '/services/artificial-intelligence',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Artificial Intelligence',
        path: '/services/artificial-intelligence',
      },
    ],
  },

  enterpriseAiStrategy: {
    title: 'Enterprise AI Strategy Consulting',
    description:
      'Define a practical enterprise AI strategy that connects business value, data, governance, operating model and implementation priorities.',
    path: '/services/artificial-intelligence/enterprise-ai-strategy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Artificial Intelligence',
        path: '/services/artificial-intelligence',
      },
      {
        name: 'Enterprise AI Strategy',
        path: '/services/artificial-intelligence/enterprise-ai-strategy',
      },
    ],
  },

  enterpriseAiPlatforms: {
    title: 'Enterprise AI Platform Services',
    description:
      'Design and implement secure, scalable enterprise AI platforms that connect data, models, applications and governance.',
    path: '/services/artificial-intelligence/enterprise-ai-platforms',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Artificial Intelligence',
        path: '/services/artificial-intelligence',
      },
      {
        name: 'Enterprise AI Platforms',
        path: '/services/artificial-intelligence/enterprise-ai-platforms',
      },
    ],
  },

  intelligentAutomation: {
    title: 'Intelligent Automation Services',
    description:
      'Automate complex enterprise workflows with AI-enabled orchestration, human oversight and measurable operational outcomes.',
    path: '/services/artificial-intelligence/intelligent-automation',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Artificial Intelligence',
        path: '/services/artificial-intelligence',
      },
      {
        name: 'Intelligent Automation',
        path: '/services/artificial-intelligence/intelligent-automation',
      },
    ],
  },

  sapS4Hana: {
    title: 'SAP S/4HANA Implementation & Migration',
    description:
      'Plan, migrate and evolve your SAP S/4HANA environment with TRYVION transformation, cloud and clean-core expertise.',
    path: '/services/applications/sap-s4hana',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Applications',
        path: '/services/applications',
      },
      {
        name: 'SAP S/4HANA',
        path: '/services/applications/sap-s4hana',
      },
    ],
  },

  talent: {
    title: 'Enterprise Technology Talent Solutions',
    description:
      'Build transformation-ready teams with TRYVION SAP talent, permanent hiring and executive search solutions.',
    path: '/services/talent',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Talent',
        path: '/services/talent',
      },
    ],
  },

  sapTalentSolutions: {
    title: 'SAP Talent Solutions',
    description:
      'Build transformation-ready SAP teams with TRYVION talent solutions spanning SAP specialists, functional expertise and enterprise transformation capabilities.',
    path: '/services/talent/sap-talent-solutions',
    noIndex: true,
  },

  permanentHiring: {
    title: 'Permanent Technology Hiring Solutions',
    description:
      'Build permanent enterprise technology teams with specialist hiring support across SAP, AI, cloud and digital transformation.',
    path: '/services/talent/permanent-hiring',
    noIndex: true,
  },

  executiveSearch: {
    title: 'Technology Executive Search',
    description:
      'Find transformation-ready technology leaders through TRYVION executive search for enterprise, SAP, AI and digital roles.',
    path: '/services/talent/executive-search',
    noIndex: true,
  },

  academy: {
    title: 'Enterprise Learning & Academy Services',
    description:
      'Build the skills transformation demands with TRYVION enterprise learning, capability development and academy services.',
    path: '/services/academy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Academy',
        path: '/services/academy',
      },
    ],
  },

  learningPlatform: {
    title: 'Enterprise Learning Platform',
    description:
      'Deliver scalable enterprise learning experiences with TRYVION’s learning platform for workforce capability and transformation adoption.',
    path: '/services/academy/learning-platform',
    noIndex: true,
  },

  operate: {
    title: 'Managed Enterprise Operations Services',
    description:
      'Stabilise, automate and continuously improve critical SAP, cloud and application operations with TRYVION Operate.',
    path: '/services/operate',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Operate',
        path: '/services/operate',
      },
    ],
  },

  sapRunInTheNew: {
    title: 'SAP Run in the New Managed Services',
    description:
      'Move beyond traditional SAP support with proactive operations, automation and continuous improvement through TRYVION Operate.',
    path: '/services/operate/sap-run-in-the-new',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      {
        name: 'Operate',
        path: '/services/operate',
      },
      {
        name: 'SAP Run in the New',
        path: '/services/operate/sap-run-in-the-new',
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy | TRYVION',
    description:
      'Read the TRYVION Privacy Policy to understand how we collect, use, protect and manage personal information.',
    path: '/privacy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      {
        name: 'Privacy Policy',
        path: '/privacy',
      },
    ],
  },

  terms: {
    title: 'Terms of Use | TRYVION',
    description:
      'Review the TRYVION Terms of Use governing access to and use of the TRYVION website, services and digital experiences.',
    path: '/terms',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      {
        name: 'Terms of Use',
        path: '/terms',
      },
    ],
  },

  cookiePolicy: {
    title: 'Cookie Policy | TRYVION',
    description:
      'Learn how TRYVION uses cookies and similar technologies to improve website functionality, performance and user experience.',
    path: '/cookie-policy',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      {
        name: 'Cookie Policy',
        path: '/cookie-policy',
      },
    ],
  },

  accessibility: {
    title: 'Accessibility Statement | TRYVION',
    description:
      'Learn about TRYVION’s commitment to accessibility and providing an inclusive digital experience for all users.',
    path: '/accessibility',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      {
        name: 'Accessibility Statement',
        path: '/accessibility',
      },
    ],
  },
} satisfies Record<string, PageSeoDefinition>;

/**
 * Next.js Metadata generated from the single SEO source of truth above.
 *
 * Existing route layouts continue to consume:
 *   pageMetadata.home
 *   pageMetadata.services
 *   pageMetadata.about
 *   etc.
 */
export const pageMetadata: {
  [K in keyof typeof pageSeo]: Metadata;
} = Object.fromEntries(Object.entries(pageSeo).map(([key, seo]) => [key, buildMetadata(seo)])) as {
  [K in keyof typeof pageSeo]: Metadata;
};
