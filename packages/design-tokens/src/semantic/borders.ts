/**
 * TRYVION Semantic Border Tokens
 *
 * Composed border definitions mapping width, style, and semantic color role.
 * Colors reference semantic color tokens — do not duplicate hex values here.
 */

import { borderWidths, borderStyles } from '../primitives/borders'

export const semanticBorders = {
  // Width aliases
  width: {
    none:   borderWidths.none,
    subtle: borderWidths.thin,
    default: borderWidths.thin,
    strong: borderWidths.medium,
    focus:  borderWidths.medium,
  },

  // Style alias
  style: {
    default: borderStyles.solid,
    dashed:  borderStyles.dashed,
    dotted:  borderStyles.dotted,
  },

  // Semantic composed borders (width + style — color from semanticColors.border.*)
  // These are used as CSS shorthand building blocks e.g.:
  // border: `${semanticBorders.composed.default} ${semanticColors.border.default}`
  composed: {
    none:     `${borderWidths.none} ${borderStyles.solid}`,
    subtle:   `${borderWidths.thin} ${borderStyles.solid}`,
    default:  `${borderWidths.thin} ${borderStyles.solid}`,
    strong:   `${borderWidths.medium} ${borderStyles.solid}`,
    focus:    `${borderWidths.medium} ${borderStyles.solid}`,
    dashed:   `${borderWidths.thin} ${borderStyles.dashed}`,
  },
} as const
