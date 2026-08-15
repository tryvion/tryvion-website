import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const alt         = 'TRYVION — Enterprise Technology Transformation'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand tokens replicated as literals — OG image runs in Edge, no token CSS
const INK       = '#0B1E3D'
const MOMENTUM  = '#1565C0'
const WHITE     = '#FFFFFF'
const WHITE_70  = 'rgba(255,255,255,0.70)'
const WHITE_30  = 'rgba(255,255,255,0.30)'

export default async function Image() {
  // Manrope is OFL-licensed — safe to fetch for OG image generation
  let fontData: ArrayBuffer | null = null
  try {
    const res = await fetch(
      'https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2',
    )
    fontData = await res.arrayBuffer()
  } catch {
    // If font fetch fails, ImageResponse falls back to system sans-serif
  }

  return new ImageResponse(
    (
      <div
        style={{
          background:     INK,
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          padding:        '72px 80px',
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        {/* Decorative orb — mirrors HeroSection design language */}
        <div
          style={{
            position:     'absolute',
            top:          -160,
            right:        -160,
            width:        560,
            height:       560,
            borderRadius: '50%',
            background:   `radial-gradient(circle at center, ${MOMENTUM}40, transparent 70%)`,
          }}
        />

        {/* Top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span
            style={{
              fontFamily:   fontData ? 'Manrope' : 'system-ui',
              fontSize:     64,
              fontWeight:   800,
              color:        WHITE,
              letterSpacing: '-0.02em',
              lineHeight:   1,
            }}
          >
            TRY
          </span>
          <span
            style={{
              fontFamily:   fontData ? 'Manrope' : 'system-ui',
              fontSize:     64,
              fontWeight:   300,
              color:        MOMENTUM,
              letterSpacing: '-0.02em',
              lineHeight:   1,
            }}
          >
            VION
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780 }}>
          <div
            style={{
              fontFamily:   fontData ? 'Manrope' : 'system-ui',
              fontSize:     52,
              fontWeight:   700,
              color:        WHITE,
              letterSpacing: '-0.02em',
              lineHeight:   1.15,
            }}
          >
            Enterprise Technology Transformation
          </div>
          <div
            style={{
              fontFamily:  fontData ? 'Manrope' : 'system-ui',
              fontSize:    24,
              fontWeight:  400,
              color:       WHITE_70,
              lineHeight:  1.5,
            }}
          >
            SAP · AI & Data · Cloud · Digital Engineering · Talent · Managed Services
          </div>
        </div>

        {/* Bottom: domain + accent rule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div
            style={{
              width:        72,
              height:       3,
              background:   MOMENTUM,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontFamily:   fontData ? 'Manrope' : 'system-ui',
              fontSize:     20,
              fontWeight:   500,
              color:        WHITE_30,
              letterSpacing: '0.04em',
            }}
          >
            tryvion.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [{
              name:   'Manrope',
              data:   fontData,
              style:  'normal',
              weight: 400,
            }],
          }
        : {}),
    },
  )
}
