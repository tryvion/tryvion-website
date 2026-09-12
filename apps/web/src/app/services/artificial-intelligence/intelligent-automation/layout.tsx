import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.intelligentAutomation

export default function IntelligentAutomationLayout({ children }: { children: ReactNode }) {
  return children
}
