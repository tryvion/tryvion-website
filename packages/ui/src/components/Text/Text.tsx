import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Variant maps — map to typography token scale from @tryvion/design-tokens
// ---------------------------------------------------------------------------

const variantClasses = {
  'body-xl': 'text-[var(--text-body-xl)] leading-relaxed',
  'body-lg': 'text-[var(--text-body-lg)] leading-relaxed',
  'body-md': 'text-[var(--text-body-md)] leading-relaxed',
  'body-sm': 'text-[var(--text-body-sm)] leading-normal',
  'body-xs': 'text-[var(--text-body-xs)] leading-normal',
  'ui-lg':   'text-[var(--text-ui-lg)]   leading-snug',
  'ui-md':   'text-[var(--text-ui-md)]   leading-snug',
  'ui-sm':   'text-[var(--text-ui-sm)]   leading-snug',
  'caption': 'text-[var(--text-caption)] leading-normal tracking-wide',
  'overline':'text-[var(--text-ui-sm)]   leading-normal tracking-[0.08em] uppercase font-medium',
  'label':   'text-[var(--text-ui-md)]   leading-snug font-medium',
}

const defaultTags: Record<string, ElementType> = {
  'body-xl': 'p',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'ui-lg':   'span',
  'ui-md':   'span',
  'ui-sm':   'span',
  'caption': 'span',
  'overline':'span',
  'label':   'label',
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
  muted:     'text-[var(--color-content-muted)]',
  inverse:   'text-[var(--color-content-inverse)]',
  error:     'text-[var(--color-status-error)]',
  success:   'text-[var(--color-status-success)]',
  warning:   'text-[var(--color-status-warning)]',
  inherit:   'text-inherit',
}

// ---------------------------------------------------------------------------
// Text component
// ---------------------------------------------------------------------------

export type TextVariant  = keyof typeof variantClasses
export type TextWeight   = keyof typeof weightClasses
export type TextColor    = keyof typeof colorClasses

export interface TextProps {
  variant?:   TextVariant
  weight?:    TextWeight
  color?:     TextColor
  truncate?:  boolean
  balance?:   boolean
  className?: string
  as?:        ElementType
  children:   ReactNode
}

export function Text({
  variant   = 'body-md',
  weight,
  color     = 'default',
  truncate  = false,
  balance   = false,
  className,
  as,
  children,
}: TextProps) {
  const Element = as ?? defaultTags[variant] ?? 'p'

  return (
    <Element
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        weight && weightClasses[weight],
        truncate && 'truncate',
        balance && 'text-balance',
        className,
      )}
    >
      {children}
    </Element>
  )
}
