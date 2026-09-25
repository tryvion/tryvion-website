import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.sapS4Hana;

export default function SapS4HanaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
