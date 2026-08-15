'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Target,
  Database,
  Cpu,
  Users,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Layers,
  Briefcase,
  Lock,
  Eye,
  Clock,
  Search,
  PenTool,
  Rocket,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA ──
const AGENDA_PILLARS = [
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business Alignment',
    desc: 'Mapping AI initiatives directly to core strategic objectives and P&L drivers.',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Readiness',
    desc: 'Structuring enterprise data assets for secure, scalable model consumption.',
  },
  {
    id: 'tech',
    icon: Cpu,
    title: 'Technology Architecture',
    desc: 'Building composable infrastructure to deploy and monitor LLMs securely.',
  },
  {
    id: 'people',
    icon: Users,
    title: 'People & Change',
    desc: 'Upskilling workforce and managing organizational transformation.',
  },
  {
    id: 'gov',
    icon: ShieldCheck,
    title: 'Governance & Risk',
    desc: 'Establishing guardrails for ethics, compliance, and IP protection.',
  },
  {
    id: 'value',
    icon: TrendingUp,
    title: 'Value Realization',
    desc: 'Continuous measurement of ROI, adoption rates, and operational efficiency.',
  },
];

const FRAMEWORK_STAGES = [
  {
    id: '01',
    title: 'Discovery & Audit',
    icon: Search,
    focus:
      'We assess your current operational baseline, data readiness, and technical infrastructure. Identifying friction points where AI can deliver immediate impact without compromising security.',
    outcomes: [
      'Enterprise Data Estate Evaluation',
      'Existing AI/ML Infrastructure Audit',
      'Security and Compliance Posture Review',
    ],
  },
  {
    id: '02',
    title: 'Value Mapping',
    icon: Target,
    focus:
      'We identify high-impact use cases that align with business strategy. We prioritize initiatives based on feasibility, value, and risk.',
    outcomes: [
      'Use Case Identification Workshop',
      'Feasibility & Value Scoring',
      'Roadmap Prioritization',
    ],
  },
  {
    id: '03',
    title: 'Architecture Design',
    icon: PenTool,
    focus:
      'We design the target state architecture, integration patterns, and governance models required to support scalable AI operations.',
    outcomes: [
      'Target Architecture Blueprint',
      'Data Pipeline Design',
      'Governance Framework Definition',
    ],
  },
  {
    id: '04',
    title: 'Pilot & Prove',
    icon: Rocket,
    focus:
      'We move through Explore → Prototype → Industrialize → Deploy using reusable AI services and agent lifecycle management.',
    outcomes: ['MVP Development', 'Pilot Deployment', 'Impact Measurement & Refinement'],
  },
  {
    id: '05',
    title: 'Enterprise Scale',
    icon: Layers,
    focus:
      'We industrialize the solution, establishing MLOps practices and scaling the solution across the enterprise with full governance.',
    outcomes: ['MLOps Implementation', 'Enterprise Rollout', 'Continuous Optimization'],
  },
];

const WHY_TRYVION = [
  {
    title: 'Business-First',
    desc: 'We start with the outcome that needs to change—not an AI tool looking for a problem.',
  },
  {
    title: 'Strategy to Execution',
    desc: 'We bridge high-level strategy with execution-ready architecture and delivery.',
  },
  {
    title: 'GenAI + Agentic AI',
    desc: 'Progress from basic copilots to autonomous agents capable of reasoning and executing complex workflows.',
  },
  {
    title: 'SAP + Enterprise AI',
    desc: 'Deep expertise connecting SAP, BTP, and enterprise data with cutting-edge AI models.',
  },
  {
    title: 'Technology Agnostic',
    desc: 'Unbiased selection of the optimal technology, model, and platform mix for your specific needs.',
  },
  {
    title: 'Built for Scale & Control',
    desc: 'Embed FinOps for cloud cost control and reusable patterns that eliminate siloed work.',
  },
];

const RESPONSIBLE_AI = [
  {
    icon: Lock,
    title: 'Enterprise Security & IP',
    desc: 'Safeguard proprietary IP with enterprise-grade access controls and data protection.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance & Governance',
    desc: 'Align with evolving regulatory standards while maintaining clear ownership structures.',
  },
  {
    icon: Eye,
    title: 'Human Oversight & Fairness',
    desc: 'Ensure active human-in-the-loop approvals, continuous monitoring, and bias mitigation.',
  },
];

const METRICS = [
  {
    category: 'Productivity & Speed',
    metrics: 'Task Completion Time, Automation Rate',
    impact: '+40% Efficiency',
    icon: Clock,
  },
  {
    category: 'Financial Outcomes',
    metrics: 'Cost per Transaction, Revenue Lift',
    impact: '-25% OpEx',
    icon: TrendingUp,
  },
  {
    category: 'Quality & Risk',
    metrics: 'Error Rate Reduction, Compliance Score',
    impact: '99.9% Accuracy',
    icon: ShieldCheck,
  },
];

// ── HERO SLIDER DATA ──
const HERO_SLIDES = [
  {
    headline: (
      <>
        From AI Strategy
        <br />
        To Enterprise Impact.
      </>
    ),
    subtitle: (
      <>
        Build an <span style={{ color: 'var(--brand-accent)' }}>AI-Ready</span> Enterprise.
      </>
    ),
    description:
      'TRYVION moves organizations beyond AI experiments to practical, business-led capabilities across strategy, automation, and value realization.',
  },
];

// ── COMPONENTS ──
const Reveal = ({ children, delay = 0, className = '' }: any) => (
  <motion.div
    initial={{ opacity: 1, y: 30 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function EnterpriseAIStrategyPage() {
  const { theme } = useSiteTheme();
  const [activeStage, setActiveStage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-canvas)',
        color: 'var(--content-primary)',
        fontFamily: 'var(--family-text), system-ui, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* CSS RESPONSIVE RULES */}
      <style>{`
        * { box-sizing: border-box; }
        body { overflow-x: hidden; width: 100%; margin: 0; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: left;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .agenda-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .framework-container {
          display: flex;
          flex-direction: row;
          gap: 2rem;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .responsible-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .metrics-table-wrapper {
          overflow-x: auto;
          border-radius: 8px;
          box-shadow: var(--elevation-01);
          border: 1px solid var(--border-default);
        }

        /* ── VALUE PORTFOLIO: DESKTOP & TABLET BASE LAYOUT (GLOBAL 2x2 GRID) ── */
        .value-portfolio-wrapper {
          position: relative;
          max-width: 896px;
          margin: 3rem auto 0;
          aspect-ratio: 16/9;
          border-left: 1px solid var(--border-default);
          border-bottom: 1px solid var(--border-default);
          padding: 1rem;
        }
        .value-portfolio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          height: 100%;
          gap: 1rem;
        }
        .value-portfolio-labels-y {
          position: absolute;
          left: -6rem; /* Outside the border line */
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--content-tertiary);
          white-space: nowrap;
          z-index: 10;
        }
        .value-portfolio-labels-x {
          position: absolute;
          bottom: -2.5rem; /* Outside the border line */
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--content-tertiary);
          white-space: nowrap;
          z-index: 10;
        }

        /* Tablet & Small Laptop */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: left; padding: 0 1rem; margin-top: 50px; }
          .hero-content { width: 100% !important; }
          .hero-right { display: none; }
          .agenda-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile Devices */
        @media (max-width: 768px) {
          .agenda-grid { grid-template-columns: 1fr; }
          
          /* Framework Sections - Equal Width Horizontal Scroll */
          .framework-container { flex-direction: column !important; }
          .framework-left {
            flex: 1 1 auto !important;
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
            gap: 0.25rem !important;
            padding-bottom: 0.5rem !important;
          }
          .framework-left > button {
            flex: 1 1 0% !important; 
            min-width: 0 !important; 
            width: auto !important;
            border-left: none !important;
            border-bottom: 3px solid transparent !important;
            border-radius: 0 !important;
            padding: 0.5rem 0.25rem !important;
            text-align: center !important;
            margin-bottom: 0 !important;
            box-shadow: none !important;
            background-color: transparent !important;
          }
          .framework-left > button div {
            font-size: 0.7rem !important;
            white-space: normal !important;
            text-align: center !important;
          }
          .framework-left > button span {
            font-size: 0.6rem !important;
            display: block !important;
          }
          .framework-left > button.active-tab {
            border-bottom-color: var(--brand-secondary) !important;
            background-color: transparent !important;
          }
          .framework-right { 
            flex: 1 1 100% !important; 
            padding: 1.5rem !important; 
            margin-top: 0.5rem;
          }

          /* ── VALUE PORTFOLIO: MOBILE 2x2 GRID (Forcefully Maintained) ── */
          .value-portfolio-wrapper {
            aspect-ratio: 16/12 !important; /* Gives slight more height for text to fit */
            margin: 2rem auto 6rem auto !important;
            padding: 0.5rem !important;
            width: 100% !important;
            max-width: 100% !important;
            border-left: 1px solid var(--border-default) !important;
            border-bottom: 1px solid var(--border-default) !important;
            position: relative !important;
          }
          .value-portfolio-grid {
            grid-template-columns: 1fr 1fr !important; 
            grid-template-rows: 1fr 1fr !important;
            gap: 0.25rem !important;
            height: 100% !important;
          }
          .value-portfolio-grid > div {
            padding: 0.5rem 0.3rem !important;
            border-radius: 4px !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          /* Dynamic Font Scaling to prevent collisions */
          .value-portfolio-grid > div span {
            font-size: clamp(0.4rem, 1.5vw, 0.55rem) !important;
            letter-spacing: 0.05em !important;
            display: block !important;
            margin-bottom: 0.1rem !important;
            line-height: 1 !important;
          }
          .value-portfolio-grid > div h4 {
            font-size: clamp(0.7rem, 2.5vw, 0.9rem) !important;
            margin: 0.1rem 0 !important;
            word-break: break-word !important;
            line-height: 1.1 !important;
          }
          .value-portfolio-grid > div p {
            font-size: clamp(0.5rem, 1.8vw, 0.65rem) !important;
            line-height: 1.1 !important;
            margin-top: 0 !important;
            word-break: break-word !important;
          }
          
          /* Move Axis Labels outside the line to avoid overlapping texts */
          .value-portfolio-labels-y {
            left: -2rem !important; 
            top: 50% !important;
            font-size: 0.5rem !important;
            letter-spacing: 0.05em !important;
            white-space: nowrap !important;
            z-index: 20 !important;
          }
          .value-portfolio-labels-x {
            bottom: -1.5rem !important; 
            left: 50% !important;
            font-size: 0.5rem !important;
            letter-spacing: 0.05em !important;
            white-space: nowrap !important;
            z-index: 20 !important;
          }

          .responsible-grid { grid-template-columns: 1fr; }
          .metrics-table-wrapper { overflow-x: auto; }
          .metrics-table td, .metrics-table th { padding: 1rem !important; white-space: nowrap; }
          .hero-right { display: none; }
        }

        /* Small Phones */
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main style={{ paddingTop: 0 }}>
        {/* ── HERO WITH SLIDER ── */}
        <section
          style={{
            backgroundColor: 'var(--ink-950)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <Image
              src="/images/hero-enterprise-ai-strategy.png"
              alt="Enterprise AI strategy background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1,
              background:
                'linear-gradient(to right, var(--ink-950) 0%, var(--ink-950) 60%, transparent 100%)',
            }}
          />

          <div className="hero-grid" style={{ position: 'relative', zIndex: 10 }}>
            {/* Left content – Slider */}
            <div className="hero-content" style={{ width: '95%', position: 'relative' }}>
              <Reveal>
                <nav
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    flexWrap: 'wrap',
                  }}
                >
                  <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Services
                  </Link>
                  <ChevronRight size={12} />
                  <Link
                    href="/services/artificial-intelligence"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Artificial Intelligence
                  </Link>
                  <ChevronRight size={12} />
                  <span style={{ color: 'white' }}>Enterprise AI Strategy</span>
                </nav>
              </Reveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--momentum-300)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    TRYVION AI
                  </span>

                  <h1
                    style={{
                      fontFamily: 'var(--family-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(2.75rem, 8vw, 4.5rem)',
                      lineHeight: 1.1,
                      color: 'var(--neutral-0)',
                      letterSpacing: 'var(--tracking-display)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {HERO_SLIDES[activeSlide].headline}
                  </h1>
                  <h2
                    style={{
                      fontFamily: 'var(--family-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      color: 'var(--neutral-0)',
                      marginBottom: '1rem',
                    }}
                  >
                    {HERO_SLIDES[activeSlide].subtitle}
                  </h2>
                  <p
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: 1.7,
                      color: 'var(--neutral-100)',
                      maxWidth: '45ch',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {HERO_SLIDES[activeSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dot navigation */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background:
                        idx === activeSlide ? 'var(--brand-accent)' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* CTAs remain static, outside the slider */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                <Link
                  href="/contact"
                  style={{
                    backgroundColor: 'var(--brand-accent)',
                    color: 'var(--ink-950)',
                    padding: '0.75rem 2rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Talk to an AI Expert <ArrowRight size={18} />
                </Link>
                <Link
                  href="#framework"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'var(--neutral-0)',
                    padding: '0.75rem 2rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Explore Your AI Journey <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right visual – CPU animation */}
            <div className="hero-right">
              <Reveal
                delay={600}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '600px',
                }}
              >
                <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '1px solid rgba(20,88,242,0.2)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: '2rem',
                      borderRadius: '50%',
                      border: '1px solid rgba(20,88,242,0.15)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      style={{
                        width: '128px',
                        height: '128px',
                        borderRadius: '16px',
                        background:
                          'linear-gradient(135deg, rgba(20,88,242,0.25), rgba(20,88,242,0.1))',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--elevation-05)',
                      }}
                    >
                      <Cpu size={48} style={{ color: 'var(--momentum-300)' }} />
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── AGENDA ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-default)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '672px', margin: '0 auto 3rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--content-accent)',
                    marginBottom: '1rem',
                  }}
                >
                  The Core Foundation
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--content-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  The Enterprise AI Agenda
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--content-secondary)' }}>
                  A holistic strategy requires addressing six foundational pillars simultaneously to
                  ensure scalable, sustainable AI adoption.
                </p>
              </div>
            </Reveal>

            <div className="agenda-grid">
              {AGENDA_PILLARS.map((pillar, idx) => (
                <Reveal key={pillar.id} delay={idx * 80}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: 'var(--elevation-03)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      padding: '2.5rem',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: 'var(--surface-default)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                      }}
                    >
                      <pillar.icon size={32} style={{ color: 'var(--content-primary)' }} />
                    </motion.div>
                    <h3
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'var(--content-primary)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--content-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FRAMEWORK ── */}
        <section
          id="framework"
          style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-subtle)' }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: '3rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--content-accent)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Methodology
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--content-primary)',
                  }}
                >
                  The TRYVION AI Strategy Framework
                </h2>
              </div>
            </Reveal>

            <div className="framework-container">
              <div className="framework-left" style={{ flex: '1 1 30%' }}>
                {FRAMEWORK_STAGES.map((stage, idx) => (
                  <Reveal key={stage.id} delay={idx * 60}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      onClick={() => setActiveStage(idx)}
                      className={activeStage === idx ? 'active-tab' : ''}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '1.5rem',
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: 'transparent',
                        borderLeftWidth: '4px',
                        borderLeftStyle: 'solid',
                        borderLeftColor:
                          activeStage === idx ? 'var(--brand-secondary)' : 'transparent',
                        backgroundColor:
                          activeStage === idx ? 'var(--surface-default)' : 'transparent',
                        boxShadow: activeStage === idx ? 'var(--elevation-01)' : 'none',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          color:
                            activeStage === idx
                              ? 'var(--brand-secondary)'
                              : 'var(--content-tertiary)',
                        }}
                      >
                        STAGE {stage.id}
                      </span>
                      <div
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color:
                            activeStage === idx
                              ? 'var(--content-primary)'
                              : 'var(--content-secondary)',
                        }}
                      >
                        {stage.title}
                      </div>
                    </motion.button>
                  </Reveal>
                ))}
              </div>

              <div className="framework-right" style={{ flex: '1 1 70%' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    style={{
                      padding: '4rem',
                      backgroundColor: 'var(--surface-default)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      boxShadow: 'var(--elevation-01)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        opacity: 0.05,
                        pointerEvents: 'none',
                      }}
                    >
                      {(() => {
                        const Icon = FRAMEWORK_STAGES[activeStage].icon;
                        return <Icon size={192} style={{ color: 'var(--content-primary)' }} />;
                      })()}
                    </div>

                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--content-primary)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {FRAMEWORK_STAGES[activeStage].title}
                    </h3>
                    <p
                      style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.7,
                        color: 'var(--content-secondary)',
                        maxWidth: '60ch',
                        marginBottom: '2.5rem',
                      }}
                    >
                      {FRAMEWORK_STAGES[activeStage].focus}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {FRAMEWORK_STAGES[activeStage].outcomes.map((outcome, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                          <CheckCircle2
                            size={20}
                            style={{ color: 'var(--brand-secondary)', flexShrink: 0 }}
                          />
                          <span style={{ fontWeight: 500, color: 'var(--content-primary)' }}>
                            {outcome}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUE PORTFOLIO ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-default)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '672px', margin: '0 auto 3rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--content-accent)',
                    marginBottom: '1rem',
                  }}
                >
                  Prioritization
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--content-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  The AI Value Portfolio
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--content-secondary)' }}>
                  Balancing immediate productivity gains with long-term strategic transformation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div
                className="value-portfolio-wrapper"
                style={{
                  position: 'relative',
                  maxWidth: '896px',
                  margin: '3rem auto 0',
                  aspectRatio: '16/9',
                  borderLeft: '1px solid var(--border-default)',
                  borderBottom: '1px solid var(--border-default)',
                  padding: '1rem',
                }}
              >
                {/* Y Axis Label (Outside Border) */}
                <div className="value-portfolio-labels-y">BUSINESS VALUE →</div>

                {/* X Axis Label (Outside Border) */}
                <div className="value-portfolio-labels-x">
                  FEASIBILITY (DATA & TECH READINESS) →
                </div>

                <div className="value-portfolio-grid">
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--brand-secondary)',
                        }}
                      >
                        HIGH VALUE / HARD
                      </span>
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0.5rem 0',
                        }}
                      >
                        Strategic Bets
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
                        Transformative initiatives requiring significant infrastructure upgrades.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--teal-500)',
                        }}
                      >
                        HIGH VALUE / EASY
                      </span>
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0.5rem 0',
                        }}
                      >
                        Quick Wins
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
                        High ROI use cases utilizing existing structured data and ready APIs.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--content-tertiary)',
                        }}
                      >
                        LOW VALUE / HARD
                      </span>
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0.5rem 0',
                        }}
                      >
                        Deprioritized
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
                        Complex efforts with minimal strategic or financial return.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--content-accent)',
                        }}
                      >
                        LOW VALUE / EASY
                      </span>
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0.5rem 0',
                        }}
                      >
                        Experiments
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
                        Low-risk pilots to build internal AI fluency and test new models.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── WHY TRYVION ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-subtle)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: '3rem' }}>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 700,
                    color: 'var(--content-primary)',
                  }}
                >
                  Why TRYVION
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--content-secondary)' }}>
                  Business-First. AI-Powered. Built for Scale.
                </p>
              </div>
            </Reveal>
            <div className="why-grid">
              {WHY_TRYVION.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 60}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: 'var(--elevation-02)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--surface-default)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '8px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--content-primary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--content-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESPONSIBLE AI ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-default)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="responsible-grid">
              <Reveal>
                <div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                      fontWeight: 700,
                      color: 'var(--content-primary)',
                      marginBottom: '1rem',
                    }}
                  >
                    Responsible AI by Design
                  </h2>
                  <p
                    style={{
                      fontSize: '1.125rem',
                      color: 'var(--content-secondary)',
                      marginBottom: '1rem',
                    }}
                  >
                    Innovation Without Compromising Trust
                  </p>
                  <p style={{ fontSize: '1rem', color: 'var(--content-secondary)' }}>
                    Responsible AI is embedded directly into the AI lifecycle, not added as a
                    post-launch checkpoint.
                  </p>
                </div>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {RESPONSIBLE_AI.map((item, idx) => (
                  <Reveal key={item.title} delay={idx * 100}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      style={{
                        display: 'flex',
                        gap: '1.25rem',
                        padding: '1.25rem',
                        backgroundColor: 'var(--surface-subtle)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--surface-info-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <item.icon size={24} style={{ color: 'var(--brand-secondary)' }} />
                        </div>
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: 'var(--content-primary)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MEASURING AI VALUE ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-subtle)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '672px', margin: '0 auto 3rem' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--content-accent)',
                    marginBottom: '1rem',
                  }}
                >
                  Outcomes
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--content-primary)',
                  }}
                >
                  Measuring AI Value
                </h2>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="metrics-table-wrapper">
                <table
                  className="metrics-table"
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderBottom: '1px solid var(--border-default)',
                      }}
                    >
                      <th
                        style={{
                          padding: '1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--content-secondary)',
                        }}
                      >
                        Value Dimension
                      </th>
                      <th
                        style={{
                          padding: '1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--content-secondary)',
                        }}
                      >
                        Key Metrics
                      </th>
                      <th
                        style={{
                          padding: '1.5rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--content-secondary)',
                        }}
                      >
                        Target Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {METRICS.map((metric, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ borderBottom: '1px solid var(--border-subtle)' }}
                      >
                        <td
                          style={{
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontWeight: 500,
                            color: 'var(--content-primary)',
                          }}
                        >
                          <metric.icon size={24} style={{ color: 'var(--brand-secondary)' }} />
                          {metric.category}
                        </td>
                        <td
                          style={{
                            padding: '1.5rem',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            color: 'var(--content-secondary)',
                          }}
                        >
                          {metric.metrics}
                        </td>
                        <td
                          style={{
                            padding: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--brand-secondary)',
                          }}
                        >
                          {metric.impact}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '5rem 2rem', backgroundColor: 'var(--surface-default)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{
                  backgroundColor: 'var(--brand-secondary)',
                  padding: '5rem 2rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div
                  style={{ position: 'relative', zIndex: 10, maxWidth: '768px', margin: '0 auto' }}
                >
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: 'var(--neutral-0)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    From AI Strategy to an AI-Powered Enterprise.
                  </h2>
                  <p
                    style={{
                      fontSize: '1.25rem',
                      color: 'var(--neutral-100)',
                      marginBottom: '2.5rem',
                    }}
                  >
                    Stop experimenting in silos. Build a comprehensive strategy that connects data,
                    technology, and business outcomes.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Link
                      href="/contact"
                      style={{
                        backgroundColor: 'var(--surface-default)',
                        color: 'var(--brand-secondary)',
                        padding: '1rem 2.5rem',
                        fontWeight: 700,
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textDecoration: 'none',
                        boxShadow: 'var(--elevation-02)',
                      }}
                    >
                      Schedule a Strategy Briefing <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
