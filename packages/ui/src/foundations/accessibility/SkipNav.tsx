import { cn } from '@tryvion/utils'

/**
 * SkipNav — provides keyboard users a shortcut to skip past global
 * navigation directly to the main content area.
 *
 * WCAG 2.4.1 (Level A): bypass blocks.
 *
 * Usage in layout.tsx:
 *   <SkipNav contentId="main-content" />
 *   ...
 *   <main id="main-content" tabIndex={-1}>{children}</main>
 *
 * The link is visually hidden until focused, then slides into view.
 */
export interface SkipNavProps {
  /** ID of the main content element to link to (default: 'main-content') */
  contentId?: string
  /** Link text (default: 'Skip to main content') */
  label?: string
  className?: string
}

export function SkipNav({
  contentId = 'main-content',
  label = 'Skip to main content',
  className,
}: SkipNavProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn('skip-nav', className)}
    >
      {label}
    </a>
  )
}

/**
 * SkipNavContent — the landmark target for SkipNav.
 * Wraps <main> and applies the id + negative tabIndex for programmatic focus.
 */
export interface SkipNavContentProps {
  children: React.ReactNode
  /** Must match SkipNav's contentId (default: 'main-content') */
  id?: string
  className?: string
}

export function SkipNavContent({
  children,
  id = 'main-content',
  className,
}: SkipNavContentProps) {
  return (
    <main
      id={id}
      tabIndex={-1}
      className={cn('outline-none', className)}
    >
      {children}
    </main>
  )
}
