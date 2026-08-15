/**
 * TRYVION Semantic Elevation Tokens
 *
 * Maps shadow primitives to component contexts.
 * Use elevation to communicate hierarchy, not decoration.
 */

import { elevationPrimitives as e } from '../primitives/elevation'

export const semanticElevation = {
  /** Flat surface — no shadow */
  surface:    e.none,
  /** Cards at rest — subtle lift from page */
  card:       e.subtle,
  /** Cards on hover — elevated lift */
  cardHover:  e.raised,
  /** Dropdown menus, comboboxes */
  dropdown:   e.raised,
  /** Drawers, side panels */
  drawer:     e.floating,
  /** Modal dialogs */
  modal:      e.modal,
  /** Floating action bars, sticky panels */
  floating:   e.floating,
  /** Tooltips */
  tooltip:    e.floating,
  /** Navigation bar on scroll */
  navigation: e.subtle,
  /** Hero section: no shadow */
  hero:       e.none,
} as const

export type SemanticElevation = keyof typeof semanticElevation
