'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSiteTheme } from '@/providers/SiteThemeProvider'

/* ─────────────────────────────────────────────────────────────────
   TRYVION AI — Service Line Page
   Header (ScrollHeader) & Footer (SiteFooter) render universally in
   the layout and are NOT touched here.
   Content source: artificial-intelligence-content.docx
   UI Reference: Attached UI Design Screenshot + Animation Video
───────────────────────────────────────────────────────────────── */

const BLUE = '#1458F2'
const ORANGE = '#EB9F38'
const WAVE_BG = '/images/hero-artificial-intelligence.png'

// Images for the Agenda Section
const IMG_AGENDA_1 = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
const IMG_AGENDA_2 = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
const IMG_AGENDA_3 = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'

// Images for the Network Carousel (Intelligence Network)
const IMG_NET_1 = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
const IMG_NET_2 = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80'
const IMG_NET_3 = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80'
const IMG_NET_4 = 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80'
const IMG_NET_5 = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80'
const IMG_NET_6 = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'

// Images for "AI Across Enterprise" Cinematic Carousel
const IMG_IND_1 = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
const IMG_IND_2 = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80'
const IMG_IND_3 = 'https://images.unsplash.com/photo-1494412574643-35d324698428?auto=format&fit=crop&w=600&q=80'
const IMG_IND_4 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
const IMG_IND_5 = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80'
const IMG_IND_6 = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'

/* ── Icon Paths (Moved to strings to avoid module-level JSX serialization issues) ── */
const ICON_PATHS: Record<string, ReactNode> = {
  brain: (<><path d="M9.5 3A3.5 3.5 0 0 0 6 6.5c-2 .5-3 2-3 4 0 1.6.8 3 2 3.7-.1 2.3 1.6 4.3 4 4.3.6 0 1.2-.1 1.7-.4" /><path d="M14.5 3A3.5 3.5 0 0 1 18 6.5c2 .5 3 2 3 4 0 1.6-.8 3-2 3.7.1 2.3-1.6 4.3-4 4.3-.6 0-1.2-.1-1.7-.4" /><path d="M12 3v17" /></>),
  database: (<><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>),
  bot: (<><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 8V4M8 12h.01M16 12h.01M9 16h6" /></>),
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>),
  user: (<><circle cx="12" cy="7" r="3.5" /><path d="M5 19.5c.8-3.6 3.6-6 7-6s6.2 2.4 7 6" /></>),
  strategy: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12.5l9 5 9-5" /><path d="M3 16.5l9 5 9-5" /></>),
  zap: (<><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></>),
  automation: (<><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" /><circle cx="12" cy="12" r="3" /></>),
  headset: (<><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 14a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" /><path d="M21 16v2a4 4 0 0 1-4 4h-2" /></>),
  chat: (<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
  network: (<><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v3M12 11l-5 5M12 11l5 5" /></>),
  finance: (<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>),
  cart: (<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>),
  truck: (<><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>),
  users: (<><circle cx="9" cy="7" r="3" /><path d="M2.5 19c.6-3.2 2.9-5.5 5.5-5.5S13.4 15.8 14 19" /><circle cx="16.5" cy="8.5" r="2.5" /><path d="M15.5 13.7c2.3.3 4 2.2 4.5 5.3" /></>),
  dollar: (<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>),
  monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
  shield: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v10c0 6 8 10 8 10z" /></>),
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  eye: (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>),
  activity: (<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5L16 16" /></>),
  clipboard: (<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></>),
  lightbulb: (<><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2 1 3.9 2.5 5.5C6.5 13.5 7 15 7 16h10c0-1 .5-2.5 1.5-3.5C16 10.9 17 9 17 7a7 7 0 0 0-7-7z" /></>),
  target: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>),
  pen: (<><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>),
  rocket: (<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>),
  check: (<><path d="M20 6L9 17l-5-5" /></>),
}

function Ic({ k, size = 22, color }: { k: string; size?: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: size, height: size }}>
      {ICON_PATHS[k]}
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

/* ── Scroll Reveal Wrapper ── */
function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ ...style, opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(24px)', transition: `opacity 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0,0,1) ${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Cinematic 3D Carousel Component ── */
interface CarouselItem {
  title: string
  desc: string
  img: string
}

function CinematicCarousel({ items }: { items: CarouselItem[] }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2))
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = e.clientX - startX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      } else {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }
    }
  }

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length)

  return (
    <div 
      className="cinematic-carousel-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
      ref={containerRef}
    >
      <div className="carousel-track">
        {items.map((item, index) => {
          let offset = index - activeIndex
          if (offset > items.length / 2) offset -= items.length
          if (offset < -items.length / 2) offset += items.length

          const isActive = offset === 0
          const absOffset = Math.abs(offset)
          
          const translateX = offset * 280
          const scale = isActive ? 1 : 0.85 - (absOffset * 0.1)
          const rotateY = offset * -15
          const zIndex = 100 - absOffset
          const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.2)
          const blur = absOffset > 0 ? absOffset * 2 : 0

          return (
            <div
              key={index}
              className={`carousel-card ${isActive ? 'active' : ''}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                filter: `blur(${blur}px)`,
                pointerEvents: absOffset > 1 ? 'none' : 'auto',
              }}
              onClick={() => !isDragging && setActiveIndex(index)}
            >
              <div className="card-image-wrapper">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="card-overlay" />
              </div>
              <div className="card-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="carousel-nav prev" onClick={handlePrev} aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="carousel-nav next" onClick={handleNext} aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      
      <div className="carousel-dots">
        {items.map((_, i) => (
          <button 
            key={i} 
            className={`dot ${i === activeIndex ? 'active' : ''}`} 
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ArtificialIntelligencePage() {
  const { theme } = useSiteTheme()
  const isDark = theme === 'dark'
  
  const t = {
    bg1: isDark ? '#030D22' : '#FFFFFF',
    bg2: isDark ? '#0B1E3D' : '#F4F6F8',
    heading: isDark ? '#FFFFFF' : '#0B1E3D',
    body: isDark ? 'rgba(255,255,255,0.7)' : '#4B5563',
    muted: isDark ? 'rgba(255,255,255,0.5)' : '#6B7280',
    border: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
    cardBg: isDark ? '#0F172A' : '#FFFFFF',
    gold: ORANGE,
    ink: '#0B1E3D',
  }

  const btnPrimary: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.5rem', borderRadius: '4px', background: ORANGE, color: '#fff', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }
  const btnOutline: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', height: '48px', padding: '0 1.5rem', borderRadius: '4px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.3)' : t.border}`, color: t.heading, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }

  const [activeAgendaIndex, setActiveAgendaIndex] = useState(0)

  return (
    <>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1); }
        
        /* Agenda Accordion Styles */
        .agenda-container {
          display: flex;
          flex-direction: row;
          min-height: 600px;
          background: ${t.bg2};
        }
        .agenda-item {
          flex: 1;
          padding: 3rem 2rem;
          border-left: 1px solid ${t.border};
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .agenda-item:first-child { border-left: none; }
        
        .agenda-item.inactive {
          flex: 0.8;
          opacity: 0.6;
        }
        .agenda-item.inactive:hover {
          opacity: 0.8;
          background: ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
        }
        
        .agenda-item.active {
          flex: 2.5;
          opacity: 1;
          background: ${t.bg2};
        }
        
        .agenda-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 3px;
          background: #84cc16;
          border-radius: 0 4px 4px 0;
        }

        .agenda-content {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          pointer-events: none;
          height: 0;
          overflow: hidden;
        }
        .agenda-item.active .agenda-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          height: auto;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .agenda-container { flex-direction: column; min-height: auto; }
          .agenda-item { border-left: none; border-bottom: 1px solid ${t.border}; padding: 2rem 1.5rem; }
          .agenda-item.inactive { flex: 1; opacity: 1; }
          .agenda-item.active { flex: 1; }
          .agenda-item.active::before { display: none; }
          .agenda-content { opacity: 1; transform: none; height: auto; margin-top: 1.5rem; pointer-events: auto; }
          .agenda-item.inactive .agenda-content { display: none; }
        }

        /* ═══ CINEMATIC 3D CAROUSEL STYLES ═══ */
        .cinematic-carousel-container {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          overflow: hidden;
          cursor: grab;
        }
        .cinematic-carousel-container:active {
          cursor: grabbing;
        }
        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }
        .carousel-card {
          position: absolute;
          width: 300px;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .carousel-card:hover {
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(20, 88, 242, 0.3);
        }
        .carousel-card.active {
          z-index: 100;
        }
        .card-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .carousel-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .carousel-card:hover .card-overlay,
        .carousel-card.active .card-overlay {
          opacity: 1;
        }
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          color: white;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s ease;
        }
        .carousel-card:hover .card-content,
        .carousel-card.active .card-content {
          transform: translateY(0);
          opacity: 1;
        }
        .card-content h4 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #ffffff;
        }
        .card-content p {
          font-size: 0.875rem;
          line-height: 1.5;
          color: #ffffff;
          margin: 0;
          opacity: 0.9;
        }
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 200;
          transition: all 0.2s;
        }
        .carousel-nav:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-50%) scale(1.1);
        }
        .carousel-nav.prev { left: 20px; }
        .carousel-nav.next { right: 20px; }
        
        .carousel-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 200;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .cinematic-carousel-container { height: 400px; }
          .carousel-card { width: 260px; height: 360px; }
          .carousel-nav { display: none; }
        }
      `}</style>

      {/* ═══ HERO  */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #050E2B 0%, #0A1B4D 100%)', overflow: 'hidden', paddingTop: 'calc(80px + 4rem)', paddingBottom: '4rem' }}>
        <img src={WAVE_BG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link>
              <span>›</span>
              <span style={{ color: ORANGE }}>Artificial Intelligence</span>
            </nav>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>TRYVION AI</p>
            <h1 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem' }}>
              FROM INTELLIGENCE<br />TO <span style={{ color: BLUE }}>ACTION.</span>
            </h1>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: ORANGE, marginBottom: '1.5rem' }}>BUILD THE AI-POWERED ENTERPRISE.</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '500px' }}>
              AI creates value when intelligence moves into the processes, decisions and experiences that run the enterprise.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" style={btnPrimary}>Talk to an AI Expert <Arrow /></Link>
              <Link href="#agenda" style={{ ...btnOutline, color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Explore Your AI Journey <Arrow /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ AGENDA (NEW INTERACTIVE LAYOUT) ═══ */}
      <section id="agenda" style={{ background: t.bg2, padding: '5rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>THE TRYVION AI AGENDA</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: t.heading, marginBottom: '1rem' }}>From AI Ambition to Intelligent Enterprise Action.</h2>
          </Reveal>

          <div className="agenda-container">
            {[
              { 
                n: '01', 
                title: 'Enterprise AI Strategy', 
                desc: 'Define where AI creates value and build a prioritised roadmap to scale it across the enterprise.', 
                img: IMG_AGENDA_1,
                tags: 'Artificial Intelligence • Enterprise Strategy • Enterprise AI'
              },
              { 
                n: '02', 
                title: 'Enterprise AI Platforms', 
                desc: 'Build the right AI ecosystem across SAP and non-SAP technologies.', 
                img: IMG_AGENDA_2,
                tags: 'Enteprise AI • AI Platforms • Artificial Intelligence'
              },
              { 
                n: '03', 
                title: 'Intelligent Automation', 
                desc: 'Turn intelligence into action across business processes with AI and automation.', 
                img: IMG_AGENDA_3,
                tags: 'Artificial Intelligence • AI Automation • AI Agents'
              },
            ].map((item, index) => (
              <div 
                key={item.n} 
                className={`agenda-item ${activeAgendaIndex === index ? 'active' : 'inactive'}`}
                onMouseEnter={() => setActiveAgendaIndex(index)}
                onClick={() => setActiveAgendaIndex(index)}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: activeAgendaIndex === index ? t.heading : t.muted, marginBottom: '1rem', transition: 'color 0.3s' }}>
                  {item.n}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: activeAgendaIndex === index ? t.heading : t.muted, 
                  marginBottom: '1rem',
                  transition: 'color 0.3s'
                }}>
                  {item.title}
                </h3>
                
                <div className="agenda-content">
                  <p style={{ fontSize: '1rem', lineHeight: 1.6, color: t.body, marginBottom: '2rem', maxWidth: '600px' }}>
                    {item.desc}
                  </p>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: t.heading, letterSpacing: '0.05em' }}>
                    {item.tags}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTELLIGENCE NETWORK (STACKED CAROUSEL) ═══ */}
      <section style={{ background: 'linear-gradient(180deg, #050E2B 0%, #0A1B4D 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <Reveal>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>FROM AI TO</p>
              <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1.5rem' }}>Enterprise Action.</h2>
              <div style={{ width: '60px', height: '4px', background: BLUE, marginTop: '1rem' }} /> <br />
              <p style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>Connect the Elements that Make AI Matter.</p>
            </Reveal>
            
            <Reveal delay={200}>
              <CinematicCarousel 
                items={[
                  { title: 'ENTERPRISE DATA', desc: 'Trusted information and business context.', img: IMG_NET_1 },
                  { title: 'BUSINESS PROCESSES', desc: 'The workflows where decisions and actions occur.', img: IMG_NET_2 },
                  { title: 'AI MODELS', desc: 'The intelligence to understand, generate, predict and reason.', img: IMG_NET_3 },
                  { title: 'JOULE & AGENTS', desc: 'AI assistants and agents that help people understand, decide and act.', img: IMG_NET_4 },
                  { title: 'APPLICATIONS & AUTOMATION', desc: 'The systems and workflows that turn intelligence into execution.', img: IMG_NET_5 },
                  { title: 'HUMAN EXPERTISE', desc: 'The judgement, governance and accountability that keep AI purposeful.', img: IMG_NET_6 },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ EVOLUTION ═══ */}
      <section style={{ background: t.bg1, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <Reveal>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>THE EVOLUTION OF ENTERPRISE AI</p>
              <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: t.heading }}>FROM ASSISTANCE<br />TO INTELLIGENT<br />EXECUTION.</h2>
            </Reveal>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: '1rem', overflowX: 'auto', paddingBottom: '2rem' }}>
            <div style={{ position: 'absolute', top: '40px', left: '5%', right: '5%', height: '2px', background: t.border, zIndex: 0 }} />
            
            {[
              { n: '01', icon: 'automation', title: 'TRADITIONAL AUTOMATION', desc: 'Rules execute predefined activities.' },
              { n: '02', icon: 'headset', title: 'COPILOT', desc: 'AI assists the user.' },
              { n: '03', icon: 'chat', title: 'AI ASSISTANT', desc: 'AI understands context and supports work.' },
              { n: '04', icon: 'bot', title: 'AI AGENT', desc: 'AI reasons and performs selected actions.' },
              { n: '05', icon: 'network', title: 'AGENTIC ENTERPRISE', desc: 'Multiple agents collaborate across processes with human governance.' },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 100} style={{ flex: 1, minWidth: '200px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: t.bg1, border: `2px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', position: 'relative' }}>
                  <Ic k={item.icon} size={32} color={BLUE} />
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: t.body, lineHeight: 1.5 }}>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI ACROSS ENTERPRISE (UPDATED WITH CINEMATIC CAROUSEL) ═══ */}
      <section style={{ background: t.bg2, padding: '5rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <Reveal>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>AI ACROSS THE ENTERPRISE</p>
                <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: t.heading }}>INTELLIGENCE WHERE<br />BUSINESS HAPPENS.</h2>
              </Reveal>
              <Reveal delay={100}>
                 <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: BLUE, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', border: `1px solid ${t.border}`, padding: '0.5rem 1rem', borderRadius: '4px' }}>
                    View All Areas <Arrow size={12} color={BLUE} />
                 </Link>
              </Reveal>
           </div>

           <Reveal delay={200}>
             <CinematicCarousel 
                items={[
                  { title: 'FINANCE', desc: 'Intelligent insights, forecasting and exception management.', img: IMG_IND_1 },
                  { title: 'PROCUREMENT', desc: 'Supplier intelligence, spend analysis and process automation.', img: IMG_IND_2 },
                  { title: 'SUPPLY CHAIN', desc: 'Demand intelligence, planning and exception identification.', img: IMG_IND_3 },
                  { title: 'HIRE-TO-RETIRE', desc: 'Talent intelligence, skills insights and employee experiences.', img: IMG_IND_4 },
                  { title: 'LEAD-TO-CASH', desc: 'Sales intelligence, customer insights and revenue intelligence.', img: IMG_IND_5 },
                  { title: 'IT & OPERATIONS', desc: 'Process automation, knowledge assistance and application management.', img: IMG_IND_6 },
                ]}
             />
           </Reveal>
        </div>
      </section>

      {/* ═══ RESPONSIBLE AI ═══ */}
      <section style={{ background: 'linear-gradient(180deg, #050E2B 0%, #0A1B4D 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
         <img src={WAVE_BG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
         <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
               <Reveal>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>RESPONSIBLE AI BY DESIGN</p>
                  <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff' }}>INNOVATE WITH INTELLIGENCE.<br />BUILD WITH TRUST.</h2>
               </Reveal>
               
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                  {[
                    { icon: 'shield', title: 'GOVERNANCE', desc: 'Clear accountability and AI governance.' },
                    { icon: 'lock', title: 'SECURITY', desc: 'Enterprise security and access controls.' },
                    { icon: 'eye', title: 'PRIVACY', desc: 'Data protection and responsible data use.' },
                    { icon: 'eye', title: 'TRANSPARENCY', desc: 'Explainability and visibility into AI behaviour.' },
                    { icon: 'users', title: 'HUMAN OVERSIGHT', desc: 'People remain accountable for critical decisions.' },
                    { icon: 'activity', title: 'MONITORING', desc: 'Ongoing validation, risk management and AI performance monitoring.' },
                  ].map((item, i) => (
                    <Reveal key={i} delay={i * 100}>
                       <div style={{ textAlign: 'center' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                            <Ic k={item.icon} size={24} color="#fff" />
                          </div>
                          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{item.title}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item.desc}</p>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ═══ APPROACH ═══ */}
      <section style={{ background: t.bg1, padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>THE TRYVION AI APPROACH</p>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: t.heading }}>BUSINESS-FIRST. AI-POWERED. BUILT TO SCALE.</h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { n: '01', icon: 'search', title: 'DISCOVER', desc: 'Understand business priorities, challenges, data, technology and AI ambition.' },
              { n: '02', icon: 'clipboard', title: 'ASSESS', desc: 'Evaluate AI readiness across business, data, technology, people and governance.' },
              { n: '03', icon: 'lightbulb', title: 'ENVISION', desc: 'Identify where GenAI, Agentic AI and intelligent automation can reinvent work.' },
              { n: '04', icon: 'target', title: 'PRIORITIZE', desc: 'Build an AI Value Portfolio focused on value, feasibility and risk.' },
              { n: '05', icon: 'pen', title: 'DESIGN', desc: 'Define architecture, data foundations, governance and operating model.' },
              { n: '06', icon: 'rocket', title: 'EXECUTE & SCALE', desc: 'Build, measure, industrialise and expand successful AI capabilities.' },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 100}>
                <div className="hover-card" style={{ background: t.cardBg, padding: '2rem', borderRadius: '8px', border: `1px solid ${t.border}`, height: '100%', position: 'relative' }}>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800, color: BLUE, marginBottom: '1rem', display: 'block' }}>{item.n}</span>
                   <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{item.title}</h3>
                   <p style={{ fontSize: '0.875rem', color: t.body, lineHeight: 1.5, marginBottom: '2rem' }}>{item.desc}</p>
                   <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
                      <Arrow size={16} color={BLUE} />
                   </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ background: 'linear-gradient(135deg, #050E2B 0%, #0A1B4D 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <img src={WAVE_BG} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <Reveal style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: 'var(--family-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>READY TO TURN AI<br />INTO ENTERPRISE VALUE?</h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '500px' }}>Build an AI capability that connects strategy, technology, data, automation and people—and is designed to evolve with your organisation.</p>
          </Reveal>
          <Reveal delay={100} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={btnPrimary}>Talk to an AI Expert <Arrow /></Link>
            <Link href="/contact/consultation" style={{ ...btnOutline, color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Book a Consultation <Arrow /></Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
