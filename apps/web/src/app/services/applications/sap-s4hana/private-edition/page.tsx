'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   SAP S/4HANA CLOUD, PRIVATE EDITION — production page body.
   Header (ScrollHeader) & Footer (SiteFooter) render universally in
   the layout and are NOT touched here.
   Content source-of-truth: TRYVION_SAP_S4HANA_Cloud_Private_Edition.docx
   Core concept: one physical TRYVION executive folder — 9 persistent
   stacked folder-tabs on the left (Public-Edition tab design: dash +
   mono number + icon on the left, title right, folder "ear" notch on
   the top-right), active document on the right.
   Colours/fonts resolve from TRYVION design tokens (tryvion-tokens.css).
   Icons: inline stroke SVGs, each matched to its content.
───────────────────────────────────────────────────────────────── */

const IMG = {
  hero: '/images/hero-sap-s4hana-private-cloud.webp',
  wave: '/images/planetary-wave.png',
}
const BLUE = '#1458F2'
const ORANGE = '#EB9F38'
const PURPLE = '#6131E0'
const TEAL = '#469DA0'

/* ── content-matched icons ── */
function Icon({ d, extra, size = 22, color }: { d: string; extra?: ReactNode; size?: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d={d} />
      {extra}
    </svg>
  )
}
const IC = {
  layers: 'M4 6l8-3 8 3M4 6l8 3 8-3M4 10l8 3 8-3M4 14l8 3 8-3',
  building: 'M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 0 1 6.75 3h3A2.25 2.25 0 0 1 12 5.25V21m0-9h5.25a2.25 2.25 0 0 1 2.25 2.25V21M7.5 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5',
  cube: 'm21 7.5-9-4.5-9 4.5m18 0v9l-9 4.5m9-9-9 4.5m-9-4.5v9l9 4.5m0-9L3 7.5',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h6a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7',
  swap: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
  extend: 'M10 4.5a1.8 1.8 0 1 1 3.6 0H17a1.5 1.5 0 0 1 1.5 1.5v3.4a1.8 1.8 0 1 0 0 3.6V16a1.5 1.5 0 0 1-1.5 1.5h-3.4a1.8 1.8 0 1 1-3.6 0H6A1.5 1.5 0 0 1 4.5 16v-3.4a1.8 1.8 0 1 1 0-3.6V6A1.5 1.5 0 0 1 6 4.5h4',
  usercheck: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm13 8.5-4 4-2-2',
  shield: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  trend: 'M2.25 18l6-6 4 4 8.25-8.25M15.75 7.75h4.5v4.5',
  sliders: 'M6 4v16M12 4v16M18 4v16M4 9h4M10 14h4M16 7h4',
  cloud: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
  banknote: 'M2.25 6h19.5v12H2.25zM12 12a2 2 0 1 0 0 .01M6 12h.01M18 12h.01',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2m11-1h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 16.72 8H14m-5 10H9',
  factory: 'M2.25 21h19.5M3.75 21V6.75L9 10V6.75L14.25 10V4.5h6v16.5M7.5 14h.01M11.25 14h.01M15 14h.01',
  cart: 'M2.25 3h1.5l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12M9 21a1 1 0 1 0 0-.01M18 21a1 1 0 1 0 0-.01',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5-3a7.5 7.5 0 0 1-.1 1.2l2 1.6-2 3.4-2.4-1a7.6 7.6 0 0 1-2.1-1.2l-.4 2.6h-4l-.4-2.6a7.6 7.6 0 0 1-2.1-1.2l-2.4 1-2-3.4 2-1.6a7.5 7.5 0 0 1 0-2.4l-2-1.6 2-3.4 2.4 1a7.6 7.6 0 0 1 2.1-1.2l.4-2.6h4l.4 2.6a7.6 7.6 0 0 1 2.1 1.2l2.4-1 2 3.4-2 1.6c.07.4.1.8.1 1.2Z',
  map: 'M9 6.75 15 9l6-2.25V18.75L15 21l-6-2.25L3 21V6.75L9 9Zm0 0V18.75M15 9v12',
  search: 'm21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  gauge: 'M12 15a3 3 0 1 0 0-6M12 12l3.5-3.5M4.5 19a9 9 0 1 1 15 0',
  eye: 'M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z',
  bolt: 'm3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z',
  users: 'M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM18.75 18.75c-.6-3.2-3.4-5.25-6.75-5.25s-6.15 2.05-6.75 5.25',
  refresh: 'M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  briefcase: 'M4 8h16v11H4V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 12h16',
  simplify: 'M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7',
  check: 'M4.5 12.75l6 6 9-13.5',
}
function Arrow({ size = 13, color }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color ?? 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
/* ── scroll reveal ── */
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

/* ── folder chapters ── */
const CHAPTERS = [
  { num: '01', title: 'The Private Edition Agenda', icon: IC.layers },
  { num: '02', title: 'Built for Complex Enterprises', icon: IC.building },
  { num: '03', title: 'What Private Edition Enables', icon: IC.cube },
  { num: '04', title: 'The TRYVION Approach', icon: IC.route },
  { num: '05', title: 'Transformation Paths', icon: IC.swap },
  { num: '06', title: 'Extend Without Losing Control', icon: IC.extend },
  { num: '07', title: 'Is Private Edition Right for Your Organisation?', icon: IC.usercheck },
  { num: '08', title: 'The TRYVION Difference', icon: IC.shield },
  { num: '09', title: 'Private Cloud That Creates Momentum', icon: IC.trend },
]

export default function S4HanaPrivateEditionPage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState(0)
  const t = {
    bg1: isDark ? '#030D22' : '#FFFFFF',
    bg2: isDark ? '#0B1E3D' : '#F4F6F8',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    muted: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(11,30,61,0.5)',
    body: isDark ? 'rgba(255,255,255,0.48)' : '#6A6E74',
    faint: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(11,30,61,0.3)',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,30,61,0.08)',
    cardBg: isDark ? '#030D22' : '#FFFFFF',
    divider: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(11,30,61,0.06)',
    gold: '#C9A24B',
    ink: '#0B1E3D',
  }
  /* paper-internal colours (paper stays light in both themes) */
  const P = { ink: '#0B1E3D', body: '#55595F', goldText: '#715300' }
  const docEyebrow: CSSProperties = { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.goldText, margin: '0 0 1rem' }
  const docH: CSSProperties = { fontFamily: 'var(--family-display)', fontSize: 'clamp(1.5rem,2.6vw,2.125rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, color: P.ink, margin: '0 0 1.25rem' }
  const docP: CSSProperties = { fontSize: '0.9375rem', lineHeight: 1.8, color: P.body, margin: '0 0 1rem', maxWidth: '68ch' }
  const item = (icon: string, color: string, title: string, d: string) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.875rem 0' }}>
      <span style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: `${color}14`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon d={icon} color={color} size={20} />
      </span>
      <div>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: P.ink, margin: '0 0 0.25rem', letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ fontSize: '0.8438rem', lineHeight: 1.65, color: P.body, margin: 0 }}>{d}</p>
      </div>
    </div>
  )
  const step = (n: string, icon: string, title: string, d: string) => (
    <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '0.625rem 0' }}>
      <span style={{ fontFamily: 'var(--family-mono)', fontSize: '0.6875rem', color: P.goldText, paddingTop: 2 }}>{n}</span>
      <span style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${BLUE}55`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon d={icon} color={BLUE} size={16} />
      </span>
      <div>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: P.ink, margin: '0 0 0.25rem' }}>{title}</h3>
        <p style={{ fontSize: '0.8438rem', lineHeight: 1.65, color: P.body, margin: 0 }}>{d}</p>
      </div>
    </div>
  )

  const chapterBody = () => {
    switch (active) {
      case 0: return (<>
        <p style={docEyebrow}>The Private Edition Agenda</p>
        <h2 style={docH}>Enterprise depth. Cloud flexibility.<br />Built for what&apos;s next.</h2>
        <p style={docP}>Complex enterprises need more than a standard ERP deployment.</p>
        <p style={docP}>SAP S/4HANA Cloud, Private Edition provides the functional depth, configuration flexibility and extensibility required to support complex business environments—while bringing the advantages of a modern cloud operating model.</p>
        <p style={{ ...docP, margin: 0 }}>We help organisations use that flexibility deliberately, creating a modern enterprise core without carrying unnecessary complexity into the future.</p>
      </>)
      case 1: return (<>
        <p style={docEyebrow}>Built for Complex Enterprises</p>
        <h2 style={docH}>Flexibility where your business needs it.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem', marginTop: '1rem' }}>
          {item(IC.sliders, BLUE, 'Complex Business Processes', 'Support sophisticated process requirements across finance, supply chain, manufacturing, procurement and other enterprise functions.')}
          {item(IC.building, ORANGE, 'Industry Depth', 'Support industry-specific requirements where standardisation alone cannot address the complexity of the business.')}
          {item(IC.sliders, PURPLE, 'Configuration Flexibility', 'Adapt the SAP environment to legitimate business requirements without compromising the broader transformation architecture.')}
          {item(IC.extend, TEAL, 'Extensibility', 'Extend the platform where differentiation creates business value while applying clean-core principles.')}
          {item(IC.cloud, BLUE, 'Cloud Operations', 'Move toward a modern cloud operating model while retaining the enterprise capabilities and flexibility your organisation requires.')}
        </div>
      </>)
      case 2: return (<>
        <p style={docEyebrow}>What Private Edition Enables</p>
        <h2 style={docH}>One digital core. Built around your enterprise.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem', marginTop: '1rem' }}>
          {item(IC.banknote, BLUE, 'Finance', 'Create an integrated foundation for financial management, reporting and enterprise visibility.')}
          {item(IC.truck, ORANGE, 'Supply Chain', 'Connect planning, procurement, logistics and operational execution across complex environments.')}
          {item(IC.factory, PURPLE, 'Manufacturing', 'Support sophisticated manufacturing processes while creating opportunities for standardisation and optimisation.')}
          {item(IC.cart, TEAL, 'Procurement', 'Integrate sourcing, purchasing and supplier processes into the wider enterprise operating model.')}
          {item(IC.cog, BLUE, 'Asset & Operations', 'Connect asset-intensive and operational processes with the enterprise core.')}
          {item(IC.layers, ORANGE, 'Industry-Specific Processes', 'Support differentiated processes where industry requirements demand greater depth and flexibility.')}
        </div>
      </>)
      case 3: return (<>
        <p style={docEyebrow}>The TRYVION Approach</p>
        <h2 style={docH}>Transform complexity. Don&apos;t just migrate it.</h2>
        {step('01', IC.search, 'Discover', 'Understand the business model, existing SAP landscape, processes, integrations and transformation objectives.')}
        {step('02', IC.gauge, 'Assess', 'Identify technical debt, customisations, process variations and opportunities for simplification.')}
        {step('03', IC.eye, 'Envision', 'Define the future-state architecture and determine what should be standardised, retained, redesigned or extended.')}
        {step('04', IC.bolt, 'Transform', 'Modernise the SAP environment through the appropriate implementation, conversion or selective transformation path.')}
        {step('05', IC.users, 'Adopt', 'Enable people, processes and the organisation to operate effectively within the new environment.')}
        {step('06', IC.refresh, 'Evolve', 'Continuously optimise the landscape while adopting new capabilities and maintaining a clean, adaptable core.')}
      </>)
      case 4: return (<>
        <p style={docEyebrow}>Transformation Paths</p>
        <h2 style={docH}>Meet your existing SAP landscape where it is.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem', marginTop: '1rem' }}>
          {item(IC.building, BLUE, 'New Implementation', 'Build a modern SAP S/4HANA foundation around redesigned processes, enterprise requirements and clean-core principles.')}
          {item(IC.refresh, ORANGE, 'System Conversion', 'Modernise an existing SAP ERP environment while preserving the business capabilities that remain relevant.')}
          {item(IC.swap, PURPLE, 'Selective Transformation', 'Transform selectively where the organisation needs to balance continuity, standardisation and business differentiation.')}
          {item(IC.map, TEAL, 'Landscape Transformation', 'Rationalise complex SAP landscapes and create a more consistent enterprise architecture across business units and geographies.')}
        </div>
      </>)
      case 5: return (<>
        <p style={docEyebrow}>Extend Without Losing Control</p>
        <h2 style={docH}>Preserve differentiation. Eliminate unnecessary complexity.</h2>
        <p style={docP}>Enterprise flexibility should not become enterprise complexity.</p>
        <p style={docP}>TRYVION evaluates where SAP standard functionality provides the right answer, where configuration is justified and where extensions are required to support genuine differentiation.</p>
        <p style={{ ...docP, margin: 0 }}>We apply clean-core principles throughout the transformation—helping organisations retain the flexibility they need while creating a foundation that remains maintainable and ready for change.</p>
      </>)
      case 6: return (<>
        <p style={docEyebrow}>Is Private Edition Right for Your Organisation?</p>
        <h2 style={docH}>Designed for enterprises where complexity and differentiation matter.</h2>
        <p style={docP}>SAP S/4HANA Cloud, Private Edition can be particularly well suited to:</p>
        {item(IC.building, BLUE, 'Large enterprises', 'Managing complex processes, multiple business units and diverse operating environments.')}
        {item(IC.refresh, ORANGE, 'Established SAP environments', 'Modernising existing SAP ERP or SAP ECC landscapes.')}
        {item(IC.shield, PURPLE, 'Regulated organisations', 'Operating with specialised processes, governance requirements and complex controls.')}
        {item(IC.factory, TEAL, 'Industry-intensive businesses', 'Requiring deep industry capabilities and sophisticated process support.')}
        {item(IC.swap, BLUE, 'Organisations with differentiated processes', 'Where standardisation alone cannot support the business model.')}
      </>)
      case 7: return (<>
        <p style={docEyebrow}>The TRYVION Difference</p>
        <h2 style={docH}>Private cloud transformation with a business-first mindset.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem', marginTop: '1rem' }}>
          {item(IC.briefcase, BLUE, 'Business + Technology', 'Connect transformation decisions with the business outcomes they are expected to create.')}
          {item(IC.simplify, ORANGE, 'Complexity Reduction', 'Challenge legacy complexity before carrying it into the new environment.')}
          {item(IC.cube, PURPLE, 'Clean Core', 'Protect the long-term maintainability, adaptability and upgradeability of the SAP foundation.')}
          {item(IC.layers, TEAL, 'Transformation Depth', 'Address processes, data, integrations, architecture and organisational change as one transformation.')}
          {item(IC.refresh, BLUE, 'Continuous Evolution', 'Create an environment capable of adapting as the enterprise and technology landscape change.')}
        </div>
      </>)
      default: return (<>
        <p style={docEyebrow}>Private Cloud That Creates Momentum</p>
        <h2 style={docH}>Modernise what holds you back.<br />Preserve what moves you forward.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem 2rem', marginTop: '1rem' }}>
          {['Simplify the enterprise landscape.', 'Modernise legacy ERP.', 'Preserve genuine business differentiation.', 'Connect the enterprise.', 'Reduce technical complexity.', 'Create a stronger digital core.', 'Prepare for continuous innovation.'].map((s) => (
            <div key={s} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', padding: '0.5rem 0' }}>
              <Icon d={IC.check} color={TEAL} size={16} />
              <span style={{ fontSize: '0.9375rem', color: P.body }}>{s}</span>
            </div>
          ))}
        </div>
        <p style={{ ...docP, marginTop: '1.25rem', marginBottom: 0 }}>TRYVION helps organisations turn SAP S/4HANA Cloud, Private Edition into a modern enterprise foundation—without losing the capabilities that make the business unique.</p>
      </>)
    }
  }

  return (
    <>
      <style>{`
        .pe-folder{position:relative;border-radius:22px;padding:clamp(16px,3vw,32px);background:linear-gradient(165deg,#f6ecd4 0%,#ecd9ae 55%,#dfc691 100%);box-shadow:0 50px 90px -30px rgba(3,13,34,.6),0 18px 40px -18px rgba(3,13,34,.45),inset 0 2px 0 rgba(255,255,255,.55),inset 0 -3px 0 rgba(120,90,40,.25)}
        .pe-folder::before{content:'';position:absolute;top:-16px;right:8%;width:170px;height:30px;background:linear-gradient(180deg,#f2e3bd,#e6d2a4);border-radius:12px 12px 0 0;box-shadow:inset 0 2px 0 rgba(255,255,255,.5)}
        .pe-body{display:grid;grid-template-columns:300px 1fr;align-items:stretch;position:relative}
        .pe-tabs{display:flex;flex-direction:column;padding:14px 0 6px;position:relative;z-index:10}
        /* physical folder divider tabs — dash + mono number + icon left, title right, ear notch top-right */
        .pe-tab{--tabbg:#efe6ce;position:relative;display:flex;align-items:center;gap:14px;text-align:left;
          padding:16px 18px;margin-top:-14px;border-radius:14px;border:1px solid rgba(122,92,40,.18);
          background:var(--tabbg);box-shadow:0 10px 22px -10px rgba(70,45,10,.45),inset 0 1px 0 rgba(255,255,255,.6);
          cursor:pointer;transition:transform .25s cubic-bezier(.34,1.26,.64,1),background .25s,box-shadow .25s}
        .pe-tab::before{content:'';position:absolute;top:-12px;right:16px;width:44%;height:13px;background:var(--tabbg);border-radius:10px 10px 0 0;box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
        .pe-tab:first-child{margin-top:0}
        .pe-tab-left{display:flex;flex-direction:column;align-items:flex-start;gap:7px;flex-shrink:0}
        .pe-tab .dash{width:18px;height:2px;border-radius:1px;background:rgba(11,30,61,.35)}
        .pe-tab .n{font-family:var(--family-mono),ui-monospace,monospace;font-size:.8125rem;font-weight:700;color:rgba(11,30,61,.55);line-height:1}
        .pe-tab .i{color:rgba(11,30,61,.6)}
        .pe-tab .t{flex:1;font-size:.9375rem;line-height:1.35;font-weight:700;color:#12264d;letter-spacing:-.01em}
        .pe-tab:not(.active):hover{transform:translateX(8px)}
        .pe-tab.active{--tabbg:#12264d;border-color:#0B1E3D;transform:translateX(10px);margin-right:-14px;padding-top:18px;padding-bottom:18px;box-shadow:0 16px 34px -12px rgba(3,13,34,.65)}
        .pe-tab.active::before{box-shadow:none}
        .pe-tab.active .dash{background:#C9A24B}
        .pe-tab.active .n{color:#C9A24B}
        .pe-tab.active .t{color:#fff}
        .pe-tab.active .i{color:rgba(255,255,255,.85)}
        .pe-docwrap{position:relative;padding:6px 12px 16px 0}
        .pe-sheet{position:absolute;border-radius:8px;pointer-events:none}
        .pe-sheet.s1{inset:10px -8px -8px 14px;background:#f7f3ea;transform:rotate(.5deg);box-shadow:0 10px 24px -12px rgba(10,20,40,.35)}
        .pe-sheet.s2{inset:20px -16px -16px 26px;background:#efe9dc;transform:rotate(1.1deg);box-shadow:0 14px 30px -14px rgba(10,20,40,.4)}
        .pe-doc{position:relative;background:#FBFAF6;border-radius:8px;box-shadow:0 30px 70px -25px rgba(3,13,34,.5);padding:clamp(28px,4vw,54px) clamp(22px,4.5vw,62px) clamp(34px,4.5vw,58px);min-height:660px;animation:docIn .5s cubic-bezier(.2,.7,.2,1)}
        @keyframes docIn{from{opacity:0;transform:translateY(16px) rotate(.4deg)}to{opacity:1;transform:none}}
        @media(max-width:1023px){
          .pe-body{grid-template-columns:1fr}
          .pe-tabs{flex-direction:row;overflow-x:auto;gap:8px;padding:4px 2px 14px;scrollbar-width:none}
          .pe-tabs::-webkit-scrollbar{display:none}
          .pe-tab{margin-top:0!important;transform:none!important;flex:0 0 auto;max-width:260px;border-radius:14px}
          .pe-tab::before{display:none}
          .pe-tab.active{transform:none!important;margin-right:0}
          .pe-docwrap{padding:0}
          .pe-doc{min-height:auto}
        }
        @media (prefers-reduced-motion: reduce){.pe-doc{animation:none}.pe-tab{transition:none}}
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', background: '#030D22', overflow: 'hidden' }}>
        <img src={IMG.hero} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.9 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.94) 0%, rgba(3,13,34,0.82) 42%, rgba(3,13,34,0.25) 75%, rgba(3,13,34,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', padding: 'calc(36px + var(--layout-header-height-desktop) + 56px) clamp(1.25rem,5vw,3.5rem) 72px' }}>
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.625rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link><span aria-hidden="true">›</span>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link><span aria-hidden="true">›</span>
              <Link href="/services/applications" style={{ color: 'inherit', textDecoration: 'none' }}>TRYVION Applications</Link><span aria-hidden="true">›</span>
              <Link href="/services/sap" style={{ color: 'inherit', textDecoration: 'none' }}>SAP S/4HANA</Link><span aria-hidden="true">›</span>
              <span style={{ color: t.gold, fontWeight: 700 }}>Cloud, Private Edition</span>
            </nav>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1.25rem' }}>Enterprise ERP. Cloud without compromise.</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1.75rem', maxWidth: '22ch' }}>
              Modernise the core.<br />Preserve what matters.
            </h1>
            <div style={{ width: '56px', height: '3px', background: t.gold, marginBottom: '1.75rem' }} />
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)', maxWidth: '46ch', margin: '0 0 1.25rem' }}>
              Transform complex enterprise environments with a modern SAP S/4HANA foundation designed for greater flexibility, control and continuous innovation.
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '52ch', margin: '0 0 2.5rem' }}>
              TRYVION helps organisations move to SAP S/4HANA Cloud, Private Edition while modernising processes, simplifying the technology landscape and preserving the capabilities that create genuine business value.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                Talk to an Expert <Arrow />
              </Link>
              <Link href="#folder" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                Explore Your Transformation Path <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ THE EXECUTIVE FOLDER ═══ */}
      <section id="folder" style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div className="pe-folder">
              <div className="pe-body">
                <div className="pe-tabs" role="tablist" aria-label="SAP S/4HANA Cloud, Private Edition chapters">
                  {CHAPTERS.map((c, i) => (
                    <button key={c.num} type="button" role="tab" aria-selected={active === i} aria-controls="pe-doc"
                      className={`pe-tab ${active === i ? 'active' : ''}`}
                      style={{ zIndex: active === i ? 40 : i + 1 }}
                      onClick={() => setActive(i)}>
                      <span className="pe-tab-left">
                        <span className="dash" />
                        <span className="n">{c.num}</span>
                        <span className="i"><Icon d={c.icon} color="currentColor" size={20} /></span>
                      </span>
                      <span className="t">{c.title}</span>
                    </button>
                  ))}
                </div>
                <div className="pe-docwrap">
                  <div className="pe-sheet s2" aria-hidden="true" />
                  <div className="pe-sheet s1" aria-hidden="true" />
                  <div className="pe-doc" id="pe-doc" role="tabpanel" aria-labelledby={`pe-tab-${CHAPTERS[active].num}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9DA0A6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position: 'absolute', top: -16, right: 44, width: 40, height: 40, transform: 'rotate(10deg)' }}>
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.12l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    <div key={active} style={{ animation: 'docIn .5s cubic-bezier(.2,.7,.2,1)' }}>{chapterBody()}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding: '0 clamp(1.25rem,5vw,3.5rem) clamp(4.5rem,8vw,7rem)', background: t.bg2 }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <Reveal>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', background: 'var(--ink-950)' }}>
              <img src={IMG.wave} alt="" aria-hidden="true" style={{ position: 'absolute', right: 0, bottom: 0, width: 'min(100%,1440px)', height: '100%', objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.9 }} />
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2.5rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '40ch' }}>
                  <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1rem' }}>Ready to transform your SAP landscape?</p>
                  <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.25, color: '#fff', margin: 0 }}>
                    Modernise your enterprise core with the flexibility to support today&apos;s complexity and the foundation to evolve for tomorrow.
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', flexShrink: 0 }}>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--gold-400)', color: 'var(--ink-1000)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                    Talk to an SAP Expert <Arrow />
                  </Link>
                  <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Book a Consultation <Arrow />
                  </Link>
                  <Link href="/services/applications/sap-s4hana" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Explore SAP S/4HANA <Arrow />
                  </Link>
                  <Link href="/services/applications/sap-s4hana/public-edition" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201,162,75,0.55)', color: '#fff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,0.04)' }}>
                    Explore SAP S/4HANA Public Cloud <Arrow />
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
