import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.services;

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
