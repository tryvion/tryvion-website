import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.executiveSearch

export default function ExecutiveSearchLayout({ children }: { children: ReactNode }) {
  return children
}
