import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.sapS4HanaPrivateEdition

export default function PrivateEditionLayout({ children }: { children: ReactNode }) {
  return children
}
