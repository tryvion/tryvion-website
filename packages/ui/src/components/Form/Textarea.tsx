import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@tryvion/utils'

const statusClasses = {
  default: 'border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]/20',
  error:   'border-[var(--color-status-error)]  focus:border-[var(--color-status-error)]  focus:ring-[var(--color-status-error)]/20',
  success: 'border-[var(--color-status-success)] focus:border-[var(--color-status-success)] focus:ring-[var(--color-status-success)]/20',
}

export type TextareaStatus = keyof typeof statusClasses

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?:    TextareaStatus
  resize?:    'none' | 'vertical' | 'both'
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    status  = 'default',
    resize  = 'vertical',
    rows    = 4,
    className,
    ...rest
  },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-[var(--radius-md)] border',
        'px-3.5 py-2.5',
        'bg-[var(--color-surface-default)]',
        'text-[var(--text-ui-md)] text-[var(--color-content-primary)]',
        'placeholder:text-[var(--color-content-muted)]',
        'focus:outline-none focus:ring-2',
        'disabled:cursor-not-allowed disabled:bg-[var(--color-surface-subtle)] disabled:opacity-60',
        'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-fast)]',
        statusClasses[status],
        resize === 'none'     && 'resize-none',
        resize === 'vertical' && 'resize-y',
        resize === 'both'     && 'resize',
        className,
      )}
      {...rest}
    />
  )
})

Textarea.displayName = 'Textarea'
