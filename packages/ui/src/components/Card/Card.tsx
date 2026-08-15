import { forwardRef } from 'react'
import type { ElementType, ReactNode, HTMLAttributes } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Card — base container
// ---------------------------------------------------------------------------

const variantClasses = {
  elevated: [
    'bg-[var(--color-surface-default)]',
    'shadow-[var(--shadow-2)] hover:shadow-[var(--shadow-3)]',
    'transition-shadow duration-[var(--tryvion-duration-normal)]',
  ].join(' '),

  outlined: [
    'bg-[var(--color-surface-default)]',
    'border border-[var(--color-border-default)]',
    'hover:border-[var(--color-border-strong)]',
    'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-normal)]',
  ].join(' '),

  filled: [
    'bg-[var(--color-surface-subtle)]',
    'hover:bg-[var(--color-surface-default)] hover:shadow-[var(--shadow-1)]',
    'transition-[background-color,box-shadow] duration-[var(--tryvion-duration-normal)]',
  ].join(' '),

  dark: [
    'bg-[var(--color-surface-dark)] text-[var(--color-content-inverse)]',
    'border border-white/10',
  ].join(' '),

  ghost: 'bg-transparent',
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export type CardVariant = keyof typeof variantClasses
export type CardPadding = keyof typeof paddingClasses

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?:     CardVariant
  padding?:     CardPadding
  /** Applies interactive cursor + focus ring for clickable card patterns */
  interactive?: boolean
  className?:   string
  as?:          ElementType
  children:     ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant     = 'elevated',
    padding     = 'none',
    interactive = false,
    className,
    as: Element  = 'div',
    children,
    ...rest
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={cn(
        'rounded-[var(--radius-lg)] overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        interactive && [
          'cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Element>
  )
})

Card.displayName = 'Card'

// ---------------------------------------------------------------------------
// CardMedia — image / visual area at top of card (aspect-ratio container)
// ---------------------------------------------------------------------------

export interface CardMediaProps {
  /** Aspect ratio class, e.g. 'aspect-video', 'aspect-square', 'aspect-[3/2]' */
  aspect?:    string
  className?: string
  children:   ReactNode
}

export function CardMedia({ aspect = 'aspect-video', className, children }: CardMediaProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', aspect, className)}>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CardBody — main content area
// ---------------------------------------------------------------------------

export interface CardBodyProps {
  padding?:   CardPadding
  className?: string
  children:   ReactNode
}

export function CardBody({ padding = 'md', className, children }: CardBodyProps) {
  return (
    <div className={cn(paddingClasses[padding], 'flex flex-col', className)}>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CardHeader — heading + optional meta (badge, date) inside CardBody
// ---------------------------------------------------------------------------

export interface CardHeaderProps {
  className?: string
  children:   ReactNode
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2 mb-3', className)}>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CardFooter — action area (links, buttons) at bottom of card
// ---------------------------------------------------------------------------

export interface CardFooterProps {
  padding?:   CardPadding
  divider?:   boolean
  className?: string
  children:   ReactNode
}

export function CardFooter({ padding = 'md', divider = false, className, children }: CardFooterProps) {
  return (
    <div
      className={cn(
        paddingClasses[padding],
        'mt-auto',
        divider && 'border-t border-[var(--color-border-default)] pt-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
