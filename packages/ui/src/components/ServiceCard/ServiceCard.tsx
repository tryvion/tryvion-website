import NextLink from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface ServiceCardProps {
  icon:         ReactNode
  title:        string
  description:  string
  href:         string
  /** Subtle tint applied to the icon container */
  accentColor?: 'momentum' | 'choice' | 'teal' | 'purple' | 'orange'
  className?:   string
}

const accentMap = {
  momentum: 'bg-[var(--color-action-primary)]/10 text-[var(--color-action-primary)]',
  choice:   'bg-[var(--color-brand-choice)]/10 text-[var(--color-brand-choice)]',
  teal:     'bg-[var(--color-status-info)]/10 text-[var(--color-status-info)]',
  purple:   'bg-[#7C3AED]/10 text-[#7C3AED]',
  orange:   'bg-[var(--color-status-warning)]/10 text-[var(--color-status-warning)]',
}

export function ServiceCard({
  icon,
  title,
  description,
  href,
  accentColor = 'momentum',
  className,
}: ServiceCardProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        'group flex flex-col gap-5 p-6 rounded-[var(--radius-xl)]',
        'bg-[var(--color-surface-default)]',
        'border border-[var(--color-border-default)]',
        'hover:border-[var(--color-action-primary)]/30',
        'hover:shadow-[var(--shadow-3)]',
        'transition-[border-color,box-shadow] duration-[var(--tryvion-duration-normal)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2',
        className,
      )}
    >
      {/* Icon container */}
      <span
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] shrink-0',
          'transition-transform duration-[var(--tryvion-duration-normal)]',
          'group-hover:scale-110',
          accentMap[accentColor],
        )}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Text */}
      <span className="flex flex-col gap-2">
        <span className="text-[var(--text-body-md)] font-semibold text-[var(--color-content-primary)] group-hover:text-[var(--color-action-primary)] transition-colors duration-[var(--tryvion-duration-fast)]">
          {title}
        </span>
        <span className="text-[var(--text-body-sm)] text-[var(--color-content-secondary)] leading-relaxed line-clamp-3">
          {description}
        </span>
      </span>

      {/* Arrow indicator */}
      <span className="mt-auto flex items-center gap-1.5 text-[var(--text-ui-sm)] font-semibold text-[var(--color-action-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--tryvion-duration-fast)] -translate-x-2 group-hover:translate-x-0 transition-transform">
        Learn more
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </NextLink>
  )
}
