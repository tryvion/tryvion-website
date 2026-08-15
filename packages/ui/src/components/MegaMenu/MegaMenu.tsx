'use client'

import { useState, useRef, useCallback, useEffect, useId } from 'react'
import NextLink from 'next/link'
import { cn } from '@tryvion/utils'
import type { NavItemConfig, MegaMenuConfig } from './types'

// ---------------------------------------------------------------------------
// Panel — renders columns + optional featured card + footer CTA
// ---------------------------------------------------------------------------

function MegaPanel({
  config,
  panelId,
}: {
  config: MegaMenuConfig
  panelId: string
}) {
  const { columns, featured, cta } = config
  const colCount = Math.min(columns.length, 4)

  return (
    <div
      id={panelId}
      role="region"
      className="w-full bg-[var(--color-surface-default)] border-b border-[var(--color-border-default)] shadow-[var(--shadow-3)]"
    >
      <div className="mx-auto w-full max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10 py-10">
        <div
          className={cn(
            'grid gap-8',
            featured ? 'lg:grid-cols-[1fr_280px]' : 'grid-cols-1',
          )}
        >
          {/* Link columns */}
          <div
            className={cn(
              'grid gap-8',
              colCount === 2 && 'sm:grid-cols-2',
              colCount === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
              colCount >= 4 && 'sm:grid-cols-2 lg:grid-cols-4',
            )}
          >
            {columns.map(({ heading, links }, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3">
                {heading && (
                  <p className="text-[var(--text-ui-sm)] font-semibold tracking-[0.06em] uppercase text-[var(--color-content-secondary)]">
                    {heading}
                  </p>
                )}
                <ul className="flex flex-col gap-1" role="list">
                  {links.map(({ label, href, description }) => (
                    <li key={href}>
                      <NextLink
                        href={href}
                        className={cn(
                          'group flex flex-col gap-0.5 px-2 py-1.5 rounded-[var(--radius-sm)]',
                          'text-[var(--color-content-primary)]',
                          'hover:bg-[var(--color-surface-subtle)]',
                          'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
                          'transition-colors duration-[var(--tryvion-duration-fast)]',
                        )}
                      >
                        <span className="text-[var(--text-ui-md)] font-medium group-hover:text-[var(--color-action-primary)] transition-colors duration-[var(--tryvion-duration-fast)]">
                          {label}
                        </span>
                        {description && (
                          <span className="text-[var(--text-ui-sm)] text-[var(--color-content-secondary)] leading-snug">
                            {description}
                          </span>
                        )}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured card */}
          {featured && (
            <NextLink
              href={featured.href}
              className={cn(
                'flex flex-col gap-3 p-5 rounded-[var(--radius-lg)]',
                'bg-[var(--color-surface-subtle)]',
                'border border-[var(--color-border-default)]',
                'hover:border-[var(--color-action-primary)] hover:bg-[var(--color-brand-momentum)]/5',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
                'transition-colors duration-[var(--tryvion-duration-normal)]',
                'self-start',
              )}
            >
              {featured.eyebrow && (
                <p className="text-[var(--text-ui-sm)] font-semibold tracking-[0.06em] uppercase text-[var(--color-action-primary)]">
                  {featured.eyebrow}
                </p>
              )}
              <p className="text-[var(--text-body-md)] font-semibold text-[var(--color-content-primary)] leading-snug">
                {featured.title}
              </p>
              {featured.excerpt && (
                <p className="text-[var(--text-body-sm)] text-[var(--color-content-secondary)] leading-relaxed">
                  {featured.excerpt}
                </p>
              )}
              {featured.cta && (
                <p className="text-[var(--text-ui-sm)] font-semibold text-[var(--color-action-primary)] mt-auto">
                  {featured.cta} →
                </p>
              )}
            </NextLink>
          )}
        </div>

        {/* Footer CTA */}
        {cta && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border-default)]">
            <NextLink
              href={cta.href}
              className={cn(
                'inline-flex items-center gap-1.5',
                'text-[var(--text-ui-md)] font-semibold text-[var(--color-action-primary)]',
                'hover:text-[var(--color-action-primary-hover)]',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 rounded-sm',
                'transition-colors duration-[var(--tryvion-duration-fast)]',
              )}
            >
              {cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NextLink>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MegaMenu — manages open state, hover intent, keyboard navigation
// ---------------------------------------------------------------------------

export interface MegaMenuProps {
  items: NavItemConfig[]
  className?: string
}

export function MegaMenu({ items, className }: MegaMenuProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const openTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRefs   = useRef<Map<string, HTMLButtonElement | HTMLAnchorElement>>(new Map())
  const navRef        = useRef<HTMLDivElement>(null)
  const uid           = useId()

  const clearTimers = useCallback(() => {
    if (openTimerRef.current)  clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const open = useCallback((key: string) => {
    clearTimers()
    openTimerRef.current = setTimeout(() => setActiveKey(key), 120)
  }, [clearTimers])

  const close = useCallback(() => {
    clearTimers()
    closeTimerRef.current = setTimeout(() => setActiveKey(null), 180)
  }, [clearTimers])

  const closeNow = useCallback((returnKey?: string) => {
    clearTimers()
    setActiveKey(null)
    if (returnKey) {
      triggerRefs.current.get(returnKey)?.focus()
    }
  }, [clearTimers])

  // Close on Escape anywhere in the nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeKey) {
        closeNow(activeKey)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeKey, closeNow])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (activeKey && navRef.current && !navRef.current.contains(e.target as Node)) {
        closeNow()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [activeKey, closeNow])

  return (
    <>
      {/* Backdrop — dims page content when a panel is open */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-[var(--color-content-primary)]/30 z-[10]',
          'transition-opacity duration-[var(--tryvion-duration-normal)]',
          activeKey ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onMouseEnter={close}
      />

      {/* Nav bar */}
      <div
        ref={navRef}
        className={cn('relative z-[20]', className)}
        onMouseLeave={close}
      >
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1" role="list">
            {items.map((item) => {
              const key       = item.label
              const isActive  = activeKey === key
              const panelId   = `${uid}-panel-${key.toLowerCase().replace(/\s+/g, '-')}`
              const triggerId = `${uid}-trigger-${key.toLowerCase().replace(/\s+/g, '-')}`

              return (
                <li key={key}>
                  {item.megaMenu ? (
                    // Trigger for items with a mega panel
                    <button
                      id={triggerId}
                      ref={(el) => {
                        if (el) triggerRefs.current.set(key, el)
                      }}
                      type="button"
                      aria-expanded={isActive}
                      aria-haspopup="true"
                      aria-controls={panelId}
                      onClick={() => isActive ? closeNow(key) : (clearTimers(), setActiveKey(key))}
                      onMouseEnter={() => open(key)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-[var(--radius-sm)]',
                        'text-[var(--text-ui-md)] font-medium',
                        'transition-colors duration-[var(--tryvion-duration-fast)]',
                        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
                        isActive
                          ? 'text-[var(--color-action-primary)] bg-[var(--color-surface-subtle)]'
                          : 'text-[var(--color-content-primary)] hover:text-[var(--color-action-primary)] hover:bg-[var(--color-surface-subtle)]',
                      )}
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={cn(
                          'transition-transform duration-[var(--tryvion-duration-fast)]',
                          isActive ? 'rotate-180' : 'rotate-0',
                        )}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  ) : (
                    // Plain link for items without a mega panel
                    <NextLink
                      href={item.href ?? '#'}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-[var(--radius-sm)]',
                        'text-[var(--text-ui-md)] font-medium',
                        'text-[var(--color-content-primary)] hover:text-[var(--color-action-primary)] hover:bg-[var(--color-surface-subtle)]',
                        'transition-colors duration-[var(--tryvion-duration-fast)]',
                        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
                      )}
                    >
                      {item.label}
                    </NextLink>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mega panels — positioned below the nav bar */}
        {items.map((item) => {
          if (!item.megaMenu) return null
          const key      = item.label
          const isActive = activeKey === key
          const panelId  = `${uid}-panel-${key.toLowerCase().replace(/\s+/g, '-')}`

          return (
            <div
              key={key}
              className={cn(
                'fixed left-0 right-0 top-[5rem] z-[15]',
                'transition-[opacity,transform] duration-[var(--tryvion-duration-normal)] ease-[var(--tryvion-ease-out)]',
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-2 pointer-events-none',
              )}
              onMouseEnter={() => {
                clearTimers()
                setActiveKey(key)
              }}
            >
              <MegaPanel config={item.megaMenu} panelId={panelId} />
            </div>
          )
        })}
      </div>
    </>
  )
}
