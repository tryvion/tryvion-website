/**
 * TRYVION Semantic Typography Styles
 *
 * Composite type styles consumed by components.
 * Each style defines the full set of typographic properties.
 *
 * Source: Brand Guidelines v1.0, August 2026
 *
 * ⚠️  Font licensing: see /docs/source-of-truth.md → STT-001
 */

import {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
} from '../primitives/typography'

export const typeStyles = {

  // ─── Display — Neue Haas Grotesk Black / Bold ──────────────────────────
  // For hero headlines, campaign messaging, impactful statements.

  display2xl: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.display2xl,
    fontWeight:    fontWeights.black,
    lineHeight:    lineHeights.tight,
    letterSpacing: letterSpacings.display,
  },
  displayXl: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.displayXl,
    fontWeight:    fontWeights.black,
    lineHeight:    lineHeights.tight,
    letterSpacing: letterSpacings.display,
  },
  displayLg: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.displayLg,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.tight,
    letterSpacing: letterSpacings.display,
  },
  displayMd: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.displayMd,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacings.display,
  },
  displaySm: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.displaySm,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacings.heading,
  },

  // ─── Headings — Neue Haas Grotesk Bold / Medium ────────────────────────

  h1: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h1,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacings.heading,
  },
  h2: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h2,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacings.heading,
  },
  h3: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h3,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacings.heading,
  },
  h4: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h4,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.body,
  },
  h5: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h5,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.body,
  },
  h6: {
    fontFamily:    fontFamilies.primary,
    fontSize:      fontSizes.h6,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.body,
  },

  // ─── Body — Manrope Regular ────────────────────────────────────────────

  bodyLg: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.bodyLg,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },
  bodyMd: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.bodyMd,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },
  bodySm: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.bodySm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },

  // ─── Body Medium — Manrope Medium (for emphasis in body copy) ──────────

  bodyLgMedium: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.bodyLg,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },
  bodyMdMedium: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.bodyMd,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },

  // ─── UI — Manrope Medium / SemiBold ────────────────────────────────────

  uiLg: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.uiLg,
    fontWeight:    fontWeights.semiBold,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.ui,
  },
  uiMd: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.uiMd,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.ui,
  },
  uiSm: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.uiSm,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.ui,
  },

  // ─── Labels — Manrope SemiBold (uppercase or mixed case) ───────────────

  labelLg: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.uiMd,
    fontWeight:    fontWeights.semiBold,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacings.label,
    textTransform: 'uppercase' as const,
  },
  labelSm: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.uiSm,
    fontWeight:    fontWeights.semiBold,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacings.allCaps,
    textTransform: 'uppercase' as const,
  },

  // ─── Captions — Manrope Regular ────────────────────────────────────────

  captionLg: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.captionLg,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.body,
  },
  captionSm: {
    fontFamily:    fontFamilies.secondary,
    fontSize:      fontSizes.captionSm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacings.ui,
  },

  // ─── Editorial — Optima (brand accent — use sparingly) ─────────────────
  // ⚠️  Proprietary font — see /docs/source-of-truth.md → STT-001

  editorialLg: {
    fontFamily:    fontFamilies.tertiary,
    fontSize:      fontSizes.editorialLg,
    fontWeight:    fontWeights.regular,
    fontStyle:     'italic' as const,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },
  editorialMd: {
    fontFamily:    fontFamilies.tertiary,
    fontSize:      fontSizes.editorialMd,
    fontWeight:    fontWeights.regular,
    fontStyle:     'italic' as const,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacings.body,
  },

} as const

export type TypeStyle = keyof typeof typeStyles
