import type { Metadata } from 'next'
import { HomePage } from '@/components/home/HomePage'

export const metadata: Metadata = {
  title: 'TRYVION — The Future Is a Choice',
  description: 'TRYVION is an independent enterprise transformation partner specialising in SAP, AI, cloud and talent solutions — guiding organisations through complex transformation with clarity, confidence and continuous momentum.',
}

export default function Page() {
  return <HomePage />
}
