import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the senior leaders who guide TRYVION\'s strategy, client relationships, and global delivery.',
  alternates: { canonical: 'https://tryvion.com/about/leadership' },
}

const FOUNDERS = [
  {
    name: 'Meena Thevi Kandasamy',
    title: 'Founder & Chief Executive',
    bio: 'Meena leads TRYVION\'s vision of helping organisations accelerate business transformation through SAP S/4HANA Cloud, AI, and intelligent enterprise solutions. Her mission is to simplify complex transformations by combining industry best practices, clean core principles, and pragmatic delivery — enabling customers to maximise value from their digital investments. With over 25 years of experience in SAP consulting and business transformation, Meena has successfully led global ERP programmes across Financial Services, Professional Services, Manufacturing, Retail, Public Sector, and Energy. Her expertise spans enterprise architecture, finance transformation, programme governance, and end-to-end SAP S/4HANA Cloud implementations across Europe, the UK, Asia-Pacific, and the Middle East.',
    initials: 'MK',
    accent: '#1458F2',
  },
]

const ADVISORS = [
  {
    name: 'Deon',
    title: 'Technology Leader — Advisory Council',
    bio: 'With over two decades of experience leading global enterprise transformation programs, Deon has helped organisations navigate complex digital journeys across SAP SaaS solutions, cloud transformation, and AI-led innovation. Her vision for TRYVION is to build an integrated ecosystem that combines consulting excellence, talent development, and technology innovation to shape the future of intelligent enterprises.',
    initials: 'D',
    accent: '#C9A24B',
  },
]

export default function LeadershipPage() {
  return (
    <main style={{ background: '#04040E', minHeight: '100vh', color: '#fff' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '1.5rem 2rem 0', maxWidth: '72rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Leadership Team</span>
        </nav>
      </div>

      {/* Hero */}
      <section style={{ padding: '4rem 2rem 5rem', maxWidth: '72rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(20,88,242,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', position: 'relative' }}>Founding Leadership</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '42rem', position: 'relative' }}>
          Meet the{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Visionaries
          </span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.55)', maxWidth: '52rem', lineHeight: 1.7, position: 'relative' }}>
          TRYVION is led by experienced enterprise technology professionals who have spent decades delivering business transformation across industries and global markets. As our organisation grows, our leadership team will continue to expand with experts who share our passion for innovation, customer success, and developing future-ready talent.
        </p>
      </section>

      {/* Founding Leadership */}
      <section style={{ padding: '0 2rem 5rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#C9A24B', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Founding Leader</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {FOUNDERS.map((leader) => (
            <div key={leader.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: `linear-gradient(135deg, ${leader.accent}40, ${leader.accent}18)`, border: `1px solid ${leader.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem', fontWeight: 700, color: leader.accent }}>
                  {leader.initials}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{leader.name}</h2>
                  <p style={{ fontSize: '0.8125rem', color: leader.accent, fontWeight: 600 }}>{leader.title}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{leader.bio}</p>
            </div>
          ))}
        </div>

        {/* Advisory Council */}
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Our Advisory Council</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {ADVISORS.map((leader) => (
            <div key={leader.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: `linear-gradient(135deg, ${leader.accent}30, ${leader.accent}10)`, border: `1px solid ${leader.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.875rem', fontWeight: 700, color: leader.accent }}>
                  {leader.initials}
                </div>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{leader.name}</h2>
                  <p style={{ fontSize: '0.8125rem', color: leader.accent, fontWeight: 600 }}>{leader.title}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{leader.bio}</p>
            </div>
          ))}
          {/* Placeholder cards for future advisors */}
          {['Industry Experts', 'Academic Advisors', 'Innovation Partners'].map((category) => (
            <div key={category} style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
              <p style={{ color: 'rgba(255,255,255,0.20)', fontSize: '0.8125rem', fontWeight: 600, textAlign: 'center' }}>{category}<br /><span style={{ fontWeight: 400, fontSize: '0.75rem' }}>Joining soon</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(20,88,242,0.05)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Build with TRYVION
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            We are looking for people who want to shape what enterprise transformation looks like next.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #0B1E3D, #1458F2)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              View open roles
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '0.875rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
