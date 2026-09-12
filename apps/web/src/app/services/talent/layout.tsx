import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.talent

export default function TalentLayout({ children }: { children: ReactNode }) {
  return children
}
