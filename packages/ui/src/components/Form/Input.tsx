import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

const sizeClasses = {
  sm: 'h-8  px-3   text-[var(--text-ui-sm)]',
  md: 'h-10 px-3.5 text-[var(--text-ui-md)]',
  lg: 'h-12 px-4   text-[var(--text-body-md)]',
}

const statusClasses = {
  default: 'border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]/20',
  error:   'border-[var(--color-status-error)]  focus:border-[var(--color-status-error)]  focus:ring-[var(--color-status-error)]/20',
  success: 'border-[var(--color-status-success)] focus:border-[var(--color-status-success)] focus:ring-[var(--color-status-success)]/20',
}

export type InputStatus = keyof typeof statusClasses
export type InputSize   = keyof typeof sizeClasses

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?:         InputSize
  status?:       InputStatus
  leftElement?:  ReactNode
  rightElement?: ReactNode
  className?:    string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size         = 'md',
    status       = 'default',
    leftElement,
    rightElement,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div className="relative w-full">
      {leftElement && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-content-muted)]">
          {leftElement}
        </span>
      )}

      <input
        ref={ref}
        className={cn(
          'w-full rounded-[var(--radius-md)] border',
          'bg-[var(--color-surface-default)]',
          'text-[var(--color-content-primary)]',
          'placeholder:text-[var(--color-content-muted)]',
          'focus:outline-none focus:ring-2',
          'disabled:cursor-not-allowed disabled:bg-[var(--color-surface-subtle)] disabled:text-[var(--color-content-muted)] disabled:opacity-60',
          'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-fast)]',
          sizeClasses[size],
          statusClasses[status],
          leftElement  && 'pl-10',
          rightElement && 'pr-10',
          className,
        )}
        {...rest}
      />

      {rightElement && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-content-muted)]">
          {rightElement}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'
