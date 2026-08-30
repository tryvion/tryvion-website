'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
  ChevronRight,
  ArrowRight,
  Activity,
  CheckCircle2,
  Building2,
  Cpu,
  Sparkles,
  Target,
  Layers,
  Terminal,
  FileText,
  BarChart3,
  Check,
  Clock,
  UserCheck,
  TrendingUp,
  BrainCircuit,
  Compass,
  PlayCircle,
  Globe,
  Users,
  Briefcase,
  Bell,
  CheckCircle,
  MessageSquare,
  FileCheck,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES & ENTERPRISE CAPABILITY DOMAINS ──

const LEARNING_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Learn',
    description:
      'Access structured learning pathways across functional, technical, and emerging technology skills.',
  },
  {
    step: '02',
    title: 'Practice',
    description:
      'Apply concepts through exercises, scenarios, demonstrations, and practical assignments.',
  },
  {
    step: '03',
    title: 'Experience',
    description:
      'Learn through real-world examples, transformation stories, and practitioner insights.',
  },
  {
    step: '04',
    title: 'Validate',
    description: 'Assess knowledge through structured assessments and skill checks.',
  },
  {
    step: '05',
    title: 'Grow',
    description:
      'Build new capabilities, prepare for certifications, and develop skills aligned with future career opportunities.',
  },
];

const CAPABILITY_DOMAINS = [
  {
    category: 'SAP S/4HANA',
    title: 'SAP S/4HANA',
    description:
      'Cloud Public & Private Edition, GROW/RISE with SAP, Finance, Supply Chain, Procurement, Manufacturing, and Industry Solutions.',
    badge: 'Core ERP',
  },
  {
    category: 'SuccessFactors',
    title: 'SAP SuccessFactors',
    description:
      'Employee Central, Recruiting, Onboarding, Performance & Goals, Learning, Compensation, and Talent Management.',
    badge: 'HXM Suite',
  },
  {
    category: 'Spend Management',
    title: 'SAP Spend Management',
    description:
      'Strategic Sourcing, SAP Ariba, Procurement, Supplier Management, Contracts, and Business Network.',
    badge: 'Procurement',
  },
  {
    category: 'Customer Experience',
    title: 'SAP Customer Experience',
    description:
      'Sales, Service, Commerce, Customer Data, Lead-to-Cash, and customer experience transformation.',
    badge: 'CX & Commerce',
  },
  {
    category: 'BTP & AI',
    title: 'SAP BTP & AI',
    description:
      'SAP Business AI, Joule, Joule Agents, Integration, SAP Build, Clean Core, and enterprise automation.',
    badge: 'Innovation',
  },
];

const PRACTITIONERS = [
  {
    roleTitle: 'Experienced Consultants & Advisors',
    experience: 'Global implementation leaders',
    focus: 'Strategy, advisory, and complex enterprise solution architecture.',
  },
  {
    roleTitle: 'Program & Delivery Leaders',
    experience: 'Enterprise transformation directors',
    focus: 'Transformation governance, business process change, and stakeholder leadership.',
  },
  {
    roleTitle: 'Solution Architects',
    experience: 'Core technology specialists',
    focus: 'End-to-end integration, Clean Core strategy, and custom extension design.',
  },
  {
    roleTitle: 'AI & Innovation Specialists',
    experience: 'Emerging technology pioneers',
    focus: 'Practical enterprise AI adoption, Joule agents, and intelligent automation.',
  },
];

const CAREER_STAGES = [
  {
    stage: 'Students & Graduates',
    desc: 'Build an enterprise technology foundation and understand how business processes and technology come together.',
  },
  {
    stage: 'Early-Career Professionals',
    desc: 'Develop practical skills that help bridge the gap between certification and project readiness.',
  },
  {
    stage: 'Experienced Consultants',
    desc: 'Deepen expertise, cross-skill into new areas, and stay current with evolving enterprise technologies.',
  },
  {
    stage: 'Architects & Leaders',
    desc: 'Explore advanced transformation, architecture, AI, Clean Core, and strategic technology topics.',
  },
  {
    stage: 'Organisations',
    desc: 'Create structured learning journeys to build capability, accelerate transformation, and strengthen internal talent.',
  },
];

const ROLE_PATHS = [
  {
    role: 'Functional Consultant',
    desc: 'Understand business processes, configuration, solution design, and implementation.',
  },
  {
    role: 'Technical Consultant',
    desc: 'Build skills across development, integration, extensions, data, and automation.',
  },
  {
    role: 'Solution Architect',
    desc: 'Connect processes, applications, integration, data, and technology into an end-to-end architecture.',
  },
  {
    role: 'Business Analyst',
    desc: 'Develop process knowledge, requirements skills, and solution understanding.',
  },
  {
    role: 'Project & Program Leader',
    desc: 'Learn governance, transformation planning, delivery management, and stakeholder leadership.',
  },
  {
    role: 'AI & Innovation Specialist',
    desc: 'Develop skills across enterprise AI, agents, automation, and emerging technologies.',
  },
];

const PLATFORM_FEATURES = [
  'Practitioner-Led Learning directly from real transformation leaders',
  'Practical exercises, scenarios, and demonstrations',
  'Structured assessments and skill verification checks',
  'End-to-end enterprise perspective connecting functional and technical capabilities',
  'Continuous development paths across career stages',
];

const TRUSTED_ORGANIZATIONS = [
  'GLOBAL ENTERPRISES',
  'CONSULTING LEADERS',
  'TRANSFORMATION PARTNERS',
  'FINANCIAL INSTITUTIONS',
  'MANUFACTURING GIANTS',
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

export default function TryvionAcademyPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // Interactive state for the Hero HUD preview card
  const [activeHudTab, setActiveHudTab] = useState('My Learning');
  const [hudProgress, setHudProgress] = useState(60);

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
        /* 50/50 Grid columns */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }

        /* HUD Card Grid Layout */
        .hero-hud-card {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1200px) {
          .grid-5 { grid-template-columns: repeat(2, 1fr); }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .grid-2, .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .hero-hud-card {
            grid-template-columns: 1fr !important;
          }
          .hero-hud-sidebar {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding-right: 0 !important;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
          }
          .hud-journey-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .hud-content {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main>
        {/* ── 1. HERO SECTION WITH SKILLVERSE PREVIEW HUD ── */}
        <section
          className="hero-academy-bg"
          style={{
            paddingTop: 'clamp(8rem, 12vw, 10rem)',
            paddingBottom: '6rem',
            paddingLeft: 'clamp(1rem, 4vw, 3rem)',
            paddingRight: 'clamp(1rem, 4vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                  color: '#94A3B8',
                  marginBottom: '1.5rem',
                }}
              >
                <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Services
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6 }} />
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>TRYVION Academy</span>
              </nav>
            </Reveal>

            <div className="grid-2" style={{ alignItems: 'center' }}>
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
                    TRYVION Academy
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <h1
                    style={{
                      fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                      fontWeight: 800,
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                      marginBottom: '1.25rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Build Skills That Matter.
                  </h1>
                </Reveal>

                <Reveal delay={240}>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: '#94A3B8',
                      marginBottom: '2rem',
                      maxWidth: '56ch',
                    }}
                  >
                    TRYVION SkillVerse is a global learning platform designed to make high-quality
                    enterprise technology knowledge accessible to professionals, students, and
                    organisations worldwide.
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
                      Explore TRYVION SkillVerse <ArrowRight size={18} />
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
                      Explore Learning Paths <ArrowRight size={18} />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Side: SkillVerse Dashboard HUD Preview */}
              <Reveal delay={200}>
                <div
                  className="hero-hud-card"
                  style={{
                    backgroundColor: '#0A0F1D',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.35)',
                    padding: 'clamp(1rem, 3vw, 1.75rem)',
                    boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {/* Left Sidebar inside HUD */}
                  <div
                    className="hero-hud-sidebar"
                    style={{
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                      paddingRight: '1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
                        color: '#60A5FA',
                      }}
                    >
                      <GraduationCap size={22} />
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          color: '#FFFFFF',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        SKILLVERSE
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rm' }}>
                      {[
                        { label: 'My Learning', icon: <BookOpen size={15} /> },
                        { label: 'Learning Paths', icon: <Compass size={15} /> },
                        { label: 'Assessments', icon: <FileText size={15} /> },
                        { label: 'Certifications', icon: <Award size={15} /> },
                        { label: 'Progress', icon: <BarChart3 size={15} /> },
                        { label: 'Community', icon: <Users size={15} /> },
                      ].map((item, iIdx) => {
                        const isActive = activeHudTab === item.label;
                        return (
                          <button
                            key={iIdx}
                            onClick={() => setActiveHudTab(item.label)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              padding: '0.6rem 0.75rem',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: isActive ? '#2563EB' : 'transparent',
                              color: isActive ? '#FFFFFF' : '#94A3B8',
                              fontSize: '0.8rem',
                              fontWeight: isActive ? 700 : 500,
                              cursor: 'pointer',
                              textAlign: 'left',
                              width: '100%',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Content Area inside HUD - DYNAMIC BASED ON ACTIVE TAB */}
                  <div className="hud-content" key={activeHudTab} style={{ minWidth: 0 }}>
                    {/* Header bar inside HUD */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1.25rem',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        paddingBottom: '0.75rem',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                        Welcome back, Learner
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ position: 'relative', cursor: 'pointer', color: '#94A3B8' }}>
                          <Bell size={16} />
                          <span
                            style={{
                              position: 'absolute',
                              top: -2,
                              right: -2,
                              width: 6,
                              height: 6,
                              backgroundColor: '#2563EB',
                              borderRadius: '50%',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: '#2563EB',
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          AK
                        </div>
                      </div>
                    </div>

                    {/* DYNAMIC SCREENS */}

                    {/* 1. MY LEARNING TAB */}
                    {activeHudTab === 'My Learning' && (
                      <>
                        <div style={{ marginBottom: '1.25rem' }}>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#94A3B8',
                              display: 'block',
                              marginBottom: '0.6rem',
                            }}
                          >
                            My Learning Journey
                          </span>
                          <div
                            className="hud-journey-grid"
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1.2fr 1fr',
                              gap: '0.75rem',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: '#03050C',
                                border: '1px solid rgba(37, 99, 235, 0.3)',
                                borderRadius: '10px',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
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
                                  SAP S/4HANA
                                </strong>
                                <span
                                  style={{
                                    fontSize: '0.78rem',
                                    color: '#94A3B8',
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                  }}
                                >
                                  Clean Core Principles
                                </span>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '0.7rem',
                                    color: '#60A5FA',
                                    marginBottom: '0.3rem',
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  <span>{hudProgress}% Complete</span>
                                  <span>Module 4/6</span>
                                </div>
                                <div
                                  style={{
                                    height: '5px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                    marginBottom: '0.75rem',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${hudProgress}%`,
                                      height: '100%',
                                      backgroundColor: '#2563EB',
                                      borderRadius: '3px',
                                    }}
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  setHudProgress((prev) => (prev >= 90 ? 60 : prev + 10))
                                }
                                style={{
                                  backgroundColor: '#2563EB',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  padding: '0.4rem 0.75rem',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                }}
                              >
                                Continue Learning
                              </button>
                            </div>

                            <div
                              style={{
                                backgroundColor: '#03050C',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '10px',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontSize: '0.7rem',
                                    color: '#94A3B8',
                                    display: 'block',
                                    marginBottom: '0.2rem',
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  Next Up
                                </span>
                                <strong
                                  style={{
                                    fontSize: '0.82rem',
                                    color: '#FFFFFF',
                                    display: 'block',
                                    marginBottom: '0.3rem',
                                  }}
                                >
                                  S/4HANA Extension Strategy
                                </strong>
                                <span style={{ fontSize: '0.7rem', color: '#60A5FA' }}>
                                  Module 5 - 40m
                                </span>
                              </div>
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: '#60A5FA',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.2rem',
                                  cursor: 'pointer',
                                }}
                              >
                                View Details &rarr;
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#94A3B8',
                              display: 'block',
                              marginBottom: '0.5rem',
                            }}
                          >
                            Skills in Progress
                          </span>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {[
                              'Business Process',
                              'Configuration',
                              'Architecture',
                              'Transformation',
                            ].map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                style={{
                                  fontSize: '0.7rem',
                                  backgroundColor: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  color: '#CBD5E1',
                                  padding: '0.25rem 0.55rem',
                                  borderRadius: '6px',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: '#94A3B8',
                              display: 'block',
                              marginBottom: '0.5rem',
                            }}
                          >
                            Recent Achievements
                          </span>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: '0.5rem',
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: '#03050C',
                                padding: '0.6rem',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <ShieldCheck size={16} style={{ color: '#10B981' }} />
                              <div>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    color: '#10B981',
                                    display: 'block',
                                    fontWeight: 700,
                                  }}
                                >
                                  Assessment Passed
                                </span>
                                <span
                                  style={{ fontSize: '0.7rem', color: '#FFFFFF', fontWeight: 600 }}
                                >
                                  Clean Core Principles
                                </span>
                              </div>
                            </div>
                            <div
                              style={{
                                backgroundColor: '#03050C',
                                padding: '0.6rem',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <Award size={16} style={{ color: '#60A5FA' }} />
                              <div>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    color: '#60A5FA',
                                    display: 'block',
                                    fontWeight: 700,
                                  }}
                                >
                                  Certificate Earned
                                </span>
                                <span
                                  style={{ fontSize: '0.7rem', color: '#FFFFFF', fontWeight: 600 }}
                                >
                                  SAP S/4HANA Found.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* 2. LEARNING PATHS TAB */}
                    {activeHudTab === 'Learning Paths' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            display: 'block',
                          }}
                        >
                          Recommended For You
                        </span>
                        {[
                          { title: 'SAP BTP Integration', mods: 8, time: '12h' },
                          { title: 'SuccessFactors HCM Core', mods: 5, time: '8h' },
                        ].map((path, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: '#03050C',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(37, 99, 235, 0.2)',
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
                                {path.title}
                              </strong>
                              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                                {path.mods} Modules • Est. {path.time}
                              </span>
                            </div>
                            <button
                              style={{
                                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                color: '#60A5FA',
                                border: '1px solid rgba(37,99,235,0.3)',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                            >
                              Enroll
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. ASSESSMENTS TAB */}
                    {activeHudTab === 'Assessments' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            display: 'block',
                          }}
                        >
                          Pending & Completed
                        </span>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderLeft: '3px solid #F59E0B',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>
                              S/4HANA Finance Quiz
                            </strong>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                color: '#FCD34D',
                                padding: '0.2rem 0.4rem',
                                borderRadius: '4px',
                              }}
                            >
                              Due in 2 days
                            </span>
                          </div>
                          <button
                            style={{
                              backgroundColor: '#F59E0B',
                              color: '#000',
                              border: 'none',
                              padding: '0.3rem 0.8rem',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            Take Now
                          </button>
                        </div>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderLeft: '3px solid #10B981',
                          }}
                        >
                          <strong
                            style={{
                              fontSize: '0.85rem',
                              color: '#FFFFFF',
                              display: 'block',
                              marginBottom: '0.2rem',
                            }}
                          >
                            Clean Core Assessment
                          </strong>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: '#10B981',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}
                          >
                            <CheckCircle2 size={12} /> Completed • Score: 92%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 4. CERTIFICATIONS TAB */}
                    {activeHudTab === 'Certifications' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            display: 'block',
                          }}
                        >
                          Earned Badges
                        </span>
                        <div
                          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                        >
                          {[
                            { name: 'S/4HANA Foundation', date: 'Aug 2026' },
                            { name: 'Business AI Specialist', date: 'Jul 2026' },
                          ].map((cert, idx) => (
                            <div
                              key={idx}
                              style={{
                                backgroundColor: '#03050C',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                textAlign: 'center',
                              }}
                            >
                              <Award
                                size={28}
                                style={{ color: '#2563EB', margin: '0 auto 0.5rem' }}
                              />
                              <strong
                                style={{ fontSize: '0.75rem', color: '#FFFFFF', display: 'block' }}
                              >
                                {cert.name}
                              </strong>
                              <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>
                                Issued: {cert.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 5. PROGRESS TAB */}
                    {activeHudTab === 'Progress' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            display: 'block',
                          }}
                        >
                          Performance Overview
                        </span>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.75rem',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: '#03050C',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(37,99,235,0.2)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.7rem',
                                color: '#60A5FA',
                                display: 'block',
                                marginBottom: '0.2rem',
                              }}
                            >
                              Total Hours
                            </span>
                            <strong style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>45h</strong>
                          </div>
                          <div
                            style={{
                              backgroundColor: '#03050C',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(16,185,129,0.2)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.7rem',
                                color: '#34D399',
                                display: 'block',
                                marginBottom: '0.2rem',
                              }}
                            >
                              Avg. Score
                            </span>
                            <strong style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>88%</strong>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: '#03050C',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: '#FFFFFF',
                              display: 'block',
                              marginBottom: '0.5rem',
                            }}
                          >
                            Modules Completed
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                              style={{
                                flexGrow: 1,
                                height: '6px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '3px',
                              }}
                            >
                              <div
                                style={{
                                  width: '75%',
                                  height: '100%',
                                  backgroundColor: '#2563EB',
                                  borderRadius: '3px',
                                }}
                              ></div>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700 }}>
                              12/16
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. COMMUNITY TAB */}
                    {activeHudTab === 'Community' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#94A3B8',
                            display: 'block',
                          }}
                        >
                          Recent Discussions
                        </span>
                        {[
                          {
                            title: 'Best practices for Joule Agents?',
                            replies: 12,
                            time: '2h ago',
                          },
                          { title: 'S/4HANA Public vs Private Cloud', replies: 34, time: '5h ago' },
                        ].map((thread, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: '#03050C',
                              padding: '0.85rem 1rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            <strong
                              style={{
                                fontSize: '0.8rem',
                                color: '#FFFFFF',
                                display: 'block',
                                marginBottom: '0.4rem',
                              }}
                            >
                              {thread.title}
                            </strong>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.65rem',
                                  color: '#60A5FA',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem',
                                }}
                              >
                                <MessageSquare size={10} /> {thread.replies} Replies
                              </span>
                              <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>
                                {thread.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. WHY TRYVION ACADEMY (BEYOND TRADITIONAL TRAINING) ── */}
        <section
          style={{
            padding: '6rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                  Enterprise Capability Building
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Beyond Traditional Training
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                    lineHeight: 1.7,
                  }}
                >
                  The pace of technological change demands more than conventional training courses.
                  Professionals and organisations need capabilities that can be applied directly in
                  the real enterprise.
                </p>
              </div>
            </Reveal>

            <div className="grid-4">
              {[
                {
                  title: 'Structured Learning',
                  desc: 'Curated pathways designed around functional, technical, and emerging skills.',
                },
                {
                  title: 'Practical Experience',
                  desc: 'Real-world scenarios, demonstrations, and practical assignments.',
                },
                {
                  title: 'Mentoring',
                  desc: 'Guidance from experienced practitioners who have led transformation programs.',
                },
                {
                  title: 'Continuous Development',
                  desc: 'Ongoing skill growth aligned with future career and enterprise opportunities.',
                },
              ].map((item, iIdx) => (
                <Reveal key={iIdx} delay={iIdx * 80}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '12px',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#60A5FA',
                        marginBottom: '1.25rem',
                        fontWeight: 800,
                      }}
                    >
                      0{iIdx + 1}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. FROM KNOWLEDGE TO PROJECT READINESS (MAJOR DIFFERENTIATOR) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
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
                    The Skill-Gap Solution
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    From Knowledge to Project Readiness
                  </h2>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      color: isDark ? '#94A3B8' : '#64748B',
                      marginBottom: '1.5rem',
                      lineHeight: 1.7,
                    }}
                  >
                    Certification alone does not always make someone project-ready. TRYVION
                    SkillVerse is engineered to close that gap by combining multiple dimensions of
                    enterprise competence into a single cohesive learning model.
                  </p>
                  <div
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      color: isDark ? '#93C5FD' : '#1E40AF',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                    }}
                  >
                    “TRYVION SkillVerse is designed to help professionals transition from theory to
                    implementation, and from implementation to business value.”
                  </div>
                </Reveal>
              </div>

              {/* Formula Display Card */}
              <Reveal delay={150}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      color: '#60A5FA',
                      display: 'block',
                      marginBottom: '1.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Capability Building Formula
                  </span>

                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[
                      'Conceptual Knowledge',
                      'System Understanding',
                      'Business Process Context',
                      'Real Project Scenarios',
                      'Practitioner Experience',
                    ].map((comp, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          backgroundColor: 'rgba(37, 99, 235, 0.08)',
                          borderRadius: '8px',
                          border: '1px solid rgba(37, 99, 235, 0.15)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        <Check size={16} style={{ color: '#2563EB' }} />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: '1.25rem',
                      padding: '1rem',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.5)',
                    }}
                  >
                    = Transformation-Ready Skills
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 4. THE SKILLVERSE LEARNING EXPERIENCE (5-STEP FRAMEWORK) ── */}
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
                  The Learning Framework
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Designed for Real-World Impact
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  A structured progression designed to take learners from foundational awareness to
                  verified enterprise competence.
                </p>
              </div>
            </Reveal>

            <div className="grid-5">
              {LEARNING_JOURNEY_STEPS.map((stepItem, sIdx) => (
                <Reveal key={sIdx} delay={sIdx * 80}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '12px',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        color: '#2563EB',
                        display: 'block',
                        marginBottom: '1rem',
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
                        fontSize: '0.875rem',
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
          </div>
        </section>

        {/* ── 5. LEARN WHAT THE INDUSTRY NEEDS (CAPABILITY DOMAINS) ── */}
        <section
          id="learning-paths"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Enterprise Technology Landscape
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Comprehensive Capabilities Across Key Technologies
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Learning pathways designed around real business processes and the core solutions
                  organisations rely on.
                </p>
              </div>
            </Reveal>

            <div className="grid-5">
              {CAPABILITY_DOMAINS.map((dom, dIdx) => (
                <Reveal key={dIdx} delay={dIdx * 60}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem 1.5rem',
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
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
                            padding: '0.6rem',
                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                            borderRadius: '8px',
                            color: '#60A5FA',
                          }}
                        >
                          <Cpu size={20} />
                        </div>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'monospace',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            color: '#60A5FA',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                          }}
                        >
                          {dom.badge}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {dom.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                          marginBottom: '1.5rem',
                        }}
                      >
                        {dom.description}
                      </p>
                    </div>

                    <Link
                      href="#skillverse-platform"
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
                      Explore Pathway &rarr;
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. LEARN FROM PEOPLE WHO HAVE DONE THE WORK ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
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
                  Practitioner-Led Pedagogy
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Learn from People Who Have Done the Work
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                    lineHeight: 1.7,
                  }}
                >
                  Our instructors and advisors bring decades of global transformation experience.
                  Learners understand not only how a solution works, but why organisations make
                  certain choices and how experienced practitioners solve complex challenges.
                </p>
              </Reveal>
            </div>

            <div className="grid-4">
              {PRACTITIONERS.map((pr, pIdx) => (
                <Reveal key={pIdx} delay={pIdx * 80}>
                  <div
                    className="glass-panel interactive-card"
                    style={{
                      padding: '2rem',
                      borderRadius: '16px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
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
                        <UserCheck size={24} />
                      </div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {pr.roleTitle}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          color: '#60A5FA',
                          display: 'block',
                          marginBottom: '1rem',
                        }}
                      >
                        {pr.experience}
                      </span>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.6,
                        }}
                      >
                        {pr.focus}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: '1.5rem',
                        paddingTop: '1rem',
                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                        fontSize: '0.78rem',
                        color: '#2563EB',
                        fontWeight: 700,
                      }}
                    >
                      Verified Enterprise Expert &rarr;
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. LEARNING FOR EVERY STAGE OF YOUR CAREER & ROLES ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
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
                  Career & Role Progression
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Learning for Every Stage & Enterprise Role
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Structured capability pathways tailored to your professional level and enterprise
                  responsibilities.
                </p>
              </Reveal>
            </div>

            {/* Career Stages Grid */}
            <div style={{ marginBottom: '5rem' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                By Career Stage
              </h3>
              <div className="grid-5">
                {CAREER_STAGES.map((cs, cIdx) => (
                  <Reveal key={cIdx} delay={cIdx * 60}>
                    <div
                      className="glass-panel interactive-card"
                      style={{ padding: '1.75rem 1.25rem', borderRadius: '12px', height: '100%' }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          color: '#60A5FA',
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: 700,
                        }}
                      >
                        STAGE 0{cIdx + 1}
                      </span>
                      <h4
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {cs.stage}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.5,
                        }}
                      >
                        {cs.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Role-Based Paths Grid */}
            <div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                By Enterprise Role
              </h3>
              <div className="grid-3">
                {ROLE_PATHS.map((rp, rIdx) => (
                  <Reveal key={rIdx} delay={rIdx * 60}>
                    <div
                      className="glass-panel interactive-card"
                      style={{
                        padding: '1.75rem',
                        borderRadius: '12px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.75rem',
                            color: '#2563EB',
                          }}
                        >
                          <Briefcase size={18} />
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              fontFamily: 'monospace',
                            }}
                          >
                            Role Pathway
                          </span>
                        </div>
                        <h4
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 800,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {rp.role}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            lineHeight: 1.6,
                          }}
                        >
                          {rp.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. BEYOND SAP SECTION ── */}
        <section
          style={{
            padding: '6rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
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
                Future Horizons
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  marginTop: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                Beyond SAP — Built for the Future of Enterprise Skills
              </h2>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: isDark ? '#94A3B8' : '#64748B',
                  maxWidth: '750px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.7,
                }}
              >
                While SkillVerse starts with a robust SAP foundation, our ambition extends across
                the broader enterprise technology landscape. Future expansion areas include
                Artificial Intelligence, Data & Analytics, Cloud, Integration, Automation, and
                Enterprise Architecture.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 9. INSIDE SKILLVERSE PLATFORM SECTION ── */}
        <section
          id="skillverse-platform"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
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
                    Inside SkillVerse
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    A Learning Platform Built for Real Growth
                  </h2>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      color: isDark ? '#94A3B8' : '#64748B',
                      marginBottom: '2rem',
                      lineHeight: 1.7,
                    }}
                  >
                    TRYVION SkillVerse provides the execution environment, telemetry tracking, and
                    collaborative tools needed to build enterprise-grade technical capability.
                  </p>

                  <div style={{ display: 'grid', gap: '0.85rem', marginBottom: '2.5rem' }}>
                    {PLATFORM_FEATURES.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.95rem',
                          color: isDark ? '#CBD5E1' : '#334155',
                        }}
                      >
                        <CheckCircle2 size={18} style={{ color: '#2563EB', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="#skillverse-platform"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      padding: '0.9rem 2rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    Explore the Platform <ArrowRight size={18} />
                  </Link>
                </Reveal>
              </div>

              {/* Right Side: Platform Ecosystem Graphic Card */}
              <Reveal delay={150}>
                <div
                  style={{
                    backgroundColor: '#0A0F1D',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.35)',
                    padding: '2.5rem',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        fontFamily: 'monospace',
                      }}
                    >
                      SKILLVERSE :: ECOSYSTEM_CORE
                    </span>
                    <span
                      style={{ fontSize: '0.75rem', color: '#60A5FA', fontFamily: 'monospace' }}
                    >
                      ACTIVE COHORT
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {[
                      { title: 'Practitioner Insights', desc: 'Real transformation stories' },
                      { title: 'Interactive Labs', desc: 'Hands-on scenarios & assignments' },
                      { title: 'Skill Validation', desc: 'Rigorous knowledge checks' },
                      { title: 'Enterprise Paths', desc: 'Role-based capability mapping' },
                    ].map((box, bIdx) => (
                      <div
                        key={bIdx}
                        style={{
                          backgroundColor: '#03050C',
                          padding: '1.25rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <strong
                          style={{
                            fontSize: '0.9rem',
                            color: '#FFFFFF',
                            display: 'block',
                            marginBottom: '0.3rem',
                          }}
                        >
                          {box.title}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{box.desc}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      padding: '1rem',
                      backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: '#60A5FA', fontWeight: 700 }}>
                      One Platform. Limitless Skills. Global Possibilities.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 10. OUR VISION & ORGANISATIONAL CAPABILITY ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
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
                    Our Vision
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Democratizing Enterprise Technology Knowledge
                  </h2>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      color: isDark ? '#94A3B8' : '#64748B',
                      marginBottom: '1.5rem',
                      lineHeight: 1.7,
                    }}
                  >
                    Talent exists everywhere. Access to high-quality learning and experienced
                    practitioners does not. TRYVION SkillVerse aims to bridge that gap by creating a
                    global ecosystem where knowledge is shared, capabilities are built, and people
                    are empowered to participate in the future of enterprise technology.
                  </p>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60A5FA' }}>
                    One Platform. Limitless Skills. Global Possibilities.
                  </div>
                </Reveal>
              </div>

              <div>
                <Reveal delay={150}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: '#2563EB',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Organisational Capability
                    </span>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '1rem',
                      }}
                    >
                      Building Internal Capability at Scale
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        marginBottom: '1.5rem',
                        lineHeight: 1.6,
                      }}
                    >
                      Empower your enterprise with structured learning journeys designed to
                      strengthen internal talent, accelerate transformation milestones, and
                      establish enduring technology capabilities.
                    </p>
                    <Link
                      href="#skillverse-platform"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #2563EB',
                        color: '#60A5FA',
                        padding: '0.75rem 1.5rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      Explore Enterprise Learning <ArrowRight size={16} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. FINAL CTA SECTION ── */}
        <section
          className="hero-academy-bg"
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
                Begin Your Journey
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
                Learn. Practice. Transform. Grow.
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#94A3B8',
                  marginBottom: '2.5rem',
                  lineHeight: 1.7,
                }}
              >
                Join TRYVION SkillVerse and build transformation-ready capabilities with guidance
                from experienced enterprise practitioners.
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
                  Explore TRYVION SkillVerse <ArrowRight size={18} />
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
                  Explore Learning Paths <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
