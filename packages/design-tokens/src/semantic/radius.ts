/**
 * TRYVION Semantic Border Radius Tokens
 *
 * Maps radius primitives to component roles.
 * Enforces visual consistency across all component types.
 */

import { radiusPrimitives as r } from '../primitives/radius'

export const semanticRadius = {
  /** Buttons: all sizes */
  button:       r.md,    //  6px
  /** Form inputs: text, select, textarea */
  input:        r.md,    //  6px
  /** Service/insight/case study cards */
  card:         r.lg,    //  8px
  /** Feature cards, large tiles */
  cardLarge:    r.xl,    // 12px
  /** Modal dialogs */
  modal:        r.xl,    // 12px
  /** Drawer/side panels */
  drawer:       r['2xl'], // 16px
  /** Dropdown menus, select panels */
  dropdown:     r.lg,    //  8px
  /** Tooltips */
  tooltip:      r.sm,    //  4px
  /** Badges, status dots */
  badge:        r.pill,
  /** Tags, filter chips */
  tag:          r.pill,
  /** Toggle switches */
  toggle:       r.pill,
  /** Avatar images */
  avatar:       r.pill,
  /** Image thumbnails */
  image:        r.lg,    //  8px
  /** Alert banners */
  alert:        r.md,    //  6px
  /** Code blocks */
  code:         r.sm,    //  4px
} as const

export type SemanticRadius = keyof typeof semanticRadius
