import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata.industries;

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
