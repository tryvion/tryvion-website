import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Open Roles',
  description: 'Explore open positions at TRYVION across SAP consulting, cloud engineering, AI & data, and corporate functions.',
  alternates: { canonical: 'https://tryvion.com/careers/roles' },
}

const ROLES = [
  {
    title: 'SAP S/4HANA Finance Lead Consultant',
    location: 'London / Frankfurt',
    type: 'Permanent',
    level: 'Senior',
    practice: 'SAP',
    accent: '#1458F2',
    desc: 'Lead S/4HANA Finance workstream delivery on large-scale enterprise migrations. 8+ years SAP Finance experience required.',
  },
  {
    title: 'SAP BTP Integration Architect',
    location: 'London / Remote',
    type: 'Permanent',
    level: 'Lead',
    practice: 'SAP',
    accent: '#1458F2',
    desc: 'Design and deliver complex SAP BTP integration landscapes. Deep expertise in Integration Suite, API Management, and Event Mesh.',
  },
  {
    title: 'AWS Cloud Architect',
    location: 'New York / London',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Cloud',
    accent: '#22D3EE',
    desc: 'Design and deliver enterprise AWS solutions across migration, native development, and FinOps. AWS Solutions Architect Professional required.',
  },
  {
    title: 'Azure Data Engineer',
    location: 'London / Singapore',
    type: 'Permanent',
    level: 'Mid',
    practice: 'AI & Data',
    accent: '#7C3AED',
    desc: 'Build enterprise-grade data platforms on Azure — Synapse, Data Factory, Databricks. Strong Python and SQL skills essential.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'London / New York',
    type: 'Permanent',
    level: 'Senior',
    practice: 'AI & Data',
    accent: '#7C3AED',
    desc: 'Develop and deploy machine learning models for enterprise clients. Experience with LLMs, MLOps, and regulated industry data requirements.',
  },
  {
    title: 'DevOps / Platform Engineer',
    location: 'London / Amsterdam',
    type: 'Permanent',
    level: 'Mid-Senior',
    practice: 'Cloud',
    accent: '#22D3EE',
    desc: 'Build and operate cloud native delivery infrastructure. Kubernetes, Terraform, CI/CD, and observability expertise required.',
  },
  {
    title: 'Enterprise Architect',
    location: 'London',
    type: 'Permanent',
    level: 'Principal',
    practice: 'Strategy',
    accent: '#F59E0B',
    desc: 'Lead enterprise architecture advisory engagements. Define target-state architectures across SAP, cloud, and data platforms for large enterprise clients.',
  },
  {
    title: 'Programme Manager',
    location: 'London / Dubai',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Delivery',
    accent: '#34D399',
    desc: 'Manage complex multi-workstream enterprise transformation programmes. PMP or PRINCE2 required. £20M+ programme experience preferred.',
  },
  {
    title: 'Business Development Manager — Financial Services',
    location: 'London',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Commercial',
    accent: '#EC4899',
    desc: 'Originate and develop new client relationships in UK and EMEA financial services. Enterprise consulting sales background essential.',
  },
]

const LEVEL_COLORS: Record<string, string> = {
  Mid: 'rgba(255,255,255,0.12)',
  'Mid-Senior': 'rgba(255,255,255,0.16)',
  Senior: 'rgba(20,88,242,0.18)',
  Lead: 'rgba(201,162,75,0.18)',
  Principal: 'rgba(34,211,238,0.18)',
}

export default function RolesPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/careers" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Open Roles</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Open Positions</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          Build the future of{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            enterprise technology
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative' }}>
          We are growing across every practice. If you have deep enterprise technology expertise and high standards, we want to hear from you.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {ROLES.map((role) => (
          <div key={role.title} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{role.title}</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>{role.location}</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>{role.type}</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: role.accent, background: `${role.accent}18`, padding: '0.25rem 0.625rem', borderRadius: '999px' }}>{role.practice}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', background: LEVEL_COLORS[role.level] || 'rgba(255,255,255,0.1)', padding: '0.25rem 0.625rem', borderRadius: '999px' }}>{role.level}</span>
                </div>
              </div>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#1458F2', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', padding: '0.625rem 1.25rem', border: '1px solid rgba(20,88,242,0.35)', borderRadius: '0.75rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Apply
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '0.75rem', height: '0.75rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{role.desc}</p>
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Don&rsquo;t see your role?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            We are always interested in exceptional enterprise technology talent. Send us your profile and we will be in touch when the right opportunity arises.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Send your CV
          </Link>
        </div>
      </section>
    </main>
  )
}
