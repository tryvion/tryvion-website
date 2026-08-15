import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Life at TRYVION — Grow With TRYVION',
  description: 'Join TRYVION at a stage where you can do more than step into an established role. Help build what comes next — the methodologies, the culture, the ways of working — as part of a growing enterprise transformation practice.',
  alternates: { canonical: 'https://tryvion.com/careers/life' },
}

const PILLARS = [
  {
    title: 'Grow With TRYVION',
    desc: 'You are joining at a stage where you can shape what this company becomes — not just step into an established role. TRYVION is being built now. The people who join at this stage help define how it works, how it thinks, and how it delivers.',
    accent: '#1458F2',
    icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  },
  {
    title: 'Build, Don\'t Just Inherit',
    desc: 'At TRYVION, early team members do not follow a playbook — they write one. You will contribute to how we develop solutions, structure engagements, build client relationships and grow a practice. The opportunity is to leave a lasting mark on the organisation itself.',
    accent: '#C9A24B',
    icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
  {
    title: 'Real Enterprise Impact',
    desc: 'TRYVION engagements are enterprise-critical. You will work on SAP S/4HANA transformations, AI strategy programmes and cloud migrations that fundamentally change how organisations operate. The problems are real, the stakes are real, and the impact is visible.',
    accent: '#10B981',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
  {
    title: 'Learn Through SkillVerse',
    desc: 'TRYVION Academy\'s SkillVerse platform gives you access to enterprise technology learning paths, SAP certifications, and AI capability training built around real transformation experience. Continuous learning is not a benefit — it is how the work gets done.',
    accent: '#7C3AED',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    title: 'One Team, One Ecosystem',
    desc: 'You are not siloed in a practice. TRYVION Transformation, TRYVION Academy and TRYVION Talent work together as one ecosystem. You will collaborate across capability areas, learn from specialists across the full breadth of what TRYVION delivers.',
    accent: '#0891B2',
    icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
  },
  {
    title: 'People First',
    desc: 'People are the foundation of every transformation — and TRYVION takes that seriously internally as well as for clients. We invest in your development, support your growth, and build a culture where doing your best work is the expectation, not the exception.',
    accent: '#EC4899',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
]

const WHAT_WE_LOOK_FOR = [
  {
    quality: 'Ambition to build',
    description: 'People who want to create something, not just contribute to something that already exists.',
  },
  {
    quality: 'SAP or enterprise technology depth',
    description: 'Genuine expertise across SAP S/4HANA, SuccessFactors, BTP, AI, cloud or related domains.',
  },
  {
    quality: 'Client-first instinct',
    description: 'People who define success by client outcomes, not by the quality of their slide decks.',
  },
  {
    quality: 'Collaborative by nature',
    description: 'TRYVION works as one ecosystem. The best people here make everyone around them better.',
  },
]

export default function LifeAtTryvionPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/careers" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Life at TRYVION</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Life at TRYVION</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          Join us while{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            we&rsquo;re building it
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '48rem', lineHeight: 1.7, position: 'relative' }}>
          TRYVION is a growing enterprise transformation practice. The people who join now are not stepping into an established firm — they are shaping what it becomes. That is a different kind of opportunity.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: `${p.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth={1.5} style={{ width: '1.375rem', height: '1.375rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '0.875rem' }}>{p.title}</h2>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>What we look for</p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '4rem', maxWidth: '36rem' }}>
            The qualities that thrive here
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {WHAT_WE_LOOK_FOR.map((item) => (
              <div key={item.quality}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#1458F2', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{item.quality}</h3>
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, paddingLeft: '1.25rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)' }}>
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(20,88,242,0.14) 0%, rgba(11,30,61,0.5) 100%)', border: '1px solid rgba(20,88,242,0.22)', borderRadius: '2rem', padding: 'clamp(2.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>TRYVION Academy</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1rem' }}>
                SkillVerse — learn as you build
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '40rem' }}>
                Our enterprise technology learning platform covers SAP S/4HANA, SuccessFactors, BTP, AI and cloud — aligned to real transformation programmes. TRYVION people grow through structured learning paths built around the work we actually do.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(20,88,242,0.25)', border: '1px solid rgba(20,88,242,0.45)', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
                Explore SkillVerse
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Ready to build with us?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Browse our current openings or send us your CV. We are always interested in exceptional SAP, AI and enterprise technology talent who want to do more than just deliver — they want to shape what comes next.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/careers/roles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              View open roles
            </Link>
            <Link href="/about/values" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.15)' }}>
              Our values
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
