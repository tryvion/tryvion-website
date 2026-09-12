import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.learningPlatform

export default function LearningPlatformLayout({ children }: { children: ReactNode }) {
  return children
}
