import type { ElementType, ReactNode } from 'react';
import { cn } from '@tryvion/utils';

// ---------------------------------------------------------------------------
// Spacing scale
//
// Supports both string and numeric values so existing components can use:
//   gap="4"
//   gap={4}
//
// Both resolve to exactly the same Tailwind class: gap-4.
// This is a type-safety compatibility change only and does not alter layout.
// ---------------------------------------------------------------------------

const gapClasses: Record<string, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
  '20': 'gap-20',
  '24': 'gap-24',
};

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

const alignClasses: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

// ---------------------------------------------------------------------------
// Justification
// ---------------------------------------------------------------------------

const justifyClasses: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type StackGap =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// ---------------------------------------------------------------------------
// Stack props
// ---------------------------------------------------------------------------

export interface StackProps {
  children: ReactNode;

  /** Flex direction (default: vertical = column) */
  direction?: 'vertical' | 'horizontal';

  /**
   * Gap from the 8pt spacing scale.
   *
   * Both string and numeric values are supported:
   *   gap="4"
   *   gap={4}
   *
   * Default: 4
   */
  gap?: StackGap;

  /** Cross-axis alignment */
  align?: StackAlign;

  /** Main-axis justification */
  justify?: StackJustify;

  /** Allow flex-wrap (default: false) */
  wrap?: boolean;

  /** Full width (default: false) */
  fullWidth?: boolean;

  /** Additional Tailwind/CSS classes */
  className?: string;

  /** Render as another HTML element */
  as?: ElementType;
}

// ---------------------------------------------------------------------------
// Stack component
// ---------------------------------------------------------------------------

export function Stack({
  children,
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  wrap = false,
  fullWidth = false,
  className,
  as: Element = 'div',
}: StackProps) {
  const normalizedGap = String(gap);

  return (
    <Element
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClasses[normalizedGap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className,
      )}
    >
      {children}
    </Element>
  );
}
