import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const pageMetadata = {
  home: buildMetadata({
    title: 'Enterprise Transformation Partner | TRYVION',
    description:
      'TRYVION is an independent enterprise transformation partner specialising in SAP, enterprise AI, cloud, talent and intelligent operations — helping organisations create clarity, build momentum and shape what comes next.',
    path: '/',
  }),
  services: buildMetadata({
    title: 'Enterprise Transformation Services',
    description:
      'Explore TRYVION enterprise transformation services across SAP applications, AI, talent, learning and intelligent operations.',
    path: '/services',
  }),
  industries: buildMetadata({
    title: 'Industries',
    description:
      'Explore the industries TRYVION serves across service, consumer, financial, public, discrete, energy and natural resource sectors through enterprise transformation, technology and intelligence.',
    path: '/industries',
  }),
  about: buildMetadata({
    title: 'About TRYVION',
    description:
      'Learn about TRYVION, an enterprise transformation partner helping organisations create momentum across technology, talent and operations.',
    path: '/about',
  }),
  leadership: buildMetadata({
    title: 'TRYVION Leadership',
    description:
      'Meet the TRYVION leaders guiding enterprise transformation across SAP, AI, cloud, talent and operations.',
    path: '/about/leadership',
  }),
  locations: buildMetadata({
    title: 'TRYVION Global Locations',
    description:
      'Explore TRYVION’s global presence and connect with enterprise transformation specialists in key locations.',
    path: '/about/locations',
  }),
  ourStory: buildMetadata({
    title: 'Our Story',
    description:
      'Discover the TRYVION story, purpose and approach to helping organisations make defining transformation choices.',
    path: '/about/our-story',
  }),
  ourValues: buildMetadata({
    title: 'TRYVION Values',
    description:
      'See the values that shape how TRYVION partners with clients, builds teams and delivers lasting transformation.',
    path: '/about/our-values',
  }),
  whatWeBelieve: buildMetadata({
    title: 'What TRYVION Believes',
    description:
      'Explore the TRYVION belief that the future is a choice, and how purposeful action creates enterprise momentum.',
    path: '/about/what-we-believe',
  }),
  careers: buildMetadata({
    title: 'Careers at TRYVION',
    description:
      'Build your career at TRYVION and help organisations navigate enterprise transformation through technology, talent and innovation.',
    path: '/careers',
  }),
  lifeAtTryvion: buildMetadata({
    title: 'Life at TRYVION',
    description:
      'Explore life at TRYVION, our culture and the opportunities to build meaningful transformation careers.',
    path: '/careers/life-at-tryvion',
  }),
  careerRoles: buildMetadata({
    title: 'Current Career Opportunities',
    description:
      'Explore current TRYVION opportunities across enterprise technology, transformation, SAP, AI and operations.',
    path: '/careers/roles',
  }),
  contact: buildMetadata({
    title: 'Contact TRYVION',
    description:
      'Contact TRYVION to discuss enterprise transformation, SAP, AI, technology talent or managed operations.',
    path: '/contact',
  }),
  talkToAnExpert: buildMetadata({
    title: 'Talk to an Enterprise Transformation Expert',
    description:
      'Speak with a TRYVION specialist about your SAP, AI, cloud, talent or enterprise transformation priorities.',
    path: '/contact/talk-to-an-expert',
  }),
  bookAConsultation: buildMetadata({
    title: 'Book a Transformation Consultation',
    description:
      'Book a consultation with TRYVION to explore your enterprise transformation opportunities and next steps.',
    path: '/contact/book-a-consultation',
  }),
  globalOffices: buildMetadata({
    title: 'TRYVION Global Offices',
    description:
      'Find TRYVION global office locations and connect with the right enterprise transformation team.',
    path: '/contact/global-offices',
  }),
  applications: buildMetadata({
    title: 'Enterprise Applications & SAP Services',
    description:
      'Modernise your enterprise core with TRYVION SAP S/4HANA, SAP SuccessFactors and SAP Business Technology Platform services.',
    path: '/services/applications',
  }),
  sapS4HanaPublicEdition: buildMetadata({
    title: 'SAP S/4HANA Cloud Public Edition Services',
    description:
      'Adopt SAP S/4HANA Cloud Public Edition with a fit-to-standard approach that accelerates implementation and continuous innovation.',
    path: '/services/applications/sap-s4hana/public-edition',
  }),
  sapS4HanaPrivateEdition: buildMetadata({
    title: 'SAP S/4HANA Cloud Private Edition Services',
    description:
      'Modernise complex SAP landscapes with S/4HANA Cloud Private Edition, combining enterprise flexibility with cloud operating benefits.',
    path: '/services/applications/sap-s4hana/private-edition',
  }),
  sapSuccessFactors: buildMetadata({
    title: 'SAP SuccessFactors Implementation Services',
    description:
      'Transform workforce experiences with TRYVION SAP SuccessFactors implementation, integration and people strategy services.',
    path: '/services/applications/sap-successfactors',
  }),
  sapBtp: buildMetadata({
    title: 'SAP Business Technology Platform Services',
    description:
      'Connect, extend and innovate with TRYVION SAP BTP consulting, integration, data and application development services.',
    path: '/services/applications/sap-btp',
  }),
  artificialIntelligence: buildMetadata({
    title: 'Enterprise AI Strategy & Implementation',
    description:
      'Turn enterprise AI ambition into governed, scalable value with TRYVION AI strategy, platforms and intelligent automation services.',
    path: '/services/artificial-intelligence',
  }),
  enterpriseAiStrategy: buildMetadata({
    title: 'Enterprise AI Strategy Consulting',
    description:
      'Define a practical enterprise AI strategy that connects business value, data, governance, operating model and implementation priorities.',
    path: '/services/artificial-intelligence/enterprise-ai-strategy',
  }),
  enterpriseAiPlatforms: buildMetadata({
    title: 'Enterprise AI Platform Services',
    description:
      'Design and implement secure, scalable enterprise AI platforms that connect data, models, applications and governance.',
    path: '/services/artificial-intelligence/enterprise-ai-platforms',
  }),
  intelligentAutomation: buildMetadata({
    title: 'Intelligent Automation Services',
    description:
      'Automate complex enterprise workflows with AI-enabled orchestration, human oversight and measurable operational outcomes.',
    path: '/services/artificial-intelligence/intelligent-automation',
  }),
  sapS4Hana: buildMetadata({
    title: 'SAP S/4HANA Implementation & Migration',
    description:
      'Plan, migrate and evolve your SAP S/4HANA environment with TRYVION transformation, cloud and clean-core expertise.',
    path: '/services/applications/sap-s4hana',
  }),
  talent: buildMetadata({
    title: 'Enterprise Technology Talent Solutions',
    description:
      'Build transformation-ready teams with TRYVION SAP talent, permanent hiring and executive search solutions.',
    path: '/services/talent',
  }),
  sapTalentSolutions: buildMetadata({
    title: 'SAP Talent Solutions',
    description:
      'Access specialist SAP talent for transformation programmes, delivery teams and long-term enterprise capability building.',
    path: '/services/talent/sap-talent-solutions',
  }),
  permanentHiring: buildMetadata({
    title: 'Permanent Technology Hiring Solutions',
    description:
      'Build permanent enterprise technology teams with specialist hiring support across SAP, AI, cloud and digital transformation.',
    path: '/services/talent/permanent-hiring',
  }),
  executiveSearch: buildMetadata({
    title: 'Technology Executive Search',
    description:
      'Find transformation-ready technology leaders through TRYVION executive search for enterprise, SAP, AI and digital roles.',
    path: '/services/talent/executive-search',
  }),
  academy: buildMetadata({
    title: 'Enterprise Learning & Academy Services',
    description:
      'Build the skills transformation demands with TRYVION enterprise learning, capability development and academy services.',
    path: '/services/academy',
  }),
  learningPlatform: buildMetadata({
    title: 'Enterprise Learning Platform',
    description:
      'Deliver scalable enterprise learning experiences with TRYVION’s learning platform for workforce capability and transformation adoption.',
    path: '/services/academy/learning-platform',
  }),
  operate: buildMetadata({
    title: 'Managed Enterprise Operations Services',
    description:
      'Stabilise, automate and continuously improve critical SAP, cloud and application operations with TRYVION Operate.',
    path: '/services/operate',
  }),
  sapRunInTheNew: buildMetadata({
    title: 'SAP Run in the New Managed Services',
    description:
      'Move beyond traditional SAP support with proactive operations, automation and continuous improvement through TRYVION Operate.',
    path: '/services/operate/sap-run-in-the-new',
  }),
} satisfies Record<string, Metadata>;
