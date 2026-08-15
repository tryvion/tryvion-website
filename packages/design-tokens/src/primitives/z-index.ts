/**
 * TRYVION Primitive Z-Index Tokens
 *
 * Explicit layering system. Use these — never arbitrary z-index values in components.
 * Layers are spaced by 10 to allow future insertions without reshuffling.
 */

export const zIndexPrimitives = {
  base:       0,     // Default document flow
  raised:     10,    // Slightly elevated (e.g. sticky table headers)
  sticky:     20,    // Sticky elements (e.g. table headers, contextual toolbars)
  navigation: 30,    // Fixed navigation bar
  dropdown:   40,    // Dropdown menus, select panels
  popover:    50,    // Popovers, combobox panels
  modal:      60,    // Modal dialogs and drawers
  toast:      70,    // Toast notifications — above modal
  tooltip:    80,    // Tooltips — always topmost interactive
  skipNav:    90,    // Skip navigation link — must be accessible at all times
  debug:      9999,  // Development overlays only — never ship in production
} as const

export type ZIndexLayer = keyof typeof zIndexPrimitives
