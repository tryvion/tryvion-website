import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

export interface FooterLink {
  label:     string
  href:      string
  external?: boolean
}

export interface FooterLinkColumn {
  heading: string
  links:   FooterLink[]
}

export interface FooterSocialLink {
  label: string
  href:  string
  icon:  ReactNode
}

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

export interface FooterProps {
  logo:          ReactNode
  tagline?:      string
  description?:  string
  columns:       FooterLinkColumn[]
  socialLinks?:  FooterSocialLink[]
  legalLinks?:   FooterLink[]
  copyright?:    string
  className?:    string
}

export function Footer({
  logo,
  tagline,
  description,
  columns,
  socialLinks,
  legalLinks,
  copyright,
  className,
}: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className={cn(
        'bg-[var(--color-surface-dark)] text-[var(--color-content-inverse)]',
        className,
      )}
    >
      {/* Upper footer — logo, columns */}
      <div className="mx-auto w-full max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_repeat(4,1fr)]">

            {/* Brand column */}
            <div className="flex flex-col gap-6">
              {logo}
              {tagline && (
                <p className="text-[var(--text-ui-sm)] font-medium tracking-[0.08em] uppercase text-[var(--color-brand-choice)]">
                  {tagline}
                </p>
              )}
              {description && (
                <p className="text-[var(--text-body-sm)] text-white/60 leading-relaxed max-w-xs">
                  {description}
                </p>
              )}

              {/* Social links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-2">
                  {socialLinks.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={cn(
                        'flex items-center justify-center w-8 h-8',
                        'text-white/50 hover:text-white',
                        'transition-colors duration-[var(--tryvion-duration-fast)]',
                        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 rounded-sm',
                      )}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link columns */}
            {columns.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-4">
                <h3 className="text-[var(--text-ui-sm)] font-semibold tracking-[0.06em] uppercase text-white/90">
                  {heading}
                </h3>
                <ul className="flex flex-col gap-3" role="list">
                  {links.map(({ label, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'text-[var(--text-body-sm)] text-white/60',
                          'hover:text-white',
                          'transition-colors duration-[var(--tryvion-duration-fast)]',
                          'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 rounded-[1px]',
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-container-3xl px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

            {copyright && (
              <p className="text-[var(--text-ui-sm)] text-white/40 order-2 sm:order-1">
                {copyright}
              </p>
            )}

            {legalLinks && legalLinks.length > 0 && (
              <nav aria-label="Legal navigation" className="order-1 sm:order-2">
                <ul className="flex items-center gap-6" role="list">
                  {legalLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className={cn(
                          'text-[var(--text-ui-sm)] text-white/40',
                          'hover:text-white/70',
                          'transition-colors duration-[var(--tryvion-duration-fast)]',
                          'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 rounded-[1px]',
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

          </div>
        </div>
      </div>
    </footer>
  )
}
