import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Subscribe to TRYVION Insights',
  description: 'Join 12,000+ enterprise technology leaders who receive the TRYVION fortnightly briefing on SAP, cloud, AI, and digital transformation.',
  alternates: { canonical: 'https://tryvion.com/insights/subscribe' },
}

const TOPICS = [
  { label: 'SAP & ERP', accent: '#22D3EE', desc: 'S/4HANA migration, RISE, BTP, and SAP programme management.' },
  { label: 'AI & Data', accent: '#1458F2', desc: 'GenAI in the enterprise, data platforms, and AI governance.' },
  { label: 'Cloud Strategy', accent: '#7C3AED', desc: 'FinOps, cloud architecture, and migration playbooks.' },
  { label: 'Digital Engineering', accent: '#34D399', desc: 'Platform engineering, DevSecOps, and API ecosystems.' },
  { label: 'Talent & Workforce', accent: '#F59E0B', desc: 'Skills market analysis, hiring strategy, and workforce planning.' },
  { label: 'Industry Insights', accent: '#EC4899', desc: 'Sector-specific intelligence across financial services, manufacturing, and healthcare.' },
]

const PROOF = [
  { stat: '12,000+', label: 'Subscribers globally' },
  { stat: 'Fortnightly', label: 'Send cadence' },
  { stat: '4.8 / 5', label: 'Reader satisfaction' },
  { stat: '< 2 min', label: 'To unsubscribe anytime' },
]

export default function SubscribePage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>

      <section style={{ padding: 'clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-300px', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '800px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/insights" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8125rem', textDecoration: 'none' }}>Insights</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600 }}>Subscribe</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start', position: 'relative' }}>
          <div>
            <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
              TRYVION Insights Briefing
            </p>
            <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem' }}>
              Stay ahead of{' '}
              <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                enterprise technology
              </span>
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '3rem' }}>
              Every two weeks, our practice leads distil what matters in SAP, cloud, AI, and digital transformation into a briefing that enterprise technology leaders actually read.
            </p>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              {PROOF.map((p) => (
                <div key={p.stat}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>{p.stat}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{p.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.015em', marginBottom: '0.625rem' }}>Get the briefing</h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', lineHeight: 1.65 }}>
              Free. Fortnightly. No spam — ever. Unsubscribe in one click.
            </p>
            <form action="/contact" method="GET" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="sub-name" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '0.5rem' }}>Full name</label>
                <input
                  id="sub-name"
                  type="text"
                  placeholder="Jane Smith"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9375rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label htmlFor="sub-email" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '0.5rem' }}>Work email</label>
                <input
                  id="sub-email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9375rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label htmlFor="sub-role" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '0.5rem' }}>Job title</label>
                <input
                  id="sub-role"
                  type="text"
                  placeholder="CTO, VP Technology…"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.625rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9375rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button
                type="submit"
                style={{ marginTop: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', border: 'none', borderRadius: '0.75rem', padding: '1rem 2rem', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer', width: '100%' }}
              >
                Subscribe — it&apos;s free
              </button>
            </form>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '1.25rem', lineHeight: 1.65, textAlign: 'center' }}>
              By subscribing you agree to our{' '}
              <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Privacy Policy</Link>.
              We will never share your data with third parties.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(4rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 8rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>What we cover</p>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '3rem', maxWidth: '36rem' }}>
          Every edition distils what matters across six practice areas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {TOPICS.map((topic) => (
            <div key={topic.label} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.25rem', padding: '2rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: `${topic.accent}18`, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', background: topic.accent }} />
              </div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', marginBottom: '0.625rem' }}>{topic.label}</h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Want to see an edition first?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Browse our latest insights before you subscribe.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
              Browse insights
            </Link>
            <Link href="/insights/topics" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.65)', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem', border: '1px solid rgba(255,255,255,0.12)' }}>
              View topics
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
