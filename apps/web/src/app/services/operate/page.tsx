'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Users,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Activity,
  CheckCircle2,
  Terminal,
  RefreshCw,
  Workflow,
  Cloud,
  Layers,
  Settings,
  TrendingUp,
  BrainCircuit,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES FOR TRYVION OPERATE CATEGORY ──

const OPERATE_MODEL_MOVEMENTS = [
  {
    num: '01',
    title: 'STABILISE',
    subtitle: 'Protect continuity.',
    description: 'Resolve critical issues and establish operational stability.',
    icon: <ShieldCheck size={22} />,
  },
  {
    num: '02',
    title: 'OPERATE',
    subtitle: 'Run with discipline.',
    description: 'Deliver reliable day-to-day operations across critical enterprise environments.',
    icon: <Users size={22} />,
  },
  {
    num: '03',
    title: 'AUTOMATE',
    subtitle: 'Remove repetitive effort.',
    description: 'Use automation, workflows and AI to reduce operational work.',
    icon: <Workflow size={22} />,
  },
  {
    num: '04',
    title: 'OPTIMISE',
    subtitle: 'Make operations better.',
    description: 'Improve performance, processes, efficiency and user experience.',
    icon: <TrendingUp size={22} />,
  },
  {
    num: '05',
    title: 'INNOVATE',
    subtitle: 'Keep moving forward.',
    description: 'Continuously introduce new capabilities, technologies and ways of working.',
    icon: <Sparkles size={22} />,
  },
];

const SUBCATEGORY_PORTFOLIO = [
  {
    title: 'SAP RUN IN THE NEW',
    tagline: 'FROM APPLICATION SUPPORT TO INTELLIGENT OPERATIONS.',
    description:
      'Move beyond traditional AMS with a modern SAP operating model built around stability, proactive operations, automation, optimisation and continuous innovation.',
    flow: 'STABILISE → OPERATE → AUTOMATE → OPTIMISE → INNOVATE',
    link: '/services/operate/sap-run-in-the-new',
    icon: <Terminal size={24} />,
    accent: '#2563EB',
  },
  {
    title: 'CLOUD OPERATIONS',
    tagline: 'RUN THE CLOUD WITH CONFIDENCE.',
    description:
      'Operate cloud environments with the reliability, visibility and operational discipline required to support a continuously evolving enterprise. TRYVION helps organisations manage cloud operations with a focus on performance, resilience, efficiency and continuous optimisation.',
    flow: 'MONITOR → SECURE → RESILIENCE → OPTIMISE',
    link: '/services/operate/cloud-operations',
    icon: <Cloud size={24} />,
    accent: '#3B82F6',
  },
  {
    title: 'APPLICATION SUPPORT',
    tagline: 'KEEP CRITICAL APPLICATIONS PERFORMING.',
    description:
      'Reliable applications are essential to reliable business operations. TRYVION provides structured application support designed to maintain performance, resolve issues effectively and help organisations continuously improve the environments their people and processes depend on.',
    flow: 'SUPPORT → RESOLVE → MAINTAIN → IMPROVE',
    link: '/services/operate/application-support',
    icon: <Cpu size={24} />,
    accent: '#10B981',
  },
];

const EVOLUTION_STEPS = [
  {
    stage: 'REACTIVE',
    desc: 'Respond when issues occur.',
    metric: 'Phase 01',
  },
  {
    stage: 'PROACTIVE',
    desc: 'Identify risks before they become disruption.',
    metric: 'Phase 02',
  },
  {
    stage: 'AUTOMATED',
    desc: 'Reduce repetitive operational effort.',
    metric: 'Phase 03',
  },
  {
    stage: 'INTELLIGENT',
    desc: 'Use AI, data and context to improve operations.',
    metric: 'Phase 04',
  },
  {
    stage: 'CONTINUOUS',
    desc: 'Keep improving the environment as the business evolves.',
    metric: 'Phase 05',
  },
];

const TRYVION_DIFFERENCE_PILLARS = [
  {
    title: 'Business-Process Led',
    description:
      'Understand the business processes behind the technology—not simply the incidents and tickets.',
    icon: <Layers size={22} />,
  },
  {
    title: 'Proactive by Design',
    description:
      'Move beyond issue resolution to identify recurring problems, operational risks and opportunities for improvement.',
    icon: <ShieldCheck size={22} />,
  },
  {
    title: 'Intelligent Operations',
    description:
      'Bring automation and AI into the operating model where they can create meaningful operational value.',
    icon: <BrainCircuit size={22} />,
  },
  {
    title: 'Continuous Improvement',
    description: 'Turn operational insight into a structured agenda for ongoing improvement.',
    icon: <RefreshCw size={22} />,
  },
  {
    title: 'Technology Expertise',
    description: 'Combine enterprise technology knowledge with practical operational experience.',
    icon: <Terminal size={22} />,
  },
  {
    title: 'Flexible Operating Model',
    description:
      'Align operations to business priorities, technology environments, criticality and service requirements.',
    icon: <Settings size={22} />,
  },
];

const OUTCOMES_GRID = [
  {
    title: 'Reliable Operations',
    desc: 'Keep critical enterprise environments stable and available.',
  },
  {
    title: 'Lower Operational Effort',
    desc: 'Reduce repetitive work through automation and intelligent operations.',
  },
  {
    title: 'Faster Response',
    desc: 'Use proactive monitoring and operational intelligence to respond more effectively.',
  },
  {
    title: 'Better Experience',
    desc: 'Improve the experience of the people who depend on enterprise technology every day.',
  },
  {
    title: 'Continuous Improvement',
    desc: 'Turn operations from a maintenance function into an ongoing source of improvement and value.',
  },
];

const Reveal = ({ children, delay = 0, className = '', style = {} }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export default function TryvionOperateCategoryPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        backgroundColor: isDark ? '#070B14' : '#FFFFFF',
        color: isDark ? '#F8FAFC' : '#0F172A',
        fontFamily: 'var(--family-text, system-ui, -apple-system, sans-serif)',
        minHeight: '100vh',
        overflowX: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        .glass-panel {
          background: ${isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
        }
        .hero-operate-bg {
          background-color: #03050C !important;
          background-image: linear-gradient(to bottom, rgba(3, 5, 12, 0.50), rgba(3, 5, 12, 0.50)), url("/images/hero-tryvion-operate-1.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .interactive-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-card:hover {
          border-color: rgba(37, 99, 235, 0.5);
          transform: translateY(-3px);
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }

        @media (max-width: 1200px) {
          .grid-5 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .grid-2, .grid-3, .grid-5 { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── 01 — HERO SECTION (WITH BACKGROUND IMAGE) ── */}
        <section
          className="hero-operate-bg"
          style={{
            paddingTop: 'clamp(9rem, 14vw, 12rem)',
            paddingBottom: '8rem',
            paddingLeft: 'clamp(1rem, 4vw, 3rem)',
            paddingRight: 'clamp(1rem, 4vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '1.5rem',
                }}
              >
                <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
                  Home
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>TRYVION Operate</span>
              </nav>
            </Reveal>

            <div style={{ maxWidth: '850px' }}>
              <Reveal delay={80}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    background: 'rgba(37, 99, 235, 0.15)',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                    color: '#60A5FA',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                  }}
                >
                  TRYVION OPERATE
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h1
                  style={{
                    fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  RUN TODAY. <span style={{ color: '#60A5FA' }}>IMPROVE TOMORROW.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#E2E8F0',
                    marginBottom: '1.5rem',
                  }}
                >
                  Intelligent operations for the continuously evolving enterprise.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: '#FFFFFF',
                    marginBottom: '2.5rem',
                    maxWidth: '750px',
                  }}
                >
                  TRYVION OPERATE helps organisations run critical enterprise environments with
                  greater reliability, efficiency and continuous improvement—combining operational
                  expertise, automation, AI and proactive management.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/contact/customer-support?intent=expert"
                    style={{
                      backgroundColor: '#F59E0B',
                      color: '#03050C',
                      padding: '0.85rem 1.75rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.4)',
                    }}
                  >
                    Talk to an Expert <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="#portfolio"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      padding: '0.85rem 1.75rem',
                      fontWeight: 600,
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    Explore Our Approach <ArrowRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 — THE OPERATE AGENDA (TWO-COLUMN LAYOUT WITH IMAGE) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <Reveal>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: '#2563EB',
                      textTransform: 'uppercase',
                    }}
                  >
                    BEYOND KEEPING THE LIGHTS ON
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1rem',
                      lineHeight: 1.15,
                    }}
                  >
                    Operations Should Create Momentum.
                  </h2>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#60A5FA',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Technology does not stop evolving when implementation ends.
                  </p>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.8,
                      color: isDark ? '#94A3B8' : '#64748B',
                    }}
                  >
                    TRYVION OPERATE helps organisations move beyond reactive support to a more
                    proactive, intelligent and continuously improving operating model. We combine
                    operational expertise, automation and intelligent technologies to help
                    organisations run reliably today and improve continuously for tomorrow.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isDark
                      ? '0 20px 40px rgba(0,0,0,0.5)'
                      : '0 20px 40px rgba(0,0,0,0.1)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                >
                  <img
                    src="/images/the-future-of-SAP-operations.webp"
                    alt="Tryvion Operate - SAP Run In The New, Cloud Operations, Application Support"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                      maxHeight: '420px',
                      filter: isDark ? 'brightness(0.9) contrast(1.1)' : 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: isDark
                        ? 'linear-gradient(to top, rgba(7, 11, 20, 0.10), transparent)'
                        : 'linear-gradient(to top, rgba(255, 255, 255, 0.10), transparent)',
                      padding: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Activity size={20} style={{ color: '#2563EB' }} />
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#FFFFFF',
                        }}
                      >
                        24/7 Intelligent Enterprise Telemetry & Monitoring
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 03 — THE TRYVION OPERATE MODEL (5 MOVEMENTS) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  ONE OPERATING PHILOSOPHY.
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Continuous Value.
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  A modern operating model should evolve as the business evolves.
                </p>
              </div>
            </Reveal>

            <div className="grid-5">
              {OPERATE_MODEL_MOVEMENTS.map((mov, mIdx) => (
                <Reveal key={mIdx} delay={mIdx * 80}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: '3px solid #2563EB',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#60A5FA',
                          }}
                        >
                          {mov.icon}
                        </div>
                        <span
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            color: '#2563EB',
                          }}
                        >
                          {mov.num}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {mov.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#60A5FA',
                          display: 'block',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {mov.subtitle}
                      </span>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                        }}
                      >
                        {mov.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '3.5rem',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  maxWidth: '700px',
                  marginInline: 'auto',
                }}
              >
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#60A5FA' }}>
                  THE OUTCOME: An operating environment that becomes more efficient and intelligent
                  over time.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 04 — THREE WAYS TO OPERATE BETTER (PORTFOLIO SUBCATEGORIES) ── */}
        <section
          id="portfolio"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  THE TRYVION OPERATE PORTFOLIO
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Three Capabilities. One Operating Objective.
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                    lineHeight: 1.7,
                  }}
                >
                  TRYVION OPERATE brings together the capabilities organisations need to run,
                  support and continuously improve their enterprise environments.
                </p>
              </div>
            </Reveal>

            <div className="grid-3">
              {SUBCATEGORY_PORTFOLIO.map((sub, sIdx) => (
                <Reveal key={sIdx} delay={sIdx * 100}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: `4px solid ${sub.accent}`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(37, 99, 235, 0.15)',
                          border: '1px solid rgba(37, 99, 235, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#60A5FA',
                          marginBottom: '1.5rem',
                        }}
                      >
                        {sub.icon}
                      </div>

                      <h3
                        style={{
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        0{sIdx + 1} — {sub.title}
                      </h3>

                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: '#60A5FA',
                          display: 'block',
                          marginBottom: '1rem',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {sub.tagline}
                      </span>

                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.7,
                          marginBottom: '1.5rem',
                        }}
                      >
                        {sub.description}
                      </p>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: isDark ? '#94A3B8' : '#475569',
                          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          marginBottom: '2rem',
                        }}
                      >
                        {sub.flow}
                      </div>
                    </div>

                    <Link
                      href={sub.link}
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#2563EB',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      Explore {sub.title.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 — FROM REACTIVE TO CONTINUOUS (IBM-STYLE CORPORATE ARCHITECTURE PIPELINE) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  THE EVOLUTION OF OPERATIONS
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Don't Just Respond. Anticipate. Automate. Improve.
                </h2>
              </div>
            </Reveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              {EVOLUTION_STEPS.map((step, eIdx) => (
                <Reveal key={eIdx} delay={eIdx * 90}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTop: `4px solid ${eIdx === EVOLUTION_STEPS.length - 1 ? '#10B981' : '#2563EB'}`,
                      position: 'relative',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: '#60A5FA',
                            backgroundColor: 'rgba(37, 99, 235, 0.12)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                          }}
                        >
                          {step.metric}
                        </span>
                        <span
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                          }}
                        >
                          0{eIdx + 1}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.75rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {step.stage}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 — THE TRYVION DIFFERENCE ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  WHY TRYVION OPERATE?
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  More Than Support. An Operating Partner.
                </h2>
              </div>
            </Reveal>

            <div className="grid-3">
              {TRYVION_DIFFERENCE_PILLARS.map((pillar, pIdx) => (
                <Reveal key={pIdx} delay={pIdx * 80}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2.25rem',
                      borderRadius: '16px',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                        border: '1px solid rgba(37, 99, 235, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#60A5FA',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {pillar.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 — WHAT BETTER OPERATIONS CREATE ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  THE OUTCOME
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Less Effort. Greater Reliability. More Value.
                </h2>
              </div>
            </Reveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {OUTCOMES_GRID.map((out, oIdx) => (
                <Reveal key={oIdx} delay={oIdx * 60}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2rem',
                      borderRadius: '16px',
                      height: '100%',
                      borderLeft: '3px solid #2563EB',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        {out.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                      }}
                    >
                      {out.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 — THE OPERATE PRINCIPLE ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <Reveal>
              <div
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 1) 100%)',
                  borderRadius: '24px',
                  border: `1px solid ${isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`,
                  padding: 'clamp(3rem, 5vw, 5rem)',
                  textAlign: 'center',
                  boxShadow: isDark
                    ? '0 20px 50px rgba(0,0,0,0.4)'
                    : '0 20px 40px rgba(37, 99, 235, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#60A5FA',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                >
                  THE OPERATE PRINCIPLE
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  From Keep The Lights On To Keep Getting Better.
                </h2>

                <p
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginBottom: '3rem',
                    maxWidth: '800px',
                    marginInline: 'auto',
                  }}
                >
                  The end of implementation should be the beginning of continuous improvement.
                  TRYVION OPERATE combines people, technology, automation, AI and operational
                  expertise to create an environment that can continuously adapt as the enterprise
                  evolves.
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    backgroundColor: isDark ? 'rgba(7, 11, 20, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                    padding: '1rem 2rem',
                    borderRadius: '16px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                >
                  {['STABILISE', 'OPERATE', 'AUTOMATE', 'OPTIMISE', 'INNOVATE'].map(
                    (stage, idx, arr) => (
                      <React.Fragment key={idx}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: idx === arr.length - 1 ? '#10B981' : '#60A5FA',
                            letterSpacing: '0.1em',
                          }}
                        >
                          {stage}
                        </span>
                        {idx < arr.length - 1 && (
                          <span
                            style={{
                              color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                              fontWeight: 600,
                            }}
                          >
                            •
                          </span>
                        )}
                      </React.Fragment>
                    ),
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 09 — FINAL CTA ── */}
        <section
          id="contact"
          className="hero-operate-bg"
          style={{
            padding: '8rem 2rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Reveal>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#60A5FA',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '1rem',
                }}
              >
                READY TO OPERATE DIFFERENTLY?
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Run Today. Improve Tomorrow.
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  marginBottom: '2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Build an operating environment that is more reliable today, more intelligent
                tomorrow and continuously improving over time.
              </p>

              <div
                style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link
                  href="/contact/customer-support?intent=consultation"
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#03050C',
                    padding: '0.95rem 2.25rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.5)',
                  }}
                >
                  Book a Consultation <ArrowRight size={18} />
                </Link>

                <Link
                  href="/services/operate/sap-run-in-the-new"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#FFFFFF',
                    padding: '0.95rem 2.25rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                  }}
                >
                  Explore SAP Run in the New <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
