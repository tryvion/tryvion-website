import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { Button } from '../Button/Button'

export interface CTABannerProps {
  eyebrow?:      string
  headline:      string
  subtext?:      string
  primaryCTA:    { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  variant?:      'ink' | 'momentum' | 'light'
  className?:    string
}

const variantMap = {
  ink: {
    wrapper: 'bg-[var(--color-surface-dark)]',
    eyebrow: 'text-[var(--color-brand-choice)]',
    headline:'text-[var(--color-content-inverse)]',
    subtext: 'text-white/70',
    secondary: 'text-white border-white/30 hover:bg-white/10',
  },
  momentum: {
    wrapper: 'bg-[var(--color-action-primary)]',
    eyebrow: 'text-white/70',
    headline:'text-white',
    subtext: 'text-white/80',
    secondary: 'text-white border-white/40 hover:bg-white/10',
  },
  light: {
    wrapper: 'bg-[var(--color-surface-subtle)] border-y border-[var(--color-border-default)]',
    eyebrow: 'text-[var(--color-action-primary)]',
    headline:'text-[var(--color-content-primary)]',
    subtext: 'text-[var(--color-content-secondary)]',
    secondary: undefined,
  },
}

export function CTABanner({
  eyebrow,
  headline,
  subtext,
  primaryCTA,
  secondaryCTA,
  variant = 'ink',
  className,
}: CTABannerProps) {
  const c = variantMap[variant]
  const isDark = variant !== 'light'

  return (
    <section className={cn('relative overflow-hidden py-20 lg:py-28', c.wrapper, className)}>

      {/* Decorative blur orb — dark variants */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-[var(--color-brand-choice)] pointer-events-none"
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-container-xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">

          {eyebrow && (
            <p className={cn('text-[var(--text-ui-sm)] font-semibold tracking-[0.1em] uppercase', c.eyebrow)}>
              {eyebrow}
            </p>
          )}

          <h2 className={cn(
            'font-[var(--tryvion-font-primary)] font-bold text-balance',
            'text-[clamp(2rem,4vw+0.5rem,3.5rem)]',
            'leading-[1.1] tracking-[-0.02em]',
            c.headline,
          )}>
            {headline}
          </h2>

          {subtext && (
            <p className={cn('text-[var(--text-body-lg)] leading-relaxed', c.subtext)}>
              {subtext}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryCTA.href} variant="primary" size="lg">
              {primaryCTA.label}
            </Button>
            {secondaryCTA && (
              <Button
                href={secondaryCTA.href}
                variant="outline"
                size="lg"
                className={c.secondary}
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
