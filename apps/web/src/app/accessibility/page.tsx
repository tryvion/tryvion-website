import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'TRYVION\'s commitment to digital accessibility and our approach to making our website usable for everyone.',
  alternates: { canonical: 'https://thetryvion.com/accessibility' },
}

export default function AccessibilityPage() {
  return (
    <main style={{ background: '#04040E', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: '7rem 2rem 6rem', maxWidth: '56rem', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(52,211,153,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#818CF8', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', position: 'relative' }}>Legal</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', position: 'relative' }}>Accessibility Statement</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', position: 'relative', marginBottom: '3rem' }}>Last updated: 1 January 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {[
            {
              heading: 'Our commitment',
              body: 'TRYVION is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to our website and digital properties.',
            },
            {
              heading: 'Conformance status',
              body: 'The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. TRYVION\'s website aims to conform to WCAG 2.1 Level AA. We conduct regular accessibility audits and address identified issues in our release cycles.',
            },
            {
              heading: 'Technical specifications',
              body: 'Accessibility of our website relies on the following technologies: HTML, CSS, JavaScript, and WAI-ARIA. These technologies are relied upon for conformance with the WCAG success criteria. Our website is tested using screen readers (NVDA, VoiceOver, JAWS), keyboard navigation, and automated accessibility testing tools.',
            },
            {
              heading: 'Known limitations',
              body: 'While we strive for full WCAG 2.1 AA conformance, some older PDF documents and third-party embedded content may not meet all accessibility criteria. We are working to address these limitations and aim to have all content accessible by the end of 2026.',
            },
            {
              heading: 'Feedback and contact',
              body: 'We welcome feedback on the accessibility of our website. If you encounter accessibility barriers or need content in an alternative format, please contact our team. We aim to respond to accessibility feedback within 2 business days.',
            },
            {
              heading: 'Formal complaints',
              body: 'If you are not satisfied with our response to your accessibility feedback, you may contact the Equality Advisory and Support Service (EASS) in the UK, or the relevant accessibility authority in your jurisdiction.',
            },
          ].map((s) => (
            <div key={s.heading}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>{s.heading}</h2>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '0.875rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Contact our accessibility team</h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            Email: accessibility@tryvion.com<br />
            Phone: +44 (0)20 7123 4567<br />
            Post: TRYVION Limited, Cannon Street, London, EC4N, United Kingdom
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#34D399', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            Contact us online
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: '0.75rem', height: '0.75rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Cookie Policy</Link>
        </div>
      </section>
    </main>
  )
}
