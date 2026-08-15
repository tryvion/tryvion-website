import { cn } from '@tryvion/utils'

const sizeClasses = {
  xs: 'w-3 h-3 border-[1.5px]',
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-6 h-6 border-[2.5px]',
  xl: 'w-8 h-8 border-[3px]',
}

const colorClasses = {
  default: 'text-[var(--color-action-primary)]',
  inverse: 'text-[var(--color-content-inverse)]',
  muted:   'text-[var(--color-content-secondary)]',
}

export interface SpinnerProps {
  size?:      keyof typeof sizeClasses
  color?:     keyof typeof colorClasses
  /** Accessible label announced by screen readers (default: 'Loading…') */
  label?:     string
  className?: string
}

export function Spinner({
  size      = 'md',
  color     = 'default',
  label     = 'Loading\u2026',
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-current border-t-transparent animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
    />
  )
}
