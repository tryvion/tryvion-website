import { cn } from '@tryvion/utils'

// TRYVION brand colours (updated to the Inkscape master SVG)
const GOLD  = '#CF9045'
const NAVY  = '#0B1E3D'
const WHITE = '#FFFFFF'

type Colors = {
  body:          string // wordmark letters + symbol arms
  dot:           string // gold centre dot
  text:          string // wordmark text fill
  taglineMain:   string // "THE FUTURE IS A "
  taglineAccent: string // "CHOICE"
}

const colorMap: Record<string, Colors> = {
  light: {
    body: NAVY, dot: GOLD,
    text: NAVY, taglineMain: NAVY, taglineAccent: GOLD,
  },
  dark: {
    body: WHITE, dot: GOLD,
    text: WHITE, taglineMain: WHITE, taglineAccent: GOLD,
  },
  mono: {
    body: 'currentColor', dot: GOLD,
    text: 'currentColor', taglineMain: 'currentColor', taglineAccent: GOLD,
  },
}

export type LogoVariant = keyof typeof colorMap

export interface TryvionLogoProps {
  variant?:     LogoVariant
  /** Rendered height in px; width scales proportionally (default: 38 → 196×38 lockup) */
  height?:      number
  /** Optional explicit width override in px */
  width?:       number
  className?:   string
  ariaLabel?:   string
  /** Append "THE FUTURE IS A CHOICE" tagline below the wordmark */
  showTagline?: boolean
  /** Render only the compass/R mark — no text */
  markOnly?:    boolean
}

// Shared font stack — Manrope is loaded via next/font in the web app
const FF = "var(--font-manrope,'Manrope','Neue Haas Grotesk','Helvetica Neue','Arial',sans-serif)"

/* ─────────────────────────────────────────────────────────────────
   Exact path data from the updated tryvion.svg (Inkscape export).
   All paths live in the original document coordinate space; the
   outer group transform matrix(0.28144253 …) maps them into the
   66.145833 × 15.875 lockup viewBox.
───────────────────────────────────────────────────────────────── */
const OUTER_TRANSFORM = 'matrix(0.28144253,0,0,0.28144253,-29.083686,-23.526215)'

/* Stylised "R" arrow — sits between "T" and "VION" */
const PATH_R =
  'm 144.38441,92.106922 2.52419,0.008 -0.0532,-5.8759 h 8.23688 l 5.71091,5.87564 3.95189,-0.0108 -5.81892,-5.53536 c -0.13749,-0.21512 -0.0826,-0.46647 0.16474,-0.54914 2.1313,-0.10049 4.64388,-0.62081 4.6729,-2.76866 l -0.0602,-5.19365 c -0.21808,-1.89365 -2.48783,-3.12787 -3.29476,-3.23984 l -16.25411,0.005 v 2.6311 l 15.37552,0.10983 c 0.97542,0.0293 1.52341,0.81823 1.59246,1.37281 l 0.0376,3.04232 c -0.0104,0.83483 -0.2454,1.38413 -1.46527,1.68016 H 144.2746 Z'
const PATH_R_TRANSFORM = 'translate(5.6310486,27.676106)'

/* Compass needles (the "Y" mark) */
const PATH_NEEDLE_S =
  'm 192.47942,111.73544 1.15021,1.90095 c 0.25242,0.38747 0.33347,0.75319 0.39706,1.11669 0.70809,4.70842 0.85125,13.30213 1.20687,17.20271 l 1.18925,-17.16276 c 0.0282,-0.36958 0.1041,-0.73395 0.28686,-1.08662 l 1.14798,-2.05561 c -1.80623,1.16418 -3.59697,1.02363 -5.37823,0.0846 z'
const PATH_NEEDLE_W =
  'm 190.99903,105.63046 c 0.37963,-0.92479 1.01944,-1.42214 1.74884,-1.77231 L 181.69294,92.844422 c -0.97384,-0.185287 -1.82618,-0.603441 -2.57955,-1.211294 0.39143,0.764508 0.95306,1.394018 0.96849,2.509882 z'
const PATH_NEEDLE_E =
  'm 199.58316,105.63046 c -0.37963,-0.92479 -1.01944,-1.42214 -1.74884,-1.77231 l 11.05493,-11.013728 c 0.97384,-0.185287 1.82618,-0.603441 2.57955,-1.211294 -0.39143,0.764508 -0.95306,1.394018 -0.96849,2.509882 z'

/* Gold centre dot */
const DOT = { cx: 195.20119, cy: 107.73849, r: 2.9662728 }

/* Wordmark text geometry ("T    VION" — the mark fills the gap) */
const TEXT_X = 104.0646
const TEXT_Y = 99.207306
const TEXT_TRANSFORM = 'matrix(1.0816175,0,0,0.92454124,5.6310486,27.676106)'
const TEXT_SIZE = 25.8872
const TEXT_SPACING = 11.9062

/* ── Lockup geometry ───────────────────────────────────────────────
   Artwork viewBox is 66.145833 × 15.875 (≈4.17:1). The requested
   rendered lockup is 196 × 38 (≈5.16:1), so the lockup viewBox is
   widened to 15.875 × (196/38) and the artwork is centred inside it.
   Height stays the driver: width = LOCKUP_VB_W × (height / vbH),
   which yields exactly 196px at the default height of 38px — with
   zero distortion of the master artwork.
───────────────────────────────────────────────────────────────── */
const VB_W = 66.145833
const VB_H = 15.875
const TARGET_W = 196
const TARGET_H = 38
const LOCKUP_VB_W = VB_H * (TARGET_W / TARGET_H) // ≈ 81.8816
const ART_OFFSET_X = (LOCKUP_VB_W - VB_W) / 2    // ≈ 7.8679 — centres artwork
const MARK_VB = '12.4 1.9 18.8 12.6'             // crop window around R + compass + dot

/** Renders the symbol shapes (R arrow + compass needles + gold dot) */
function MarkShapes({ c }: { c: Colors }) {
  return (
    <>
      <path d={PATH_R} fill={c.body} transform={PATH_R_TRANSFORM} />
      <path d={PATH_NEEDLE_W} fill={c.body} />
      <path d={PATH_NEEDLE_E} fill={c.body} />
      <path d={PATH_NEEDLE_S} fill={c.body} />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill={c.dot} />
    </>
  )
}

export function TryvionLogo({
  variant     = 'light',
  height      = TARGET_H, // 38px default → 196px wide lockup
  width,
  className,
  ariaLabel   = 'TRYVION — The Future Is a Choice',
  showTagline = false,
  markOnly    = false,
}: TryvionLogoProps) {
  const c = colorMap[variant]

  // ── Mark-only (icon, no text) ────────────────────────────────────
  if (markOnly) {
    return (
      <svg
        width={width ?? height}
        height={height}
        viewBox={MARK_VB}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={ariaLabel}
        role="img"
        className={cn('shrink-0', className)}
      >
        <g transform={OUTER_TRANSFORM}>
          <MarkShapes c={c} />
        </g>
      </svg>
    )
  }

  // ── Full horizontal lockup ───────────────────────────────────────
  const vbH   = showTagline ? VB_H + 4.6 : VB_H
  const scale = height / vbH
  const svgW  = width ?? Math.round(LOCKUP_VB_W * scale) // 196 at height 38
  const svgH  = Math.round(vbH * scale)

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${LOCKUP_VB_W} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
      className={cn('shrink-0', className)}
    >
      {/* Centre the 66.145833-wide artwork inside the widened lockup viewBox */}
      <g transform={`translate(${ART_OFFSET_X},0)`}>
        <g transform={OUTER_TRANSFORM}>
          {/* "T    VION" — the R/Y mark occupies the gap */}
          <text
            x={TEXT_X}
            y={TEXT_Y}
            transform={TEXT_TRANSFORM}
            xmlSpace="preserve"
            fontFamily={FF}
            fontSize={TEXT_SIZE}
            fontWeight={600}
            letterSpacing={TEXT_SPACING}
            fill={c.text}
          >
            {'T    VION'}
          </text>
          <MarkShapes c={c} />
        </g>
      </g>
      {/* Optional tagline: THE FUTURE IS A CHOICE */}
      {showTagline && (
        <text
          x={LOCKUP_VB_W / 2}
          y={VB_H + 3.1}
          fontFamily={FF}
          fontSize={2.1}
          fontWeight={500}
          letterSpacing={0.85}
          textAnchor="middle"
          fill={c.taglineMain}
        >
          THE FUTURE IS A{' '}
          <tspan fill={c.taglineAccent}>CHOICE</tspan>
        </text>
      )}
    </svg>
  )
}
