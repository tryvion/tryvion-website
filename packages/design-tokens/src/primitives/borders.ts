/**
 * TRYVION Primitive Border Tokens
 *
 * Border widths and styles. Color is applied via semantic color tokens.
 */

export const borderWidths = {
  none:   '0',
  thin:   '1px',
  medium: '2px',
  thick:  '4px',
} as const

export const borderStyles = {
  solid:  'solid',
  dashed: 'dashed',
  dotted: 'dotted',
} as const

export type BorderWidth = keyof typeof borderWidths
export type BorderStyle = keyof typeof borderStyles
