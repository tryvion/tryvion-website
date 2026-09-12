import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata: Metadata = pageMetadata.bookAConsultation

export default function BookAConsultationLayout({ children }: { children: ReactNode }) {
  return children
}
