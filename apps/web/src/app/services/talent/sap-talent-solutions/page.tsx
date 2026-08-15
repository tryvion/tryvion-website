import type { Metadata } from 'next'
import { ServiceDetailLayout } from '@/components/layout/ServiceDetailLayout'

export const metadata: Metadata = {
  title: 'TRYVION TALENT — Specialist Talent, Stronger Teams',
  description:
    'Finding the right talent is no longer just about filling roles. TRYVION helps organisations access specialist SAP professionals, permanent talent and senior leadership aligned to their business, technology and transformation needs.',
  alternates: { canonical: 'https://thetryvion.com/services/talent-solutions' },
}

const BREADCRUMBS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'TRYVION TALENT', href: '/services/talent-solutions' },
]

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
)

export default function TalentSolutionsPage() {
  return (
    <ServiceDetailLayout
      breadcrumbs={BREADCRUMBS}
      eyebrow="TRYVION TALENT"
      title="Specialist Talent. Stronger Teams. Faster Growth."
      description="Finding the right talent is no longer just about filling roles. TRYVION helps organisations access specialist SAP professionals, permanent talent and senior leadership — combining domain expertise, focused search and a strong understanding of enterprise transformation to help clients hire with greater speed, precision and confidence."
      overviewTitle="Why specialist talent matters"
      overviewParagraphs={[
        'SAP programs require the right expertise at the right time. Permanent hiring requires quality over volume. Leadership appointments can define the success of a transformation. TRYVION Talent connects organisations with the people who can make the difference.',
        'Our talent solutions combine deep domain expertise with focused search. We understand SAP roles beyond job titles — matching clients with talent based on skills, experience, solution knowledge and transformation relevance. For permanent hiring, we focus on presenting candidates who are genuinely aligned to the role rather than generating large, unfocused shortlists.',
        'Through TRYVION\'s integrated ecosystem, talent is connected to transformation and learning — allowing professionals who join TRYVION\'s network to continue growing through TRYVION Academy\'s SkillVerse platform while organisations get access to talent that is continuously developing.',
      ]}
      stats={[
        { value: 'SAP Talent',     label: 'Specialists across S/4HANA, SuccessFactors, BTP, Ariba and more' },
        { value: 'Permanent',      label: 'Focused technology and transformation hiring' },
        { value: 'Executive',      label: 'Search for CIO, CTO and transformation leadership roles' },
        { value: 'Global',         label: 'Reach across enterprise technology markets' },
      ]}
      certifications={[
        'SAP Talent Network',
        'Enterprise Technology',
        'AI & Data Specialists',
        'Cloud & Integration',
        'Program Leadership',
        'Executive Search',
      ]}
      capabilities={[
        {
          title: 'SAP Talent Solutions',
          description: 'Connect with experienced SAP professionals across transformation, implementation, support and innovation programs. Talent areas: SAP S/4HANA, SuccessFactors, Ariba, BTP, Integration, Data & Analytics, Business AI & Joule, Finance, Supply Chain, Procurement and HR roles. Contract and project-based specialists, niche SAP skill sourcing, and transformation team augmentation.',
          icon: icon('M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375'),
        },
        {
          title: 'Permanent Hiring',
          description: 'Support organisations in hiring permanent professionals across technology, consulting and business transformation. Our approach: Understand the role and business context → Focused sourcing → Capability assessment → Shortlist qualified candidates → Support through offer and onboarding. Quality over volume — candidates genuinely aligned to the role and the organisation\'s long-term ambitions.',
          icon: icon('M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'),
        },
        {
          title: 'Executive Search',
          description: 'Focused executive search for senior technology, consulting and transformation leadership. Leadership areas: CIO / CTO, SAP and ERP leadership, AI & Digital leadership, Transformation leadership, Enterprise Architecture, Delivery and Program leadership. We combine technology understanding, transformation experience and focused search to identify leaders who can deliver both strategic direction and execution.',
          icon: icon('M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'),
        },
      ]}
      approach={{
        title: 'Why TRYVION TALENT',
        steps: [
          { step: '01', title: 'Deep SAP Understanding', description: 'We understand SAP transformation roles, skills and delivery requirements — beyond job titles. Our domain-led approach matches clients with talent based on real solution knowledge and transformation relevance.' },
          { step: '02', title: 'Focused Talent Networks', description: 'Access specialist professionals across SAP, AI, Data, Cloud and enterprise technology through TRYVION\'s focused talent network — built around the skills organisations need most.' },
          { step: '03', title: 'Quality-Led Selection', description: 'We prioritise relevance, capability and fit over candidate volume. Every shortlist is built around genuine alignment to the role, not volume metrics.' },
          { step: '04', title: 'Flexible Talent Models', description: 'From project specialists to permanent hires and executive leadership — TRYVION TALENT supports the right model for your hiring need.' },
          { step: '05', title: 'Connected Ecosystem', description: 'TRYVION TALENT is part of the same ecosystem as TRYVION Transformation and TRYVION Academy — giving talent access to continuous learning and development alongside opportunities.' },
        ],
      }}
      relatedServices={[
        { title: 'TRYVION Academy', description: 'Candidates can develop and deepen skills through TRYVION SkillVerse — our global enterprise technology learning platform.', href: '/get-started', accent: 'violet' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 013.741-3.342" /></svg> },
        { title: 'TRYVION APPLICATIONS', description: 'SAP transformation programs that require the specialist talent TRYVION places.', href: '/services/sap', accent: 'blue' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg> },
        { title: 'Careers at TRYVION', description: 'Join TRYVION at a stage where you can do more than step into an established role — help shape what it becomes.', href: '/careers', accent: 'teal' as const, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg> },
      ]}
      ctaVariant="ink"
      ctaTitle="Find better talent. Build stronger teams."
      ctaDescription="Whether you need a specialist for a critical SAP program, permanent talent to build capability, or a leader to shape your next transformation — TRYVION helps you find the people who can make the difference."
    />
  )
}
