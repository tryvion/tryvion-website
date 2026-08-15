import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const WHITEPAPERS = {
  'ai-readiness-index-2025': {
    title: 'The 2025 Enterprise AI Readiness Index',
    description: 'Survey of 500 enterprise leaders on AI maturity, investment priorities, and barriers to scale.',
    headline: 'The 2025 Enterprise AI Readiness Index',
    tag: 'AI & Data',
    date: 'March 2026',
    pages: 42,
    accent: '#1458F2',
    summary: 'TRYVION surveyed 500 enterprise technology and business leaders across 18 industries to assess AI readiness, identify capability gaps, and understand the investments that distinguish AI leaders from laggards. The findings reveal a polarising market: organisations that have established AI governance and data platforms are accelerating, while those that have not are falling further behind.',
    keyFindings: [
      'Only 12% of enterprises describe their AI capabilities as "production-scale" — defined as 3 or more AI systems running in production and generating measurable business value.',
      'Data quality is cited as the primary barrier to AI adoption by 68% of respondents — ahead of talent (54%), governance (41%), and budget (29%).',
      'Enterprises with a dedicated AI governance framework deploy AI use cases 3.2x faster than those without.',
      'The gap between AI leaders and laggards in financial services is wider than in any other sector — driven by regulatory constraints that force leaders to invest in governance infrastructure.',
      'GenAI adoption is accelerating but most implementations remain in pilot phase — only 8% of GenAI initiatives have moved to production.',
      '78% of enterprises plan to increase AI investment in the next 12 months, with data platform modernisation the top investment priority.',
    ],
    methodology: 'TRYVION conducted this research between October 2025 and January 2026 with 500 enterprise leaders across companies with >$500M annual revenue. Respondents were drawn from 18 industries across North America, Europe, and Asia Pacific. Research was conducted via online survey supplemented by 45 in-depth interviews.',
  },
  'cloud-finops-enterprise-guide': {
    title: 'FinOps at Enterprise Scale: A Practitioner\'s Guide',
    description: 'Comprehensive guide to implementing FinOps across large, complex organisations.',
    headline: 'FinOps at Enterprise Scale: A Practitioner\'s Guide',
    tag: 'Cloud',
    date: 'January 2026',
    pages: 38,
    accent: '#34D399',
    summary: 'Drawn from TRYVION\'s experience implementing FinOps programmes across enterprises spending $1M to $50M annually on cloud, this guide provides practitioners with a proven framework for achieving and sustaining cloud cost optimisation. It covers tooling selection, organisational design, chargeback model construction, and the cultural change management that makes financial discipline in engineering teams sustainable.',
    keyFindings: [
      'The average enterprise wastes 35% of its cloud spend — but the majority of waste can be eliminated within 90 days with the right tooling and governance.',
      'FinOps programmes that establish chargeback accountability in the first 60 days achieve 40% higher sustained savings than those that delay this step.',
      'Reserved Instance and Savings Plan optimisation alone delivers 20-25% cost reduction for most enterprises — without any architectural changes.',
      'CloudHealth, Apptio, and AWS Cost Explorer are the most commonly selected tools — but tooling is less important than the processes and ownership models that surround them.',
      'Engineering-team ownership of cloud costs — supported by real-time visibility dashboards — is the single most predictive indicator of long-term FinOps success.',
    ],
    methodology: 'This guide draws on data from 85 FinOps programme implementations across TRYVION clients between 2022 and 2025, supplemented by analysis of industry benchmarking data from the FinOps Foundation.',
  },
  'sap-s4hana-migration-risks': {
    title: 'The 10 Hidden Risks in SAP S/4HANA Migration',
    description: 'Analysis of 200+ S/4HANA migration programmes to identify the failure modes and design decisions that determine success.',
    headline: 'The 10 Hidden Risks in SAP S/4HANA Migration',
    tag: 'SAP',
    date: 'November 2025',
    pages: 29,
    accent: '#22D3EE',
    summary: 'SAP S/4HANA migration has one of the highest failure rates of any enterprise technology programme category. TRYVION has analysed over 200 migration programmes — both our own engagements and publicly reported case studies — to identify the 10 risk factors most strongly correlated with programme failure, cost overruns, and delayed go-live.',
    keyFindings: [
      'Custom code volume is the strongest predictor of migration complexity — yet only 31% of programmes conduct rigorous custom code analysis before programme start.',
      'Data quality issues discovered mid-programme are responsible for 28% of S/4HANA go-live delays — making data cleansing an investment, not a cost.',
      'Programmes that use a selective data transition (SDT) approach are 40% more likely to complete on schedule than system conversion approaches.',
      'Integration landscape complexity is systematically underestimated — the average enterprise has 180% more active integrations than their technical architecture documentation shows.',
      'Change management investment below 8% of total programme budget is strongly correlated with user adoption failures in the first 12 months post go-live.',
    ],
    methodology: 'TRYVION\'s SAP practice analysed 200+ S/4HANA migration programmes including 120 direct engagements and 80 publicly reported case studies between 2021 and 2025.',
  },
  'enterprise-talent-strategy-2026': {
    title: 'Enterprise Technology Talent: The 2026 Outlook',
    description: 'Analysis of enterprise technology talent supply, demand, and pricing across SAP, cloud, AI, and digital engineering.',
    headline: 'Enterprise Technology Talent: The 2026 Outlook',
    tag: 'Talent',
    date: 'October 2025',
    pages: 24,
    accent: '#F59E0B',
    summary: 'TRYVION\'s annual talent market analysis covers supply, demand, day rates, and availability across SAP, cloud, AI/data, digital engineering, and programme management specialisms. The 2026 outlook identifies key talent shortages, market rate movements, and the workforce planning strategies that allow enterprise programmes to start on time and perform at full capacity.',
    keyFindings: [
      'SAP S/4HANA talent shortages have intensified for the third consecutive year — certified RISE specialists command a 45% premium over general SAP consultants.',
      'AI/ML engineering talent is growing rapidly in supply but enterprise-grade AI talent — practitioners with large-organisation deployment experience — remains critically scarce.',
      'Cloud architect day rates have plateaued after three years of rapid growth, as supply has caught up with demand in North America and Western Europe.',
      'Digital engineering talent is increasingly concentrating in specialist boutiques rather than large system integrators — with implications for how enterprises source teams.',
      'Remote and hybrid delivery models have permanently expanded the talent pool available to European enterprises — accessing talent in LATAM and Eastern Europe at competitive rates.',
    ],
    methodology: 'Analysis is based on TRYVION\'s enterprise technology talent data, market rate benchmarking across SAP, AI, cloud and digital engineering disciplines, and interviews with enterprise technology leaders on workforce planning intentions and talent sourcing challenges.',
  },
  'regulated-cloud-financial-services': {
    title: 'Cloud in Regulated Financial Services: A Practical Framework',
    description: 'How financial services organisations can navigate PRA, FCA, ECB, and DORA requirements when adopting cloud.',
    headline: 'Cloud in Regulated Financial Services: A Practical Framework',
    tag: 'Financial Services',
    date: 'September 2025',
    pages: 33,
    accent: '#7C3AED',
    summary: 'Cloud adoption in regulated financial services is constrained by a complex and evolving regulatory landscape — PRA, FCA, ECB, DORA, and national-level guidance that varies by market. This paper provides a practical framework for financial services technology leaders navigating regulatory engagement, cloud programme design, and ongoing compliance management.',
    keyFindings: [
      'DORA (Digital Operational Resilience Act), effective January 2025, has materially increased cloud governance requirements across EU financial services — but its implications for non-EU firms with EU operations are still being clarified.',
      'Early regulatory engagement — before programme start rather than during — reduces regulatory-driven programme delays by 60% on average.',
      'The PRA\'s SS2/21 guidance and the ECB\'s cloud outsourcing guidance are broadly aligned, making a unified regulatory approach viable for pan-European firms.',
      'Concentration risk management is the most commonly cited regulatory concern in cloud adoption decisions — and one of the least well-addressed in standard cloud governance frameworks.',
      'Firms that have structured their cloud architecture with regulatory resilience in mind from the start spend 30% less on compliance remediation than those that address it retrospectively.',
    ],
    methodology: 'Research draws on TRYVION\'s experience across 40+ regulated financial services cloud programmes, supplemented by analysis of regulatory publications from the PRA, FCA, ECB, EBA, and ESMA.',
  },
}

type Slug = keyof typeof WHITEPAPERS

export async function generateStaticParams() {
  return Object.keys(WHITEPAPERS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const wp = WHITEPAPERS[slug as Slug]
  if (!wp) return { title: 'Not Found' }
  return {
    title: wp.title,
    description: wp.description,
    alternates: { canonical: `https://tryvion.com/insights/whitepapers/${slug}` },
  }
}

export default async function WhitepaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const wp = WHITEPAPERS[slug as Slug]
  if (!wp) notFound()

  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/insights" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</Link>
          <span>/</span>
          <Link href="/insights/whitepapers" style={{ color: 'inherit', textDecoration: 'none' }}>Whitepapers</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{wp.tag}</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(4rem, 6vw, 5.5rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: `radial-gradient(ellipse, ${wp.accent}10 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.75rem', position: 'relative', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: wp.accent, background: `${wp.accent}14`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{wp.tag}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{wp.date}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{wp.pages} pages</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '52rem', position: 'relative', marginBottom: '2.5rem' }}>
          {wp.headline}
        </h1>
        <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', position: 'relative' }}>
          Download Report (PDF)
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '1rem', height: '1rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </Link>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 8rem)', maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        <div>
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: wp.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Overview</h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{wp.summary}</p>
        </div>

        <div>
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: wp.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Key Findings</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {wp.keyFindings.map((finding, i) => (
              <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', padding: '1.5rem' }}>
                <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: `${wp.accent}14`, border: `1px solid ${wp.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, color: wp.accent }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{finding}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: wp.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Methodology</h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>{wp.methodology}</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.05)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Apply these insights to your organisation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Speak with a TRYVION specialist to understand how these findings apply to your specific situation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Talk to a specialist
            </Link>
            <Link href="/insights/whitepapers" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              More whitepapers
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
