import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

const colClasses: Record<string, string> = {
  '1':    'grid-cols-1',
  '2':    'grid-cols-2',
  '3':    'grid-cols-3',
  '4':    'grid-cols-4',
  '6':    'grid-cols-6',
  '12':   'grid-cols-12',
  'auto': 'grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))]',
}

const gapClasses: Record<string, string> = {
  '0':  'gap-0',
  '2':  'gap-2',
  '4':  'gap-4',
  '6':  'gap-6',
  '8':  'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
}

export interface GridProps {
  children: ReactNode
  /** Column count, or 'auto' for auto-fill responsive grid */
  cols?: '1' | '2' | '3' | '4' | '6' | '12' | 'auto'
  /** Gap from the 8pt spacing scale (default: 6 = 1.5rem / 24px) */
  gap?: '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16'
  /** Separate column and row gap when different values are needed */
  colGap?: '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16'
  rowGap?: '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16'
  align?: 'start' | 'center' | 'end' | 'stretch'
  className?: string
  as?: ElementType
}

const alignClasses: Record<string, string> = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
}

export function Grid({
  children,
  cols = '12',
  gap = '6',
  colGap,
  rowGap,
  align,
  className,
  as: Element = 'div',
}: GridProps) {
  return (
    <Element
      className={cn(
        'grid',
        colClasses[cols],
        !colGap && !rowGap ? gapClasses[gap] : undefined,
        colGap ? `gap-x-${colGap}` : undefined,
        rowGap ? `gap-y-${rowGap}` : undefined,
        align && alignClasses[align],
        className,
      )}
    >
      {children}
    </Element>
  )
}

// Grid.Col — shorthand for spanning columns within a Grid
export interface GridColProps {
  children: ReactNode
  /** Column span at default viewport (mobile: full width) */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Column span at sm breakpoint (≥640px) */
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Column span at md breakpoint (≥768px) */
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Column span at lg breakpoint (≥1024px) */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Column span at xl breakpoint (≥1280px) */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  className?: string
  as?: ElementType
}

export function GridCol({
  children,
  span = 12,
  sm,
  md,
  lg,
  xl,
  className,
  as: Element = 'div',
}: GridColProps) {
  return (
    <Element
      className={cn(
        `col-span-${span}`,
        sm && `sm:col-span-${sm}`,
        md && `md:col-span-${md}`,
        lg && `lg:col-span-${lg}`,
        xl && `xl:col-span-${xl}`,
        className,
      )}
    >
      {children}
    </Element>
  )
}
