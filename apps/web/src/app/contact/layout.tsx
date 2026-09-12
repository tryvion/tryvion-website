import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.contact

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
