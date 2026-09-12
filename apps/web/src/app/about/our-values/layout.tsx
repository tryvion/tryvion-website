import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.ourValues

export default function OurValuesLayout({ children }: { children: ReactNode }) {
  return children
}
