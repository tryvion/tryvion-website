import type { Metadata } from 'next'
import { ServiceDetailLayout } from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'Talent & Workforce Solutions',
  description:
    'Specialised enterprise technology talent on demand — staff augmentation, embedded teams, and project staffing with vetted professionals placed within 48 hours.',
  alternates: { canonical: 'https://thetryvion.com/services/talent' },
}

const BREADCRUMBS = [
  { label: 'Home',                 href: '/' },
  { label: 'Services',             href: '/services' },
  { label: 'Talent & Workforce',   href: '/services/talent' },
]

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

export default function TalentPage() {
  return (
    <ServiceDetailLayout
      breadcrumbs={BREADCRUMBS}
      eyebrow="Talent & Workforce"
      title="Enterprise technology talent, on demand"
      description="Access specialist SAP and enterprise technology professionals across S/4HANA, SuccessFactors, BTP, AI, cloud and digital engineering — available for staff augmentation, embedded teams, or complete project delivery."
      overviewTitle="The right expertise, placed within 48 hours"
      overviewParagraphs={[
        'Enterprise technology programmes regularly face one of two talent problems: either you cannot find the specialists you need, or the ones you find are not quite right for the complexity of your environment. Generic staffing agencies cannot solve either problem — they optimise for volume, not fit.',
        'TRYVION\'s talent practice is different because it is built on top of our consulting practice. The professionals we place are vetted against real enterprise standards — not just certifications, but practical experience with the complexity and constraints of large organisations.',
        'We offer three engagement models depending on your need: individual specialist augmentation for targeted skill gaps, embedded teams for sustained delivery, and complete project teams for defined-scope programmes. All models come with TRYVION quality assurance, continuity guarantees, and performance management.',
      ]}
      stats={[
        { value: 'SAP Talent',   label: 'Specialists across S/4HANA, SuccessFactors, BTP, Ariba and more' },
        { value: 'Permanent',    label: 'Focused technology and transformation permanent hiring' },
        { value: 'Executive',    label: 'Search for CIO, CTO and transformation leadership roles' },
        { value: 'Global',       label: 'Reach across enterprise technology markets' },
      ]}
      certifications={[
        'SAP Certified',
        'AWS Certified',
        'Google Cloud Certified',
        'Azure Certified',
        'PMP / Prince2',
        'CIPD Affiliate',
      ]}
      capabilities={[
        {
          title:       'Staff Augmentation',
          description: 'Individual specialists embedded in your team — SAP consultants, data engineers, cloud architects, DevOps engineers, programme managers, and more — placed within 48 hours.',
          icon:        icon('M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'),
        },
        {
          title:       'Embedded Teams',
          description: 'Pre-formed, high-performing teams that integrate with your organisation for sustained delivery. Team lead, engineers, QA, and business analyst — hired and managed as one unit.',
          icon:        icon('M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'),
        },
        {
          title:       'Project Staffing',
          description: 'Complete teams for defined-scope programmes — requirements gathering through delivery. Fixed-price or time-and-materials, with TRYVION programme governance and quality assurance.',
          icon:        icon('M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'),
        },
        {
          title:       'Technical Assessment & Vetting',
          description: 'Every TRYVION consultant completes our 4-stage vetting process: CV screening, technical assessment, panel interview, and reference verification against enterprise-grade standards.',
          icon:        icon('M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'),
        },
        {
          title:       'Workforce Planning & Advisory',
          description: 'Skills gap analysis, capability frameworks, build-versus-buy analysis, and organisational design for enterprise technology functions undergoing rapid change.',
          icon:        icon('M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6'),
        },
        {
          title:       'Continuity & Performance Management',
          description: 'Replacement guarantee within 5 business days if a placement does not work out. Regular performance reviews, utilisation reporting, and proactive skills mapping.',
          icon:        icon('M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'),
        },
      ]}
      relatedServices={[
        {
          title:       'Digital Engineering',
          description: 'Need a complete engineering team? We deliver product teams under TRYVION programme governance.',
          href:        '/services/digital-engineering',
          accent:      'amber',
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
        },
        {
          title:       'SAP Services',
          description: 'SAP specialist talent for specific programme phases or ongoing BAU support.',
          href:        '/services/sap',
          accent:      'blue',
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>,
        },
        {
          title:       'Managed Services',
          description: 'Move from augmented staffing to a fully outcome-based managed operations model.',
          href:        '/services/managed-services',
          accent:      'violet',
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
        },
      ]}
      ctaVariant="momentum"
      ctaTitle="Find the specialists you need"
      ctaDescription="Tell us the skills, experience level, and timeline you need. We will have candidates in front of you within 48 hours."
    />
  )
}
