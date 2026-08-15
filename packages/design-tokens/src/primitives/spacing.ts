/**
 * TRYVION Primitive Spacing Tokens
 *
 * 8-point grid system. Base unit: 8px.
 * Micro-spacing (4px / step 1) available for fine component adjustments.
 *
 * All rem values assume 16px browser base font size.
 * Key steps: 2 = 8px, 4 = 16px, 6 = 24px, 8 = 32px, 12 = 48px, 16 = 64px
 */

export const spacingScale = {
  0:   '0',        //    0px
  1:   '0.25rem',  //    4px — micro-spacing
  2:   '0.5rem',   //    8px — base unit ×1
  3:   '0.75rem',  //   12px
  4:   '1rem',     //   16px — base unit ×2
  5:   '1.25rem',  //   20px
  6:   '1.5rem',   //   24px — base unit ×3
  8:   '2rem',     //   32px — base unit ×4
  10:  '2.5rem',   //   40px
  12:  '3rem',     //   48px — base unit ×6
  16:  '4rem',     //   64px — base unit ×8
  20:  '5rem',     //   80px
  24:  '6rem',     //   96px
  32:  '8rem',     //  128px
  40:  '10rem',    //  160px
  48:  '12rem',    //  192px
  64:  '16rem',    //  256px
} as const

/** Pixel reference values — for documentation and design handoff only. */
export const spacingPx = {
  0:   0,
  1:   4,
  2:   8,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  8:   32,
  10:  40,
  12:  48,
  16:  64,
  20:  80,
  24:  96,
  32:  128,
  40:  160,
  48:  192,
  64:  256,
} as const

export type SpacingStep = keyof typeof spacingScale
