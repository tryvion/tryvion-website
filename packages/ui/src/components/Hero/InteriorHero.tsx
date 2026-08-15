import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import type { BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs'

export interface InteriorHeroProps {
  breadcrumbs?:   BreadcrumbItem[]
  eyebrow?:       string
  title:          string
  description?:   string
  meta?:          ReactNode
  actions?:       ReactNode
  variant?:       'white' | 'subtle' | 'ink'
  className?:     string
}

const variantClasses = {
  white:  'bg-[var(--color-surface-default)] text-[var(--color-content-primary)]',
  subtle: 'bg-[var(--color-surface-subtle)] text-[var(--color-content-primary)]',
  ink:    'bg-[var(--color-surface-dark)] text-[var(--color-content-inverse)]',
}

export function InteriorHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  meta,
  actions,
  variant  = 'subtle',
  className,
}: InteriorHeroProps) {
  const isDark = variant === 'ink'

  return (
    <section
      className={cn(
        'w-full pt-12 pb-14 lg:pt-16 lg:pb-20',
        variantClasses[variant],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="max-w-4xl flex flex-col gap-4">

          {/* Eyebrow */}
          {eyebrow && (
            <p className={cn(
              'text-[var(--text-ui-sm)] font-semibold tracking-[0.1em] uppercase',
              isDark ? 'text-[var(--color-brand-choice)]' : 'text-[var(--color-action-primary)]',
            )}>
              {eyebrow}
            </p>
          )}

          {/* Title */}
          <h1 className={cn(
            'font-[var(--tryvion-font-primary)] font-bold text-balance',
            'text-[var(--text-display-sm)] lg:text-[var(--text-display-md)]',
            'leading-[1.1] tracking-[-0.02em]',
            isDark ? 'text-[var(--color-content-inverse)]' : 'text-[var(--color-content-primary)]',
          )}>
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className={cn(
              'text-[var(--text-body-lg)] leading-relaxed max-w-2xl',
              isDark ? 'text-white/70' : 'text-[var(--color-content-secondary)]',
            )}>
              {description}
            </p>
          )}

          {/* Meta (e.g., date + read time for article pages) */}
          {meta && (
            <div className={cn(
              'flex flex-wrap items-center gap-4 text-[var(--text-ui-sm)]',
              isDark ? 'text-white/50' : 'text-[var(--color-content-muted)]',
            )}>
              {meta}
            </div>
          )}

          {/* Actions */}
          {actions && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {actions}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
