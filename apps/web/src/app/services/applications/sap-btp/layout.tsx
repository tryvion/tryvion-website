import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.sapBtp

export default function SapBtpLayout({ children }: { children: ReactNode }) {
  return children
}
