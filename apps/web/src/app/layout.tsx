import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteThemeProvider } from '@/providers/SiteThemeProvider'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { publicEnv } from '@/lib/env'
import './globals.css'

/*
 * Manrope — OFL licensed; safe for production use.
 * CSS variable --font-manrope is picked up by globals.css @theme inline block
 * to override --font-secondary with the optimised next/font value.
 *
 * Neue Haas Grotesk (primary) and Optima (tertiary) require commercial licenses
 * before production. See docs/source-of-truth.md STT-001.
 */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B1E3D',
}

export const metadata: Metadata = {
  title: {
    template: '%s | TRYVION',
    default: 'TRYVION — The Future Is a Choice',
  },
  description:
    'TRYVION is a global Enterprise Transformation Partner specialising in SAP, AI, Data & Analytics, Cloud, Digital Engineering, Talent Solutions, and Managed Services.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thetryvion.com',
  ),
  openGraph: {
    siteName: 'TRYVION',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TRYVION',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" data-density="comfortable" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[var(--color-surface-default)] text-[var(--color-content-primary)]">

        {/* WCAG 2.4.1 — skip navigation */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <SiteThemeProvider>
          <SiteHeader />

          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 outline-none"
          >
            {children}
          </main>

          <SiteFooter />

          {/* GDPR cookie consent — client component, appears after first visit */}
          <CookieBanner />
        </SiteThemeProvider>

        {/* GA4 — only renders when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {publicEnv.GA_ID && <GoogleAnalytics gaId={publicEnv.GA_ID} />}

      </body>
    </html>
  )
}
