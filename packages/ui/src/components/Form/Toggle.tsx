'use client'

import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role' | 'size'> {
  label?:    ReactNode
  hint?:     string
  size?:     'sm' | 'md'
  className?: string
}

const sizeMap = {
  sm: { track: 'w-8 h-4',  thumb: 'h-3 w-3',   translate: 'peer-checked:translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'h-4.5 w-4.5', translate: 'peer-checked:translate-x-5' },
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, hint, size = 'md', className, id, ...rest },
  ref,
) {
  const s = sizeMap[size]

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center gap-3 cursor-pointer select-none',
        rest.disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {/* Track + Thumb */}
      <span className={cn('relative flex shrink-0 items-center rounded-full', s.track)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className={cn(
            'peer sr-only',
          )}
          {...rest}
        />
        {/* Track */}
        <span
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-[var(--color-border-default)]',
            'peer-checked:bg-[var(--color-action-primary)]',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-border-focus)]/40 peer-focus-visible:ring-offset-1',
            'transition-colors duration-[var(--tryvion-duration-fast)]',
          )}
          aria-hidden="true"
        />
        {/* Thumb */}
        <span
          className={cn(
            'relative z-10 rounded-full bg-white shadow-sm',
            'ml-0.5',
            'transition-transform duration-[var(--tryvion-duration-fast)]',
            s.thumb,
            s.translate,
          )}
          aria-hidden="true"
        />
      </span>

      {(label || hint) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="text-[var(--text-ui-md)] text-[var(--color-content-primary)]">{label}</span>
          )}
          {hint && (
            <span className="text-[var(--text-ui-sm)] text-[var(--color-content-muted)]">{hint}</span>
          )}
        </span>
      )}
    </label>
  )
})

Toggle.displayName = 'Toggle'
