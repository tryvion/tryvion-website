import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const PAGES = {
  banking: {
    title: 'Banking & Capital Markets',
    description: 'Core banking modernisation, regulatory compliance, and AI-driven intelligence for global banks and capital markets firms.',
    headline: 'Transform banking operations for the intelligent era',
    subtext: 'Regulatory pressure, margin compression, and digital-native competition are forcing banks to modernise at a pace legacy architectures cannot support.',
    accent: '#1458F2',
    challenges: ['Core banking modernisation', 'Regulatory compliance (Basel IV, DORA, BCBS 239)', 'Real-time payments infrastructure', 'AI-driven risk and fraud detection', 'Digital channel transformation', 'Cloud migration of critical workloads'],
    solutions: ['SAP S/4HANA for Finance', 'Data lakehouse and real-time analytics', 'API banking platform design', 'RegTech and compliance automation', 'Cloud-native application modernisation', 'AI model development and governance'],
    stats: [{ v: '40+', l: 'Banking clients globally' }, { v: '£2.4bn', l: 'Total assets under transformation' }, { v: '99.99%', l: 'Uptime SLA on critical systems' }, { v: '60%', l: 'Faster regulatory reporting' }],
  },
  insurance: {
    title: 'Insurance',
    description: 'Digital underwriting, claims automation, and regulatory transformation for life, P&C, and specialty insurers.',
    headline: 'Modernise insurance operations from policy to claim',
    subtext: 'Insurers are navigating IFRS 17, rising claims costs, and policyholder expectations that have been reset by consumer technology.',
    accent: '#22D3EE',
    challenges: ['IFRS 17 compliance', 'Claims process automation', 'Underwriting data quality', 'Legacy policy administration migration', 'Digital distribution channels', 'Actuarial data platform modernisation'],
    solutions: ['IFRS 17 implementation and reporting', 'Intelligent claims triage with AI', 'Underwriting analytics platforms', 'SAP Insurance core system deployment', 'Cloud-native policy admin migration', 'Customer data and CRM modernisation'],
    stats: [{ v: '25+', l: 'Insurance clients' }, { v: '35%', l: 'Reduction in claims processing time' }, { v: '18 mo', l: 'Average IFRS 17 delivery timeline' }, { v: '£800M+', l: 'Premiums on modernised platforms' }],
  },
  'wealth-management': {
    title: 'Wealth Management',
    description: 'Portfolio management platforms, client reporting modernisation, and AI advisory tools for wealth managers.',
    headline: 'Digital wealth management built for discerning clients',
    subtext: 'High-net-worth clients expect personalised, real-time visibility. Wealth managers need platforms that deliver that experience at scale.',
    accent: '#7C3AED',
    challenges: ['Legacy portfolio management system migration', 'Client reporting modernisation', 'Regulatory reporting (MiFID II, FATCA)', 'Adviser productivity tools', 'Digital onboarding and KYC', 'AI-driven portfolio insights'],
    solutions: ['Portfolio management platform migration', 'Client reporting and portal development', 'Compliance and regulatory automation', 'CRM and adviser tooling modernisation', 'AI-powered investment analytics', 'Wealth data platform engineering'],
    stats: [{ v: '$3.2T', l: 'AUM on modernised platforms' }, { v: '85%', l: 'Reduction in report generation time' }, { v: '2.4×', l: 'Adviser productivity improvement' }, { v: '100%', l: 'MiFID II compliance achieved' }],
  },
  manufacturing: {
    title: 'Manufacturing',
    description: 'Smart factory transformation, SAP S/4HANA deployment, and supply chain digitisation for global manufacturers.',
    headline: 'Manufacturing excellence in the intelligent industry era',
    subtext: 'Manufacturers face supply chain disruption, sustainability mandates, and the pressure to digitalise factory operations without interrupting production.',
    accent: '#F59E0B',
    challenges: ['SAP S/4HANA migration from legacy ECC', 'Supply chain visibility and resilience', 'Predictive maintenance and OEE optimisation', 'Sustainability and ESG reporting', 'Procurement digitalisation', 'MES and IoT integration'],
    solutions: ['SAP S/4HANA greenfield and brownfield implementation', 'Integrated Business Planning (IBP)', 'IoT-enabled asset performance management', 'ESG data platform and reporting', 'SAP Ariba and procurement transformation', 'Manufacturing execution system integration'],
    stats: [{ v: '80+', l: 'Manufacturing SAP programmes' }, { v: '38%', l: 'Average TCO reduction post-S/4HANA' }, { v: '22%', l: 'OEE improvement with smart factory tools' }, { v: '15+', l: 'Countries of delivery' }],
  },
  retail: {
    title: 'Retail & Consumer Goods',
    description: 'Unified commerce platforms, supply chain visibility, and AI-driven demand forecasting for multi-channel retailers.',
    headline: 'Unified retail, powered by intelligent data',
    subtext: 'Retailers must deliver a seamless customer experience across every channel while managing supply chain complexity and margin pressure.',
    accent: '#34D399',
    challenges: ['Omnichannel commerce platform integration', 'Demand forecasting and inventory optimisation', 'Supplier and supply chain visibility', 'Customer data platform and personalisation', 'SAP for Retail implementation', 'Loyalty and promotions management'],
    solutions: ['Unified commerce architecture', 'AI-driven demand planning and forecasting', 'SAP S/4HANA for Retail', 'Customer 360 data platform', 'Supply chain control tower', 'Retail analytics and merchandising intelligence'],
    stats: [{ v: '30+', l: 'Retail clients globally' }, { v: '18%', l: 'Average reduction in stockouts' }, { v: '2.1×', l: 'ROI on personalisation initiatives' }, { v: '£1.2bn', l: 'Retail revenue on transformed platforms' }],
  },
  energy: {
    title: 'Energy & Utilities',
    description: 'Asset performance management, regulatory compliance, and digital operations for energy companies navigating the transition.',
    headline: 'The energy transition demands a digital foundation',
    subtext: 'Energy companies must manage ageing assets, integrate renewable capacity, and meet intensifying regulatory requirements — simultaneously.',
    accent: '#F97316',
    challenges: ['Asset performance management and predictive maintenance', 'Grid modernisation and smart metering', 'Regulatory compliance and reporting', 'SAP IS-U and utilities platform migration', 'Carbon accounting and ESG reporting', 'Renewable energy asset integration'],
    solutions: ['SAP S/4HANA for Energy & Utilities', 'Asset performance management platforms', 'IoT-enabled grid monitoring', 'Carbon accounting and sustainability reporting', 'Smart metering data management', 'Renewable integration and trading platforms'],
    stats: [{ v: '20+', l: 'Energy and utilities clients' }, { v: '28%', l: 'Reduction in unplanned downtime' }, { v: '100%', l: 'GDPR and NIS2 compliance maintained' }, { v: '45%', l: 'Faster regulatory reporting cycle' }],
  },
  healthcare: {
    title: 'Healthcare & Life Sciences',
    description: 'Clinical data platforms, regulatory-grade AI, and enterprise transformation for hospitals, pharma, and medtech companies.',
    headline: 'Technology that improves patient and business outcomes',
    subtext: 'Healthcare organisations need technology that meets the highest standards of reliability, compliance, and data governance — while delivering measurable clinical and operational value.',
    accent: '#EC4899',
    challenges: ['Clinical data platform and interoperability', 'Regulatory compliance (HIPAA, GDPR, GxP)', 'SAP for Healthcare and Life Sciences', 'AI for clinical decision support', 'Supply chain and logistics optimisation', 'Patient portal and digital engagement'],
    solutions: ['Healthcare data platform and HL7 FHIR integration', 'GxP-compliant cloud infrastructure', 'SAP S/4HANA for Life Sciences', 'Clinical AI model development', 'Healthcare supply chain digitalisation', 'Patient engagement and portal development'],
    stats: [{ v: '15+', l: 'Healthcare and life sciences clients' }, { v: '100%', l: 'HIPAA and GxP compliance maintained' }, { v: '30%', l: 'Reduction in supply chain costs' }, { v: '50+', l: 'Countries with deployed solutions' }],
  },
  'public-sector': {
    title: 'Public Sector',
    description: 'Citizen services transformation, legacy modernisation, and cloud migration for government and defence organisations.',
    headline: 'Government services transformed for the digital citizen',
    subtext: 'Public sector organisations face legacy debt, data silos, and rising citizen expectations — with the added complexity of security and procurement constraints.',
    accent: '#60A5FA',
    challenges: ['Legacy system modernisation and migration', 'Citizen-facing digital service transformation', 'Cloud adoption under security frameworks (IL2/IL3)', 'Data sharing and interoperability', 'Shared services consolidation', 'SAP for Public Sector implementation'],
    solutions: ['Legacy application migration to cloud', 'Digital service design and delivery', 'Secure cloud infrastructure deployment', 'Data platform and analytics for public services', 'SAP S/4HANA for central government', 'Procurement and shared services transformation'],
    stats: [{ v: '30+', l: 'Government programmes delivered' }, { v: '£500M+', l: 'Government IT spend optimised' }, { v: 'SC / DV', l: 'Security-cleared staff available' }, { v: '100%', l: 'GDS Service Standard assessments passed' }],
  },
  education: {
    title: 'Education',
    description: 'Student information systems, digital learning platforms, and institutional ERP transformation for universities and EdTech companies.',
    headline: 'Technology that enables learning at every level',
    subtext: 'Universities and education providers are modernising core systems, expanding digital learning, and building the data capability to support student success.',
    accent: '#A78BFA',
    challenges: ['Student information system migration', 'Learning management system integration', 'Research data management', 'Finance and HR system modernisation', 'Digital campus transformation', 'Widening participation analytics'],
    solutions: ['SAP S/4HANA for Higher Education', 'Learning platform integration and development', 'Research data platform and analytics', 'Cloud migration for campus infrastructure', 'Student success analytics', 'Digital identity and access management'],
    stats: [{ v: '20+', l: 'Education institutions served' }, { v: '1.2M+', l: 'Students on modernised platforms' }, { v: '40%', l: 'Reduction in admin processing time' }, { v: '95%', l: 'Student satisfaction on digital services' }],
  },
  'financial-services': {
    title: 'Financial Services',
    description: 'End-to-end digital transformation for financial services — from core modernisation to AI-powered innovation and regulatory compliance.',
    headline: 'Financial services transformation, end to end',
    subtext: 'The financial services sector faces more simultaneous transformation pressures than any other industry — digital disruption, regulatory change, cost pressure, and AI all at once.',
    accent: '#1458F2',
    challenges: ['Core system modernisation across banking, insurance, and wealth', 'Regulatory compliance (DORA, Basel IV, IFRS 17, MiFID II)', 'AI and data platform development', 'Cloud migration of regulated workloads', 'Operational resilience and cyber security', 'Customer digital channel transformation'],
    solutions: ['SAP S/4HANA for Financial Services', 'Regulatory technology and compliance automation', 'Financial data platform and AI development', 'Cloud-native application modernisation', 'Operational resilience programme design', 'Digital banking and insurance platforms'],
    stats: [{ v: '100+', l: 'Financial services clients' }, { v: '£5bn+', l: 'Regulated assets transformed' }, { v: '40+', l: 'Regulatory frameworks covered' }, { v: '25+', l: 'Countries of operation' }],
  },
}

type Slug = keyof typeof PAGES

export async function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = PAGES[slug as Slug]
  if (!page) return { title: 'Not Found' }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://tryvion.com/industries/${slug}` },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = PAGES[slug as Slug]
  if (!page) notFound()

  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/industries" style={{ color: 'inherit', textDecoration: 'none' }}>Industries</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{page.title}</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-100px', width: '700px', height: '700px', background: `radial-gradient(circle, ${page.accent}14 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <p style={{ color: page.accent, fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', position: 'relative' }}>Industry</p>
        <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1.75rem', maxWidth: '48rem', position: 'relative' }}>
          {page.headline}
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative', marginBottom: '3rem' }}>
          {page.subtext}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Speak to a specialist
          </Link>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
            Our services
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 6rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '1.25rem', overflow: 'hidden' }}>
          {page.stats.map((s) => (
            <div key={s.l} style={{ background: '#050A18', padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', background: `linear-gradient(135deg, ${page.accent}, #0B1E3D)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
                {s.v}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.75rem', color: 'rgba(255,255,255,0.9)' }}>Industry Challenges</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {page.challenges.map((c) => (
                <li key={c} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  <span style={{ color: page.accent, marginTop: '0.25rem', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '0.875rem', height: '0.875rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.75rem', color: 'rgba(255,255,255,0.9)' }}>TRYVION Solutions</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {page.solutions.map((s) => (
                <li key={s} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  <span style={{ color: '#34D399', marginTop: '0.25rem', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '0.875rem', height: '0.875rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Let&rsquo;s solve your challenges together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Our industry specialists are available for a no-obligation consultation. Tell us what you are working on.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Get in touch
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '1rem', height: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
