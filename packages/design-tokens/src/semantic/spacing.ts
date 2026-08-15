/**
 * TRYVION Semantic Spacing Tokens
 *
 * Maps the spacing scale to purposeful roles.
 * Components should consume semantic spacing, not raw scale steps.
 */

import { spacingScale as s } from '../primitives/spacing'

export const semanticSpacing = {

  // ─── Component — internal padding and gaps ────────────────────────────
  component: {
    /** Tight: dense UI — small badges, compact table cells */
    tight:        s[1],   //  4px
    /** Narrow: icon buttons, small chips */
    narrow:       s[2],   //  8px
    /** Default: standard interactive element padding */
    default:      s[3],   // 12px
    /** Comfortable: primary buttons, input fields */
    comfortable:  s[4],   // 16px
    /** Spacious: card internal padding */
    spacious:     s[6],   // 24px
    /** Generous: large card, modal body padding */
    generous:     s[8],   // 32px
  },

  // ─── Content — spacing between text elements ──────────────────────────
  content: {
    /** Inline elements: icons alongside text */
    inline:        s[2],  //  8px
    /** Related: heading to intro text, list items */
    related:       s[3],  // 12px
    /** Default: paragraph spacing */
    default:       s[4],  // 16px
    /** Loose: heading to body section */
    loose:         s[6],  // 24px
    /** Reading: paragraph breaks in long-form content */
    reading:       s[8],  // 32px
  },

  // ─── Section — vertical rhythm between page sections ─────────────────
  section: {
    /** Tight section gap: closely related blocks */
    sm:  s[12],  //  48px
    /** Default section gap */
    md:  s[16],  //  64px
    /** Comfortable section gap: visual breathing room */
    lg:  s[24],  //  96px
    /** Large section: hero, major page dividers */
    xl:  s[32],  // 128px
    /** Maximum section: flagship heroes */
    '2xl': s[40], // 160px
  },

  // ─── Layout — page-level margins and outer spacing ────────────────────
  layout: {
    /** Mobile outer margin */
    marginMobile:  s[4],  // 16px
    /** Tablet outer margin */
    marginTablet:  s[8],  // 32px
    /** Desktop outer margin */
    marginDesktop: s[12], // 48px
    /** Wide outer margin */
    marginWide:    s[16], // 64px
  },

  // ─── Reading — optimised for long-form body content ───────────────────
  reading: {
    /** Paragraph spacing */
    paragraph:  s[6],   // 24px
    /** Heading to body */
    headingBody: s[4],  // 16px
    /** Section heading gap */
    sectionHead: s[12], // 48px
    /** List item gap */
    listItem:   s[2],   //  8px
    /** Blockquote indent */
    blockquote: s[8],   // 32px
  },

} as const

export type SemanticSpacing = typeof semanticSpacing
