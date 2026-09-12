'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Briefcase,
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
  Plus,
  Minus,
  Sliders,
  FileText,
  BarChart3,
  Check,
  RefreshCw,
  Clock,
  UserCheck,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Scale,
  Compass,
  FileCheck,
  Search,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES & DATASETS ──

const RUNWAY_STAGES = [
  {
    stage: '01',
    id: 'stage-1',
    title: 'Business Context Mapping',
    subtitle: 'Gate 1: Strategy & Environment Audit',
    passRate: '100% Alignment Baseline',
    metrics: { duration: '24-48 Hours', auditDepth: '4 Core Pillars', stakeholderSync: '100%' },
    description:
      'Deep evaluation of target architecture, legacy debt, team friction vectors, and growth trajectory before sourcing begins.',
    keyActions: [
      'Technical Debt & Ecosystem Mapping',
      'Leadership & Cultural Friction Audit',
      'Target Velocity & Key Result Definition',
    ],
  },
  {
    stage: '02',
    id: 'stage-2',
    title: 'Peer Technical Defense',
    subtitle: 'Gate 2: Active Principal Architect Audit',
    passRate: 'Top 4% Candidates Pass',
    metrics: {
      defenseLength: '90 Minutes',
      codeAudit: 'Clean Core Focus',
      panelSize: '2 Principal Architects',
    },
    description:
      'Candidates defend real-world system designs, live refactoring, and enterprise architectural scenarios before active Principal Engineers.',
    keyActions: [
      'Live Architectural System Design Defense',
      'Code Base Audit & Refactoring Sandbox',
      'Scalability & Integration Security Check',
    ],
  },
  {
    stage: '03',
    id: 'stage-3',
    title: 'Transformation Culture Fit',
    subtitle: 'Gate 3: Execution Velocity & Leadership',
    passRate: 'High Change Agility Score',
    metrics: { assessmentIndex: '6 Vectors', adaptabilityScore: '94%+', leadershipFit: 'Verified' },
    description:
      'Behavioral and situational stress testing to ensure the candidate thrives under enterprise change, cross-functional ambiguity, and deadline pressure.',
    keyActions: [
      'Cross-Functional Communication Matrix',
      'Crisis Scenario Stress Test',
      'Enterprise Change Management Aptitude',
    ],
  },
  {
    stage: '04',
    id: 'stage-4',
    title: 'Curated Single Shortlist',
    subtitle: 'Gate 4: 1-2 Perfectly Aligned Leaders',
    passRate: 'Zero Resume Noise',
    metrics: {
      candidatesPresented: '1 to 2 Max',
      interviewToOffer: '88%',
      timeSaved: '35+ Board Hours',
    },
    description:
      'We eliminate CV noise by delivering a fully vetted, anonymized candidate dossier backed by technical defense scoring.',
    keyActions: [
      'Anonymized Executive Dossier Delivery',
      'Complete Peer Assessment Transcripts',
      'Board-Ready Presentation Sync',
    ],
  },
  {
    stage: '05',
    id: 'stage-5',
    title: '90-Day Ramp Guarantee',
    subtitle: 'Gate 5: Active Onboarding & Academy Upskilling',
    passRate: '96.8% 12-Month Retention',
    metrics: {
      warrantyPeriod: '90 Days Risk-Free',
      upskillingHours: '40+ Hrs/Yr',
      retentionRate: '96.8%',
    },
    description:
      'Post-placement integration supported by TRYVION Academy for continuous skill evolution and active executive check-ins.',
    keyActions: [
      'Custom TRYVION Academy Onboarding Path',
      'Bi-Weekly 30-60-90 Day Ramp Audits',
      'Full Placement Replacement Assurance',
    ],
  },
];

const DOMAIN_RADAR_VECTORS = [
  {
    label: 'Tech Stack Depth',
    tryvionScore: 98,
    genericScore: 42,
    detail: 'Evaluated by Principal Architects, not resume keywords.',
  },
  {
    label: 'Business Acumen',
    tryvionScore: 94,
    genericScore: 35,
    detail: 'Direct alignment with P&L, process flows, and ERP ROI.',
  },
  {
    label: 'Team Friction Index',
    tryvionScore: 96,
    genericScore: 28,
    detail: 'Pre-screened for cultural fit and cross-functional leadership.',
  },
  {
    label: 'Growth Scalability',
    tryvionScore: 92,
    genericScore: 50,
    detail: 'Capacity to evolve into VP and Enterprise Architect roles.',
  },
  {
    label: 'Cultural Alignment',
    tryvionScore: 95,
    genericScore: 40,
    detail: 'Tested for transformation velocity and crisis resilience.',
  },
  {
    label: 'Delivery Velocity',
    tryvionScore: 97,
    genericScore: 30,
    detail: 'Immediate impact within 14 days of enterprise onboarding.',
  },
];

const RETENTION_CALCULATOR_PRESETS = [
  { years: 1, baseRetention: 85, academyBoost: 11.8, totalRetention: 96.8 },
  { years: 2, baseRetention: 72, academyBoost: 22.4, totalRetention: 94.4 },
  { years: 3, baseRetention: 60, academyBoost: 32.1, totalRetention: 92.1 },
];

const DOSSIER_SAMPLE = {
  candidateId: 'PERM-EXEC-9021',
  role: 'VP of Enterprise Architecture & Digital Transformation',
  experience: '16+ Years Experience',
  vectors: [
    { name: 'Architecture System Design', score: '99/100' },
    { name: 'Clean Core & Cloud Native', score: '97/100' },
    { name: 'Transformation Leadership', score: '95/100' },
    { name: 'Stakeholder & P&L Management', score: '96/100' },
  ],
  pastImpact: [
    'Led $45M ERP modernization for Fortune 500 industrial conglomerate with zero downtime.',
    'Orchestrated side-by-side BTP extension strategy, reducing core technical debt by 64%.',
    'Managed cross-functional teams of 80+ engineers across 4 global time zones.',
  ],
  peerDefenseSummary:
    'Passed 90-minute live defense panel with distinction. Demonstrated flawless command of multi-cloud event-driven architectures and enterprise governance frameworks.',
};

// ── REUSABLE ANIMATION WRAPPER ──
const Reveal = ({ children, delay = 0, className = '', style = {} }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.65, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export default function PermanentHiringPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State 1: 5-Stage Runway Active Stage
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  // State 2: Domain Match Precision Radar View Toggle
  const [viewComparison, setViewComparison] = useState<'tryvion' | 'generic' | 'both'>('both');

  // State 3: Retention Calculator Year Selection
  const [selectedYearIdx, setSelectedYearIdx] = useState(0);

  // State 4: Dossier Tab
  const [dossierTab, setDossierTab] = useState<'overview' | 'defense' | 'impact'>('overview');

  return (
    <div
      style={{
        backgroundColor: isDark ? '#070B14' : 'var(--surface-canvas, #FFFFFF)',
        color: isDark ? '#F8FAFC' : 'var(--content-primary, #0F172A)',
        fontFamily: 'var(--family-text, system-ui, -apple-system, sans-serif)',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        .glass-panel {
          background: ${isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
        }
        .hero-perm-bg {
          background-color: #050811 !important;
          background-image:
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 50%);
        }
        .interactive-hover {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-hover:hover {
          border-color: ${isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.4)'};
          transform: translateY(-3px);
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        @media (max-width: 1024px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .grid-5 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-5 { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── 1. HERO VISUAL ARCHITECTURE: 5-STAGE PRECISION PLACEMENT RUNWAY ── */}
        <section
          className="hero-perm-bg"
          style={{
            paddingTop: 'clamp(8.5rem, 13vw, 11rem)',
            paddingBottom: '5.5rem',
            paddingLeft: 'clamp(1.5rem, 5vw, 3rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            {/* Breadcrumb Navigation: Services > Talent > Permanent Hiring */}
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
                  flexWrap: 'wrap',
                }}
              >
                <Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>
                  Services
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <Link href="/services/talent" style={{ color: '#fff', textDecoration: 'none' }}>
                  Talent
                </Link>
                <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Permanent Hiring</span>
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
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#34D399',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <UserCheck size={14} /> Strategic Leadership & Executive Talent
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
                    Precision Permanent Hiring for Enterprise Transformation.
                  </h1>
                </Reveal>

                <Reveal delay={240}>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      lineHeight: 1.7,
                      color: '#94A3B8',
                      marginBottom: '2rem',
                      maxWidth: '56ch',
                    }}
                  >
                    Empowering CHROs, VPs of Technology, and Engineering Directors to build
                    long-term internal capability. We present 1 pre-validated leader backed by
                    active peer technical defense.
                  </p>
                </Reveal>

                <Reveal delay={320}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href="#dossier-preview"
                      style={{
                        backgroundColor: '#10B981',
                        color: '#042F2E',
                        padding: '0.9rem 2rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)',
                      }}
                    >
                      Inspect Candidate Dossier <FileText size={18} />
                    </Link>

                    <Link
                      href="#radar-matrix"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#FFFFFF',
                        padding: '0.9rem 2rem',
                        fontWeight: 600,
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                      }}
                    >
                      Compare Precision Radar <BarChart3 size={18} />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Interactive 5-Stage Runway Visual Pipeline */}
              <Reveal delay={200}>
                <div
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '1.75rem',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Activity size={18} style={{ color: '#10B981' }} />
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          letterSpacing: '0.05em',
                        }}
                      >
                        PRECISION_RUNWAY :: GATES_ACTIVE
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#34D399',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                      }}
                    >
                      5 STRICT GATES
                    </span>
                  </div>

                  {/* Stage Gate Selectors */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '0.4rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {RUNWAY_STAGES.map((stg, idx) => {
                      const isSelected = selectedStageIdx === idx;
                      return (
                        <button
                          key={stg.id}
                          onClick={() => setSelectedStageIdx(idx)}
                          style={{
                            padding: '0.6rem 0.2rem',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: isSelected ? '#10B981' : 'rgba(255,255,255,0.1)',
                            backgroundColor: isSelected
                              ? 'rgba(16, 185, 129, 0.25)'
                              : 'rgba(0,0,0,0.3)',
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Gate {stg.stage}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Gate Details Card */}
                  {(() => {
                    const activeStage = RUNWAY_STAGES[selectedStageIdx];
                    return (
                      <div
                        style={{
                          backgroundColor: 'rgba(5, 8, 17, 0.95)',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '1.25rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                color: '#10B981',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                              }}
                            >
                              {activeStage.subtitle}
                            </span>
                            <h3
                              style={{
                                fontSize: '1.15rem',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                margin: '0.2rem 0 0 0',
                              }}
                            >
                              Stage {activeStage.stage}: {activeStage.title}
                            </h3>
                          </div>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#34D399',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '4px',
                              fontFamily: 'monospace',
                            }}
                          >
                            {activeStage.passRate}
                          </span>
                        </div>

                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: '#CBD5E1',
                            marginBottom: '1.25rem',
                            lineHeight: 1.6,
                          }}
                        >
                          {activeStage.description}
                        </p>

                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
                          {activeStage.keyActions.map((action, aIdx) => (
                            <div
                              key={aIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem',
                                color: '#94A3B8',
                              }}
                            >
                              <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.5rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            textAlign: 'center',
                          }}
                        >
                          <div>
                            <span
                              style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}
                            >
                              Benchmark
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}
                            >
                              {Object.values(activeStage.metrics)[0]}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}
                            >
                              Scope Depth
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399' }}
                            >
                              {Object.values(activeStage.metrics)[1]}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}
                            >
                              Success SLA
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA' }}
                            >
                              {Object.values(activeStage.metrics)[2]}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. DOMAIN MATCH PRECISION RADAR (QUALITY VS VOLUME) ── */}
        <section
          id="radar-matrix"
          style={{
            padding: '6rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Quality vs. Resume Volume
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Domain Match Precision Radar
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  Why TRYVION presents 1 pre-validated candidate instead of sending 15 unvetted
                  resumes to your hiring committee.
                </p>
              </div>
            </Reveal>

            <div className="grid-2">
              {/* Left Column: Radar Vector Visual Bars */}
              <Reveal delay={100}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    borderRadius: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: 0,
                      }}
                    >
                      6-Vector Precision Evaluation Matrix
                    </h3>

                    {/* Filter Toggle Buttons */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.3rem',
                        backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : '#E2E8F0',
                        padding: '0.25rem',
                        borderRadius: '6px',
                      }}
                    >
                      <button
                        onClick={() => setViewComparison('both')}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: viewComparison === 'both' ? '#10B981' : 'transparent',
                          color:
                            viewComparison === 'both' ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Both
                      </button>
                      <button
                        onClick={() => setViewComparison('tryvion')}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: viewComparison === 'tryvion' ? '#10B981' : 'transparent',
                          color:
                            viewComparison === 'tryvion'
                              ? '#FFFFFF'
                              : isDark
                                ? '#94A3B8'
                                : '#64748B',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        TRYVION
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {DOMAIN_RADAR_VECTORS.map((vec, vIdx) => (
                      <div key={vIdx}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            marginBottom: '0.4rem',
                          }}
                        >
                          <span style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>{vec.label}</span>
                          <div style={{ display: 'flex', gap: '0.75rem', fontFamily: 'monospace' }}>
                            {(viewComparison === 'both' || viewComparison === 'tryvion') && (
                              <span style={{ color: '#10B981' }}>TRYVION {vec.tryvionScore}%</span>
                            )}
                            {(viewComparison === 'both' || viewComparison === 'generic') && (
                              <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                                Generic {vec.genericScore}%
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div
                          style={{
                            position: 'relative',
                            height: '8px',
                            borderRadius: '4px',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0',
                            overflow: 'hidden',
                          }}
                        >
                          {(viewComparison === 'both' || viewComparison === 'tryvion') && (
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${vec.tryvionScore}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: vIdx * 0.1 }}
                              style={{
                                height: '100%',
                                backgroundColor: '#10B981',
                                borderRadius: '4px',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 2,
                              }}
                            />
                          )}
                          {(viewComparison === 'both' || viewComparison === 'generic') && (
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${vec.genericScore}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: vIdx * 0.1 }}
                              style={{
                                height: '100%',
                                backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#94A3B8',
                                borderRadius: '4px',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                              }}
                            />
                          )}
                        </div>

                        <span
                          style={{
                            fontSize: '0.725rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            display: 'block',
                            marginTop: '0.3rem',
                          }}
                        >
                          {vec.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Comparative Value Summary */}
              <Reveal delay={200}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#10B981',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Efficiency Benchmark
                    </span>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '1.25rem',
                      }}
                    >
                      1 Curated Leader vs. 15 Unvetted Resumes
                    </h3>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      <div
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F1F5F9',
                          borderLeft: '4px solid #10B981',
                        }}
                      >
                        <strong
                          style={{
                            fontSize: '0.95rem',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            display: 'block',
                          }}
                        >
                          88% Interview-to-Offer Conversion Rate
                        </strong>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            margin: '0.25rem 0 0 0',
                          }}
                        >
                          Hiring committees save over 35 hours of wasted technical interviewing time
                          per placement.
                        </p>
                      </div>

                      <div
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F1F5F9',
                          borderLeft: '4px solid #2563EB',
                        }}
                      >
                        <strong
                          style={{
                            fontSize: '0.95rem',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            display: 'block',
                          }}
                        >
                          Peer Architect Technical Validation
                        </strong>
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            margin: '0.25rem 0 0 0',
                          }}
                        >
                          Every candidate undergoes a mandatory 90-minute technical defense panel
                          led by active Principal Engineers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact?topic=permanent-hiring"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#10B981',
                      color: '#042F2E',
                      fontWeight: 700,
                      borderRadius: '8px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                      boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    Request Executive Talent Shortlist
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. LONG-TERM CAPABILITY GROWTH & RETENTION BOARD ── */}
        <section
          style={{
            padding: '6rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
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
                  Retention Engine & Continuous Upskilling
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Long-Term Capability Growth & Retention Board
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  How permanent onboarding integrates with TRYVION Academy for continuous skill
                  development, driving a 96.8% 12-month retention rate.
                </p>
              </div>
            </Reveal>

            {/* Interactive Calculator Tabs */}
            <Reveal delay={100}>
              <div
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  borderRadius: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '2.5rem',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <GraduationCap size={24} style={{ color: '#2563EB' }} />
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: 0,
                      }}
                    >
                      Select Onboarding Trajectory Horizon
                    </h3>
                  </div>

                  {/* Horizon Selectors */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                    {RETENTION_CALCULATOR_PRESETS.map((pst, idx) => {
                      const isSelected = selectedYearIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedYearIdx(idx)}
                          style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: isSelected
                              ? '#2563EB'
                              : isDark
                                ? 'rgba(255,255,255,0.1)'
                                : '#E2E8F0',
                            backgroundColor: isSelected
                              ? '#2563EB'
                              : isDark
                                ? 'rgba(15, 23, 42, 0.6)'
                                : '#F8FAFC',
                            color: isSelected ? '#FFFFFF' : isDark ? '#CBD5E1' : '#334155',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                          }}
                        >
                          Year {pst.years} Horizon
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                      {
                        title: 'TRYVION Academy Integration',
                        desc: 'Every permanent hire receives 40+ annual hours of customized ERP, BTP, and AI architecture upskilling.',
                      },
                      {
                        title: 'Active Executive Check-Ins',
                        desc: 'Quarterly alignment reviews between hiring leads and TRYVION advisors prevent friction and turnover.',
                      },
                      {
                        title: 'Clean Core Governance Certification',
                        desc: 'Continuous certification ensures technical leadership stays ahead of SAP software updates and best practices.',
                      },
                    ].map((item, iIdx) => (
                      <div
                        key={iIdx}
                        style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
                      >
                        <CheckCircle2
                          size={18}
                          style={{ color: '#10B981', flexShrink: 0, marginTop: '0.2rem' }}
                        />
                        <div>
                          <strong
                            style={{
                              fontSize: '0.95rem',
                              color: isDark ? '#FFFFFF' : '#0F172A',
                              display: 'block',
                            }}
                          >
                            {item.title}
                          </strong>
                          <p
                            style={{
                              fontSize: '0.85rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              margin: '0.15rem 0 0 0',
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Metrics Display */}
                {(() => {
                  const activePreset = RETENTION_CALCULATOR_PRESETS[selectedYearIdx];
                  return (
                    <div
                      style={{
                        backgroundColor: isDark ? 'rgba(5, 8, 17, 0.95)' : '#F1F5F9',
                        borderRadius: '14px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        Projected Retention Rate
                      </span>
                      <span
                        style={{
                          fontSize: '3.25rem',
                          fontWeight: 900,
                          fontFamily: 'monospace',
                          color: '#10B981',
                          margin: '0.5rem 0',
                        }}
                      >
                        {activePreset.totalRetention}%
                      </span>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.75rem',
                          paddingTop: '1rem',
                          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#CBD5E1'}`,
                          marginTop: '1rem',
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              display: 'block',
                            }}
                          >
                            Industry Average
                          </span>
                          <span
                            style={{
                              fontSize: '1.1rem',
                              fontWeight: 700,
                              color: isDark ? '#94A3B8' : '#64748B',
                            }}
                          >
                            {activePreset.baseRetention}%
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              color: '#2563EB',
                              display: 'block',
                              fontWeight: 700,
                            }}
                          >
                            Academy Lift
                          </span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563EB' }}>
                            +{activePreset.academyBoost}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 4. KEY CONTENT: INTERACTIVE CANDIDATE DOSSIER PREVIEW & GUARANTEE BADGE ── */}
        <section
          id="dossier-preview"
          style={{
            padding: '6rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Transparency & Board-Ready Proof
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Interactive Candidate Dossier Preview
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  Inspect a sample anonymized dossier delivered to enterprise hiring committees
                  prior to executive interview.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                {/* Dossier Header with 90-Day Continuity Guarantee Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                    paddingBottom: '1.25rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#10B981',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Verified Enterprise Candidate Dossier
                    </span>
                    <h3
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: '0.2rem 0 0 0',
                      }}
                    >
                      {DOSSIER_SAMPLE.candidateId} :: {DOSSIER_SAMPLE.role}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: isDark ? '#94A3B8' : '#64748B' }}>
                      {DOSSIER_SAMPLE.experience}
                    </span>
                  </div>

                  {/* 90-Day Continuity Guarantee Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.65rem 1.2rem',
                      borderRadius: '30px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#10B981',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    <ShieldCheck size={20} /> 90-Day Continuity Guarantee Backed
                  </div>
                </div>

                {/* Tab Controls */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem' }}>
                  {[
                    { id: 'overview', label: 'Technical Scorecard' },
                    { id: 'defense', label: 'Peer Defense Audit' },
                    { id: 'impact', label: 'Past Project Impact' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDossierTab(tab.id as any)}
                      style={{
                        padding: '0.6rem 1.25rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor:
                          dossierTab === tab.id
                            ? '#10B981'
                            : isDark
                              ? 'rgba(255,255,255,0.05)'
                              : '#E2E8F0',
                        color: dossierTab === tab.id ? '#042F2E' : isDark ? '#94A3B8' : '#64748B',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Active Tab Panel */}
                <div
                  style={{
                    backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#FFFFFF',
                    padding: '1.75rem',
                    borderRadius: '12px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                  }}
                >
                  {dossierTab === 'overview' && (
                    <div className="grid-2">
                      {DOSSIER_SAMPLE.vectors.map((vec, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.8rem',
                            borderRadius: '6px',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.9rem',
                              color: isDark ? '#CBD5E1' : '#334155',
                              fontWeight: 600,
                            }}
                          >
                            {vec.name}
                          </span>
                          <strong
                            style={{
                              fontSize: '0.9rem',
                              color: '#10B981',
                              fontFamily: 'monospace',
                            }}
                          >
                            {vec.score}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {dossierTab === 'defense' && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#2563EB',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <BrainCircuit size={20} />
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}
                        >
                          Principal Engineer Panel Defense Result
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: isDark ? '#CBD5E1' : '#334155',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        "{DOSSIER_SAMPLE.peerDefenseSummary}"
                      </p>
                    </div>
                  )}

                  {dossierTab === 'impact' && (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {DOSSIER_SAMPLE.pastImpact.map((imp, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.6rem',
                            fontSize: '0.9rem',
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{ color: '#10B981', flexShrink: 0, marginTop: '0.25rem' }}
                          />
                          <span style={{ color: isDark ? '#CBD5E1' : '#334155' }}>{imp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. FINAL ACTION CTA ── */}
        <section
          style={{
            padding: '6rem 2rem',
            backgroundColor: '#050811',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Reveal>
              <h2
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                }}
              >
                Build Long-Term Enterprise Capability Today.
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#94A3B8', marginBottom: '2.5rem' }}>
                Schedule a briefing with our executive recruitment partners and experience
                zero-noise, peer-validated permanent placement.
              </p>

              <Link
                href="/contact?topic=permanent-executive-hiring"
                style={{
                  backgroundColor: '#10B981',
                  color: '#042F2E',
                  padding: '1rem 2.5rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.5)',
                }}
              >
                Initiate Permanent Hiring Briefing <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
