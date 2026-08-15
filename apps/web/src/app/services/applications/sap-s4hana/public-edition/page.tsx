'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   SAP S/4HANA — CLOUD, PUBLIC EDITION
   Premium physical executive-folder chapter system (8 tabs).
   Header (ScrollHeader) & Footer (SiteFooter) render universally
   in the layout and are NOT touched here.

   FOLDER TAB ANATOMY (matches reference exactly):
   • left-top corner: fillet radius
   • right-top: raised ear with fillet radius + outer bevel cut
   • inactive tabs: beige paper, stacked, slightly overlapped
   • active tab: taller, TRYVION navy, gold number/dash, white type,
     sits above the stack and emerges from behind the document
───────────────────────────────────────────────────────────────── */

const IMG = {
  hero: '/images/SAP_S_4HANA_Public_Cloud.webp',
  wave: '/images/planetary-wave.png',
}

/* ── line icons (restrained, unified stroke) ── */
function Ic({ k, size = 22, color = 'currentColor' }: { k: string; size?: number; color?: string }) {
  const P: Record<string, ReactNode> = {
    clipboard: (<><rect x="5" y="4" width="11" height="14" rx="2" /><path d="M9 4a2 2 0 0 1 4 0M8 9h5M8 12h5M8 15h3" /><path d="M13.5 14.5l1.25 1.25L17 12.5" /></>),
    shield: (<><path d="M11 3l7 2.8v5.2c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5.8L11 3z" /><path d="M8 11.5l2 2 4-4.5" /></>),
    cube: (<><path d="M11 3l8 4.5v9L11 20l-8-4.5v-9L11 3z" /><path d="M11 12l8-4.5M11 12v8M11 12L3 7.5" /><path d="M7 5.25l8 4.5" /></>),
    cloud: (<path d="M5.5 17a4 4 0 0 1-.3-7.98 5.5 5.5 0 0 1 10.6-1.1A4.2 4.2 0 0 1 16.5 17h-11z" />),
    rocket: (<><path d="M9.5 13.5l-2-2c1-2.5 2.5-4.5 5-6 2.5-1.5 5-2 7.5-2-.0 2.5-.5 5-2 7.5-1.5 2.5-3.5 4-6 5l-2-2z" /><path d="M7.5 11.5l-3 .5 2-2.5M11.5 15.5l-.5 3 2.5-2M5.5 16.5c-1 .5-1.5 2-1.5 2s1.5-.5 2-1.5" /></>),
    target: (<><circle cx="11" cy="11" r="8" /><circle cx="11" cy="11" r="4.5" /><circle cx="11" cy="11" r="1.2" /><path d="M11 3v2M11 17v2M3 11h2M17 11h2" /></>),
    route: (<><circle cx="6" cy="5" r="2.2" /><circle cx="16" cy="17" r="2.2" /><path d="M8 5h6a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h6" /></>),
    puzzle: (<><path d="M10 4.5a1.8 1.8 0 1 1 3.6 0H17a1.5 1.5 0 0 1 1.5 1.5v3.4a1.8 1.8 0 1 0 0 3.6V16a1.5 1.5 0 0 1-1.5 1.5h-3.4a1.8 1.8 0 1 1-3.6 0H6A1.5 1.5 0 0 1 4.5 16v-3.4a1.8 1.8 0 1 1 0-3.6V6A1.5 1.5 0 0 1 6 4.5h4z" /></>),
    users: (<><circle cx="8" cy="7" r="3" /><path d="M3 17c.6-3 2.6-4.5 5-4.5s4.4 1.5 5 4.5" /><circle cx="15.5" cy="8" r="2.4" /><path d="M14.5 12.7c2 .3 3.6 1.6 4.2 4" /></>),
    award: (<><circle cx="11" cy="8" r="5" /><path d="M8.5 12.5L7 20l4-2.5 4 2.5-1.5-7.5" /><path d="M9.5 8l1 1 2-2.2" /></>),
    trend: (<><path d="M3 17l5-5 3 3 7-7" /><path d="M14 8h4v4" /></>),
    check: (<><path d="M4 11.5l4 4L18 5.5" /></>),
    doc: (<><path d="M6 3h8l4 4v13H6V3z" /><path d="M14 3v4h4M9 11h6M9 14h6" /></>),
  }
  return (
    <svg viewBox="0 0 22 22" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: size, height: size, flexShrink: 0 }}>
      {P[k]}
    </svg>
  )
}

function Arrow({ size = 13 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
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
    <div ref={ref} style={{ ...style, opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(22px)', transition: `opacity 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── the 8 folder chapters ── */
const CHAPTERS = [
  { num: '01', title: 'The Public Edition Agenda', icon: 'clipboard' },
  { num: '02', title: 'Built Around Best Practice', icon: 'shield' },
  { num: '03', title: 'What Public Edition Enables', icon: 'cube' },
  { num: '04', title: 'The TRYVION Approach', icon: 'route' },
  { num: '05', title: 'Extend Without Compromising the Core', icon: 'puzzle' },
  { num: '06', title: 'Is Public Edition Right for Your Organisation?', icon: 'users' },
  { num: '07', title: 'The TRYVION Difference', icon: 'award' },
  { num: '08', title: 'Public Cloud That Creates Momentum', icon: 'trend' },
]

export default function S4HanaPublicEditionPage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)

  const t = {
    sectionBg: isDark ? '#030D22' : '#0B1E3D',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    muted: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(11,30,61,0.5)',
    body: isDark ? 'rgba(255,255,255,0.48)' : '#6A6E74',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,30,61,0.08)',
    cardBg: isDark ? '#030D22' : '#FFFFFF',
    gold: '#C9A24B',
    ink: '#0B1E3D',
    blue: '#1458F2',
  }

  /* paper-internal colours (paper stays light in both themes) */
  const P = {
    paper: '#FBFAF6',
    ink: '#0B1E3D',
    body: '#55595F',
    faint: 'rgba(11,30,61,0.35)',
    hair: 'rgba(11,30,61,0.08)',
    iconBg: 'rgba(20,88,242,0.08)',
    icon: '#1458F2',
    eyebrow: '#B57302',
  }

  const docEyebrow: CSSProperties = { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.eyebrow, margin: '0 0 1.125rem' }
  const docH: CSSProperties = { fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,2.6vw,2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, color: P.ink, margin: '0 0 1.5rem' }
  const docP: CSSProperties = { fontSize: '0.9375rem', lineHeight: 1.8, color: P.body, margin: '0 0 1.125rem', maxWidth: '62ch' }

  const capItem = (icon: string, title: string, desc: string) => (
    <div className="cap-item">
      <span style={{ width: 52, height: 52, borderRadius: 12, background: P.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Ic k={icon} size={24} color={P.icon} />
      </span>
      <div>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: P.ink, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ fontSize: '0.8438rem', lineHeight: 1.65, color: P.body, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )

  const chapterBody = () => {
    switch (active) {
      case 0:
        return (
          <>
            <p style={docEyebrow}>The Public Edition Agenda</p>
            <h2 style={docH}>Standardise the core. Accelerate value.<br />Stay ready for what&apos;s next.</h2>
            <p style={docP}>SAP S/4HANA Cloud, Public Edition provides a standardised, cloud-first approach to enterprise resource planning built around SAP Best Practices.</p>
            <p style={{ ...docP, margin: 0 }}>For organisations seeking faster implementation, lower operating complexity and continuous access to innovation, it creates a foundation designed to evolve with the business.</p>
            <div className="cap-grid">
              {capItem('clipboard', 'SAP Best Practices', 'Start with proven business processes rather than rebuilding the past.')}
              {capItem('target', 'Fit-to-Standard', 'Align business requirements with standard processes and challenge customisation that does not create genuine differentiation.')}
              {capItem('cube', 'Clean Core', 'Keep the ERP foundation maintainable, upgradeable and ready for continuous innovation.')}
              {capItem('cloud', 'Cloud Operations', 'Let SAP manage the underlying infrastructure, security, maintenance and operations.')}
              {capItem('rocket', 'Continuous Innovation', 'Adopt new capabilities as the platform evolves rather than waiting for the next major transformation.')}
            </div>
          </>
        )
      case 1:
        return (
          <>
            <p style={docEyebrow}>Built Around Best Practice</p>
            <h2 style={docH}>Best-practice ERP. Delivered at speed.</h2>
            <p style={docP}>A standardised, fit-to-standard approach for organisations seeking faster implementation, lower operating complexity and continuous access to innovation.</p>
            <p style={{ ...docP, margin: 0 }}>Adopting proven processes is not a limitation — it is the fastest route to a clean, upgradeable and intelligent enterprise core.</p>
            <div className="cap-grid">
              {capItem('clipboard', 'SAP Best Practices', 'Start with proven business processes rather than rebuilding the past.')}
              {capItem('shield', 'Fit-to-Standard', 'Use proven processes while challenging unnecessary customisation.')}
              {capItem('cube', 'Clean Core', 'Create a foundation designed for long-term adaptability.')}
              {capItem('trend', 'Continuous Transformation', 'Treat go-live as the beginning of the journey—not the end.')}
            </div>
          </>
        )
      case 2:
        return (
          <>
            <p style={docEyebrow}>What Public Edition Enables</p>
            <h2 style={docH}>Modernise the core. Simplify the enterprise.<br />Enable what&apos;s next.</h2>
            <p style={{ ...docP, margin: 0 }}>One standardised foundation across the enterprise — ready to serve every function and every market.</p>
            <div className="cap-grid">
              {capItem('cube', 'Modern Enterprise Core', 'Unify and simplify your business processes on a modern, intelligent ERP foundation.')}
              {capItem('users', 'Connected Enterprise', 'Bring finance, operations, supply chain and customer experience together.')}
              {capItem('trend', 'Intelligent Business', 'Leverage real-time insights, automation and AI to make better decisions, faster.')}
              {capItem('cloud', 'Future Ready', 'Build for agility, innovation and continuous transformation.')}
            </div>
          </>
        )
      case 3:
        return (
          <>
            <p style={docEyebrow}>The TRYVION Approach</p>
            <h2 style={docH}>From complexity to clarity.</h2>
            <p style={{ ...docP, margin: 0 }}>Five steps that keep the implementation standardised, the organisation prepared and the core clean.</p>
            <div className="cap-grid">
              {capItem('route', 'Understand', 'Understand the business, operating model, existing SAP landscape and transformation objectives.')}
              {capItem('target', 'Envision', 'Define the future-state enterprise and the capabilities required to achieve it.')}
              {capItem('cube', 'Transform', 'Modernise applications and processes around the right SAP S/4HANA architecture.')}
              {capItem('users', 'Adopt', 'Enable people and the organisation to embrace new processes, technology and ways of working.')}
              {capItem('trend', 'Evolve', 'Continuously improve as business needs and technology change.')}
            </div>
          </>
        )
      case 4:
        return (
          <>
            <p style={docEyebrow}>Extend Without Compromising the Core</p>
            <h2 style={docH}>Connect. Extend. Innovate.</h2>
            <p style={docP}>Connect applications and data, extend the digital core and create new capabilities without compromising the integrity of the enterprise landscape.</p>
            <p style={{ ...docP, margin: 0 }}>Differentiation belongs at the edge — the core stays clean, supported and upgradeable.</p>
            <div className="cap-grid">
              {capItem('cube', 'New Implementation', 'Build a modern SAP S/4HANA foundation around standardised processes and clean-core principles.')}
              {capItem('route', 'System Conversion', 'Modernise an existing SAP ERP landscape while preserving the capabilities that continue to create business value.')}
              {capItem('puzzle', 'Selective Transformation', 'Balance standardisation, continuity and business differentiation through a targeted transformation approach.')}
              {capItem('cloud', 'SAP Business Technology Platform', 'Connect applications and data, extend the digital core and create new capabilities.')}
            </div>
          </>
        )
      case 5:
        return (
          <>
            <p style={docEyebrow}>Is Public Edition Right for Your Organisation?</p>
            <h2 style={docH}>Choose the path that fits your business.</h2>
            <p style={{ ...docP, margin: 0 }}>Public Edition is the natural choice for organisations that value speed, standardisation and continuous innovation over heavy customisation.</p>
            <div className="cap-grid">
              {capItem('check', 'Faster implementation', 'A standardised scope shortens timelines and reduces delivery risk.')}
              {capItem('check', 'Lower operating complexity', 'SAP manages infrastructure, upgrades and operations.')}
              {capItem('check', 'Continuous access to innovation', 'New capabilities arrive without major upgrade projects.')}
              {capItem('check', 'A clean, upgradeable core', 'Standardised processes keep the foundation adaptable for the long term.')}
            </div>
          </>
        )
      case 6:
        return (
          <>
            <p style={docEyebrow}>The TRYVION Difference</p>
            <h2 style={docH}>SAP transformation with a business-first mindset.</h2>
            <div className="cap-grid">
              {capItem('target', 'Business + Technology', 'Connect SAP decisions with the business outcomes they are expected to create.')}
              {capItem('shield', 'Fit-to-Standard', 'Use proven processes while challenging unnecessary customisation.')}
              {capItem('cube', 'Clean Core', 'Create a foundation designed for long-term adaptability.')}
              {capItem('route', 'Connected Thinking', 'Consider SAP S/4HANA as part of the wider enterprise ecosystem.')}
              {capItem('trend', 'Continuous Transformation', 'Treat go-live as the beginning of the journey—not the end.')}
            </div>
          </>
        )
      default:
        return (
          <>
            <p style={docEyebrow}>Public Cloud That Creates Momentum</p>
            <h2 style={docH}>Turn your application landscape into a foundation for what&apos;s next.</h2>
            <p style={docP}>Whether you are modernising your enterprise, exploring AI, building transformation capability or evolving your operations, the next step begins with a choice.</p>
            <p style={{ ...docP, margin: 0 }}>Public cloud, chosen with clarity — and built to keep moving forward.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: 44, padding: '0 1.5rem', borderRadius: 4, background: t.gold, color: t.ink, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                Talk to an SAP Expert <Arrow />
              </Link>
              <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: 44, padding: '0 1.5rem', borderRadius: 4, border: `1px solid ${t.gold}`, color: P.eyebrow, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                Book a Consultation <Arrow />
              </Link>
            </div>
          </>
        )
    }
  }

  return (
    <>
      <style>{`
        /* ══ PHYSICAL FOLDER SHELL ══ */
        .tv-folder{position:relative;border-radius:22px;padding:clamp(16px,2.5vw,28px);
          background:linear-gradient(165deg,#f6ecd4 0%,#ecd9ae 55%,#dfc691 100%);
          box-shadow:0 50px 90px -30px rgba(3,13,34,.6),0 18px 40px -18px rgba(3,13,34,.45),inset 0 2px 0 rgba(255,255,255,.55),inset 0 -3px 0 rgba(120,90,40,.25);}
        .tv-flap{position:absolute;top:-16px;right:8%;width:170px;height:30px;background:linear-gradient(180deg,#f2e3bd,#e6d2a4);border-radius:12px 12px 0 0;box-shadow:inset 0 2px 0 rgba(255,255,255,.5);}
        .tv-body{display:grid;grid-template-columns:clamp(210px,22%,270px) 1fr;align-items:stretch;position:relative}

        /* ══ LEFT — physical file-folder divider tabs ══ */
        .tv-tabs{display:flex;flex-direction:column;width:100%;padding:10px 0 6px;position:relative}
        .tv-tab{--tabbg:#f3e9cf;position:relative;display:grid;grid-template-columns:44px 1fr;grid-template-rows:auto auto;
          column-gap:12px;row-gap:10px;align-items:center;text-align:left;
          padding:15px 16px;margin-top:-8px;background:var(--tabbg);border:none;border-radius:12px 0 0 12px;
          box-shadow:0 6px 14px -6px rgba(70,45,10,.35),inset 0 1px 0 rgba(255,255,255,.55);
          cursor:pointer;transition:transform .25s cubic-bezier(.2,.7,.2,1),background .25s,box-shadow .25s;}
        .tv-tab:first-child{margin-top:0}
        /* raised ear: fillet radius top-left + outer bevel cut on the right */
        .tv-tab::before{content:'';position:absolute;top:-9px;right:12px;width:44%;height:10px;background:var(--tabbg);border-radius:9px 0 0 0;}
        .tv-tab::after{content:'';position:absolute;top:-9px;right:0;width:12px;height:10px;background:var(--tabbg);clip-path:polygon(0 0,100% 100%,0 100%);}
        .tv-tab:not(.active):hover{transform:translateX(4px)}
        .tv-tab .dash{display:block;width:16px;height:2px;border-radius:1px;background:rgba(11,30,61,.25);margin-bottom:6px}
        .tv-tab .n{font-family:var(--family-mono),ui-monospace,monospace;font-size:.8125rem;font-weight:700;color:rgba(11,30,61,.55);line-height:1}
        .tv-tab .t{grid-column:2;grid-row:1 / span 2;align-self:center;font-size:.875rem;line-height:1.35;font-weight:700;color:#12264d;letter-spacing:-.01em}
        .tv-tab .i{grid-column:1;grid-row:2;color:rgba(11,30,61,.6)}
        /* active tab: taller, navy, emerges from behind the document */
        .tv-tab.active{--tabbg:#16294e;background:linear-gradient(180deg,#16294e 0%,#0B1E3D 100%);
          z-index:20;margin-right:-26px;padding-top:20px;padding-bottom:20px;
          box-shadow:0 16px 32px -12px rgba(3,13,34,.65);}
        .tv-tab.active .dash{background:#C9A24B}
        .tv-tab.active .n{color:#C9A24B}
        .tv-tab.active .t{color:#fff}
        .tv-tab.active .i{color:rgba(255,255,255,.85)}

        /* ══ RIGHT — layered paper + active document ══ */
        .tv-docwrap{position:relative;z-index:30;padding:4px 6px 14px 0}
        .tv-sheet{position:absolute;border-radius:10px;pointer-events:none}
        .tv-sheet.s1{inset:8px -8px -8px 10px;background:#f7f3ea;transform:rotate(.4deg);box-shadow:0 10px 24px -12px rgba(10,20,40,.35)}
        .tv-sheet.s2{inset:16px -14px -14px 18px;background:#efe9dc;transform:rotate(.9deg);box-shadow:0 14px 30px -14px rgba(10,20,40,.4)}
        .tv-doc{position:relative;z-index:1;background:#FBFAF6;border-radius:10px;box-shadow:0 24px 60px -20px rgba(3,13,34,.4);
          padding:clamp(28px,4vw,54px) clamp(22px,4.5vw,62px) clamp(34px,4.5vw,58px);min-height:660px;
          animation:docIn .5s cubic-bezier(.2,.7,.2,1);}
        @keyframes docIn{from{opacity:0;transform:translateY(16px) rotate(.4deg)}to{opacity:1;transform:none}}
        .tv-clip{position:absolute;top:-16px;right:46px;transform:rotate(6deg);filter:drop-shadow(0 2px 3px rgba(0,0,0,.25))}

        .cap-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:56px;margin-top:34px}
        .cap-item{display:flex;gap:16px;padding:26px 0;border-bottom:1px solid rgba(11,30,61,.08)}
        .cap-item:nth-child(odd){border-right:1px solid rgba(11,30,61,.08);padding-right:56px}
        .cap-item:last-child{border-bottom:none}

        @media (max-width:980px){
          .tv-body{grid-template-columns:1fr}
          .tv-tabs{flex-direction:row;overflow-x:auto;gap:10px;padding:4px 2px 14px;scrollbar-width:none}
          .tv-tabs::-webkit-scrollbar{display:none}
          .tv-tab{min-width:216px;margin-top:0;border-radius:12px}
          .tv-tab::before,.tv-tab::after{display:none}
          .tv-tab.active{margin-right:0;padding-top:15px;padding-bottom:15px}
          .tv-docwrap{padding:0}
          .tv-doc{min-height:auto}
        }
        @media (max-width:640px){
          .cap-grid{grid-template-columns:1fr}
          .cap-item:nth-child(odd){border-right:none;padding-right:0}
        }
        @media (prefers-reduced-motion: reduce){ .tv-doc{animation:none} .tv-tab{transition:none} }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', background: t.sectionBg, overflow: 'hidden' }}>
        <img src={IMG.hero} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.9 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.94) 0%, rgba(3,13,34,0.82) 42%, rgba(3,13,34,0.25) 75%, rgba(3,13,34,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', padding: 'calc(36px + var(--layout-header-height-desktop) + 56px) clamp(1.25rem,5vw,3.5rem) 72px' }}>
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
              <span aria-hidden="true">›</span>
              <Link href="/services/applications" style={{ color: 'inherit', textDecoration: 'none' }}>TRYVION Applications</Link>
              <span aria-hidden="true">›</span>
              <Link href="/services/applications/sap-s4hana" style={{ color: 'inherit', textDecoration: 'none' }}>SAP S/4HANA</Link>
              <span aria-hidden="true">›</span>
              <span style={{ color: t.gold, fontWeight: 700 }}>Public Cloud Edition</span>
            </nav>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1.25rem' }}>SAP S/4HANA</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1.75rem', maxWidth: '20ch' }}>
              Cloud.<br />Public Edition.
            </h1>
            <div style={{ width: '56px', height: '3px', background: t.gold, marginBottom: '1.75rem' }} />
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)', maxWidth: '46ch', margin: '0 0 2.5rem' }}>
              Build a modern enterprise foundation around proven business processes, a clean core and continuous innovation.<br />We help organisations adopt SAP S/4HANA Cloud, Public Edition through a fit-to-standard approach-simplifying processes, reducing unnecessary complexity and creating a scalable ERP foundation designed for what comes next.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                Talk to an SAP Expert <Arrow />
              </Link>
              <Link href="#folder" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, border: '1px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                Explore Your Transformation Path <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ THE EXECUTIVE FOLDER — 8 interactive chapters ═══ */}
      <section id="folder" style={{ background: t.sectionBg, padding: 'clamp(3.5rem,6vw,6rem) clamp(1rem,4vw,3rem) clamp(4rem,7vw,6.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div className="tv-folder">
              <div className="tv-flap" aria-hidden="true" />
              {/* subtle TRYVION fork mark on the upper-right flap */}
              <svg viewBox="0 0 80 128" fill="none" aria-hidden="true" style={{ position: 'absolute', top: 10, right: 'calc(8% + 66px)', width: 26, height: 42, opacity: 0.35 }}>
                <line x1="40" y1="0" x2="40" y2="58" stroke="#8a6a2c" strokeWidth="6" />
                <line x1="40" y1="64" x2="6" y2="128" stroke="#8a6a2c" strokeWidth="6" />
                <line x1="40" y1="64" x2="74" y2="128" stroke="#8a6a2c" strokeWidth="6" />
              </svg>

              <div className="tv-body">
                {/* LEFT — 8 stacked physical folder tabs (never disappear) */}
                <div className="tv-tabs" role="tablist" aria-label="SAP S/4HANA Cloud, Public Edition chapters">
                  {CHAPTERS.map((c, i) => (
                    <button
                      key={c.num}
                      role="tab"
                      id={`tv-tab-${c.num}`}
                      aria-selected={active === i}
                      aria-controls="tv-doc"
                      className={`tv-tab ${active === i ? 'active' : ''}`}
                      style={{ zIndex: active === i ? 20 : 10 + i }}
                      onClick={() => setActive(i)}
                    >
                      <span style={{ gridColumn: 1, gridRow: 1 }}>
                        <span className="dash" />
                        <span className="n">{c.num}</span>
                      </span>
                      <span className="t">{c.title}</span>
                      <span className="i"><Ic k={c.icon} size={22} /></span>
                    </button>
                  ))}
                </div>

                {/* RIGHT — layered sheets + active document */}
                <div className="tv-docwrap">
                  <div className="tv-sheet s2" aria-hidden="true" />
                  <div className="tv-sheet s1" aria-hidden="true" />
                  <div className="tv-doc" id="tv-doc" role="tabpanel" aria-labelledby={`tv-tab-${CHAPTERS[active].num}`} key={active}>
                    {/* paperclip */}
                    <svg className="tv-clip" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 40, height: 40 }}>
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.12l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    {chapterBody()}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(4.5rem,8vw,7rem)', background: t.sectionBg }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, background: 'var(--ink-950)' }}>
              <img src={IMG.wave} alt="" aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.9 }} />
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2.5rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '34ch' }}>
                  <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1rem' }}>Ready to Move to SAP S/4HANA CLOUD, PUBLIC EDITION??</p>
                  <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.25, color: '#fff', margin: 0 }}>
                    Let&apos;s turn your ERP transformation into a foundation for what&apos;s next.
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', flexShrink: 0 }}>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                    Talk to an SAP Expert <Arrow />
                  </Link>
                  <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Book a Consultation <Arrow />
                  </Link>
                  <Link href="/services/applications/sap-s4hana" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Explore SAP S/4HANA <Arrow />
                  </Link>
                  <Link href="/services/applications/sap-s4hana/private-cloud" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: 48, padding: '0 1.75rem', borderRadius: 4, border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Explore SAP S/4HANA Private Cloud <Arrow />
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
