import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { PageStructuredData } from '@/components/seo/PageStructuredData';
import { pageMetadata, pageSeo } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.careerRoles;

export default function CareerRolesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PageStructuredData page={pageSeo.careerRoles} />
    </>
  );
}
