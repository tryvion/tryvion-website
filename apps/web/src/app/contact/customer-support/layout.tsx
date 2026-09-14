import type { Metadata, Viewport } from 'next';

const SITE_URL = 'https://www.thetryvion.com';

export const metadata: Metadata = {
  title: 'Customer Support | TRYVION',
  description:
    'Get support for an existing TRYVION engagement, service or supported environment. Submit a support request and connect with the right specialist team.',
  keywords: [
    'TRYVION customer support',
    'TRYVION support',
    'SAP support',
    'SAP application support',
    'enterprise technology support',
    'AI automation support',
    'managed services support',
  ],
  alternates: {
    canonical: '/contact/customer-support',
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
    url: `${SITE_URL}/contact/customer-support`,
    title: 'Customer Support | TRYVION',
    description:
      'Get assistance with an existing TRYVION engagement, service or supported environment.',
    siteName: 'TRYVION',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Support | TRYVION',
    description:
      'Get assistance with an existing TRYVION engagement, service or supported environment.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071C35',
};

export default function CustomerSupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'TRYVION Customer Support',
    url: `${SITE_URL}/contact/customer-support`,
    description:
      'Customer support and service request page for existing TRYVION customers and supported environments.',
    publisher: {
      '@type': 'Organization',
      name: 'TRYVION',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'TRYVION',
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: ['English'],
      },
    },
  };

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
