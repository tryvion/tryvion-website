import { ScrollHeader } from '@/components/navigation/ScrollHeader'

export interface SiteHeaderProps {
  /** When set, overrides the user's Light/Dark preference for this page only */
  theme?: 'dark' | 'light'
}

export function SiteHeader({ theme }: SiteHeaderProps) {
  return <ScrollHeader theme={theme} />
}
