import type { CSSProperties } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Skeleton — content loading placeholder
//
// All variants use animate-pulse (Tailwind built-in).
// prefers-reduced-motion: animate-pulse is safe — it's a subtle opacity fade
// rather than movement. The globals.css reduced-motion rule sets
// animation-duration: 0.01ms which effectively disables it.
// ---------------------------------------------------------------------------

const variantClasses = {
  text:   'rounded-[var(--radius-xs)]',
  circle: 'rounded-full',
  rect:   'rounded-[var(--radius-sm)]',
  block:  'rounded-[var(--radius-md)]',
}

export type SkeletonVariant = keyof typeof variantClasses

export interface SkeletonProps {
  variant?:   SkeletonVariant
  /** CSS width value, or 'full' for 100% (default: 'full') */
  width?:     string | 'full'
  /** CSS height value (default: '1em' for text, explicit for others) */
  height?:    string
  /** Stack multiple text-line skeletons (text variant only) */
  lines?:     number
  animated?:  boolean
  className?: string
}

function SkeletonBase({
  variant   = 'text',
  width     = 'full',
  height,
  animated  = true,
  className,
}: Omit<SkeletonProps, 'lines'>) {
  const style: CSSProperties = {
    width:  width === 'full' ? '100%' : width,
    height: height ?? (variant === 'text' ? '1em' : undefined),
  }

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        'block bg-[var(--color-surface-subtle)]',
        animated && 'animate-pulse',
        variantClasses[variant],
        className,
      )}
    />
  )
}

export function Skeleton({
  variant = 'text',
  lines,
  ...rest
}: SkeletonProps) {
  if (variant === 'text' && lines && lines > 1) {
    return (
      <span className="block space-y-2" aria-hidden="true" aria-busy="true">
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonBase
            key={i}
            variant="text"
            width={i === lines - 1 ? '75%' : 'full'}
            {...rest}
          />
        ))}
      </span>
    )
  }

  return (
    <span aria-hidden="true" aria-busy="true" className="block">
      <SkeletonBase variant={variant} {...rest} />
    </span>
  )
}
