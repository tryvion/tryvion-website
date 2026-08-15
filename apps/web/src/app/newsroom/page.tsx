import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Latest news, press releases, and announcements from TRYVION.',
  alternates: { canonical: 'https://thetryvion.com/newsroom' },
}

const NEWS = [
  { date: 'August 2026', headline: 'TRYVION launches SAP + AI transformation practice', excerpt: 'TRYVION formally establishes its integrated SAP and Enterprise AI transformation practice — combining deep S/4HANA expertise with platform-agnostic AI capability to help organisations build the intelligent enterprise.', tag: 'Launch' },
  { date: 'August 2026', headline: 'TRYVION Academy launches SkillVerse enterprise technology learning platform', excerpt: 'SkillVerse provides structured learning paths across SAP S/4HANA, SuccessFactors, BTP, Enterprise AI and cloud technologies — built around real transformation experience and aligned to industry certifications.', tag: 'Product' },
  { date: 'August 2026', headline: 'TRYVION TALENT launches specialist SAP and AI talent solutions', excerpt: 'TRYVION TALENT offers specialist SAP talent acquisition, permanent technology hiring, and executive search for CIO, CTO and transformation leadership roles — connecting organisations with the expertise their programmes need.', tag: 'Launch' },
  { date: 'August 2026', headline: 'TRYVION OPERATE launches intelligent SAP managed services', excerpt: 'TRYVION OPERATE delivers a modern managed services model combining SAP expertise, automation, Business AI and proactive monitoring — moving organisations from reactive support to continuous innovation.', tag: 'Launch' },
  { date: 'August 2026', headline: 'TRYVION publishes Enterprise AI Strategy Framework', excerpt: 'Our six-phase ALIGN → ASSESS → PRIORITIZE → DESIGN → BUILD → REALISE framework helps organisations move AI from ambition to measurable business impact — connecting strategy to execution across the full AI lifecycle.', tag: 'Research' },
  { date: 'August 2026', headline: 'TRYVION announces founding leadership and advisory council', excerpt: 'TRYVION was founded by Meena Thevi Kandasamy, with 25+ years of global SAP leadership. The advisory council brings together technology leaders, industry experts and academic advisors to support TRYVION\'s growth.', tag: 'Company' },
]

const TAG_COLORS: Record<string, string> = {
  Launch: '#1458F2',
  Product: '#C9A24B',
  Research: '#7C3AED',
  Company: '#10B981',
}

export default function NewsroomPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Newsroom</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '40rem', position: 'relative' }}>
          Latest from{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TRYVION</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative' }}>
          News, announcements, and press releases from TRYVION globally.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {NEWS.map((item) => (
          <div key={item.headline} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>{item.date}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: TAG_COLORS[item.tag] || '#1458F2', background: `${TAG_COLORS[item.tag] || '#1458F2'}18`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{item.tag}</span>
            </div>
            <h2 style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{item.headline}</h2>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{item.excerpt}</p>
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>Media enquiries</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            For press enquiries, interview requests, or analyst briefings, please contact our communications team.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Contact PR team
          </Link>
        </div>
      </section>
    </main>
  )
}
