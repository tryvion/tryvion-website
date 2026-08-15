'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   SAP SUCCESSFACTORS — Hire-to-Retire service page (production)
   • Hero slider replaced with the LOCAL background image
     (public/images/hero-sap-successfactors.png → falls back to
     /images/planetary-wave.png → then to the brand gradient).
   • Breadcrumb (Home › Services › Applications › SAP SuccessFactors)
     added at the top of the hero — no other changes.
   • Agenda cards → 3 per row (2 on tablet, 1 on mobile)
   • AI Lifecycle → clear 4-col row + 3-col row
   • Approach → 6 steps spread full-width, equal L/R margins
   • Why TRYVION → bordered card, centred eyebrow + 6 divided cols
   • Foundation panel → vertical separator between the two halves
   Icons: inline stroke SVGs, each matched to its content.
   Animations: scroll-reveal on every section (reduced-motion safe).
───────────────────────────────────────────────────────────────── */

/* Local background assets (public/images/…) */
const HERO_BG = '/images/sap_successfactors_tryvion.png'
const WAVE = '/images/planetary-wave.png'
const BLUE = '#1458F2'
const ORANGE = '#EB9F38'

/* ── content-matched icon set ── */
const IC: Record<string, ReactNode> = {
  userPlus: (<><circle cx="9" cy="7" r="3.5" /><path d="M2.5 19c.7-3.4 3.3-5.5 6.5-5.5s5.8 2.1 6.5 5.5" /><path d="M18 6v6M15 9h6" /></>),
  people: (<><circle cx="8" cy="7" r="3" /><path d="M2.5 19c.6-3.2 2.9-5.5 5.5-5.5S13.4 15.8 14 19" /><circle cx="16.5" cy="8.5" r="2.5" /><path d="M15.5 13.7c2.3.3 4 2.2 4.5 5.3" /></>),
  chartUp: (<><path d="M3 20h18" /><path d="M5 16l4-5 3 3 5-7" /><path d="M14.5 9H18v3.5" /></>),
  badge: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 8l1.2 2.4 2.6.4-1.9 1.8.4 2.6-2.2-1.2-2.2 1.2.4-2.6-1.9-1.8 2.6-.4L12 8z" /></>),
  user: (<><circle cx="12" cy="7" r="3.5" /><path d="M5 19.5c.8-3.6 3.6-6 7-6s6.2 2.4 7 6" /></>),
  target: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>),
  onboard: (<><path d="M13 4h7v16h-7" /><path d="M3 12h8" /><path d="M8 9l3 3-3 3" /><circle cx="6" cy="6" r="2.5" /></>),
  perform: (<><path d="M3 20h18" /><path d="M5 16l4-5 3 3 5-7" /><path d="M14.5 9H18v3.5" /></>),
  reward: (<><rect x="3" y="8" width="18" height="4" /><path d="M12 8v13M3 12v9h18v-9" /><path d="M12 8c-1.5-3-6-3-6-.5S10 8 12 8zm0 0c1.5-3 6-3 6-.5S14 8 12 8z" /></>),
  transition: (<><path d="M11 4H4v16h7" /><path d="M21 12H10" /><path d="M18 9l3 3-3 3" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5L16 16" /></>),
  brain: (<><path d="M9.5 3A3.5 3.5 0 0 0 6 6.5c-2 .5-3 2-3 4 0 1.6.8 3 2 3.7-.1 2.3 1.6 4.3 4 4.3.6 0 1.2-.1 1.7-.4" /><path d="M14.5 3A3.5 3.5 0 0 1 18 6.5c2 .5 3 2 3 4 0 1.6-.8 3-2 3.7.1 2.3-1.6 4.3-4 4.3-.6 0-1.2-.1-1.7-.4" /><path d="M12 3v17" /></>),
  cap: (<><path d="M2 9l10-4.5L22 9l-10 4.5L2 9z" /><path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11" /><path d="M22 9v5" /></>),
  chat: (<><path d="M4 5h16v11H9l-5 4V5z" /><path d="M8 9h8M8 12h5" /></>),
  sparkle: (<><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3z" /><path d="M18.5 14l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12.5l9 5 9-5" /><path d="M3 16.5l9 5 9-5" /></>),
  shuffle: (<><path d="M3 6h3.5c5 0 6.5 8 11.5 8H21" /><path d="M3 14h3.5c1.6 0 2.8-.8 3.8-2M21 6h-1.5c-1.6 0-2.8.8-3.8 2" /><path d="M18.5 3.5L21 6l-2.5 2.5M18.5 13.5L21 16l-2.5 2.5" /></>),
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>),
  puzzle: (<path d="M10 3.5a2 2 0 0 1 4 0V5h4a1 1 0 0 1 1 1v4h1.5a2 2 0 0 1 0 4H15v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 0 0-4 0V20H6a1 1 0 0 1-1-1v-4H3.5a2 2 0 0 1 0-4H5V6a1 1 0 0 1 1-1h4V3.5z" />),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>),
  chip: (<><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M10 10h4v4h-4z" /><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>),
  network: (<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M7.5 7.8l3 7M16.5 7.8l-3 7M8.5 6h7" /></>),
  arrowUp: (<><circle cx="12" cy="12" r="8.5" /><path d="M8 14l6-6" /><path d="M10 8h4v4" /></>),
  db: (<><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>),
  heart: (<path d="M12 20.5S4 15 4 9.5C4 6.5 6.5 4 9.5 4c1 0 2 .4 2.5 1 .5-.6 1.5-1 2.5-1C17 4 19.5 6.5 19.5 9.5c0 5.5-8 11-8 11z" />),
  check: (<><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.5l2.5 2.5 5-5.5" /></>),
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
/* scroll-reveal wrapper */
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
/* Hero background: local image first, graceful fallback chain */
function HeroBackground() {
  const sources = [HERO_BG, WAVE]
  const [idx, setIdx] = useState(0)
  return (
    <>
      {idx < sources.length && (
        <img
          src={sources[idx]}
          alt=""
          aria-hidden="true"
          onError={() => setIdx((i) => i + 1)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(5,14,43,0.88) 0%, rgba(10,27,77,0.72) 55%, rgba(10,42,122,0.45) 100%)' }} />
    </>
  )
}

/* ── data ── */
const H2R_NODES = [
  { k: 'userPlus', lines: ['Hire', 'with Confidence'], x: 50, y: 4, place: 'top' },
  { k: 'people', lines: ['Engage', 'Continuously'], x: 88, y: 27, place: 'right' },
  { k: 'chartUp', lines: ['Develop', 'Potential'], x: 88, y: 73, place: 'right' },
  { k: 'badge', lines: ['Reward', 'Meaningfully'], x: 50, y: 96, place: 'bottom' },
  { k: 'user', lines: ['Retain', 'Top Talent'], x: 12, y: 73, place: 'left' },
  { k: 'target', lines: ['Inspire', 'Performance'], x: 12, y: 27, place: 'left' },
] as const
const AGENDA = [
  { n: '01', k: 'people', t: 'Attract & Recruit', items: ['Recruiting & Candidate Management', 'Career Sites & Candidate Experience', 'AI-Assisted Talent Discovery & Matching', 'Interview & Hiring Workflows', 'Offer Management', 'Recruitment Analytics'] },
  { n: '02', k: 'onboard', t: 'Hire & Onboard', items: ['Digital Onboarding Journeys', 'Preboarding & Employee Documentation', 'Automated Tasks & Approvals', 'Personalised Onboarding Experiences', 'Role-Based Learning & Enablement'] },
  { n: '03', k: 'people', t: 'Manage & Engage', items: ['Employee Central', 'Organisation & Position Management', 'Employee Lifecycle Processes', 'Time & Absence Management', 'Employee & Manager Self-Service', 'HR Workflow Automation'] },
  { n: '04', k: 'perform', t: 'Perform & Grow', items: ['Performance & Goals', 'Continuous Performance Management', 'Learning & Development', 'Skills & Competency Management', 'Career & Talent Development', 'Succession Planning'] },
  { n: '05', k: 'reward', t: 'Reward & Retain', items: ['Compensation Planning', 'Variable Pay', 'Rewards & Recognition', 'Talent Reviews', 'Retention Insights', 'Workforce Analytics & Planning'] },
  { n: '06', k: 'transition', t: 'Transition & Offboard', items: ['Digital Offboarding', 'Automated Exit Workflows', 'Knowledge Transition', 'Employee Data & Compliance', 'Alumni & Rehire Readiness'] },
]
const AI_ROW1 = [
  { k: 'search', t: 'AI-Assisted Recruiting', d: 'Improve candidate discovery, matching and hiring decisions.' },
  { k: 'brain', t: 'Skills Intelligence', d: 'Identify skills, gaps and development opportunities across the workforce.' },
  { k: 'cap', t: 'Personalised Learning', d: 'Recommend relevant learning and career development pathways.' },
  { k: 'people', t: 'Talent Intelligence', d: 'Support career mobility, succession and workforce planning.' },
]
const AI_ROW2 = [
  { k: 'chat', t: 'AI-Powered HR Service', d: 'Simplify employee queries and HR case resolution.' },
  { k: 'chartUp', t: 'Predictive Workforce Insights', d: 'Identify workforce trends and support more informed HR decisions.' },
  { k: 'sparkle', t: 'Generative AI for HR', d: 'Assist with content creation, summaries, communications and other high-volume HR activities.' },
]
const APPROACH = [
  { n: '01', k: 'search', t: 'Discover', d: 'Understand your workforce strategy, HR landscape, employee journeys and transformation priorities.' },
  { n: '02', k: 'layers', t: 'Adopt', d: 'Leverage preconfigured Hire-to-Retire processes based on leading practices to reduce unnecessary design effort.' },
  { n: '03', k: 'shuffle', t: 'Transform', d: 'Challenge existing processes and identify where standardisation, automation and AI can create greater value.' },
  { n: '04', k: 'gear', t: 'Implement', d: 'Configure and deploy SAP SuccessFactors using an accelerated, outcome-led delivery approach.' },
  { n: '05', k: 'sparkle', t: 'Innovate', d: 'Embed AI and intelligent automation across selected HR processes.' },
  { n: '06', k: 'chartUp', t: 'Evolve', d: 'Continuously optimise employee experience, adoption, analytics and AI opportunities after go-live.' },
]
const WHY = [
  { k: 'puzzle', t: 'Preconfigured Hire-to-Retire', d: 'Start with ready-to-adopt HR processes and leading practices instead of designing everything from scratch.' },
  { k: 'clock', t: 'Faster Time to Value', d: 'Use standardisation, reusable assets and fit-to-standard adoption to accelerate the journey from strategy to deployment.' },
  { k: 'chip', t: 'AI-First by Design', d: 'Identify AI opportunities as part of the transformation—not as a separate initiative after implementation.' },
  { k: 'people', t: 'Employee-Centric Experience', d: 'Design around the moments that matter for candidates, employees, managers and HR teams.' },
  { k: 'network', t: 'Business + Technology', d: 'Connect HR strategy, processes, SAP SuccessFactors, integration, data and AI across the wider enterprise.' },
  { k: 'arrowUp', t: 'Built to Evolve', d: 'Create a digital HR foundation that can adapt to changing skills, workforce models, SAP innovations and emerging AI capabilities.' },
]
const CHAIN = [
  { k: 'people', t: 'People', d: 'Candidates, employees, managers and HR teams.' },
  { k: 'layers', t: 'Process', d: 'Hire-to-Retire workflows and business processes.' },
  { k: 'db', t: 'Data', d: 'Workforce information, skills, performance and organisational insights.' },
  { k: 'sparkle', t: 'AI', d: 'SAP Business AI, Joule and targeted intelligent use cases.' },
  { k: 'cap', t: 'Enterprise', d: 'HR strategy connected with the wider business.' },
]
const CHECKLIST = ['Attract better.', 'Onboard faster.', 'Engage continuously.', 'Develop capabilities.', 'Reward performance.', 'Retain critical talent.', 'Enable intelligent decisions.']

export default function SuccessFactorsPage() {
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
    tint: isDark ? 'rgba(20,88,242,0.10)' : '#EEF3FE',
    gold: ORANGE,
    ink: '#0B1E3D',
  }
  const orangeBtn: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', background: ORANGE, color: t.ink, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }
  const outlineBtn = (onDark = false): CSSProperties => ({ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${onDark ? 'rgba(255,255,255,0.4)' : t.border}`, color: onDark ? '#fff' : t.heading, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', background: 'transparent' })

  return (
    <>
      <style>{`
        @keyframes sfFloat{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-6px)}}
        @keyframes sfSpin{to{transform:rotate(360deg)}}
        .sf-agenda{display:grid;grid-template-columns:minmax(300px,2fr) 3fr;gap:clamp(2rem,4vw,4rem);align-items:start}
        .sf-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
        .sf-ai-grid{display:grid;grid-template-columns:minmax(280px,2fr) 3fr;gap:clamp(2rem,4vw,3.5rem);align-items:start}
        .sf-ai-r1{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:1.75rem}
        .sf-ai-r2{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
        .sf-steps{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;position:relative;width:100%}
        .sf-steps-line{position:absolute;top:28px;left:8.33%;right:8.33%;border-top:2px dashed ${isDark ? 'rgba(120,160,255,0.4)' : 'rgba(20,88,242,0.35)'}}
        .sf-why-grid{display:grid;grid-template-columns:repeat(6,1fr)}
        .sf-why-grid>div{border-left:1px solid ${t.border};padding:0 1.25rem}
        .sf-why-grid>div:first-child{border-left:none}
        .sf-found{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,3rem);position:relative}
        .sf-found-right{border-left:1px solid ${isDark ? 'rgba(120,160,255,0.25)' : 'rgba(20,88,242,0.25)'};padding-left:clamp(2rem,4vw,3rem)}
        @media(max-width:1200px){.sf-cards{grid-template-columns:repeat(2,1fr)}.sf-why-grid{grid-template-columns:repeat(3,1fr)}.sf-why-grid>div:nth-child(4){border-left:none}}
        @media(max-width:1024px){.sf-agenda{grid-template-columns:1fr}.sf-ai-grid{grid-template-columns:1fr}.sf-ai-r1{grid-template-columns:repeat(2,1fr)}.sf-ai-r2{grid-template-columns:repeat(2,1fr)}.sf-steps{grid-template-columns:repeat(3,1fr)}.sf-steps-line{display:none}}
        @media(max-width:900px){.sf-found{grid-template-columns:1fr}.sf-found-right{border-left:none;padding-left:0;border-top:1px solid ${t.border};padding-top:2rem}}
        @media(max-width:700px){.sf-cards{grid-template-columns:1fr}.sf-ai-r1{grid-template-columns:1fr}.sf-ai-r2{grid-template-columns:1fr}.sf-why-grid{grid-template-columns:repeat(2,1fr)}.sf-why-grid>div{border-left:none;padding:0}.sf-steps{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:440px){.sf-steps{grid-template-columns:1fr}}
        @media (prefers-reduced-motion: reduce){.sf-float,.sf-spin{animation:none!important}}
      `}</style>

      {/* ═══ HERO — local background image ═══ */}
      <section style={{ position: 'relative', background: 'linear-gradient(120deg,#050E2B 0%,#0A1B4D 55%,#0A2A7A 100%)', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', padding: 'calc(36px + var(--layout-header-height-desktop) + 40px) clamp(1.25rem,5vw,3.5rem) clamp(4rem,7vw,6rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '3rem', alignItems: 'center' }}>
          <Reveal>
            {/* ── Breadcrumb ── */}
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
              <span aria-hidden="true">›</span>
              <Link href="/services/applications" style={{ color: 'inherit', textDecoration: 'none' }}>Applications</Link>
              <span aria-hidden="true">›</span>
              <span style={{ color: ORANGE, fontWeight: 700 }}>SAP SuccessFactors</span>
            </nav>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: '#fff', margin: '0 0 1rem' }}>SAP SuccessFactors</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1rem' }}>
              Reimagine<br />Hire-to-Retire with <span style={{ color: ORANGE }}>AI</span>
            </h1>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', margin: '0 0 0.75rem' }}>Human experiences. Intelligent HR. Better outcomes.</p>
            <div style={{ width: '56px', height: '3px', background: ORANGE, marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '52ch', margin: '0 0 1rem' }}>Transform HR from a system of record into an intelligent, connected experience.</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', maxWidth: '52ch', margin: '0 0 1rem' }}>We help organisations modernise the complete Hire-to-Retire journey with SAP SuccessFactors—combining leading HR practices, preconfigured processes, automation and AI to simplify work for HR teams, managers and employees.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={orangeBtn}>Talk to an Expert <Arrow /></Link>
              <Link href="/services/applications" style={outlineBtn(true)}>Explore Your HR Transformation <Arrow /></Link>
            </div>
          </Reveal>
          {/* Hire-to-Retire ring diagram */}
          <Reveal delay={150}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', aspectRatio: '1 / 1', margin: '0 auto' }}>
              <div className="sf-spin" style={{ position: 'absolute', inset: '10%', borderRadius: '50%', border: '2px solid rgba(60,121,255,0.5)', boxShadow: '0 0 40px rgba(20,88,242,0.35), inset 0 0 30px rgba(20,88,242,0.2)', animation: 'sfSpin 40s linear infinite' }} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '46%', aspectRatio: '1/1', borderRadius: '50%', background: 'linear-gradient(160deg,#0A1B4D,#050E2B)', border: '2px solid rgba(60,121,255,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 0 50px rgba(20,88,242,0.4)' }}>
                <span style={{ color: '#fff', fontWeight: 800, fontFamily: 'var(--family-display)', fontSize: 'clamp(1rem,2vw,1.375rem)', textAlign: 'center', lineHeight: 1.2 }}>SAP<br />SuccessFactors</span>
                <Ic k="heart" size={26} color={ORANGE} />
              </div>
              {H2R_NODES.map((n, i) => (
                <div key={n.k as string} className="sf-float" style={{ position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: n.place === 'top' ? 'column' : n.place === 'bottom' ? 'column' : 'row', alignItems: 'center', gap: '0.5rem', animation: `sfFloat 5s ease-in-out ${i * 0.5}s infinite` }}>
                  {n.place === 'left' && <span style={{ color: '#fff', fontSize: '0.75rem', textAlign: 'right', lineHeight: 1.3 }}>{n.lines[0]}<br />{n.lines[1]}</span>}
                  <span style={{ width: '52px', height: '52px', borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 0 5px rgba(20,88,242,0.25)', flexShrink: 0 }}>
                    <Ic k={n.k as string} size={22} color="#fff" />
                  </span>
                  {n.place !== 'left' && n.place !== 'top' && <span style={{ color: '#fff', fontSize: '0.75rem', textAlign: 'left', lineHeight: 1.3 }}>{n.lines[0]}<br />{n.lines[1]}</span>}
                  {n.place === 'top' && <span style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{n.lines[0]}<br />{n.lines[1]}</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ AGENDA — text left, 3 cards per row right ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }} className="sf-agenda">
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, margin: '0 0 1.25rem' }}>The SAP SuccessFactors Agenda</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.75rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.15, color: t.heading, margin: '0 0 1.5rem' }}>
              From Hire-to-Retire<br />to Hire-to-<span style={{ color: ORANGE }}>Inspire</span>.
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: '0 0 1rem' }}>Workforce transformation is no longer simply about digitising HR processes.</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: '0 0 1rem' }}>It is about creating an employee experience that connects people, processes, workforce data, skills and business strategy.</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: 0 }}>TRYVION helps organisations move toward a more intelligent HR model—one where technology handles complexity and people can focus on performing, growing and creating value.</p>
          </Reveal>
          <div className="sf-cards">
            {AGENDA.map((c, i) => (
              <Reveal key={c.n} delay={i * 80}>
                <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.5rem', height: '100%', boxShadow: 'var(--elevation-01)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{c.n}</span>
                    <Ic k={c.k} size={22} color={BLUE} />
                  </div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.heading, margin: '0 0 0.75rem' }}>{c.t}</h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {c.items.map((it) => (
                      <li key={it} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', lineHeight: 1.5, color: t.body }}>
                        <span style={{ color: t.faint }}>•</span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI ACROSS THE EMPLOYEE LIFECYCLE — 4 + 3 clear rows ═══ */}
      <section style={{ position: 'relative', background: 'linear-gradient(120deg,#0A1B4D 0%,#0A2A7A 100%)', overflow: 'hidden', padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <img src={WAVE} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <div className="sf-ai-grid">
            <Reveal>
              <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, margin: '0 0 1.25rem' }}>AI Across the Employee Lifecycle</p>
              <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.75rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.15, color: '#fff', margin: '0 0 1.5rem' }}>
                From HR Automation<br />to <span style={{ color: ORANGE }}>Intelligent HR</span>.
              </h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', margin: '0 0 1rem' }}>AI should not be an initiative added after implementation.</p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', margin: 0 }}>TRYVION identifies opportunities to embed AI across the Hire-to-Retire journey from the beginning—helping HR teams simplify work, improve decisions and create more personalised employee experiences.</p>
            </Reveal>
            <div>
              <div className="sf-ai-r1">
                {AI_ROW1.map((a, i) => (
                  <Reveal key={a.t} delay={i * 80}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left', gap: '0.75rem' }}>
                      <span style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(120,160,255,0.5)', background: 'rgba(20,88,242,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic k={a.k} size={22} color="#9CBEFF" />
                      </span>
                      <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>{a.t}</h3>
                      <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{a.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="sf-ai-r2">
                {AI_ROW2.map((a, i) => (
                  <Reveal key={a.t} delay={i * 80}>
                    <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                      <span style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(120,160,255,0.5)', background: 'rgba(20,88,242,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Ic k={a.k} size={20} color="#9CBEFF" />
                      </span>
                      <div>
                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', margin: '0 0 0.375rem' }}>{a.t}</h3>
                        <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{a.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <Reveal delay={200}>
            <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', border: '1px solid rgba(120,160,255,0.4)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', background: 'rgba(20,88,242,0.12)', marginTop: '2rem' }}>
              <Ic k="chip" size={22} color="#9CBEFF" />
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Our approach combines SAP Business AI, Joule and automation with carefully selected AI use cases while keeping governance, security and responsible AI at the core.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ APPROACH — 6 steps, equal margins, full width ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, margin: '0 0 1rem' }}>The TRYVION Approach</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,2.75rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 3.5rem' }}>Preconfigured. AI-First. Experience-Led.</h2>
          </Reveal>
          <div className="sf-steps">
            <div className="sf-steps-line" aria-hidden="true" />
            {APPROACH.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                  <span style={{ width: '56px', height: '56px', borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 0 0 6px ' + (isDark ? 'rgba(20,88,242,0.15)' : 'rgba(20,88,242,0.12)'), position: 'relative', zIndex: 1 }}>
                    <Ic k={s.k} size={24} color="#fff" />
                  </span>
                  <span style={{ fontFamily: 'var(--family-mono)', fontSize: '0.75rem', color: t.faint }}>{s.n}</span>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.heading, margin: 0 }}>{s.t}</h3>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: t.body, margin: 0 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY TRYVION — bordered card, centred, 6 divided columns ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)', borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', border: `1px solid ${t.border}`, borderRadius: 'var(--radius-lg)', background: t.cardBg, padding: 'clamp(2.5rem,4vw,3.5rem) clamp(1.25rem,3vw,2.5rem)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-0.6em', left: '50%', transform: 'translateX(-50%)', background: t.cardBg, padding: '0 1rem', fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, whiteSpace: 'nowrap' }}>HR Transformation</span>
          <Reveal>
            <h2 style={{ textAlign: 'center', fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,2.8vw,2.125rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', color: t.heading, margin: '0 0 2.5rem' }}>Why TRYVION</h2>
          </Reveal>
          <div className="sf-why-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 70}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', height: '100%' }}>
                  <Ic k={w.k} size={30} color={BLUE} />
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.heading, margin: 0 }}>{w.t}</h3>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: t.body, margin: 0 }}>{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTELLIGENT HR FOUNDATION — two halves with separator ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)', borderTop: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', background: t.tint, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-lg)', padding: 'clamp(2rem,4vw,3rem)', position: 'relative' }}>
          <div className="sf-found">
            <Reveal>
              <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, margin: '0 0 1rem' }}>The Intelligent HR Foundation</p>
              <h3 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.375rem,2.4vw,1.875rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h3)', color: t.heading, margin: '0 0 1rem' }}>Connect People, Process, Data and Intelligence.</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: '0 0 2rem' }}>SAP SuccessFactors should not operate as an isolated HR platform.</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CHAIN.map((c, i) => (
                  <div key={c.t} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flex: 1, minWidth: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center', flex: 1 }}>
                      <span style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1px solid ${isDark ? 'rgba(120,160,255,0.5)' : 'rgba(20,88,242,0.4)'}`, background: t.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic k={c.k} size={18} color={BLUE} />
                      </span>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.heading }}>{c.t}</span>
                      <span style={{ fontSize: '0.6875rem', lineHeight: 1.5, color: t.body }}>{c.d}</span>
                    </div>
                    {i < CHAIN.length - 1 && <span aria-hidden="true" style={{ borderTop: `2px dashed ${isDark ? 'rgba(120,160,255,0.4)' : 'rgba(20,88,242,0.35)'}`, width: '16px', marginTop: '22px', flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="sf-found-right" style={{ position: 'relative', height: '100%' }}>
                <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: ORANGE, margin: '0 0 1rem' }}>From Hire-to-Retire to Hire-to-Inspire</p>
                <h3 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.375rem,2.4vw,1.875rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h3)', color: t.heading, margin: '0 0 1rem' }}>Make HR Technology Work for People.</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: '0 0 1.5rem' }}>Technology should handle complexity so your people can focus on what matters most.</p>
                <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.625rem' }}>
                  {CHECKLIST.map((c) => (
                    <li key={c} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8125rem', color: t.heading }}>
                      <Ic k="check" size={16} color={ORANGE} /> {c}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.body, margin: 0 }}>TRYVION helps organisations transform SAP SuccessFactors into an intelligent HR foundation designed for the future of work.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ background: 'linear-gradient(120deg,#050E2B 0%,#0A1B4D 100%)', padding: 'clamp(3rem,6vw,4.5rem) clamp(1.25rem,5vw,3.5rem)', position: 'relative', overflow: 'hidden' }}>
        <img src={WAVE} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--layout-content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.6rem,3vw,2.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.2, color: '#fff', margin: '0 0 0.75rem', maxWidth: '30ch' }}>Ready to reimagine your Hire-to-Retire journey?</h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: '40ch' }}>Create a more intelligent, connected and human-centred HR experience with SAP SuccessFactors.</p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={orangeBtn}>Talk to an Expert <Arrow /></Link>
              <Link href="/contact/consultation" style={outlineBtn(true)}>Book a Consultation <Arrow /></Link>
              <Link href="/services/applications" style={outlineBtn(true)}>Explore TRYVION Applications <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
