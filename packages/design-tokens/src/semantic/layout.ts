/**
 * TRYVION Semantic Layout Tokens
 *
 * Responsive grid, container widths, breakpoints.
 * Source: Architecture Audit Phase 01, informed by UX Research Report.
 */

export const breakpoints = {
  mobile:    '0px',
  'mobile-l': '480px',
  tablet:    '768px',
  laptop:    '1024px',
  desktop:   '1280px',
  wide:      '1536px',
} as const

export const containerMaxWidths = {
  sm:      '640px',
  md:      '768px',
  lg:      '1024px',
  xl:      '1280px',
  '2xl':   '1440px',
  '3xl':   '1680px',
  reading: '65ch',
} as const

export const grid = {
  mobile: {
    columns: 4,
    gutter:  '1rem',     // 16px
    margin:  '1rem',     // 16px
  },
  'mobile-l': {
    columns: 4,
    gutter:  '1rem',     // 16px
    margin:  '1.5rem',   // 24px
  },
  tablet: {
    columns: 8,
    gutter:  '1.5rem',   // 24px
    margin:  '2rem',     // 32px
  },
  laptop: {
    columns: 12,
    gutter:  '1.5rem',   // 24px
    margin:  '2.5rem',   // 40px
    maxWidth: '1280px',
  },
  desktop: {
    columns: 12,
    gutter:  '2rem',     // 32px
    margin:  '3rem',     // 48px
    maxWidth: '1440px',
  },
  wide: {
    columns: 12,
    gutter:  '2rem',     // 32px
    margin:  '4rem',     // 64px
    maxWidth: '1680px',
  },
} as const

export type Breakpoint = keyof typeof breakpoints
export type ContainerSize = keyof typeof containerMaxWidths
