import type { ElementType, ReactNode } from 'react'
import { cn } from '@tryvion/utils'

const gapClasses: Record<string, string> = {
  '0':  'gap-0',
  '1':  'gap-1',
  '2':  'gap-2',
  '3':  'gap-3',
  '4':  'gap-4',
  '5':  'gap-5',
  '6':  'gap-6',
  '7':  'gap-7',
  '8':  'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
  '16': 'gap-16',
  '20': 'gap-20',
  '24': 'gap-24',
}

const alignClasses: Record<string, string> = {
  start:   'items-start',
  center:  'items-center',
  end:     'items-end',
  stretch: 'items-stretch',
  baseline:'items-baseline',
}

const justifyClasses: Record<string, string> = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
}

export interface StackProps {
  children: ReactNode
  /** Flex direction (default: vertical = column) */
  direction?: 'vertical' | 'horizontal'
  /** Gap from the 8pt spacing scale (default: 4 = 1rem / 16px) */
  gap?: keyof typeof gapClasses
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Allow flex-wrap (default: false) */
  wrap?: boolean
  /** Full width (default: false) */
  fullWidth?: boolean
  className?: string
  as?: ElementType
}

export function Stack({
  children,
  direction = 'vertical',
  gap = '4',
  align,
  justify,
  wrap = false,
  fullWidth = false,
  className,
  as: Element = 'div',
}: StackProps) {
  return (
    <Element
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClasses[gap],
        align && alignClasses[align],
        justify && justifyClasses[justify],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className,
      )}
    >
      {children}
    </Element>
  )
}
