import type { ReactNode } from 'react';
import { cn } from '@tryvion/utils';

// ---------------------------------------------------------------------------
// StatBlock
//
// Presentation component for displaying a metric, label, optional
// description, and optional trend indicator.
//
// The component intentionally accepts both numeric and string values because
// metrics can originate from CMS/API data as numbers or already-formatted
// display strings.
//
// Supported examples:
//   value={500}
//   value="500+"
//   value="$2.4B"
// ---------------------------------------------------------------------------

export interface StatBlockTrend {
  value: string;
  positive: boolean;
}

export type StatBlockTrendDirection = 'up' | 'down';

export interface StatBlockProps {
  /**
   * Display value for the metric.
   *
   * Accepts both numbers and strings so callers can pass raw numeric
   * values or pre-formatted display values without casting.
   */
  value: string | number;

  label: string;

  description?: string;

  /**
   * Supports both:
   *
   * { value: '+12%', positive: true }
   *
   * and:
   *
   * 'up'
   * 'down'
   *
   * The directional form intentionally does not introduce a text value.
   */
  trend?: StatBlockTrend | StatBlockTrendDirection;

  /**
   * default = standard content colours
   * ink     = light content for dark backgrounds
   */
  variant?: 'default' | 'ink';

  className?: string;
}

export function StatBlock({
  value,
  label,
  description,
  trend,
  variant = 'default',
  className,
}: StatBlockProps) {
  const isDark = variant === 'ink';

  // Normalize the supported trend formats into one internal shape.
  const normalizedTrend: StatBlockTrend | undefined =
    typeof trend === 'string'
      ? {
          value: '',
          positive: trend === 'up',
        }
      : trend;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-end gap-3">
        <span
          className={cn(
            'font-[var(--tryvion-font-primary)] font-bold leading-none tracking-tight',
            'text-[clamp(2.5rem,5vw,4rem)]',
            isDark ? 'text-white' : 'text-[var(--color-content-primary)]',
          )}
        >
          {value}
        </span>

        {normalizedTrend && (
          <span
            className={cn(
              'flex items-center gap-0.5 mb-1',
              'text-[var(--text-ui-sm)] font-semibold',
              normalizedTrend.positive
                ? 'text-[var(--color-status-success)]'
                : 'text-[var(--color-status-error)]',
            )}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {normalizedTrend.positive ? <path d="M5 12l5-5 9 9" /> : <path d="M5 12l5 5 9-9" />}
            </svg>

            {normalizedTrend.value}
          </span>
        )}
      </div>

      <p
        className={cn(
          'text-[var(--text-ui-md)] font-medium',
          isDark ? 'text-white/80' : 'text-[var(--color-content-secondary)]',
        )}
      >
        {label}
      </p>

      {description && (
        <p
          className={cn(
            'text-[var(--text-ui-sm)]',
            isDark ? 'text-white/50' : 'text-[var(--color-content-muted)]',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
