import type { Metadata, Viewport } from 'next';
import { PageStructuredData } from '@/components/seo/PageStructuredData';
import { pageMetadata, pageSeo } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.contactCustomerSupport;

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
  return (
    <>
      {children}
      <PageStructuredData page={pageSeo.contactCustomerSupport} />
    </>
  );
}
