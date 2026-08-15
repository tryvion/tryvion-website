'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   TRYVION APPLICATIONS — service line page (Services › Tryvion Applications)
   Header (ScrollHeader) & Footer (SiteFooter) render universally in layout.

   ICON SYSTEM (production-safe, content-matched):
   Icons are drawn from the open-source Material Design Icons library
   (Pictogrammers — free / open licence) served via the public jsDelivr CDN.
   Each icon is applied as a CSS mask so it inherits the exact brand colour
   (light & dark themes) and ALWAYS matches the content it labels.
   No third-party brand marks, no social logos, no mismatched glyphs.
───────────────────────────────────────────────────────────────── */

const MDI_BASE = 'https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg'

/** Renders an open-source MDI glyph, tinted with any brand colour via CSS mask. */
function Icon({ name, size = 24, color = 'currentColor' }: { name: string; size?: number; color?: string }) {
  const url = `${MDI_BASE}/${name}.svg`
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        flexShrink: 0,
        backgroundColor: color,
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
      }}
    />
  )
}

const IMG = {
  hero: '/images/hero-applications.png',
  layers: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/1e16e9d83-760c-413c-9cf0-9b4e3e75c860.png',
  service: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/125eb01b2-e05d-4320-86be-ff7354b0abaa.png',
  consumer: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/116b49da0-c506-4529-8bed-ac67f798d71b.png',
  financial: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/1d01814a7-b5bb-4dad-bb68-9031bb140d4b.png',
  publicSvc: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/16c423a3c-78db-4653-ba57-17c43c954230.png',
  discrete: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/184ef1bcf-5f5d-40d2-b521-502ac32e458a.png',
  energy: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/1d8ef1705-9b58-4198-a036-95a2a0b95798.png',
  insight1: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/1fae2de36-06be-43dc-8765-726f1938e13d.png',
  insight2: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/138f176a1-c65a-431f-a8b0-028a18e6a997.png',
  insight3: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/18859172a-8e51-4536-9e93-0ae84666fab8.png',
  careers: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/176a9b55b-693c-4c43-a42e-cdfac99f6305.png',
  earth: 'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/13da31f13-b074-4808-ab7b-2c89c75d3b09.png',
}

/* ── theme tokens ── */
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
    linkArrow: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(11,30,61,0.5)',
    secBtnBorder: isDark ? 'rgba(255,255,255,0.13)' : 'rgba(11,30,61,0.15)',
    secBtnColor: isDark ? 'rgba(255,255,255,0.68)' : 'rgba(11,30,61,0.65)',
    secBtnBg: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(11,30,61,0.03)',
    gold: '#C9A24B',
    blue: '#1458F2',
    ink: '#0B1E3D',
  }
}

/* ── scroll-reveal ── */
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

function Eyebrow({ label, color, center }: { label: string; color?: string; center?: boolean }) {
  return (
    <p style={{ fontSize: 'var(--size-eyebrow)', lineHeight: 'var(--line-height-eyebrow)', fontWeight: 600, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: color ?? 'var(--content-accent, #715300)', margin: '0 0 1rem', textAlign: center ? 'center' : undefined }}>{label}</p>
  )
}

function Arrow({ size = 13, color }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color ?? 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ApplicationsPage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  const t = useThemeTokens(isDark)

  const sectionPad: CSSProperties = { padding: 'clamp(4.5rem,8vw,7.5rem) clamp(1.25rem,5vw,3.5rem)' }
  const wrap: CSSProperties = { maxWidth: '82rem', margin: '0 auto' }
  const h2: CSSProperties = { fontFamily: 'var(--family-display)', fontSize: 'clamp(1.9rem,3.6vw,3rem)', fontWeight: 800, letterSpacing: 'var(--tracking-h2)', lineHeight: 1.12, color: t.heading, margin: '0 0 1.25rem' }
  const h2w: CSSProperties = { ...h2, color: '#fff' }
  const goldBtn: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', background: t.gold, color: t.ink, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', transition: 'filter 120ms' }
  const goldOutline: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '44px', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${t.gold}`, color: t.gold, background: 'transparent', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }
  const textLink: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: t.blue, textDecoration: 'none' }

  return (
    <>
      <style>{`.app-step-arrow{display:none} .eco-dash{display:none} @media(min-width:1024px){ .app-step-arrow{display:flex;align-items:flex-start;padding-top:0.4rem;color:rgba(255,255,255,0.35)} .eco-dash{display:block;flex:1;max-width:90px;height:0;border-top:2px dashed rgba(255,255,255,0.28);align-self:center;margin:0 0.25rem} } .lift{transition:transform .25s var(--motion-easing-standard),box-shadow .25s var(--motion-easing-standard),border-color .25s var(--motion-easing-standard)} .lift:hover{transform:translateY(-6px);box-shadow:var(--elevation-03);border-color:var(--border-strong,#9DA0A6)} .lift-dark{transition:transform .25s var(--motion-easing-standard),box-shadow .25s var(--motion-easing-standard),background .25s var(--motion-easing-standard)} .lift-dark:hover{transform:translateY(-6px);background:rgba(255,255,255,0.06);box-shadow:0 16px 40px rgba(0,0,0,0.45)} .ind-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;margin-top:3rem} @media(max-width:1280px){.ind-grid{grid-template-columns:repeat(3,1fr)}} @media(max-width:820px){.ind-grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:520px){.ind-grid{grid-template-columns:1fr}} .proof-grid{display:grid;grid-template-columns:repeat(5,1fr);width:100%} .proof-item{display:flex;align-items:center;gap:0.875rem;padding:0 1.25rem} .proof-item + .proof-item{border-left:1px solid rgba(255,255,255,0.12)} @media(max-width:1024px){.proof-grid{grid-template-columns:repeat(2,1fr);row-gap:1.75rem}.proof-item{padding:0}.proof-item + .proof-item{border-left:none}} @media(max-width:560px){.proof-grid{grid-template-columns:1fr}} @media (prefers-reduced-motion: reduce){ *{scroll-behavior:auto!important} .lift:hover,.lift-dark:hover{transform:none} }`}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', background: '#030D22', overflow: 'hidden' }}>
        <img src={IMG.hero} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right center', opacity: 0.9 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.94) 0%, rgba(3,13,34,0.82) 42%, rgba(3,13,34,0.25) 75%, rgba(3,13,34,0.1) 100%)' }} />
        <div style={{ ...wrap, position: 'relative', zIndex: 1, padding: 'calc(36px + var(--layout-header-height-desktop) + clamp(3rem,6vw,5rem)) clamp(1.25rem,5vw,3.5rem) clamp(4rem,7vw,6.5rem)' }}>
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2.25rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11 }} aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
              <Link href="/services" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Services</Link>
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11 }} aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Tryvion Applications</span>
            </nav>
            <p style={{ fontSize: 'var(--size-eyebrow)', fontWeight: 700, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: t.gold, margin: '0 0 1.25rem' }}>Tryvion Applications</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem,5.5vw,4.25rem)', fontWeight: 800, letterSpacing: 'var(--tracking-display)', lineHeight: 1.08, color: '#fff', margin: '0 0 1.75rem', maxWidth: '22ch' }}>
              Enterprise Applications. Built for What Comes Next.
            </h1>
            <p style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', fontWeight: 700, color: '#fff', margin: '0 0 1.25rem', maxWidth: '46ch' }}>
              Modernise the enterprise with intelligent applications that connect business processes, people and technology.
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', margin: '0 0 2.5rem', maxWidth: '52ch' }}>
              TRYVION helps organisations transform the systems at the heart of their business — creating a stronger digital foundation for growth, intelligence and continuous change.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={goldBtn}>Talk to an Expert <Arrow /></Link>
              <Link href="#capabilities" style={goldOutline}>Explore Our Capabilities <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ AGENDA ═══ */}
      <section style={{ ...sectionPad, background: t.bg2 }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }}>
          <Reveal>
            <Eyebrow label="The Enterprise Applications Agenda" />
            <h2 style={h2}>Modernise the Core. Connect the Enterprise. Enable What&apos;s Next.</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: '0 0 1.25rem' }}>
              Enterprise transformation is no longer about technology alone. It is about creating a connected foundation that enables organisations to operate with greater agility, make better decisions and continuously adapt to change.
            </p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: t.body, margin: 0 }}>
              TRYVION brings together SAP enterprise applications and transformation expertise to help organisations modernise their core, connect critical business capabilities and create a foundation for intelligent growth.
            </p>
          </Reveal>
          <Reveal delay={120} style={{ justifySelf: 'center' }}>
            <img src={IMG.layers} alt="Connected enterprise application layers" loading="lazy" style={{ width: 'min(100%,460px)', height: 'auto', display: 'block' }} />
          </Reveal>
        </div>
      </section>

      {/* ═══ CAPABILITIES — icons matched to each platform ═══ */}
      <section id="capabilities" style={{ ...sectionPad, background: t.bg1 }}>
        <div style={wrap}>
          <Reveal>
            <Eyebrow label="Our Applications Capabilities" />
            <h2 style={h2}>Three Foundations for a More Connected Enterprise.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(2rem,4vw,3.5rem)', marginTop: '3rem' }}>
            {[
              { n: '01', title: 'SAP S/4HANA', tag: 'Modernise the enterprise core.', desc: 'Transform the systems and processes that run your business with a modern SAP ERP foundation designed for greater standardisation, intelligence and continuous innovation.', href: '/services/sap', cta: 'Explore SAP S/4HANA', icon: 'cube-outline' },
              { n: '02', title: 'SAP SuccessFactors', tag: 'Connect people with the business.', desc: 'Create a more connected workforce experience by bringing people, processes, workforce information and enterprise strategy together.', href: '/services/sap/successfactors', cta: 'Explore SAP SuccessFactors', icon: 'account-group-outline' },
              { n: '03', title: 'SAP Business Technology Platform', tag: 'Connect. Extend. Innovate.', desc: 'Connect applications and data, extend the digital core and create new capabilities without compromising the integrity of the enterprise landscape.', href: '/services/sap/btp', cta: 'Explore SAP BTP', icon: 'cloud-outline' },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 100}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: t.faint, margin: 0 }}>{c.n} —</p>
                  <Icon name={c.icon} size={44} color={t.blue} />
                </div>
                <h3 style={{ fontFamily: 'var(--family-display)', fontSize: '1.125rem', fontWeight: 800, color: t.heading, letterSpacing: '-0.015em', margin: '0 0 0.5rem' }}>{c.title}</h3>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: t.body, margin: '0 0 0.75rem' }}>{c.tag}</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: t.muted, margin: '0 0 1.5rem' }}>{c.desc}</p>
                <Link href={c.href} style={textLink}>{c.cta} <Arrow size={12} /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ECOSYSTEM — node icons matched to each pillar ═══ */}
      <section style={{ ...sectionPad, background: t.bg1 }}>
        <div style={wrap}>
          <Reveal>
            <div style={{ background: '#030D22', borderRadius: 'var(--radius-xl)', padding: 'clamp(3rem,6vw,4.5rem) clamp(1.5rem,4vw,3.5rem)', textAlign: 'center' }}>
              <Eyebrow label="One Applications Ecosystem" color={t.gold} center />
              <h2 style={{ ...h2w, margin: '0 auto 1rem' }}>From Core Systems to Connected Enterprise.</h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', margin: '0 auto 3rem', maxWidth: '62ch' }}>
                Modern enterprise applications should not operate as isolated systems. They should work together across finance, operations, people, data and technology—creating a connected environment where the organisation can continuously evolve.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
                {[
                  { label: 'Core', desc: 'Run the enterprise.', color: t.gold, icon: 'database-outline' },
                  { label: 'People', desc: 'Enable the workforce.', color: '#8B5CF6', icon: 'account-group-outline' },
                  { label: 'Platform', desc: 'Connect and extend the enterprise.', color: '#22D3EE', icon: 'layers-outline' },
                  { label: 'Intelligence', desc: 'Create better decisions and actions.', color: '#34D399', icon: 'brain' },
                  { label: 'Continuous', desc: 'Keep moving forward.', color: t.gold, icon: 'refresh' },
                ].map((e, i, arr) => (
                  <div key={e.label} style={{ display: 'contents' }}>
                    {i > 0 && <span className="eco-dash" aria-hidden="true" />}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem', width: '130px' }}>
                      <span style={{ width: '76px', height: '76px', borderRadius: '50%', border: `1.5px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(255,255,255,0.04)' }}>
                        <Icon name={e.icon} size={34} color={e.color} />
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: e.color }}>{e.label}</span>
                      <span style={{ fontSize: '0.75rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.55)' }}>{e.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', marginTop: '3rem', marginBottom: 0 }}>
                Together, they create a connected enterprise that keeps moving forward.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOUNDATION — icons matched to each principle ═══ */}
      <section style={{ ...sectionPad, background: t.bg2 }}>
        <div style={wrap}>
          <Reveal>
            <Eyebrow label="Transformation Beyond Implementation" />
            <h2 style={h2}>Build a Foundation That Can Evolve.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '1rem', marginTop: '3rem' }}>
            {[
              { t: 'Business Alignment', d: 'Technology decisions grounded in business priorities.', icon: 'target' },
              { t: 'Process Simplification', d: 'Reducing unnecessary complexity before introducing new technology.', icon: 'tune' },
              { t: 'Standardisation', d: 'Adopting proven processes where they create greater efficiency and consistency.', icon: 'clipboard-check-outline' },
              { t: 'Connected Architecture', d: 'Creating meaningful connections across applications, data and enterprise processes.', icon: 'network-outline' },
              { t: 'Continuous Evolution', d: 'Building an environment that can adapt as business needs and technology change.', icon: 'trend-up' },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="lift" style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.75rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <Icon name={f.icon} size={40} color={t.heading} />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: t.heading, margin: 0 }}>{f.t}</h3>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: t.muted, margin: 0 }}>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ APPROACH (dark) ═══ */}
      <section style={{ ...sectionPad, background: '#0B1E3D' }}>
        <div style={wrap}>
          <Reveal>
            <Eyebrow label="The Tryvion Approach" color={t.gold} />
            <h2 style={h2w}>From Complexity to Clarity.</h2>
          </Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '3rem' }}>
            {[
              { n: '01', t: 'Understand', d: 'Understand the business, operating model and enterprise applications and transformation objectives.' },
              { n: '02', t: 'Envision', d: 'Define the future-state enterprise and the capabilities required to achieve it.' },
              { n: '03', t: 'Transform', d: 'Modernise applications and processes around the right enterprise architecture.' },
              { n: '04', t: 'Connect', d: 'Integrate applications, data, people and processes across the organisation.' },
              { n: '05', t: 'Evolve', d: 'Continuously improve the enterprise as new opportunities emerge.' },
            ].map((s, i, arr) => (
              <Reveal key={s.n} delay={i * 80} style={{ flex: '1 1 180px', minWidth: '180px' }}>
                <div className="lift-dark" style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '1.5rem 1.25rem', height: '100%', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: t.gold, margin: '0 0 0.625rem' }}>{s.n} —</p>
                      <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#fff', margin: '0 0 0.625rem' }}>{s.t}</h3>
                      <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{s.d}</p>
                    </div>
                    {i < arr.length - 1 && <span className="app-step-arrow" aria-hidden="true"><Arrow size={14} color="rgba(255,255,255,0.35)" /></span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY TRYVION — icons matched to each differentiator ═══ */}
      <section style={{ ...sectionPad, background: t.bg1 }}>
        <div style={wrap}>
          <Reveal>
            <Eyebrow label="Why Tryvion" />
            <h2 style={h2}>Application Transformation With a Business-First Mindset.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '1rem', marginTop: '3rem' }}>
            {[
              { t: 'Business + Technology', d: 'Connect technology decisions with the business outcomes they are expected to create.', icon: 'briefcase-outline' },
              { t: 'SAP Expertise', d: 'Bring specialist SAP knowledge across enterprise applications and technology.', icon: 'medal-outline' },
              { t: 'Connected Thinking', d: 'Look beyond individual systems to understand how applications work together across the enterprise.', icon: 'graph-outline' },
              { t: 'Cleaner Foundations', d: 'Reduce unnecessary complexity and create an application landscape designed for long-term adaptability.', icon: 'layers-outline' },
              { t: 'Continuous Transformation', d: 'Treat implementation as the beginning of an ongoing transformation journey.', icon: 'autorenew' },
            ].map((w, i) => (
              <Reveal key={w.t} delay={i * 80}>
                <div className="lift" style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.75rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <Icon name={w.icon} size={40} color={t.heading} />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: t.heading, margin: 0 }}>{w.t}</h3>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: t.muted, margin: 0 }}>{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section style={{ ...sectionPad, background: t.bg2 }}>
        <div style={wrap}>
          <Reveal>
            <Eyebrow label="Applications That Create Momentum" />
            <h2 style={h2}>The Enterprise Is Never Finished Evolving.</h2>
          </Reveal>
          <div className="ind-grid">
            {[
              { t: 'Service Industries', items: 'Professional Services, Media, Tech, Transportation & Logistics, Engineering, Construction & Operations, Sports & Entertainment, Commercial Real Estate, Travel & Leisure', img: IMG.service },
              { t: 'Consumer Industries', items: 'Consumer Products, Retail, Fashion, Wholesale Distribution, Life Sciences, Agribusiness', img: IMG.consumer },
              { t: 'Financial Services', items: 'Banking, Insurance', img: IMG.financial },
              { t: 'Public Services', items: 'Public Sector, Healthcare, Education & Research, Defence & Security', img: IMG.publicSvc },
              { t: 'Discrete Industries', items: 'Industrial Manufacturing, High Tech, Automotive, Aerospace & Defence', img: IMG.discrete },
              { t: 'Energy & Natural Resources', items: 'Utilities, Mill Products, Mining, Chemicals, Oil & Gas & Energy', img: IMG.energy },
            ].map((ind, i) => (
              <Reveal key={ind.t} delay={i * 60}>
                <div className="lift" style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: `1px solid ${t.border}`, background: t.ink, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '130px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={ind.img} alt="" loading="lazy" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1rem 1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--family-display)', fontSize: '0.9375rem', fontWeight: 800, color: '#fff', margin: 0 }}>{ind.t}</h3>
                      <span style={{ color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}><Arrow size={12} /></span>
                    </div>
                    <p style={{ fontSize: '0.6875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', margin: 0 }}>{ind.items}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/industries" style={textLink}>Explore Industries <Arrow size={12} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ PROOF — icons matched to each proof type ═══ */}
      <section style={{ padding: 'clamp(3rem,6vw,4.5rem) clamp(1.25rem,5vw,3.5rem)', background: '#030D22' }}>
        <div style={{ ...wrap, maxWidth: '92rem' }}>
          <Reveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.25rem' }}>
              <div>
                <Eyebrow label="Proof" color={t.gold} />
                <h2 style={{ ...h2w, fontSize: 'clamp(1.5rem,2.6vw,2.125rem)', margin: 0 }}>Experience That Creates Value.</h2>
              </div>
            </div>
            <div className="proof-grid">
              {[
                { t: 'Verified\nClient Logos', icon: 'office-building-outline' },
                { t: 'Verified\nCredentials', icon: 'certificate-outline' },
                { t: 'Verified\nCase Studies', icon: 'file-document-outline' },
                { t: 'Verified\nClient Outcomes', icon: 'chart-line' },
                { t: 'Verified\nIndustry Experience', icon: 'earth' },
              ].map((p) => (
                <div key={p.t} className="proof-item">
                  <span style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={p.icon} size={30} color={t.gold} />
                  </span>
                  <span style={{ fontSize: '0.8125rem', lineHeight: 1.4, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line' }}>{p.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PERSPECTIVE ═══ */}
      <section style={{ ...sectionPad, background: t.bg1 }}>
        <div style={wrap}>
          <Reveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <Eyebrow label="Perspective" />
                <h2 style={{ ...h2, margin: 0 }}>Thinking About What Comes Next.</h2>
              </div>
              <Link href="/insights" style={textLink}>Explore Perspectives <Arrow size={12} /></Link>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '1.25rem' }}>
            {[
              { t: 'From Systems to Intelligence: Why the Next Advantage Will Be Enterprise Context', img: IMG.insight1 },
              { t: 'Designing Modern ERP Foundations for Agility, Resilience and Growth', img: IMG.insight2 },
              { t: 'The Human Side of Transformation: Building Capability That Lasts', img: IMG.insight3 },
            ].map((n, i) => (
              <Reveal key={n.t} delay={i * 80}>
                <Link href="/insights" className="lift" style={{ display: 'flex', gap: '1rem', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 'var(--radius-md)', padding: '1.25rem', textDecoration: 'none', alignItems: 'flex-start', height: '100%' }}>
                  <img src={n.img} alt="" loading="lazy" style={{ width: '88px', height: '88px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.faint, margin: '0 0 0.5rem' }}>Published Tryvion Insight</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.45, color: t.heading, margin: '0 0 0.5rem' }}>{n.t}</p>
                    <Arrow size={12} color={t.faint} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAREERS ═══ */}
      <section style={{ background: '#0B1E3D', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', alignItems: 'stretch' }}>
          <div style={{ padding: 'clamp(3.5rem,6vw,5.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
            <Reveal>
              <Eyebrow label="Careers" color={t.gold} />
              <h2 style={{ ...h2w, margin: '0 0 1.5rem' }}>Build What<br />Comes Next.</h2>
              <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', margin: '0 0 0.875rem' }}>Transformation needs people who are willing to learn, build and evolve.</p>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', margin: '0 0 2rem', maxWidth: '46ch' }}>
                At TRYVION, you can work at the intersection of enterprise technology, AI, learning and talent while helping shape what comes next.
              </p>
              <Link href="/careers" style={goldBtn}>Life at TRYVION <Arrow /></Link>
            </Reveal>
          </div>
          <div style={{ minHeight: '280px' }}>
            <img src={IMG.careers} alt="TRYVION team collaborating" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ position: 'relative', background: '#030D22', overflow: 'hidden', padding: 'clamp(4rem,7vw,6.5rem) clamp(1.25rem,5vw,3.5rem)' }}>
        <img src={IMG.earth} alt="" aria-hidden="true" loading="lazy" style={{ position: 'absolute', right: 0, bottom: 0, width: 'min(58%,720px)', height: '100%', objectFit: 'cover', objectPosition: 'right bottom', opacity: 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(3,13,34,0.95) 0%, rgba(3,13,34,0.75) 50%, rgba(3,13,34,0.25) 100%)' }} />
        <div style={{ ...wrap, position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center' }}>
          <Reveal>
            <Eyebrow label="Ready to Choose What Comes Next?" color={t.gold} />
            <h2 style={{ ...h2w, margin: '0 0 1.25rem' }}>Turn Vision into Momentum.</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: '52ch' }}>
              Whether you are modernising your enterprise, exploring AI, building transformation capability or evolving your operations, the next step begins with a choice.
            </p>
          </Reveal>
          <Reveal delay={120} style={{ justifySelf: 'end' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={goldBtn}>Talk to an Expert <Arrow /></Link>
              <Link href="/contact/consultation" style={goldOutline}>Book a Consultation <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
