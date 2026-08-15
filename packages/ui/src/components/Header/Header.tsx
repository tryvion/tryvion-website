import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

/**
 * Header — structural site header primitive.
 *
 * Slot-based API: pass logo, nav, and actions as children.
 * Scroll-based background transition is handled by SiteHeader in apps/web
 * (a client component wrapper, added in Phase 06).
 *
 * Height: 80px (h-20) — 10 × 8pt grid units.
 * z-index: --z-sticky (20).
 */

const variantClasses = {
  light: [
    'bg-[var(--color-surface-default)]',
    'text-[var(--color-content-primary)]',
    'border-b border-[var(--color-border-default)]',
  ].join(' '),

  dark: [
    'bg-[var(--color-surface-dark)]',
    'text-[var(--color-content-inverse)]',
    'border-b border-white/10',
  ].join(' '),

  transparent: [
    'bg-transparent',
    'text-[var(--color-content-inverse)]',
    'border-b border-transparent',
  ].join(' '),
}

export type HeaderVariant = keyof typeof variantClasses

export interface HeaderProps {
  /** Brand logo — typically <Link href="/"><TryvionLogo /></Link> */
  logo:           ReactNode
  /** Primary navigation — desktop only slot; hidden at <lg breakpoint */
  nav?:           ReactNode
  /** Right-side actions: search, sign-in, CTA button */
  actions?:       ReactNode
  /** Mobile menu trigger — rendered only at <lg breakpoint */
  mobileMenuTrigger?: ReactNode
  /** Background/text color scheme (default: light) */
  variant?:       HeaderVariant
  /** position: sticky top-0 (default: true) */
  sticky?:        boolean
  className?:     string
}

export function Header({
  logo,
  nav,
  actions,
  mobileMenuTrigger,
  variant  = 'light',
  sticky   = true,
  className,
}: HeaderProps) {
  return (
    <header
      role="banner"
      className={cn(
        'w-full z-[var(--z-sticky)]',
        'transition-[background-color,border-color] duration-[var(--tryvion-duration-normal)] ease-[var(--tryvion-ease-out)]',
        sticky && 'sticky top-0',
        variantClasses[variant],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 gap-8">

          {/* Logo — always visible */}
          <div className="flex-shrink-0">
            {logo}
          </div>

          {/* Primary navigation — desktop only */}
          {nav && (
            <div className="hidden lg:flex flex-1 items-center justify-start">
              {nav}
            </div>
          )}

          {/* Right-side actions — desktop only */}
          {actions && (
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {actions}
            </div>
          )}

          {/* Mobile menu trigger — shown only below lg breakpoint */}
          <div className="flex lg:hidden items-center">
            {mobileMenuTrigger ?? <DefaultMobileMenuTrigger />}
          </div>

        </div>
      </div>
    </header>
  )
}

// Minimal accessible hamburger — replaced by MobileNavigation in Phase 06
function DefaultMobileMenuTrigger() {
  return (
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
      className={cn(
        'p-2 rounded-[var(--radius-sm)]',
        'text-[var(--color-content-primary)]',
        'hover:bg-[var(--color-surface-subtle)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        'transition-colors duration-[var(--tryvion-duration-fast)]',
      )}
    >
      {/* Hamburger icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  )
}
