/**
 * TRYVION Semantic Motion Tokens
 *
 * Restrained enterprise motion system.
 * Every animation must communicate orientation, hierarchy, continuity or feedback.
 * Motion must never be purely decorative.
 *
 * Canonical TRYVION easing: cubic-bezier(0.2, 0, 0, 1)
 * Source: UX Research Consolidation Report v1.0
 *
 * IMPORTANT: All transitions must be nullified under prefers-reduced-motion.
 * The @media (prefers-reduced-motion: reduce) block in variables.css handles
 * CSS duration tokens. React components must additionally check this preference.
 */

// ─── Duration ────────────────────────────────────────────────────────────────

export const duration = {
  /** No transition — immediate state change */
  instant:    '0ms',
  /** Micro-interactions: hover color, focus ring appearance */
  fast:       '100ms',
  /** Default UI transitions: button states, link underlines */
  normal:     '200ms',
  /** Moderate: panel reveals, card elevations, dropdown appearance */
  moderate:   '300ms',
  /** Slow: page section entrances, large component transitions */
  slow:       '500ms',
  /** Deliberate: hero animations, high-impact narrative moments */
  deliberate: '800ms',
} as const

// ─── Easing ──────────────────────────────────────────────────────────────────

export const easing = {
  linear:   'linear',
  /** Ease in: elements leaving the screen */
  easeIn:   'cubic-bezier(0.4, 0, 1, 1)',
  /** Ease out: canonical TRYVION easing — elements entering or settling.
   *  Source: UX Research Report — all primary UI transitions use this. */
  easeOut:  'cubic-bezier(0.2, 0, 0, 1)',
  /** Ease in-out: elements moving across the screen */
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Spring: subtle overshoot for confirmations, successes */
  spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// ─── Composed Transitions ────────────────────────────────────────────────────

export const transitions = {
  /** Default: general-purpose UI state change */
  default:    `all ${duration.normal} ${easing.easeOut}`,
  /** Colors: text, background, border color changes */
  color:      `color ${duration.fast} ${easing.easeOut}, background-color ${duration.fast} ${easing.easeOut}, border-color ${duration.fast} ${easing.easeOut}`,
  /** Opacity: fades */
  opacity:    `opacity ${duration.normal} ${easing.easeOut}`,
  /** Transform: movement, scale */
  transform:  `transform ${duration.moderate} ${easing.easeOut}`,
  /** Shadow: elevation state changes */
  shadow:     `box-shadow ${duration.normal} ${easing.easeOut}`,
  /** Button: hover/focus/active state */
  button:     `color ${duration.fast} ${easing.easeOut}, background-color ${duration.fast} ${easing.easeOut}, border-color ${duration.fast} ${easing.easeOut}, box-shadow ${duration.fast} ${easing.easeOut}, transform ${duration.fast} ${easing.easeOut}`,
  /** Card hover */
  card:       `box-shadow ${duration.normal} ${easing.easeOut}, transform ${duration.normal} ${easing.easeOut}`,
  /** Overlay/modal entrance */
  overlay:    `opacity ${duration.moderate} ${easing.easeOut}`,
  /** Panel/drawer slide */
  panel:      `transform ${duration.moderate} ${easing.easeOut}, opacity ${duration.moderate} ${easing.easeOut}`,
  /** Navigation mega-menu */
  megaMenu:   `opacity ${duration.normal} ${easing.easeOut}, transform ${duration.normal} ${easing.easeOut}`,
} as const

export type Duration   = keyof typeof duration
export type Easing     = keyof typeof easing
export type Transition = keyof typeof transitions
