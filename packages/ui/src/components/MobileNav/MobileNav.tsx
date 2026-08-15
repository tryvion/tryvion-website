'use client'

import { useEffect, useRef, useState } from 'react'
import NextLink from 'next/link'
import { cn } from '@tryvion/utils'
import type { NavItemConfig } from '../MegaMenu/types'
import { TryvionLogo } from '../Logo'

// ---------------------------------------------------------------------------
// Accordion item — for items with megaMenu children in mobile view
// ---------------------------------------------------------------------------

function MobileAccordionItem({ item }: { item: NavItemConfig }) {
  const [open, setOpen] = useState(false)
  const contentId = `mobile-accordion-${item.label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center justify-between w-full',
          'px-4 py-3.5 text-left',
          'text-[var(--text-body-md)] font-medium text-[var(--color-content-primary)]',
          'hover:bg-[var(--color-surface-subtle)]',
          'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-[−2px]',
          'transition-colors duration-[var(--tryvion-duration-fast)]',
          'border-b border-[var(--color-border-default)]',
        )}
      >
        {item.label}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn(
            'transition-transform duration-[var(--tryvion-duration-fast)] shrink-0',
            open ? 'rotate-180' : 'rotate-0',
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Sub-links */}
      <div
        id={contentId}
        hidden={!open}
        className="bg-[var(--color-surface-subtle)]"
      >
        {item.megaMenu?.columns.map(({ heading, links }, colIdx) => (
          <div key={colIdx}>
            {heading && (
              <p className="px-6 pt-4 pb-1 text-[var(--text-ui-sm)] font-semibold tracking-[0.06em] uppercase text-[var(--color-content-secondary)]">
                {heading}
              </p>
            )}
            <ul role="list">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <NextLink
                    href={href}
                    className={cn(
                      'block px-6 py-2.5',
                      'text-[var(--text-body-sm)] text-[var(--color-content-primary)]',
                      'hover:text-[var(--color-action-primary)] hover:bg-[var(--color-surface-default)]',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-[−2px]',
                      'transition-colors duration-[var(--tryvion-duration-fast)]',
                    )}
                  >
                    {label}
                  </NextLink>
                </li>
              ))}
            </ul>
            {item.megaMenu?.cta && colIdx === (item.megaMenu.columns.length - 1) && (
              <div className="px-6 py-4">
                <NextLink
                  href={item.megaMenu.cta.href}
                  className="text-[var(--text-ui-sm)] font-semibold text-[var(--color-action-primary)] hover:text-[var(--color-action-primary-hover)]"
                >
                  {item.megaMenu.cta.label} →
                </NextLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </li>
  )
}

// ---------------------------------------------------------------------------
// MobileNav — full-height drawer using native <dialog>
// ---------------------------------------------------------------------------

export interface MobileNavProps {
  items:        NavItemConfig[]
  cta?:         { label: string; href: string }
  isOpen:       boolean
  onClose:      () => void
}

export function MobileNav({ items, cta, isOpen, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      if (dialog.open) dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Sync dialog close event (e.g. native Escape key)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handler = () => onClose()
    dialog.addEventListener('close', handler)
    return () => dialog.removeEventListener('close', handler)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      aria-label="Mobile navigation"
      className={cn(
        'fixed inset-y-0 right-0 z-[var(--z-modal)] m-0 p-0',
        'w-full max-w-sm h-full max-h-none',
        'bg-[var(--color-surface-default)]',
        'overflow-y-auto overscroll-contain',
        // Remove default dialog styles
        'border-0 outline-none',
        // Slide-in animation — dialog open state
        'open:animate-[slideInRight_var(--tryvion-duration-normal)_var(--tryvion-ease-out)_both]',
        // Backdrop handled by ::backdrop in globals.css
      )}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-16 bg-[var(--color-surface-default)] border-b border-[var(--color-border-default)]">
        <NextLink href="/" aria-label="TRYVION — Return to homepage">
          <TryvionLogo variant="light" height={24} />
        </NextLink>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className={cn(
            'p-2 rounded-[var(--radius-sm)]',
            'text-[var(--color-content-primary)]',
            'hover:bg-[var(--color-surface-subtle)]',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
            'transition-colors duration-[var(--tryvion-duration-fast)]',
          )}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav list */}
      <nav aria-label="Mobile navigation">
        <ul role="list" className="divide-y divide-[var(--color-border-default)]">
          {items.map((item) =>
            item.megaMenu ? (
              <MobileAccordionItem key={item.label} item={item} />
            ) : (
              <li key={item.label}>
                <NextLink
                  href={item.href ?? '#'}
                  onClick={onClose}
                  className={cn(
                    'block px-4 py-3.5',
                    'text-[var(--text-body-md)] font-medium text-[var(--color-content-primary)]',
                    'hover:text-[var(--color-action-primary)] hover:bg-[var(--color-surface-subtle)]',
                    'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-[-2px]',
                    'transition-colors duration-[var(--tryvion-duration-fast)]',
                    'border-b border-[var(--color-border-default)]',
                  )}
                >
                  {item.label}
                </NextLink>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* CTA at bottom */}
      {cta && (
        <div className="p-4 mt-4">
          <NextLink
            href={cta.href}
            onClick={onClose}
            className={cn(
              'flex items-center justify-center w-full',
              'h-12 px-6 rounded-[var(--radius-md)]',
              'bg-[var(--color-action-primary)] text-[var(--color-content-inverse)]',
              'text-[var(--text-ui-md)] font-semibold',
              'hover:bg-[var(--color-action-primary-hover)]',
              'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
              'transition-colors duration-[var(--tryvion-duration-fast)]',
            )}
          >
            {cta.label}
          </NextLink>
        </div>
      )}
    </dialog>
  )
}

// ---------------------------------------------------------------------------
// MobileMenuButton — the hamburger trigger (used in Header's mobileMenuTrigger slot)
// ---------------------------------------------------------------------------

export interface MobileMenuButtonProps {
  isOpen:    boolean
  onToggle:  () => void
  className?: string
}

export function MobileMenuButton({ isOpen, onToggle, className }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      onClick={onToggle}
      className={cn(
        'p-2 rounded-[var(--radius-sm)]',
        'text-[var(--color-content-primary)]',
        'hover:bg-[var(--color-surface-subtle)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        'transition-colors duration-[var(--tryvion-duration-fast)]',
        className,
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {isOpen ? (
          <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </>
        ) : (
          <>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </>
        )}
      </svg>
    </button>
  )
}
