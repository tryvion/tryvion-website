/**
 * @tryvion/design-tokens
 *
 * TRYVION enterprise design token system.
 *
 * Usage:
 *   import { semanticColors, typeStyles, semanticSpacing } from '@tryvion/design-tokens'
 *
 *   // CSS variables (Tailwind v4 + direct CSS use):
 *   import '@tryvion/design-tokens/css'
 *
 *   // Raw JSON (W3C DTCG format):
 *   import tokens from '@tryvion/design-tokens/json'
 *
 * Hierarchy:
 *   Primitive tokens → Semantic tokens → Component tokens → UI
 *
 * Never import primitives directly in components.
 * Always consume via semantic tokens.
 */

// Primitive layer — raw values
export * from './primitives'

// Semantic layer — purposeful mappings
export * from './semantic'

// Combined reference object — for tooling and documentation
export { colorPrimitives } from './primitives/colors'
export { fontFamilies, fontWeights, fontSizes } from './primitives/typography'
export { spacingScale } from './primitives/spacing'
export { semanticColors } from './semantic/color'
export { typeStyles } from './semantic/typography'
export { semanticSpacing } from './semantic/spacing'
export { breakpoints, containerMaxWidths, grid } from './semantic/layout'
export { duration, easing, transitions } from './semantic/motion'
export { semanticRadius } from './semantic/radius'
export { semanticElevation } from './semantic/elevation'
export { accessibilityTokens } from './semantic/accessibility'
