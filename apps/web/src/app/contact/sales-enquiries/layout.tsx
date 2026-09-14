import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thetryvion.com').replace(/\/+$/, '')
const canonical = `${siteUrl}/contact/sales-enquiries`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Sales Enquiries | TRYVION',
  description:
    'Connect with TRYVION to discuss services, solutions, commercial opportunities, partnerships, or an active business requirement.',
  keywords: [
    'TRYVION sales enquiries',
    'enterprise transformation consulting',
    'SAP consulting',
    'enterprise AI',
    'business transformation',
    'technology consulting',
  ],
  alternates: {
    canonical,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: canonical,
    title: 'Sales Enquiries | TRYVION',
    description:
      'Connect with TRYVION to discuss services, solutions, commercial opportunities, partnerships, or an active business requirement.',
    siteName: 'TRYVION',
    locale: 'en_US',
    images: [
      {
        url: '/images/sales-enquiries-hero.png',
        width: 424,
        height: 420,
        alt: 'TRYVION sales enquiry consultation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Enquiries | TRYVION',
    description:
      'Connect with TRYVION to discuss services, solutions, commercial opportunities, partnerships, or an active business requirement.',
    images: ['/images/sales-enquiries-hero.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'TRYVION Sales Enquiries',
  description:
    'Connect with TRYVION to discuss services, solutions, commercial opportunities, partnerships, or an active business requirement.',
  url: canonical,
  isPartOf: {
    '@type': 'WebSite',
    name: 'TRYVION',
    url: siteUrl,
  },
  about: {
    '@type': 'Organization',
    name: 'TRYVION',
    url: siteUrl,
  },
}

export default function SalesEnquiriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="sales-enquiries-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}
