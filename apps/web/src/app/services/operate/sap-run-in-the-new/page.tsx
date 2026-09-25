'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Users,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Activity,
  CheckCircle2,
  Terminal,
  RefreshCw,
  Workflow,
  Database,
  BrainCircuit,
  Layers,
  Settings,
  Check,
  TrendingUp,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES ──

const FRAMEWORK_MOVEMENTS = [
  {
    num: '01',
    title: 'STABILISE',
    subtitle: 'Protect continuity.',
    description:
      'Resolve critical issues, restore service and establish operational stability across the SAP landscape.',
    icon: <ShieldCheck size={24} />,
  },
  {
    num: '02',
    title: 'OPERATE',
    subtitle: 'Run with discipline.',
    description:
      'Deliver reliable application and technical operations across the SAP environment.',
    icon: <Users size={24} />,
  },
  {
    num: '03',
    title: 'AUTOMATE',
    subtitle: 'Remove repetitive work.',
    description:
      'Use workflows, APIs, SAP Build and AI to automate repeatable operational activities.',
    icon: <Workflow size={24} />,
  },
  {
    num: '04',
    title: 'OPTIMISE',
    subtitle: 'Make the environment better.',
    description:
      'Improve processes, performance, integrations, user experience and technical health.',
    icon: <TrendingUp size={24} />,
  },
  {
    num: '05',
    title: 'INNOVATE',
    subtitle: 'Keep moving forward.',
    description:
      'Adopt SAP innovations, Business AI, Joule and emerging capabilities that create new value.',
    icon: <Sparkles size={24} />,
  },
];

const OFFERING_CARDS = [
  {
    title: 'Application Management Services',
    subtitle: 'End-to-end support across SAP applications and business processes.',
    icon: <Terminal size={22} />,
    points: [
      'Incident, service request & problem management',
      'Functional & technical support',
      'Enhancements, releases & security',
      'SLA & service governance',
    ],
    link: '#ams-details',
  },
  {
    title: 'Proactive SAP Operations',
    subtitle: 'Fix less. Prevent more.',
    icon: <Activity size={22} />,
    points: [
      'Proactive system monitoring',
      'Recurring issue analysis',
      'Root-cause elimination',
      'Performance optimization',
      'Continuous service improvement',
    ],
    link: '#proactive-details',
  },
  {
    title: 'AI-Powered AMS',
    subtitle: 'Make support faster and smarter.',
    icon: <BrainCircuit size={22} />,
    points: [
      'Intelligent ticket classification',
      'Root-cause & resolution suggestions',
      'Knowledge recommendations',
      'AI-assisted service agents',
      'Automated testing & documentation',
    ],
    link: '#ai-details',
  },
  {
    title: 'Intelligent Automation',
    subtitle:
      'Reduce repetitive operational work using SAP Build, workflow automation, APIs and AI.',
    icon: <Cpu size={22} />,
    points: [
      'Routine service requests',
      'Monitoring & master data processes',
      'Approval workflows',
      'Notifications & operational reporting',
    ],
    link: '#automation-details',
  },
  {
    title: 'Continuous Improvement',
    subtitle: 'From run to improve.',
    icon: <RefreshCw size={22} />,
    points: [
      'Process simplification',
      'Automation opportunities',
      'SAP innovations & Joule',
      'Clean Core & performance',
      'Backlog-driven improvements',
    ],
    link: '#improvement-details',
  },
  {
    title: 'SAP Expertise Across Landscape',
    subtitle: 'Support across functional and technical operations.',
    icon: <Database size={22} />,
    landscapeItems: [
      'SAP S/4HANA Cloud',
      'SAP SuccessFactors',
      'SAP Integration Suite',
      'SAP Data & Analytics',
      'SAP Customer Experience',
      'SAP BTP',
      'SAP Ariba',
      'SAP Build',
      'SAP Business AI & Joule',
    ],
    link: '#landscape-details',
  },
];

const WHY_TRYVION_PILLARS = [
  {
    title: 'Business-Process Led',
    description:
      'We understand the business processes behind the technology — not just the tickets.',
    icon: <Layers size={22} />,
  },
  {
    title: 'AI-First Operations',
    description:
      'AI and automation are embedded into the service model to drive greater productivity.',
    icon: <Sparkles size={22} />,
  },
  {
    title: 'Proactive, Not Reactive',
    description: 'We focus on eliminating recurring issues and reducing future ticket volumes.',
    icon: <ShieldCheck size={22} />,
  },
  {
    title: 'Continuous Innovation',
    description:
      'We help clients consume new SAP capabilities instead of allowing landscapes to stagnate.',
    icon: <TrendingUp size={22} />,
  },
  {
    title: 'Clean Core Aligned',
    description:
      'Enhancements and improvements are designed for long-term maintainability and upgradeability.',
    icon: <CheckCircle2 size={22} />,
  },
  {
    title: 'Flexible Operating Model',
    description:
      'Tailored around application criticality, service levels and transformation priorities.',
    icon: <Settings size={22} />,
  },
];

const COMPARISON_ROWS = [
  { traditional: 'React to incidents', runInNew: 'Prevent recurring issues' },
  { traditional: 'Resolve tickets', runInNew: 'Improve business processes' },
  { traditional: 'Manual support', runInNew: 'AI-assisted operations' },
  { traditional: 'Maintain the environment', runInNew: 'Continuously optimise it' },
  { traditional: 'Measure service activity', runInNew: 'Measure business outcomes' },
  { traditional: 'Support technology', runInNew: 'Understand business processes' },
  { traditional: 'Operate after go-live', runInNew: 'Continuously evolve after go-live' },
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

export default function TryvionSapRunInTheNewPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // Carousel state for Offerings
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, OFFERING_CARDS.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
        {/* ── 1. FULL-BACKGROUND HERO SECTION ── */}
        <section
          style={{
            position: 'relative',
            backgroundImage: 'url(/images/hero-sap-run-in-the-new.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: 'clamp(9rem, 14vw, 12rem)',
            paddingBottom: '8rem',
            paddingLeft: 'clamp(1rem, 4vw, 3rem)',
            paddingRight: 'clamp(1rem, 4vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Dark Overlay for Complete Readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(3, 5, 12, 0.50) 0%, rgba(7, 11, 20, 0.50) 100%)',
              zIndex: 1,
            }}
          />

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            {/* Breadcrumb Navigation */}
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
                <Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>
                  Services
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <Link href="/services/operate" style={{ color: '#fff', textDecoration: 'none' }}>
                  TRYVION Operate
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>SAP Run in the New</span>
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
                  SAP RUN IN <br />
                  <span style={{ color: '#60A5FA' }}>THE NEW</span>
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
                  From Application Support to Intelligent Operations.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: '#FFFFFF',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    maxWidth: '750px',
                  }}
                >
                  <p style={{ color: '#ffffff' }}>
                    TRYVION combines SAP expertise, proactive operations, automation,
                    <br /> Business AI and continuous improvement to create an operating
                    <br /> model that becomes more efficient and intelligent over time.
                  </p>
                </div>
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
                    Talk to an SAP Expert <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="#framework"
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
                    Explore TRYVION Operate <ArrowRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. THE SHIFT ── */}
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
                  THE SHIFT
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  AMS Should Not Maintain The Status Quo.
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                    lineHeight: 1.7,
                  }}
                >
                  The role of SAP application management is changing. Organisations need more than
                  incident resolution and service availability. They need an operating model capable
                  of identifying problems earlier, reducing repetitive work, improving processes and
                  continuously adopting new capabilities.
                </p>
                <p
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#60A5FA',
                    marginTop: '1.25rem',
                  }}
                >
                  Run in the New moves SAP operations from reactive support to continuous
                  improvement.
                </p>
              </div>
            </Reveal>

            <div className="grid-2">
              <Reveal delay={100}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    borderLeft: '4px solid #EF4444',
                    height: '100%',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#EF4444',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '1.5rem',
                    }}
                  >
                    FROM TRADITIONAL AMS
                  </span>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                      'Tickets',
                      'Reactive support',
                      'Manual effort',
                      'Recurring issues',
                      'System maintenance',
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.15)',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: isDark ? '#FCA5A5' : '#991B1B',
                        }}
                      >
                        <span style={{ color: '#EF4444', fontWeight: 800 }}>&times;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    borderLeft: '4px solid #10B981',
                    height: '100%',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#10B981',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '1.5rem',
                    }}
                  >
                    TO SAP RUN IN THE NEW
                  </span>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                      'Intelligent operations',
                      'Proactive prevention',
                      'Automation',
                      'Continuous optimisation',
                      'Business improvement',
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          backgroundColor: 'rgba(16, 185, 129, 0.05)',
                          borderRadius: '8px',
                          border: '1px solid rgba(16, 185, 129, 0.15)',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: isDark ? '#6EE7B7' : '#065F46',
                        }}
                      >
                        <Check size={16} style={{ color: '#10B981' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. FRAMEWORK MOVEMENTS ── */}
        <section
          id="framework"
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
                  Our Run In The New Framework
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Five Movements. One Continous Cycle.
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Every cycle should leave the SAP environment better than it was before.
                </p>
              </div>
            </Reveal>

            <div className="grid-5">
              {FRAMEWORK_MOVEMENTS.map((mov, mIdx) => (
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
                      borderTop: '3px solid rgba(37,99,235,0.5)',
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
          </div>
        </section>

        {/* ── 4. WHAT WE OFFER (CARD CAROUSEL SECTION) ── */}
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '3.5rem',
                  flexWrap: 'wrap',
                  gap: '2rem',
                }}
              >
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
                    WHAT WE OFFER
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                    }}
                  >
                    Intelligent Operations Across the SAP Lifecycle
                  </h2>
                </div>

                {/* Carousel Navigation Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={prevSlide}
                    aria-label="Previous offering"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(15, 23, 42, 0.08)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)'}`,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next offering"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      border: 'none',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Carousel Track Container */}
            <div style={{ overflow: 'hidden', padding: '0.5rem 0 1.5rem' }}>
              <motion.div
                animate={{
                  x: `calc(-${currentIndex * (100 / itemsPerPage)}% - ${currentIndex * 1.33}rem)`,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  width: `${(OFFERING_CARDS.length / itemsPerPage) * 100}%`,
                }}
              >
                {OFFERING_CARDS.map((offer, oIdx) => (
                  <div
                    key={oIdx}
                    className="glass-panel interactive-card"
                    style={{
                      width: `calc(${100 / OFFERING_CARDS.length}% - 1.35rem)`,
                      minWidth: '320px',
                      padding: '2.25rem',
                      borderRadius: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexShrink: 0,
                    }}
                  >
                    <div>
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
                        {offer.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {offer.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                          marginBottom: '1.5rem',
                        }}
                      >
                        {offer.subtitle}
                      </p>

                      {offer.points && (
                        <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.5rem' }}>
                          {offer.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.85rem',
                                color: isDark ? '#CBD5E1' : '#334155',
                              }}
                            >
                              <Check size={14} style={{ color: '#2563EB', flexShrink: 0 }} />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {offer.landscapeItems && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {offer.landscapeItems.map((item, lIdx) => (
                            <span
                              key={lIdx}
                              style={{
                                fontSize: '0.72rem',
                                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.25)',
                                color: '#60A5FA',
                                padding: '0.25rem 0.55rem',
                                borderRadius: '6px',
                                fontWeight: 600,
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={offer.link}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#2563EB',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      Learn more &rarr;
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Pagination Dots */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '2rem',
              }}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, dIdx) => (
                <button
                  key={dIdx}
                  onClick={() => setCurrentIndex(dIdx)}
                  aria-label={`Go to slide ${dIdx + 1}`}
                  style={{
                    width: currentIndex === dIdx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor:
                      currentIndex === dIdx
                        ? '#2563EB'
                        : isDark
                          ? 'rgba(255,255,255,0.2)'
                          : 'rgba(15,23,42,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. TRANSFORMATION IMPACT TABLE ── */}
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
                  TRANSFORMATION IMPACT
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  What Changes With Run In The New
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    backgroundColor: 'rgba(37, 99, 235, 0.15)',
                    padding: '1.25rem 1.5rem',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div>Traditional AMS</div>
                  <div style={{ color: '#60A5FA' }}>SAP Run in the New</div>
                </div>

                {COMPARISON_ROWS.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      padding: '1.1rem 1.5rem',
                      borderBottom:
                        rIdx < COMPARISON_ROWS.length - 1
                          ? `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'}`
                          : 'none',
                      fontSize: '0.9rem',
                      backgroundColor:
                        rIdx % 2 === 0
                          ? 'transparent'
                          : isDark
                            ? 'rgba(255,255,255,0.02)'
                            : 'rgba(0,0,0,0.01)',
                    }}
                  >
                    <div style={{ color: isDark ? '#94A3B8' : '#64748B', fontWeight: 500 }}>
                      {row.traditional}
                    </div>
                    <div
                      style={{
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Check size={16} style={{ color: '#10B981' }} />
                      <span>{row.runInNew}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 6. WHY TRYVION OPERATE? ── */}
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
                  Beyond Traditional AMS
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Business-first. AI-enabled. Built to evolve.
                </p>
              </div>
            </Reveal>

            <div className="grid-3">
              {WHY_TRYVION_PILLARS.map((pillar, wIdx) => (
                <Reveal key={wIdx} delay={wIdx * 80}>
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

        {/* ── 7. FINAL CTA SECTION ── */}
        <section
          style={{
            padding: '8rem 2rem',
            textAlign: 'center',
            position: 'relative',
            backgroundImage:
              'linear-gradient(rgba(3, 5, 12, 0.50), rgba(3, 5, 12, 0.78)), url("/images/earthBeam-01.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTop: '1px solid rgba(255,255,255,0.08)',
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
                RUN THE NEW
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
                Don't Just Keep SAP Running. Make It Better.
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  marginBottom: '2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Tomorrow's SAP operations will combine people, automation, AI and continuous
                innovation to create an environment that becomes more efficient and intelligent over
                time.
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
                  href="#framework"
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
                  Explore TRYVION Operate <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
