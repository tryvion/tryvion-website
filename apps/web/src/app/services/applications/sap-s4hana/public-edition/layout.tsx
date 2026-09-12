import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.sapS4HanaPublicEdition

export default function PublicEditionLayout({ children }: { children: ReactNode }) {
  return children
}
