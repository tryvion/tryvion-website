/**
 * TRYVION Primitive Color Tokens
 *
 * Source: Brand Guidelines v1.0, August 2026
 *
 * These are raw hex values with no semantic meaning attached.
 * NEVER reference primitives directly in components or patterns.
 * Always consume colors through semantic tokens (src/semantic/color.ts).
 */

export const colorPrimitives = {

  // ─── Primary Brand Palette ────────────────────────────────────────────────
  // Source: Brand Guidelines — Primary Palette

  /** Deep navy. Primary text, headings, logos. Contrast on white: 16.2:1 (AAA). */
  ink: '#0B1E3D',

  /** Electric blue. Actions, links, buttons, highlights. Contrast on white: 5.12:1 (AA). */
  momentum: '#1458F2',

  /** Warm gold. Accents, icons, emphasis, brand differentiation.
   *  Decorative use only — contrast on white is insufficient for text. */
  choice: '#C9A24B',

  // ─── Neutral Palette ──────────────────────────────────────────────────────
  // Source: Brand Guidelines — Neutral Palette

  /** Mid-grey. Secondary text, dividers, UI elements. */
  slate: '#6B7280',

  /** Light blue-grey. Card backgrounds, section backgrounds, borders. */
  fog: '#D9DCE3',

  /** Near-white blue-grey. Subtle surface backgrounds. */
  mist: '#F2F4F7',

  /** Pure white. Primary page background, inverse text surfaces. */
  paper: '#FFFFFF',

  /** Near-black. Darkest surface — used for dark mode base and rich dark sections. */
  deepBlack: '#0A0D12',

  // ─── Accent Palette ───────────────────────────────────────────────────────
  // Source: Brand Guidelines — Accent Colours

  /** Strategy Teal. For strategy and intelligence content associations. */
  strategyTeal: '#469DA0',

  /** Innovation Purple. For innovation and balance content associations. */
  innovationPurple: '#6131E0',

  /** Energy Orange. For transformation and energy content associations. */
  energyOrange: '#EB9F38',

  /** Impact Coral. For impact, urgency, and error associations. */
  impactCoral: '#EF4444',

  // ─── System-Derived Interactive States ────────────────────────────────────
  // NOT in Brand Guidelines. Computed from brand primitives for interactive UI states.
  // See /docs/source-of-truth.md → STT-002

  /** Momentum darkened ~15%. Primary button hover state. */
  momentumDark: '#0F46CC',

  /** Momentum darkened ~25%. Primary button active/pressed state. */
  momentumDarker: '#0D3AA8',

  /** Momentum at ~5% opacity on white. Ghost hover backgrounds, focus rings. */
  momentumSubtle: '#EEF3FE',

  /** Choice gold darkened ~15%. Accent hover states. */
  choiceDark: '#A8872B',

  /** Ink lightened for interactive states on dark backgrounds. */
  inkLight: '#1A3A6B',

  // ─── System-Derived Status Colors ─────────────────────────────────────────
  // NOT in Brand Guidelines. Required for form validation, alerts, status indicators.
  // See /docs/source-of-truth.md → STT-003

  /** Success green. Contrast on white: 4.54:1 (AA). Safe for text. */
  successGreen: '#16A34A',

  /** Success green subtle background. */
  successSubtle: '#F0FDF4',

  /** Warning amber subtle background. */
  warningSubtle: '#FFFBEB',

  /** Error (impactCoral) subtle background. */
  errorSubtle: '#FEF2F2',

  /** Info (momentum) subtle background. Aliases momentumSubtle. */
  infoSubtle: '#EEF3FE',

} as const

export type ColorPrimitive      = keyof typeof colorPrimitives
export type ColorPrimitiveValue = (typeof colorPrimitives)[ColorPrimitive]
