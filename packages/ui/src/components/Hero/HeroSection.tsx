import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'
import { Button } from '../Button/Button'
import type { ButtonVariant } from '../Button/Button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeroStat {
  value: string
  label: string
}

export interface HeroCTA {
  label:    string
  href:     string
  variant?: ButtonVariant
}

export interface HeroSectionProps {
  eyebrow?:      string
  headline:      string
  /** Supports rich text — pass a string or a ReactNode for highlighted spans */
  headlineNode?: ReactNode
  subtext?:      string
  primaryCTA?:   HeroCTA
  secondaryCTA?: HeroCTA
  stats?:        HeroStat[]
  /** Background treatment */
  variant?:      'ink' | 'gradient' | 'image' | 'light'
  backgroundImage?: { src: string; alt: string }
  /** Full viewport height (default: false = tall but not full) */
  fullHeight?:   boolean
  /** Content alignment */
  align?:        'center' | 'left'
  className?:    string
  children?:     ReactNode
}

// ---------------------------------------------------------------------------
// Background variants
// ---------------------------------------------------------------------------

const variantClasses = {
  ink: [
    'bg-[var(--color-surface-dark)]',
    'text-[var(--color-content-inverse)]',
  ].join(' '),

  gradient: [
    "bg-[linear-gradient(135deg,var(--color-surface-dark)_0%,color-mix(in_srgb,var(--color-surface-dark)_85%,var(--color-action-primary))_100%)]",
    'text-[var(--color-content-inverse)]',
  ].join(' '),

  image: [
    'relative bg-[var(--color-surface-dark)]',
    'text-[var(--color-content-inverse)]',
  ].join(' '),

  light: [
    'bg-[var(--color-surface-subtle)]',
    'text-[var(--color-content-primary)]',
  ].join(' '),
}

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------

export function HeroSection({
  eyebrow,
  headline,
  headlineNode,
  subtext,
  primaryCTA,
  secondaryCTA,
  stats,
  variant     = 'ink',
  backgroundImage,
  fullHeight  = false,
  align       = 'center',
  className,
  children,
}: HeroSectionProps) {
  const isDark = variant !== 'light'

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden',
        fullHeight ? 'min-h-svh' : 'min-h-[560px] lg:min-h-[680px]',
        variantClasses[variant],
        className,
      )}
    >
      {/* Background image */}
      {variant === 'image' && backgroundImage && (
        <>
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--color-surface-dark)]/60"
          />
        </>
      )}

      {/* Decorative gradient orb — ink/gradient variants only */}
      {(variant === 'ink' || variant === 'gradient') && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] bg-[var(--color-action-primary)] pointer-events-none"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10 py-24 lg:py-32">
        <div
          className={cn(
            'flex flex-col gap-8',
            align === 'center' && 'items-center text-center max-w-4xl mx-auto',
            align === 'left'   && 'items-start max-w-3xl',
          )}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <p className={cn(
              'text-[var(--text-ui-sm)] font-semibold tracking-[0.1em] uppercase',
              isDark ? 'text-[var(--color-brand-choice)]' : 'text-[var(--color-action-primary)]',
            )}>
              {eyebrow}
            </p>
          )}

          {/* Headline */}
          <h1 className={cn(
            'font-[var(--tryvion-font-primary)] font-bold text-balance',
            'text-[clamp(2.5rem,6vw+1rem,5rem)]',
            'leading-[1.05] tracking-[-0.03em]',
            isDark ? 'text-[var(--color-content-inverse)]' : 'text-[var(--color-content-primary)]',
          )}>
            {headlineNode ?? headline}
          </h1>

          {/* Subtext */}
          {subtext && (
            <p className={cn(
              'text-[var(--text-body-lg)] leading-relaxed max-w-2xl',
              isDark ? 'text-white/70' : 'text-[var(--color-content-secondary)]',
            )}>
              {subtext}
            </p>
          )}

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap items-center gap-4">
              {primaryCTA && (
                <Button
                  href={primaryCTA.href}
                  variant={primaryCTA.variant ?? 'primary'}
                  size="lg"
                >
                  {primaryCTA.label}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  href={secondaryCTA.href}
                  variant={secondaryCTA.variant ?? (isDark ? 'ghost' : 'outline')}
                  size="lg"
                  className={isDark ? 'text-white border-white/30 hover:bg-white/10' : undefined}
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          )}

          {/* Custom slot */}
          {children}
        </div>

        {/* Stats bar */}
        {stats && stats.length > 0 && (
          <div
            className={cn(
              'mt-16 pt-10',
              isDark ? 'border-t border-white/10' : 'border-t border-[var(--color-border-default)]',
            )}
          >
            <dl
              className={cn(
                'grid gap-8',
                stats.length === 2 && 'grid-cols-2',
                stats.length === 3 && 'grid-cols-2 sm:grid-cols-3',
                stats.length >= 4 && 'grid-cols-2 sm:grid-cols-4',
              )}
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dd className={cn(
                    'text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-tight font-[var(--tryvion-font-primary)]',
                    isDark ? 'text-white' : 'text-[var(--color-content-primary)]',
                  )}>
                    {value}
                  </dd>
                  <dt className={cn(
                    'text-[var(--text-ui-sm)]',
                    isDark ? 'text-white/60' : 'text-[var(--color-content-secondary)]',
                  )}>
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  )
}
