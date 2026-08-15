import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how TRYVION uses cookies and similar tracking technologies on our website.',
  alternates: { canonical: 'https://thetryvion.com/cookies' },
}

const COOKIE_TYPES = [
  { name: 'Strictly necessary cookies', desc: 'These cookies are required for the website to function and cannot be switched off. They are usually set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.', canOptOut: false, accent: '#34D399' },
  { name: 'Performance cookies', desc: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are most and least popular. All information collected is aggregated and anonymous.', canOptOut: true, accent: '#818CF8' },
  { name: 'Functional cookies', desc: 'These cookies enable enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these cookies, some or all of these services may not function properly.', canOptOut: true, accent: '#22D3EE' },
  { name: 'Targeting cookies', desc: 'These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information.', canOptOut: true, accent: '#C084FC' },
]

export default function CookiesPage() {
  return (
    <main style={{ background: '#04040E', minHeight: '100vh', color: '#fff' }}>
      <section style={{ padding: '7rem 2rem 4rem', maxWidth: '56rem', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <p style={{ color: '#818CF8', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', position: 'relative' }}>Legal</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', position: 'relative' }}>Cookie Policy</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', position: 'relative', marginBottom: '2rem' }}>Last updated: 1 January 2026</p>

        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '3rem' }}>
          TRYVION uses cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and understand where our visitors are coming from. This policy explains what cookies are, how we use them, and how you can manage your preferences.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>What are cookies?</h2>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '3rem' }}>
          Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, and to provide reporting information.
        </p>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Types of cookies we use</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
          {COOKIE_TYPES.map((type) => (
            <div key={type.name} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.875rem', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>{type.name}</h3>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: type.canOptOut ? type.accent : '#34D399', background: type.canOptOut ? `${type.accent}14` : 'rgba(52,211,153,0.12)', padding: '0.2rem 0.6rem', borderRadius: '999px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {type.canOptOut ? 'Optional' : 'Required'}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{type.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Managing your preferences</h2>
        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '2rem' }}>
          You can manage your cookie preferences at any time using the cookie settings link in the footer of our website. You can also delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website.
        </p>

        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '3rem' }}>
          For more information about how we use personal data, please see our <Link href="/privacy" style={{ color: '#818CF8' }}>Privacy Policy</Link>.
        </p>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/accessibility" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', textDecoration: 'none' }}>Accessibility</Link>
        </div>
      </section>
    </main>
  )
}
