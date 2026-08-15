import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'TRYVION terms of use governing access to and use of our website and digital services.',
  alternates: { canonical: 'https://thetryvion.com/terms' },
}

const SECTIONS = [
  { heading: '1. Acceptance of Terms', body: 'By accessing or using the TRYVION website (tryvion.com) and any associated digital services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website. TRYVION reserves the right to modify these terms at any time, with changes effective upon posting to this page.' },
  { heading: '2. Intellectual Property', body: 'All content on this website, including text, graphics, logos, images, and software, is the property of TRYVION or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without express written permission from TRYVION.' },
  { heading: '3. Use Restrictions', body: 'You agree not to use this website in any manner that could damage, disable, or impair the website, or interfere with any other party\'s use. You may not attempt to gain unauthorised access to any part of the website or its related systems. Scraping, crawling, or automated data extraction without prior written consent is prohibited.' },
  { heading: '4. Disclaimer of Warranties', body: 'This website is provided "as is" without warranty of any kind, express or implied. TRYVION does not warrant that the website will be uninterrupted or error-free, that defects will be corrected, or that this site or the servers making it available are free of viruses or other harmful components.' },
  { heading: '5. Limitation of Liability', body: 'To the fullest extent permitted by applicable law, TRYVION shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website or its content, even if TRYVION has been advised of the possibility of such damages.' },
  { heading: '6. Third-Party Links', body: 'This website may contain links to third-party websites. These links are provided for convenience only. TRYVION has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.' },
  { heading: '7. Governing Law', body: 'These Terms of Use shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.' },
  { heading: '8. Contact', body: 'If you have questions about these Terms of Use, please contact us at legal@tryvion.com or by post at TRYVION Limited, Cannon Street, London, EC4N, United Kingdom.' },
]

export default function TermsPage() {
  return (
    <main style={{ background: '#050A18', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 8rem)', maxWidth: '62rem', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(20,88,242,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#1458F2', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.75rem', position: 'relative' }}>Legal</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1rem', position: 'relative' }}>Terms of Use</h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', position: 'relative', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>Last updated: 1 January 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {SECTIONS.map((s) => (
            <div key={s.heading} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2.5rem' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>{s.heading}</h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(4rem, 6vw, 6rem)', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>Cookie Policy</Link>
          <Link href="/accessibility" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>Accessibility</Link>
        </div>
      </section>
    </main>
  )
}
