import React from 'react'
import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { FormLabel } from './FormLabel'
import { FormMessage } from './FormMessage'

export interface FormFieldProps {
  /** Matches the input element's id — used to wire label and aria-describedby */
  id:         string
  label?:     string
  required?:  boolean
  hint?:      string
  error?:     string
  className?: string
  /**
   * Single form element child (Input, Textarea, Select).
   * FormField injects id, aria-invalid, and aria-describedby automatically.
   */
  children:   ReactNode
}

export function FormField({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  const hintId  = hint  ? `${id}-hint`  : undefined
  const errorId = error ? `${id}-error` : undefined

  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  // Inject accessibility props into the direct child input element
  const child = React.Children.only(children)
  const enhanced = React.isValidElement(child)
    ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        id,
        'aria-invalid':      error ? true : undefined,
        'aria-describedby':  describedBy,
        'aria-required':     required ? true : undefined,
        status: error ? 'error' : (child.props as Record<string, unknown>).status,
      })
    : child

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <FormLabel htmlFor={id} required={required}>
          {label}
        </FormLabel>
      )}

      {enhanced}

      {hint && !error && (
        <FormMessage type="hint" id={hintId}>
          {hint}
        </FormMessage>
      )}

      {error && (
        <FormMessage type="error" id={errorId}>
          {error}
        </FormMessage>
      )}
    </div>
  )
}
