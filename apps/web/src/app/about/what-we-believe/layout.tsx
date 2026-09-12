import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.whatWeBelieve

export default function WhatWeBelieveLayout({ children }: { children: ReactNode }) {
  return children
}
