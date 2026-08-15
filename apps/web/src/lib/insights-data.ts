// Static article data — replace with CMS fetch (Payload / Sanity) in Phase 12+

export interface InsightArticle {
  slug:        string
  title:       string
  excerpt:     string
  category:    string
  publishedAt: string
  modifiedAt?: string
  readTime:    string
  image:       string
  author: {
    name:   string
    role:   string
    avatar: string
  }
  // Rich body content as HTML — in Phase 12+ this comes from the CMS block renderer
  body:        string
}

export const ARTICLES: InsightArticle[] = [
  {
    slug:        '2025-enterprise-ai-readiness-report',
    title:       'The 2025 Enterprise AI Readiness Report',
    excerpt:     'Our annual study of how 500 large enterprises are deploying, scaling, and governing AI — and the organisational patterns that separate leaders from laggards.',
    category:    'Research',
    publishedAt: '2025-09-15',
    readTime:    '18 min read',
    image:       '/images/insights/ai-readiness-report-2025.jpg',
    author: { name: 'Dr Sarah Chen', role: 'Head of AI Practice', avatar: '/images/team/sarah-chen.jpg' },
    body: `
      <p>Artificial intelligence has moved from boardroom agenda item to operational reality for most large enterprises. But the gap between those who are capturing material value from AI and those who are still in pilot purgatory has never been wider.</p>
      <h2>Key findings</h2>
      <p>Our study of 500 enterprises across financial services, manufacturing, life sciences, and retail reveals three distinct tiers of AI maturity — and the organisational characteristics that predict which tier a company will occupy twelve months from now.</p>
      <h3>Leaders (18% of respondents)</h3>
      <p>Leaders have moved beyond individual AI applications to building AI-native operating models. They have invested in data foundations, established MLOps practices, and created organisational structures that allow AI to be deployed and governed at scale.</p>
      <h3>Progressors (41% of respondents)</h3>
      <p>Progressors have successful AI deployments in production but struggle to scale. The bottleneck is rarely technical — it is governance, data quality, and the change management required to make AI-assisted decisions stick in the business.</p>
      <h3>Laggards (41% of respondents)</h3>
      <p>Laggards are still navigating the governance and data quality prerequisites. Many have strong technology ambitions but insufficient data foundations to support them.</p>
      <h2>The data foundation imperative</h2>
      <p>The single strongest predictor of AI maturity is not budget, or leadership commitment, or technology selection. It is the quality and accessibility of enterprise data. Leaders spent 2–3x more on data infrastructure in the three years before their AI programmes began than their laggard counterparts.</p>
    `,
  },
  {
    slug:        's4hana-migration-five-decisions',
    title:       'S/4HANA Migration: Five Decisions That Determine Success',
    excerpt:     'After 340+ SAP migrations, we know the early choices that separate smooth go-lives from costly remediation projects.',
    category:    'SAP',
    publishedAt: '2025-10-02',
    readTime:    '9 min read',
    image:       '/images/insights/s4hana-migration.jpg',
    author: { name: 'James Okonkwo', role: 'SAP Practice Lead', avatar: '/images/team/james-okonkwo.jpg' },
    body: `
      <p>After leading more than 340 SAP transformation programmes, we have seen the same patterns play out repeatedly. The difference between a programme that delivers on its business case and one that becomes a multi-year remediation effort usually comes down to five decisions made in the first eight weeks.</p>
      <h2>Decision 1: Greenfield, brownfield, or selective data transition?</h2>
      <p>The migration approach shapes every subsequent decision. Greenfield offers the cleanest slate but requires the most change management. Brownfield is faster but carries technical debt forward. Selective data transition threads the needle — but only if your data quality supports it.</p>
      <h2>Decision 2: Central finance first or full integration from day one?</h2>
      <p>Running Central Finance as a reporting layer before committing to a full S/4HANA cutover is the risk-reduction strategy we recommend for most complex organisations. It lets you validate data quality and financial reporting accuracy before the point of no return.</p>
    `,
  },
  {
    slug:        'finops-at-scale',
    title:       'FinOps at Scale: Reducing Cloud Waste by 40% Without Slowing Engineering',
    excerpt:     'A practical framework for embedding cloud cost discipline into engineering teams without creating friction.',
    category:    'Cloud',
    publishedAt: '2025-09-28',
    readTime:    '7 min read',
    image:       '/images/insights/finops-scale.jpg',
    author: { name: 'Priya Patel', role: 'Cloud Practice Director', avatar: '/images/team/priya-patel.jpg' },
    body: `
      <p>Cloud cost optimisation does not have to mean slowing down engineering. The organisations that achieve the greatest cloud cost reductions — consistently in the 30–45% range — do so by embedding financial accountability into engineering culture, not by creating a central cost-police function.</p>
      <h2>The FinOps maturity model</h2>
      <p>Most organisations begin their FinOps journey with visibility — understanding where cloud spend is going. This is necessary but not sufficient. The material savings come in the optimise and operate phases, when cost awareness is embedded into the tools engineers use every day.</p>
    `,
  },
  {
    slug:        'enterprise-data-products',
    title:       'Building Enterprise Data Products That People Actually Use',
    excerpt:     'Why most enterprise data initiatives stall at delivery, and the product management practices that change the outcome.',
    category:    'AI & Data',
    publishedAt: '2025-09-18',
    readTime:    '11 min read',
    image:       '/images/insights/data-products.jpg',
    author: { name: 'Dr Sarah Chen', role: 'Head of AI Practice', avatar: '/images/team/sarah-chen.jpg' },
    body: `
      <p>The graveyard of enterprise data initiatives is vast. Beautifully engineered data platforms that nobody uses. Dashboards that took six months to build and are checked once a quarter. AI models with impressive accuracy metrics that never made it into a business decision.</p>
      <h2>Why data projects fail at adoption</h2>
      <p>The failure mode is almost always the same: data teams build what they think the business needs, rather than what the business will actually use. The gap between the two is bridged by product management — a discipline that most data functions do not yet apply systematically.</p>
    `,
  },
  {
    slug:        'erp-change-management',
    title:       'The Hidden Costs of Underestimating Change Management in ERP',
    excerpt:     'Technology is rarely the reason ERP projects fail. Here is the organisational change model we use on every engagement.',
    category:    'SAP',
    publishedAt: '2025-09-10',
    readTime:    '8 min read',
    image:       '/images/insights/erp-change.jpg',
    author: { name: 'James Okonkwo', role: 'SAP Practice Lead', avatar: '/images/team/james-okonkwo.jpg' },
    body: `
      <p>When ERP programmes fail to deliver their expected value, technology is rarely the reason. In our post-implementation reviews of programmes that underperformed, change management deficiencies were the primary contributing factor in over 70% of cases.</p>
      <h2>What we mean by change management</h2>
      <p>Change management in an ERP context is not the same as training delivery, though training is part of it. It encompasses stakeholder alignment, process adoption measurement, leadership communication, resistance management, and the sustained behavioural change that makes the new system the system of record rather than a workaround.</p>
    `,
  },
  {
    slug:        'agentic-ai-enterprise-readiness',
    title:       'Agentic AI in the Enterprise: Separating Hype from Readiness',
    excerpt:     'A candid assessment of where autonomous AI agents deliver value today, and what infrastructure your organisation needs before deploying them.',
    category:    'AI & Data',
    publishedAt: '2025-09-05',
    readTime:    '13 min read',
    image:       '/images/insights/agentic-ai.jpg',
    author: { name: 'Dr Sarah Chen', role: 'Head of AI Practice', avatar: '/images/team/sarah-chen.jpg' },
    body: `
      <p>Agentic AI — systems that can plan, take actions, and complete multi-step tasks autonomously — has moved from research concept to enterprise pilot at remarkable speed. But the gap between a compelling demo and a production-grade enterprise deployment is significant, and the failure modes are not yet well understood.</p>
      <h2>Where agentic AI delivers value today</h2>
      <p>The use cases delivering measurable ROI in production today share common characteristics: well-defined scope, high-volume repetitive tasks, structured data inputs, and reversible or low-stakes actions. Document processing, data enrichment, IT ticket triage, and research synthesis are the current sweet spots.</p>
    `,
  },
  {
    slug:        'outcome-based-managed-services-buyers-guide',
    title:       "Outcome-Based Managed Services: A Buyer's Guide",
    excerpt:     "What to look for in a managed services contract if you want a partner genuinely invested in your uptime and performance.",
    category:    'Managed Services',
    publishedAt: '2025-08-29',
    readTime:    '6 min read',
    image:       '/images/insights/managed-services-guide.jpg',
    author: { name: 'Marcus Williams', role: 'Managed Services Director', avatar: '/images/team/marcus-williams.jpg' },
    body: `
      <p>Not all managed services contracts are created equal. The difference between a contract that makes your provider a genuine partner in your operational success and one that creates a comfortable arrangement for the provider regardless of outcomes often comes down to a handful of commercial and structural clauses.</p>
      <h2>The problem with traditional AMS</h2>
      <p>Traditional application managed services are structured around inputs — headcount, hours, tickets — rather than outcomes. This creates a misalignment: the provider's revenue is not connected to your system's performance. More incidents can actually generate more revenue for a poorly structured AMS provider.</p>
    `,
  },
]

export function getArticleBySlug(slug: string): InsightArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(slug: string, category: string, count = 3): InsightArticle[] {
  return ARTICLES
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      // Same category first
      const aMatch = a.category === category ? 1 : 0
      const bMatch = b.category === category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, count)
}
