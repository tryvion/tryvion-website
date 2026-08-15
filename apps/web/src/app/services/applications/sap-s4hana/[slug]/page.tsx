import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetailLayout } from '@/components/layout/ServiceDetailLayout'

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

const PAGES = {
  s4hana: {
    meta: { title: 'SAP S/4HANA — Public & Private Edition', description: 'Cloud-first SAP S/4HANA transformation — Public Edition and Private Edition. TRYVION applies SAP Activate, Cloud ALM and clean-core principles to every programme.' },
    eyebrow: 'SAP S/4HANA',
    title: 'Cloud-first S/4HANA transformation',
    description: 'Move to SAP S/4HANA with a structured, business-led approach. Whether Public Edition for standardised cloud-first ERP or Private Edition for complex enterprise requirements — TRYVION helps you choose confidently and deliver with precision.',
    overviewTitle: 'Two paths. One rigorous approach.',
    overviewParagraphs: [
      'SAP S/4HANA Cloud has fundamentally changed what ERP transformation looks like. Cloud ERP requires a different mindset: adopting standard processes, maintaining a clean core, and preparing your organisation for continuous innovation alongside continuous updates.',
      'TRYVION supports both SAP S/4HANA Cloud editions — Public and Private — bringing the same rigour to every path. Public Edition offers faster time to value through standardised, cloud-native ERP. Private Edition provides the enterprise depth required for complex, differentiated business processes and regulated environments.',
      'Our approach is structured around SAP Activate and Cloud ALM — combining predefined best practices from SAP Signavio Process Navigator with clean-core governance, modern integration, and business-led solution design throughout the programme.',
    ],
    stats: [
      { value: 'Public Edition',  label: 'Standardised cloud-first ERP — faster time to value' },
      { value: 'Private Edition', label: 'Enterprise depth — flexibility for complex requirements' },
      { value: 'SAP Activate',    label: 'Structured, governed delivery methodology' },
      { value: 'Clean Core',      label: 'Protecting upgradeability from day one' },
    ],
    certifications: ['SAP Partner', 'SAP Activate Aligned', 'SAP Cloud ALM', 'RISE with SAP'],
    capabilities: [
      { title: 'Greenfield Implementation', description: 'Clean-sheet S/4HANA build using SAP Best Practices and TRYVION process templates. Ideal for organisations wanting to eliminate legacy technical debt and re-engineer core processes.', icon: icon('M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18') },
      { title: 'Brownfield Migration', description: 'In-place system conversion preserving existing configurations and historical data. Faster and lower risk than greenfield for mature SAP estates with well-maintained configurations.', icon: icon('M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5') },
      { title: 'Selective Data Transition', description: 'Hybrid approach combining greenfield process redesign with selective migration of relevant historical data. Maximum process improvement while retaining critical business history.', icon: icon('M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z') },
      { title: 'RISE with SAP', description: 'End-to-end managed cloud transformation packaging S/4HANA Cloud Private Edition, BTP, and SAP Business Network. TRYVION is a certified RISE implementation partner.', icon: icon('M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z') },
      { title: 'Custom Code Remediation', description: 'ABAP custom code scanning, automated remediation, and clean-core compliance validation — reducing technical debt before migration and enabling faster future upgrades.', icon: icon('M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5') },
      { title: 'Hypercare & Stabilisation', description: 'Dedicated on-site hypercare team for the first 4–8 weeks post go-live, resolving issues in hours. Structured knowledge transfer and steady-state handover.', icon: icon('M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z') },
    ],
    approach: {
      title: 'Our S/4HANA delivery methodology',
      steps: [
        { step: '01', title: 'Assess & Roadmap', description: 'Landscape analysis, custom code scan, data quality assessment, business case, and phased roadmap aligned to priorities and budget.' },
        { step: '02', title: 'Design & Validate', description: 'Fit-gap workshops, solution blueprint, data migration strategy, and working prototype to validate the approach before full build commitment.' },
        { step: '03', title: 'Build & Test', description: 'Sprint-based build with continuous integration, automated regression testing, data migration rehearsals, and cutover dry-runs.' },
        { step: '04', title: 'Go-Live', description: 'Controlled go-live with full monitoring, rollback capability, and an on-site hypercare team resolving issues in real time.' },
        { step: '05', title: 'Optimise', description: 'Post-stabilisation optimisation, AMS transition, and quarterly roadmap reviews to keep your S/4HANA investment delivering value.' },
      ],
    },
    relatedServices: [
      { title: 'SAP BTP Development', description: 'Build clean-core compliant extensions and integrations on SAP Business Technology Platform.', href: '/services/sap/btp', accent: 'violet' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
      { title: 'Managed Services', description: 'Outcome-based AMS and SAP operations post go-live.', href: '/services/managed-services', accent: 'teal' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
      { title: 'Cloud Transformation', description: 'Move your SAP landscape to hyperscaler or RISE with SAP cloud hosting.', href: '/services/cloud', accent: 'blue' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg> },
    ],
    ctaVariant: 'ink' as const,
    ctaTitle: 'Choose your path to SAP S/4HANA',
    ctaDescription: 'Your transformation does not begin with technology. It begins with choosing the future you want to create. Talk to our SAP team about the right path for your organisation.',
  },
  rise: {
    meta: { title: 'RISE with SAP — TRYVION', description: 'RISE with SAP packages S/4HANA Cloud Private Edition, BTP, and SAP Business Network into a single managed subscription. TRYVION delivers the transformation wrapped around it.' },
    eyebrow: 'RISE with SAP',
    title: 'The transformation behind RISE with SAP',
    description: 'RISE with SAP packages S/4HANA Cloud, BTP, and SAP Business Network into a single subscription. The technology is straightforward — the transformation around it is what determines success. TRYVION delivers the programme that makes RISE work.',
    overviewTitle: 'RISE is a platform. Transformation is the programme.',
    overviewParagraphs: [
      'RISE with SAP is SAP\'s flagship offering for cloud transformation — combining S/4HANA Cloud Private Edition, SAP Business Technology Platform, SAP Business Network, and cloud hosting into a single managed subscription. It simplifies the commercial model and accelerates the path to cloud ERP.',
      'The critical success factor for RISE is not the technology — it is the transformation programme wrapped around it. Business process redesign, clean-core governance, data migration, integration architecture, and change management are what determine whether RISE delivers its potential.',
      'TRYVION supports organisations across the RISE lifecycle: from business case development and commercial navigation, through full transformation programme delivery with SAP Activate and Cloud ALM, to BTP extension development and ongoing managed operations post go-live.',
    ],
    stats: [
      { value: 'ASSESS', label: 'Business case, readiness, commercial evaluation' },
      { value: 'DESIGN', label: 'Solution blueprint, process design, integration architecture' },
      { value: 'BUILD',  label: 'SAP Activate-aligned implementation and testing' },
      { value: 'OPERATE', label: 'TRYVION OPERATE managed services post go-live' },
    ],
    certifications: ['SAP Partner', 'RISE with SAP', 'SAP Activate Aligned', 'SAP Cloud ALM'],
    capabilities: [
      { title: 'RISE Business Case & Commercial', description: 'Independent TCO modelling, RISE commercial negotiation support, and contract review to ensure you get maximum value from your SAP subscription.', icon: icon('M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z') },
      { title: 'RISE Transformation Programme', description: 'Full programme delivery from kick-off to hypercare — project management, solution design, build, testing, data migration, change management, and go-live.', icon: icon('M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3') },
      { title: 'BTP Integration & Extensions', description: 'Clean-core compliant BTP extensions, API integrations, and custom applications that survive S/4HANA upgrades and operate within the RISE subscription.', icon: icon('M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244') },
      { title: 'SAP Business Network', description: 'Ariba, Fieldglass, and Concur integration as part of the RISE subscription — supplier connectivity, contingent workforce, and travel & expense management.', icon: icon('M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5') },
      { title: 'Managed RISE Operations', description: 'Ongoing managed operations for your RISE environment — system monitoring, patch management, performance optimisation, and functional application support.', icon: icon('M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z') },
      { title: 'Change Management & Adoption', description: 'Structured change management methodology covering stakeholder engagement, training, communications, and adoption measurement — the human side of RISE success.', icon: icon('M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z') },
    ],
    relatedServices: [
      { title: 'S/4HANA Migration', description: 'The technical foundation of every RISE programme — on-premise to cloud.', href: '/services/sap/s4hana', accent: 'blue' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg> },
      { title: 'AI & Data Analytics', description: 'Unlock the data inside your RISE estate with AI-powered analytics.', href: '/services/ai-data', accent: 'violet' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg> },
      { title: 'Managed Services', description: 'Post-RISE steady-state operations with guaranteed SLAs.', href: '/services/managed-services', accent: 'teal' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
    ],
    ctaVariant: 'ink' as const,
    ctaTitle: 'Start your RISE journey',
    ctaDescription: 'Let us model the business case and map your path to RISE with SAP.',
  },
  btp: {
    meta: { title: 'SAP Business Technology Platform — TRYVION', description: 'SAP BTP extensions, integrations, AI services and SAP Build. TRYVION delivers clean-core compliant BTP development that extends your SAP investment without technical debt.' },
    eyebrow: 'SAP BTP',
    title: 'Connect, extend and innovate with SAP BTP',
    description: 'SAP Business Technology Platform is the foundation for connecting applications, extending S/4HANA with clean-core compliant capabilities, and unlocking AI innovation. TRYVION helps organisations harness BTP as the digital foundation for the intelligent enterprise.',
    overviewTitle: 'BTP — the clean-core foundation for innovation',
    overviewParagraphs: [
      'Modern enterprises need the ability to connect applications, extend processes, unlock data and introduce AI-driven innovation — without adding complexity to the SAP core. SAP Business Technology Platform is the strategic answer: a unified platform for integration, extension, data and AI that keeps S/4HANA clean and upgrade-safe.',
      'TRYVION\'s BTP practice combines SAP platform architecture expertise with functional knowledge of the business processes BTP serves. We design extensions that are technically sound, commercially justified, and maintainable — ensuring every BTP development is aligned with SAP\'s clean-core architectural direction.',
      'From SAP Integration Suite and Cloud Integration through to SAP Build, AI Core, and SAP Datasphere — TRYVION helps organisations build a BTP capability that scales with the business and survives each S/4HANA release.',
    ],
    stats: [
      { value: 'Integration Suite', label: 'API management, cloud integration, event mesh' },
      { value: 'SAP Build',         label: 'Low-code apps, process automation, work zone' },
      { value: 'AI Core & Joule',   label: 'AI Foundation, custom AI, intelligent agents' },
      { value: 'SAP Datasphere',    label: 'Data fabric, semantic layer, governed access' },
    ],
    certifications: ['SAP Partner', 'SAP BTP Certified', 'SAP Integration Suite', 'SAP Build'],
    capabilities: [
      { title: 'CAP Application Development', description: 'Cloud Application Programming model development for robust, scalable BTP applications — following SAP\'s recommended development patterns for long-term maintainability.', icon: icon('M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5') },
      { title: 'Integration Suite', description: 'Enterprise integration using SAP Integration Suite — API Management, Cloud Integration, Event Mesh, and Trading Partner Management for complex multi-system landscapes.', icon: icon('M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244') },
      { title: 'AI & Machine Learning Services', description: 'BTP AI Core and AI Services integration — intelligent document processing, predictive analytics, and GenAI capabilities embedded in your SAP processes.', icon: icon('M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z') },
      { title: 'SAP Build & Low-Code', description: 'Rapid application development using SAP Build Apps, SAP Build Process Automation, and SAP Build Work Zone — empowering citizen developers with proper governance.', icon: icon('M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z') },
      { title: 'Analytics & Data Intelligence', description: 'SAP Analytics Cloud, SAP Datasphere, and BTP data services — turning SAP transactional data into business intelligence and real-time decision support.', icon: icon('M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6') },
      { title: 'BTP Architecture & Governance', description: 'BTP landscape design, global account structure, CPEA commercial optimisation, developer onboarding, and centre-of-excellence setup for organisations scaling BTP adoption.', icon: icon('M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21') },
    ],
    relatedServices: [
      { title: 'S/4HANA Migration', description: 'The core platform that BTP extends — migrate first, then extend clean.', href: '/services/sap/s4hana', accent: 'blue' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg> },
      { title: 'AI & Data Analytics', description: 'Combine BTP with an enterprise data strategy for maximum intelligence.', href: '/services/ai-data', accent: 'violet' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg> },
      { title: 'Digital Engineering', description: 'BTP apps that need to connect to non-SAP digital platforms.', href: '/services/digital-engineering', accent: 'amber' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
    ],
    ctaVariant: 'ink' as const,
    ctaTitle: 'Extend your SAP investment',
    ctaDescription: 'Whether you need a single integration or an enterprise BTP strategy, we can help.',
  },
  analytics: {
    meta: { title: 'SAP Analytics Cloud & Datasphere — TRYVION', description: 'SAP Analytics Cloud — planning, BI, and predictive analytics integrated with SAP S/4HANA and Datasphere. TRYVION delivers business-led analytics that people trust and use.' },
    eyebrow: 'SAP Analytics',
    title: 'From SAP data to business intelligence',
    description: 'SAP Analytics Cloud consolidates planning, business intelligence, and predictive analytics into a single platform connected to your SAP estate. TRYVION delivers analytics that answers the questions that matter — and that people actually use.',
    overviewTitle: 'Analytics that starts with the business question',
    overviewParagraphs: [
      'SAP Analytics Cloud is the most powerful analytics platform available for organisations invested in SAP — combining planning, BI, and predictive analytics in a single cloud platform, deeply integrated with S/4HANA and Datasphere. When properly implemented, it transforms how leaders make decisions.',
      'TRYVION\'s approach starts with the business question: what decisions do leaders need to make, and what data do they need to make them? We work backwards from those questions to design analytics solutions that are accurate, trusted, and genuinely used.',
      'We combine SAP Analytics Cloud and Datasphere expertise with functional knowledge of finance, supply chain, sales and HR processes — ensuring the analytics layer reflects how your business actually operates, not just how the data is structured.',
    ],
    stats: [
      { value: 'SAP Analytics Cloud', label: 'Planning, BI and predictive analytics in one platform' },
      { value: 'SAP Datasphere',      label: 'Unified enterprise data fabric across SAP and non-SAP' },
      { value: 'Finance & Planning',  label: 'FP&A, driver-based budgeting, scenario modelling' },
      { value: 'Embedded AI',         label: 'Smart insights, anomaly detection, predictive analytics' },
    ],
    certifications: ['SAP Partner', 'SAP Analytics Cloud', 'SAP Datasphere', 'SAP BTP'],
    capabilities: [
      { title: 'Financial Planning & Analysis', description: 'Driver-based budgeting, rolling forecasts, scenario planning, and variance analysis integrated with S/4HANA actuals — replacing spreadsheet-based FP&A processes.', icon: icon('M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z') },
      { title: 'Supply Chain Analytics', description: 'Demand sensing, inventory optimisation, supplier performance, and end-to-end supply chain visibility dashboards connected to SAP EWM, TM, and IBP data.', icon: icon('M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12') },
      { title: 'HR & Workforce Analytics', description: 'Headcount planning, attrition prediction, talent pipeline visibility, and compensation analytics connected to SuccessFactors and S/4HANA HCM.', icon: icon('M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z') },
      { title: 'Executive Dashboards & Storytelling', description: 'Board-ready dashboards and digital boardbooks that combine financial and operational KPIs with narrative context — designed for executives, not just analysts.', icon: icon('M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6') },
      { title: 'SAP Datasphere', description: 'Enterprise data fabric connecting SAP and non-SAP sources — providing a unified, governed data layer for analytics across the entire enterprise technology estate.', icon: icon('M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375') },
      { title: 'Predictive & Machine Learning', description: 'Embedded predictive analytics in SAC — churn prediction, demand forecasting, anomaly detection, and smart insights that surface automatically without manual analysis.', icon: icon('M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z') },
    ],
    relatedServices: [
      { title: 'AI & Data Analytics', description: 'Extend beyond SAP with a full enterprise data strategy and GenAI.', href: '/services/ai-data', accent: 'violet' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg> },
      { title: 'SAP BTP', description: 'Build advanced analytics applications on BTP with embedded AI.', href: '/services/sap/btp', accent: 'blue' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
      { title: 'S/4HANA Migration', description: 'The clean data foundation that makes enterprise analytics possible.', href: '/services/sap/s4hana', accent: 'teal' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg> },
    ],
    ctaVariant: 'ink' as const,
    ctaTitle: 'Unlock the value in your SAP data',
    ctaDescription: 'Whether you need a single dashboard or an enterprise analytics platform, we can help.',
  },
}

type Slug = keyof typeof PAGES

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = PAGES[slug as Slug]
  if (!page) return {}
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `https://tryvion.com/services/sap/${slug}` },
  }
}

export default async function SapSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = PAGES[slug as Slug]
  if (!page) notFound()

  const breadcrumbs = [
    { label: 'Home',         href: '/' },
    { label: 'Services',     href: '/services' },
    { label: 'SAP Services', href: '/services/sap' },
    { label: page.eyebrow,   href: `/services/sap/${slug}` },
  ]

  return (
    <ServiceDetailLayout
      breadcrumbs={breadcrumbs}
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      overviewTitle={page.overviewTitle}
      overviewParagraphs={page.overviewParagraphs}
      stats={page.stats}
      certifications={page.certifications}
      capabilities={page.capabilities}
      approach={'approach' in page ? page.approach : undefined}
      relatedServices={page.relatedServices}
      ctaVariant={page.ctaVariant}
      ctaTitle={page.ctaTitle}
      ctaDescription={page.ctaDescription}
      ctaPrimaryLabel="Get Started"
      ctaSecondaryLabel="Contact Us"
    />
  )
}
