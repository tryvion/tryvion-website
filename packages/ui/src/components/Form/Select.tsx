import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '@tryvion/utils'

const statusClasses = {
  default: 'border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]/20',
  error:   'border-[var(--color-status-error)]  focus:border-[var(--color-status-error)]  focus:ring-[var(--color-status-error)]/20',
  success: 'border-[var(--color-status-success)] focus:border-[var(--color-status-success)] focus:ring-[var(--color-status-success)]/20',
}

export type SelectStatus = keyof typeof statusClasses

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  status?:     SelectStatus
  placeholder?: string
  className?:  string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    status      = 'default',
    placeholder,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          'w-full h-10 rounded-[var(--radius-md)] border',
          'px-3.5 pr-10 appearance-none',
          'bg-[var(--color-surface-default)]',
          'text-[var(--text-ui-md)] text-[var(--color-content-primary)]',
          'focus:outline-none focus:ring-2',
          'disabled:cursor-not-allowed disabled:bg-[var(--color-surface-subtle)] disabled:opacity-60',
          'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-fast)]',
          statusClasses[status],
          className,
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>

      {/* Dropdown chevron */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-content-muted)]" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  )
})

Select.displayName = 'Select'
