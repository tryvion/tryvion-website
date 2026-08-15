import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * VisuallyHidden — hides content visually while keeping it accessible to
 * screen readers and keyboard users.
 *
 * Uses the industry-standard .sr-only technique (not display:none or
 * visibility:hidden, which remove the element from the a11y tree).
 *
 * Usage:
 *   <button>
 *     <Icon aria-hidden="true" />
 *     <VisuallyHidden>Delete item</VisuallyHidden>
 *   </button>
 */
export interface VisuallyHiddenProps {
  children: ReactNode
  /** Expose visually on focus — useful for skip-links (default: false) */
  focusable?: boolean
  className?: string
  as?: ElementType
}

export function VisuallyHidden({
  children,
  focusable = false,
  className,
  as: Element = 'span',
}: VisuallyHiddenProps) {
  return (
    <Element
      className={cn(
        'sr-only',
        focusable && 'focus:not-sr-only focus:absolute focus:z-[var(--z-skipNav)]',
        className,
      )}
    >
      {children}
    </Element>
  )
}
