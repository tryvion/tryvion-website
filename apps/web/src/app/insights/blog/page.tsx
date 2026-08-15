import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Perspectives from TRYVION practitioners on enterprise transformation, SAP, cloud, AI, and the future of work.',
  alternates: {
    canonical: 'https://tryvion.com/insights/blog',
  },
};

const POSTS = [
  {
    slug: 'genai-enterprise-production',
    title: 'Why most enterprise GenAI initiatives stall before production',
    excerpt:
      'Proof of concept success is almost universal. Production deployment is not. We examined 50 enterprise GenAI initiatives to understand the gap — and what separates the programmes that cross it.',
    author: 'Amir Hassan, Managing Director AI & Data',
    date: 'August 2026',
    readTime: '8 min read',
    tag: 'AI & Data',
    accent: '#1458F2',
  },
  {
    slug: 'sap-rise-realities',
    title: 'RISE with SAP: what enterprise buyers are not being told',
    excerpt:
      "SAP's RISE programme is genuinely compelling for some organisations and genuinely wrong for others. An honest assessment of what RISE delivers, what it does not, and the questions every buyer should ask.",
    author: 'Sophie Chen, Managing Director SAP',
    date: 'July 2026',
    readTime: '11 min read',
    tag: 'SAP',
    accent: '#22D3EE',
  },
  {
    slug: 'cloud-migration-mistakes',
    title: 'The five cloud migration mistakes we see in every enterprise',
    excerpt:
      'After 200+ enterprise cloud migrations, certain failure patterns repeat with alarming regularity. Understanding them before you start is the cheapest form of risk management available.',
    author: 'Natalie Wright, Managing Director Cloud',
    date: 'June 2026',
    readTime: '9 min read',
    tag: 'Cloud',
    accent: '#7C3AED',
  },
  {
    slug: 'finops-cultural-problem',
    title: 'FinOps is mostly a cultural problem dressed up as a technical one',
    excerpt:
      'Most enterprises have enough tooling to achieve excellent cloud cost visibility. What they lack is the accountability structures and incentive alignment that make engineers care about cloud costs. Here is how to build them.',
    author: 'TRYVION Cloud Practice',
    date: 'May 2026',
    readTime: '7 min read',
    tag: 'Cloud',
    accent: '#34D399',
  },
  {
    slug: 'talent-shortage-sap',
    title: 'The SAP talent shortage is structural — and it is getting worse',
    excerpt:
      'S/4HANA migration deadlines are compressing while the supply of experienced SAP consultants grows slowly. The implications for enterprise programme planning are significant and largely unaddressed.',
    author: 'Elena Vasquez, Chief People Officer',
    date: 'April 2026',
    readTime: '6 min read',
    tag: 'Talent',
    accent: '#F59E0B',
  },
  {
    slug: 'dora-cloud-strategy',
    title: 'DORA is reshaping cloud strategy in European financial services',
    excerpt:
      'The Digital Operational Resilience Act has moved from regulatory theory to operational reality. We examine the architectural implications for financial services firms and the programme responses that are working.',
    author: 'David Okonkwo, Managing Director Financial Services',
    date: 'March 2026',
    readTime: '10 min read',
    tag: 'Financial Services',
    accent: '#EC4899',
  },
];

const TAG_COLORS: Record<string, string> = {
  'AI & Data': '#1458F2',
  SAP: '#22D3EE',
  Cloud: '#7C3AED',
  Talent: '#F59E0B',
  'Financial Services': '#EC4899',
};

export default function BlogPage() {
  return (
    <main
      style={{
        background: '#050A18',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <section
        style={{
          padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)',
          maxWidth: '82rem',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '700px',
            background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            marginBottom: '1.75rem',
          }}
        >
          <Link
            href="/insights"
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.8125rem',
              textDecoration: 'none',
            }}
          >
            Insights
          </Link>

          <span
            style={{
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            /
          </span>

          <span
            style={{
              color: '#1458F2',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            Blog
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '2rem',
            maxWidth: '44rem',
            position: 'relative',
          }}
        >
          Perspectives from the{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            practice
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '44rem',
            lineHeight: 1.7,
            position: 'relative',
          }}
        >
          Views from TRYVION practitioners on the problems, patterns, and ideas shaping enterprise
          transformation.
        </p>
      </section>

      <section
        style={{
          padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)',
          maxWidth: '82rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/blog/${post.slug}`}
            className="tryvion-blog-card"
            style={{
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'start',
                transition: 'border-color 0.2s ease, background 0.2s ease',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.625rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: TAG_COLORS[post.tag] || '#1458F2',
                      background: `${TAG_COLORS[post.tag] || '#1458F2'}18`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                    }}
                  >
                    {post.tag}
                  </span>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {post.date}
                  </span>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '1.1875rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.4,
                    marginBottom: '0.75rem',
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.75,
                    marginBottom: '1rem',
                  }}
                >
                  {post.excerpt}
                </p>

                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'rgba(255,255,255,0.3)',
                    fontStyle: 'italic',
                  }}
                >
                  {post.author}
                </p>
              </div>

              <div
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  flexShrink: 0,
                  marginTop: '0.25rem',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                  }}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <style>{`
        .tryvion-blog-card > div:hover {
          border-color: rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.055);
        }

        @media (max-width: 640px) {
          .tryvion-blog-card > div {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding: 1.75rem;
          }
        }
      `}</style>
    </main>
  );
}
