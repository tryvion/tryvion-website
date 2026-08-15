import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * ReadingWidth — constrains prose content to the optimal reading width.
 * Maps to --container-reading: 65ch (from semantic layout tokens).
 *
 * Use for article bodies, blog posts, and any long-form content
 * where line length affects readability (WCAG 1.4.8 recommends ≤80 chars).
 */
export interface ReadingWidthProps {
  children: ReactNode
  /** Center horizontally within its parent (default: true) */
  centered?: boolean
  className?: string
  as?: ElementType
}

export function ReadingWidth({
  children,
  centered = true,
  className,
  as: Element = 'div',
}: ReadingWidthProps) {
  return (
    <Element
      className={cn(
        'max-w-container-reading w-full',
        centered && 'mx-auto',
        className,
      )}
    >
      {children}
    </Element>
  )
}
