import type { SVGProps } from 'react'
import { cn } from '@tryvion/utils'

/**
 * Icon — a sized, accessible wrapper for inline SVG icons.
 *
 * Works with any SVG-based icon library (Lucide, Heroicons, custom SVG).
 * Pass the icon component as children.
 *
 * Usage:
 *   import { Check } from 'lucide-react'
 *   <Icon size="md" label="Confirmed"><Check /></Icon>
 *
 *   // Decorative (hidden from a11y tree):
 *   <Icon size="sm" aria-hidden><Arrow /></Icon>
 */

const sizeClasses = {
  xs: 'w-3 h-3',    // 12px
  sm: 'w-4 h-4',    // 16px
  md: 'w-5 h-5',    // 20px
  lg: 'w-6 h-6',    // 24px
  xl: 'w-8 h-8',    // 32px
  '2xl': 'w-10 h-10', // 40px
}

export type IconSize = keyof typeof sizeClasses

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?:       IconSize
  /** Accessible label; omit for decorative icons (aria-hidden will be applied) */
  label?:      string
  className?:  string
  children:    React.ReactNode
}

export function Icon({
  size      = 'md',
  label,
  className,
  children,
  ...rest
}: IconProps) {
  const isDecorative = !label

  return (
    <span
      role={isDecorative ? undefined : 'img'}
      aria-label={label}
      aria-hidden={isDecorative ? true : undefined}
      className={cn(
        'inline-flex items-center justify-center shrink-0',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
