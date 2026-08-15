/**
 * TRYVION Primitive Opacity Tokens
 *
 * Standardised opacity scale for overlays, disabled states, and hover effects.
 */

export const opacityPrimitives = {
  0:   '0',
  5:   '0.05',
  10:  '0.1',
  20:  '0.2',
  40:  '0.4',
  60:  '0.6',
  80:  '0.8',
  90:  '0.9',
  95:  '0.95',
  100: '1',
} as const

export type OpacityStep = keyof typeof opacityPrimitives
