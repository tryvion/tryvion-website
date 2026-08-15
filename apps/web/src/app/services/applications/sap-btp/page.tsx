'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   SAP BUSINESS TECHNOLOGY PLATFORM (BTP) — service line page
   Breadcrumb: Home › Services › TRYVION Applications › SAP BTP
   Header (ScrollHeader) & Footer (SiteFooter) render universally in
   the layout and are NOT touched here.

   AMENDMENTS APPLIED:
   1. Final CTA card now carries the attached light hero artwork
      (/images/homepage_hero_light.png) as a background with a
      theme-aware readability overlay.
   2. Hero BTP cloud: black box removed via mix-blend-mode:screen so
      only the glowing cloud remains; gentle float + halo pulse added;
      hexagon nodes rebuilt as true-proportion SVG hexagons (no squash).
   3. Strategy & Architecture: cubes image background removed via
      screen-blend + halo + float; right-hand icon chips now have the
      glassy treatment from the original UI (blur + inner highlight).
   Icons: inline stroke SVGs, each matched to its content.
   Animations: scroll-reveal + hover lift (reduced-motion safe).
───────────────────────────────────────────────────────────────── */

const CLOUD_IMG = '/images/cloud-btp.png'
const CUBES_IMG = '/images/cube-btp.png'
const CTA_BG = '/images/homepage_hero_light.png'

const BLUE = '#1458F2'
const ORANGE = '#EB9F38'
const GOLD = '#C9A24B'
const GREEN = '#2FA97C'

/* ── content-matched icon set ── */
const IC: Record<string, ReactNode> = {
  link: (<><path d="M10.5 13.5a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.2 1.2" /><path d="M13.5 10.5a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.2-1.2" /></>),
  expand: (<><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></>),
  code: (<><path d="m8 6-6 6 6 6" /><path d="m16 6 6 6-6 6" /></>),
  chart: (<><path d="M3 20h18" /><path d="M7 16v-5" /><path d="M12 16V8" /><path d="M17 16v-3" /><path d="m7 8 4-3 4 2 4-4" /></>),
  sparkle: (<><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3z" /><path d="M18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z" /></>),
  shield: (<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />),
  shieldCheck: (<><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" /><path d="m9 11.5 2 2 4-4.5" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5 16 16" /></>),
  architect: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
  extendBox: (<><rect x="3" y="7" width="12" height="12" rx="2" /><path d="M15 3h6v6" /><path d="M21 3l-6 6" /></>),
  users: (<><circle cx="8" cy="7" r="3" /><path d="M2.5 19c.6-3.2 2.9-5.5 5.5-5.5S13.4 15.8 14 19" /><circle cx="16.5" cy="8.5" r="2.5" /><path d="M15.5 13.7c2.3.3 4 2.2 4.5 5.3" /></>),
  list: (<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></>),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  roadmap: (<><path d="M9 6l6-3 6 3v12l-6-3-6 3-6-3V6l6 3z" /><path d="M9 6v12M15 3v12" /></>),
  cube: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
}
function Ic({ k, size = 22, color }: { k: string; size?: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: size, height: size, flexShrink: 0 }}>
      {IC[k]}
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
function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
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
    <div ref={ref} style={{ ...style, opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(24px)', transition: `opacity 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms` }}>
      {children}
    </div>
  )
}
/* True-proportion hexagon node (regular hexagon, crisp uniform stroke) */
function HexNode({ k, size = 68 }: { k: string; size?: number }) {
  const h = Math.round(size * 0.875)
  return (
    <span className="hexo" style={{ width: size, height: h }}>
      <svg viewBox="0 0 64 56" fill="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <polygon points="17,2.5 47,2.5 61.5,28 47,53.5 17,53.5 2.5,28" fill="rgba(8,20,60,0.88)" stroke="#5B8CFF" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="hexi"><Ic k={k} size={24} color="#9CBEFF" /></span>
    </span>
  )
}

/* ── data ── */
const HERO_NODES = [
  { k: 'link', t: 'Connect', d: 'Integrate applications and data', x: '50%', y: '2%', lp: 'right' },
  { k: 'expand', t: 'Extend', d: 'Build and extend clean core', x: '90%', y: '24%', lp: 'right' },
  { k: 'code', t: 'Build', d: 'Develop apps and automate processes', x: '90%', y: '62%', lp: 'right' },
  { k: 'chart', t: 'Understand', d: 'Unify data and turn into insights', x: '58%', y: '92%', lp: 'right' },
  { k: 'sparkle', t: 'Intelligent', d: 'Apply AI and intelligent capabilities', x: '10%', y: '42%', lp: 'below' },
] as const
const ENABLES = [
  { n: '01', k: 'link', t: 'Connect', s: 'Integration & API Management', d: 'Connect SAP and non-SAP applications through scalable, reusable integration.' },
  { n: '02', k: 'cube', t: 'Extend', s: 'Clean Core Extensions', d: 'Create new capabilities without unnecessarily modifying the SAP core.' },
  { n: '03', k: 'code', t: 'Build', s: 'Application Development & Automation', d: 'Turn business requirements into applications and automated workflows faster.' },
  { n: '04', k: 'chart', t: 'Understand', s: 'Data & Analytics', d: 'Unify enterprise data and turn it into trusted insights with advanced analytics and modeling.' },
  { n: '05', k: 'sparkle', t: 'Intelligent', s: 'AI & Intelligent Applications', d: 'Embed AI across applications, workflows and experiences to drive smarter outcomes.' },
  { n: '06', k: 'shield', t: 'Govern', s: 'Strategy & Platform Foundation', d: 'Build the right architecture, governance, security and operating model to scale BTP with confidence.' },
]
const STRATEGY = [
  { k: 'roadmap', t: 'BTP Strategy & Roadmap', d: 'Define the role BTP will play across your SAP and enterprise technology landscape.' },
  { k: 'architect', t: 'Architecture & Landscape Design', d: 'Design the appropriate BTP account structure, services, environments and integration architecture.' },
  { k: 'shieldCheck', t: 'Governance & Operating Model', d: 'Establish standards for security, development, integration, extensions and platform operations.' },
  { k: 'lock', t: 'Security & Identity', d: 'Design identity, access and security controls across the BTP landscape.' },
  { k: 'lock', t: 'Clean Core Strategy', d: 'Determine what belongs in the SAP core, what should be extended and where BTP can provide the right innovation layer.' },
  { k: 'list', t: 'Use-case Prioritisation', d: 'Identify and prioritise BTP opportunities based on business value, feasibility and strategic importance.' },
]
const APPROACH = [
  { n: '01', k: 'search', t: 'Assess', d: 'Understand your SAP landscape, integrations, extensions, data and innovation priorities.', c: BLUE },
  { n: '02', k: 'architect', t: 'Architect', d: 'Define the target BTP architecture, Clean Core principles, security, governance and operating model.', c: GREEN },
  { n: '03', k: 'link', t: 'Connect', d: 'Integrate SAP, cloud, legacy and third-party applications through reusable APIs and events.', c: BLUE },
  { n: '04', k: 'extendBox', t: 'Extend', d: 'Build side-by-side extensions and apps without unnecessarily modifying the SAP core.', c: GREEN },
  { n: '05', k: 'sparkle', t: 'Innovate', d: 'Introduce automation, data-driven experiences, SAP Business AI and enterprise AI use cases.', c: BLUE },
  { n: '06', k: 'chart', t: 'Scale', d: 'Industrialise successful capabilities through reusable services, governance, monitoring and continuous improvement.', c: GREEN },
]
const PILLARS = [
  { k: 'shieldCheck', t: 'Clean Core Aligned', d: 'Protect the integrity, maintainability and upgradeability of the SAP core.' },
  { k: 'link', t: 'SAP + Non-SAP Connectivity', d: 'Connect SAP with the broader enterprise technology ecosystem.' },
  { k: 'sparkle', t: 'AI-First Innovation', d: 'Identify AI opportunities across applications, integrations, data and workflows from day one.' },
  { k: 'code', t: 'Low-Code to Pro-Code', d: 'Use the right development approach for each business requirement.' },
  { k: 'users', t: 'Business-Led. Technology-Enabled.', d: 'Start with the business problem and determine where value can be created.' },
  { k: 'chart', t: 'Built to Evolve', d: 'Create an architecture that adapts to new SAP capabilities, AI services and emerging models.' },
]

export default function BtpPage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const t = {
    bg1: isDark ? '#030D22' : '#FFFFFF',
    bg2: isDark ? '#0B1E3D' : '#F4F6F8',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    body: isDark ? 'rgba(255,255,255,0.48)' : '#6A6E74',
    muted: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(11,30,61,0.5)',
    faint: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(11,30,61,0.35)',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,30,61,0.08)',
    cardBg: isDark ? '#0B1E3D' : '#FFFFFF',
    gold: GOLD,
    ink: '#0B1E3D',
  }
  const goldBtn: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', background: GOLD, color: t.ink, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }
  const outlineBtn = (c: string): CSSProperties => ({ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${c}`, color: c, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'transparent' })

  return (
    <>
      <style>{`
        .lift{transition:transform .25s var(--motion-easing-standard),box-shadow .25s var(--motion-easing-standard),border-color .25s}
        .lift:hover{transform:translateY(-6px);box-shadow:var(--elevation-03);border-color:var(--border-strong,#9DA0A6)}
        .hexnode{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:flex-start;gap:.6rem;transition:transform .25s}
        .hexnode:hover{transform:translate(-50%,-50%) scale(1.06)}
        .hexo{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;filter:drop-shadow(0 0 10px rgba(91,140,255,.35))}
        .hexi{position:relative;display:flex;align-items:center;justify-content:center}
        .btp-ring{position:absolute;inset:5%;border:1px dashed rgba(120,160,255,.35);border-radius:50%}
        .btp-cloud{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:56%;text-align:center}
        .cloud-img{width:100%;display:block;mix-blend-mode:screen;animation:floatY 8s ease-in-out infinite}
        .cloud-halo{position:absolute;left:50%;top:50%;width:70%;aspect-ratio:1/1;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(60,121,255,.35) 0%,transparent 65%);filter:blur(10px);animation:haloPulse 5s ease-in-out infinite}
        .cubes-img{width:min(100%,340px);display:block;mix-blend-mode:screen;filter:drop-shadow(0 0 26px rgba(201,162,75,.28));animation:floatY 7s ease-in-out infinite}
        .glassy{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
          background:linear-gradient(160deg,rgba(120,160,255,.24),rgba(120,160,255,.08));
          border:1px solid rgba(120,160,255,.38);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 4px 12px rgba(0,0,0,.35)}
        .pillar{transition:background .25s,transform .25s}
        .pillar:hover{background:rgba(255,255,255,.06);transform:translateY(-4px)}
        .step-arrow{flex:0 0 34px;border-top:2px dashed ${isDark ? 'rgba(120,160,255,.4)' : 'rgba(20,88,242,.35)'};margin-top:22px;position:relative}
        .step-arrow::after{content:'';position:absolute;right:-2px;top:-4px;border-left:6px solid ${isDark ? 'rgba(120,160,255,.4)' : 'rgba(20,88,242,.35)'};border-top:3px solid transparent;border-bottom:3px solid transparent}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes haloPulse{0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
        @media(max-width:960px){
          .btp-ring{display:none}
          .btp-diagram{aspect-ratio:auto!important}
          .btp-cloud{position:static;transform:none;width:64%;margin:0 auto 1.5rem}
          .btp-nodes{position:static!important;display:grid!important;grid-template-columns:1fr 1fr;gap:1.25rem}
          .hexnode{position:static;transform:none}
          .hexnode:hover{transform:scale(1.03)}
          .approach-row{flex-direction:column;align-items:stretch!important}
          .step-arrow{display:none}
          .pillar-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:560px){.btp-nodes{grid-template-columns:1fr!important}.pillar-grid{grid-template-columns:1fr!important}}
        @media (prefers-reduced-motion: reduce){
          .lift:hover,.hexnode:hover,.pillar:hover{transform:none}
          .cloud-img,.cubes-img,.cloud-halo{animation:none}
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', background: 'linear-gradient(120deg,#050E2B 0%,#0A1B4D 60%,#0A2A7A 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', padding: 'calc(36px + var(--layout-header-height-desktop) + 40px) clamp(1.25rem,5vw,3.5rem) clamp(4rem,7vw,6rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '3rem', alignItems: 'center' }}>
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2.25rem' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link><span aria-hidden="true">›</span>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link><span aria-hidden="true">›</span>
              <Link href="/services/applications" style={{ color: 'inherit', textDecoration: 'none' }}>TRYVION Applications</Link><span aria-hidden="true">›</span>
              <span style={{ color: ORANGE, fontWeight: 700 }}>SAP BPT</span>
            </nav>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: '#6D9DFF', margin: '0 0 1rem' }}>SAP Business Technology Platform (BTP)</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1.25rem' }}>
              Connect. Extend.<br />Innovate with <span style={{ color: ORANGE }}>AI.</span>
            </h1>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', maxWidth: '46ch', margin: '0 0 2.25rem' }}>
              Turn your SAP core into an innovation platform. Connect applications and data, extend processes, and build intelligent experiences—without adding complexity to the core.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={goldBtn}>Talk to an Expert <Arrow /></Link>
              <Link href="/services/applications" style={outlineBtn('rgba(255,255,255,0.4)')}>Explore Your BTP Transformation <Arrow color="#fff" /></Link>
            </div>
          </Reveal>
          {/* BTP cloud diagram — transparent cloud, true hexagons */}
          <Reveal delay={150}>
            <div className="btp-diagram" style={{ position: 'relative', maxWidth: 520, margin: '0 auto', aspectRatio: '1 / 1' }}>
              <div className="btp-ring" aria-hidden="true" />
              <div className="btp-cloud">
                <span className="cloud-halo" aria-hidden="true" />
                <img className="cloud-img" src={CLOUD_IMG} alt="" />
              </div>
              <div className="btp-nodes" style={{ position: 'absolute', inset: 0 }}>
                {HERO_NODES.map((n) => (
                  <div key={n.t} className="hexnode" style={{ left: n.x, top: n.y, flexDirection: n.lp === 'below' ? 'column' : 'row' }}>
                    <HexNode k={n.k} />
                    <span style={{ maxWidth: 130 }}>
                      <strong style={{ display: 'block', color: '#fff', fontSize: '0.8125rem', fontWeight: 700 }}>{n.t}</strong>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6875rem', lineHeight: 1.4 }}>{n.d}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHAT BTP ENABLES ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <p style={{ textAlign: 'center', fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: BLUE, margin: '0 0 0.75rem' }}>What BTP Enables</p>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--family-display)', fontSize: 'clamp(1.75rem,3.2vw,2.5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3rem' }}>One Platform. Multiple Paths to Innovation.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap: '1rem' }}>
            {ENABLES.map((c, i) => (
              <Reveal key={c.n} delay={i * 70}>
                <div className="lift" style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--family-mono)', fontSize: '0.875rem', fontWeight: 700, color: BLUE }}>{c.n}</span>
                    <Ic k={c.k} size={22} color={BLUE} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: t.heading, margin: 0 }}>{c.t}</h3>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: t.heading, margin: 0 }}>{c.s}</p>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: t.body, margin: 0, flex: 1 }}>{c.d}</p>
                  <span style={{ color: BLUE }}><Arrow size={16} /></span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BTP STRATEGY & ARCHITECTURE (dark) ═══ */}
      <section style={{ padding: 'clamp(2rem,4vw,3.5rem) clamp(1.25rem,5vw,3.5rem)', background: t.bg2 }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div style={{ background: 'linear-gradient(120deg,#050E2B,#0A1B4D)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2rem,4vw,3.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(2rem,4vw,3rem)', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: '#6D9DFF', margin: '0 0 1rem' }}>BTP Strategy & Architecture</p>
                <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,2.8vw,2.125rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.2, color: '#fff', margin: '0 0 1.25rem' }}>Build the Right Foundation Before You Scale.</h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', margin: '0 0 1rem' }}>The right BTP architecture begins with business priorities—not technology for its own sake.</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', margin: '0 0 1.75rem' }}>We help you design a secure, governed and clean-core aligned BTP landscape built for long-term innovation.</p>
                <Link href="/contact" style={outlineBtn(GOLD)}>Explore BTP Strategy <Arrow color={GOLD} /></Link>
              </div>
              {/* cubes — background removed via screen blend, floating with halo */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img className="cubes-img" src={CUBES_IMG} alt="" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {STRATEGY.map((s) => (
                  <div key={s.t} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <span className="glassy">
                      <Ic k={s.k} size={18} color="#9CBEFF" />
                    </span>
                    <div>
                      <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', margin: '0 0 0.25rem' }}>{s.t}</h3>
                      <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ THE TRYVION APPROACH ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: BLUE, margin: '0 0 0.75rem' }}>The TRYvion Approach</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.75rem,3.2vw,2.5rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3.5rem' }}>Simplify the Core. Connect the Enterprise. Accelerate Innovation.</h2>
          </Reveal>
          <div className="approach-row" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            {APPROACH.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ width: 40, height: 40, borderRadius: '50%', background: s.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{s.n}</span>
                    {i < APPROACH.length - 1 && <span className="step-arrow" aria-hidden="true" style={{ flex: '0 0 34px' }} />}
                    <span style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${t.border}`, background: t.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Ic k={s.k} size={20} color={BLUE} />
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: t.heading, margin: 0 }}>{s.t}</h3>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: t.body, margin: 0 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/services/applications" style={outlineBtn(BLUE)}>See Our Approach in Action <Arrow color={BLUE} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ PILLARS (dark band) ═══ */}
      <section style={{ padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(3rem,6vw,4.5rem)', background: t.bg2 }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', background: 'linear-gradient(120deg,#050E2B,#0A1B4D)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {PILLARS.map((p, i) => (
                <div key={p.t} className="pillar" style={{ padding: '2rem 1.25rem', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
                  <Ic k={p.k} size={28} color="#fff" />
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>{p.t}</h3>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA — with homepage_hero_light.png background ═══ */}
      <section style={{ padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(4rem,7vw,6rem)', background: t.bg2 }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${t.border}`, borderRadius: 'var(--radius-lg)', background: t.cardBg, padding: 'clamp(2rem,4vw,3rem)' }}>
              <img src={CTA_BG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(90deg,rgba(3,13,34,0.94) 0%,rgba(3,13,34,0.82) 45%,rgba(3,13,34,0.35) 100%)' : 'linear-gradient(90deg,rgba(244,246,248,0.96) 0%,rgba(244,246,248,0.85) 45%,rgba(244,246,248,0.25) 100%)' }} />
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ maxWidth: '38ch' }}>
                  <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.25, color: t.heading, margin: '0 0 0.75rem' }}>Ready to Turn Your SAP Core into an Innovation Platform?</h2>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: 0 }}>Build a connected, intelligent and extensible enterprise foundation with SAP Business Technology Platform.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/contact" style={{ ...goldBtn, background: BLUE, color: '#fff' }}>Talk to a SAP Expert <Arrow color="#fff" /></Link>
                  <Link href="/contact/consultation" style={outlineBtn(BLUE)}>Book a Consultation <Arrow color={BLUE} /></Link>
                  <Link href="/services/applications" style={outlineBtn(BLUE)}>Explore TRYVION Applications <Arrow color={BLUE} /></Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}