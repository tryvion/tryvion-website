import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const CASE_STUDIES = {
  'sap-tco-reduction': {
    title: 'Global manufacturer cuts SAP TCO by 38%',
    description: 'A phased S/4HANA migration using TRYVION\'s Rise accelerator, delivered in 14 months across 22 countries with zero production downtime.',
    industry: 'Manufacturing',
    service: 'SAP S/4HANA',
    accent: '#1458F2',
    client: 'Global industrial manufacturer (confidential)',
    headline: 'How a global manufacturer cut SAP total cost of ownership by 38%',
    challenge: 'The client operated a 15-year-old SAP ECC 6.0 landscape across 22 countries, with heavily customised ABAP code, fragmented data governance, and an impending end-of-mainstream-maintenance deadline. Previous attempts to scope an S/4HANA migration had stalled due to complexity and risk concerns.',
    approach: 'TRYVION deployed a 3-phase programme: a 12-week discovery and fit-gap assessment, a core template design phase using our Rise accelerator pre-built industry content, and a phased rollout using a cluster migration model — allowing early country adopters to generate learnings before the complex markets were tackled.',
    outcome: 'The programme delivered on time and within budget, reducing customisation footprint by 62%, enabling real-time reporting across all markets, and reducing the SAP run cost by 38% through rationalisation and cloud hosting optimisation.',
    metrics: [{ v: '38%', l: 'Total SAP cost reduction' }, { v: '14 months', l: 'Programme duration' }, { v: '22', l: 'Countries covered' }, { v: '0', l: 'Production downtime incidents' }, { v: '62%', l: 'Customisation reduction' }, { v: '180+', l: 'TRYVION consultants deployed' }],
    quote: { text: 'TRYVION delivered what our previous vendors said was impossible — an on-time, on-budget S/4HANA migration at this scale. The Rise accelerator genuinely compressed a 24-month programme into 14 months.', attribution: 'Group CIO, Global Industrial Manufacturer' },
  },
  'banking-core-modernisation': {
    title: 'Tier-1 bank migrates core banking to Azure',
    description: 'A complex lift-and-modernise programme moving a 40-year-old core banking system to Azure — with zero data loss and regulatory approval throughout.',
    industry: 'Banking',
    service: 'Cloud Migration',
    accent: '#22D3EE',
    client: 'Tier-1 European retail bank (confidential)',
    headline: 'Tier-1 bank moves 40-year-old core to Azure — 99.99% uptime maintained',
    challenge: 'A leading European retail bank needed to migrate its core banking platform — built over 40 years and processing 12M daily transactions — to Azure. The PRA and ECB required detailed migration plans, rollback procedures, and ongoing reporting. The previous attempt had been halted by regulators after inadequate testing.',
    approach: 'TRYVION led a 24-month programme with a dedicated regulatory engagement track running in parallel with the technical migration. Our migration factory processed workloads in defined waves, each with full performance testing, regulatory sign-off gates, and automated rollback capability. A dark-site running period of 8 weeks on Azure before cutover eliminated the primary risk.',
    outcome: 'The cutover was executed over a single weekend with 99.99% system availability. Infrastructure costs fell 65% in year one. The PRA issued written confirmation of regulatory compliance — a rare public endorsement.',
    metrics: [{ v: '99.99%', l: 'Uptime during cutover' }, { v: '65%', l: 'Infrastructure cost reduction' }, { v: '12M', l: 'Daily transactions migrated' }, { v: '0', l: 'Data loss incidents' }, { v: '24 months', l: 'Programme duration' }, { v: 'PRA', l: 'Approved programme' }],
    quote: { text: 'The level of regulatory rigour TRYVION brought was unlike any other partner we had worked with. They treated compliance as an engineering problem, not a documentation exercise.', attribution: 'Chief Technology Officer, European Retail Bank' },
  },
  'ai-readiness-insurer': {
    title: 'UK insurer builds AI claims triage — 40% faster settlement',
    description: 'End-to-end AI programme from data platform to production ML — with an FCA-approved governance framework.',
    industry: 'Insurance',
    service: 'AI & Data',
    accent: '#7C3AED',
    client: 'UK P&C insurer (confidential)',
    headline: 'UK insurer automates claims triage with AI — settlement time drops 40%',
    challenge: 'A major UK P&C insurer processed 2.5M claims annually through a largely manual triage process. Settlement times averaged 28 days. Data was siloed across legacy claims management, policy admin, and third-party systems. An earlier AI initiative had been halted by the FCA\'s AI governance concerns.',
    approach: 'TRYVION designed a programme in three components: a data lakehouse foundation on Azure to unify claims data; a suite of ML models for fraud detection, severity scoring, and next-best-action recommendation; and a governance framework that satisfied the FCA\'s expectations for explainability, bias monitoring, and human oversight.',
    outcome: 'The AI triage system went live in 11 months. Average settlement time fell from 28 to 17 days. Annual cost savings of £18M were validated in year one. The FCA governance framework was cited by the regulator as a model approach for the industry.',
    metrics: [{ v: '40%', l: 'Reduction in settlement time' }, { v: '£18M', l: 'Annual savings validated' }, { v: '11 months', l: 'From start to production' }, { v: '2.5M', l: 'Claims processed annually' }, { v: 'FCA', l: 'Governance framework approved' }, { v: '98.2%', l: 'Fraud detection accuracy' }],
    quote: { text: 'TRYVION understood that the technical problem and the regulatory problem had to be solved together. The governance framework they designed has become our blueprint for all future AI programmes.', attribution: 'Chief Digital Officer, UK P&C Insurer' },
  },
  'cloud-finops-retail': {
    title: 'Global retailer eliminates £9M cloud waste',
    description: 'FinOps programme delivering £9M annual savings across AWS and Azure in 90 days.',
    industry: 'Retail',
    service: 'FinOps',
    accent: '#34D399',
    client: 'Global omnichannel retailer (confidential)',
    headline: 'Global retailer eliminates £9M in annual cloud waste in 90 days',
    challenge: 'Rapid cloud adoption during digital transformation had left the client with an unstructured AWS and Azure estate — 3,400 accounts, no consistent tagging, no chargeback model, and no visibility of which teams owned which spend. Annual cloud costs had grown 40% year-on-year with no corresponding business value increase.',
    approach: 'TRYVION deployed a FinOps factory team for a 90-day sprint: automated discovery and tagging remediation across all accounts; workload rightsizing analysis; Reserved Instance and Savings Plan modelling; and a chargeback framework design that aligned cloud costs to business units and product P&Ls.',
    outcome: '£9M of annual waste was identified and eliminated in 90 days — primarily through rightsizing (£4.2M), Reserved Instance purchases (£3.1M), and zombie resource decommission (£1.7M). A FinOps Centre of Excellence was established with ongoing engineering accountability.',
    metrics: [{ v: '£9M', l: 'Annual savings achieved' }, { v: '90 days', l: 'Sprint duration' }, { v: '32%', l: 'Total cloud cost reduction' }, { v: '3,400', l: 'Accounts audited' }, { v: '100%', l: 'Accounts tagged and attributed' }, { v: '3:1', l: 'ROI on TRYVION fees' }],
    quote: { text: 'We knew we had waste. We did not know it was £9M. TRYVION found it in 90 days, told us exactly where it was, and helped us eliminate it without disrupting a single production workload.', attribution: 'VP of Cloud Infrastructure, Global Retailer' },
  },
  'talent-transformation-energy': {
    title: 'Energy major scales SAP delivery with 80 embedded specialists',
    description: 'Rapid talent augmentation for a 5-year SAP transformation — 80 specialists placed in 6 weeks.',
    industry: 'Energy',
    service: 'Talent Solutions',
    accent: '#F59E0B',
    client: 'FTSE 100 energy company (confidential)',
    headline: 'Energy major builds 80-person SAP delivery team in 6 weeks',
    challenge: 'A major energy company launching a 5-year, £220M SAP S/4HANA transformation programme needed to scale its delivery team rapidly. Previous attempts to source SAP talent through traditional recruiters had yielded inadequate candidates at uncompetitive rates, delaying the programme start by 3 months.',
    approach: 'TRYVION conducted a rapid needs analysis and deployed vetted SAP specialists across Finance, Logistics, BTP, and programme management within the agreed engagement timeline. Each specialist was assessed against TRYVION\'s enterprise vetting framework — combining domain knowledge, real-world SAP delivery experience, and programme management capability.',
    outcome: 'All 80 roles filled within the agreed 6-week SLA. Programme delivery resumed on revised schedule. At the 12-month mark, 77 of 80 specialists remained engaged — a 96% retention rate. Client reported 94% satisfaction with specialist quality in the annual review.',
    metrics: [{ v: '80', l: 'Specialists placed' }, { v: '6 weeks', l: 'To full team deployment' }, { v: '96%', l: 'Retention at 12 months' }, { v: '94%', l: 'Client satisfaction score' }, { v: '£220M', l: 'Programme supported' }, { v: '0', l: 'SLA breaches' }],
    quote: { text: 'The speed and quality of TRYVION\'s talent placement was the difference between a programme that started on time and one that slipped another year. Every specialist they placed was genuinely enterprise-grade.', attribution: 'Programme Director, FTSE 100 Energy Company' },
  },
  'digital-engineering-wealth': {
    title: 'Wealth manager launches AI adviser platform — 92% adoption',
    description: 'Cloud-native AI-powered adviser productivity platform built in 9 months with 92% first-year adoption.',
    industry: 'Wealth Management',
    service: 'Digital Engineering',
    accent: '#EC4899',
    client: 'UK wealth management firm (confidential)',
    headline: 'Wealth manager deploys AI adviser platform serving 12,000 clients in 9 months',
    challenge: 'A UK wealth management firm with £48bn AUM was losing advisers to digital-native competitors who offered better productivity tools and client experience. Their existing adviser platform was a 12-year-old on-premise system with no mobile capability, manual client reporting, and no AI-assisted insights.',
    approach: 'TRYVION delivered a cloud-native adviser productivity platform on Azure — built with a domain-driven microservices architecture, real-time portfolio analytics, AI-driven investment insights using a proprietary LLM fine-tuned on the firm\'s investment data, and a digital client reporting engine. The team of 35 engineers worked in 2-week sprints with monthly stakeholder showcases.',
    outcome: 'The platform launched in production 9 months after engagement start. 92% of advisers adopted the new platform within 6 months. Client reporting time fell 85%. The firm reported a 12% increase in adviser NPS and zero adviser departures attributable to tooling dissatisfaction in the first year.',
    metrics: [{ v: '9 months', l: 'Build to production' }, { v: '92%', l: 'Adviser adoption in year 1' }, { v: '12,000', l: 'Clients on new platform' }, { v: '85%', l: 'Reporting time reduction' }, { v: '£48bn', l: 'AUM on modernised platform' }, { v: '+12%', l: 'Adviser NPS improvement' }],
    quote: { text: 'TRYVION built something our advisers actually want to use — not just something that works. The AI insights component has become our most talked-about competitive differentiator with clients.', attribution: 'Head of Digital, UK Wealth Management Firm' },
  },
}

type Slug = keyof typeof CASE_STUDIES

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDIES[slug as Slug]
  if (!cs) return { title: 'Not Found' }
  return {
    title: cs.title,
    description: cs.description,
    alternates: { canonical: `https://tryvion.com/insights/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = CASE_STUDIES[slug as Slug]
  if (!cs) notFound()

  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/insights" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</Link>
          <span>/</span>
          <Link href="/insights/case-studies" style={{ color: 'inherit', textDecoration: 'none' }}>Case Studies</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{cs.industry}</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(4rem, 6vw, 5.5rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: 0, width: '700px', height: '700px', background: `radial-gradient(circle, ${cs.accent}10 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.75rem', position: 'relative', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: cs.accent, background: `${cs.accent}14`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{cs.industry}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{cs.service}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', padding: '0.25rem 0.75rem' }}>Client: {cs.client}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '56rem', position: 'relative' }}>
          {cs.headline}
        </h1>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(4rem, 6vw, 5rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '1.25rem', overflow: 'hidden' }}>
          {cs.metrics.map((m) => (
            <div key={m.l} style={{ background: '#050A18', padding: '2rem 1.5rem' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.03em', background: `linear-gradient(135deg, ${cs.accent}, #0B1E3D)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.375rem' }}>{m.v}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 8rem)', maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {[
          { label: 'The Challenge', text: cs.challenge },
          { label: 'Our Approach', text: cs.approach },
          { label: 'The Outcome', text: cs.outcome },
        ].map((section) => (
          <div key={section.label}>
            <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: cs.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{section.label}</h2>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{section.text}</p>
          </div>
        ))}

        <blockquote style={{ borderLeft: `3px solid ${cs.accent}`, paddingLeft: '2rem', margin: '1rem 0' }}>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>
            &ldquo;{cs.quote.text}&rdquo;
          </p>
          <cite style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'normal', fontWeight: 600 }}>
            — {cs.quote.attribution}
          </cite>
        </blockquote>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.05)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Achieve similar results
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Tell us about your transformation objectives. We will connect you with the right team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Get started
            </Link>
            <Link href="/insights/case-studies" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              More case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
