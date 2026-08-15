import type { ReactNode } from 'react'
import { cn } from '@tryvion/utils'

export interface StatBlockProps {
  value:        string
  label:        string
  description?: string
  /** Optional trend indicator */
  trend?:       { value: string; positive: boolean }
  /** 'default' = dark text; 'ink' = light text for dark backgrounds */
  variant?:     'default' | 'ink'
  className?:   string
}

export function StatBlock({
  value,
  label,
  description,
  trend,
  variant   = 'default',
  className,
}: StatBlockProps) {
  const isDark = variant === 'ink'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-end gap-3">
        <span className={cn(
          'font-[var(--tryvion-font-primary)] font-bold leading-none tracking-tight',
          'text-[clamp(2.5rem,5vw,4rem)]',
          isDark ? 'text-white' : 'text-[var(--color-content-primary)]',
        )}>
          {value}
        </span>
        {trend && (
          <span className={cn(
            'flex items-center gap-0.5 mb-1 text-[var(--text-ui-sm)] font-semibold',
            trend.positive ? 'text-[var(--color-status-success)]' : 'text-[var(--color-status-error)]',
          )}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {trend.positive
                ? <path d="M5 12l5-5 9 9" />
                : <path d="M5 12l5 5 9-9" />
              }
            </svg>
            {trend.value}
          </span>
        )}
      </div>

      <p className={cn(
        'text-[var(--text-ui-md)] font-medium',
        isDark ? 'text-white/80' : 'text-[var(--color-content-secondary)]',
      )}>
        {label}
      </p>

      {description && (
        <p className={cn(
          'text-[var(--text-ui-sm)]',
          isDark ? 'text-white/50' : 'text-[var(--color-content-muted)]',
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
