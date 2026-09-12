import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.talkToAnExpert

export default function TalkToAnExpertLayout({ children }: { children: ReactNode }) {
  return children
}
