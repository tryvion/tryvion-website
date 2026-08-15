import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * Vertical section spacings map to semantic section-spacing tokens:
 *   sm:  4rem  / 64px
 *   md:  6rem  / 96px   — default
 *   lg:  8rem  / 128px
 *   xl:  10rem / 160px
 *   2xl: 12rem / 192px
 */
const spacingClasses: Record<string, { py: string }> = {
  none: { py: 'py-0' },
  sm:   { py: 'py-16' },
  md:   { py: 'py-24' },
  lg:   { py: 'py-32' },
  xl:   { py: 'py-40' },
  '2xl':{ py: 'py-48' },
}

const backgroundClasses: Record<string, string> = {
  default:  'bg-[var(--color-surface-default)]',
  subtle:   'bg-[var(--color-surface-subtle)]',
  dark:     'bg-[var(--color-surface-dark)] text-[var(--color-content-inverse)]',
  darker:   'bg-[var(--color-surface-darker)] text-[var(--color-content-inverse)]',
  accent:   'bg-[var(--color-surface-accent)]',
  transparent: 'bg-transparent',
}

export interface SectionProps {
  children: ReactNode
  /** Vertical padding variant (default: md = 96px) */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Background surface variant (default: default = white/paper) */
  background?: 'default' | 'subtle' | 'dark' | 'darker' | 'accent' | 'transparent'
  /** Section id for anchor navigation */
  id?: string
  className?: string
  as?: ElementType
}

export function Section({
  children,
  spacing = 'md',
  background = 'default',
  id,
  className,
  as: Element = 'section',
}: SectionProps) {
  return (
    <Element
      id={id}
      className={cn(
        spacingClasses[spacing].py,
        backgroundClasses[background],
        className,
      )}
    >
      {children}
    </Element>
  )
}
