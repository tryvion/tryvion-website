/**
 * TRYVION Primitive Typography Tokens
 *
 * Source: Brand Guidelines v1.0, August 2026
 *
 * ⚠️  FONT LICENSING — ACTION REQUIRED BEFORE PRODUCTION
 * ─────────────────────────────────────────────────────────────────────────────
 * Neue Haas Grotesk — supplied as TRIAL fonts. Cannot be used in production
 * without a commercial license from Linotype/Monotype (myfonts.com).
 * Development fallback: "Inter" (OFL licensed).
 *
 * Optima — PROPRIETARY Linotype/Monotype font. Requires commercial license.
 * Development fallback: Georgia / Palatino (system fonts).
 *
 * Manrope — OFL licensed. Production-safe. No action required.
 *
 * See /docs/source-of-truth.md → STT-001
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Font Families ─────────────────────────────────────────────────────────

export const fontFamilies = {

  /**
   * Primary: Neue Haas Grotesk Display / Text
   * Role: All headings, primary UI, core brand communication.
   * ⚠️  Requires commercial license for production.
   *     "Inter" is the development fallback — swap first in this stack once licensed.
   */
  primary:
    '"Neue Haas Grotesk Display", "Neue Haas Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  /**
   * Secondary: Manrope
   * Role: Body text, long-form content, secondary UI elements.
   * ✅  OFL licensed — safe for production without additional action.
   */
  secondary:
    '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  /**
   * Tertiary: Optima
   * Role: Editorial pull quotes, elegant brand accents. Use sparingly.
   * ⚠️  Proprietary Linotype/Monotype font. Requires commercial license.
   *     Georgia / Palatino are development fallbacks.
   */
  tertiary:
    '"Optima", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',

  /**
   * Monospace: Code snippets only. Not in Brand Guidelines — system default.
   */
  mono:
    '"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, "Courier New", monospace',

} as const

// ─── Font Weights ──────────────────────────────────────────────────────────
// Source: Brand Guidelines — weights specified per typeface

export const fontWeights = {
  thin:       100,  // Neue Haas Grotesk — rare editorial use
  extraLight: 200,  // Neue Haas Grotesk / Manrope
  light:      300,  // Neue Haas Grotesk / Manrope — supporting, secondary text
  regular:    400,  // Neue Haas Grotesk Roman / Manrope — body and long text
  medium:     500,  // Neue Haas Grotesk Medium / Manrope — body emphasis, UI
  semiBold:   600,  // Manrope — section emphasis, UI actions
  bold:       700,  // Neue Haas Grotesk Bold / Manrope — subheadings, strong emphasis
  extraBold:  800,  // Manrope — headlines
  black:      900,  // Neue Haas Grotesk Black — impactful display headlines
} as const

// ─── Font Sizes — Digital Type Scale ───────────────────────────────────────
// Source: Brand Guidelines — Type Scale (Digital)
// All values in rem. Assumes 16px browser base font size.

export const fontSizes = {

  // Display — Neue Haas Grotesk Black / Bold
  display2xl: '6rem',     //  96px — Hero flagship display
  displayXl:  '5rem',     //  80px — Primary display headline
  displayLg:  '4rem',     //  64px — Large display
  displayMd:  '3rem',     //  48px — Medium display
  displaySm:  '2.5rem',   //  40px — Small display / large section hero

  // Heading — Neue Haas Grotesk Bold / Medium
  h1: '2.5rem',    //  40px
  h2: '2rem',      //  32px
  h3: '1.75rem',   //  28px
  h4: '1.5rem',    //  24px
  h5: '1.25rem',   //  20px
  h6: '1.125rem',  //  18px

  // Body — Manrope Regular / Medium
  bodyLg: '1.125rem',  //  18px — Intro paragraphs, feature body
  bodyMd: '1rem',      //  16px — Default body copy
  bodySm: '0.875rem',  //  14px — Dense content, secondary body

  // UI — Manrope Medium / SemiBold
  uiLg: '1rem',      //  16px — Button labels, primary nav
  uiMd: '0.875rem',  //  14px — Secondary UI, form labels
  uiSm: '0.75rem',   //  12px — Tags, badges, metadata

  // Caption / Label — Manrope Regular
  captionLg: '0.75rem',    //  12px — Image captions, helper text
  captionSm: '0.6875rem',  //  11px — Smallest legible size — use sparingly

  // Editorial — Optima (tertiary typeface — use sparingly for brand accents)
  editorialLg: '1.5rem',   //  24px — Large pull quote
  editorialMd: '1.25rem',  //  20px — Standard pull quote

} as const

// ─── Line Heights ───────────────────────────────────────────────────────────

export const lineHeights = {
  none:    '1',     // Display: no leading — tightest
  tight:   '1.05',  // Display headlines
  snug:    '1.2',   // Headings
  normal:  '1.4',   // UI elements, short copy
  relaxed: '1.6',   // Body text — optimal readability
  loose:   '1.8',   // Long-form reading contexts
} as const

// ─── Letter Spacings ────────────────────────────────────────────────────────

export const letterSpacings = {
  display: '-0.02em',  // Large display: tighten default tracking
  heading: '-0.01em',  // Headings: subtle tightening
  body:     '0em',     // Body: no modification
  ui:       '0.01em',  // UI elements: slight expansion
  label:    '0.04em',  // Labels: noticeable tracking
  allCaps:  '0.08em',  // Uppercase labels: wide tracking
} as const

export type FontFamily    = keyof typeof fontFamilies
export type FontWeight    = keyof typeof fontWeights
export type FontSize      = keyof typeof fontSizes
export type LineHeight    = keyof typeof lineHeights
export type LetterSpacing = keyof typeof letterSpacings
