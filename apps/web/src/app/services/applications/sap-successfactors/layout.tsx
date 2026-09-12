import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.sapSuccessFactors

export default function SapSuccessFactorsLayout({ children }: { children: ReactNode }) {
  return children
}
