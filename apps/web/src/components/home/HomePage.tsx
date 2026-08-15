'use client'
import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'
import aiWaveImg from "@/assets/images/aiWave.png";
import careersTeamImg from "@/assets/images/careersTeam.png";
import earthBeamImg from "@/assets/images/earthBeam.png";
import manufacturingImg from "@/assets/images/manufacturing.png";
import financialImg from "@/assets/images/financial.png";
import retailImg from "@/assets/images/retail.png";
import healthcareImg from "@/assets/images/healthcare.png";
import publicSectorImg from "@/assets/images/publicsector.png";
import cityNightImg from "@/assets/images/citynight.png";
import windImg from "@/assets/images/wind.png";
import meetingImg from "@/assets/images/meeting.png";
import heroIdeology from "@/assets/images/hero-ideology.png";
import heroAI from "@/assets/images/hero-ai.png";
import heroApplications from "@/assets/images/hero-applications.png";
import heroTalent from "@/assets/images/hero-talent.png";

/* -------------------------------------------------------------------------- */
/*                               SHARED COMPONENTS                            */
/* -------------------------------------------------------------------------- */

function Arrow({ size = 13 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LongArrow({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 16" fill="none" style={{ width: size * 1.6, height: size, flexShrink: 0 }}>
      <path d="M2 8h26M22 3l6 5-6 5" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size }}>
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronRight({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*                               THEME TOKENS                                 */
/* -------------------------------------------------------------------------- */

function useThemeTokens(isDark: boolean) {
  return {
    bg1: isDark ? '#030D22' : '#FFFFFF',
    bg2: isDark ? '#0B1E3D' : '#F4F6F8',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    body: isDark ? 'rgba(255,255,255,0.48)' : '#6A6E74',
    muted: isDark ? 'rgba(255,255,255,0.42)' : 'rgba(11,30,61,0.5)',
    faint: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(11,30,61,0.35)',
    dimmer: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(11,30,61,0.22)',
    divider: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(11,30,61,0.06)',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(11,30,61,0.08)',
    cardBg: isDark ? '#030D22' : '#FFFFFF',
    industryBar: isDark ? '#0B1E3D' : '#0B1E3D',
    industryLabel: isDark ? 'rgba(255,255,255,0.92)' : '#FFFFFF',
    linkArrow: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(11,30,61,0.5)',
    secBtnBorder: isDark ? 'rgba(255,255,255,0.13)' : 'rgba(11,30,61,0.15)',
    secBtnColor: isDark ? 'rgba(255,255,255,0.68)' : 'rgba(11,30,61,0.65)',
    secBtnBg: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(11,30,61,0.03)',
    gold: '#C9A24B',
    blue: '#1458F2',
    ink: '#0B1E3D',
  }
}

/* -------------------------------------------------------------------------- */
/*                              HERO SLIDER DATA                              */
/* -------------------------------------------------------------------------- */

const HERO_SLIDES = [
  { bar: 'About Tryvion', tag: 'Philosophy', title: <>The Future Is <br /> A Choice.</>, href: '/about', img: heroIdeology.src, },
  { bar: 'Tryvion AI', tag: 'AI', title: 'From Intelligence to Action.', href: '/services/ai', img: heroAI.src },
  { bar: 'Tryvion Applications', tag: 'Applications', title: 'Modernise the Enterprise Core.', href: '/services/sap', img: heroApplications.src, },
  { bar: 'Tryvion Talent', tag: 'Talent', title: 'Build the Capabilities Transformation Demands.', href: '/services/talent', img: heroTalent.src, },
]
const SLIDE_MS = 7000

/* -------------------------------------------------------------------------- */
/*                              SECTION IMAGE ASSETS                          */
/* -------------------------------------------------------------------------- */

const IMG = {
  aiWave: aiWaveImg.src,
  careersTeam: careersTeamImg.src,
  earthBeam: earthBeamImg.src,
  manufacturing: manufacturingImg.src,
  financial: financialImg.src,
  retail: retailImg.src,
  healthcare: healthcareImg.src,
  publicSector: publicSectorImg.src,
  cityNight: cityNightImg.src,
  wind: windImg.src,
  meeting: meetingImg.src,
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function HomePage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const t = useThemeTokens(isDark)
  const [heroIdx, setHeroIdx] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [heroIdx])

  const slide = HERO_SLIDES[heroIdx]

  const scrollToNext = () => {
    const el = document.getElementById('principle')
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const goldBtn: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem',
    borderRadius: 'var(--radius-sm)', background: t.gold, color: t.ink, fontSize: '0.875rem', fontWeight: 700,
    textDecoration: 'none', transition: 'filter var(--motion-duration-fast) var(--motion-easing-standard)',
  }
  /* UI-body type scale — matches the approved mock */
  const sectionTitle: CSSProperties = {
    fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,4.4vw,3.1rem)', fontWeight: 800,
    letterSpacing: '-0.025em', lineHeight: 1.12, color: t.heading, margin: '0 0 0.875rem',
  }
  const sectionSub: CSSProperties = {
    fontSize: 'clamp(0.95rem,1.6vw,1.15rem)', lineHeight: 1.6, color: t.muted, margin: 0,
  }

  return (
    <>
      {/* responsive grid system + hero keyframes */}
      <style>{`
        .eco-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
        .ind-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem}
        .per-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .evo-row{--evo-step:46px;position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:0.5rem}
        @media(max-width:1100px){.eco-grid{grid-template-columns:repeat(2,1fr)}.ind-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:900px){.ind-grid{grid-template-columns:repeat(2,1fr)}.per-grid{grid-template-columns:1fr}.evo-row{--evo-step:30px}}
        @media(max-width:640px){.eco-grid{grid-template-columns:1fr}.ind-grid{grid-template-columns:1fr}.evo-row{--evo-step:20px}}
        @keyframes heroProgress{from{width:0%}to{width:100%}}
        @keyframes heroFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @media(prefers-reduced-motion:reduce){@keyframes heroProgress{from{width:100%}to{width:100%}}}
      `}</style>

      {/* ═══ HERO SLIDER ═══ */}
      <section style={{ position: 'relative', height: 'calc(100svh - 108px)', minHeight: '640px', overflow: 'hidden', background: '#030D22' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={s.bar} aria-hidden={i !== heroIdx} style={{ position: 'absolute', inset: 0, opacity: i === heroIdx ? 1 : 0, transition: 'opacity 900ms cubic-bezier(0.2,0,0,1)', zIndex: i === heroIdx ? 1 : 0 }}>
            <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: i === heroIdx ? 'scale(1.06)' : 'scale(1)', transition: 'transform 7000ms linear' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.72) 0%, rgba(3,13,34,0.38) 55%, rgba(3,13,34,0.12) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,13,34,0.88) 0%, transparent 32%)' }} />
          </div>
        ))}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '82rem', margin: '0 auto', height: '100%', padding: '0 clamp(1.5rem,5vw,3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div key={heroIdx} style={{ animation: 'heroFade 700ms cubic-bezier(0.2,0,0,1)' }}>
            <p style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: '0 0 1.25rem' }}>{slide.tag}</p>
            <h1 style={{ fontSize: 'clamp(2.75rem,6vw,5.25rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.06, color: '#fff', maxWidth: '18ch', margin: '0 0 2.75rem' }}>{slide.title}</h1>
            <Link href={slide.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#fff', textDecoration: 'none' }}>
              Read more <LongArrow />
            </Link>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, background: 'linear-gradient(to top, rgba(3,13,34,0.92), rgba(3,13,34,0.35))' }}>
          <div style={{ maxWidth: '82rem', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,3.5rem)', display: 'flex', alignItems: 'flex-end', gap: '2.5rem' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {HERO_SLIDES.map((s, i) => (
                <button key={s.bar} type="button" onClick={() => setHeroIdx(i)} aria-label={`Show slide: ${s.bar}`} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '1.375rem 0 1.5rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.16)', display: 'block' }}>
                    {i === heroIdx && <span key={`p-${heroIdx}`} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: t.gold, animation: `heroProgress ${SLIDE_MS}ms linear forwards`, display: 'block' }} />}
                  </span>
                  <span style={{ fontSize: 'clamp(0.875rem,1.2vw,1.125rem)', fontWeight: i === heroIdx ? 700 : 500, color: i === heroIdx ? '#fff' : 'rgba(255,255,255,0.45)', transition: 'color 0.3s' }}>{s.bar}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem', paddingBottom: '1.25rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)' }}>Scroll</span>
              <button type="button" aria-label="Scroll to next section" onClick={scrollToNext}
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = t.gold; (e.currentTarget as HTMLElement).style.background = 'rgba(201,162,75,0.12)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <ChevronDown />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 01 — TRANSFORMATION BEGINS WITH A CHOICE ═══ */}
      <section id="principle" style={{ background: t.bg1, padding: 'clamp(4.5rem,7vw,7rem) clamp(1.5rem,5vw,3.5rem)', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={sectionTitle}>Transformation begins with a <span style={{ color: t.gold }}>choice</span>.</h2>
          <p style={sectionSub}>Every organisation reaches moments where the path forward matters.</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'clamp(0.75rem,3vw,2.5rem)', flexWrap: 'wrap', marginTop: '3.5rem' }}>
            {[
              { title: 'CHOICE', desc: 'Choose what comes next.', icon: <path d="M12 3v18M12 7h6.5a1.5 1.5 0 0 1 0 3H12m0-3H5.5a1.5 1.5 0 0 0 0 3H12m0 4h6.5a1.5 1.5 0 0 1 0 3H12m0-3H5.5a1.5 1.5 0 0 0 0 3H12" strokeLinecap="round" strokeLinejoin="round" /> },
              { title: 'VISION', desc: 'See possibilities beyond today.', icon: <><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" /></> },
              { title: 'MOMENTUM', desc: 'Turn decisions into sustained progress.', icon: <><path d="M4 20V10M10 20V4M16 20v-8M21 20H3" strokeLinecap="round" /><path d="M10 4l6 8" strokeLinecap="round" /></> },
              { title: 'FUTURE', desc: 'Create what comes next.', icon: <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" strokeLinejoin="round" /> },
            ].map((s, i, arr) => (
              <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem,3vw,2.5rem)' }}>
                <div style={{ width: '112px' }}>
                  <div style={{ width: '88px', height: '88px', margin: '0 auto 1rem', borderRadius: '50%', background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: 'var(--elevation-01)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.heading }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 30, height: 30 }}>{s.icon}</svg>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', color: t.heading, marginBottom: '0.375rem' }}>{s.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: t.muted, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
                {i < arr.length - 1 && <span style={{ color: t.dimmer, marginTop: '-3.5rem', flexShrink: 0 }}><ChevronRight size={14} /></span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 — MANIFESTO BAND ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4rem,6vw,6rem) clamp(1.5rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.3, color: t.heading, margin: '0 0 1.75rem' }}>
              We don&apos;t simply<br />implement solutions.
            </h3>
            <p style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.125rem,1.8vw,1.5rem)', fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.6, color: t.heading, margin: 0 }}>
              We shape decisions.<br />We create clarity.<br />
              We engineer{' '}<span style={{ color: t.gold, borderBottom: `3px solid ${t.gold}`, paddingBottom: '2px' }}>momentum</span>.
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.9375rem', color: t.muted, lineHeight: 1.8, margin: '0 0 1.75rem', maxWidth: '46ch' }}>
              TRYVION is an enterprise transformation partner, connecting technology, intelligence and people to create lasting value.
            </p>
            <Link href="/about" style={goldBtn}>About TRYVION <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ═══ 03 — ONE ECOSYSTEM (4 cards per row) ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,7vw,7rem) clamp(1.5rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={sectionTitle}>One ecosystem. Connected transformation.</h2>
            <p style={sectionSub}>An integrated portfolio to choose stronger, move faster and grow with confidence.</p>
          </div>
          <div className="eco-grid">
            {[
              { title: 'Applications', desc: 'Modernise with SAP and enterprise platforms.', href: '/services/applications', cta: 'Explore Applications', icon: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></> },
              { title: 'AI', desc: 'From automation to the agentic enterprise.', href: '/services/ai', cta: 'Explore AI', icon: <><path d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M6 6l-1.4-1.4M19.4 19.4L18 18M18 6l1.4-1.4M6 18l-1.4 1.4" strokeLinecap="round" /><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10.5 12h3" strokeLinecap="round" /></> },
              { title: 'Data', desc: 'Turn data into decisions and new opportunities.', href: '/services/data', cta: 'Explore Data', icon: <><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6.5c0 1.66 3.58 3 8 3s8-1.34 8-3V5.5" /><path d="M4 12v6.5c0 1.66 3.58 3 8 3s8-1.34 8-3V12" /></> },
              { title: 'Cloud', desc: 'Build a secure, scalable and future-ready enterprise.', href: '/services/cloud', cta: 'Explore Cloud', icon: <path d="M6.5 18a4.5 4.5 0 0 1-.36-8.99A6 6 0 0 1 17.8 10.5 4 4 0 0 1 17.5 18h-11z" strokeLinejoin="round" /> },
              { title: 'Talent', desc: 'Access and develop the skills to power transformation.', href: '/talent', cta: 'Explore Talent', icon: <><circle cx="9" cy="8" r="3.25" /><path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" strokeLinecap="round" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.7c2.3.2 4 1.7 4.5 4.3" strokeLinecap="round" /></> },
              { title: 'Academy', desc: 'Build future-ready capability for your organisation.', href: '/academy', cta: 'Explore Academy', icon: <><path d="M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9z" strokeLinejoin="round" /><path d="M6.5 11v4.5c0 1.4 2.5 2.75 5.5 2.75s5.5-1.35 5.5-2.75V11" strokeLinecap="round" /><path d="M21.5 9v5" strokeLinecap="round" /></> },
              { title: 'Operate', desc: 'Run, optimise and improve with confidence.', href: '/services/operate', cta: 'Explore Operate', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2.8l1.5 2.6h3l1.5 2.6-1.5 2.6 1.5 2.6-1.5 2.6h-3L12 21.2l-1.5-2.6h-3L6 16l1.5-2.6L6 10.8 7.5 8.2h3L12 2.8z" strokeLinejoin="round" /></> },
              { title: 'Labs', desc: 'Accelerate innovation with reusable assets and IP.', href: '/services/labs', cta: 'Explore Labs', icon: <><path d="M9.5 3h5M10.5 3v6L4.8 18.5A2 2 0 0 0 6.6 21.5h10.8a2 2 0 0 0 1.8-3L13.5 9V3" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.5 15h9" strokeLinecap="round" /></> },
            ].map((c) => (
              <div key={c.title} style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', boxShadow: 'var(--elevation-01)', transition: 'box-shadow var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--elevation-02)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong, rgba(11,30,61,0.2))' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--elevation-01)'; (e.currentTarget as HTMLElement).style.borderColor = t.border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: t.heading, display: 'flex' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 24, height: 24 }}>{c.icon}</svg></span>
                  <span style={{ color: t.dimmer }}><ChevronRight /></span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: t.heading, letterSpacing: '-0.01em', margin: 0 }}>{c.title}</h3>
                <p style={{ fontSize: '0.85rem', color: t.muted, lineHeight: 1.6, margin: '0 0 0.5rem', flex: 1 }}>{c.desc}</p>
                <Link href={c.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 700, color: t.heading, textDecoration: 'none' }}>
                  {c.cta} <Arrow size={11} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 04 — TRYVION AI (linear-growth evolution line) ═══ */}
      <section style={{ position: 'relative', background: '#030D22', overflow: 'hidden', padding: 'clamp(5rem,8vw,7.5rem) clamp(1.5rem,5vw,3.5rem)' }}>
        <img src={IMG.aiWave} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.88) 0%, rgba(3,13,34,0.55) 45%, rgba(3,13,34,0.15) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '82rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase' as const, color: t.gold, marginBottom: '1.25rem' }}>Tryvion AI</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem,3.6vw,3rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, color: '#fff', margin: '0 0 1.25rem' }}>
              From assistance to<br />intelligent <span style={{ color: t.gold }}>execution</span>.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 2rem', maxWidth: '46ch' }}>
              We help enterprises evolve from automation to the agentic enterprise, where intelligence acts, learns and delivers ongoing value.
            </p>
            <Link href="/services/ai" style={goldBtn}>Explore TRYVION AI <Arrow /></Link>
          </div>

          {/* ascending, linear growth journey */}
          <div className="evo-row" style={{ padding: '1rem 0.5rem 0' }}>
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <line x1="4" y1="84" x2="96" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            {[
              { label: 'Automation', size: 46, icon: <path d="M12 3v18M12 7h6.5a1.5 1.5 0 0 1 0 3H12m0-3H5.5a1.5 1.5 0 0 0 0 3H12" strokeLinecap="round" /> },
              { label: 'Copilot', size: 54, icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 19c.8-3.4 3.4-5.25 6.5-5.25S17.7 15.6 18.5 19" strokeLinecap="round" /></> },
              { label: 'AI Assistant', size: 62, icon: <><rect x="5" y="6" width="14" height="11" rx="2.5" /><path d="M9.5 10.5h5M9.5 13.5h3" strokeLinecap="round" /><path d="M12 3v3" strokeLinecap="round" /></> },
              { label: 'AI Agent', size: 70, icon: <><circle cx="12" cy="12" r="6.5" /><path d="M12 8.5v3.5l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" /></> },
            ].map((s, i) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem', marginBottom: `calc(var(--evo-step) * ${i})`, position: 'relative', zIndex: 1 }}>
                <span style={{ width: s.size, height: s.size, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(3,13,34,0.7)', boxShadow: '0 0 18px rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.9)', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: s.size * 0.42, height: s.size * 0.42 }}>{s.icon}</svg>
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.4 }}>{s.label}</span>
              </div>
            ))}
            {/* Agentic Enterprise — the summit */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem', marginBottom: `calc(var(--evo-step) * 4)`, position: 'relative', zIndex: 1 }}>
              <span style={{ width: 88, height: 88, borderRadius: '50%', border: '1px solid rgba(201,162,75,0.65)', background: 'rgba(3,13,34,0.75)', boxShadow: '0 0 32px rgba(201,162,75,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.gold, flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 38, height: 38 }}>
                  <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.4 }}>Agentic<br />Enterprise</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 — INDUSTRIES (full-width row + View industries link) ═══ */}
      <section style={{ background: t.bg2, padding: 'clamp(4.5rem,7vw,7rem) clamp(1.5rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={sectionTitle}>Transformation has to work in your world.</h2>
            <p style={sectionSub}>Deep industry expertise. Real business outcomes.</p>
          </div>
          <div className="ind-grid">
            {[
              { label: 'Manufacturing', img: IMG.manufacturing, href: '/industries/manufacturing' },
              { label: 'Financial Services', img: IMG.financial, href: '/industries/financial-services' },
              { label: 'Retail & Consumer', img: IMG.retail, href: '/industries/retail-consumer' },
              { label: 'Healthcare', img: IMG.healthcare, href: '/industries/healthcare' },
              { label: 'Public Sector', img: IMG.publicSector, href: '/industries/public-sector' },
            ].map((ind) => (
              <Link key={ind.label} href={ind.href} style={{ textDecoration: 'none', display: 'block', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: `1px solid ${t.border}`, boxShadow: 'var(--elevation-01)' }}>
                <div style={{ height: '130px', overflow: 'hidden' }}>
                  <img src={ind.img} alt={ind.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--motion-duration-slow) var(--motion-easing-standard)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }} />
                </div>
                <div style={{ background: t.industryBar, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: t.industryLabel, letterSpacing: '0.01em' }}>{ind.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}><ChevronRight size={11} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.25rem' }}>
            <Link href="/industries" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700, color: t.heading, textDecoration: 'none' }}>
              View industries <Arrow size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 06 — PERSPECTIVES ═══ */}
      <section style={{ background: t.bg1, padding: 'clamp(4.5rem,7vw,7rem) clamp(1.5rem,5vw,3.5rem)', borderTop: `1px solid ${t.divider}` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={sectionTitle}>Perspectives that shape tomorrow.</h2>
            <p style={sectionSub}>Ideas, research and stories for leaders who choose what&apos;s next.</p>
          </div>
          <div className="per-grid">
            {[
              { cat: 'Insight', title: 'The Enterprise in the Age of AI Agents', img: IMG.cityNight, href: '/insights/ai-agents' },
              { cat: 'Research', title: 'Cloud-Driven Transformation Outlook 2026', img: IMG.wind, href: '/insights/cloud-outlook-2026' },
              { cat: 'Case Study', title: 'Scaling Operations with Intelligent Automation', img: IMG.meeting, href: '/insights/intelligent-automation' },
            ].map((n) => (
              <Link key={n.title} href={n.href} style={{ textDecoration: 'none', display: 'block', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--elevation-01)' }}>
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={n.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.125rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: t.faint, marginBottom: '0.375rem' }}>{n.cat}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: t.heading, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{n.title}</div>
                  </div>
                  <span style={{ color: t.dimmer, flexShrink: 0 }}><Arrow size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: t.heading, textDecoration: 'none' }}>
              View all insights <Arrow size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 07 — CAREERS BAND ═══ */}
      <section style={{ background: t.ink }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))' }}>
          <div style={{ minHeight: '320px', overflow: 'hidden' }}>
            <img src={IMG.careersTeam} alt="TRYVION team facing the sunrise through a glass office" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ background: t.ink, padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,5vw,4.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 1rem' }}>Build what comes next.</h2>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: '0 0 1.75rem', maxWidth: '44ch' }}>
              Join a team of innovators, thinkers and doers shaping the future for organisations around the world.
            </p>
            <Link href="/careers" style={goldBtn}>Explore Careers <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ═══ 08 — FINAL CTA ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#030D22', padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,3.5rem)' }}>
        <img src={IMG.earthBeam} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(3,13,34,0.75) 0%, rgba(3,13,34,0.35) 50%, rgba(3,13,34,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '60rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(1.75rem,3.2vw,2.75rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', margin: '0 0 0.875rem' }}>Ready to choose what comes next?</h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', margin: '0 0 2.25rem' }}>Let&apos;s turn your vision into sustained momentum.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={goldBtn}>Talk to an Expert <Arrow /></Link>
            <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
              Book a Consultation <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
