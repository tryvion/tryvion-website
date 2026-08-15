import NextLink from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface FeatureBlockProps {
  icon?:        ReactNode
  title:        string
  description:  string
  href?:        string
  /** 'vertical' stacks icon above text (default); 'horizontal' places them side-by-side */
  layout?:      'vertical' | 'horizontal'
  /** Tint applied to the icon container */
  iconVariant?: 'momentum' | 'choice' | 'teal' | 'neutral'
  className?:   string
}

const iconTint = {
  momentum: 'bg-[var(--color-action-primary)]/10 text-[var(--color-action-primary)]',
  choice:   'bg-[var(--color-brand-choice)]/10 text-[var(--color-brand-choice)]',
  teal:     'bg-[var(--color-status-info)]/10 text-[var(--color-status-info)]',
  neutral:  'bg-[var(--color-surface-subtle)] text-[var(--color-content-secondary)]',
}

export function FeatureBlock({
  icon,
  title,
  description,
  href,
  layout      = 'vertical',
  iconVariant = 'momentum',
  className,
}: FeatureBlockProps) {
  const isHorizontal = layout === 'horizontal'

  const content = (
    <div className={cn(
      'flex gap-5',
      isHorizontal ? 'flex-row items-start' : 'flex-col items-start',
      className,
    )}>
      {icon && (
        <span
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] shrink-0',
            iconTint[iconVariant],
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-[var(--text-body-md)] font-semibold text-[var(--color-content-primary)]">
          {title}
        </p>
        <p className="text-[var(--text-body-sm)] text-[var(--color-content-secondary)] leading-relaxed">
          {description}
        </p>
        {href && (
          <span className="mt-1 text-[var(--text-ui-sm)] font-semibold text-[var(--color-action-primary)] flex items-center gap-1">
            Learn more
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <NextLink
        href={href}
        className="group focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-4 rounded-lg"
      >
        {content}
      </NextLink>
    )
  }

  return content
}
