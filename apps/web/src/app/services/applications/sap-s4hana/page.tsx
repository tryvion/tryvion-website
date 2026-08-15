'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   SAP S/4HANA — service line page (Services › Tryvion Applications › SAP S/4HANA)
   Header (ScrollHeader) & Footer (SiteFooter) render universally in layout.

   ICON SYSTEM — production-safe, content-matched, BOLD.
   Stock-marketplace PNGs (Flaticon/Flaticon-alikes) ship with licences &
   watermarks, so every glyph below is a hand-drawn duotone SVG matched 1:1
   to its content (core=cube, connected=people, intelligent=chart+spark,
   future=cloud-arrow, fit-to-standard=shield-check, clean-core=layers …).
   Stroke weight 2.2–2.4 + duotone fill = strong, visible at a glance.
   Micro-interactions: click-select pop, hover wiggle + ring pulse,
   connector line draw-in, 3D tilt — all transform-only (GPU, cheap) and
   disabled under prefers-reduced-motion.
───────────────────────────────────────────────────────────────── */

const IMG = {
  hero: '/images/hero-sap-s4-hana.png',
  cloudBlue: '/images/public-cloud.png',
  cloudOrange: '/images/private-cloud.png',
  wave: '/images/planetary-wave.png',
}
const BLUE = '#1458F2'
const ORANGE = '#EB9F38'
const PURPLE = '#6131E0'
const TEAL = '#469DA0'

/* ── Bold duotone icon set (fill = 14% tint + heavy stroke) ── */
type IconName =
  | 'core' | 'connected' | 'intelligent' | 'future'
  | 'search' | 'eye' | 'bolt' | 'adopt' | 'evolve'
  | 'building' | 'conversion' | 'selective'
  | 'biztech' | 'standard' | 'cleancore' | 'link' | 'loop'

function Icon({ name, color, size = 30 }: { name: IconName; color: string; size?: number }) {
  const fill = { fill: color, fillOpacity: 0.14, stroke: 'none' } as const
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block' }}>
      {name === 'core' && (<><path d="M12 2.6 20 7.1v9.8l-8 4.5-8-4.5V7.1l8-4.5Z" {...fill} /><path d="M12 2.6 20 7.1l-8 4.5-8-4.5l8-4.5ZM12 11.6v9.8M20 7.1v9.8M4 7.1v9.8" /></>)}
      {name === 'connected' && (<><circle cx="8" cy="7" r="2.7" {...fill} /><circle cx="16.2" cy="8" r="2.2" {...fill} /><path d="M8 4.3a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4ZM3.2 17.5c.6-3.2 2.5-5 4.8-5s4.2 1.8 4.8 5M16.2 5.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM13.6 12.9c2.6.2 4.5 1.9 5.1 4.6M10.5 15.5h5" /></>)}
      {name === 'intelligent' && (<><path d="M7.5 16.5v-4M12 16.5V8M16.5 16.5v-6" /><path d="M3.5 3.5v17h17" /><path d="M7 8.5 10.5 6l2.5 2 4.5-4" {...fill} stroke={color} /><path d="M14.5 4H17v2.5" /></>)}
      {name === 'future' && (<><path d="M6.7 18.5a4.2 4.2 0 0 1-.5-8.4 5.7 5.7 0 0 1 11.1-.5 3.9 3.9 0 0 1 .5 7.7" {...fill} /><path d="M6.7 18.5h10.6M12 15.5v-5M9.8 12.7l2.2-2.2 2.2 2.2" /></>)}
      {name === 'search' && (<><circle cx="10.5" cy="10.5" r="6.2" {...fill} /><circle cx="10.5" cy="10.5" r="6.2" /><path d="m15.2 15.2 5.3 5.3" /></>)}
      {name === 'eye' && (<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" {...fill} /><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.9" /></>)}
      {name === 'bolt' && (<><path d="M13 2.5 4.5 13.5h6L10 21.5 19.5 10.5h-6L13 2.5Z" {...fill} /><path d="M13 2.5 4.5 13.5h6L10 21.5 19.5 10.5h-6L13 2.5Z" /></>)}
      {name === 'adopt' && (<><circle cx="9.5" cy="6.8" r="3" {...fill} /><path d="M9.5 3.8a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM3.5 18.5c.6-3.6 3-5.6 6-5.6 1.2 0 2.3.3 3.2.9" /><path d="m14.2 16.6 2.2 2.2 4.3-4.9" /></>)}
      {name === 'evolve' && (<><path d="M3.5 17.5 9 12l3.5 3.5 7-7.5" {...fill} stroke={color} /><path d="M3.5 17.5 9 12l3.5 3.5 7-7.5M15.5 8H19.5v4M3.5 21h17" /></>)}
      {name === 'building' && (<><path d="M5.5 21.5V6.8l6-3.3v18" {...fill} /><path d="M5.5 21.5V6.8l6-3.3v18M11.5 9.5h6.5v12M3.5 21.5h17M8.5 9h.01M8.5 12.5h.01M8.5 16h.01M14.8 13h.01M14.8 16.5h.01" /></>)}
      {name === 'conversion' && (<><path d="M4.5 12a7.5 7.5 0 0 1 12.9-5.2L20 9.3M20 4.8v4.5h-4.5" /><path d="M19.5 12a7.5 7.5 0 0 1-12.9 5.2L4 14.7M4 19.2v-4.5h4.5" /></>)}
      {name === 'selective' && (<><path d="M4 7.5h8.5M17.5 7.5H20M4 16.5h2.5M11.5 16.5H20" /><circle cx="15" cy="7.5" r="2.4" {...fill} /><circle cx="9" cy="16.5" r="2.4" {...fill} /><circle cx="15" cy="7.5" r="2.4" /><circle cx="9" cy="16.5" r="2.4" /></>)}
      {name === 'biztech' && (<><circle cx="9.5" cy="7" r="3" {...fill} /><path d="M9.5 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM3.5 18.5c.6-3.6 3-5.6 6-5.6s5.4 2 6 5.6" /><circle cx="17.5" cy="7.5" r="1.9" {...fill} /><path d="M17.5 4.2v1.4M17.5 9.4v1.4M14.2 7.5h1.4M19.4 7.5h1.4" /></>)}
      {name === 'standard' && (<><path d="M12 2.8l7.5 3v5.4c0 4.8-3.2 8.7-7.5 10-4.3-1.3-7.5-5.2-7.5-10V5.8l7.5-3Z" {...fill} /><path d="M12 2.8l7.5 3v5.4c0 4.8-3.2 8.7-7.5 10-4.3-1.3-7.5-5.2-7.5-10V5.8l7.5-3Z" /><path d="m8.7 11.9 2.3 2.3 4.4-5" /></>)}
      {name === 'cleancore' && (<><path d="M12 3.2 20.5 7.7 12 12.2 3.5 7.7 12 3.2Z" {...fill} /><path d="M12 3.2 20.5 7.7 12 12.2 3.5 7.7 12 3.2ZM4.5 12l7.5 4 7.5-4M4.5 16.2l7.5 4 7.5-4" /></>)}
      {name === 'link' && (<><path d="M10.6 13.4a4.1 4.1 0 0 0 6.1.4l2.2-2.2a4.1 4.1 0 0 0-5.8-5.8l-1.2 1.2" {...fill} stroke={color} /><path d="M10.6 13.4a4.1 4.1 0 0 0 6.1.4l2.2-2.2a4.1 4.1 0 0 0-5.8-5.8l-1.2 1.2M13.4 10.6a4.1 4.1 0 0 0-6.1-.4l-2.2 2.2a4.1 4.1 0 0 0 5.8 5.8l1.2-1.2" /></>)}
      {name === 'loop' && (<><path d="M12 4a8 8 0 1 1-7.4 5" /><path d="M4 4.5V9h4.5M12 8.5V12l2.5 2.5" /></>)}
    </svg>
  )
}

function Arrow({ size = 13, color }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color ?? 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── scroll reveal ── */
function Reveal({ children, delay = 0, style, className = '' }: { children: ReactNode; delay?: number; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`${className} ${show ? 'rv-in' : ''}`} style={{ ...style, opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(22px)', transition: `opacity .7s cubic-bezier(.2,0,0,1) ${delay}ms, transform .7s cubic-bezier(.2,0,0,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function S4HanaPage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const [selAgenda, setSelAgenda] = useState<number | null>(0)
  const [selPath, setSelPath] = useState<number | null>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const el = approachRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setDrawn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const t = {
    bg1: isDark ? '#030D22' : '#FFFFFF',
    bg2: isDark ? '#0B1E3D' : '#F4F6F8',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    muted: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(11,30,61,0.5)',
    body: isDark ? 'rgba(255,255,255,0.48)' : '#6A6E74',
    faint: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(11,30,61,0.3)',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,30,61,0.08)',
    divider: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(11,30,61,0.06)',
    cardBg: isDark ? '#030D22' : '#FFFFFF',
    gold: '#C9A24B',
    ink: '#0B1E3D',
  }

  const AGENDA = [
    { icon: 'core' as IconName, color: BLUE, t: 'Modern Enterprise Core', d: 'Unify and simplify your business processes on a modern, intelligent ERP foundation.' },
    { icon: 'connected' as IconName, color: ORANGE, t: 'Connected Enterprise', d: 'Bring finance, operations, supply chain and customer experience together.' },
    { icon: 'intelligent' as IconName, color: PURPLE, t: 'Intelligent Business', d: 'Leverage real-time insights, automation and AI to make better decisions, faster.' },
    { icon: 'future' as IconName, color: TEAL, t: 'Future Ready', d: 'Build for agility, innovation and continuous transformation.' },
  ]
  const APPROACH = [
    { icon: 'search' as IconName, t: 'Understand', d: 'Understand your business, operating model, existing SAP landscape and transformation objectives.' },
    { icon: 'eye' as IconName, t: 'Envision', d: 'Define the future-state enterprise and the capabilities required to achieve it.' },
    { icon: 'bolt' as IconName, t: 'Transform', d: 'Modernise applications and processes around the right SAP S/4HANA architecture.' },
    { icon: 'adopt' as IconName, t: 'Adopt', d: 'Enable people and the organisation to embrace new processes, technology and ways of working.' },
    { icon: 'evolve' as IconName, t: 'Evolve', d: 'Continuously improve as business needs and technology change.' },
  ]
  const PATHS = [
    { icon: 'building' as IconName, color: BLUE, t: 'New Implementation', d: 'Build a modern SAP S/4HANA foundation around standardised processes and clean-core principles.' },
    { icon: 'conversion' as IconName, color: ORANGE, t: 'System Conversion', d: 'Modernise an existing SAP ERP landscape while preserving the capabilities that continue to create business value.' },
    { icon: 'selective' as IconName, color: PURPLE, t: 'Selective Transformation', d: 'Balance standardisation, continuity and business differentiation through a targeted transformation approach.' },
  ]
  const WHY = [
    { icon: 'biztech' as IconName, color: BLUE, t: 'Business + Technology', d: 'Connect SAP decisions with the business outcomes they are expected to create.' },
    { icon: 'standard' as IconName, color: ORANGE, t: 'Fit-to-Standard', d: 'Use proven processes while challenging unnecessary customisation.' },
    { icon: 'cleancore' as IconName, color: PURPLE, t: 'Clean Core', d: 'Create a foundation designed for long-term adaptability.' },
    { icon: 'link' as IconName, color: TEAL, t: 'Connected Thinking', d: 'Consider SAP S/4HANA as part of the wider enterprise ecosystem.' },
    { icon: 'loop' as IconName, color: BLUE, t: 'Continuous Transformation', d: 'Treat go-live as the beginning of the journey—not the end.' },
  ]

  return (
    <>
      <style>{`
        @keyframes icon-pop{0%{transform:scale(1)}35%{transform:scale(1.22) rotate(-5deg)}70%{transform:scale(.94)}100%{transform:scale(1)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}55%{transform:rotate(6deg)}80%{transform:rotate(-2deg)}}
        @keyframes ring-out{from{transform:scale(.65);opacity:.85}to{transform:scale(1.55);opacity:0}}
        @keyframes badge-in{from{transform:scale(0) rotate(-90deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
        .icon-tile{position:relative;transition:transform .3s cubic-bezier(.34,1.26,.64,1)}
        .icon-tile::after{content:'';position:absolute;inset:-5px;border-radius:inherit;border:2px solid var(--acc);opacity:0;pointer-events:none}
        .act-card{position:relative;cursor:pointer;transition:transform .25s cubic-bezier(.2,0,0,1),box-shadow .25s,border-color .25s,background .25s}
        .act-card:hover{transform:translateY(-4px);box-shadow:var(--elevation-03);border-color:var(--acc)}
        .act-card:hover .icon-tile{transform:translateY(-2px) scale(1.06)}
        .act-card:hover .icon-tile svg{animation:wiggle .6s cubic-bezier(.34,1.26,.64,1)}
        .act-card:hover .icon-tile::after{animation:ring-out .7s ease-out}
        .act-card .sel-bar{position:absolute;left:0;top:12%;bottom:12%;width:3px;border-radius:2px;background:var(--acc);transform:scaleY(0);transition:transform .35s cubic-bezier(.2,0,0,1)}
        .act-card[aria-pressed="true"]{border-color:var(--acc);background:var(--tint)}
        .act-card[aria-pressed="true"] .sel-bar{transform:scaleY(1)}
        .act-card[aria-pressed="true"] .icon-tile svg{animation:icon-pop .5s cubic-bezier(.34,1.26,.64,1)}
        .act-card .sel-badge{position:absolute;top:14px;right:14px;width:22px;height:22px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;transform:scale(0);transition:transform .35s cubic-bezier(.34,1.26,.64,1)}
        .act-card[aria-pressed="true"] .sel-badge{transform:scale(1);animation:badge-in .35s cubic-bezier(.34,1.26,.64,1)}
        .tilt-card{transition:transform .3s cubic-bezier(.2,0,0,1),box-shadow .3s,border-color .3s}
        .tilt-card:hover{transform:perspective(750px) rotateX(3deg) rotateY(-3deg) translateY(-6px);box-shadow:var(--elevation-03);border-color:var(--acc)}
        .tilt-card:hover .icon-tile svg{animation:wiggle .6s cubic-bezier(.34,1.26,.64,1)}
        .why-card{position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s}
        .why-card::before{content:'';position:absolute;top:0;left:0;height:3px;width:0;background:var(--acc);transition:width .45s cubic-bezier(.2,0,0,1)}
        .why-card:hover{transform:translateY(-4px);box-shadow:var(--elevation-02)}
        .why-card:hover::before{width:100%}
        .why-card:hover .icon-tile svg{animation:wiggle .6s cubic-bezier(.34,1.26,.64,1)}
        .line-draw{stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset 1.4s cubic-bezier(.2,0,0,1) .2s}
        .drawn .line-draw{stroke-dashoffset:0}
        .step-dot{transition:transform .3s,box-shadow .3s}
        .step:hover .step-dot{transform:scale(1.12);box-shadow:0 0 0 8px var(--tint)}
        @media (prefers-reduced-motion: reduce){
          .act-card:hover .icon-tile svg,.act-card[aria-pressed="true"] .icon-tile svg,.act-card:hover .icon-tile::after,.act-card .sel-badge,.tilt-card:hover .icon-tile svg,.why-card:hover .icon-tile svg{animation:none}
          .line-draw{stroke-dashoffset:0;transition:none}
          .act-card,.tilt-card,.why-card,.icon-tile{transition:none}
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', background: '#030D22', overflow: 'hidden' }}>
        <img src={IMG.hero} alt="" aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', objectFit: 'cover', opacity: 0.9, WebkitMaskImage: 'linear-gradient(to left,#000 55%,transparent)', maskImage: 'linear-gradient(to left,#000 55%,transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', padding: 'calc(36px + var(--layout-header-height-desktop) + 56px) clamp(1.25rem,5vw,3.5rem) 72px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
            <span aria-hidden="true">›</span>
            <Link href="/services/applications" style={{ color: 'inherit', textDecoration: 'none' }}>TRYVION Applications</Link>
            <span aria-hidden="true">›</span>
            <span style={{ color: t.gold, fontWeight: 700 }}>SAP S/4HANA</span>
          </nav>
          <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1.25rem' }}>SAP S/4HANA</p>
          <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1.75rem', maxWidth: '20ch' }}>
            Modernise the core.<br />Build for what&apos;s next.
          </h1>
          <div style={{ width: '56px', height: '3px', background: t.gold, marginBottom: '1.75rem' }} />
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)', maxWidth: '46ch', margin: '0 0 2.5rem' }}>
            Transform the systems and processes that run your business with SAP S/4HANA—creating a simpler, intelligent and future-ready enterprise foundation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
              Talk to an Expert <Arrow />
            </Link>
            <Link href="#paths" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
              Explore Your SAP S/4HANA Path <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ AGENDA — selectable feature rows ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--content-accent, #715300)', margin: '0 0 1.25rem' }}>The SAP S/4HANA Agenda</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.75rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.15, color: t.heading, margin: '0 0 1.5rem' }}>
              Modernise the core.<br />Simplify the enterprise.<br />Enable what&apos;s next.
            </h2>
            <div style={{ width: '56px', height: '3px', background: t.gold, marginBottom: '1.75rem' }} />
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: '0 0 1.25rem' }}>
              Cloud ERP transformation is more than moving technology to the cloud. It requires a different approach to processes, architecture, data, governance and organisational change.
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: 0 }}>
              TRYVION helps organisations move toward a modern SAP foundation built around standardisation, clean-core principles and continuous innovation.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background: t.bg2, borderRadius: 'var(--radius-md)', padding: '0.5rem 2rem' }} role="listbox" aria-label="SAP S/4HANA agenda">
              {AGENDA.map((f, i) => (
                <button
                  key={f.t}
                  type="button"
                  role="option"
                  aria-selected={selAgenda === i}
                  aria-pressed={selAgenda === i}
                  onClick={() => setSelAgenda(selAgenda === i ? null : i)}
                  className="act-card"
                  style={{ ['--acc' as string]: f.color, ['--tint' as string]: `${f.color}12`, display: 'flex', gap: '1.25rem', width: '100%', textAlign: 'left', padding: '1.75rem 0.5rem', background: 'none', border: 'none', borderBottom: i < AGENDA.length - 1 ? `1px solid ${t.divider}` : 'none', borderRadius: 'var(--radius-sm)' }}
                >
                  <span className="sel-bar" aria-hidden="true" />
                  <span className="sel-badge" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none"><path d="m3.5 8.5 3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="icon-tile" style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', background: `${f.color}16`, border: `1.5px solid ${f.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={f.icon} color={f.color} size={32} />
                  </span>
                  <span>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: t.heading, marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>{f.t}</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: t.body, margin: 0 }}>{f.d}</p>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ APPROACH — connector line draws in on scroll ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--content-accent, #715300)', margin: '0 0 1.25rem' }}>The Tryvion Approach</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3.5rem' }}>From complexity to clarity.</h2>
          </Reveal>
          <div ref={approachRef} className={drawn ? 'drawn' : ''} style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', flexWrap: 'wrap', gap: '1.5rem' }}>
            <svg aria-hidden="true" style={{ position: 'absolute', top: '32px', left: '8%', right: '8%', width: '84%', height: '2px', overflow: 'visible' }} viewBox="0 0 100 2" preserveAspectRatio="none">
              <line className="line-draw" x1="0" y1="1" x2="100" y2="1" stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(11,30,61,0.2)'} strokeWidth="2" pathLength={100} />
            </svg>
            {APPROACH.map((s, i) => (
              <Reveal key={s.t} delay={i * 110} className="step" style={{ flex: '1 1 160px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ['--tint' as string]: `${BLUE}18` }}>
                <span className="step-dot" style={{ width: '64px', height: '64px', borderRadius: '50%', border: `2px solid ${BLUE}66`, background: t.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                  <Icon name={s.icon} color={BLUE} size={28} />
                </span>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: t.heading, marginBottom: '0.625rem' }}>{s.t}</h3>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: t.body, margin: 0, maxWidth: '24ch' }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO CLOUD EDITIONS ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--content-accent, #715300)', margin: '0 0 1.25rem' }}>Two cloud editions. One transformation objective.</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3rem' }}>Choose the path that fits your business.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '2rem' }}>
            {[
              { img: IMG.cloudBlue, accent: BLUE, name: 'Cloud, Public Edition', tag: 'Best-practice ERP. Delivered at speed.', d: 'A standardised, fit-to-standard approach for organisations seeking faster implementation, lower operating complexity and continuous access to innovation.', cta: 'Explore Public Edition', href: '/services/sap/public-edition' },
              { img: IMG.cloudOrange, accent: '#A67C02', name: 'Cloud, Private Edition', tag: 'Enterprise depth. Cloud flexibility.', d: 'A dedicated cloud environment for organisations with complex, differentiated or highly regulated processes requiring greater configuration flexibility.', cta: 'Explore Private Edition', href: '/services/sap/private-edition' },
            ].map((e, i) => (
              <Reveal key={e.name} delay={i * 120}>
                <div className="tilt-card" style={{ ['--acc' as string]: e.accent, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: t.cardBg, display: 'grid', gridTemplateColumns: '220px 1fr' }}>
                  <img src={e.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '240px' }} />
                  <div style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
                    <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: e.accent, margin: '0 0 0.5rem' }}>SAP S/4HANA</p>
                    <h3 style={{ fontFamily: 'var(--family-display)', fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.015em', color: e.accent, margin: '0 0 0.75rem' }}>{e.name}</h3>
                    <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: t.heading, margin: '0 0 0.75rem' }}>{e.tag}</p>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: '0 0 1.75rem' }}>{e.d}</p>
                    <Link href={e.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '40px', padding: '0 1.25rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${e.accent}`, color: e.accent, fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none' }}>
                      {e.cta} <Arrow size={12} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRANSFORMATION PATHS — selectable tilt cards ═══ */}
      <section id="paths" style={{ background: t.bg1, padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(4.5rem,8vw,7.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--content-accent, #715300)', margin: '0 0 1.25rem' }}>Transformation Paths</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3rem' }}>Meet your business where it is.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '1.5rem' }}>
            {PATHS.map((p, i) => (
              <Reveal key={p.t} delay={i * 100}>
                <button
                  type="button"
                  aria-pressed={selPath === i}
                  onClick={() => setSelPath(selPath === i ? null : i)}
                  className="act-card tilt-card"
                  style={{ ['--acc' as string]: p.color, ['--tint' as string]: `${p.color}10`, background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left', width: '100%' }}
                >
                  <span className="sel-bar" aria-hidden="true" />
                  <span className="sel-badge" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="none"><path d="m3.5 8.5 3 3 6-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="icon-tile" style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', background: `${p.color}16`, border: `1.5px solid ${p.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={p.icon} color={p.color} size={32} />
                  </span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: t.heading, letterSpacing: '-0.01em' }}>{p.t}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: 0, flex: 1 }}>{p.d}</p>
                  <span style={{ color: t.heading }}><Arrow size={16} /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY TRYVION ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(2.5rem,5vw,4.5rem)', alignItems: 'start' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--content-accent, #715300)', margin: '0 0 1.25rem' }}>Why Tryvion</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,2.8vw,2.125rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.2, color: t.heading, margin: 0 }}>
              SAP transformation with a business-first mindset.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '1px', background: t.divider, border: `1px solid ${t.divider}` }}>
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 80} className="why-card" style={{ ['--acc' as string]: w.color, background: t.bg2, padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <span className="icon-tile" style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', background: `${w.color}16`, border: `1.5px solid ${w.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={w.icon} color={w.color} size={30} />
                </span>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: t.heading, letterSpacing: '-0.01em' }}>{w.t}</h3>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: t.body, margin: 0 }}>{w.d}</p>
              </Reveal>
            ))}
            <div style={{ background: t.bg2 }} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(4.5rem,8vw,7rem)', background: t.bg2 }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', background: 'var(--ink-950)' }}>
              <img src={IMG.wave} alt="" aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: 0, width: 'min(60%,560px)', height: '100%', objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.9 }} />
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2.5rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '34ch' }}>
                  <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1rem' }}>Ready to modernise your enterprise?</p>
                  <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.25, color: '#fff', margin: 0 }}>
                    Let&apos;s turn your application landscape into a foundation for what&apos;s next.
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', flexShrink: 0 }}>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                    Talk to an SAP Expert <Arrow />
                  </Link>
                  <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Book a Consultation <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
