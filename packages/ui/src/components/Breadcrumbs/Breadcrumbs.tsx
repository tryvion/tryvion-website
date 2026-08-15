import NextLink from 'next/link'
import { cn } from '@tryvion/utils'

export interface BreadcrumbItem {
  label: string
  href?: string    // omit for current page (last item)
}

export interface BreadcrumbsProps {
  items:      BreadcrumbItem[]
  /** Collapse middle items on small screens when breadcrumb is long (default: true) */
  responsive?: boolean
  className?:  string
}

export function Breadcrumbs({ items, responsive = true, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  // Build JSON-LD structured data (schema.org/BreadcrumbList)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ label, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
      ...(href ? { item: href } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn('flex items-center', className)}
      >
        <ol
          role="list"
          className="flex flex-wrap items-center gap-1 text-[var(--text-ui-sm)]"
        >
          {items.map(({ label, href }, i) => {
            const isLast   = i === items.length - 1
            const isMiddle = !isLast && i > 0 && items.length > 3

            return (
              <li
                key={i}
                className={cn(
                  'flex items-center gap-1',
                  // Collapse middle items on mobile when responsive
                  responsive && isMiddle && 'hidden sm:flex',
                )}
              >
                {/* Separator (except before first item) */}
                {i > 0 && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[var(--color-content-muted)] shrink-0"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}

                {isLast ? (
                  // Current page — not a link
                  <span
                    aria-current="page"
                    className="font-medium text-[var(--color-content-primary)] truncate max-w-[200px]"
                  >
                    {label}
                  </span>
                ) : (
                  <NextLink
                    href={href ?? '#'}
                    className={cn(
                      'text-[var(--color-content-secondary)]',
                      'hover:text-[var(--color-content-primary)]',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2 rounded-sm',
                      'transition-colors duration-[var(--tryvion-duration-fast)]',
                      'truncate max-w-[160px]',
                    )}
                  >
                    {label}
                  </NextLink>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
