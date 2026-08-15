import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Values — TRYVION',
  description: 'At TRYVION, our values are the foundation of everything we do. They shape how we think, how we collaborate, how we innovate, and how we deliver meaningful outcomes.',
  alternates: { canonical: 'https://tryvion.com/about/values' },
}

const VALUES = [
  {
    name: 'Vision with Purpose',
    description: 'Every transformation begins with a clear vision and a defined purpose. At TRYVION, we challenge conventional thinking, embrace innovation, and work alongside our clients to turn ambition into meaningful outcomes. By combining strategic insight with practical execution, we help organisations navigate change with confidence and build a future that creates lasting value.',
    accent: '#1458F2',
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    name: 'Customer Success',
    description: 'Our clients\' success defines our success. We build trusted partnerships, take the time to understand each organisation\'s unique ambitions and challenges, and deliver solutions that create measurable business value. Our commitment extends beyond implementation — we focus on achieving sustainable outcomes that help our clients transform, grow, and thrive.',
    accent: '#C9A24B',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    name: 'Innovation at the Core',
    description: 'Innovation is at the heart of TRYVION. We combine SAP, AI, cloud technologies, intelligent automation, and industry best practices to help organisations transform beyond today\'s challenges. By continually reimagining how business can be simplified, optimised, and accelerated, we turn bold ideas into practical solutions that deliver lasting value.',
    accent: '#7C3AED',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  },
  {
    name: 'People First',
    description: 'People are the foundation of every successful transformation. At TRYVION, we empower individuals through continuous learning, collaboration, and professional growth — building high-performing teams that deliver exceptional outcomes and shape the future with purpose. Technology succeeds only when people do.',
    accent: '#10B981',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    name: 'Excellence in Execution',
    description: 'Great ideas create value only through outstanding execution. Excellence is our standard, not our aspiration. At TRYVION, we deliver with precision, accountability, and unwavering commitment — turning vision into measurable outcomes through continuous improvement and lasting business impact.',
    accent: '#F59E0B',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    name: 'Trust & Integrity',
    description: 'Trust is the foundation of every successful partnership. At TRYVION, we act with integrity, transparency, and accountability in everything we do — building lasting relationships through honesty, consistency, and a commitment to doing what is right, for our clients, our partners, our team and our communities.',
    accent: '#0891B2',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    name: 'Learn. Adapt. Grow.',
    description: 'Technology never stands still — and neither do we. At TRYVION, we foster a culture of curiosity, continuous learning, and adaptability, empowering our people to stay ahead of change, expand their expertise, and transform knowledge into meaningful value for our clients.',
    accent: '#7C3AED',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    name: 'One Team, One Ecosystem',
    description: 'At TRYVION, collaboration is the foundation of every successful transformation. We believe the best ideas and outcomes are created by working as one team with our people, clients, partners, and expert network. Together, we combine diverse expertise to solve complex challenges, transform vision into value, and deliver lasting business impact.',
    accent: '#EC4899',
    icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
  },
]

export default function ValuesPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Our Values</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Our Values</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          The foundation of{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            everything we do
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '48rem', lineHeight: 1.7, position: 'relative' }}>
          Our values shape how we think, how we collaborate, how we innovate, and how we deliver meaningful outcomes for every client we work with.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
          {VALUES.map((v) => (
            <div key={v.name} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: `${v.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={v.accent} strokeWidth={1.5} style={{ width: '1.375rem', height: '1.375rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem' }}>{v.name}</h2>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', lineHeight: 1, color: 'rgba(255,255,255,0.07)', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>&ldquo;</div>
          <p style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '2.5rem' }}>
            The future is a choice — and how we build it is defined by the values we commit to, every day, in every engagement.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Meena Thevi Kandasamy — Founder & Chief Executive, TRYVION</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Join a team that lives these values
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            We hire people who share these principles — and give them the space to build something that matters.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Explore careers
            </Link>
            <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Our story
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
