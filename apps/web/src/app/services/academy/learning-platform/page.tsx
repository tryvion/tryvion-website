'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Award,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  BarChart3,
  Users,
  Compass,
  PlayCircle,
  Sparkles,
  Star,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES & APPROVED TLP CONTENT ──

const HERO_PILLARS = [
  {
    title: 'Structured',
    description: 'Curated learning paths mapped to enterprise roles.',
    icon: <BookOpen size={22} />,
  },
  {
    title: 'Practical',
    description: 'Scenarios, labs and assignments to apply what you learn.',
    icon: <Cpu size={22} />,
  },
  {
    title: 'Validated',
    description: 'Assessments and skill checks to measure progress.',
    icon: <ShieldCheck size={22} />,
  },
  {
    title: 'Continuous',
    description: 'Keep growing with badges, insights and new opportunities.',
    icon: <Sparkles size={22} />,
  },
];

const LEARNING_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Learn',
    description:
      'Access high-quality content across functional, technical and emerging technologies.',
    icon: <BookOpen size={20} />,
  },
  {
    step: '02',
    title: 'Practice',
    description: 'Apply concepts through hands-on exercises, scenarios, demos and assignments.',
    icon: <Cpu size={20} />,
  },
  {
    step: '03',
    title: 'Experience',
    description: 'Learn from real implementation examples, stories and practitioner insights.',
    icon: <Users size={20} />,
  },
  {
    step: '04',
    title: 'Validate',
    description: 'Strengthen understanding with assessments, skill checks and certification prep.',
    icon: <ShieldCheck size={20} />,
  },
  {
    step: '05',
    title: 'Grow',
    description: 'Build capabilities, unlock achievements and advance your career.',
    icon: <Star size={20} />,
  },
];

const TLP_FEATURES = [
  'Personalized learning dashboard',
  'Role-based learning paths',
  'Interactive content & multimedia',
  'Hands-on practice environments',
  'Assessments & skill checks',
  'Certification preparation',
  'Community discussions',
  'Progress tracking & analytics',
  'Calendar & learning reminders',
  'Resource library & downloads',
];

const CAPABILITY_DOMAINS = [
  {
    title: 'SAP S/4HANA',
    badge: 'Core ERP',
    items: ['Finance', 'Procurement', 'Supply Chain', 'Manufacturing', 'Sales & More'],
  },
  {
    title: 'SuccessFactors',
    badge: 'HXM Suite',
    items: ['Employee Central', 'Recruiting', 'Onboarding', 'Performance & More'],
  },
  {
    title: 'Spend Management (Ariba)',
    badge: 'Procurement',
    items: ['Strategic Sourcing', 'Procurement', 'Supplier Management', 'Contracts & More'],
  },
  {
    title: 'Customer Experience',
    badge: 'CX & Commerce',
    items: ['Sales', 'Service', 'Commerce', 'Lead-to-Cash & More'],
  },
  {
    title: 'SAP BTP',
    badge: 'Integration & Dev',
    items: ['Integration', 'SAP Build', 'Extension Dev.', 'Data & Analytics'],
  },
  {
    title: 'SAP AI',
    badge: 'Innovation',
    items: ['Business AI', 'Joule & Agents', 'Generative AI', 'AI-enabled Delivery'],
  },
];

// ── ANIMATION WRAPPER ──
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

export default function TryvionLearningPlatform() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // Interactive HUD tab state for the platform dashboard preview
  const [activeHudTab, setActiveHudTab] = useState('My Learning');

  // Carousel slide index for capability domains (Section 4)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const maxCarouselIndex = Math.max(0, CAPABILITY_DOMAINS.length - 3);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxCarouselIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxCarouselIndex : prev - 1));
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
        .hero-academy-bg {
          background-color: #03050C !important;
          background-image:
            radial-gradient(circle at 75% 25%, rgba(37, 99, 235, 0.22) 0%, transparent 55%),
            radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.14) 0%, transparent 55%);
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
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }

        /* Specific section 3 layout proportions matching screenshot */
        .hub-section-grid {
          display: grid;
          grid-template-columns: 4fr 7.5fr;
          gap: 3.5rem;
          align-items: center;
        }

        .dashboard-container {
          display: grid;
          grid-template-columns: 76px 1fr;
          background-color: #080D1A;
          border-radius: 20px;
          border: 1px solid rgba(37, 99, 235, 0.35);
          box-shadow: 0 30px 80px rgba(0,0,0,0.85);
          overflow: hidden;
          width: 100%;
        }

        @media (max-width: 1200px) {
          .grid-5 { grid-template-columns: repeat(2, 1fr); }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .hub-section-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .grid-2, .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .dashboard-container {
            grid-template-columns: 1fr !important;
          }
          .dashboard-sidebar {
            flex-direction: row !important;
            overflow-x: auto;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 0.75rem !important;
          }
        }

        .hud-content {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main>
        {/* ── SECTION 01 — HERO & 4 PILLARS ── */}
        <section
          className="hero-academy-bg"
          style={{
            paddingTop: 'clamp(8rem, 12vw, 10rem)',
            paddingBottom: '6rem',
            paddingLeft: 'clamp(1rem, 4vw, 3rem)',
            paddingRight: 'clamp(1rem, 4vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            backgroundImage:
              'linear-gradient( 90deg, rgba(5, 10, 22, 0.96) 0%, rgba(5, 10, 22, 0.88) 42%, rgba(5, 10, 22, 0.58) 70%, rgba(5, 10, 22, 0.78) 100% ), url("/images/hero-future-learning-platforms.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                <Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>
                  Home
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <Link href="/services/academy" style={{ color: '#fff', textDecoration: 'none' }}>
                  Tryvion Academy
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
                  Tryvion Learning Platform (TLP)
                </span>
              </nav>
            </Reveal>

            <div className="grid-2" style={{ alignItems: 'center', marginBottom: '5rem' }}>
              <div>
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
                    TRYVION ACADEMY
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <h1
                    style={{
                      fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                      marginBottom: '1rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    TRYVION LEARNING PLATFORM (TLP)
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#60A5FA',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Where Learning Becomes Enterprise Capability.
                  </p>
                </Reveal>

                <Reveal delay={240}>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                      color: '#94A3B8',
                      marginBottom: '2rem',
                      maxWidth: '56ch',
                    }}
                  >
                    TLP is the digital learning environment inside TRYVION SkillVerse. It brings
                    together structured learning, practical application, real-world experience and
                    skill validation so you can build capabilities that create business impact.
                  </p>
                </Reveal>

                <Reveal delay={320}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href="#skillverse-platform"
                      style={{
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        padding: '0.85rem 1.75rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                      }}
                    >
                      Access SkillVerse <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="#learning-paths"
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
                      Watch Platform Tour <PlayCircle size={18} />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Side: Circular TLP Visualization */}
              <Reveal delay={200}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '380px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '240px',
                      height: '240px',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(15,23,42,0.9) 75%)',
                      border: '2px solid rgba(37,99,235,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      boxShadow: '0 0 50px rgba(37,99,235,0.3)',
                      zIndex: 2,
                      padding: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      TLP
                    </span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#60A5FA',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Digital Learning Environment
                    </span>
                  </div>

                  {/* Floating node badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10%',
                      right: '15%',
                      backgroundColor: '#0A0F1D',
                      border: '1px solid rgba(37,99,235,0.4)',
                      borderRadius: '10px',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <BookOpen size={16} style={{ color: '#60A5FA' }} /> Learn
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      right: '2%',
                      backgroundColor: '#0A0F1D',
                      border: '1px solid rgba(37,99,235,0.4)',
                      borderRadius: '10px',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <Cpu size={16} style={{ color: '#60A5FA' }} /> Practice
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      right: '20%',
                      backgroundColor: '#0A0F1D',
                      border: '1px solid rgba(37,99,235,0.4)',
                      borderRadius: '10px',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <ShieldCheck size={16} style={{ color: '#60A5FA' }} /> Validate
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '10%',
                      backgroundColor: '#0A0F1D',
                      border: '1px solid rgba(245,158,11,0.4)',
                      borderRadius: '10px',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <Sparkles size={16} style={{ color: '#F59E0B' }} /> Grow
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      top: '25%',
                      left: '12%',
                      backgroundColor: '#0A0F1D',
                      border: '1px solid rgba(37,99,235,0.4)',
                      borderRadius: '10px',
                      padding: '0.6rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <Users size={16} style={{ color: '#60A5FA' }} /> Experience
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 4 Hero Pillars Grid */}
            <div className="grid-4">
              {HERO_PILLARS.map((pillar, pIdx) => (
                <Reveal key={pIdx} delay={pIdx * 80}>
                  <div
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      height: '100%',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <div
                      style={{
                        color: '#60A5FA',
                        marginBottom: '1rem',
                        display: 'inline-block',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                      }}
                    >
                      {pillar.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#94A3B8',
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

        {/* ── SECTION 02 — HOW TLP WORKS (5-STEP JOURNEY WITH GRADIENT TIMELINE) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ maxWidth: '750px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  HOW TLP WORKS
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  A Journey That Builds Real Capability.
                </h2>
              </div>
            </Reveal>

            <div style={{ position: 'relative' }}>
              <div
                className="grid-5"
                style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 2 }}
              >
                {LEARNING_JOURNEY_STEPS.map((stepItem, sIdx) => (
                  <Reveal key={sIdx} delay={sIdx * 80}>
                    <div
                      className="glass-panel interactive-card"
                      style={{
                        padding: '2rem 1.5rem',
                        borderRadius: '16px',
                        height: '100%',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(37, 99, 235, 0.1)',
                          color: '#2563EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1.25rem',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                        }}
                      >
                        {stepItem.icon}
                      </div>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          color: '#2563EB',
                          display: 'block',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {stepItem.step}
                      </span>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {stepItem.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                        }}
                      >
                        {stepItem.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Bottom Gradient Timeline Bar */}
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  background:
                    'linear-gradient(90deg, #9333EA 0%, #3B82F6 35%, #06B6D4 65%, #10B981 85%, #F59E0B 100%)',
                  borderRadius: '4px',
                  position: 'relative',
                  marginTop: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: '-6px',
                    width: '100%',
                    padding: '0 8%',
                  }}
                >
                  {['#9333EA', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'].map((color, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#0A0F1D',
                        border: `3px solid ${color}`,
                        boxShadow: `0 0 10px ${color}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 03 — INSIDE TLP (EXACT DASHBOARD LAYOUT MATCHING SCREENSHOT) ── */}
        <section
          id="skillverse-platform"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
            <div className="hub-section-grid">
              {/* Left Side: Title & Checkmark Features */}
              <div>
                <Reveal>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: '#2563EB',
                      textTransform: 'uppercase',
                    }}
                  >
                    INSIDE TLP
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Everything You Need. In One Intelligent Learning Hub.
                  </h2>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: isDark ? '#94A3B8' : '#64748B',
                      marginBottom: '2rem',
                      lineHeight: 1.7,
                    }}
                  >
                    TRYVION Learning Platform integrates all essential learning capabilities into a
                    unified enterprise interface designed to accelerate mastery and skill readiness.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      marginBottom: '2.5rem',
                    }}
                  >
                    {TLP_FEATURES.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.875rem',
                          color: isDark ? '#CBD5E1' : '#334155',
                        }}
                      >
                        <CheckCircle2 size={16} style={{ color: '#2563EB', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Right Side: Exact Dashboard HUD matching Screenshot 1 */}
              <Reveal delay={150}>
                <div className="dashboard-container">
                  {/* Left Vertical Icon Bar Inside Dashboard */}
                  <div
                    className="dashboard-sidebar"
                    style={{
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                      padding: '1.25rem 0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1.5rem',
                      backgroundColor: 'rgba(3, 5, 12, 0.5)',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 15px rgba(37, 99, 235, 0.6)',
                        marginBottom: '0.5rem',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src="/images/Light_symbol_logo.png"
                        alt="TRYVION"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    </div>

                    {[
                      { label: 'My Learning', icon: <BookOpen size={18} /> },
                      { label: 'Learning Paths', icon: <Compass size={18} /> },
                      { label: 'Assessments', icon: <FileText size={18} /> },
                      { label: 'Certifications', icon: <Award size={18} /> },
                      { label: 'Progress', icon: <BarChart3 size={18} /> },
                      { label: 'Community', icon: <Users size={18} /> },
                    ].map((item, iIdx) => {
                      const isActive = activeHudTab === item.label;
                      return (
                        <button
                          key={iIdx}
                          title={item.label}
                          onClick={() => setActiveHudTab(item.label)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: isActive ? '#2563EB' : 'transparent',
                            color: isActive ? '#FFFFFF' : '#94A3B8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isActive ? '0 4px 12px rgba(37,99,235,0.4)' : 'none',
                          }}
                        >
                          {item.icon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Dashboard Screen Content View */}
                  <div
                    className="hud-content"
                    key={activeHudTab}
                    style={{
                      padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      minWidth: 0,
                    }}
                  >
                    {/* Header stats bar matching screenshot */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        paddingBottom: '0.85rem',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Welcome back, John!
                        </h4>
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                          Keep learning, Keep transforming.
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <span style={{ color: '#F59E0B', fontSize: '0.7rem' }}>⚡</span>
                          <div>
                            <span
                              style={{
                                display: 'block',
                                color: '#FFFFFF',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                              }}
                            >
                              7 days
                            </span>
                            <span style={{ color: '#94A3B8', fontSize: '0.62rem' }}>
                              Learning Streak
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <span style={{ color: '#60A5FA', fontSize: '0.7rem' }}>🎯</span>
                          <div>
                            <span
                              style={{
                                display: 'block',
                                color: '#FFFFFF',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                              }}
                            >
                              12
                            </span>
                            <span style={{ color: '#94A3B8', fontSize: '0.62rem' }}>
                              Skills in Progress
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <span style={{ color: '#10B981', fontSize: '0.7rem' }}>🏆</span>
                          <div>
                            <span
                              style={{
                                display: 'block',
                                color: '#FFFFFF',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                              }}
                            >
                              5
                            </span>
                            <span style={{ color: '#94A3B8', fontSize: '0.62rem' }}>
                              Certificates Earned
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tab 1: My Learning (Exact match to Screenshot 1) */}
                    {activeHudTab === 'My Learning' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Row 1: Continue Your Journey & Upcoming Session */}
                        <div
                          style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}
                        >
                          <div
                            style={{
                              backgroundColor: '#03050C',
                              border: '1px solid rgba(37, 99, 235, 0.35)',
                              borderRadius: '12px',
                              padding: '1.25rem',
                              position: 'relative',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  color: '#60A5FA',
                                  display: 'block',
                                  marginBottom: '0.3rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.05em',
                                }}
                              >
                                CONTINUE YOUR JOURNEY
                              </span>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  marginBottom: '1rem',
                                }}
                              >
                                <div
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    background: 'rgba(37, 99, 235, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#60A5FA',
                                  }}
                                >
                                  <BookOpen size={16} />
                                </div>
                                <div>
                                  <strong
                                    style={{
                                      fontSize: '0.9rem',
                                      color: '#FFFFFF',
                                      display: 'block',
                                    }}
                                  >
                                    SAP S/4HANA
                                  </strong>
                                  <span
                                    style={{
                                      fontSize: '0.8rem',
                                      color: '#CBD5E1',
                                      fontWeight: 600,
                                    }}
                                  >
                                    Clean Core Principles
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  fontSize: '0.7rem',
                                  color: '#94A3B8',
                                  marginBottom: '0.3rem',
                                }}
                              >
                                <span>68% Complete</span>
                                <span style={{ color: '#60A5FA' }}>In Progress</span>
                              </div>
                              <div
                                style={{
                                  width: '100%',
                                  height: '6px',
                                  backgroundColor: 'rgba(255,255,255,0.08)',
                                  borderRadius: '3px',
                                  marginBottom: '1rem',
                                }}
                              >
                                <div
                                  style={{
                                    width: '68%',
                                    height: '100%',
                                    backgroundColor: '#2563EB',
                                    borderRadius: '3px',
                                  }}
                                />
                              </div>
                              <button
                                style={{
                                  backgroundColor: '#2563EB',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                                }}
                              >
                                Continue Learning
                              </button>
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: '#03050C',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '12px',
                              padding: '1.25rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginBottom: '0.5rem',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.7rem',
                                    color: '#38BDF8',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  UPCOMING SESSION
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                    color: '#10B981',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '4px',
                                    fontWeight: 700,
                                  }}
                                >
                                  Live Session
                                </span>
                              </div>
                              <strong
                                style={{
                                  fontSize: '0.85rem',
                                  color: '#FFFFFF',
                                  display: 'block',
                                  marginBottom: '0.2rem',
                                }}
                              >
                                SAP S/4HANA Extension Strategy
                              </strong>
                              <p
                                style={{
                                  fontSize: '0.72rem',
                                  color: '#94A3B8',
                                  margin: '0 0 0.5rem 0',
                                }}
                              >
                                With Solution Architect
                                <br />
                                16 May, 2026 • 4:00 PM IST
                              </p>
                            </div>
                            <button
                              style={{
                                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                border: '1px solid #2563EB',
                                color: '#60A5FA',
                                padding: '0.5rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              Join Session
                            </button>
                          </div>
                        </div>

                        {/* Row 2: Your Learning Paths */}
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.65rem',
                            }}
                          >
                            <span
                              style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}
                            >
                              Your Learning Paths
                            </span>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                color: '#60A5FA',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              View All
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '0.75rem',
                            }}
                          >
                            {[
                              {
                                title: 'SAP S/4HANA Consultant',
                                level: 'Intermediate',
                                prog: '75%',
                              },
                              { title: 'SAP BTP Developer', level: 'Beginner', prog: '40%' },
                              { title: 'AI for Enterprise', level: 'Intermediate', prog: '20%' },
                            ].map((path, idx) => (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: '#03050C',
                                  padding: '0.85rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(255,255,255,0.06)',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '0.78rem',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    marginBottom: '0.2rem',
                                  }}
                                >
                                  {path.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.68rem',
                                    color: '#94A3B8',
                                    marginBottom: '0.5rem',
                                  }}
                                >
                                  {path.level}
                                </div>
                                <div
                                  style={{
                                    width: '100%',
                                    height: '4px',
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    borderRadius: '2px',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: path.prog,
                                      height: '100%',
                                      backgroundColor: '#2563EB',
                                      borderRadius: '2px',
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Row 3: Recommended for You */}
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.65rem',
                            }}
                          >
                            <span
                              style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF' }}
                            >
                              Recommended for You
                            </span>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                color: '#60A5FA',
                                cursor: 'pointer',
                                fontWeight: 600,
                              }}
                            >
                              View All
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '0.75rem',
                            }}
                          >
                            {[
                              {
                                title: 'SAP BTP Integration',
                                cat: 'Fundamentals',
                                rating: '4.8 ★',
                              },
                              { title: 'Joule & AI Agents', cat: 'Overview', rating: '4.7 ★' },
                              { title: 'Finance Process', cat: 'Mastery', rating: '4.9 ★' },
                              { title: 'Data Modeling', cat: 'Essentials', rating: '4.6 ★' },
                            ].map((rec, rIdx) => (
                              <div
                                key={rIdx}
                                style={{
                                  backgroundColor: '#03050C',
                                  padding: '0.75rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(255,255,255,0.06)',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '0.75rem',
                                    color: '#FFFFFF',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '0.15rem',
                                  }}
                                >
                                  {rec.title}
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    color: '#94A3B8',
                                    display: 'block',
                                    marginBottom: '0.4rem',
                                  }}
                                >
                                  {rec.cat}
                                </span>
                                <span
                                  style={{ fontSize: '0.65rem', color: '#F59E0B', fontWeight: 700 }}
                                >
                                  {rec.rating}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Learning Paths View */}
                    {activeHudTab === 'Learning Paths' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Active Enterprise Learning Paths
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {[
                            {
                              name: 'SAP S/4HANA Principal Consultant Track',
                              modules: '18 Modules',
                              duration: '120 Hours',
                              progress: '65%',
                            },
                            {
                              name: 'SAP BTP Full-Stack Integration Developer',
                              modules: '14 Modules',
                              duration: '90 Hours',
                              progress: '30%',
                            },
                            {
                              name: 'Enterprise AI & Joule Architect Track',
                              modules: '10 Modules',
                              duration: '60 Hours',
                              progress: '15%',
                            },
                          ].map((p, i) => (
                            <div
                              key={i}
                              style={{
                                backgroundColor: '#03050C',
                                padding: '1rem',
                                borderRadius: '10px',
                                border: '1px solid rgba(37,99,235,0.3)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <div>
                                <strong
                                  style={{
                                    fontSize: '0.85rem',
                                    color: '#FFFFFF',
                                    display: 'block',
                                    marginBottom: '0.2rem',
                                  }}
                                >
                                  {p.name}
                                </strong>
                                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                                  {p.modules} • {p.duration}
                                </span>
                              </div>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: '#60A5FA',
                                  fontWeight: 700,
                                  backgroundColor: 'rgba(37,99,235,0.15)',
                                  padding: '0.3rem 0.75rem',
                                  borderRadius: '6px',
                                }}
                              >
                                {p.progress}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Assessments View */}
                    {activeHudTab === 'Assessments' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Skill Checks & Examinations
                        </h4>
                        <div
                          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                        >
                          <div
                            style={{
                              backgroundColor: '#03050C',
                              padding: '1.25rem',
                              borderRadius: '10px',
                              border: '1px solid rgba(245,158,11,0.4)',
                            }}
                          >
                            <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 700 }}>
                              PENDING EXAM
                            </span>
                            <strong
                              style={{
                                fontSize: '0.9rem',
                                color: '#FFFFFF',
                                display: 'block',
                                margin: '0.3rem 0',
                              }}
                            >
                              Clean Core Architecture Exam
                            </strong>
                            <p
                              style={{
                                fontSize: '0.72rem',
                                color: '#94A3B8',
                                margin: '0 0 1rem 0',
                              }}
                            >
                              Duration: 45 Mins • 40 Questions
                            </p>
                            <button
                              style={{
                                backgroundColor: '#D97706',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '0.45rem 1rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              Start Exam
                            </button>
                          </div>
                          <div
                            style={{
                              backgroundColor: '#03050C',
                              padding: '1.25rem',
                              borderRadius: '10px',
                              border: '1px solid rgba(16,185,129,0.4)',
                            }}
                          >
                            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>
                              COMPLETED
                            </span>
                            <strong
                              style={{
                                fontSize: '0.9rem',
                                color: '#FFFFFF',
                                display: 'block',
                                margin: '0.3rem 0',
                              }}
                            >
                              SAP Financial Accounting Skill Check
                            </strong>
                            <p
                              style={{
                                fontSize: '0.72rem',
                                color: '#94A3B8',
                                margin: '0 0 1rem 0',
                              }}
                            >
                              Score: 92% • Passed on May 10, 2026
                            </p>
                            <span
                              style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}
                            >
                              View Certificate →
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 4: Certifications View */}
                    {activeHudTab === 'Certifications' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Verified Digital Credentials
                        </h4>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1.25rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                          }}
                        >
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '12px',
                              background: 'rgba(16,185,129,0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#10B981',
                            }}
                          >
                            <Award size={24} />
                          </div>
                          <div>
                            <strong
                              style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}
                            >
                              SAP S/4HANA Financial Accounting Professional
                            </strong>
                            <span style={{ fontSize: '0.72rem', color: '#10B981' }}>
                              Verified Blockchain Credential • Issued May 2026
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 5: Progress View */}
                    {activeHudTab === 'Progress' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Capability Telemetry & Analytics
                        </h4>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1.25rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(37,99,235,0.3)',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 700 }}>
                              Overall Enterprise Mastery Score
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#60A5FA', fontWeight: 700 }}>
                              88 / 100
                            </span>
                          </div>
                          <div
                            style={{
                              width: '100%',
                              height: '8px',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: '4px',
                              marginBottom: '1rem',
                            }}
                          >
                            <div
                              style={{
                                width: '88%',
                                height: '100%',
                                backgroundColor: '#10B981',
                                borderRadius: '4px',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                            You are in the top 5% of active learners across TRYVION SkillVerse.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tab 6: Community View */}
                    {activeHudTab === 'Community' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          Enterprise Practitioner Forums
                        </h4>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1rem',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <strong
                            style={{
                              fontSize: '0.85rem',
                              color: '#FFFFFF',
                              display: 'block',
                              marginBottom: '0.25rem',
                            }}
                          >
                            SAP BTP Integration Best Practices & AI Agents
                          </strong>
                          <p
                            style={{
                              fontSize: '0.72rem',
                              color: '#94A3B8',
                              margin: '0 0 0.5rem 0',
                            }}
                          >
                            Discussing secure extension patterns and custom cloud connectors.
                          </p>
                          <span style={{ fontSize: '0.68rem', color: '#60A5FA' }}>
                            342 active discussions • Last active 10m ago
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 04 — EXPLORE LEARNING AREAS (CAROUSEL MATCHING SCREENSHOT 2) ── */}
        <section
          id="learning-paths"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                  gap: '1.5rem',
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
                    EXPLORE LEARNING AREAS
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                    }}
                  >
                    Learn Across the Enterprise Technology Landscape.
                  </h2>
                </div>

                {/* Carousel Navigation Buttons matching screenshot 2 */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={prevSlide}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0',
                      border: 'none',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      border: 'none',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(37,99,235,0.4)',
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Carousel Track Container */}
            <div style={{ overflow: 'hidden', position: 'relative', paddingBottom: '1.5rem' }}>
              <motion.div
                animate={{ x: `calc(-${carouselIndex * (100 / 3)}% - ${carouselIndex * 1.33}rem)` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  width: `${(CAPABILITY_DOMAINS.length / 3) * 100}%`,
                }}
              >
                {CAPABILITY_DOMAINS.map((dom, dIdx) => (
                  <div
                    key={dIdx}
                    className="glass-panel interactive-card"
                    style={{
                      flex: '1 0 calc(33.333% - 1.35rem)',
                      padding: '2.25rem 2rem',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '360px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            border: '1px solid rgba(37, 99, 235, 0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#2563EB',
                          }}
                        >
                          <Cpu size={22} />
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'monospace',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            color: '#60A5FA',
                            padding: '0.25rem 0.7rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                          }}
                        >
                          {dom.badge}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {dom.title}
                      </h3>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: '0 0 1.5rem 0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.7rem',
                        }}
                      >
                        {dom.items.map((it, iIdx) => (
                          <li
                            key={iIdx}
                            style={{
                              fontSize: '0.9rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                            }}
                          >
                            <span
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: '#2563EB',
                              }}
                            />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="#skillverse-platform"
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
                      Explore Path &rarr;
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Pagination Dots matching screenshot 2 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              {Array.from({ length: maxCarouselIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCarouselIndex(dotIdx)}
                  style={{
                    width: carouselIndex === dotIdx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor:
                      carouselIndex === dotIdx
                        ? '#2563EB'
                        : isDark
                          ? 'rgba(255,255,255,0.2)'
                          : '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 05 — FOR INDIVIDUALS & FOR ORGANIZATIONS WITH BACKGROUND IMAGES ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="grid-2">
              {/* Build Your Future Card with Background Image */}
              <Reveal>
                <div
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom right, rgba(7, 11, 20, 0.15), rgba(15, 23, 42, 0.20)), url("/images/skillverse.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '3rem',
                    borderRadius: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(37, 99, 235, 0.35)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#60A5FA',
                        display: 'block',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      FOR INDIVIDUALS
                    </span>
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '1rem',
                      }}
                    >
                      Build Your Future.
                    </h3>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: '#ffffff',
                        lineHeight: 1.7,
                        marginBottom: '2rem',
                      }}
                    >
                      Whether you are a student, professional, <br />
                      consultant or leader, TLP helps you build <br />
                      in-demand skills and stay ahead.
                    </p>
                  </div>
                  <Link
                    href="#skillverse-platform"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      padding: '0.8rem 1.5rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: 'fit-content',
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>

              {/* Build Enterprise Capability Card with Background Image */}
              <Reveal delay={150}>
                <div
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom right, rgba(7, 11, 20, 0.50), rgba(15, 23, 42, 0.60)), url("/images/organisation-skillverse.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '3rem',
                    borderRadius: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(37, 99, 235, 0.35)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#60A5FA',
                        display: 'block',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      FOR ORGANIZATIONS
                    </span>
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '1rem',
                      }}
                    >
                      Build Enterprise Capability.
                    </h3>
                    <p
                      style={{
                        fontSize: '1rem',
                        color: '#FFFFFF',
                        lineHeight: 1.7,
                        marginBottom: '1.5rem',
                      }}
                    >
                      Create structured learning journeys for <br /> your teams, strengthen
                      capabilities, and <br />
                      accelerate transformation outcomes.
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '2rem',
                      }}
                    ></div>
                  </div>
                  <Link
                    href="#skillverse-platform"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      padding: '0.8rem 1.5rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: 'fit-content',
                      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SECTION 06 — FINAL CTA WITH BACKGROUND IMAGE ── */}
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
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  margin: '0 auto 1.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '2rem',
                  boxShadow: '0 0 30px rgba(37, 99, 235, 0.6)',
                  border: '2px solid rgba(255,255,255,0.2)',
                }}
              >
                <Image
                  src="/images/Light_symbol_logo.png"
                  alt="TRYVION"
                  width={40}
                  height={40}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

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
                Ready to experience TLP?
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Where Learning Becomes Enterprise Capability.
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                  marginBottom: '2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Access TRYVION SkillVerse and start your journey towards transformation-ready
                skills.
              </p>

              <div
                style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link
                  href="#skillverse-platform"
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    padding: '0.95rem 2.25rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
                  }}
                >
                  Access SkillVerse <ArrowRight size={18} />
                </Link>

                <Link
                  href="#learning-paths"
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
                  Talk to an Advisor <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
