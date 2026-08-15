/**
 * TRYVION Semantic Accessibility Tokens
 *
 * Hardcoded constants for accessibility compliance.
 * These values derive from WCAG 2.2 requirements.
 * Source: UX Research Consolidation Report v1.0
 */

export const accessibilityTokens = {

  // ─── Focus ─────────────────────────────────────────────────────────────
  /** Focus ring width — 2px minimum per WCAG 2.2 SC 2.4.11 */
  focusRingWidth:      '2px',
  /** Focus ring offset — separates ring from element boundary */
  focusRingOffset:     '2px',
  /** Focus ring offset on dark backgrounds */
  focusRingOffsetDark: '2px',

  // ─── Touch Targets ─────────────────────────────────────────────────────
  /** Minimum touch target: 44×44px per WCAG 2.2 SC 2.5.8 */
  minTouchTarget:      '44px',
  /** Reduced touch target: only for closely-spaced secondary icons */
  minTouchTargetSmall: '32px',

  // ─── Motion ────────────────────────────────────────────────────────────
  /** CSS media query for reduced motion preference */
  reducedMotionQuery:   '(prefers-reduced-motion: reduce)',
  /** CSS media query for high contrast preference */
  highContrastQuery:    '(prefers-contrast: more)',

  // ─── Text ──────────────────────────────────────────────────────────────
  /** Minimum body text size for comfortable reading */
  minBodyFontSize:     '1rem',     // 16px
  /** Minimum UI text size */
  minUIFontSize:       '0.875rem', // 14px

  // ─── Z-Index ───────────────────────────────────────────────────────────
  /** Skip navigation must always be above all content */
  skipNavZIndex:       '90',

} as const

export type AccessibilityToken = keyof typeof accessibilityTokens
