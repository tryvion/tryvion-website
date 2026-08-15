import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Insight Topics',
  description: 'Explore TRYVION\'s research and perspectives by topic — SAP, AI & Data, Cloud, Digital Engineering, Talent, and more.',
  alternates: { canonical: 'https://tryvion.com/insights/topics' },
}

const TOPICS = [
  {
    slug: 'sap',
    label: 'SAP & ERP',
    accent: '#22D3EE',
    description: 'End-to-end SAP transformation — from S/4HANA migration strategy to RISE with SAP, BTP, and intelligent enterprise design.',
    articleCount: 14,
    highlights: [
      { title: 'S/4HANA Migration: Five Decisions That Determine Success', href: '/insights/s4hana-migration-five-decisions', type: 'Article' },
      { title: 'The 10 Hidden Risks in SAP S/4HANA Migration', href: '/insights/whitepapers/sap-s4hana-migration-risks', type: 'Whitepaper' },
      { title: 'How we reduced SAP TCO by 38% for a global manufacturer', href: '/insights/case-studies/sap-tco-reduction', type: 'Case Study' },
    ],
  },
  {
    slug: 'ai-data',
    label: 'AI & Data',
    accent: '#1458F2',
    description: 'Practical perspectives on enterprise AI deployment, data platform engineering, and the governance frameworks that make AI scale.',
    articleCount: 18,
    highlights: [
      { title: 'The 2025 Enterprise AI Readiness Report', href: '/insights/2025-enterprise-ai-readiness-report', type: 'Research' },
      { title: 'Agentic AI in the Enterprise: Separating Hype from Readiness', href: '/insights/agentic-ai-enterprise-readiness', type: 'Article' },
      { title: 'Why most enterprise GenAI initiatives stall before production', href: '/insights/blog/genai-enterprise-production', type: 'Blog' },
    ],
  },
  {
    slug: 'cloud',
    label: 'Cloud Strategy',
    accent: '#7C3AED',
    description: 'Cloud migration, FinOps, cloud-native architecture, and the operational models that sustain enterprise cloud programmes.',
    articleCount: 11,
    highlights: [
      { title: 'FinOps at Scale: Reducing Cloud Waste by 40%', href: '/insights/finops-at-scale', type: 'Article' },
      { title: 'FinOps at Enterprise Scale: A Practitioner\'s Guide', href: '/insights/whitepapers/cloud-finops-enterprise-guide', type: 'Whitepaper' },
      { title: 'FinOps is mostly a cultural problem dressed up as a technical one', href: '/insights/blog/finops-cultural-problem', type: 'Blog' },
    ],
  },
  {
    slug: 'digital-engineering',
    label: 'Digital Engineering',
    accent: '#34D399',
    description: 'Platform engineering, DevSecOps practices, API strategy, and the software delivery discipline that enables enterprise agility.',
    articleCount: 8,
    highlights: [
      { title: 'Digital transformation for a global wealth manager', href: '/insights/case-studies/digital-engineering-wealth', type: 'Case Study' },
      { title: 'The five cloud migration mistakes we see in every enterprise', href: '/insights/blog/cloud-migration-mistakes', type: 'Blog' },
      { title: 'DORA is reshaping cloud strategy in European financial services', href: '/insights/blog/dora-cloud-strategy', type: 'Blog' },
    ],
  },
  {
    slug: 'talent',
    label: 'Talent & Workforce',
    accent: '#F59E0B',
    description: 'Enterprise technology talent market analysis, workforce planning frameworks, and the strategies that keep programmes fully resourced.',
    articleCount: 9,
    highlights: [
      { title: 'Enterprise Technology Talent: The 2026 Outlook', href: '/insights/whitepapers/enterprise-talent-strategy-2026', type: 'Whitepaper' },
      { title: 'The SAP talent shortage is structural — and it is getting worse', href: '/insights/blog/talent-shortage-sap', type: 'Blog' },
      { title: 'Energy company talent transformation', href: '/insights/case-studies/talent-transformation-energy', type: 'Case Study' },
    ],
  },
  {
    slug: 'financial-services',
    label: 'Financial Services',
    accent: '#EC4899',
    description: 'Regulation-aware technology strategy for banks, insurers, and wealth managers — from DORA and IFRS 17 to AI-powered client services.',
    articleCount: 12,
    highlights: [
      { title: 'Cloud in Regulated Financial Services: A Practical Framework', href: '/insights/whitepapers/regulated-cloud-financial-services', type: 'Whitepaper' },
      { title: 'Core banking modernisation for a tier-one bank', href: '/insights/case-studies/banking-core-modernisation', type: 'Case Study' },
      { title: 'RISE with SAP: what enterprise buyers are not being told', href: '/insights/blog/sap-rise-realities', type: 'Blog' },
    ],
  },
]

const TYPE_COLORS: Record<string, string> = {
  Article: '#1458F2',
  Research: '#1458F2',
  Whitepaper: '#22D3EE',
  'Case Study': '#34D399',
  Blog: '#7C3AED',
}

export default function TopicsPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>

      <section style={{ padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-100px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/insights" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem', textDecoration: 'none' }}>Insights</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600 }}>Topics</span>
        </div>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '50rem', position: 'relative' }}>
          Insights by{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            practice area
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative' }}>
          Browse TRYVION research, case studies, whitepapers, and practitioner perspectives organised by the domains our consultants work in every day.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {TOPICS.map((topic) => (
          <div key={topic.slug} style={{ border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ padding: '2.5rem 2.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '0.5625rem', height: '0.5625rem', borderRadius: '50%', background: topic.accent, flexShrink: 0 }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.015em' }}>{topic.label}</h2>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.07)', padding: '0.2rem 0.625rem', borderRadius: '999px' }}>{topic.articleCount} articles</span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: '52rem' }}>{topic.description}</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '2rem 2.5rem 2.5rem' }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Featured</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {topic.highlights.map((h) => (
                  <Link key={h.href} href={h.href} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', textDecoration: 'none', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: TYPE_COLORS[h.type] || '#1458F2', background: `${TYPE_COLORS[h.type] || '#1458F2'}14`, padding: '0.2rem 0.625rem', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '0.125rem' }}>{h.type}</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, fontWeight: 500, flex: 1 }}>{h.title}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '0.875rem', height: '0.875rem', flexShrink: 0, marginTop: '0.25rem', color: 'rgba(255,255,255,0.2)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Never miss an insight
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Subscribe to the TRYVION fortnightly briefing and receive curated insights from our practice leads.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/insights/subscribe" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Subscribe free
            </Link>
            <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              All insights
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
