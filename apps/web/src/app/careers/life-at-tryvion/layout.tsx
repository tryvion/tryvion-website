import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.lifeAtTryvion

export default function LifeAtTryvionLayout({ children }: { children: ReactNode }) {
  return children
}
