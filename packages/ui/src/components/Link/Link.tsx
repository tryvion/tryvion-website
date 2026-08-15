import NextLink from 'next/link'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Variant maps
// ---------------------------------------------------------------------------

const variantClasses = {
  /** Inline editorial link with underline */
  default: [
    'text-[var(--color-action-primary)]',
    'underline underline-offset-[0.2em] decoration-[var(--color-action-primary)]/40',
    'hover:text-[var(--color-action-primary-hover)] hover:decoration-[var(--color-action-primary-hover)]',
  ].join(' '),

  /** Subdued link — underline only on hover */
  subtle: [
    'text-[var(--color-content-secondary)] no-underline',
    'hover:text-[var(--color-content-primary)] hover:underline hover:underline-offset-[0.2em]',
  ].join(' '),

  /** Navigation link — no underline, inherits color */
  nav: [
    'text-inherit no-underline',
    'hover:text-[var(--color-action-primary)]',
    'transition-colors duration-[var(--tryvion-duration-fast)]',
  ].join(' '),

  /** Unstyled — use when wrapping custom UI (e.g. cards) */
  unstyled: 'text-inherit no-underline',
}

// ---------------------------------------------------------------------------
// Link component
// ---------------------------------------------------------------------------

export type LinkVariant = keyof typeof variantClasses

export interface LinkProps extends ComponentPropsWithRef<typeof NextLink> {
  variant?:   LinkVariant
  /** Opens in new tab with safe rel attributes */
  external?:  boolean
  children:   ReactNode
  className?: string
}

export function Link({
  variant  = 'default',
  external = false,
  children,
  className,
  href,
  ...rest
}: LinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <NextLink
      href={href}
      className={cn(
        'transition-colors duration-[var(--tryvion-duration-fast)] ease-[var(--tryvion-ease-out)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        'rounded-[1px]',
        variantClasses[variant],
        className,
      )}
      {...externalProps}
      {...rest}
    >
      {children}
    </NextLink>
  )
}
