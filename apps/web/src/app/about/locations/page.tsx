import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Global Presence',
  description: 'TRYVION operates across 18 countries with delivery hubs in London, New York, Singapore, and Dubai.',
  alternates: { canonical: 'https://tryvion.com/about/locations' },
}

const REGIONS = [
  {
    region: 'Europe',
    accent: '#1458F2',
    offices: [
      { city: 'London', country: 'United Kingdom', type: 'Global Headquarters', detail: 'Cannon Street, EC4N — Our global strategy, sales, and executive leadership hub.' },
      { city: 'Frankfurt', country: 'Germany', type: 'Delivery Centre', detail: 'Bockenheimer Landstraße — SAP centre of excellence serving DACH and continental Europe.' },
      { city: 'Amsterdam', country: 'Netherlands', type: 'Delivery Centre', detail: 'Zuidas Business District — Cloud and digital engineering hub for Benelux and Nordic markets.' },
      { city: 'Madrid', country: 'Spain', type: 'Delivery Hub', detail: 'Paseo de la Castellana — Serving Iberia and Latin American markets.' },
    ],
  },
  {
    region: 'Americas',
    accent: '#22D3EE',
    offices: [
      { city: 'New York', country: 'United States', type: 'Americas Headquarters', detail: 'Hudson Yards, Manhattan — Financial services practice lead and Americas client operations.' },
      { city: 'Chicago', country: 'United States', type: 'Delivery Centre', detail: 'Willis Tower District — Manufacturing and healthcare sector delivery hub.' },
      { city: 'Toronto', country: 'Canada', type: 'Delivery Hub', detail: 'Financial District — Serving Canadian banking and insurance clients.' },
      { city: 'São Paulo', country: 'Brazil', type: 'Growth Office', detail: 'Faria Lima — Serving major Brazilian enterprise clients across financial services and retail.' },
    ],
  },
  {
    region: 'Asia Pacific & Middle East',
    accent: '#C9A24B',
    offices: [
      { city: 'Singapore', country: 'Singapore', type: 'APAC Headquarters', detail: 'Marina Bay Financial Centre — APAC strategy, client relations, and programme governance.' },
      { city: 'Dubai', country: 'UAE', type: 'Middle East Headquarters', detail: 'DIFC — Serving GCC financial services, energy, and public sector clients.' },
      { city: 'Sydney', country: 'Australia', type: 'Delivery Hub', detail: 'CBD — Serving Australian banking, mining, and utilities clients.' },
      { city: 'Mumbai', country: 'India', type: 'Global Delivery Centre', detail: 'BKC — 800+ delivery specialists supporting global programme delivery.' },
    ],
  },
]

export default function LocationsPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Global Presence</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>About TRYVION</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          Global reach.{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Local depth.
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '48rem', lineHeight: 1.7, position: 'relative' }}>
          TRYVION operates across 18 countries with major delivery centres in London, New York, Singapore, Dubai, and Mumbai — bringing global scale with the local knowledge your enterprise programme demands.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem)', maxWidth: '82rem', margin: '0 auto', marginBottom: 'clamp(4rem, 6vw, 6rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.07)', borderRadius: '1.25rem', overflow: 'hidden' }}>
          {[
            { v: 'Global', l: 'Enterprise reach across key markets' },
            { v: 'SAP + AI', l: 'Core transformation capability' },
            { v: '3 Pillars', l: 'Transformation, Academy, Talent' },
            { v: 'Growing', l: 'A practice being built now' },
          ].map((s) => (
            <div key={s.l} style={{ background: '#050A18', padding: '2.5rem 2rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #1458F2, #C9A24B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.625rem' }}>{s.v}</div>
              <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 6vw, 6rem)' }}>
        {REGIONS.map((region) => (
          <div key={region.region}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: region.accent, marginBottom: '2rem', letterSpacing: '-0.01em' }}>{region.region}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {region.offices.map((office) => (
                <div key={office.city} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.25rem', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff' }}>{office.city}</h3>
                      <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>{office.country}</p>
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: region.accent, background: `${region.accent}18`, padding: '0.3rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0 }}>{office.type}</span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{office.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Work with a team near you
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            Our offices combine local client proximity with global delivery capability. Contact the team to discuss your requirements.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Contact us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '1rem', height: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
