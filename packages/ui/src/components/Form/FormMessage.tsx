import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface FormMessageProps {
  type?:      'error' | 'hint' | 'success'
  id?:        string
  children:   ReactNode
  className?: string
}

const typeClasses = {
  error:   'text-[var(--color-status-error)]',
  hint:    'text-[var(--color-content-muted)]',
  success: 'text-[var(--color-status-success)]',
}

const icons = {
  error: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  success: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  hint: null,
}

export function FormMessage({ type = 'hint', id, children, className }: FormMessageProps) {
  return (
    <p
      id={id}
      role={type === 'error' ? 'alert' : undefined}
      aria-live={type === 'error' ? 'polite' : undefined}
      className={cn(
        'flex items-center gap-1.5 text-[var(--text-ui-sm)]',
        typeClasses[type],
        className,
      )}
    >
      {icons[type]}
      {children}
    </p>
  )
}
