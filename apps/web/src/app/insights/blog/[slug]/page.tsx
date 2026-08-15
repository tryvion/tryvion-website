import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const POSTS = {
  'genai-enterprise-production': {
    title: 'Why most enterprise GenAI initiatives stall before production',
    description: 'Proof of concept success is near-universal. Production deployment is not. We examined what separates the programmes that cross the production gap.',
    headline: 'Why most enterprise GenAI initiatives stall before production',
    author: 'Amir Hassan, Managing Director AI & Data',
    date: 'August 2026',
    readTime: '8 min read',
    tag: 'AI & Data',
    accent: '#1458F2',
    body: [
      { type: 'p', text: 'In the two years since large language models became commercially accessible, we have reviewed over 50 enterprise GenAI initiatives across TRYVION clients and prospective clients. The pattern is remarkably consistent: proof of concept success is near-universal, production deployment is the exception, and the reasons for stalling are predictable.' },
      { type: 'h2', text: 'The production gap is not a technical problem' },
      { type: 'p', text: 'Most organisations that stall at proof of concept have the technical capability to proceed. The blockers are governance, data, and organisational — not engineering. Specifically, we see three recurring failure modes.' },
      { type: 'h3', text: '1. AI governance as an afterthought' },
      { type: 'p', text: 'Proof of concept environments are tolerant of ambiguity about accountability, explainability, and bias monitoring. Production environments are not. When governance questions are addressed for the first time at the production gate — by legal, risk, or regulators — they stop programmes that should have been designed to satisfy them from the start.' },
      { type: 'p', text: 'The organisations that succeed in production begin governance design at the same time as technical design. An AI governance framework is not a compliance exercise bolted on at the end — it is a design constraint that shapes the entire solution architecture.' },
      { type: 'h3', text: '2. Data that was good enough for the demo' },
      { type: 'p', text: 'Proof of concepts are typically built on curated data samples — representative, clean, and often manually prepared by the team running the pilot. Production systems encounter the full diversity and messiness of enterprise data at scale.' },
      { type: 'p', text: 'We consistently find that organisations underinvest in data platform modernisation as part of their GenAI programme. An LLM fine-tuned on bad data will produce confident, fluent, and wrong outputs. The data quality bar for AI systems is higher than for most enterprise applications, not lower.' },
      { type: 'h3', text: '3. The wrong definition of production readiness' },
      { type: 'p', text: 'Many organisations define production readiness as technical deployment. The more useful definition includes: user adoption infrastructure (training, change management, workflow integration), monitoring and human oversight mechanisms, escalation paths for edge cases, and ongoing model performance management.' },
      { type: 'p', text: 'GenAI systems degrade over time as the world changes and the data they were trained on becomes stale. Production readiness includes a plan for model refresh, performance monitoring, and continuous improvement — not just initial deployment.' },
      { type: 'h2', text: 'What the successful programmes do differently' },
      { type: 'p', text: 'The enterprises we have seen successfully deploy GenAI to production share three characteristics: they invest in data infrastructure before AI models; they design governance in parallel with technical development; and they define success metrics in business terms — not AI terms — before the programme starts. Percentage accuracy on a benchmark dataset is interesting. Reduction in manual processing time or improvement in decision quality is what justifies the investment.' },
    ],
  },
  'sap-rise-realities': {
    title: 'RISE with SAP: what enterprise buyers are not being told',
    description: 'An honest assessment of what RISE delivers, what it does not, and the questions every enterprise buyer should ask before signing.',
    headline: 'RISE with SAP: what enterprise buyers are not being told',
    author: 'Sophie Chen, Managing Director SAP',
    date: 'July 2026',
    readTime: '11 min read',
    tag: 'SAP',
    accent: '#22D3EE',
    body: [
      { type: 'p', text: 'RISE with SAP is a compelling packaging story. One contract, managed migration, included BTP entitlements, and a cloud subscription model that makes budgeting predictable. For some organisations, it is genuinely the right choice. For others, the packaging obscures a set of contractual, commercial, and technical realities that deserve careful examination.' },
      { type: 'h2', text: 'What RISE actually delivers' },
      { type: 'p', text: 'RISE packages the migration service (typically delivered by SAP or a partner), the cloud hosting subscription, a set of BTP entitlements, and business process intelligence tools. The value proposition is simplification: one vendor, one contract, one throat to choke.' },
      { type: 'p', text: 'For organisations with limited internal SAP capability, high complexity in managing multiple vendor relationships, or a genuine preference for hyperscaler infrastructure managed by SAP, RISE delivers on its promise.' },
      { type: 'h2', text: 'What RISE does not deliver — and what buyers miss' },
      { type: 'p', text: 'RISE is not a migration to S/4HANA. It is a packaging of services around a migration that you still need to design, govern, and manage. The migration effort — requirements, design, data migration, testing, change management, cutover — is not appreciably easier inside RISE than outside it.' },
      { type: 'p', text: 'The BTP entitlements in RISE are often insufficient for organisations with ambitious integration or extension use cases. Buyers routinely discover mid-programme that the included entitlements cover a fraction of what they planned to build.' },
      { type: 'p', text: 'RISE contracts contain cloud credits that can expire and minimum term commitments that are difficult to renegotiate. Buyers who have not modelled their long-term consumption against the committed terms often find that RISE is more expensive over a 5-year horizon than a traditional licensed deployment.' },
      { type: 'h2', text: 'The questions every buyer should ask' },
      { type: 'p', text: 'Before signing a RISE contract, enterprise buyers should establish: what exactly is included in the migration service and what is your cost exposure for the programme beyond it; what are the BTP consumption entitlements and are they sufficient for your integration and extension plans; what are the hyperscaler hosting terms and how do they compare to direct hyperscaler pricing; and what are the exit provisions if you choose to move off RISE in the future.' },
      { type: 'p', text: 'RISE can be the right choice. But it should be the result of rigorous analysis, not the default because it was the most compelling presentation in the procurement process.' },
    ],
  },
  'cloud-migration-mistakes': {
    title: 'The five cloud migration mistakes we see in every enterprise',
    description: 'After 200+ enterprise cloud migrations, certain failure patterns repeat. Understanding them before you start is the cheapest risk management available.',
    headline: 'The five cloud migration mistakes we see in every enterprise',
    author: 'Natalie Wright, Managing Director Cloud',
    date: 'June 2026',
    readTime: '9 min read',
    tag: 'Cloud',
    accent: '#7C3AED',
    body: [
      { type: 'p', text: 'We have delivered or reviewed over 200 enterprise cloud migration programmes. The technical complexity varies enormously. The human errors are distressingly consistent. Here are the five mistakes that appear in the vast majority of programmes that encounter serious problems.' },
      { type: 'h3', text: '1. Underestimating integration complexity' },
      { type: 'p', text: 'The average enterprise has 180% more active integrations than their technical architecture documentation records. Programmes that rely on documentation to scope integration work routinely discover, mid-migration, connections that were never documented and cannot be easily migrated. Automated discovery tooling is essential before scoping begins.' },
      { type: 'h3', text: '2. Treating the migration as a one-time project' },
      { type: 'p', text: 'Cloud migrations are not point-in-time events. The estate changes continuously during the migration programme — new applications are deployed, integrations change, teams add services. Programmes that treat the migration as a static project scope discover at cutover that significant portions of the estate have changed since they were assessed.' },
      { type: 'h3', text: '3. Separating security from the migration workstream' },
      { type: 'p', text: 'Security architecture is most expensive when retrofitted after migration. Programmes that run security as a parallel track, to be resolved after the core migration, reliably produce landing zones that require significant remediation before they can host production workloads in regulated environments.' },
      { type: 'h3', text: '4. Insufficient hypercare planning' },
      { type: 'p', text: 'Cutover weekend is well-planned. The 30 days after cutover are often not. Production issues that emerge post-cutover are typically not caused by the migration itself but by edge cases, load patterns, and user behaviours that were not visible in testing. A structured hypercare plan with defined escalation paths and rollback procedures is essential.' },
      { type: 'h3', text: '5. No FinOps from day one' },
      { type: 'p', text: 'Programmes that do not establish cost visibility from the start of migration regularly discover, 6 months after go-live, that their cloud spend significantly exceeds projections. By then, the team that designed the architecture has moved on and the decisions that drive the costs are difficult to reverse. Cost governance needs to be a design constraint from the start, not a review after the fact.' },
    ],
  },
  'finops-cultural-problem': {
    title: 'FinOps is mostly a cultural problem dressed up as a technical one',
    description: 'Most enterprises have enough tooling for cloud cost visibility. What they lack is accountability structures that make engineers care about costs.',
    headline: 'FinOps is mostly a cultural problem dressed up as a technical one',
    author: 'TRYVION Cloud Practice',
    date: 'May 2026',
    readTime: '7 min read',
    tag: 'Cloud',
    accent: '#34D399',
    body: [
      { type: 'p', text: 'Enterprise technology leaders spend considerable time evaluating FinOps tooling — CloudHealth vs. Apptio vs. native cloud cost management tools. The tooling decision matters at the margin. It is not the primary determinant of FinOps success.' },
      { type: 'p', text: 'In our experience working with enterprises spending $1M to $50M annually on cloud, the organisations that achieve and sustain excellent cloud cost management have solved a cultural and structural problem, not primarily a technical one.' },
      { type: 'h2', text: 'The accountability gap' },
      { type: 'p', text: 'Most enterprises have reasonable cloud cost visibility. What they lack is accountability: a clear relationship between cloud consumption decisions and the teams that make them, combined with incentives that make engineers and product owners care about the costs their choices generate.' },
      { type: 'p', text: 'When cloud costs are treated as a centralised infrastructure expense that nobody in engineering owns, engineers have no personal stake in cost efficiency. They will provision generously, leave resources running, and make architectural choices that optimise for convenience rather than cost. This is rational behaviour given the incentive structures they operate in.' },
      { type: 'h2', text: 'What actually works' },
      { type: 'p', text: 'The interventions with the highest and most durable impact are structural, not technical. Chargeback models that make cloud costs visible at the product team or business unit level create accountability without requiring central policing. Engineering norms that treat cloud cost awareness as a professional skill — alongside performance and security — change how architects make decisions. Regular cost reviews as part of sprint ceremonies make cost visible in the same context where spending decisions are made.' },
      { type: 'p', text: 'Tooling should serve these structural changes, not substitute for them. The best FinOps outcome we have seen — a 42% reduction in cloud spend, sustained over 3 years — was achieved by a team that used AWS Cost Explorer (free) and a well-designed chargeback model, not an expensive third-party platform.' },
    ],
  },
  'talent-shortage-sap': {
    title: 'The SAP talent shortage is structural — and getting worse',
    description: 'S/4HANA migration deadlines are compressing while experienced SAP consultant supply grows slowly. The implications for programme planning are significant.',
    headline: 'The SAP talent shortage is structural — and it is getting worse',
    author: 'Elena Vasquez, Chief People Officer',
    date: 'April 2026',
    readTime: '6 min read',
    tag: 'Talent',
    accent: '#F59E0B',
    body: [
      { type: 'p', text: 'SAP\'s ECC end-of-mainstream-maintenance deadline, combined with the complexity of S/4HANA migration, has created a structural talent imbalance that will intensify before it resolves. Enterprises with S/4HANA programmes planned for 2025-2027 should understand this dynamic and build their talent strategy accordingly.' },
      { type: 'h2', text: 'The supply-demand mismatch' },
      { type: 'p', text: 'The number of organisations planning S/4HANA migration has accelerated significantly in the past 18 months. The supply of experienced S/4HANA consultants — defined as practitioners with at least one full-cycle S/4HANA implementation in a comparably complex environment — has grown much more slowly.' },
      { type: 'p', text: 'This imbalance is structural because it takes 3-5 years to develop an experienced SAP consultant from entry level. There is no accelerated pathway. Day rates for certified RISE and S/4HANA Finance specialists have increased 45% year-on-year and show no sign of plateauing.' },
      { type: 'h2', text: 'The quality problem behind the shortage' },
      { type: 'p', text: 'The headline shortage obscures a more serious quality problem. When demand for SAP consultants exceeds supply, market participants — especially generic staffing agencies — begin to lower their standards for what constitutes an "experienced S/4HANA consultant." Enterprises that rely on certification as a proxy for capability will encounter this problem: newly certified consultants presented as experienced practitioners.' },
      { type: 'p', text: 'Rigorous vetting against real enterprise delivery standards — not just certifications — is the mitigation. The cost of rigorous vetting is significantly lower than the cost of discovering quality problems 3 months into a programme.' },
      { type: 'h2', text: 'Planning implications' },
      { type: 'p', text: 'Enterprises should start talent sourcing 6-9 months before programme start dates — not 6-9 weeks. Early engagement with specialist talent providers, rather than generalist recruiters, provides access to a deeper and more current network of validated practitioners. And building a talent retention strategy into the programme design — compensation continuity, interesting work, career development — reduces the risk of key talent departures mid-programme.' },
    ],
  },
  'dora-cloud-strategy': {
    title: 'DORA is reshaping cloud strategy in European financial services',
    description: 'DORA has moved from regulatory theory to operational reality. We examine the architectural implications and the programme responses that are working.',
    headline: 'DORA is reshaping cloud strategy in European financial services',
    author: 'David Okonkwo, Managing Director Financial Services',
    date: 'March 2026',
    readTime: '10 min read',
    tag: 'Financial Services',
    accent: '#EC4899',
    body: [
      { type: 'p', text: 'The Digital Operational Resilience Act came into full force in January 2025. After two years of preparation, the compliance work is largely done for Tier-1 financial services firms. What is becoming clear now is the longer-term strategic implications for cloud architecture and vendor relationship design.' },
      { type: 'h2', text: 'Concentration risk is the central challenge' },
      { type: 'p', text: 'DORA\'s concentration risk provisions require financial services firms to monitor and manage their dependency on individual ICT third-party service providers — including hyperscalers. For firms that have consolidated heavily on AWS or Azure, this creates a difficult question: how do you reduce concentration risk without abandoning the operational efficiency of a primary cloud provider?' },
      { type: 'p', text: 'The architectural responses we are seeing vary from pure multi-cloud (expensive, complex, and often operationally counterproductive) to workload-level diversification (strategic placement of specific workloads across multiple providers) to contractual risk management (enhanced exit provisions, portability requirements, and contingency planning without operational multi-cloud).' },
      { type: 'h2', text: 'What is actually working' },
      { type: 'p', text: 'The firms that are navigating DORA most effectively have taken a pragmatic approach: primary hyperscaler for the majority of workloads, with specific critical services designed for portability and with tested failover documentation. The documentation and testing requirements are more intensive than pre-DORA standards demanded — but they do not require architectural decisions that fundamentally undermine cloud operational efficiency.' },
      { type: 'p', text: 'The investment that is paying off is in cloud-agnostic application architecture: containerised workloads, infrastructure-as-code, and abstraction layers that make workload movement possible without full redevelopment. Firms that invested in these capabilities before DORA are finding DORA compliance significantly cheaper than those that did not.' },
      { type: 'h2', text: 'The non-EU firm question' },
      { type: 'p', text: 'DORA applies to EU financial services firms and, in practice, to non-EU firms with significant EU operations. The boundary of application is still being clarified through regulatory guidance and early supervisory action. Non-EU firms that are waiting for complete clarity before acting are taking a risk: early supervisory engagement, even on programmes that are not complete, is consistently producing better regulatory relationships than silence.' },
    ],
  },
}

type Slug = keyof typeof POSTS

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug as Slug]
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://tryvion.com/insights/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS[slug as Slug]
  if (!post) notFound()

  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/insights" style={{ color: 'inherit', textDecoration: 'none' }}>Insights</Link>
          <span>/</span>
          <Link href="/insights/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{post.tag}</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(3rem, 5vw, 4.5rem)', maxWidth: '56rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: '-100px', width: '600px', height: '600px', background: `radial-gradient(circle, ${post.accent}10 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.75rem', position: 'relative', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: post.accent, background: `${post.accent}14`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{post.tag}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{post.date}</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{post.readTime}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, position: 'relative', marginBottom: '1.75rem' }}>
          {post.headline}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', position: 'relative' }}>{post.author}</p>
      </section>

      <article style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 8rem)', maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {post.body.map((block, i) => {
          if (block.type === 'h2') return <h2 key={i} style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginTop: '1.5rem' }}>{block.text}</h2>
          if (block.type === 'h3') return <h3 key={i} style={{ fontSize: '1.0625rem', fontWeight: 700, color: post.accent, marginTop: '0.5rem' }}>{block.text}</h3>
          return <p key={i} style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85 }}>{block.text}</p>
        })}
      </article>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.05)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Discuss this with our team
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Our practitioners are available for advisory conversations with enterprise technology leaders.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Get in touch
            </Link>
            <Link href="/insights/blog" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              More posts
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
