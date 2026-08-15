/**
 * TRYVION Semantic Color Tokens
 *
 * Maps primitive colors to roles. These are the tokens components consume.
 * Never import from primitives directly in component files.
 *
 * Source: Brand Guidelines v1.0, August 2026
 */

import { colorPrimitives as p } from '../primitives/colors'

export const semanticColors = {

  // ─── Brand ──────────────────────────────────────────────────────────────
  brand: {
    ink:      p.ink,
    momentum: p.momentum,
    choice:   p.choice,
  },

  // ─── Content (text) ─────────────────────────────────────────────────────
  content: {
    /** Primary text: headings, body, high-emphasis labels. */
    primary:   p.ink,
    /** Secondary text: supporting labels, captions, placeholder. */
    secondary: p.slate,
    /** Tertiary: decorative separators only — do not use for text. */
    tertiary:  p.fog,
    /** Inverse text: on dark surfaces. */
    inverse:   p.paper,
    /** Disabled text: always combine with a non-color cue. */
    disabled:  p.slate,
    /** Text on brand/action colored backgrounds. */
    onBrand:   p.paper,
    /** Text on dark section backgrounds. */
    onDark:    p.paper,
  },

  // ─── Surface ────────────────────────────────────────────────────────────
  surface: {
    /** Default page background. */
    default:   p.paper,
    /** Subtle background: cards on white, zebra rows. */
    subtle:    p.mist,
    /** Moderate background: section dividers, table headers. */
    moderate:  p.fog,
    /** Raised surface: uses paper + elevation.raised shadow. */
    raised:    p.paper,
    /** Dark section background. */
    dark:      p.ink,
    /** Darkest section / dark-mode base. */
    darker:    p.deepBlack,
    /** Scrim/overlay: pair with opacity.60. */
    overlay:   p.ink,
  },

  // ─── Action ─────────────────────────────────────────────────────────────
  action: {
    primary:          p.momentum,
    primaryHover:     p.momentumDark,
    primaryPressed:   p.momentumDarker,
    primarySubtle:    p.momentumSubtle,
    primaryDisabled:  p.fog,
    secondary:        'transparent',
    secondaryHover:   p.mist,
    secondaryPressed: p.fog,
    ghost:            'transparent',
    ghostHover:       p.mist,
    destructive:      p.impactCoral,
    destructiveHover: '#DC2626',
    accent:           p.choice,
    accentHover:      p.choiceDark,
  },

  // ─── Border ─────────────────────────────────────────────────────────────
  border: {
    /** Default UI border: inputs, cards, dividers. */
    default:  p.fog,
    /** Subtle border: near-invisible separators. */
    subtle:   p.mist,
    /** Strong border: emphasized separators. */
    strong:   p.slate,
    /** Focus ring: keyboard and pointer focus. */
    focus:    p.momentum,
    /** Error state border. */
    error:    p.impactCoral,
    /** Success state border. */
    success:  p.successGreen,
    /** Disabled state border. */
    disabled: p.fog,
    /** Border on dark backgrounds. */
    onDark:   'rgba(255, 255, 255, 0.15)',
    /** Border on brand-colored backgrounds. */
    onBrand:  'rgba(255, 255, 255, 0.2)',
  },

  // ─── Status ─────────────────────────────────────────────────────────────
  status: {
    success:        p.successGreen,
    successSubtle:  p.successSubtle,
    successContent: '#15803D',
    warning:        p.energyOrange,
    warningSubtle:  p.warningSubtle,
    warningContent: '#92400E',
    error:          p.impactCoral,
    errorSubtle:    p.errorSubtle,
    errorContent:   '#B91C1C',
    info:           p.momentum,
    infoSubtle:     p.infoSubtle,
    infoContent:    '#1D4ED8',
  },

  // ─── Accent (service/capability associations) ───────────────────────────
  accent: {
    teal:   p.strategyTeal,
    purple: p.innovationPurple,
    orange: p.energyOrange,
    coral:  p.impactCoral,
  },

  // ─── Navigation ─────────────────────────────────────────────────────────
  nav: {
    background:        p.paper,
    backgroundDark:    p.ink,
    itemDefault:       p.slate,
    itemHover:         p.ink,
    itemActive:        p.momentum,
    itemActiveBg:      p.momentumSubtle,
    megaMenuBg:        p.paper,
    megaMenuBorder:    p.fog,
    megaMenuHeading:   p.ink,
    megaMenuLink:      p.slate,
    megaMenuLinkHover: p.momentum,
  },

  // ─── Focus ──────────────────────────────────────────────────────────────
  focus: {
    ring:           p.momentum,
    ringOffset:     p.paper,
    ringOffsetDark: p.ink,
  },

} as const

export type SemanticColors = typeof semanticColors
