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

const POD_ROLES = [
  {
    id: 'governance',
    title: 'Program Governance / Advisory',
    description: 'Transformation governance, program leadership and senior advisory capability.',
    icon: ShieldCheck,
  },
  {
    id: 'architecture',
    title: 'Enterprise & SAP Architecture',
    description: 'Enterprise architecture, SAP solution design and clean-core direction.',
    icon: Building2,
  },
  {
    id: 'functional',
    title: 'Business Process & Functional Expertise',
    description: 'Business process design, SAP functional expertise and domain alignment.',
    icon: Briefcase,
  },
  {
    id: 'technology',
    title: 'Technology & Integration Expertise',
    description: 'Integration, extension, platform and technology delivery expertise.',
    icon: Cpu,
  },
  {
    id: 'data',
    title: 'Data & Analytics Expertise',
    description: 'Data foundations, analytics, reporting and decision-support capability.',
    icon: Database,
  },
  {
    id: 'change',
    title: 'Change, Learning & Adoption',
    description: 'Change management, learning, enablement and adoption support.',
    icon: Users,
  },
  {
    id: 'testing',
    title: 'Testing, Assurance & Control',
    description: 'Testing, quality assurance, controls and delivery confidence.',
    icon: CheckCircle2,
  },
  {
    id: 'operate',
    title: 'Deployment & Operate',
    description: 'Deployment readiness, transition and operational continuity.',
    icon: Zap,
  },
];

const COMPARISON_ROWS = [
  {
    feature: 'Talent Discovery',
    traditional: 'Profile and keyword-led candidate search',
    tryvion:
      'Domain-led talent discovery based on SAP skills, solution depth and relevant experience',
  },
  {
    feature: 'Role & Skill Matching',
    traditional: 'Matching primarily against job descriptions and years of experience',
    tryvion:
      'Matching based on role, module, process expertise, project experience and transformation context',
  },
  {
    feature: 'Talent Validation',
    traditional: 'CV screening and standard recruiter assessment',
    tryvion: 'SAP practitioner-led validation of functional, technical and delivery capability',
  },
  {
    feature: 'Project Fit',
    traditional: 'Individual profiles matched to open positions',
    tryvion:
      'Talent aligned to project phase, delivery role, industry context and team requirements',
  },
  {
    feature: 'Engagement Model',
    traditional: 'Primarily individual resource augmentation',
    tryvion: 'Flexible access to individual specialists, expert-led pods and advisory capability',
  },
];

const RIGHT_FIT_STAGES = [
  {
    stage: '01',
    title: 'Understand the Need',
    description:
      'We go beyond the job description to understand the SAP landscape, role expectations, transformation context and team environment.',
    icon: Search,
  },
  {
    stage: '02',
    title: 'Assess & Match Expertise',
    description:
      'Practitioner-led evaluation of functional, technical and solution expertise relevant to the role.',
    icon: Target,
  },
  {
    stage: '03',
    title: 'Validate Experience & Fit',
    description:
      'Assess hands-on delivery experience, industry relevance, problem-solving capability and organisational fit.',
    icon: ShieldCheck,
  },
  {
    stage: '04',
    title: 'Curate the Shortlist',
    description:
      'Present a focused shortlist of candidates validated against the capabilities that matter — not simply keyword-matched CVs.',
    icon: UserCheck,
  },
  {
    stage: '05',
    title: 'Support the Transition',
    description:
      'Stay connected through selection, onboarding and early transition to help both client and candidate start successfully.',
    icon: ArrowRight,
  },
];

// ── REUSABLE ANIMATION ───────────────────────────────────────────────────────

const Reveal = ({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{
      duration: 0.7,
      delay: delay / 1000,
      ease: [0.16, 1, 0.3, 1],
    }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

export default function EnterpriseTalentPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  const [podCounts, setPodCounts] = useState<Record<string, number>>(
    Object.fromEntries(POD_ROLES.map((role) => [role.id, 1])),
  );

  const totalPodHeadcount = Object.values(podCounts).reduce((sum, count) => sum + count, 0);

  const updatePodCount = (id: string, delta: number) => {
    setPodCounts((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(9, (current[id] ?? 0) + delta)),
    }));
  };

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
          background-image: url('/images/tryvion-talent.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .cta-talent-bg {
          background-color: #050811 !important;
          background-image: url('/images/talent-cta-bg.png');
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

        .talent-solutions-grid {
          display: grid;
          grid-template-columns: minmax(0, 760px);
          justify-content: center;
        }

        .pod-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
          gap: 1.5rem;
          align-items: stretch;
        }

        .pod-role-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .comparison-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          overflow: hidden;
          border-radius: 14px;
        }

        .comparison-table th,
        .comparison-table td {
          padding: 1.25rem 1.4rem;
          text-align: left;
          vertical-align: top;
          border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#E2E8F0'};
        }

        .comparison-table th {
          font-size: 0.85rem;
          font-weight: 800;
        }

        .comparison-table td {
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .comparison-table tr:last-child td {
          border-bottom: 0;
        }

        .right-fit-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .right-fit-card {
          min-width: 0;
        }

        @media (max-width: 1180px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .pod-layout {
            grid-template-columns: 1fr;
          }

          .right-fit-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .hero-section {
            padding-top: 7.5rem !important;
          }

          .pod-role-grid {
            grid-template-columns: 1fr;
          }

          .comparison-table {
            display: block;
            overflow-x: auto;
            white-space: normal;
          }

          .comparison-table table {
            min-width: 760px;
          }

          .right-fit-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding-left: 1rem;
            padding-right: 1rem;
          }
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
                    Enterprise Workforce
                  </span>
                  .
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
                    href="/contact/customer-support?intent=expert"
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
                    href="/contact/sales-enquiries"
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
          </div>
        </section>

        {/* ── 2. TALENT SOLUTIONS ─────────────────────────────────────────── */}
        <section
          id="talent-pillars"
          style={{
            padding: 'clamp(5rem, 8vw, 7rem) 1.25rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Our Service Model
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.2rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    margin: '0.5rem 0 0',
                    letterSpacing: '-0.035em',
                  }}
                >
                  Talent Solutions
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    color: isDark ? '#94A3B8' : '#475569',
                    margin: '0.85rem 0 0',
                  }}
                >
                  Access SAP capability tailored to implementation, migration and innovation
                  roadmaps — with domain-vetted specialists, expert-led pods and advisory depth.
                </p>
              </div>
            </Reveal>

            <div className="talent-solutions-grid">
              <Reveal>
                <div
                  className="glass-panel glass-panel-interactive"
                  style={{
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    borderRadius: '16px',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          width: 52,
                          height: 52,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 12,
                          backgroundColor: isDark ? 'rgba(59,130,246,.12)' : '#EFF6FF',
                          color: '#2563EB',
                        }}
                      >
                        <Building2 size={25} />
                      </span>
                      <div>
                        <h3
                          style={{
                            margin: '0.2rem 0 0',
                            fontSize: '1.45rem',
                            lineHeight: 1.2,
                            fontWeight: 800,
                            color: isDark ? '#FFFFFF' : '#0F172A',
                          }}
                        >
                          SAP Talent Solutions
                        </h3>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.3rem 0.7rem',
                        borderRadius: 20,
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        backgroundColor: isDark ? 'rgba(59,130,246,.15)' : '#EFF6FF',
                        color: isDark ? '#60A5FA' : '#1D4ED8',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Core Differentiator
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '0 0 1.5rem',
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: isDark ? '#94A3B8' : '#475569',
                    }}
                  >
                    Access specialized SAP capability tailored to your implementation, migration,
                    and innovation roadmaps.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: '0.7rem 1rem',
                    }}
                  >
                    {[
                      'SAP S/4HANA, BTP, SuccessFactors & Ariba expertise',
                      'Contract specialists, advisory leads & project pods',
                      'Quality-first selection: 1 carefully matched candidate vs. 15 generic CVs',
                      'Clean Core and Business AI implementation readiness',
                    ].map((item) => (
                      <div
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.55rem',
                          fontSize: '0.88rem',
                          lineHeight: 1.5,
                          color: isDark ? '#CBD5E1' : '#334155',
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: '#059669', flexShrink: 0, marginTop: 3 }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/services/talent"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '1.75rem',
                      color: '#2563EB',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    Explore SAP Talent Solutions <ArrowRight size={17} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 3. POD COMPOSITION ───────────────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(5rem, 8vw, 7rem) 1.25rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Configurable Expert Pods
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.15rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    margin: '0.5rem 0 0',
                    letterSpacing: '-0.035em',
                  }}
                >
                  Select Pod Composition
                </h2>
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: isDark ? '#94A3B8' : '#64748B',
                    margin: '0.85rem 0 0',
                  }}
                >
                  Build the specialist mix around your transformation phase, capability gaps and
                  delivery requirements.
                </p>
              </div>
            </Reveal>

            <div className="pod-layout">
              <Reveal>
                <div
                  className="glass-panel"
                  style={{
                    padding: 'clamp(1.1rem, 3vw, 1.5rem)',
                    borderRadius: 16,
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1rem',
                      padding: '0.25rem 0.25rem 1rem',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,.07)' : '#E2E8F0'}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: isDark ? '#CBD5E1' : '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Pod Composition
                    </span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        color: '#10B981',
                      }}
                    >
                      {totalPodHeadcount} FTE{totalPodHeadcount === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div className="pod-role-grid">
                    {POD_ROLES.map((role) => {
                      const Icon = role.icon;
                      const count = podCounts[role.id] ?? 0;

                      return (
                        <div
                          key={role.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.8rem',
                            padding: '1rem',
                            minHeight: 112,
                            borderRadius: 12,
                            backgroundColor: isDark ? 'rgba(15,23,42,.62)' : '#F8FAFC',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,.07)' : '#E2E8F0'}`,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-flex',
                                width: 40,
                                height: 40,
                                flexShrink: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: isDark ? 'rgba(37,99,235,.12)' : '#EFF6FF',
                                color: '#2563EB',
                              }}
                            >
                              <Icon size={19} />
                            </span>
                            <div style={{ minWidth: 0 }}>
                              <strong
                                style={{
                                  display: 'block',
                                  fontSize: '0.87rem',
                                  lineHeight: 1.35,
                                  color: isDark ? '#F8FAFC' : '#172033',
                                }}
                              >
                                {role.title}
                              </strong>
                              <span
                                style={{
                                  display: 'block',
                                  marginTop: '0.25rem',
                                  fontSize: '0.72rem',
                                  lineHeight: 1.45,
                                  color: isDark ? '#64748B' : '#64748B',
                                }}
                              >
                                {role.description}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              flexShrink: 0,
                            }}
                          >
                            <button
                              type="button"
                              aria-label={`Decrease ${role.title} headcount`}
                              onClick={() => updatePodCount(role.id, -1)}
                              disabled={count === 0}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 7,
                                border: `1px solid ${isDark ? 'rgba(255,255,255,.1)' : '#CBD5E1'}`,
                                background: isDark ? '#0B1220' : '#FFFFFF',
                                color: isDark ? '#CBD5E1' : '#475569',
                                cursor: count === 0 ? 'not-allowed' : 'pointer',
                                opacity: count === 0 ? 0.45 : 1,
                                fontSize: '1rem',
                                lineHeight: 1,
                              }}
                            >
                              −
                            </button>
                            <span
                              aria-live="polite"
                              style={{
                                minWidth: 24,
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                color: isDark ? '#FFFFFF' : '#0F172A',
                              }}
                            >
                              {count}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${role.title} headcount`}
                              onClick={() => updatePodCount(role.id, 1)}
                              disabled={count === 9}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 7,
                                border: '1px solid #2563EB',
                                background: '#2563EB',
                                color: '#FFFFFF',
                                cursor: count === 9 ? 'not-allowed' : 'pointer',
                                opacity: count === 9 ? 0.45 : 1,
                                fontSize: '1rem',
                                lineHeight: 1,
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div
                  className="glass-panel"
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    borderRadius: 16,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#10B981',
                      }}
                    >
                      Pod Blueprint
                    </span>
                    <h3
                      style={{
                        margin: '0.6rem 0 0.75rem',
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                        lineHeight: 1.2,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                      }}
                    >
                      A capability-led team, not a collection of CVs.
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        color: isDark ? '#94A3B8' : '#64748B',
                      }}
                    >
                      Compose the expertise around the work that needs to be delivered. The model
                      can combine governance, architecture, functional, technology, data, change,
                      assurance and operational capability.
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: '2rem',
                      padding: '1rem',
                      borderRadius: 12,
                      backgroundColor: isDark ? 'rgba(16,185,129,.08)' : '#ECFDF5',
                      border: `1px solid ${isDark ? 'rgba(16,185,129,.2)' : '#A7F3D0'}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: isDark ? '#94A3B8' : '#475569',
                        }}
                      >
                        Configured pod
                      </span>
                      <strong
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '1.25rem',
                          color: '#10B981',
                        }}
                      >
                        {totalPodHeadcount} FTE
                      </strong>
                    </div>
                    <Link
                      href="/contact"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        marginTop: '1rem',
                        padding: '0.85rem 1rem',
                        borderRadius: 7,
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                      }}
                    >
                      Lock in Pod Composition & Request Profiles <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 4. THE TRYVION TALENT ADVANTAGE ───────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(5rem, 8vw, 7rem) 1.25rem',
            backgroundColor: isDark ? '#070B14' : '#F8FAFC',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Generic Staffing vs. TRYVION SAP Talent
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.15rem, 4.5vw, 3.35rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    margin: '0.55rem 0 0',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Traditional SAP Staffing vs. The TRYVION Talent Advantage
                </h2>
                <p
                  style={{
                    margin: '1rem 0 0',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: isDark ? '#94A3B8' : '#64748B',
                  }}
                >
                  Outcomes, not CVs. We don&apos;t start with who&apos;s available. We start with
                  what your transformation needs.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div
                style={{
                  overflowX: 'auto',
                  borderRadius: 14,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : '#E2E8F0'}`,
                  background: isDark ? '#0A0F1D' : '#FFFFFF',
                }}
              >
                <table className="comparison-table">
                  <thead>
                    <tr style={{ backgroundColor: isDark ? '#080C16' : '#FFFFFF' }}>
                      <th style={{ width: '24%', color: isDark ? '#FFFFFF' : '#0F172A' }}>
                        Feature Area
                      </th>
                      <th style={{ width: '36%', color: isDark ? '#CBD5E1' : '#475569' }}>
                        Traditional SAP Staffing
                      </th>
                      <th style={{ width: '40%', color: '#3B82F6' }}>
                        The TRYVION Talent Advantage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature}>
                        <td
                          style={{
                            fontWeight: 800,
                            color: isDark ? '#F8FAFC' : '#172033',
                            backgroundColor: isDark ? '#0D1322' : '#F8FAFC',
                          }}
                        >
                          {row.feature}
                        </td>
                        <td style={{ color: isDark ? '#94A3B8' : '#64748B' }}>{row.traditional}</td>
                        <td
                          style={{
                            color: isDark ? '#60A5FA' : '#1D4ED8',
                            fontWeight: 650,
                          }}
                        >
                          {row.tryvion}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. RIGHT-FIT TALENT ───────────────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(5rem, 8vw, 7rem) 1.25rem',
            backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 3.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    color: '#10B981',
                    textTransform: 'uppercase',
                  }}
                >
                  Our Approach
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.15rem, 4.5vw, 3.35rem)',
                    fontWeight: 800,
                    lineHeight: 1.08,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    margin: '0.55rem 0 0',
                    letterSpacing: '-0.04em',
                  }}
                >
                  From Role Requirement to Right-Fit Talent
                </h2>
                <p
                  style={{
                    margin: '1rem 0 0',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: isDark ? '#94A3B8' : '#64748B',
                  }}
                >
                  A domain-led hiring approach that evaluates SAP expertise, transformation
                  experience and organisational fit — helping clients make better-informed hiring
                  decisions.
                </p>
              </div>
            </Reveal>

            <div className="right-fit-grid">
              {RIGHT_FIT_STAGES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.stage} delay={idx * 70} className="right-fit-card">
                    <div
                      className="glass-panel glass-panel-interactive"
                      style={{
                        height: '100%',
                        minHeight: 310,
                        padding: '1.5rem',
                        borderRadius: 14,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '1.45rem',
                            fontWeight: 900,
                            color: isDark ? '#3B82F6' : '#2563EB',
                          }}
                        >
                          {item.stage}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            width: 42,
                            height: 42,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: isDark ? 'rgba(16,185,129,.1)' : '#ECFDF5',
                            color: '#10B981',
                          }}
                        >
                          <Icon size={20} />
                        </span>
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: '1.05rem',
                          lineHeight: 1.3,
                          fontWeight: 800,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          margin: '0.75rem 0 0',
                          fontSize: '0.86rem',
                          lineHeight: 1.65,
                          color: isDark ? '#94A3B8' : '#64748B',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. EXECUTIVE CLOSING CTA ─────────────────────────────────────── */}
        <section
          className="cta-talent-bg"
          style={{
            padding: 'clamp(6rem, 10vw, 9rem) 1.25rem',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
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
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Reveal>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  color: '#10B981',
                  textTransform: 'uppercase',
                }}
              >
                The TRYVION Talent Advantage
              </span>

              <h2
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0.7rem 0 1.25rem',
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                }}
              >
                Your Transformation Deserves More Than a CV Match
              </h2>

              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#94A3B8',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.7,
                  maxWidth: '760px',
                }}
              >
                Access SAP and technology talent assessed for real-world expertise, transformation
                experience and fit — from individual specialists to permanent hires and expert-led
                pods.
              </p>

              <Link
                href="/contact/customer-support?intent=consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  padding: '1rem 2.2rem',
                  borderRadius: 7,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 12px 30px -6px rgba(37,99,235,.55)',
                }}
              >
                Book a Consultation <ArrowRight size={19} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
