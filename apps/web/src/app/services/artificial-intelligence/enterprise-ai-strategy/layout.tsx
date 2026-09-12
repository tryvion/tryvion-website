import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.enterpriseAiStrategy

export default function EnterpriseAiStrategyLayout({ children }: { children: ReactNode }) {
  return children
}
