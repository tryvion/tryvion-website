import { HomePage } from '@/components/home/HomePage'
import { pageMetadata } from '@/lib/seo/pages'

export const metadata = pageMetadata.home

export default function Page() {
  return <HomePage />
}
