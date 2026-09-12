import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.applications

export default function ApplicationsLayout({ children }: { children: ReactNode }) {
  return children
}
