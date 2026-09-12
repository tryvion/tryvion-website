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
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA DEFINITIONS & DATASETS ──

const SAP_MODULE_GRAPH_DATA = [
  {
    id: 's4hana',
    name: 'S/4HANA Clean Core',
    icon: Target,
    availability: '98.5%',
    phase: 'Greenfield & Brownfield',
    velocity: '5-7 Days',
    metrics: { engineers: '140+ Vetted Leads', retention: '99.2%', cleanCoreFit: '100%' },
    desc: 'Core ERP migration leads enforcing zero-modification extensions and standard RESTful APIs.',
  },
  {
    id: 'btp',
    name: 'SAP BTP Integration',
    icon: Cpu,
    availability: '96.8%',
    phase: 'Extension & Middleware',
    velocity: '4-6 Days',
    metrics: { engineers: '95+ Integration Architects', retention: '98.6%', cleanCoreFit: '97%' },
    desc: 'BTP Integration Suite, CPI, Event Mesh, and CAP/RAP cloud-native framework developers.',
  },
  {
    id: 'successfactors',
    name: 'SuccessFactors & HCM',
    icon: Users,
    availability: '94.2%',
    phase: 'HR Modernization',
    velocity: '6-8 Days',
    metrics: { engineers: '70+ Lead Consultants', retention: '97.9%', cleanCoreFit: '96%' },
    desc: 'Employee Central, Talent Management, and SAP Analytics Cloud for HCM integration specialists.',
  },
  {
    id: 'ariba',
    name: 'Ariba & Spend Mgmt',
    icon: Building2,
    availability: '93.5%',
    phase: 'Source-to-Pay',
    velocity: '5-7 Days',
    metrics: { engineers: '55+ Procurement Leads', retention: '98.1%', cleanCoreFit: '98%' },
    desc: 'Guided Buying, Supplier Lifecycle, CIG Integration, and Business Network advisors.',
  },
  {
    id: 'joule',
    name: 'SAP Business AI & Joule',
    icon: Sparkles,
    availability: '91.0%',
    phase: 'AI Foundation & Copilot',
    velocity: '7-10 Days',
    metrics: { engineers: '40+ AI Engineers', retention: '100%', cleanCoreFit: '95%' },
    desc: 'Joule Prompt Engineering, SAP AI Core pipelines, and automated workflow orchestrations.',
  },
];

const BUSINESS_PROCESSES = [
  {
    id: 'r2r',
    name: 'Record-to-Report (R2R)',
    sapModules: 'FI/CO, Group Reporting, SAC Financials',
    evaluationCriteria:
      'Multi-GAAP Reconciliation, Real-Time Consolidation & Clean Core Finance APIs',
    deliverable: 'Automated ledger closing & real-time financial reporting compliance',
    vettingScenario: 'Live defense of Central Finance architecture under complex M&A scenarios',
  },
  {
    id: 'o2c',
    name: 'Order-to-Cash (O2C)',
    sapModules: 'SD, Sales Cloud, BRIM, Commerce Cloud',
    evaluationCriteria: 'High-Volume Billing Pipelines, Revenue Recognition & Omnichannel Sync',
    deliverable: 'Sub-second order validation & flexible subscription model integration',
    vettingScenario: 'OData V4 event-driven integration testing for legacy CRM sync',
  },
  {
    id: 'p2p',
    name: 'Procure-to-Pay (P2P)',
    sapModules: 'MM, Ariba, S/4HANA Sourcing',
    evaluationCriteria: 'Supplier Risk Automation, Catalog Integration & Invoice Matching',
    deliverable: 'End-to-end procurement cycle time reduction by up to 45%',
    vettingScenario: 'Cloud Integration Gateway (CIG) custom mapping error handling audit',
  },
  {
    id: 'h2r',
    name: 'Hire-to-Retire (H2R)',
    sapModules: 'SuccessFactors EC, Payroll, Time Mgmt',
    evaluationCriteria: 'Global Compliance Engines, Continuous Feedback & Workforce Analytics',
    deliverable: 'Unified global employee record with automated multi-country payroll sync',
    vettingScenario: 'Data Privacy & Security Role Architecture review across 12+ jurisdictions',
  },
];

const PLACEMENT_RUNWAY_STAGES = [
  {
    stage: '01',
    title: 'Business Context Mapping',
    detail:
      'Deep dive into target architecture, technical debt profile, team dynamics, and ERP phase.',
  },
  {
    stage: '02',
    title: 'Peer Technical Defense',
    detail:
      'Hands-on code audit & system design defense panel led by active SAP Principal Architects.',
  },
  {
    stage: '03',
    title: 'Transformation Culture Fit',
    detail:
      'Assessment of change management velocity, stakeholder communication, and agility under pressure.',
  },
  {
    stage: '04',
    title: 'Single-Candidate Shortlist',
    detail: 'We eliminate resume noise and present 1-2 pre-validated, high-probability placements.',
  },
  {
    stage: '05',
    title: '90-Day Ramp Guarantee',
    detail:
      'Active post-placement oversight and continuous upskilling alignment via TRYVION Academy.',
  },
];

const COMPARISON_DATA = [
  {
    feature: 'Hero Focus',
    generic: 'Generic office stock photos & broad claims',
    tryvion: 'SAP Module & BTP Capability Telemetry Terminal',
  },
  {
    feature: 'Talent Sourcing UI',
    generic: 'Unfiltered resume database headcount search',
    tryvion: 'Interactive Project Pod & Skill Match Configurator',
  },
  {
    feature: 'Vetting Proof',
    generic: 'Basic automated resume keyword matching',
    tryvion: 'Peer-led architectural defense & Clean Core validation',
  },
  {
    feature: 'Engagement Model',
    generic: 'Time & material body-shopping staffing',
    tryvion: 'Dedicated Managed CoE Pods & Advisory Retainers',
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

export default function SapAndPermanentTalentPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State 1: Hero Visual Graph
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);

  // State 2: Interactive Enterprise Pod Configurator
  const [podRoles, setPodRoles] = useState({
    s4Lead: 1,
    btpDev: 2,
    changeSpec: 1,
    funcConsultant: 1,
  });

  const updateRole = (role: keyof typeof podRoles, delta: number) => {
    setPodRoles((prev) => ({
      ...prev,
      [role]: Math.max(0, Math.min(10, prev[role] + delta)),
    }));
  };

  const totalHeadcount = Object.values(podRoles).reduce((a, b) => a + b, 0);
  const estimatedDaysToDeploy =
    totalHeadcount === 0 ? 0 : Math.max(4, 3 + Math.ceil(totalHeadcount * 0.8));

  // State 3: Business Process Matcher
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);

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
          background: ${isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.9)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
        }
        .hero-sap-bg {
          background-color: #050811 !important;
          background-image:
            radial-gradient(circle at 70% 20%, rgba(37, 99, 235, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%);
        }
        .interactive-hover {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-hover:hover {
          border-color: ${isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.4)'};
          transform: translateY(-3px);
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        @media (max-width: 1024px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .grid-4, .grid-5 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-4, .grid-5 { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── 1. HERO VISUAL ARCHITECTURE: SAP ECOSYSTEM MODULE & READINESS TERMINAL ── */}
        <section
          className="hero-sap-bg"
          style={{
            paddingTop: 'clamp(8.5rem, 13vw, 11rem)',
            paddingBottom: '5rem',
            paddingLeft: 'clamp(1.5rem, 5vw, 3rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 3rem)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            {/* Breadcrumb Navigation: Services > Talent > SAP Talent Solutions */}
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
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>SAP Talent Solutions</span>
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
                      background: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      color: '#60A5FA',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Activity size={14} /> SAP Ecosystem Capability & Talent Engine
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
                    Enterprise SAP Talent & Precision Permanent Hiring.
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
                    Deploy pre-vetted S/4HANA Clean Core leads, BTP architects, and permanent
                    executive leaders through peer-evaluated technical defense panels.
                  </p>
                </Reveal>

                <Reveal delay={320}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href="#pod-configurator"
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
                        boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.5)',
                      }}
                    >
                      Assemble Project Pod <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="#permanent-hiring"
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
                      Permanent Hiring Runway <ChevronRight size={18} />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* SAP Module Telemetry Terminal Visual */}
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
                      <Zap size={18} style={{ color: '#10B981' }} />
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          letterSpacing: '0.05em',
                        }}
                      >
                        READINESS_TERMINAL :: LIVE_NODES
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                      }}
                    >
                      100% VERIFIED
                    </span>
                  </div>

                  {/* Node Selector Pills */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '0.4rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {SAP_MODULE_GRAPH_DATA.map((mod, idx) => {
                      const isSelected = selectedModuleIdx === idx;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => setSelectedModuleIdx(idx)}
                          style={{
                            padding: '0.6rem 0.2rem',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: isSelected ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                            backgroundColor: isSelected
                              ? 'rgba(59, 130, 246, 0.25)'
                              : 'rgba(0,0,0,0.3)',
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {mod.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Module Visual Card */}
                  {(() => {
                    const activeMod = SAP_MODULE_GRAPH_DATA[selectedModuleIdx];
                    const IconComp = activeMod.icon;
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
                            marginBottom: '1rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div
                              style={{
                                padding: '0.5rem',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                color: '#60A5FA',
                              }}
                            >
                              <IconComp size={20} />
                            </div>
                            <div>
                              <h3
                                style={{
                                  fontSize: '1.05rem',
                                  fontWeight: 700,
                                  color: '#FFFFFF',
                                  margin: 0,
                                }}
                              >
                                {activeMod.name}
                              </h3>
                              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                Phase: {activeMod.phase}
                              </span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span
                              style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}
                            >
                              Availability
                            </span>
                            <span
                              style={{
                                fontSize: '1rem',
                                fontWeight: 800,
                                fontFamily: 'monospace',
                                color: '#10B981',
                              }}
                            >
                              {activeMod.availability}
                            </span>
                          </div>
                        </div>

                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: '#CBD5E1',
                            marginBottom: '1.25rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {activeMod.desc}
                        </p>

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
                              Talent Pool
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}
                            >
                              {activeMod.metrics.engineers}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}
                            >
                              Retention Rate
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA' }}
                            >
                              {activeMod.metrics.retention}
                            </span>
                          </div>
                          <div>
                            <span
                              style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'block' }}
                            >
                              Clean Core Fit
                            </span>
                            <span
                              style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}
                            >
                              {activeMod.metrics.cleanCoreFit}
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

        {/* ── 2. INTERACTIVE ENTERPRISE POD CONFIGURATOR ── */}
        <section
          id="pod-configurator"
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
                  Dynamic Resource Assembly
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Interactive Enterprise Pod Configurator
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  Dynamically assemble custom project-ready SAP teams and calculate estimated
                  deployment velocity and governance SLA models.
                </p>
              </div>
            </Reveal>

            <div className="grid-2">
              {/* Left Column: Role Sliders / Counters */}
              <Reveal delay={100}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    borderRadius: '14px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Sliders size={20} style={{ color: '#2563EB' }} /> Select Pod Composition
                  </h3>

                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    {[
                      {
                        key: 's4Lead',
                        title: 'Lead S/4HANA Architect',
                        desc: 'Clean Core oversight & high-level system design',
                      },
                      {
                        key: 'btpDev',
                        title: 'BTP & ABAP Cloud Developers',
                        desc: 'Custom extensions, CPI pipelines & RAP/CAP models',
                      },
                      {
                        key: 'changeSpec',
                        title: 'Change Management Lead',
                        desc: 'Business process adoption & governance alignment',
                      },
                      {
                        key: 'funcConsultant',
                        title: 'Functional Leads (FI/CO, MM, SD)',
                        desc: 'Domain-specific module setup & business testing',
                      },
                    ].map((role) => (
                      <div
                        key={role.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          borderRadius: '8px',
                          backgroundColor: isDark ? 'rgba(5, 8, 17, 0.5)' : '#FFFFFF',
                          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0'}`,
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 700,
                              margin: 0,
                              color: isDark ? '#FFFFFF' : '#0F172A',
                            }}
                          >
                            {role.title}
                          </h4>
                          <span
                            style={{ fontSize: '0.75rem', color: isDark ? '#94A3B8' : '#64748B' }}
                          >
                            {role.desc}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <button
                            onClick={() => updateRole(role.key as any, -1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : '#CBD5E1'}`,
                              backgroundColor: 'transparent',
                              color: isDark ? '#FFFFFF' : '#0F172A',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            style={{
                              fontSize: '1rem',
                              fontWeight: 800,
                              width: '24px',
                              textAlign: 'center',
                              fontFamily: 'monospace',
                              color: isDark ? '#FFFFFF' : '#0F172A',
                            }}
                          >
                            {podRoles[role.key as keyof typeof podRoles]}
                          </span>
                          <button
                            onClick={() => updateRole(role.key as any, 1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: '#2563EB',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Calculated SLA & Pod Summary Output */}
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
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          margin: 0,
                        }}
                      >
                        Pod SLA & Governance Specs
                      </h3>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '20px',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981',
                        }}
                      >
                        MANAGED COE READY
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem',
                      }}
                    >
                      <div
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F1F5F9',
                          textAlign: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            display: 'block',
                          }}
                        >
                          Total Headcount
                        </span>
                        <span
                          style={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            fontFamily: 'monospace',
                            color: '#2563EB',
                          }}
                        >
                          {totalHeadcount} <span style={{ fontSize: '0.9rem' }}>FTEs</span>
                        </span>
                      </div>

                      <div
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F1F5F9',
                          textAlign: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            display: 'block',
                          }}
                        >
                          Est. Deployment Velocity
                        </span>
                        <span
                          style={{
                            fontSize: '2rem',
                            fontWeight: 900,
                            fontFamily: 'monospace',
                            color: '#10B981',
                          }}
                        >
                          {estimatedDaysToDeploy} <span style={{ fontSize: '0.9rem' }}>Days</span>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                      {[
                        'Enforced SAP Clean Core Code Guidelines & OData Standard',
                        'Daily Peer Code Audits & Automated Pipeline Checks',
                        'Direct Alignment with Enterprise Change Management Board',
                        'Includes 90-Day Continuous Capability Guarantee',
                      ].map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            fontSize: '0.875rem',
                          }}
                        >
                          <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0 }} />
                          <span style={{ color: isDark ? '#CBD5E1' : '#334155' }}>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/contact?topic=sap-pod-request&headcount=${totalHeadcount}`}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      borderRadius: '8px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'block',
                      boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
                    }}
                  >
                    Lock In Pod Composition & Request Profiles
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. "BEYOND JOB TITLES" BUSINESS PROCESS MATCHER ── */}
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
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Process-Driven Evaluation
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  "Beyond Job Titles" Business Process Matcher
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.5rem',
                  }}
                >
                  TRYVION evaluates specialists based on actual enterprise business process outcomes
                  rather than generic resume keywords.
                </p>
              </div>
            </Reveal>

            {/* Process Selection Buttons */}
            <Reveal delay={100}>
              <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
                {BUSINESS_PROCESSES.map((bp, idx) => {
                  const isActive = activeProcessIdx === idx;
                  return (
                    <button
                      key={bp.id}
                      onClick={() => setActiveProcessIdx(idx)}
                      className="interactive-hover"
                      style={{
                        padding: '1.25rem',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: isActive
                          ? '#2563EB'
                          : isDark
                            ? 'rgba(255,255,255,0.08)'
                            : '#E2E8F0',
                        backgroundColor: isActive
                          ? '#2563EB'
                          : isDark
                            ? 'rgba(15, 23, 42, 0.6)'
                            : '#F8FAFC',
                        color: isActive ? '#FFFFFF' : isDark ? '#CBD5E1' : '#334155',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          opacity: 0.8,
                          display: 'block',
                          marginBottom: '0.25rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Process Module 0{idx + 1}
                      </span>
                      <strong style={{ fontSize: '1rem', display: 'block' }}>{bp.name}</strong>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Active Process Evaluation Deep-Dive */}
            <Reveal delay={200}>
              {(() => {
                const activeBp = BUSINESS_PROCESSES[activeProcessIdx];
                return (
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
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#2563EB',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        Mapped SAP Ecosystem Modules
                      </span>
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginTop: '0.25rem',
                          marginBottom: '1.5rem',
                        }}
                      >
                        {activeBp.sapModules}
                      </h3>

                      <div style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                          <strong
                            style={{
                              fontSize: '0.85rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              display: 'block',
                              marginBottom: '0.35rem',
                            }}
                          >
                            Technical Evaluation Benchmark:
                          </strong>
                          <p
                            style={{
                              fontSize: '0.975rem',
                              color: isDark ? '#F1F5F9' : '#1E293B',
                              margin: 0,
                              lineHeight: 1.6,
                            }}
                          >
                            {activeBp.evaluationCriteria}
                          </p>
                        </div>

                        <div>
                          <strong
                            style={{
                              fontSize: '0.85rem',
                              color: isDark ? '#94A3B8' : '#64748B',
                              display: 'block',
                              marginBottom: '0.35rem',
                            }}
                          >
                            Target Business Outcome:
                          </strong>
                          <p
                            style={{
                              fontSize: '0.975rem',
                              color: '#10B981',
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {activeBp.deliverable}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F1F5F9',
                        padding: '1.75rem',
                        borderRadius: '12px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#2563EB',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <ShieldCheck size={20} />
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                          }}
                        >
                          Peer Defense Vetting Protocol
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: isDark ? '#CBD5E1' : '#334155',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        "{activeBp.vettingScenario}"
                      </p>
                    </div>
                  </div>
                );
              })()}
            </Reveal>
          </div>
        </section>

        {/* ── 4. FEATURE COMPARISON MATRIX (GENERIC VS TRYVION) ── */}
        <section
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
                  The TRYVION Advantage
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Generic Staffing vs. TRYVION SAP Talent
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div
                className="glass-panel"
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    padding: '1.25rem 1.75rem',
                    backgroundColor: isDark ? 'rgba(5, 8, 17, 0.9)' : '#E2E8F0',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  }}
                >
                  <div>Feature Area</div>
                  <div style={{ opacity: 0.7 }}>Generic Staffing Page</div>
                  <div style={{ color: '#2563EB' }}>TRYVION SAP Sub-Category</div>
                </div>

                {COMPARISON_DATA.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      padding: '1.25rem 1.75rem',
                      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                      fontSize: '0.9rem',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: isDark ? '#FFFFFF' : '#0F172A' }}>
                      {row.feature}
                    </div>
                    <div style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{row.generic}</div>
                    <div style={{ color: isDark ? '#60A5FA' : '#1D4ED8', fontWeight: 600 }}>
                      {row.tryvion}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. SUB-CATEGORY 2: PERMANENT HIRING RUNWAY & ANONYMIZED DOSSIER ── */}
        <section
          id="permanent-hiring"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Permanent Hiring Pipeline
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  5-Stage Precision Placement Runway
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Designed for CHROs and VPs of Technology building long-term capability with a
                  guaranteed 96.8% 12-month retention rate.
                </p>
              </div>
            </Reveal>

            {/* 5-Stage Visual Gates */}
            <div className="grid-5" style={{ marginBottom: '4rem' }}>
              {PLACEMENT_RUNWAY_STAGES.map((stg, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div
                    className="glass-panel interactive-hover"
                    style={{
                      padding: '1.5rem',
                      borderRadius: '12px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '1.5rem',
                          fontFamily: 'monospace',
                          fontWeight: 900,
                          color: '#10B981',
                          display: 'block',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {stg.stage}
                      </span>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {stg.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.825rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {stg.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Interactive Candidate Dossier Preview */}
            <Reveal delay={200}>
              <div
                className="glass-panel"
                style={{
                  padding: '2.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#10B981',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Sample Anonymized Evaluation Dossier
                    </span>
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: '0.25rem 0 0 0',
                      }}
                    >
                      Candidate #SAP-ARCH-8049
                    </h3>
                  </div>

                  {/* 90-Day Continuity Guarantee Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 1.1rem',
                      borderRadius: '30px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#10B981',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <ShieldCheck size={18} /> 90-Day Ramp Guarantee Backed
                  </div>
                </div>

                <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F8FAFC',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        display: 'block',
                      }}
                    >
                      Primary Domain
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: isDark ? '#FFFFFF' : '#0F172A' }}>
                      Principal S/4HANA & BTP Lead
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F8FAFC',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        display: 'block',
                      }}
                    >
                      Peer Code Audit Score
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#10B981' }}>
                      98.4% Clean Core Alignment
                    </strong>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '10px',
                      backgroundColor: isDark ? 'rgba(5, 8, 17, 0.8)' : '#F8FAFC',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        display: 'block',
                      }}
                    >
                      Delivery Track Record
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: isDark ? '#FFFFFF' : '#0F172A' }}>
                      3 Global Greenfield S/4 Moves
                    </strong>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: isDark ? '#CBD5E1' : '#475569',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Candidate passed live peer defense panel evaluating OData V4 integration
                  scalability and custom legacy code refactoring into side-by-side BTP extensions.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 6. FINAL ACTION CTA ── */}
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
                Ready to Secure Vetted SAP & Executive Talent?
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#94A3B8', marginBottom: '2.5rem' }}>
                Initiate a custom pod request or request a single-candidate shortlist for permanent
                enterprise capability building.
              </p>

              <Link
                href="/contact?topic=talent-engagement"
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
                Schedule Talent Consultation <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
