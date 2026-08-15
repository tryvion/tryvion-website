import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'TRYVION\'s strategic technology partner ecosystem — SAP, AWS, Microsoft, Google Cloud, and specialist implementation partners.',
  alternates: { canonical: 'https://tryvion.com/about/partners' },
}

const PARTNERS = [
  { name: 'SAP', tier: 'SAP Partner', description: 'TRYVION\'s core partner relationship. Our SAP practice spans S/4HANA Public and Private Edition, SAP BTP, SuccessFactors, Ariba, SAP Business AI and Joule — combining deep functional expertise with clean-core architecture principles across every engagement.', accent: '#1458F2', badge: 'SAP Partner' },
  { name: 'Amazon Web Services', tier: 'Cloud Partner', description: 'AWS partnership supporting cloud transformation, RISE with SAP hosting, infrastructure modernisation, and AI/ML workloads. Our AWS-certified architects and engineers design cloud environments built for enterprise scale, security and operational resilience.', accent: '#F59E0B', badge: 'AWS' },
  { name: 'Microsoft', tier: 'Cloud Partner', description: 'Microsoft partnership covering Azure infrastructure, Microsoft Copilot and Foundry AI, and Microsoft 365 integration. We help organisations leverage Microsoft\'s AI and cloud capabilities alongside their SAP and enterprise transformation programmes.', accent: '#22D3EE', badge: 'Microsoft' },
  { name: 'Google Cloud', tier: 'Cloud Partner', description: 'Google Cloud partnership for data analytics, AI/ML, and infrastructure workloads. TRYVION combines Google Gemini and Vertex AI capabilities with enterprise data strategy to help organisations build AI-powered operations.', accent: '#34D399', badge: 'Google Cloud' },
  { name: 'OpenAI', tier: 'Technology Partner', description: 'OpenAI Enterprise integration enabling organisations to deploy GPT models securely for document intelligence, enterprise co-pilots, and AI-powered process automation — within a responsible AI governance framework.', accent: '#7C3AED', badge: 'OpenAI' },
  { name: 'Anthropic', tier: 'Technology Partner', description: 'Anthropic Claude integration for complex knowledge work, document analysis, and enterprise AI applications requiring high reasoning capability with strong safety and alignment properties.', accent: '#EC4899', badge: 'Anthropic' },
]

export default function PartnersPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Partners</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-150px', right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>About TRYVION</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          Best-in-class partners.{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Integrated delivery.
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '48rem', lineHeight: 1.7, position: 'relative' }}>
          TRYVION builds its practice around the world&rsquo;s leading enterprise technology platforms. Our independence means we recommend the right tool for your situation — not the tool we are most incentivised to sell.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {PARTNERS.map((p) => (
            <div key={p.name} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.5rem', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>{p.name}</h2>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: p.accent, background: `${p.accent}18`, padding: '0.3rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0 }}>{p.badge}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: p.accent, fontWeight: 600, marginBottom: '1rem' }}>{p.tier}</p>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem', textAlign: 'center' }}>
            How we partner
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '4rem', textAlign: 'center', maxWidth: '44rem', margin: '0 auto 4rem' }}>
            Our partnerships are built on technical depth, shared standards, and mutual accountability for client outcomes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Independent advice', desc: 'We recommend the best platform for your needs, regardless of partner incentives.' },
              { title: 'Certified expertise', desc: 'Our certifications span the full stack — not just entry-level badges.' },
              { title: 'Co-delivery model', desc: 'We work alongside vendor professional services teams when it adds value.' },
              { title: 'Shared accountability', desc: 'Partner SLAs flow through to our client delivery commitments.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.25rem', padding: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Become a TRYVION partner
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            We partner with specialist technology and advisory firms that complement our capabilities. Contact our partnerships team to explore opportunities.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}
