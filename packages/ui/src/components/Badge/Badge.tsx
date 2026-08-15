import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Variant maps — semantic status colours + opacity-based tints
// ---------------------------------------------------------------------------

const variantClasses = {
  default:     'bg-[var(--color-surface-subtle)] text-[var(--color-content-secondary)] border border-[var(--color-border-default)]',
  primary:     'bg-[var(--color-action-primary)]/10 text-[var(--color-action-primary)] border border-[var(--color-action-primary)]/20',
  success:     'bg-[var(--color-status-success)]/10 text-[var(--color-status-success)] border border-[var(--color-status-success)]/20',
  warning:     'bg-[var(--color-status-warning)]/10 text-[var(--color-status-warning)] border border-[var(--color-status-warning)]/20',
  error:       'bg-[var(--color-status-error)]/10   text-[var(--color-status-error)]   border border-[var(--color-status-error)]/20',
  info:        'bg-[var(--color-status-info)]/10    text-[var(--color-status-info)]    border border-[var(--color-status-info)]/20',
  dark:        'bg-[var(--color-content-primary)] text-[var(--color-content-inverse)] border border-transparent',
  outline:     'bg-transparent text-[var(--color-content-secondary)] border border-[var(--color-border-default)]',
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[var(--text-ui-sm)]  gap-1',
  md: 'px-2   py-0.5 text-[var(--text-ui-sm)]  gap-1.5',
  lg: 'px-2.5 py-1   text-[var(--text-ui-md)]  gap-1.5',
}

const dotColorClasses = {
  default: 'bg-[var(--color-content-secondary)]',
  primary: 'bg-[var(--color-action-primary)]',
  success: 'bg-[var(--color-status-success)]',
  warning: 'bg-[var(--color-status-warning)]',
  error:   'bg-[var(--color-status-error)]',
  info:    'bg-[var(--color-status-info)]',
  dark:    'bg-[var(--color-content-inverse)]',
  outline: 'bg-[var(--color-content-secondary)]',
}

// ---------------------------------------------------------------------------
// Badge component
// ---------------------------------------------------------------------------

export type BadgeVariant = keyof typeof variantClasses
export type BadgeSize    = keyof typeof sizeClasses

export interface BadgeProps {
  variant?:   BadgeVariant
  size?:      BadgeSize
  /** Prepends a small status-indicator dot */
  dot?:       boolean
  /** Pill shape (default) vs slightly rounded */
  pill?:      boolean
  className?: string
  children:   ReactNode
}

export function Badge({
  variant   = 'default',
  size      = 'md',
  dot       = false,
  pill      = true,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        sizeClasses[size],
        variantClasses[variant],
        pill ? 'rounded-full' : 'rounded-[var(--radius-sm)]',
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColorClasses[variant],
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
