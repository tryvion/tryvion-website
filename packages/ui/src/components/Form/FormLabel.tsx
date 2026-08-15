import type { LabelHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  children:  ReactNode
}

export function FormLabel({ required, className, children, ...rest }: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-[var(--text-ui-md)] font-medium text-[var(--color-content-primary)]',
        className,
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--color-status-error)]" aria-hidden="true">*</span>
      )}
    </label>
  )
}
