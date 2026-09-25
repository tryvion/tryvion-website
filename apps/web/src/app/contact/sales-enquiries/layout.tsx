import type { Metadata, Viewport } from 'next';

import { PageStructuredData } from '@/components/seo/PageStructuredData';
import { pageMetadata, pageSeo } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.salesEnquiries;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export default function SalesEnquiriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PageStructuredData page={pageSeo.salesEnquiries} />
    </>
  );
}
