'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  Sparkles,
  Activity,
  Terminal,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA DEFINITIONS ──
const AGENDA_PILLARS = [
  {
    id: '01',
    icon: Briefcase,
    title: 'Business Alignment',
    desc: 'Mapping AI initiatives directly to core strategic objectives and P&L drivers.',
  },
  {
    id: '02',
    icon: Database,
    title: 'Data Readiness',
    desc: 'Structuring enterprise data assets for secure, scalable model consumption.',
  },
  {
    id: '03',
    icon: Cpu,
    title: 'Technology Architecture',
    desc: 'Building composable infrastructure to deploy and monitor LLMs securely.',
  },
  {
    id: '04',
    icon: Users,
    title: 'People & Change',
    desc: 'Upskilling workforce and managing organizational transformation.',
  },
  {
    id: '05',
    icon: ShieldCheck,
    title: 'Governance & Risk',
    desc: 'Establishing guardrails for ethics, compliance, and IP protection.',
  },
  {
    id: '06',
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
      'We assess your current operational baseline, data readiness, and technical infrastructure to identify friction points where AI delivers immediate impact without compromising security.',
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
      'We identify high-impact use cases aligned with business strategy, prioritizing initiatives based on feasibility, value, and risk profiles.',
    outcomes: [
      'Use Case Identification Workshop',
      'Feasibility & Value Scoring Matrix',
      'Strategic Roadmap Prioritization',
    ],
  },
  {
    id: '03',
    title: 'Architecture Design',
    icon: PenTool,
    focus:
      'We design target-state architecture, integration patterns, and governance models required to support scalable AI operations.',
    outcomes: [
      'Target Architecture Blueprint',
      'Data Pipeline & Vector DB Design',
      'Governance Framework Definition',
    ],
  },
  {
    id: '04',
    title: 'Pilot & Prove',
    icon: Rocket,
    focus:
      'We move through Explore → Prototype → Industrialize using reusable AI microservices and agent lifecycle management.',
    outcomes: [
      'MVP Agentic System',
      'Pilot Deployment in Sandbox',
      'Impact Measurement & Fine-tuning',
    ],
  },
  {
    id: '05',
    title: 'Enterprise Scale',
    icon: Layers,
    focus:
      'We industrialize the solution, establishing enterprise MLOps/LLMOps practices and expanding across business units with full governance.',
    outcomes: [
      'LLMOps Pipeline Implementation',
      'Enterprise-wide Rollout',
      'Continuous Autonomous Optimization',
    ],
  },
];

const VALUE_PORTFOLIO_QUADRANTS = [
  {
    title: 'Strategic Transformations',
    tag: 'High Value / High Complexity',
    desc: 'Multi-system autonomous workflows & proprietary fine-tuned foundation models.',
    bgLight: 'rgba(37, 99, 235, 0.06)',
    bgDark: 'rgba(20, 88, 242, 0.12)',
    borderLight: 'rgba(37, 99, 235, 0.3)',
    borderDark: 'rgba(59, 130, 246, 0.5)',
  },
  {
    title: 'Quick Wins',
    tag: 'High Value / Low Complexity',
    desc: 'Generative search, automated doc extraction & Copilot augmentations.',
    bgLight: 'rgba(16, 185, 129, 0.06)',
    bgDark: 'rgba(16, 185, 129, 0.12)',
    borderLight: 'rgba(16, 185, 129, 0.3)',
    borderDark: 'rgba(16, 185, 129, 0.5)',
  },
  {
    title: 'Long-Term Experiments',
    tag: 'Low Value / High Complexity',
    desc: 'Custom foundational model research and bleeding-edge autonomous R&D.',
    bgLight: 'var(--surface-subtle, #F8FAFC)',
    bgDark: 'rgba(255, 255, 255, 0.03)',
    borderLight: 'var(--border-subtle, #E2E8F0)',
    borderDark: 'rgba(255, 255, 255, 0.1)',
  },
  {
    title: 'Task Automations',
    tag: 'Low Value / Low Complexity',
    desc: 'Basic script automation & off-the-shelf single-utility AI widgets.',
    bgLight: 'var(--surface-subtle, #F8FAFC)',
    bgDark: 'rgba(255, 255, 255, 0.03)',
    borderLight: 'var(--border-subtle, #E2E8F0)',
    borderDark: 'rgba(255, 255, 255, 0.1)',
  },
];

const WHY_TRYVION = [
  {
    title: 'Business-First Focus',
    desc: 'We start with the business outcome that needs to move—not an AI model looking for a problem.',
    badge: 'ROI Centric',
  },
  {
    title: 'Strategy to Execution',
    desc: 'We bridge executive vision with execution-ready architecture, production code, and delivery.',
    badge: 'Full Lifecycle',
  },
  {
    title: 'GenAI + Agentic AI',
    desc: 'Progress from basic copilots to autonomous agents capable of reasoning across enterprise workflows.',
    badge: 'Next-Gen Native',
  },
  {
    title: 'SAP + Enterprise AI',
    desc: 'Deep expertise connecting SAP BTP and core enterprise ERP data with state-of-the-art LLMs.',
    badge: 'ERP Integrated',
  },
  {
    title: 'Technology Agnostic',
    desc: 'Unbiased selection of optimal model providers, vector storage, and hardware platforms tailored to you.',
    badge: 'Unbiased Stack',
  },
  {
    title: 'Built for Scale & Control',
    desc: 'Embed FinOps for cost discipline alongside enterprise reusable guardrails and latency optimization.',
    badge: 'Governance Built-in',
  },
];

const RESPONSIBLE_AI = [
  {
    icon: Lock,
    title: 'Enterprise Security & IP Protection',
    desc: 'Safeguard proprietary data assets with role-based access control, encryption, and zero-data-retention model guarantees.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance & Auditability',
    desc: 'Align with evolving EU AI Act and global governance standards while maintaining complete lineage and logging.',
  },
  {
    icon: Eye,
    title: 'Human-in-the-Loop Safeguards',
    desc: 'Ensure active human approval steps, real-time hallucination scoring, and continuous toxicity monitoring.',
  },
];

const METRICS = [
  {
    category: 'Productivity & Throughput',
    metrics: 'Task Completion Time, Automation Coverage',
    impact: '+42% Operational Speed',
    icon: Clock,
  },
  {
    category: 'Financial Efficiency',
    metrics: 'Cost per Transaction, OpEx Reduction',
    impact: '-28% Expense Reduction',
    icon: TrendingUp,
  },
  {
    category: 'Accuracy & Compliance',
    metrics: 'Hallucination Mitigation, Audit Accuracy',
    impact: '99.9% Compliance Score',
    icon: ShieldCheck,
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

export default function EnterpriseAIStrategyPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';
  const [activeStage, setActiveStage] = useState(0);

  const currentStageData = FRAMEWORK_STAGES[activeStage];
  const StageIcon = currentStageData.icon;

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

        .hero-cyber-grid-bg {
          background-color: #050811 !important;
          background-image:
            radial-gradient(rgba(59, 130, 246, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 8, 17, 0.75), rgba(5, 8, 17, 0.92)),
            url('/images/planetary-wave.png');
          background-size: 32px 32px, 64px 64px, cover, cover;
          background-position: center, center, center, center;
          background-repeat: repeat, repeat, no-repeat, no-repeat;
        }

        .glass-panel {
          background: ${isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
          box-shadow: ${isDark ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.05)'};
        }

        .hero-glass-panel {
          background: rgba(15, 23, 42, 0.65) !important;
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

        /* Hero Layout & Responsive Header Spacing */
        .hero-section {
          padding-top: clamp(8.5rem, 14vw, 11rem) !important;
          padding-bottom: clamp(5rem, 8vw, 8rem);
          padding-left: clamp(1.5rem, 5vw, 3rem);
          padding-right: clamp(1.5rem, 5vw, 3rem);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .agenda-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .responsible-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        /* Horizontal Tab Scroller for Stages */
        .framework-horizontal-scroller {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
          scrollbar-width: thin;
          scrollbar-color: ${isDark ? 'rgba(59, 130, 246, 0.3) transparent' : '#CBD5E1 transparent'};
          -webkit-overflow-scrolling: touch;
        }

        .framework-horizontal-scroller::-webkit-scrollbar {
          height: 6px;
        }
        .framework-horizontal-scroller::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(59, 130, 246, 0.3)' : '#CBD5E1'};
          border-radius: 4px;
        }

        .framework-tab-item {
          flex: 0 0 240px;
          text-align: left;
          padding: 1.25rem 1.5rem;
          border-radius: 12px;
          border: 1px solid;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        /* Value Matrix HUD */
        .value-matrix-wrapper {
          position: relative;
          max-width: 960px;
          margin: 3.5rem auto 0;
          padding: 1.5rem;
          border-left: 2px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)'};
          border-bottom: 2px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)'};
          background: ${isDark ? 'rgba(10, 16, 30, 0.6)' : 'rgba(248, 250, 252, 0.8)'};
          border-radius: 0 16px 0 16px;
        }

        .value-matrix-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .matrix-axis-y {
          position: absolute;
          left: -4.5rem;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #64748B;
        }

        .matrix-axis-x {
          position: absolute;
          bottom: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #64748B;
        }

        .metrics-table-container {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'};
          background: ${isDark ? 'rgba(15, 23, 42, 0.5)' : '#FFFFFF'};
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .hero-section { padding-top: 8.5rem !important; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual-host { display: none; }
          .agenda-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .responsible-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .agenda-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .value-matrix-grid { grid-template-columns: 1fr; }
          .matrix-axis-y, .matrix-axis-x { display: none; }
          .value-matrix-wrapper { border-left: none; border-bottom: none; padding: 0; background: transparent; }
          .framework-tab-item { flex: 0 0 200px; }
        }
      `}</style>

      <main>
        {/* ── HERO SECTION (ALWAYS DARK IN ALL THEMES) ── */}
        <section
          className="hero-section hero-cyber-grid-bg"
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
          {/* Dynamic Ambient Glow Effects */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '8%',
              width: '420px',
              height: '420px',
              background: 'radial-gradient(circle, rgba(20,88,242,0.22) 0%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '12%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
            <div>
              {/* Breadcrumbs - High Contrast for Dark Background */}
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
                    flexWrap: 'wrap',
                  }}
                >
                  <Link
                    href="/services"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    Services
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6 }} />
                  <Link
                    href="/services/artificial-intelligence"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    Artificial Intelligence
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6 }} />
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Enterprise AI Strategy</span>
                </nav>
              </Reveal>

              <Reveal delay={80}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.4rem 0.9rem',
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
                  <Sparkles size={14} /> Enterprise AI Transformation Architecture
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h1
                  style={{
                    fontSize: 'clamp(2.75rem, 5.2vw, 4.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    marginBottom: '1.25rem',
                  }}
                >
                  From AI Strategy <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #10B981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    To Scalable Enterprise Impact.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p
                  style={{
                    fontSize: '1.1875rem',
                    lineHeight: 1.75,
                    color: '#94A3B8',
                    maxWidth: '54ch',
                    marginBottom: '2.5rem',
                  }}
                >
                  TRYVION moves organizations beyond isolated proof-of-concepts to high-performing,
                  secure enterprise capabilities with disciplined ROI and agentic automation.
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
                    Talk to an AI Expert <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="#framework"
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
                    Explore Framework <ChevronRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Visual Futuristic HUD Node */}
            <div className="hero-visual-host">
              <Reveal delay={250}>
                <div
                  style={{
                    width: '380px',
                    height: '380px',
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Orbit Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '1px dashed rgba(59, 130, 246, 0.35)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: '28px',
                      borderRadius: '50%',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                    }}
                  />

                  {/* Core Glass HUD Node */}
                  <div
                    className="hero-glass-panel"
                    style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 40px rgba(37, 99, 235, 0.35)',
                      zIndex: 2,
                    }}
                  >
                    <Cpu size={56} style={{ color: '#3B82F6', marginBottom: '0.5rem' }} />
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        color: '#10B981',
                        fontWeight: 700,
                      }}
                    >
                      CORE ACTIVE
                    </span>
                  </div>

                  {/* Satellite Floating Badges */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="hero-glass-panel"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '0px',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Activity size={14} style={{ color: '#10B981' }} />
                    LLMOps Active
                  </motion.div>

                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="hero-glass-panel"
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '-10px',
                      padding: '0.6rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Terminal size={14} style={{ color: '#60A5FA' }} />
                    Agentic Flow v4
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── ENTERPRISE AI AGENDA PILLARS ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#070B14' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Systemic Architecture
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  The Enterprise AI Agenda
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Sustainable AI transformation requires synchronizing six foundational pillars
                  across enterprise technology and culture.
                </p>
              </div>
            </Reveal>

            <div className="agenda-grid">
              {AGENDA_PILLARS.map((pillar, idx) => (
                <Reveal key={pillar.id} delay={idx * 70}>
                  <div
                    className="glass-panel glass-panel-interactive"
                    style={{
                      padding: '2.25rem',
                      borderRadius: '12px',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)',
                      }}
                    >
                      {pillar.id}
                    </span>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '10px',
                        backgroundColor: isDark
                          ? 'rgba(59, 130, 246, 0.12)'
                          : 'rgba(37, 99, 235, 0.08)',
                        border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <pillar.icon size={26} style={{ color: '#2563EB' }} />
                    </div>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FRAMEWORK STAGES (HORIZONTAL TAB SCROLLER) ── */}
        <section
          id="framework"
          style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC' }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ marginBottom: '3rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Execution Lifecycle
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  The TRYVION Strategy Framework
                </h2>
              </div>
            </Reveal>

            {/* Horizontal Tab Scroller */}
            <div className="framework-horizontal-scroller">
              {FRAMEWORK_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.id}
                    className="framework-tab-item"
                    onClick={() => setActiveStage(idx)}
                    style={{
                      borderColor: isActive
                        ? isDark
                          ? 'rgba(59, 130, 246, 0.6)'
                          : '#2563EB'
                        : isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(15,23,42,0.08)',
                      backgroundColor: isActive
                        ? isDark
                          ? 'rgba(37, 99, 235, 0.2)'
                          : '#FFFFFF'
                        : isDark
                          ? 'rgba(15, 23, 42, 0.4)'
                          : 'rgba(255, 255, 255, 0.6)',
                      boxShadow: isActive && !isDark ? '0 4px 12px rgba(37,99,235,0.12)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: isActive ? '#2563EB' : '#64748B',
                        }}
                      >
                        PHASE {stage.id}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabDot"
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#2563EB',
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: isActive
                          ? isDark
                            ? '#FFFFFF'
                            : '#0F172A'
                          : isDark
                            ? '#94A3B8'
                            : '#64748B',
                      }}
                    >
                      {stage.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail Card Component */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-panel"
                style={{
                  padding: '3.5rem',
                  borderRadius: '16px',
                  border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    marginBottom: '1.75rem',
                  }}
                >
                  <div
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: isDark
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'rgba(37, 99, 235, 0.1)',
                      border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.25)'}`,
                      color: '#2563EB',
                    }}
                  >
                    <StageIcon size={32} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: '#10B981',
                        fontWeight: 700,
                      }}
                    >
                      STAGE {currentStageData.id} OBJECTIVE
                    </span>
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        margin: 0,
                      }}
                    >
                      {currentStageData.title}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '1.15rem',
                    color: isDark ? '#CBD5E1' : '#334155',
                    lineHeight: 1.8,
                    marginBottom: '2.5rem',
                  }}
                >
                  {currentStageData.focus}
                </p>

                <div
                  style={{
                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}`,
                    paddingTop: '2rem',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: '#64748B',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Key Deliverables & Architectural Milestones
                  </h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {currentStageData.outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}
                      >
                        <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
                        <span
                          style={{
                            fontSize: '1.05rem',
                            color: isDark ? '#F8FAFC' : '#0F172A',
                            fontWeight: 500,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── VALUE PORTFOLIO MATRIX SECTION ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#070B14' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Prioritization Framework
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  AI Value Portfolio Scoring Matrix
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Evaluating AI initiatives on organizational complexity versus financial ROI to
                  prioritize high-value wins.
                </p>
              </div>
            </Reveal>

            {/* 2x2 Matrix HUD Wrapper */}
            <div className="value-matrix-wrapper">
              <span className="matrix-axis-y">Business Value / ROI ↑</span>
              <span className="matrix-axis-x">Feasibility & Ease of Execution →</span>

              <div className="value-matrix-grid">
                {VALUE_PORTFOLIO_QUADRANTS.map((quad, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      backgroundColor: isDark ? quad.bgDark : quad.bgLight,
                      border: `1px solid ${isDark ? quad.borderDark : quad.borderLight}`,
                      borderRadius: '12px',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#64748B',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {quad.tag}
                    </span>
                    <h4
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {quad.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#CBD5E1' : '#475569',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {quad.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESPONSIBLE AI & GOVERNANCE ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="responsible-grid">
              <Reveal>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      color: '#10B981',
                      textTransform: 'uppercase',
                    }}
                  >
                    Enterprise Safeguards
                  </span>
                  <h2
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                      fontWeight: 800,
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      marginTop: '0.5rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    Responsible AI & Enterprise Governance
                  </h2>
                  <p
                    style={{
                      fontSize: '1.15rem',
                      color: isDark ? '#94A3B8' : '#475569',
                      lineHeight: 1.8,
                    }}
                  >
                    Rapid innovation requires robust governance. TRYVION integrates enterprise risk
                    frameworks, audit trails, and human-in-the-loop control systems into every layer
                    of deployment.
                  </p>
                </div>
              </Reveal>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {RESPONSIBLE_AI.map((item, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div
                      className="glass-panel"
                      style={{
                        display: 'flex',
                        gap: '1.5rem',
                        padding: '1.75rem',
                        borderRadius: '12px',
                      }}
                    >
                      <div
                        style={{
                          padding: '0.85rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#10B981',
                          height: 'fit-content',
                        }}
                      >
                        <item.icon size={26} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                            marginBottom: '0.4rem',
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.95rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY TRYVION SECTION ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#070B14' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Competitive Advantage
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Why Partner With TRYVION
                </h2>
              </div>
            </Reveal>

            <div className="why-grid">
              {WHY_TRYVION.map((item, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div
                    className="glass-panel glass-panel-interactive"
                    style={{
                      padding: '2.25rem',
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
                          display: 'inline-block',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '4px',
                          backgroundColor: isDark
                            ? 'rgba(59, 130, 246, 0.12)'
                            : 'rgba(37, 99, 235, 0.08)',
                          color: '#2563EB',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          marginBottom: '1.25rem',
                        }}
                      >
                        {item.badge}
                      </div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEASURABLE IMPACT TABLE ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Proven Benchmarks
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Measurable Business Impact
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="metrics-table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)'}`,
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#F1F5F9',
                      }}
                    >
                      <th
                        style={{
                          padding: '1.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#64748B',
                          textTransform: 'uppercase',
                        }}
                      >
                        Category
                      </th>
                      <th
                        style={{
                          padding: '1.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#64748B',
                          textTransform: 'uppercase',
                        }}
                      >
                        Tracked KPI Metrics
                      </th>
                      <th
                        style={{
                          padding: '1.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#64748B',
                          textTransform: 'uppercase',
                        }}
                      >
                        Observed Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {METRICS.map((row, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom:
                            idx !== METRICS.length - 1
                              ? `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)'}`
                              : 'none',
                        }}
                      >
                        <td
                          style={{
                            padding: '1.5rem',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <row.icon size={20} style={{ color: '#2563EB' }} />
                            {row.category}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: '1.5rem',
                            fontSize: '0.95rem',
                            color: isDark ? '#94A3B8' : '#64748B',
                          }}
                        >
                          {row.metrics}
                        </td>
                        <td
                          style={{
                            padding: '1.5rem',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            color: '#10B981',
                          }}
                        >
                          {row.impact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FINAL CTA BANNER (CRISP WHITE HEADLINE) ── */}
        <section
          style={{
            padding: '8rem 2rem',
            backgroundColor: '#050811',
            backgroundImage: `linear-gradient(to bottom, rgba(5, 8, 17, 0.85), rgba(5, 8, 17, 0.95)), url('/images/enterprise-ai-strategy.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Radial Light Aura */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
              filter: 'blur(80px)',
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
                  color: '#FFFFFF !important',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to accelerate your enterprise AI roadmap?
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#94A3B8',
                  marginBottom: '3rem',
                  lineHeight: 1.7,
                }}
              >
                Schedule an executive strategy session to evaluate your current data estate and
                build an execution-ready AI deployment roadmap.
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
                  Schedule Executive Session <ArrowRight size={20} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
