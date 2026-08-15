import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Events & Webinars',
  description: 'Upcoming TRYVION events, webinars, and industry conferences — join us to explore the future of enterprise technology.',
  alternates: { canonical: 'https://thetryvion.com/events' },
}

const EVENTS = [
  {
    date: 'September 18, 2026',
    title: 'Enterprise AI Readiness: From Strategy to Scale',
    type: 'Webinar',
    desc: 'Our AI practice leads share findings from the 2026 Enterprise AI Readiness Index and a framework for moving AI initiatives from proof of concept to production at scale.',
    accent: '#1458F2',
    register: true,
  },
  {
    date: 'October 7–9, 2026',
    title: 'SAP TechEd 2026 — Las Vegas',
    type: 'Conference',
    desc: 'Join TRYVION at SAP TechEd. Visit our booth to discuss S/4HANA migration, BTP architecture, and our Intelligent Enterprise accelerators with our practice leads.',
    accent: '#22D3EE',
    register: false,
  },
  {
    date: 'October 22, 2026',
    title: 'FinOps for Enterprise: Building a Cost-Conscious Cloud Culture',
    type: 'Webinar',
    desc: 'A practical session on implementing FinOps across multi-cloud environments — covering visibility tooling, chargeback models, and building engineering accountability for cloud spend.',
    accent: '#34D399',
    register: true,
  },
  {
    date: 'November 12, 2026',
    title: 'TRYVION Financial Services Summit — London',
    type: 'In-Person',
    desc: 'Our annual gathering for financial services technology leaders. Featuring keynotes, roundtables, and networking with TRYVION clients and industry peers. By invitation.',
    accent: '#F59E0B',
    register: true,
  },
  {
    date: 'November 18–21, 2026',
    title: 'AWS re:Invent 2026 — Las Vegas',
    type: 'Conference',
    desc: 'TRYVION is at re:Invent 2026. Visit us for demonstrations of our cloud migration accelerators and talks from our AWS architects.',
    accent: '#F59E0B',
    register: false,
  },
  {
    date: 'December 4, 2026',
    title: 'TRYVION Year Ahead: Enterprise Technology Outlook 2027',
    type: 'Webinar',
    desc: 'Our annual outlook webinar for enterprise technology leaders — covering SAP roadmap, AI maturity trends, cloud cost pressures, and talent market conditions for 2027.',
    accent: '#EC4899',
    register: true,
  },
]

const TYPE_COLORS: Record<string, string> = {
  Webinar: '#1458F2',
  Conference: '#22D3EE',
  'In-Person': '#F59E0B',
}

export default function EventsPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(201,162,75,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#C9A24B', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Events & Webinars</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '40rem', position: 'relative' }}>
          Meet us at the{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            frontier
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '44rem', lineHeight: 1.7, position: 'relative' }}>
          Join TRYVION at industry events and our own thought leadership sessions to explore the ideas shaping enterprise technology.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {EVENTS.map((ev) => (
          <div key={ev.title} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>{ev.date}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: TYPE_COLORS[ev.type] || '#1458F2', background: `${TYPE_COLORS[ev.type] || '#1458F2'}18`, padding: '0.25rem 0.75rem', borderRadius: '999px' }}>{ev.type}</span>
              </div>
              <h2 style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem' }}>{ev.title}</h2>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{ev.desc}</p>
            </div>
            {ev.register && (
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#1458F2', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', padding: '0.75rem 1.5rem', border: '1px solid rgba(20,88,242,0.35)', borderRadius: '0.75rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Register
              </Link>
            )}
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>Host TRYVION at your event</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Our practitioners speak on SAP transformation, enterprise AI, cloud architecture, and FinOps at industry events globally.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Speaker enquiries
          </Link>
        </div>
      </section>
    </main>
  )
}
