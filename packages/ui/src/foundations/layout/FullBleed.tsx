import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * FullBleed — renders its children edge-to-edge (no max-width constraint).
 * Use inside a Container to deliberately break out of the column grid.
 */
export interface FullBleedProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function FullBleed({
  children,
  className,
  as: Element = 'div',
}: FullBleedProps) {
  return (
    <Element
      className={cn(
        'w-full',
        className,
      )}
    >
      {children}
    </Element>
  )
}
