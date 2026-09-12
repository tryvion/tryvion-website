'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Briefcase,
  Award,
  ShieldCheck,
  Zap,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Activity,
  TrendingUp,
  CheckCircle2,
  Globe,
  UserCheck,
  Layers,
  Search,
  Building2,
  Cpu,
  Database,
  Cloud,
  Compass,
  Sparkles,
  BarChart3,
  Target,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA DEFINITIONS: ENTERPRISE TALENT & WORKFORCE SOLUTIONS ──

const TELEMETRY_HUD_TABS = [
  {
    id: 'skill-alignment',
    label: 'Skill Alignment Engine',
    icon: Target,
    badge: 'Coverage & Readiness',
    metrics: [
      { name: 'SAP S/4HANA & BTP Readiness', value: '98.4%', status: 'Optimal' },
      { name: 'Domain Role Match Precision', value: '96.2%', status: 'Validated' },
      { name: 'Enterprise Culture Fit Score', value: '94.8%', status: 'Aligned' },
    ],
    highlight:
      'AI-assisted skill graph matching candidates to enterprise transformation requirements.',
  },
  {
    id: 'global-mobility',
    label: 'Global Mobility & Deployment',
    icon: Globe,
    badge: 'Time-To-Deploy',
    metrics: [
      { name: 'Niche Role Placement Velocity', value: '14 Days', status: 'Accelerated' },
      { name: 'Cross-Border Compliance Rate', value: '100%', status: 'Verified' },
      { name: 'Follow-the-Sun Timezone Coverage', value: '24/7', status: 'Active' },
    ],
    highlight: 'Seamless international onboarding with full regulatory, tax, and visa compliance.',
  },
  {
    id: 'talent-retention',
    label: 'Talent Retention Index',
    icon: TrendingUp,
    badge: 'Predictive Engagement',
    metrics: [
      { name: 'Project Continuity Rate', value: '94.2%', status: 'Benchmark' },
      { name: '12-Month Permanent Retention', value: '96.8%', status: 'Top Tier' },
      { name: 'Consultant Satisfaction Score', value: '4.9/5', status: 'Exceptional' },
    ],
    highlight: 'Predictive engagement modeling reducing turnover during critical project phases.',
  },
];

const SKILL_MATRIX_CATEGORIES = [
  { id: 'sap', label: 'SAP & ERP Specialists' },
  { id: 'cloud-ai', label: 'Cloud & AI Architects' },
  { id: 'transformation', label: 'Digital Transformation Leads' },
  { id: 'executive', label: 'Executive Leadership' },
];

const SKILL_MATRIX_DATA: Record<
  string,
  Array<{
    title: string;
    skills: string[];
    density: string;
    speed: string;
    model: string;
    vetting: string;
  }>
> = {
  sap: [
    {
      title: 'SAP S/4HANA Core & Cloud Functional Leads',
      skills: ['FI/CO', 'MM/SD', 'PP/QM', 'Clean Core Advisory'],
      density: 'Senior (10+ Yrs)',
      speed: '5-7 Days',
      model: 'Staff Augmentation & Dedicated Pods',
      vetting: 'TRYVION Domain Assessment & SAP Certified',
    },
    {
      title: 'SAP BTP & Integration Architects',
      skills: ['BTP Integration Suite', 'Extension Suite', 'CAP/RAP Framework', 'OData APIs'],
      density: 'Expert Architect',
      speed: '7-10 Days',
      model: 'Managed CoE & Project Basis',
      vetting: 'Technical Code Review & Live Architecture Challenge',
    },
    {
      title: 'SAP SuccessFactors & Human Capital Consultants',
      skills: ['Employee Central', 'PMGM', 'LMS', 'Workforce Analytics'],
      density: 'Principal Consultant',
      speed: '5-8 Days',
      model: 'Full Lifecycle Implementation Support',
      vetting: 'Business Process Alignment & Client Defense',
    },
  ],
  'cloud-ai': [
    {
      title: 'Enterprise AI & Machine Learning Engineers',
      skills: ['LLM Orchestration', 'SAP Joule/Business AI', 'Vector DBs', 'RAG Pipelines'],
      density: 'Staff/Principal',
      speed: '7-12 Days',
      model: 'Specialist Advisory & AI Pods',
      vetting: 'Production AI Deployment Portfolio Audit',
    },
    {
      title: 'Multi-Cloud Infrastructure Architects',
      skills: ['AWS', 'Microsoft Azure', 'GCP', 'Terraform', 'Kubernetes'],
      density: 'Lead Architect',
      speed: '5-7 Days',
      model: 'Dedicated Resource & Retainer',
      vetting: 'Cloud Security & Scalability Architecture Panel',
    },
    {
      title: 'Data Platform & Analytics Engineers',
      skills: ['SAP DataspHERE', 'Snowflake', 'Databricks', 'dbt', 'Real-Time Pipelines'],
      density: 'Senior Specialist',
      speed: '5-9 Days',
      model: 'Project-Based & Staff Augmentation',
      vetting: 'Complex Query & Pipeline Stress Test',
    },
  ],
  transformation: [
    {
      title: 'Enterprise Program & Portfolio Directors',
      skills: ['Large-Scale ERP Modernization', 'Agile/SAFe Governance', 'Vendor Oversight'],
      density: 'Director / VP Level',
      speed: '10-14 Days',
      model: 'Interim Executive & Program Lead',
      vetting: 'C-Suite Reference Validation & Track Record Review',
    },
    {
      title: 'Business Process Transformation Consultants',
      skills: ['Value Stream Mapping', 'Signavio Process Insights', 'Change Management'],
      density: 'Principal Lead',
      speed: '7-10 Days',
      model: 'Transformation CoE Deployment',
      vetting: 'Business Impact Case Study Evaluation',
    },
    {
      title: 'Enterprise Solution Architects',
      skills: ['TOGAF', 'Composable Enterprise', 'Legacy Modernization', 'Cybersecurity'],
      density: 'Chief Architect',
      speed: '8-12 Days',
      model: 'Advisory Retainer & Pod Lead',
      vetting: 'Enterprise Architecture Scenario Defense',
    },
  ],
  executive: [
    {
      title: 'Chief Information / Technology Officers (CIO/CTO)',
      skills: ['Global IT Strategy', 'Digital Vision', 'Board Governance', 'Budget Management'],
      density: 'C-Executive',
      speed: '30-45 Days',
      model: 'Retained Executive Search',
      vetting: '360° Leadership Evaluation & Board Panel',
    },
    {
      title: 'VP / Head of SAP & Enterprise Applications',
      skills: ['S/4HANA Transformation', 'Global Practice Management', 'Partner Ecosystems'],
      density: 'VP Level',
      speed: '21-30 Days',
      model: 'Retained Search & Executive Advisory',
      vetting: 'Strategic Vision & Culture Alignment Assessment',
    },
    {
      title: 'Chief Digital & AI Transformation Officers',
      skills: ['Enterprise AI Strategy', 'Commercial Innovation', 'Organizational Change'],
      density: 'C-Executive',
      speed: '30-45 Days',
      model: 'Retained Search',
      vetting: 'Executive Board Committee Evaluation',
    },
  ],
};

const SERVICE_PILLARS = [
  {
    number: '01',
    title: 'SAP Talent Solutions',
    badge: 'Core Differentiator',
    description:
      'Access specialized SAP capability tailored to your implementation, migration, and innovation roadmaps.',
    highlights: [
      'SAP S/4HANA, BTP, SuccessFactors & Ariba expertise',
      'Contract specialists, advisory leads & project pods',
      'Quality-first selection: 1 carefully matched candidate vs. 15 generic CVs',
      'Clean Core and Business AI implementation readiness',
    ],
    link: '/services/talent/sap-talent-solutions',
    icon: Building2,
  },
  {
    number: '02',
    title: 'Permanent Hiring',
    badge: 'Long-Term Capability',
    description:
      'Build resilient internal teams with domain-vetted technology, consulting, and transformation professionals.',
    highlights: [
      'Structured 5-step sourcing and vetting methodology',
      'Focus on technical depth, business context, and culture fit',
      'Reduced time-to-hire with pre-qualified talent networks',
      'Comprehensive onboarding and 90-day retention guarantee',
    ],
    link: '/services/talent/permanent-hiring',
    icon: Users,
  },
  {
    number: '03',
    title: 'Executive Search',
    badge: 'Leadership Search',
    description:
      'Identify visionary technology and transformation leaders capable of steering complex digital agendas.',
    highlights: [
      'Focus on CIO, CTO, VP of Applications & Transformation Directors',
      'Domain-led leadership assessment combining technical & business acumen',
      'Confidential executive outreach across global networks',
      'Alignment with long-term organizational transformation goals',
    ],
    link: '/services/talent/executive-search',
    icon: Award,
  },
];

const WORKFORCE_RUNWAY = [
  {
    phase: '01',
    title: 'Precision Sourcing & Domain Vetting',
    desc: 'AI-assisted skill graph matching combined with hands-on peer evaluation by senior SAP and technology architects to ensure genuine capability.',
  },
  {
    phase: '02',
    title: 'Rapid Onboarding & Day-1 Integration',
    desc: 'Pre-aligned toolchains, security clearances, and context briefings so specialists hit the ground running with zero operational delay.',
  },
  {
    phase: '03',
    title: 'Continuous Upskilling & CoE Support',
    desc: 'Direct connection into the TRYVION Academy and practice frameworks, keeping deployed talent updated on modern platform releases.',
  },
  {
    phase: '04',
    title: 'Retention & Performance Optimization',
    desc: 'Active engagement monitoring, continuous SLA feedback loops, and career alignment to maintain 94%+ project continuity rates.',
  },
];

const METRICS_GAUGES = [
  {
    label: 'Time-to-Value Acceleration',
    value: '80%',
    description: 'Faster team deployment compared to traditional enterprise recruitment cycles.',
    percentage: 80,
  },
  {
    label: 'Retention Multiplier',
    value: '94%',
    description: 'Project continuity rate across multi-year digital transformation initiatives.',
    percentage: 94,
  },
  {
    label: 'Global Skill Coverage',
    value: '24/7',
    description: 'Follow-the-sun resource availability across Americas, EMEA, and APAC regions.',
    percentage: 100,
  },
];

// ── REUSABLE ANIMATION COMPONENT ──
const Reveal = ({ children, delay = 0, className = '', style = {} }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export default function EnterpriseTalentPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  const [activeHudTab, setActiveHudTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState('sap');

  return (
    <div
      style={{
        backgroundColor: isDark ? '#070B14' : 'var(--surface-canvas, #FFFFFF)',
        color: isDark ? '#F8FAFC' : 'var(--content-primary, #0F172A)',
        fontFamily: 'var(--family-text, system-ui, -apple-system, sans-serif)',
        minHeight: '100vh',
        overflowX: 'hidden',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <style>{`
        * { box-sizing: border-box; }

        .hero-talent-bg {
          background-color: #050811 !important;
          background-image:
            radial-gradient(rgba(37, 99, 235, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 8, 17, 0.85), rgba(5, 8, 17, 0.95)),
            url('/images/talent-hero-bg.png');
          background-size: 32px 32px, cover, cover;
          background-position: center, center, center;
          background-repeat: repeat, no-repeat, no-repeat;
        }

        .cta-talent-bg {
          background-color: #050811 !important;
          background-image:
            radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.25) 0%, transparent 65%),
            linear-gradient(to bottom, rgba(5, 8, 17, 0.88), rgba(5, 8, 17, 0.96)),
            url('/images/talent-cta-bg.png');
          background-size: 100% 100%, cover, cover;
          background-position: center, center, center;
          background-repeat: no-repeat, no-repeat, no-repeat;
        }

        .glass-panel {
          background: ${isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
          box-shadow: ${isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)'};
        }

        .hero-glass-panel {
          background: rgba(15, 23, 42, 0.75) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
        }

        .glass-panel-interactive {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-panel-interactive:hover {
          border-color: ${isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)'};
          transform: translateY(-4px);
          box-shadow: ${
            isDark
              ? '0 12px 30px -10px rgba(20, 88, 242, 0.25)'
              : '0 12px 30px -10px rgba(37, 99, 235, 0.12)'
          };
        }

        .hero-section {
          padding-top: clamp(8.5rem, 14vw, 11rem) !important;
          padding-bottom: clamp(5rem, 8vw, 8rem);
          padding-left: clamp(1.5rem, 5vw, 3rem);
          padding-right: clamp(1.5rem, 5vw, 3rem);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .service-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .matrix-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .pipeline-flow-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .metrics-gauge-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual-host { margin-top: 2rem; }
          .service-pillars-grid { grid-template-columns: 1fr; }
          .matrix-grid { grid-template-columns: repeat(2, 1fr); }
          .pipeline-flow-container { grid-template-columns: repeat(2, 1fr); }
          .metrics-gauge-grid { grid-template-columns: repeat(1, 1fr); }
        }

        @media (max-width: 640px) {
          .matrix-grid { grid-template-columns: 1fr; }
          .pipeline-flow-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── 1. DARK HERO SECTION (PERMANENT DARK MODE BASELINE) ── */}
        <section
          className="hero-section hero-talent-bg"
          style={{
            position: 'relative',
            minHeight: '88vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#050811',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Lighting Background */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
              filter: 'blur(90px)',
              pointerEvents: 'none',
            }}
          />

          <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
            <div>
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
                    flexWrap: 'wrap',
                  }}
                >
                  <Link href="/services" style={{ color: '#fff', textDecoration: 'none' }}>
                    Services
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Talent</span>
                </nav>
              </Reveal>

              <Reveal delay={80}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '20px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#60A5FA',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Zap size={14} /> Enterprise Human Capital Engine
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h1
                  style={{
                    fontSize: 'clamp(2.75rem, 5vw, 4.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    marginBottom: '1.25rem',
                  }}
                >
                  Architecting the High-Performance{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #10B981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Enterprise Workforce.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p
                  style={{
                    fontSize: '1.1875rem',
                    lineHeight: 1.75,
                    color: '#94A3B8',
                    maxWidth: '56ch',
                    marginBottom: '2.5rem',
                  }}
                >
                  Specialist talent. Faster access. Better fit. Connect your transformation roadmaps
                  with pre-vetted SAP experts, cloud architects, and technology leaders.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/contact"
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      padding: '0.95rem 2.25rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.5)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Talk to an Expert <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="#talent-pillars"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFFFFF',
                      padding: '0.95rem 2.25rem',
                      fontWeight: 600,
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      textDecoration: 'none',
                    }}
                  >
                    Sales Enquiries <ChevronRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Interactive Hero Telemetry Visual HUD */}
            <div className="hero-visual-host">
              <Reveal delay={250}>
                <div
                  className="hero-glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '1.75rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* HUD Top Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      paddingBottom: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                        WORKFORCE_TELEMETRY :: REAL-TIME
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#60A5FA',
                        fontFamily: 'monospace',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        borderRadius: '4px',
                      }}
                    >
                      {TELEMETRY_HUD_TABS[activeHudTab].badge}
                    </span>
                  </div>

                  {/* Telemetry Tab Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {TELEMETRY_HUD_TABS.map((tab, idx) => {
                      const Icon = tab.icon;
                      const isSelected = activeHudTab === idx;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveHudTab(idx)}
                          style={{
                            flex: 1,
                            padding: '0.6rem 0.4rem',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: isSelected ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                            backgroundColor: isSelected
                              ? 'rgba(59, 130, 246, 0.2)'
                              : 'rgba(0,0,0,0.2)',
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Icon size={14} />
                          <span>{tab.label.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Telemetry Display Card */}
                  <div
                    style={{
                      backgroundColor: 'rgba(5, 8, 17, 0.9)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      minHeight: '190px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {TELEMETRY_HUD_TABS[activeHudTab].metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.45rem 0',
                            borderBottom:
                              mIdx !== TELEMETRY_HUD_TABS[activeHudTab].metrics.length - 1
                                ? '1px dashed rgba(255,255,255,0.08)'
                                : 'none',
                          }}
                        >
                          <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>{m.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span
                              style={{
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                color: '#FFFFFF',
                              }}
                            >
                              {m.value}
                            </span>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: '#10B981',
                                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                padding: '0.1rem 0.4rem',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                              }}
                            >
                              {m.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: '1rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.75rem',
                        color: '#94A3B8',
                        fontStyle: 'italic',
                      }}
                    >
                      💡 {TELEMETRY_HUD_TABS[activeHudTab].highlight}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. THE THREE CORE SERVICE PILLARS (DYNAMIC THEME) ── */}
        <section
          id="talent-pillars"
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Our Service Models
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Integrated Talent Architecture
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#475569',
                    marginTop: '0.75rem',
                  }}
                >
                  From immediate project needs to strategic leadership search, TRYVION connects
                  enterprise organizations with verified expertise.
                </p>
              </div>
            </Reveal>

            <div className="service-pillars-grid">
              {SERVICE_PILLARS.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <Reveal key={idx} delay={idx * 100}>
                    <div
                      className="glass-panel glass-panel-interactive"
                      style={{
                        padding: '2.25rem',
                        borderRadius: '14px',
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
                            marginBottom: '1.5rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '1.5rem',
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              color: isDark ? '#3B82F6' : '#2563EB',
                            }}
                          >
                            {pillar.number}
                          </span>
                          <span
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: '20px',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF',
                              color: isDark ? '#60A5FA' : '#1D4ED8',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {pillar.badge}
                          </span>
                        </div>

                        <div
                          style={{
                            display: 'inline-flex',
                            padding: '0.75rem',
                            borderRadius: '10px',
                            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.12)' : '#EFF6FF',
                            color: '#2563EB',
                            marginBottom: '1rem',
                          }}
                        >
                          <IconComp size={24} />
                        </div>

                        <h3
                          style={{
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {pillar.title}
                        </h3>

                        <p
                          style={{
                            fontSize: '0.975rem',
                            color: isDark ? '#94A3B8' : '#475569',
                            lineHeight: 1.6,
                            marginBottom: '1.5rem',
                          }}
                        >
                          {pillar.description}
                        </p>

                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: '0 0 2rem 0',
                            display: 'grid',
                            gap: '0.65rem',
                          }}
                        >
                          {pillar.highlights.map((item, hIdx) => (
                            <li
                              key={hIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.6rem',
                                fontSize: '0.875rem',
                                color: isDark ? '#CBD5E1' : '#334155',
                              }}
                            >
                              <CheckCircle2
                                size={16}
                                style={{ color: '#059669', flexShrink: 0, marginTop: '0.15rem' }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href={pillar.link}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#2563EB',
                          textDecoration: 'none',
                        }}
                      >
                        Explore Service <ArrowRight size={16} />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. SKILL MATRIX & CAPABILITY GRID (FILTERABLE) ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF' }}>
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
                  Domain Capabilities
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Enterprise Capability & Skill Matrix
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Explore pre-screened specialist profiles and talent engagement models across
                  technology functions.
                </p>
              </div>
            </Reveal>

            {/* Category Filter Tabs */}
            <Reveal delay={100}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '3rem',
                  flexWrap: 'wrap',
                }}
              >
                {SKILL_MATRIX_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '30px',
                        border: '1px solid',
                        borderColor: isActive
                          ? '#2563EB'
                          : isDark
                            ? 'rgba(255,255,255,0.1)'
                            : '#E2E8F0',
                        backgroundColor: isActive
                          ? '#2563EB'
                          : isDark
                            ? 'rgba(15, 23, 42, 0.6)'
                            : '#F8FAFC',
                        color: isActive ? '#FFFFFF' : isDark ? '#CBD5E1' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Matrix Cards Display */}
            <div className="matrix-grid">
              <AnimatePresence mode="wait">
                {SKILL_MATRIX_DATA[activeCategory]?.map((item, idx) => (
                  <motion.div
                    key={item.title + idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                  >
                    <div
                      className="glass-panel glass-panel-interactive"
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
                        <h4
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            marginBottom: '1rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </h4>

                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {item.skills.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              style={{
                                fontSize: '0.725rem',
                                fontWeight: 600,
                                backgroundColor: isDark
                                  ? 'rgba(59, 130, 246, 0.12)'
                                  : 'rgba(37, 99, 235, 0.08)',
                                color: isDark ? '#60A5FA' : '#1D4ED8',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '4px',
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9'}`,
                          paddingTop: '1rem',
                          display: 'grid',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: isDark ? '#94A3B8' : '#64748B',
                          }}
                        >
                          <span>Experience Density:</span>
                          <span style={{ fontWeight: 600, color: isDark ? '#FFFFFF' : '#0F172A' }}>
                            {item.density}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: isDark ? '#94A3B8' : '#64748B',
                          }}
                        >
                          <span>Deployment Velocity:</span>
                          <span style={{ fontWeight: 600, color: '#10B981' }}>{item.speed}</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: isDark ? '#94A3B8' : '#64748B',
                          }}
                        >
                          <span>Engagement Model:</span>
                          <span style={{ fontWeight: 600, color: isDark ? '#CBD5E1' : '#334155' }}>
                            {item.model}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── 4. WORKFORCE LIFECYCLE RUNWAY (SOURCING TO SCALE) ── */}
        <section
          style={{
            padding: '7rem 2rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
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
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Quality & Governance Framework
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Workforce Lifecycle Runway
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Our end-to-end talent orchestration model guarantees seamless onboarding,
                  capability alignment, and high project retention.
                </p>
              </div>
            </Reveal>

            <div className="pipeline-flow-container">
              {WORKFORCE_RUNWAY.map((step, idx) => (
                <Reveal key={idx} delay={idx * 90}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2rem',
                      borderRadius: '12px',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        fontFamily: 'monospace',
                        color: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.25)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {step.phase}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.925rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. QUANTIFIABLE IMPACT & ANALYTICS ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Measurable Benchmarks
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Proven Talent Velocity & Quality
                </h2>
              </div>
            </Reveal>

            <div className="metrics-gauge-grid">
              {METRICS_GAUGES.map((metric, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '2.5rem',
                      borderRadius: '14px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '3.25rem',
                        fontWeight: 900,
                        color: '#10B981',
                        marginBottom: '0.5rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      {metric.value}
                    </div>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {metric.label}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        marginBottom: '1.75rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {metric.description}
                    </p>

                    {/* Animated Progress Meter */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          backgroundColor: '#10B981',
                        }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. EXECUTIVE CLOSING CTA SECTION (PERMANENT DARK BASELINE WITH OVERLAY IMAGE) ── */}
        <section
          className="cta-talent-bg"
          style={{
            padding: '8rem 2rem',
            backgroundColor: '#050811',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Glowing Radial Backdrop Accent */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '650px',
              height: '650px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
              filter: 'blur(85px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Reveal>
              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to Transform Your Enterprise Workforce?
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#94A3B8',
                  marginBottom: '3rem',
                  lineHeight: 1.7,
                }}
              >
                Scale your teams with domain-vetted talent, specialized ERP experts, and modern
                technology leaders.
              </p>

              <div
                style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link
                  href="/contact"
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    padding: '1.1rem 2.75rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 12px 30px -6px rgba(37, 99, 235, 0.6)',
                  }}
                >
                  Schedule a Talent Strategy Session <ArrowRight size={20} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
