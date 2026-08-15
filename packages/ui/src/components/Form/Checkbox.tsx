import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?:    ReactNode
  hint?:     string
  error?:    string
  className?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex items-start gap-3 cursor-pointer select-none',
        rest.disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="relative flex shrink-0 mt-0.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            'peer h-4 w-4 rounded-[var(--radius-xs)] border-2 appearance-none cursor-pointer',
            'bg-[var(--color-surface-default)]',
            'border-[var(--color-border-default)]',
            'checked:bg-[var(--color-action-primary)] checked:border-[var(--color-action-primary)]',
            'indeterminate:bg-[var(--color-action-primary)] indeterminate:border-[var(--color-action-primary)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
            'disabled:cursor-not-allowed',
            'transition-colors duration-[var(--tryvion-duration-fast)]',
            error && 'border-[var(--color-status-error)]',
          )}
          {...rest}
        />
        {/* Checkmark SVG — shown when checked */}
        <svg
          viewBox="0 0 10 8"
          className="pointer-events-none absolute inset-0 m-auto w-2.5 h-2 hidden peer-checked:block text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 4l3 3 5-6" />
        </svg>
      </span>

      {(label || hint || error) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="text-[var(--text-ui-md)] text-[var(--color-content-primary)]">
              {label}
            </span>
          )}
          {hint && !error && (
            <span className="text-[var(--text-ui-sm)] text-[var(--color-content-muted)]">{hint}</span>
          )}
          {error && (
            <span className="text-[var(--text-ui-sm)] text-[var(--color-status-error)]">{error}</span>
          )}
        </span>
      )}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
