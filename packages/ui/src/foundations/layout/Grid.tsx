import type { ElementType, ReactNode } from 'react';
import { cn } from '@tryvion/utils';

// ---------------------------------------------------------------------------
// Grid foundation
//
// Supports both numeric and string design-token values.
//
// Existing application usage can therefore remain unchanged:
//
//   <Grid cols={12} gap={16}>
//   <Grid cols={3} gap={8}>
//   <Grid cols="12" gap="16">
//
// This is a type-compatibility change only.
// The existing Tailwind mappings and rendered layout behaviour are preserved.
// ---------------------------------------------------------------------------

const colClasses: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '6': 'grid-cols-6',
  '12': 'grid-cols-12',
  auto: 'grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))]',
};

const gapClasses: Record<string, string> = {
  '0': 'gap-0',
  '2': 'gap-2',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
};

export type GridColumnCount = 1 | 2 | 3 | 4 | 6 | 12 | '1' | '2' | '3' | '4' | '6' | '12' | 'auto';

export type GridGap =
  0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16';

export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridProps {
  children: ReactNode;

  /**
   * Number of columns.
   *
   * Both numeric and string forms are supported.
   */
  cols?: GridColumnCount;

  /**
   * Shared row/column gap.
   */
  gap?: GridGap;

  /**
   * Individual column gap.
   */
  colGap?: GridGap;

  /**
   * Individual row gap.
   */
  rowGap?: GridGap;

  /**
   * Vertical alignment of grid items.
   */
  align?: GridAlign;

  className?: string;

  /**
   * Semantic HTML element.
   */
  as?: ElementType;
}

const alignClasses: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

function normalizeToken(value: string | number): string {
  return String(value);
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
  const normalizedCols = normalizeToken(cols);
  const normalizedGap = normalizeToken(gap);

  const normalizedColGap = colGap !== undefined ? normalizeToken(colGap) : undefined;

  const normalizedRowGap = rowGap !== undefined ? normalizeToken(rowGap) : undefined;

  const hasIndependentGaps = colGap !== undefined || rowGap !== undefined;

  return (
    <Element
      className={cn(
        'grid',

        // Column definition.
        colClasses[normalizedCols],

        // Shared gap is used only when no independent gap has
        // been supplied.
        !hasIndependentGaps ? gapClasses[normalizedGap] : undefined,

        // Independent column gap.
        normalizedColGap !== undefined ? `gap-x-${normalizedColGap}` : undefined,

        // Independent row gap.
        normalizedRowGap !== undefined ? `gap-y-${normalizedRowGap}` : undefined,

        // Vertical alignment.
        align ? alignClasses[align] : undefined,

        // Consumer classes remain untouched.
        className,
      )}
    >
      {children}
    </Element>
  );
}

// ---------------------------------------------------------------------------
// Grid.Col
// ---------------------------------------------------------------------------

export type GridColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridColProps {
  children: ReactNode;

  span?: GridColumnSpan;

  sm?: GridColumnSpan;

  md?: GridColumnSpan;

  lg?: GridColumnSpan;

  xl?: GridColumnSpan;

  className?: string;

  as?: ElementType;
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

        sm !== undefined ? `sm:col-span-${sm}` : undefined,

        md !== undefined ? `md:col-span-${md}` : undefined,

        lg !== undefined ? `lg:col-span-${lg}` : undefined,

        xl !== undefined ? `xl:col-span-${xl}` : undefined,

        className,
      )}
    >
      {children}
    </Element>
  );
}
