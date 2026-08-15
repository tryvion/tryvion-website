import Link from 'next/link'
import type { Metadata } from 'next'

/* ─────────────────────────────────────────────────────────────────
   Services page — body only.
   ScrollHeader + SiteFooter are rendered universally by the layout;
   this file covers Hero → "Let's turn your next decision into momentum".
   Theme-aware via design-token CSS variables (data-theme on <html>).
   NOTE: the header is FIXED (utility 36px + header 80px = 116px), so the
   hero top padding adds that offset plus breathing room so the breadcrumb
   never touches the header.

   HERO IMAGE FIX: the previous '/image/hero-services.png' local path did
   not exist in /public, so the browser 404'd and rendered nothing.
   HERO_IMG now points at the generated brand asset (chrome compass star
   over Earth at sunrise) which loads reliably.

   MOBILE (≤900px) redesign:
   • Ecosystem → horizontal scroll-snap carousel (no more tall stack).
   • Journey   → vertical timeline with left rail + connectors.
   • Final CTA → full-width stacked actions (nothing clips).
   ANIMATIONS:
   • CSS-only, transform/opacity only (GPU-composited, no JS, no reflow).
   • Scroll-linked reveals via animation-timeline: view() — wrapped in
     @supports so unsupported browsers render everything statically.
   • Honors prefers-reduced-motion everywhere.
───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Services — TRYVION',
  description:
    'TRYVION Applications, AI, Talent, Academy, Operate and Labs — connected capabilities built for continuous transformation.',
  alternates: { canonical: 'https://thetryvion.com/services' },
}

/* ✅ Working hero asset (generated brand visual — compass star over Earth) */
const HERO_IMG = 'images/hero-services.png'
const WAVE_IMG =
  'https://image.qwenlm.ai/public_source/dd8f5ab0-54d9-4499-96dc-b6afb2fb48db/14f3b2ff9-f89e-4d7b-86a1-9f7c0e586a6d.png'

/* ── palette (brand anchors) ── */
const BLUE = '#1458F2'
const GOLD = '#C9A24B'
const PURPLE = '#8B5CF6'
const TEAL = '#469DA0'
const INDIGO = '#6D9DFF'

/* ── icons ── */
function Icon({ name, color }: { name: string; color: string }) {
  const common = { fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} aria-hidden="true" {...common}>
      {name === 'cube' && (
        <>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
          <path d="M8 5.25l8 4.5" />
        </>
      )}
      {name === 'sparkle' && (
        <>
          <path d="M12 4l1.8 4.7L18.5 10.5l-4.7 1.8L12 17l-1.8-4.7L5.5 10.5l4.7-1.8L12 4z" />
          <path d="M19 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z" />
          <path d="M5 3.5l.7 1.8 1.8.7-1.8.7L5 8.5l.7-1.8-1.8-.7 1.8-.7L5 3.5z" />
        </>
      )}
      {name === 'users' && (
        <>
          <circle cx="9" cy="8" r="3.25" />
          <path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 14.7c2.3.2 4 1.7 4.5 4.3" />
        </>
      )}
      {name === 'cap' && (
        <>
          <path d="M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9z" />
          <path d="M6.5 11v4.5c0 1.4 2.5 2.75 5.5 2.75s5.5-1.35 5.5-2.75V11" />
          <path d="M21.5 9v5" />
        </>
      )}
      {name === 'operate' && (
        <>
          <path d="M12 3a9 9 0 1 1-8.5 6" />
          <path d="M3 3v6h6" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
      {name === 'rocket' && (
        <>
          <path d="M14 4c3.5 0 6 2.5 6 6-2.5 1-4.5 2.5-6.5 4.5L9 10c2-2 3.5-4 5-6z" />
          <path d="M9 10l-4 1 3-4M14 15l-1 4 4-3" />
          <circle cx="14.5" cy="9.5" r="1.5" />
        </>
      )}
      {name === 'cert' && (
        <>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M10.5 11l-1 4 2.5-1.5L14.5 15l-1-4" />
        </>
      )}
    </svg>
  )
}

function ArrowRight({ color = GOLD, size = 14 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── data ─ */
const SERVICES = [
  { icon: 'cube', color: BLUE, eyebrow: 'TRYVION APPLICATIONS', title: 'Modernise the enterprise.', body: 'Transform the systems at the heart of your business with intelligent enterprise applications.', href: '/services/applications' },
  { icon: 'sparkle', color: BLUE, eyebrow: 'TRYVION AI', title: 'Turn intelligence into action.', body: 'Move from AI experimentation to enterprise value with strategy, platforms and intelligent automation.', href: '/services/ai' },
  { icon: 'users', color: GOLD, eyebrow: 'TRYVION TALENT', title: 'Build the capabilities transformation demands.', body: 'Connect with specialist talent and leaders to build the teams that drive transformation.', href: '/services/talent' },
  { icon: 'cap', color: PURPLE, eyebrow: 'TRYVION ACADEMY', title: 'Build transformation-ready capability.', body: 'Develop the skills, confidence and expertise to thrive in an evolving digital world.', href: '/services/academy' },
  { icon: 'operate', color: TEAL, eyebrow: 'TRYVION OPERATE', title: 'Run today. Improve tomorrow.', body: 'Stabilise, automate, optimise and continuously improve your SAP environments.', href: '/services/operate' },
  { icon: 'rocket', color: BLUE, eyebrow: 'TRYVION LABS', title: 'Innovate. Accelerate. Create impact.', body: 'Leverage accelerators and reusable assets to drive innovation at speed and scale.', href: '/services/labs' },
  { icon: 'cert', color: GOLD, eyebrow: 'TRYVION ACADEMY', title: 'Learn. Validate. Grow.', body: 'Access structured training, certification and enablement built for real-world impact.', href: '/services/academy' },
]

const ECOSYSTEM = [
  { icon: 'cube', color: BLUE, label: 'Applications', desc: 'Modernise the enterprise.' },
  { icon: 'sparkle', color: INDIGO, label: 'AI', desc: 'Make intelligence actionable.' },
  { icon: 'users', color: GOLD, label: 'Talent', desc: 'Build the capabilities transformation demands.' },
  { icon: 'cap', color: PURPLE, label: 'Academy', desc: 'Develop transformation-ready skills.' },
  { icon: 'operate', color: TEAL, label: 'Operate', desc: 'Continuously improve what you have built.' },
]

const JOURNEY = [
  { n: '01', color: BLUE, label: 'MODERNISE', desc: 'Transform the enterprise foundation.' },
  { n: '02', color: BLUE, label: 'INTELLIGENT', desc: 'Apply AI and automation where they create meaningful value.' },
  { n: '03', color: GOLD, label: 'ENABLE', desc: 'Build the people and skills required to sustain transformation.' },
  { n: '04', color: PURPLE, label: 'OPERATE', desc: 'Run, optimise and continuously improve the enterprise.' },
  { n: '05', color: TEAL, label: 'EVOLVE', desc: 'Turn transformation into lasting momentum.' },
]

export default function ServicesPage() {
  return (
    <>
      <style>{`
        .svcs-hero{position:relative;background:var(--ink-1000);overflow:hidden}
        .svcs-hero-img{position:absolute;top:0;right:0;width:min(54%,760px);height:100%;object-fit:cover;opacity:.95;
          -webkit-mask-image:linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%);
          mask-image:linear-gradient(to left,rgba(0,0,0,1) 55%,rgba(0,0,0,0) 100%);}
        .svcs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem}
        .svc-card{background:var(--surface-default);border:1px solid var(--border-subtle);border-radius:var(--radius-md);
          padding:2rem;display:flex;flex-direction:column;gap:.875rem;
          transition:transform var(--motion-duration-fast) var(--motion-easing-standard),
            box-shadow var(--motion-duration-fast) var(--motion-easing-standard),
            border-color var(--motion-duration-fast) var(--motion-easing-standard);}
        .svc-card:hover{transform:translateY(-4px);box-shadow:var(--elevation-02);border-color:var(--border-strong)}
        .eco-dash{flex:1;border-top:2px dashed rgba(255,255,255,.22);margin-top:44px;min-width:1.5rem}
        .eco-item{width:150px;display:flex;flex-direction:column;align-items:center;gap:.875rem;flex-shrink:0}
        .journey-line{position:absolute;top:27px;left:8%;right:8%;height:2px;
          background:linear-gradient(90deg,${BLUE} 0%,${BLUE} 32%,${GOLD} 50%,${PURPLE} 70%,${TEAL} 100%);}
        .j-item{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:.875rem}
        .j-body{display:flex;flex-direction:column;align-items:center;gap:.875rem}
        .j-circle{flex-shrink:0}
        .cta-wave{position:absolute;right:0;bottom:0;width:min(58%,720px);height:100%;object-fit:cover;opacity:.85;pointer-events:none;
          -webkit-mask-image:linear-gradient(to left,rgba(0,0,0,1) 45%,rgba(0,0,0,0) 100%);
          mask-image:linear-gradient(to left,rgba(0,0,0,1) 45%,rgba(0,0,0,0) 100%);}
        .cta-actions{display:flex;flex-direction:column;gap:1rem;align-items:stretch;justify-self:end;width:100%;max-width:320px}
        .cta-actions a{width:100%}

        /* ── entrance (load) animation — hero only, runs once ── */
        @keyframes heroIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .hero-in-1{animation:heroIn .7s var(--motion-easing-decelerate) both}
        .hero-in-2{animation:heroIn .7s .12s var(--motion-easing-decelerate) both}
        .hero-in-3{animation:heroIn .7s .24s var(--motion-easing-decelerate) both}

        /* ── scroll-linked reveals — CSS-only, composited, degrades safely ── */
        @supports (animation-timeline: view()) {
          @media (prefers-reduced-motion: no-preference) {
            @keyframes riseIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
            .rv{animation:riseIn both;animation-timeline:view();animation-range:entry 0% entry 38%}
            .rv-late{animation:riseIn both;animation-timeline:view();animation-range:entry 8% entry 46%}
          }
        }
        @media (prefers-reduced-motion: reduce){
          .hero-in-1,.hero-in-2,.hero-in-3{animation:none}
        }

        @media(max-width:1100px){.svcs-grid{grid-template-columns:repeat(2,1fr)}}

        /* ── tablet & mobile ── */
        @media(max-width:900px){
          .svcs-hero-img{display:none}

          /* Ecosystem → horizontal scroll-snap carousel */
          .eco-row{justify-content:flex-start !important;overflow-x:auto;scroll-snap-type:x proximity;
            gap:1.25rem;padding:0 .25rem 1rem;-webkit-overflow-scrolling:touch;scrollbar-width:none}
          .eco-row::-webkit-scrollbar{display:none}
          .eco-item{min-width:160px;scroll-snap-align:center}
          .eco-dash{display:none}

          /* Journey → vertical timeline with left rail */
          .journey-grid{display:flex !important;flex-direction:column;gap:1.75rem}
          .journey-line{display:none}
          .j-item{flex-direction:row;align-items:flex-start;text-align:left;gap:1rem}
          .j-body{align-items:flex-start;gap:.625rem}
          .j-item::before{content:'';position:absolute;left:27px;top:62px;bottom:-30px;width:2px;background:var(--border-default)}
          .j-item:last-child::before{display:none}

          /* CTA → stacked, full-width, nothing clips */
          .cta-grid{grid-template-columns:1fr !important;gap:2rem;align-items:start !important}
          .cta-actions{justify-self:stretch;max-width:none}
          .cta-wave{width:100%;opacity:.45}
        }
        @media(max-width:640px){
          .svcs-grid{grid-template-columns:1fr}
          .svc-card{padding:1.5rem}
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="svcs-hero">
        <img className="svcs-hero-img" src={HERO_IMG} alt="" aria-hidden="true" />
        {/* top padding = fixed header (utility 36px + header 80px) + breathing room,
            so the breadcrumb sits clear of the header */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding:
              'calc(var(--layout-header-height-desktop) + 36px + clamp(2.5rem,6vw,4.5rem)) clamp(1.5rem,5vw,3rem) clamp(4.5rem,8vw,6.5rem)',
          }}
        >
          <nav className="hero-in-1" aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem' }}>
            <Link href="/" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Home</Link>
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12 }} aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)' }}>Services</span>
          </nav>
          <h1 className="hero-in-2" style={{ fontFamily: 'var(--family-display)', fontWeight: 800, fontSize: 'clamp(2.75rem,6vw,4.5rem)', letterSpacing: 'var(--tracking-display)', lineHeight: 1.05, color: '#fff', margin: '0 0 1.5rem' }}>
            Services
          </h1>
          <p className="hero-in-3" style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)', fontWeight: 700, color: '#fff', margin: '0 0 1.25rem' }}>
            Capabilities built for what comes next.
          </p>
          <p className="hero-in-3" style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '52ch', margin: 0 }}>
            TRYVION brings together enterprise applications, artificial intelligence, specialist talent, learning and intelligent operations to help organisations transform with clarity, execute with confidence and continuously evolve.
          </p>
        </div>
      </section>

      {/* ═══ SERVICE CARDS ═══ */}
      <section style={{ background: 'var(--surface-canvas)', padding: 'clamp(4rem,7vw,6.5rem) clamp(1.5rem,5vw,3rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto' }}>
          <div className="svcs-grid">
            {SERVICES.map((s) => (
              <div key={s.eyebrow + s.title} className="svc-card rv">
                <span style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}14`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Icon name={s.icon} color={s.color} />
                </span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', color: s.color }}>{s.eyebrow}</span>
                <h2 style={{ fontFamily: 'var(--family-display)', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--content-primary)', margin: 0 }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--content-secondary)', margin: '0 0 0.5rem', flex: 1 }}>
                  {s.body}
                </p>
                <Link href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--content-primary)', textDecoration: 'none' }}>
                  Explore <ArrowRight />
                </Link>
              </div>
            ))}
          </div>

          {/* ═══ ECOSYSTEM PANEL ═══ */}
          <div className="rv" style={{ marginTop: '3rem', background: 'var(--ink-950)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2.5rem,6vw,4.5rem) clamp(1.25rem,4vw,3.5rem)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--family-display)', fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.25rem)', letterSpacing: '-0.02em', color: '#fff', margin: '0 0 1rem' }}>
              One ecosystem. Connected transformation.
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '64ch', margin: '0 auto 3rem' }}>
              Technology creates possibility. People create progress. Intelligence creates momentum. TRYVION connects transformation across the enterprise.
            </p>
            <div className="eco-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              {ECOSYSTEM.map((e, i) => (
                <div key={e.label} style={{ display: 'contents' }}>
                  {i > 0 && <div className="eco-dash" aria-hidden="true" />}
                  <div className="eco-item">
                    <span style={{ width: 72, height: 72, borderRadius: '50%', border: `1.5px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
                      <Icon name={e.icon} color={e.color} />
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: e.color }}>{e.label}</span>
                    <span style={{ fontSize: '0.75rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.55)' }}>{e.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', marginTop: '3rem', marginBottom: 0 }}>
              Together, they create a transformation ecosystem designed to keep moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THE TRYVION JOURNEY ═══ */}
      <section style={{ background: 'var(--surface-canvas)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem) clamp(4rem,7vw,6rem)' }}>
        <div style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(2.5rem,5vw,4.5rem)', alignItems: 'center' }}>
          <div className="rv">
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', color: GOLD, margin: '0 0 1rem' }}>FROM TRANSFORMATION TO MOMENTUM</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontWeight: 800, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--content-primary)', margin: '0 0 1.25rem' }}>
              The TRYVION<br />journey
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--content-secondary)', margin: '0 0 1.5rem', maxWidth: '38ch' }}>
              A connected approach that turns transformation into lasting momentum.
            </p>
            <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem', fontWeight: 700, color: BLUE, textDecoration: 'none' }}>
              Learn our approach <ArrowRight color={BLUE} />
            </Link>
          </div>
          <div className="journey-grid rv-late" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1rem' }}>
            <div className="journey-line" aria-hidden="true" />
            {JOURNEY.map((j) => (
              <div key={j.n} className="j-item">
                <span className="j-circle" style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px solid ${j.color}`, background: 'var(--surface-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: j.color }}>
                  {j.n}
                </span>
                <div className="j-body">
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: j.color }}>{j.label}</span>
                  <span style={{ fontSize: '0.75rem', lineHeight: 1.55, color: 'var(--content-secondary)' }}>{j.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — wave texture ═══ */}
      <section style={{ background: 'var(--surface-canvas)', padding: '0 clamp(1.5rem,5vw,3rem) clamp(4rem,7vw,6rem)' }}>
        <div className="rv" style={{ maxWidth: 'var(--layout-content-wide)', margin: '0 auto', position: 'relative', overflow: 'hidden', background: 'var(--ink-950)', borderRadius: 'var(--radius-xl)', padding: 'clamp(2.5rem,6vw,4.5rem) clamp(1.25rem,4vw,3.5rem)' }}>
          <img className="cta-wave" src={WAVE_IMG} alt="" aria-hidden="true" />
          <div className="cta-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', color: GOLD, margin: '0 0 1rem' }}>READY TO MOVE FORWARD?</p>
              <h2 style={{ fontFamily: 'var(--family-display)', fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2, color: '#fff', margin: '0 0 1.25rem' }}>
                Let&apos;s turn your next<br />decision into momentum.
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: '52ch', margin: 0 }}>
                Whether you are modernising your enterprise, exploring AI, building capabilities or evolving your operations, TRYVION can help you determine what comes next.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', height: 48, padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', background: GOLD, color: 'var(--ink-950)', fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none' }}>
                Talk to an Expert <ArrowRight color="var(--ink-950)" />
              </Link>
              <Link href="/contact/consultation" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', height: 48, padding: '0 1.75rem', borderRadius: 'var(--radius-sm)', border: `1px solid ${GOLD}`, background: 'transparent', color: GOLD, fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none' }}>
                Book a Consultation <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
