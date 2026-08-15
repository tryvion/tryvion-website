/**
 * TRYVION Primitive Elevation Tokens
 *
 * Restrained shadow hierarchy using brand ink color (rgba of #0B1E3D).
 * Shadows communicate layering, not decoration.
 * Maximum 6 levels — enterprise sites must not over-shadow.
 */

export const elevationPrimitives = {
  none:     'none',
  subtle:   '0 1px 3px rgba(11, 30, 61, 0.06)',
  raised:   '0 4px 12px rgba(11, 30, 61, 0.08)',
  floating: '0 8px 24px rgba(11, 30, 61, 0.12)',
  overlay:  '0 16px 48px rgba(11, 30, 61, 0.16)',
  modal:    '0 24px 64px rgba(11, 30, 61, 0.20)',
} as const

export type ElevationPrimitive = keyof typeof elevationPrimitives
