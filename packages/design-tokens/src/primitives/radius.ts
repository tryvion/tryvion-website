/**
 * TRYVION Primitive Border Radius Tokens
 *
 * Restrained enterprise scale. Avoids excessive consumer-app rounding.
 * No values above 24px except the pill utility.
 */

export const radiusPrimitives = {
  none:  '0',         //   0px — sharp edges
  xs:    '0.125rem',  //   2px — very subtle
  sm:    '0.25rem',   //   4px — subtle
  md:    '0.375rem',  //   6px — default (buttons, inputs)
  lg:    '0.5rem',    //   8px — cards, containers
  xl:    '0.75rem',   //  12px — modals, panels
  '2xl': '1rem',      //  16px — large panels, drawers
  '3xl': '1.5rem',    //  24px — maximum — used very sparingly
  pill:  '9999px',    //  full pill — tags, badges, toggles
} as const

export type RadiusPrimitive = keyof typeof radiusPrimitives
