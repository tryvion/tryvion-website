import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.enterpriseAiPlatforms

export default function EnterpriseAiPlatformsLayout({ children }: { children: ReactNode }) {
  return children
}
