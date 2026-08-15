import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * Container sizes map to semantic container-width tokens defined in
 * @tryvion/design-tokens:
 *   sm:      480px   (mobile-l)
 *   md:      768px   (tablet)
 *   lg:      1024px  (laptop)
 *   xl:      1280px  (desktop) — default
 *   2xl:     1440px  (desktop-l)
 *   3xl:     1920px  (ultra-wide)
 *   reading: 65ch    (optimal prose width)
 *   full:    no constraint
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'reading' | 'full'

const sizeClass: Record<ContainerSize, string> = {
  sm:      'max-w-container-sm',
  md:      'max-w-container-md',
  lg:      'max-w-container-lg',
  xl:      'max-w-container-xl',
  '2xl':   'max-w-container-2xl',
  '3xl':   'max-w-container-3xl',
  reading: 'max-w-container-reading',
  full:    '',
}

export interface ContainerProps {
  children: ReactNode
  /** Max-width variant (default: xl = 1280px) */
  size?: ContainerSize
  /** Apply responsive horizontal padding (default: true) */
  padded?: boolean
  className?: string
  /** HTML element to render as (default: div) */
  as?: ElementType
}

export function Container({
  children,
  size = 'xl',
  padded = true,
  className,
  as: Element = 'div',
}: ContainerProps) {
  return (
    <Element
      className={cn(
        'mx-auto w-full',
        sizeClass[size],
        padded && 'px-4 sm:px-6 lg:px-8 xl:px-10',
        className,
      )}
    >
      {children}
    </Element>
  )
}
