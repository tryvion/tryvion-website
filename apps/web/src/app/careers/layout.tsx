import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.careers;

export default function CareersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
