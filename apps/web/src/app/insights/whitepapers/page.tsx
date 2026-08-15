import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Whitepapers',
  description:
    'Research-backed whitepapers on enterprise AI readiness, SAP transformation, cloud strategy, and the future of digital operations.',
  alternates: {
    canonical: 'https://tryvion.com/insights/whitepapers',
  },
};

const WHITEPAPERS = [
  {
    slug: 'ai-readiness-index-2025',
    title: 'The 2025 Enterprise AI Readiness Index',
    desc: 'We surveyed 500 enterprise leaders on their AI maturity, investment priorities, and barriers to scale. The findings reveal a widening gap between AI leaders and laggards — and the specific investments that separate them.',
    pages: 42,
    accent: '#1458F2',
    tag: 'AI & Data',
    date: 'March 2026',
  },
  {
    slug: 'cloud-finops-enterprise-guide',
    title: "FinOps at Enterprise Scale: A Practitioner's Guide",
    desc: 'A comprehensive guide to implementing FinOps in large organisations — covering tooling selection, organisational design, chargeback models, and the cultural change that makes cost discipline sustainable.',
    pages: 38,
    accent: '#34D399',
    tag: 'Cloud',
    date: 'January 2026',
  },
  {
    slug: 'sap-s4hana-migration-risks',
    title: 'The 10 Hidden Risks in SAP S/4HANA Migration',
    desc: 'Based on analysis of 200+ S/4HANA migration programmes, this report identifies the failure modes that sink projects — and the programme design decisions that prevent them.',
    pages: 29,
    accent: '#22D3EE',
    tag: 'SAP',
    date: 'November 2025',
  },
  {
    slug: 'enterprise-talent-strategy-2026',
    title: 'Enterprise Technology Talent: The 2026 Outlook',
    desc: 'An analysis of enterprise technology talent supply, demand, and pricing across SAP, cloud, AI, and digital engineering — with workforce planning guidance for technology leaders.',
    pages: 24,
    accent: '#F59E0B',
    tag: 'Talent',
    date: 'October 2025',
  },
  {
    slug: 'regulated-cloud-financial-services',
    title: 'Cloud in Regulated Financial Services: A Practical Framework',
    desc: 'How financial services organisations can navigate PRA, FCA, ECB, and DORA requirements when adopting cloud — with a practical framework for regulatory engagement and programme design.',
    pages: 33,
    accent: '#7C3AED',
    tag: 'Financial Services',
    date: 'September 2025',
  },
];

export default function WhitepapersPage() {
  return (
    <>
      <style>{`
        .tryvion-whitepaper-card {
          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .tryvion-whitepaper-card:hover {
          border-color: rgba(255, 255, 255, 0.16) !important;
          background: rgba(255, 255, 255, 0.055) !important;
        }
      `}</style>

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
              right: 0,
              width: '700px',
              height: '700px',
              background: 'radial-gradient(circle, rgba(20,88,242,0.1) 0%, transparent 65%)',
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
              Whitepapers
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
            Research you can{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              act on
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
            TRYVION research draws on data from hundreds of enterprise transformation programmes to
            give practitioners frameworks and evidence, not opinions.
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
          {WHITEPAPERS.map((wp) => (
            <Link
              key={wp.slug}
              href={`/insights/whitepapers/${wp.slug}`}
              style={{
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div
                className="tryvion-whitepaper-card"
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  alignItems: 'start',
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
                        color: wp.accent,
                        background: `${wp.accent}18`,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                      }}
                    >
                      {wp.tag}
                    </span>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {wp.date}
                    </span>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {wp.pages} pages
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
                    {wp.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.75,
                    }}
                  >
                    {wp.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.75rem',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      color: wp.accent,
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    Download
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{
                        width: '0.875rem',
                        height: '0.875rem',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
