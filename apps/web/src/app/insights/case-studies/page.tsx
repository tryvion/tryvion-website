import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real enterprise transformation outcomes — how TRYVION clients achieved measurable results across SAP, cloud, AI, and digital engineering.',
  alternates: { canonical: 'https://tryvion.com/insights/case-studies' },
}

const CASE_STUDIES = [
  {
    slug: 'sap-tco-reduction',
    industry: 'Manufacturing',
    service: 'SAP S/4HANA',
    headline: 'Global manufacturer cuts SAP total cost of ownership by 38%',
    summary: 'A phased S/4HANA migration using TRYVION\'s Rise accelerator methodology, delivered in 14 months across 22 countries with zero production downtime.',
    metrics: [{ v: '38%', l: 'TCO reduction' }, { v: '14 months', l: 'Delivery timeline' }, { v: '22', l: 'Countries' }],
    accent: '#1458F2',
  },
  {
    slug: 'banking-core-modernisation',
    industry: 'Banking',
    service: 'Cloud Migration',
    headline: 'Tier-1 European bank migrates core banking platform to Azure',
    summary: 'A complex lift-and-modernise programme moving a 40-year-old core banking system to Azure — with zero data loss and regulatory approval maintained throughout.',
    metrics: [{ v: '99.99%', l: 'Uptime during cutover' }, { v: '65%', l: 'Infrastructure cost reduction' }, { v: '0', l: 'Regulatory breaches' }],
    accent: '#22D3EE',
  },
  {
    slug: 'ai-readiness-insurer',
    industry: 'Insurance',
    service: 'AI & Data',
    headline: 'UK insurer builds AI-driven claims triage reducing time to settlement by 40%',
    summary: 'End-to-end AI programme from data platform modernisation to production ML deployment, with a compliant governance framework approved by the FCA.',
    metrics: [{ v: '40%', l: 'Faster claims settlement' }, { v: '£18M', l: 'Annual savings' }, { v: 'FCA', l: 'Approved AI governance' }],
    accent: '#7C3AED',
  },
  {
    slug: 'cloud-finops-retail',
    industry: 'Retail',
    service: 'FinOps',
    headline: 'Global retailer eliminates £9M in annual cloud waste in 90 days',
    summary: 'A rapid FinOps assessment and remediation programme across AWS and Azure, delivering sustained savings through chargeback frameworks and engineering accountability.',
    metrics: [{ v: '£9M', l: 'Annual cloud waste eliminated' }, { v: '90 days', l: 'To first savings' }, { v: '32%', l: 'Total cloud cost reduction' }],
    accent: '#34D399',
  },
  {
    slug: 'talent-transformation-energy',
    industry: 'Energy',
    service: 'Talent Solutions',
    headline: 'Energy major scales SAP delivery capability with 80 embedded specialists',
    summary: 'Rapid talent augmentation for a 5-year SAP transformation programme, placing 80 vetted specialists within 6 weeks with a 96% performance retention rate.',
    metrics: [{ v: '80', l: 'Specialists placed' }, { v: '6 weeks', l: 'To full team deployment' }, { v: '96%', l: 'Performance retention' }],
    accent: '#F59E0B',
  },
  {
    slug: 'digital-engineering-wealth',
    industry: 'Wealth Management',
    service: 'Digital Engineering',
    headline: 'Wealth manager launches AI-powered adviser platform serving 12,000 clients',
    summary: 'A cloud-native adviser productivity platform built in 9 months, delivering AI-driven portfolio insights and client reporting — with 92% adviser adoption in year one.',
    metrics: [{ v: '9 months', l: 'Build to production' }, { v: '12,000', l: 'Clients served' }, { v: '92%', l: 'Adviser adoption rate' }],
    accent: '#EC4899',
  },
]

export default function CaseStudiesPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/insights" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem', textDecoration: 'none' }}>Insights</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600 }}>Case Studies</span>
        </div>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '44rem', position: 'relative' }}>
          Results that speak for{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            themselves
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative' }}>
          Detailed accounts of how TRYVION clients achieved measurable transformation outcomes — with the specifics that matter to enterprise decision-makers.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {CASE_STUDIES.map((cs) => (
          <Link key={cs.slug} href={`/insights/case-studies/${cs.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start', transition: 'border-color 0.2s, background 0.2s' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: cs.accent, background: `${cs.accent}14`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{cs.industry}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{cs.service}</span>
                </div>
                <h2 style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.875rem' }}>{cs.headline}</h2>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '1.75rem' }}>{cs.summary}</p>
                <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                  {cs.metrics.map((m) => (
                    <div key={m.l}>
                      <div style={{ fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.025em', color: cs.accent }}>{m.v}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.125rem' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, marginTop: '0.25rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: '1.375rem', height: '1.375rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
