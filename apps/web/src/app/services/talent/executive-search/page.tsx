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
  Lock,
  Key,
  FileText,
  BarChart3,
  Check,
  RefreshCw,
  Clock,
  UserCheck,
  TrendingUp,
  BrainCircuit,
  Scale,
  Compass,
  FileCheck,
  Search,
  EyeOff,
  Globe,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA STRUCTURES & DATASETS ──

const EXECUTIVE_MANDATES = [
  {
    role: 'CIO / CTO',
    mandate: 'Modernization, Cloud Strategy & Enterprise AI',
    framework: 'Board Defense & Tech Stack Governance',
    description:
      'Evaluating executives on multi-cloud architectural vision, engineering leadership under scale, and AI governance integration.',
    metrics: {
      assessmentDepth: '180-Degree Board Simulation',
      referenceAudit: 'Tier-1 Enterprise Peers',
      culturalFit: 'Transformational',
    },
  },
  {
    role: 'VP of SAP / ERP',
    mandate: 'Global S/4HANA & Digital Core Delivery',
    framework: 'ERP Transformation Track Record',
    description:
      'Assessing clean core strategy execution, brownfield/greenfield migration leadership, and multi-subsidiary governance.',
    metrics: {
      assessmentDepth: 'P&L & Value Realization',
      referenceAudit: 'Global Rollout Track Record',
      culturalFit: 'Operational Rigor',
    },
  },
  {
    role: 'Chief Transformation Officer',
    mandate: 'Organizational Agility & Business Value Realization',
    framework: 'Value Stream & Change Capability Audit',
    description:
      'Validating capacity to align executive stakeholders, mitigate change resistance, and accelerate digital adoption.',
    metrics: {
      assessmentDepth: 'Change Velocity Index',
      referenceAudit: 'Enterprise Restructuring History',
      culturalFit: 'Empathetic Leadership',
    },
  },
  {
    role: 'VP of Enterprise Architecture',
    mandate: 'Composable Systems & Cybersecurity Alignment',
    framework: 'Enterprise Target Architecture Defense',
    description:
      'Testing mastery over enterprise integration layers, SAP BTP extensions, and rigorous security compliance protocols.',
    metrics: {
      assessmentDepth: 'Live Architecture Defense',
      referenceAudit: 'System Stability Metrics',
      culturalFit: 'Strategic Rigor',
    },
  },
];

const LEADERSHIP_COMPETENCIES = [
  {
    name: 'Strategic Vision & Horizon Planning',
    score: 98,
    detail:
      'Capacity to architect 5-to-10-year enterprise technology roadmaps aligned with corporate financial goals.',
  },
  {
    name: 'Delivery Track Record & Execution',
    score: 96,
    detail:
      'Proven history of delivering complex SAP and cloud transformations on-time and within budget constraints.',
  },
  {
    name: 'Vendor Governance & Ecosystem Mastery',
    score: 94,
    detail:
      'Expertise in managing tier-1 system integrators, software vendors, and third-party engineering alliances.',
  },
  {
    name: 'Culture Transformation & Change Leadership',
    score: 95,
    detail:
      'Ability to inspire engineering teams, overcome organizational inertia, and foster a culture of continuous innovation.',
  },
  {
    name: 'Enterprise Value Creation & P&L',
    score: 97,
    detail:
      'Direct alignment with operating margin expansion, capital efficiency, and measurable digital ROI realization.',
  },
];

const PASSIVE_MAPPING_STEPS = [
  {
    step: '01',
    title: 'Confidential Discretion Protocol',
    desc: 'All executive searches operate under strict NDA and obsidian-grade security, protecting board-level strategy from public market exposure.',
  },
  {
    step: '02',
    title: 'Non-Public Network Sourcing',
    desc: 'Accessing elite passive talent pools across global Fortune 500 enterprises, private equity portfolios, and top-tier principal networks.',
  },
  {
    step: '03',
    title: 'Boardroom Simulation & Defense',
    desc: 'Rigorous peer evaluation mimicking high-stakes board defense sessions to test crisis management and technical governance.',
  },
];

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

export default function ExecutiveSearchPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State 1: Active Selected Mandate in Matrix
  const [selectedMandateIdx, setSelectedMandateIdx] = useState(0);

  // State 2: Executive Intake Vault Form State
  const [vaultForm, setVaultForm] = useState({
    company: '',
    contact: '',
    scope: 'cio-cto',
    notes: '',
  });
  const [vaultSubmitted, setVaultSubmitted] = useState(false);

  const handleVaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVaultSubmitted(true);
  };

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
        .hero-exec-bg {
          background-color: #03050C !important;
          background-image:
            radial-gradient(circle at 75% 25%, rgba(37, 99, 235, 0.22) 0%, transparent 55%),
            radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 55%);
        }
        .interactive-hover {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-hover:hover {
          border-color: ${isDark ? 'rgba(37, 99, 235, 0.6)' : 'rgba(37, 99, 235, 0.5)'};
          transform: translateY(-3px);
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 1024px) {
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── 1. HERO VISUAL ARCHITECTURE: C-SUITE LEADERSHIP & TRANSFORMATION IMPACT VAULT ── */}
        <section
          className="hero-exec-bg"
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
            {/* Breadcrumb Navigation: Services > Talent > Executive Search */}
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
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Executive Search</span>
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
                    <Lock size={14} /> Board-Level Discretion & Advisory
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
                    C-Suite Leadership & Transformation Impact Vault.
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
                    Tailored for CEOs, Boards of Directors, Enterprise Transformation Steering
                    Committees, and Private Equity Operating Partners seeking elite leadership.
                  </p>
                </Reveal>

                <Reveal delay={320}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href="#executive-vault"
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
                      Confidential Executive Intake <Key size={18} />
                    </Link>

                    <Link
                      href="#competency-scorecard"
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
                      Inspect 360° Scorecard <BarChart3 size={18} />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Obsidian Telemetry Vault HUD */}
              <Reveal delay={200}>
                <div
                  style={{
                    backgroundColor: 'rgba(10, 15, 29, 0.9)',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                    padding: '1.75rem',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
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
                      <Activity size={18} style={{ color: '#60A5FA' }} />
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          letterSpacing: '0.05em',
                        }}
                      >
                        EXECUTIVE_VAULT :: TELEMETRY_ACTIVE
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#60A5FA',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                      }}
                    >
                      BOARD LEVEL
                    </span>
                  </div>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                      {
                        label: 'CIO / CTO Placements',
                        status: 'Active Network Mapping',
                        count: '14 Active Mandates',
                      },
                      {
                        label: 'VP of Enterprise Applications',
                        status: 'Board Simulation Stage',
                        count: '9 Active Mandates',
                      },
                      {
                        label: 'Chief AI & Digital Officers',
                        status: 'Discreet Sourcing',
                        count: '6 Active Mandates',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'rgba(3, 5, 12, 0.8)',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <strong
                            style={{ fontSize: '0.9rem', color: '#FFFFFF', display: 'block' }}
                          >
                            {item.label}
                          </strong>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                            {item.status}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: '#60A5FA',
                            backgroundColor: 'rgba(37, 99, 235, 0.15)',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                          }}
                        >
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: '#94A3B8',
                    }}
                  >
                    <span>Non-Public Network Coverage</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>
                      100% Confidential
                    </strong>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. DISCRETE EXECUTIVE SEARCH & TALENT MAPPING HUD (INTAKE VAULT) ── */}
        <section
          id="executive-vault"
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
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Confidential Intake Interface
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Discrete Executive Search & Talent Mapping HUD
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  Initiate a confidential search mandate across non-public enterprise networks with
                  complete discretion.
                </p>
              </div>
            </Reveal>

            <div className="grid-2">
              {/* Left Column: Non-Public Network Mapping Process */}
              <Reveal delay={100}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    height: '100%',
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
                        color: '#2563EB',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Passive Candidate Architecture
                    </span>
                    <h3
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: '0.5rem 0 1.5rem 0',
                      }}
                    >
                      Targeting Leaders Not Actively on the Market
                    </h3>

                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                      {PASSIVE_MAPPING_STEPS.map((pst, idx) => (
                        <div
                          key={idx}
                          style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                        >
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              fontSize: '1rem',
                              color: '#2563EB',
                              backgroundColor: isDark ? 'rgba(37, 99, 235, 0.15)' : '#E0F2FE',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '6px',
                            }}
                          >
                            {pst.step}
                          </span>
                          <div>
                            <strong
                              style={{
                                fontSize: '0.95rem',
                                color: isDark ? '#FFFFFF' : '#0F172A',
                                display: 'block',
                              }}
                            >
                              {pst.title}
                            </strong>
                            <p
                              style={{
                                fontSize: '0.85rem',
                                color: isDark ? '#94A3B8' : '#64748B',
                                margin: '0.2rem 0 0 0',
                                lineHeight: 1.6,
                              }}
                            >
                              {pst.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '2rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      backgroundColor: isDark ? 'rgba(3, 5, 12, 0.7)' : '#F1F5F9',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <ShieldCheck size={20} style={{ color: '#2563EB', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: isDark ? '#CBD5E1' : '#334155' }}>
                      Managed directly by managing partners with zero junior delegation.
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Confidential Executive Intake HUD Form */}
              <Reveal delay={200}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Lock size={18} style={{ color: '#2563EB' }} />
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: 0,
                      }}
                    >
                      Confidential Mandate Intake HUD
                    </h3>
                  </div>

                  {vaultSubmitted ? (
                    <div
                      style={{
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #2563EB',
                      }}
                    >
                      <CheckCircle2 size={48} style={{ color: '#2563EB', margin: '0 auto 1rem' }} />
                      <h4
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Mandate Registered Securely
                      </h4>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          maxWidth: '38ch',
                          margin: '0 auto',
                        }}
                      >
                        An executive partner will review your enterprise parameters and initiate
                        discrete outreach within 4 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleVaultSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isDark ? '#CBD5E1' : '#334155',
                            marginBottom: '0.4rem',
                          }}
                        >
                          Enterprise / Private Equity Firm
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Global Industrial Holdings"
                          value={vaultForm.company}
                          onChange={(e) => setVaultForm({ ...vaultForm, company: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '6px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CBD5E1'}`,
                            backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#FFFFFF',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            fontSize: '0.9rem',
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isDark ? '#CBD5E1' : '#334155',
                            marginBottom: '0.4rem',
                          }}
                        >
                          Executive Contact / Board Sponsor
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Name & Title (e.g. CEO / Operating Partner)"
                          value={vaultForm.contact}
                          onChange={(e) => setVaultForm({ ...vaultForm, contact: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '6px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CBD5E1'}`,
                            backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#FFFFFF',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            fontSize: '0.9rem',
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isDark ? '#CBD5E1' : '#334155',
                            marginBottom: '0.4rem',
                          }}
                        >
                          Executive Mandate Scope
                        </label>
                        <select
                          value={vaultForm.scope}
                          onChange={(e) => setVaultForm({ ...vaultForm, scope: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '6px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CBD5E1'}`,
                            backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#FFFFFF',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            fontSize: '0.9rem',
                          }}
                        >
                          <option value="cio-cto">CIO / CTO Placement</option>
                          <option value="vp-sap">VP of SAP / ERP Transformation</option>
                          <option value="chief-trans">Chief Transformation Officer</option>
                          <option value="vp-arch">VP of Enterprise Architecture</option>
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isDark ? '#CBD5E1' : '#334155',
                            marginBottom: '0.4rem',
                          }}
                        >
                          Mandate Context & Timeline
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Provide high-level strategic objectives..."
                          value={vaultForm.notes}
                          onChange={(e) => setVaultForm({ ...vaultForm, notes: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            borderRadius: '6px',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CBD5E1'}`,
                            backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#FFFFFF',
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            fontSize: '0.9rem',
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                        }}
                      >
                        Initiate Secure Executive Search
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. 360° LEADERSHIP COMPETENCY SCORECARD & EXECUTIVE MANDATES MATRIX ── */}
        <section
          id="competency-scorecard"
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
                  Rigorous Evaluation Framework
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  360° Leadership Competency Scorecard & Executive Mandates
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  Review how executive candidates are vetted across strategic vision, delivery track
                  record, vendor governance, and value creation.
                </p>
              </div>
            </Reveal>

            {/* Interactive Mandates Grid / Selector */}
            <div className="grid-2" style={{ alignItems: 'start', marginBottom: '4rem' }}>
              <Reveal delay={100}>
                <div>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Executive Roles & Strategic Mandates
                  </h3>

                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {EXECUTIVE_MANDATES.map((mand, idx) => {
                      const isSelected = selectedMandateIdx === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedMandateIdx(idx)}
                          className="interactive-hover"
                          style={{
                            padding: '1.25rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            backgroundColor: isSelected
                              ? isDark
                                ? 'rgba(37, 99, 235, 0.2)'
                                : '#EFF6FF'
                              : isDark
                                ? 'rgba(15, 23, 42, 0.7)'
                                : '#F8FAFC',
                            border: '1px solid',
                            borderColor: isSelected
                              ? '#2563EB'
                              : isDark
                                ? 'rgba(255,255,255,0.08)'
                                : '#E2E8F0',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.3rem',
                            }}
                          >
                            <strong
                              style={{ fontSize: '1.05rem', color: isDark ? '#FFFFFF' : '#0F172A' }}
                            >
                              {mand.role}
                            </strong>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: '#2563EB',
                                fontWeight: 700,
                              }}
                            >
                              {mand.framework}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: '0.85rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              display: 'block',
                            }}
                          >
                            {mand.mandate}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Active Mandate Deep-Dive Card */}
              <Reveal delay={200}>
                {(() => {
                  const activeM = EXECUTIVE_MANDATES[selectedMandateIdx];
                  return (
                    <div
                      className="glass-panel"
                      style={{
                        padding: '2.5rem',
                        borderRadius: '16px',
                        height: '100%',
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
                            color: '#2563EB',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          Assessment Framework
                        </span>
                        <h3
                          style={{
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            margin: '0.4rem 0 1rem 0',
                          }}
                        >
                          {activeM.role}
                        </h3>

                        <p
                          style={{
                            fontSize: '1rem',
                            color: isDark ? '#CBD5E1' : '#334155',
                            lineHeight: 1.7,
                            marginBottom: '2rem',
                          }}
                        >
                          {activeM.description}
                        </p>

                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                          <div
                            style={{
                              padding: '1rem',
                              borderRadius: '8px',
                              backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#F1F5F9',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: isDark ? '#94A3B8' : '#64748B',
                                display: 'block',
                                fontWeight: 700,
                              }}
                            >
                              Assessment Depth
                            </span>
                            <strong
                              style={{ fontSize: '0.95rem', color: isDark ? '#FFFFFF' : '#0F172A' }}
                            >
                              {activeM.metrics.assessmentDepth}
                            </strong>
                          </div>

                          <div
                            style={{
                              padding: '1rem',
                              borderRadius: '8px',
                              backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#F1F5F9',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: isDark ? '#94A3B8' : '#64748B',
                                display: 'block',
                                fontWeight: 700,
                              }}
                            >
                              Reference Audit Standard
                            </span>
                            <strong
                              style={{ fontSize: '0.95rem', color: isDark ? '#FFFFFF' : '#0F172A' }}
                            >
                              {activeM.metrics.referenceAudit}
                            </strong>
                          </div>

                          <div
                            style={{
                              padding: '1rem',
                              borderRadius: '8px',
                              backgroundColor: isDark ? 'rgba(3, 5, 12, 0.8)' : '#F1F5F9',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: isDark ? '#94A3B8' : '#64748B',
                                display: 'block',
                                fontWeight: 700,
                              }}
                            >
                              Cultural Fit Vector
                            </span>
                            <strong style={{ fontSize: '0.95rem', color: '#2563EB' }}>
                              {activeM.metrics.culturalFit}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <Link
                        href="#executive-vault"
                        style={{
                          width: '100%',
                          padding: '0.9rem',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          borderRadius: '8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'block',
                        }}
                      >
                        Inquire About {activeM.role} Search
                      </Link>
                    </div>
                  );
                })()}
              </Reveal>
            </div>

            {/* Leadership Competencies Progress Breakdown */}
            <Reveal delay={300}>
              <div
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  borderRadius: '16px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginBottom: '1.5rem',
                  }}
                >
                  360° Competency Evaluation Scorecard
                </h3>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {LEADERSHIP_COMPETENCIES.map((comp, cIdx) => (
                    <div key={cIdx}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          marginBottom: '0.4rem',
                        }}
                      >
                        <span style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>{comp.name}</span>
                        <span style={{ color: '#2563EB', fontFamily: 'monospace' }}>
                          {comp.score}% Benchmarked
                        </span>
                      </div>

                      <div
                        style={{
                          position: 'relative',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#E2E8F0',
                          overflow: 'hidden',
                          marginBottom: '0.3rem',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${comp.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: cIdx * 0.1 }}
                          style={{
                            height: '100%',
                            backgroundColor: '#2563EB',
                            borderRadius: '4px',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: isDark ? '#94A3B8' : '#64748B' }}>
                        {comp.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 4. PINNED DARK BASELINE CLOSING CTA ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: '#03050C',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backgroundImage: 'url(/images/talent-cta-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Overlay to ensure contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(3, 5, 12, 0.88)',
              zIndex: 1,
            }}
          />

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <Reveal>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '20px',
                  background: 'rgba(37, 99, 235, 0.2)',
                  border: '1px solid rgba(37, 99, 235, 0.4)',
                  color: '#60A5FA',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <Lock size={14} /> Boardroom Discretion Guaranteed
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Secure Your Next Transformation Leader.
              </h2>
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#94A3B8',
                  marginBottom: '2.5rem',
                  lineHeight: 1.6,
                }}
              >
                Connect with TRYVION’s executive search partners for a confidential briefing on
                active non-public candidate mapping.
              </p>

              <Link
                href="#executive-vault"
                style={{
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  padding: '1rem 2.5rem',
                  fontWeight: 700,
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
                }}
              >
                Initiate Confidential Executive Search <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
