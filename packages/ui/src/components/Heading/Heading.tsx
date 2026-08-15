import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Visual size scale — decoupled from semantic heading level (h1-h6)
// Maps to display and heading tokens from @tryvion/design-tokens
// ---------------------------------------------------------------------------

const sizeClasses = {
  'display-2xl': 'text-[var(--text-display-2xl)] leading-[1.05] tracking-[-0.03em]',
  'display-xl':  'text-[var(--text-display-xl)]  leading-[1.08] tracking-[-0.025em]',
  'display-lg':  'text-[var(--text-display-lg)]  leading-[1.1]  tracking-[-0.02em]',
  'display-md':  'text-[var(--text-display-md)]  leading-[1.15] tracking-[-0.015em]',
  'display-sm':  'text-[var(--text-display-sm)]  leading-[1.2]  tracking-[-0.01em]',
  'h1':          'text-[var(--text-h1)]           leading-[1.2]  tracking-[-0.01em]',
  'h2':          'text-[var(--text-h2)]           leading-[1.25] tracking-[-0.005em]',
  'h3':          'text-[var(--text-h3)]           leading-[1.3]',
  'h4':          'text-[var(--text-h4)]           leading-[1.35]',
  'h5':          'text-[var(--text-h5)]           leading-[1.4]',
  'h6':          'text-[var(--text-h6)]           leading-[1.5]',
}

/** Semantic heading level → default visual size */
const defaultSize: Record<1|2|3|4|5|6, keyof typeof sizeClasses> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
}

const weightClasses = {
  light:    'font-light',
  regular:  'font-normal',
  medium:   'font-medium',
  semibold: 'font-semibold',
  bold:     'font-bold',
}

const colorClasses = {
  default:   'text-[var(--color-content-primary)]',
  secondary: 'text-[var(--color-content-secondary)]',
  inverse:   'text-[var(--color-content-inverse)]',
  inherit:   'text-inherit',
}

// ---------------------------------------------------------------------------
// Heading component
// ---------------------------------------------------------------------------

export type HeadingLevel  = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize   = keyof typeof sizeClasses
export type HeadingWeight = keyof typeof weightClasses
export type HeadingColor  = keyof typeof colorClasses

export interface HeadingProps {
  /** Semantic HTML heading level — determines the <h1>–<h6> tag */
  level?:     HeadingLevel
  /**
   * Visual size — independent from semantic level.
   * Defaults to the level's natural size (level=1 → 'h1', level=2 → 'h2', etc.)
   * Override for editorial designs where visual hierarchy ≠ semantic hierarchy.
   */
  size?:      HeadingSize
  weight?:    HeadingWeight
  color?:     HeadingColor
  /** Apply text-balance for short headings */
  balance?:   boolean
  className?: string
  /** Override the rendered element entirely (use sparingly) */
  as?:        ElementType
  children:   ReactNode
}

export function Heading({
  level   = 2,
  size,
  weight  = 'bold',
  color   = 'default',
  balance = true,
  className,
  as,
  children,
}: HeadingProps) {
  const Element: ElementType = as ?? (`h${level}` as ElementType)
  const resolvedSize = size ?? defaultSize[level]

  return (
    <Element
      className={cn(
        'font-[var(--tryvion-font-primary)]',
        sizeClasses[resolvedSize],
        weightClasses[weight],
        colorClasses[color],
        balance && 'text-balance',
        className,
      )}
    >
      {children}
    </Element>
  )
}
