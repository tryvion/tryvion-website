import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'TRYVION\'s certification approach — how we build and validate technical depth across SAP, cloud, AI, and delivery disciplines.',
  alternates: { canonical: 'https://tryvion.com/about/certifications' },
}

const CERT_TRACKS = [
  {
    category: 'SAP',
    accent: '#1458F2',
    description: 'SAP certification is the baseline for every TRYVION consultant working on S/4HANA, BTP, and SAP Business AI engagements. We invest in continuous SAP training and certification across functional, technical, and platform disciplines.',
    areas: [
      { name: 'SAP S/4HANA', detail: 'Finance, Logistics, Manufacturing, Professional Services — functional and technical certification for each module our consultants deliver.' },
      { name: 'SAP BTP', detail: 'Integration Suite, SAP Build, Extension development, and SAP Business AI / Joule — platform certifications aligned to TRYVION\'s clean-core delivery approach.' },
      { name: 'SAP SuccessFactors', detail: 'Employee Central, Recruiting, Learning, and Performance — certifications across the full HXM suite.' },
      { name: 'SAP Activate', detail: 'SAP\'s formal project methodology certification — required for all TRYVION project managers and programme leads on S/4HANA implementations.' },
    ],
  },
  {
    category: 'Cloud',
    accent: '#22D3EE',
    description: 'TRYVION consultants working on cloud transformation programmes hold active certifications from the hyperscaler providers we partner with — AWS, Microsoft Azure, and Google Cloud.',
    areas: [
      { name: 'Amazon Web Services', detail: 'Cloud Practitioner, Solutions Architect, Data Analytics, and Machine Learning certifications across our cloud practice.' },
      { name: 'Microsoft Azure', detail: 'Azure Fundamentals, Azure Administrator, Azure Solutions Architect, and Azure AI Engineer certifications across TRYVION\'s cloud and AI teams.' },
      { name: 'Google Cloud', detail: 'Google Cloud Associate and Professional certifications covering data engineering, AI/ML, and infrastructure.' },
      { name: 'RISE with SAP', detail: 'SAP\'s cloud-specific certification programme for consultants delivering S/4HANA cloud migrations and managed cloud transitions.' },
    ],
  },
  {
    category: 'AI & Data',
    accent: '#7C3AED',
    description: 'As AI becomes central to enterprise transformation, TRYVION invests in certifications that span AI strategy, model deployment, responsible AI, and data platform engineering.',
    areas: [
      { name: 'SAP Business AI', detail: 'SAP\'s AI certification programme covering Joule, embedded AI features in S/4HANA, and BTP AI Core / AI Launchpad.' },
      { name: 'Microsoft AI & Copilot', detail: 'Azure AI Engineer, Microsoft Copilot Studio, and Microsoft Foundry certifications for TRYVION\'s enterprise AI practice.' },
      { name: 'OpenAI Enterprise', detail: 'OpenAI platform certifications and enterprise deployment training — covering GPT model integration, prompt engineering, and responsible deployment.' },
      { name: 'Data Engineering', detail: 'Certifications spanning cloud-native data engineering, lakehouse architecture, and data product development across major platforms.' },
    ],
  },
  {
    category: 'Delivery & Project Management',
    accent: '#C9A24B',
    description: 'Enterprise transformation programmes require structured delivery discipline. TRYVION\'s project leadership holds certifications in leading delivery frameworks used across our client base.',
    areas: [
      { name: 'PMP — Project Management Professional', detail: 'PMI\'s global standard for project management — held by TRYVION project managers and programme leads.' },
      { name: 'PRINCE2 / PRINCE2 Agile', detail: 'Widely used in UK and European enterprise programmes — certification across our delivery leadership.' },
      { name: 'SAFe — Scaled Agile Framework', detail: 'For clients running large-scale agile transformations alongside SAP and enterprise technology implementations.' },
      { name: 'ITIL 4', detail: 'ITIL Foundation and Practitioner certifications supporting TRYVION OPERATE\'s managed services delivery model.' },
    ],
  },
]

export default function CertificationsPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3.5rem) 0', maxWidth: '82rem', margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Certifications</span>
        </nav>
      </div>

      <section style={{ padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)', maxWidth: '82rem', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>About TRYVION</p>
        <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '42rem', position: 'relative' }}>
          Certified expertise,{' '}
          <span style={{ background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            proven in delivery
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '48rem', lineHeight: 1.7, position: 'relative' }}>
          TRYVION consultants hold active certifications from SAP, the major cloud providers, and leading AI platforms. Certification is a baseline — not a differentiator. What matters is how that expertise is applied in the field.
        </p>
      </section>

      <section style={{ padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)', maxWidth: '82rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 6vw, 6rem)' }}>
        {CERT_TRACKS.map((track) => (
          <div key={track.category}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: track.accent, marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>{track.category}</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '56rem' }}>{track.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {track.areas.map((area) => (
                <div key={area.name} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '1.25rem', padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: `${track.accent}18`, border: `1px solid ${track.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={track.accent} strokeWidth={2} style={{ width: '0.875rem', height: '0.875rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{area.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, paddingLeft: '2.625rem' }}>{area.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)', background: 'rgba(20,88,242,0.06)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1.25rem', textAlign: 'center' }}>
            How we approach credentials
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '4rem', textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            Certifications confirm foundational knowledge. They are the starting point, not the end state. TRYVION&apos;s model combines certified expertise with deep delivery experience — pairing formal credentials with the hard-won judgement that comes from running real enterprise programmes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Continuous investment', desc: 'Certification is ongoing. Our team maintains active credentials and stays current with platform updates and new certification tracks.' },
              { title: 'Aligned to delivery', desc: 'We certify in the platforms we actually use — not for portfolio completeness, but because our clients deserve validated expertise.' },
              { title: 'Experience first', desc: 'Certifications confirm knowledge. Delivery track record — the programmes run, the problems solved — is what demonstrates competence.' },
              { title: 'Transparent about scope', desc: 'TRYVION is a growing practice. We are honest about what we currently hold and what we are building toward.' },
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
            Questions about our expertise?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '3rem' }}>
            If you have specific requirements around certifications or credentials for a procurement process, get in touch and we will provide the detail you need.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1458F2, #0B1E3D)', color: '#fff', padding: '1rem 2.25rem', borderRadius: '0.75rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem' }}>
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}
