import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.sapRunInTheNew

export default function SapRunInTheNewLayout({ children }: { children: ReactNode }) {
  return children
}
