import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// RadioItem — individual radio button
// ---------------------------------------------------------------------------

export interface RadioItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label:      ReactNode
  description?: string
  className?: string
}

export const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(function RadioItem(
  { label, description, className, id, ...rest },
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
          type="radio"
          className={cn(
            'peer h-4 w-4 rounded-full border-2 appearance-none cursor-pointer',
            'bg-[var(--color-surface-default)]',
            'border-[var(--color-border-default)]',
            'checked:border-[var(--color-action-primary)] checked:bg-[var(--color-action-primary)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
            'transition-colors duration-[var(--tryvion-duration-fast)]',
          )}
          {...rest}
        />
        {/* Inner circle dot */}
        <span
          className="pointer-events-none absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white hidden peer-checked:block"
          aria-hidden="true"
        />
      </span>

      <span className="flex flex-col gap-0.5">
        <span className="text-[var(--text-ui-md)] text-[var(--color-content-primary)]">{label}</span>
        {description && (
          <span className="text-[var(--text-ui-sm)] text-[var(--color-content-secondary)]">{description}</span>
        )}
      </span>
    </label>
  )
})

RadioItem.displayName = 'RadioItem'

// ---------------------------------------------------------------------------
// RadioGroup — fieldset wrapper for a group of radio buttons
// ---------------------------------------------------------------------------

export interface RadioGroupProps {
  legend:     string
  /** Hide the legend visually (still accessible to screen readers) */
  hideLegend?: boolean
  error?:     string
  className?: string
  children:   ReactNode
}

export function RadioGroup({ legend, hideLegend = false, error, className, children }: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col gap-3', className)}>
      <legend className={cn(
        'text-[var(--text-ui-md)] font-medium text-[var(--color-content-primary)] mb-1',
        hideLegend && 'sr-only',
      )}>
        {legend}
      </legend>
      {children}
      {error && (
        <p className="text-[var(--text-ui-sm)] text-[var(--color-status-error)] flex items-center gap-1.5" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </fieldset>
  )
}
