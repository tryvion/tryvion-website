import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Industries — TRYVION',
  description:
    'TRYVION delivers SAP, AI and enterprise transformation across Financial Services, Professional Services, Manufacturing, Consumer, Public Sector and Energy industries.',
  alternates: { canonical: 'https://thetryvion.com/industries' },
};

const INDUSTRIES = [
  {
    slug: 'financial-services',
    label: 'Financial Services',
    group: 'Financial',
    description:
      'SAP S/4HANA and AI transformation for banks, capital markets firms, insurers and wealth managers — from regulatory compliance and core modernisation to intelligent operations and customer experience.',
    accent: '#1458F2',
    icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
  },
  {
    slug: 'professional-services',
    label: 'Professional Services',
    group: 'Service',
    description:
      'Enterprise technology transformation for consulting, legal, accounting and technology services firms — connecting financial management, workforce, project systems and client operations through SAP S/4HANA and AI.',
    accent: '#C9A24B',
    icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing & Engineering',
    group: 'Discrete',
    description:
      'SAP S/4HANA transformation, supply chain digitisation, and AI-powered operations for discrete manufacturers, industrial equipment producers and engineering organisations operating at global scale.',
    accent: '#F59E0B',
    icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
  },
  {
    slug: 'retail-consumer',
    label: 'Retail & Consumer',
    group: 'Consumer',
    description:
      'Unified commerce, demand forecasting and AI-driven customer intelligence for retailers and consumer goods companies connecting physical and digital channels through SAP S/4HANA and SAP Business AI.',
    accent: '#10B981',
    icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  },
  {
    slug: 'public-sector',
    label: 'Public Sector',
    group: 'Public',
    description:
      'Citizen services transformation, legacy modernisation and SAP public sector solutions for central government, local authorities and public services organisations navigating digital transformation.',
    accent: '#0891B2',
    icon: 'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z',
  },
  {
    slug: 'healthcare-life-sciences',
    label: 'Healthcare & Life Sciences',
    group: 'Public',
    description:
      'SAP ERP, AI and data transformation for healthcare providers, pharmaceutical companies and life sciences organisations — from financial and supply chain operations to regulatory compliance and intelligent process automation.',
    accent: '#EC4899',
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  },
  {
    slug: 'energy-resources',
    label: 'Energy & Resources',
    group: 'Public',
    description:
      'SAP transformation and AI-powered operations for energy producers, utilities and resources companies — asset management, supply chain, finance and workforce connected through one intelligent digital core.',
    accent: '#F97316',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    slug: 'technology-media',
    label: 'Technology & Media',
    group: 'Service',
    description:
      'Enterprise finance, HR and operational transformation for technology companies and media organisations — enabling scale, agility and global operations through SAP S/4HANA, SuccessFactors and Business AI.',
    accent: '#7C3AED',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
];

export default function IndustriesPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
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
            height: '900px',
            background: 'radial-gradient(circle, rgba(20,88,242,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />
        <p
          style={{
            color: '#C9A24B',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            position: 'relative',
          }}
        >
          Industries
        </p>
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '2rem',
            maxWidth: '52rem',
            position: 'relative',
          }}
        >
          Transformation expertise across{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            every sector
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '48rem',
            lineHeight: 1.7,
            position: 'relative',
          }}
        >
          TRYVION brings deep SAP, AI and enterprise technology expertise to Financial Services,
          Professional Services, Manufacturing, Consumer, Public Sector and Energy industries —
          combining solution knowledge with real sector understanding.
        </p>
      </section>

      <section
        style={{
          padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)',
          maxWidth: '82rem',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  transition: 'border-color 0.2s, background 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.875rem',
                    background: `${ind.accent}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ind.accent}
                    strokeWidth={1.5}
                    style={{ width: '1.375rem', height: '1.375rem' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={ind.icon} />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.875rem',
                  }}
                >
                  {ind.label}
                </h2>
                <p
                  style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
                >
                  {ind.description}
                </p>
                <div
                  style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: ind.accent,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  Explore
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ width: '0.875rem', height: '0.875rem' }}
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
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)',
          background: 'rgba(20,88,242,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              color: '#C9A24B',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Work With Us
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            Your industry. Our expertise.
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '1rem',
              lineHeight: 1.75,
              marginBottom: '3rem',
            }}
          >
            Tell us about your transformation objectives and we will connect you with SAP and AI
            specialists who bring real industry depth to every engagement.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1458F2, #0B1E3D)',
                color: '#fff',
                padding: '1rem 2.25rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
              }}
            >
              Talk to an industry expert
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: '1rem', height: '1rem' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.65)',
                padding: '1rem 2.25rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Explore our services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
