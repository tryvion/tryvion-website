import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pageMetadata, pageSeo } from '@/lib/seo/pages';
import { PageStructuredData } from '@/components/seo/PageStructuredData';

export const metadata: Metadata = pageMetadata.ourStory;

export default function OurStoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PageStructuredData page={pageSeo.ourStory} />
    </>
  );
}
