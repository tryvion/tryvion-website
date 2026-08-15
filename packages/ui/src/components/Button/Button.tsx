'use client'

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { Spinner } from '../Spinner/Spinner'

// ---------------------------------------------------------------------------
// Variant and size maps
// ---------------------------------------------------------------------------

const variantClasses = {
  primary: [
    'bg-[var(--color-action-primary)] text-[var(--color-content-inverse)]',
    'hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-active)]',
    'border border-transparent',
    'disabled:bg-[var(--color-action-primary-disabled)] disabled:text-[var(--color-content-inverse)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-surface-default)] text-[var(--color-content-primary)]',
    'hover:bg-[var(--color-surface-subtle)] active:bg-[var(--color-surface-subtle)]',
    'border border-[var(--color-border-default)]',
    'hover:border-[var(--color-border-strong)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--color-content-primary)]',
    'hover:bg-[var(--color-surface-subtle)] active:bg-[var(--color-surface-subtle)]',
    'border border-transparent',
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--color-action-primary)]',
    'hover:bg-[var(--color-brand-momentum)]/5 active:bg-[var(--color-brand-momentum)]/10',
    'border border-[var(--color-action-primary)]',
  ].join(' '),

  destructive: [
    'bg-[var(--color-status-error)] text-[var(--color-content-inverse)]',
    'hover:brightness-90 active:brightness-75',
    'border border-transparent',
  ].join(' '),
}

const sizeClasses = {
  sm: 'h-8  px-3   gap-1.5 text-[var(--text-ui-sm)]   rounded-[var(--radius-sm)]',
  md: 'h-10 px-4   gap-2   text-[var(--text-ui-md)]   rounded-[var(--radius-md)]',
  lg: 'h-12 px-6   gap-2   text-[var(--text-body-md)] rounded-[var(--radius-md)]',
  xl: 'h-14 px-8   gap-2.5 text-[var(--text-body-lg)] rounded-[var(--radius-lg)]',
}

// ---------------------------------------------------------------------------
// Shared base
// ---------------------------------------------------------------------------

const baseClasses = [
  'inline-flex items-center justify-center font-semibold',
  'select-none whitespace-nowrap',
  'transition-[background-color,border-color,color,opacity]',
  'duration-[var(--tryvion-duration-fast)] ease-[var(--tryvion-ease-out)]',
  'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-40',
  'aria-busy:pointer-events-none',
].join(' ')

// ---------------------------------------------------------------------------
// Button — renders as <button> or <a> depending on href prop
// ---------------------------------------------------------------------------

export type ButtonVariant = keyof typeof variantClasses
export type ButtonSize    = keyof typeof sizeClasses

type ButtonAsButton = {
  href?: undefined
} & ButtonHTMLAttributes<HTMLButtonElement>

type ButtonAsAnchor = {
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export type ButtonProps = {
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children:   ReactNode
  className?: string
} & (ButtonAsButton | ButtonAsAnchor)

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant   = 'primary',
    size      = 'md',
    loading   = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    className,
    href,
    ...rest
  },
  ref,
) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  )

  const spinnerSize = (size === 'sm' ? 'xs' : size === 'xl' ? 'lg' : 'sm') as 'xs' | 'sm' | 'lg'

  const content = (
    <>
      {loading ? (
        <Spinner size={spinnerSize} color="inverse" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  )

  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-busy={loading || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      aria-busy={loading || undefined}
      disabled={(rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled || loading}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'
