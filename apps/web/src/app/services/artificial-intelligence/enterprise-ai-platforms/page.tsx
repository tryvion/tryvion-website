'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  ShieldCheck,
  Layers,
  TrendingUp,
  CheckCircle2,
  Lock,
  Eye,
  Terminal,
  Activity,
  Sparkles,
  Server,
  Network,
  Bot,
  Workflow,
  Search,
  Code2,
  GitBranch,
  Key,
  Sliders,
  Zap,
  HardDrive,
  FileCode2,
  ChevronDown,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA DEFINITIONS ──

const ARCHITECTURE_STACK = [
  {
    id: 'layer-5',
    layerNum: '05',
    name: 'Agent & Application Runtime Layer',
    badge: 'Execution Space',
    icon: Bot,
    summary:
      'Orchestrating domain-specific copilots, human-in-the-loop workflows, and autonomous agent meshes.',
    details: [
      'Multi-agent task decomposition & routing',
      'Human-in-the-loop escalation boundaries',
      'Contextual conversation memory & state management',
      'Custom enterprise developer SDKs & low-code blocks',
    ],
    techStack: 'LangChain, AutoGen, Custom Agent Engines',
  },
  {
    id: 'layer-4',
    layerNum: '04',
    name: 'Integration & Enterprise API Mesh',
    badge: 'Connectivity Core',
    icon: Network,
    summary:
      'Connecting AI models directly into SAP BTP, core ERP systems, legacy databases, and event buses.',
    details: [
      'SAP Integration Suite & SAP BTP Extension connectors',
      'Real-time GraphQL, REST, and gRPC event streaming',
      'Bi-directional transactional enterprise workflow execution',
      'Clean Core extension patterns & side-by-side wrappers',
    ],
    techStack: 'SAP BTP, REST/gRPC, Kafka Event Hubs',
  },
  {
    id: 'layer-3',
    layerNum: '03',
    name: 'Enterprise Data & Knowledge Layer',
    badge: 'Context Engine',
    icon: Database,
    summary:
      'Transforming unstructured enterprise assets into contextualized, real-time RAG pipelines.',
    details: [
      'Hybrid semantic vector search & graph indexing',
      'SAP Datasphere & enterprise data fabric connectors',
      'Automated document chunking, embedding, and re-ranking',
      'Metadata filtering & enterprise permission propagation',
    ],
    techStack: 'SAP Datasphere, Vector DBs, Hybrid RAG',
  },
  {
    id: 'layer-2',
    layerNum: '02',
    name: 'Model Lifecycle & Orchestration Layer',
    badge: 'Model Gateway',
    icon: Cpu,
    summary:
      'Multi-model routing across cloud LLMs, open-source SLMs, and custom fine-tuned foundational models.',
    details: [
      'Dynamic model fallback & cost/latency optimization',
      'Parameter-efficient fine-tuning (PEFT/LoRA) runtimes',
      'Token caching & prompt compression microservices',
      'Model provider independence with zero vendor lock-in',
    ],
    techStack: 'vLLM, Ollama, Open-Source & Proprietary Models',
  },
  {
    id: 'layer-1',
    layerNum: '01',
    name: 'Zero-Trust Governance & Security Base',
    badge: 'Policy Enforcer',
    icon: ShieldCheck,
    summary:
      'Enforcing role-based data isolation, prompt security, and continuous EU AI Act compliance.',
    details: [
      'Zero data retention provider contracts & isolation proxies',
      'Real-time prompt injection & toxicity filtering',
      'Granular RBAC & ABAC identity propagation',
      'End-to-end decision lineage & telemetry audit trails',
    ],
    techStack: 'OAuth2, SAML, OPA, Guardrails AI',
  },
];

const TERMINAL_TABS = [
  {
    id: 'gateway',
    title: 'AI_Gateway.config',
    filename: 'ai-gateway-governance.json',
    code: `{
  "platform_version": "3.4.0-enterprise",
  "security_mode": "ZERO_TRUST_ENFORCED",
  "data_retention_policy": "NO_PROVIDER_LOGGING",
  "identity_propagation": {
    "auth_type": "OAuth2_SAML_PassThrough",
    "rbac_mapping": "SAP_S4HANA_GROUPS"
  },
  "guardrails": {
    "hallucination_threshold": 0.04,
    "toxicity_filter": "ACTIVE_BLOCK",
    "prompt_injection_shield": "STRICT"
  }
}`,
  },
  {
    id: 'rag',
    title: 'Data_Pipeline.ts',
    filename: 'enterprise-rag-mesh.ts',
    code: `import { SAPDatasphereConnector, VectorMesh } from '@tryvion/ai-sdk';

export async function hydrateContext(query: string, userContext: UserSession) {
  const dataFabric = new SAPDatasphereConnector({ tenantId: process.env.SAP_TENANT });
  const vectorStore = new VectorMesh({ index: 'enterprise-knowledge-v2' });

  const scopeFilter = await dataFabric.getAccessPermissions(userContext.userId);
  const contextDocs = await vectorStore.hybridSearch(query, {
    filter: scopeFilter,
    rerank: true,
    topK: 5
  });

  return contextDocs;
}`,
  },
  {
    id: 'agent',
    title: 'Agent_Orchestrator.py',
    filename: 'agentic_workflow.py',
    code: `from tryvion.agents import AgentMesh, HumanInTheLoopFallback

agent_mesh = AgentMesh(
    name="ERP_Inventory_Reconciler",
    model="enterprise-slm-tuned",
    tools=["sap_btp_po_update", "inventory_db_lookup"]
)

@agent_mesh.on_action_threshold_exceeded(max_financial_limit=50000)
def handle_high_value_transaction(action_payload):
    return HumanInTheLoopFallback.request_approval(
        role="FINANCE_DIRECTOR",
        payload=action_payload
    )`,
  },
];

const PLATFORM_CAPABILITIES = [
  {
    title: 'Multi-Model Interoperability',
    desc: 'Switch between proprietary frontier models and domain-tuned open SLMs without refactoring applications.',
    tag: 'Flexibility',
    icon: GitBranch,
  },
  {
    title: 'SAP BTP & Clean Core Extensions',
    desc: 'Build side-by-side AI extensions on SAP BTP without modifying core enterprise S/4HANA ERP logic.',
    tag: 'ERP Integration',
    icon: HardDrive,
  },
  {
    title: 'Real-Time Hybrid RAG Architecture',
    desc: 'Combine enterprise relational tables, SAP Datasphere graphs, and vector databases for accurate context.',
    tag: 'Data Knowledge',
    icon: Workflow,
  },
  {
    title: 'Autonomous Agent Frameworks',
    desc: 'Deploy autonomous agent meshes capable of executing multi-step business transactions with audit trails.',
    tag: 'Agentic AI',
    icon: Bot,
  },
  {
    title: 'LLMOps & Token FinOps Console',
    desc: 'Monitor inference cost, latency, token throughput, and model performance metrics from a central cockpit.',
    tag: 'Observability',
    icon: Activity,
  },
  {
    title: 'Enterprise Identity Propagation',
    desc: 'Ensure AI applications respect existing enterprise role-based access control (RBAC) and user credentials.',
    tag: 'Identity Control',
    icon: Key,
  },
];

const PILOT_TO_PRODUCTION = [
  {
    phase: '01',
    title: 'Architecture & Assessment',
    desc: 'Evaluate data readiness, existing ERP/API infrastructure, security policies, and technical target topology.',
  },
  {
    phase: '02',
    title: 'Foundation Prototyping',
    desc: 'Construct the initial data pipelines, vector stores, zero-trust gateway proxies, and core model integrations.',
  },
  {
    phase: '03',
    title: 'Enterprise Validation',
    desc: 'Rigorous benchmarking of guardrails, latency, hallucination rates, and security compliance in sandbox environments.',
  },
  {
    phase: '04',
    title: 'Industrialization & Rollout',
    desc: 'Deploy multi-tenant platform services, developer SDKs, reusable API extensions, and Centralized LLMOps monitoring.',
  },
];

const METRICS_GAUGES = [
  {
    label: 'Query Latency Reduction',
    value: '68%',
    description: 'Achieved through intelligent prompt caching and vector indexing.',
    percentage: 68,
  },
  {
    label: 'Integration Cost Reduction',
    value: '45%',
    description: 'Reduced API wrapping effort via pre-built SAP BTP connectors.',
    percentage: 45,
  },
  {
    label: 'Data Compliance Adherence',
    value: '100%',
    description: 'Zero data leakage across multi-tenant enterprise business units.',
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

export default function EnterpriseAIPlatformsPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  const [expandedLayer, setExpandedLayer] = useState<string | null>('layer-5');
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [activeHeroNode, setActiveHeroNode] = useState<'gateway' | 'rag' | 'agents'>('gateway');

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
          grid-template-columns: 1.15fr 0.85fr;
          gap: 4rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .stack-interactive-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .terminal-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 2rem;
          align-items: stretch;
        }

        .asymmetric-caps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .pipeline-flow-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
        }

        .metrics-gauge-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-visual-host { display: none; }
          .terminal-grid { grid-template-columns: 1fr; }
          .asymmetric-caps-grid { grid-template-columns: repeat(2, 1fr); }
          .pipeline-flow-container { grid-template-columns: repeat(2, 1fr); }
          .metrics-gauge-grid { grid-template-columns: repeat(1, 1fr); }
        }

        @media (max-width: 640px) {
          .asymmetric-caps-grid { grid-template-columns: 1fr; }
          .pipeline-flow-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* ── HERO SECTION (PERMANENT DARK MODE WITH DYNAMIC HUD INSPECTOR) ── */}
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
          {/* Ambient Lighting */}
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '5%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '8%',
              right: '8%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
            <div>
              {/* Strict Breadcrumbs */}
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
                  <Link
                    href="/services/artificial-intelligence"
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    Artificial Intelligence
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6, color: '#fff' }} />
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Enterprise AI Platforms</span>
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
                  <Sparkles size={14} /> Technology & Architecture Foundation
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
                  Engineered Platform Foundations for{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #10B981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Enterprise AI.
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
                  Transform isolated AI experiments into repeatable, production-grade capabilities.
                  Connect models with enterprise data, APIs, SAP landscapes, and autonomous agent
                  governance.
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
                    href="#stack-architecture"
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
                    Book a Consultation <ChevronRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Interactive Platform Telemetry Visual HUD */}
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
                        PLATFORM_HUD :: ACTIVE
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                      REGION: MULTI-CLOUD HYBRID
                    </span>
                  </div>

                  {/* Node Selector Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {[
                      { id: 'gateway', label: 'Security Gateway', icon: ShieldCheck },
                      { id: 'rag', label: 'Data Mesh', icon: Database },
                      { id: 'agents', label: 'Agent Runtime', icon: Bot },
                    ].map((node) => (
                      <button
                        key={node.id}
                        onClick={() => setActiveHeroNode(node.id as any)}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor:
                            activeHeroNode === node.id ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                          backgroundColor:
                            activeHeroNode === node.id
                              ? 'rgba(59, 130, 246, 0.2)'
                              : 'rgba(0,0,0,0.2)',
                          color: activeHeroNode === node.id ? '#FFFFFF' : '#94A3B8',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <node.icon size={14} />
                        {node.label}
                      </button>
                    ))}
                  </div>

                  {/* Telemetry Display Screen */}
                  <div
                    style={{
                      backgroundColor: 'rgba(5, 8, 17, 0.9)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      minHeight: '180px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {activeHeroNode === 'gateway' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>Proxy Status:</span>
                          <span style={{ color: '#10B981', fontWeight: 700 }}>
                            Zero Data Retention Enforced
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>RBAC Authorization:</span>
                          <span style={{ color: '#60A5FA' }}>SAP S/4HANA Passed</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Toxicity Guardrail:</span>
                          <span style={{ color: '#10B981' }}>0 Vulnerabilities Flagged</span>
                        </div>
                      </motion.div>
                    )}

                    {activeHeroNode === 'rag' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>SAP Datasphere Vector Index:</span>
                          <span style={{ color: '#10B981', fontWeight: 700 }}>Synced (0.42ms)</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>Document Embeddings:</span>
                          <span style={{ color: '#60A5FA' }}>1.4M Chunks Active</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Hybrid RAG Precision:</span>
                          <span style={{ color: '#10B981' }}>99.2% Accuracy</span>
                        </div>
                      </motion.div>
                    )}

                    {activeHeroNode === 'agents' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>Active Agent Tasks:</span>
                          <span style={{ color: '#60A5FA', fontWeight: 700 }}>
                            12 Agent Mesh Routines
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span>Human-in-the-Loop Threshold:</span>
                          <span style={{ color: '#F59E0B' }}>Active (&gt; $50K POs)</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Transaction Execution:</span>
                          <span style={{ color: '#10B981' }}>Deterministic Success</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── REPLACED SECTION: INTERACTIVE VERTICAL ARCHITECTURAL STACK INSPECTOR (LIGHT VERSION ACTIVE ENHANCED) ── */}
        <section
          id="stack-architecture"
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
                  System Topology
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  The 5-Tier Enterprise AI Architecture
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#475569',
                    marginTop: '0.75rem',
                  }}
                >
                  Click each tier to inspect how models, enterprise data, SAP APIs, and zero-trust
                  security components interlock into a unified platform foundation.
                </p>
              </div>
            </Reveal>

            <div className="stack-interactive-wrapper">
              {ARCHITECTURE_STACK.map((layer) => {
                const isExpanded = expandedLayer === layer.id;
                const IconComp = layer.icon;

                return (
                  <Reveal key={layer.id}>
                    <div
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: isExpanded
                          ? isDark
                            ? 'rgba(15, 23, 42, 0.85)'
                            : '#FFFFFF'
                          : isDark
                            ? 'rgba(15, 23, 42, 0.65)'
                            : '#FFFFFF',
                        border: isExpanded
                          ? `2px solid ${isDark ? '#3B82F6' : '#2563EB'}`
                          : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                        boxShadow: isExpanded
                          ? isDark
                            ? '0 10px 30px -10px rgba(59, 130, 246, 0.3)'
                            : '0 10px 25px -5px rgba(37, 99, 235, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)'
                          : isDark
                            ? 'none'
                            : '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Layer Header Accordion Button */}
                      <button
                        onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                        style={{
                          width: '100%',
                          padding: '1.5rem 2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background:
                            isExpanded && !isDark
                              ? 'linear-gradient(90deg, rgba(37,99,235,0.03) 0%, rgba(255,255,255,0) 100%)'
                              : 'transparent',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <span
                            style={{
                              fontSize: '1.25rem',
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              color: isExpanded ? '#2563EB' : isDark ? '#60A5FA' : '#3B82F6',
                            }}
                          >
                            {layer.layerNum}
                          </span>
                          <div
                            style={{
                              padding: '0.75rem',
                              borderRadius: '10px',
                              backgroundColor: isExpanded
                                ? '#2563EB'
                                : isDark
                                  ? 'rgba(59, 130, 246, 0.12)'
                                  : '#EFF6FF',
                              color: isExpanded ? '#FFFFFF' : '#2563EB',
                              transition: 'all 0.25s ease',
                            }}
                          >
                            <IconComp size={24} />
                          </div>
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                flexWrap: 'wrap',
                              }}
                            >
                              <h3
                                style={{
                                  fontSize: '1.3rem',
                                  fontWeight: 700,
                                  color: isDark ? '#FFFFFF' : '#0F172A',
                                  margin: 0,
                                }}
                              >
                                {layer.name}
                              </h3>
                              <span
                                style={{
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '20px',
                                  fontSize: '0.65rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  backgroundColor: isExpanded
                                    ? isDark
                                      ? 'rgba(59, 130, 246, 0.2)'
                                      : '#DBEAFE'
                                    : isDark
                                      ? 'rgba(255,255,255,0.08)'
                                      : '#F1F5F9',
                                  color: isExpanded
                                    ? isDark
                                      ? '#60A5FA'
                                      : '#1D4ED8'
                                    : isDark
                                      ? '#94A3B8'
                                      : '#475569',
                                  letterSpacing: '0.05em',
                                }}
                              >
                                {layer.badge}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            backgroundColor: isDark
                              ? 'rgba(255,255,255,0.05)'
                              : isExpanded
                                ? '#EFF6FF'
                                : '#F8FAFC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronDown
                            size={20}
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              color: isExpanded ? '#2563EB' : '#64748B',
                            }}
                          />
                        </div>
                      </button>

                      {/* Expanded Drawer Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div
                              style={{
                                padding: '0 2rem 2rem 5rem',
                                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9'}`,
                                paddingTop: '1.5rem',
                              }}
                            >
                              <p
                                style={{
                                  fontSize: '1.05rem',
                                  color: isDark ? '#E2E8F0' : '#334155',
                                  lineHeight: 1.6,
                                  marginBottom: '1.5rem',
                                  fontWeight: 500,
                                }}
                              >
                                {layer.summary}
                              </p>

                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1.2fr 0.8fr',
                                  gap: '2rem',
                                  flexWrap: 'wrap',
                                }}
                              >
                                <div>
                                  <h4
                                    style={{
                                      fontSize: '0.75rem',
                                      fontWeight: 700,
                                      letterSpacing: '0.1em',
                                      color: isDark ? '#94A3B8' : '#64748B',
                                      textTransform: 'uppercase',
                                      marginBottom: '0.75rem',
                                    }}
                                  >
                                    Key Architectural Specifications
                                  </h4>
                                  <ul
                                    style={{
                                      listStyle: 'none',
                                      padding: 0,
                                      margin: 0,
                                      display: 'grid',
                                      gap: '0.6rem',
                                    }}
                                  >
                                    {layer.details.map((detail, dIdx) => (
                                      <li
                                        key={dIdx}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.65rem',
                                          fontSize: '0.95rem',
                                          color: isDark ? '#CBD5E1' : '#334155',
                                          fontWeight: 500,
                                        }}
                                      >
                                        <CheckCircle2
                                          size={16}
                                          style={{ color: '#059669', flexShrink: 0 }}
                                        />
                                        {detail}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div
                                  style={{
                                    backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : '#F8FAFC',
                                    padding: '1.25rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0'}`,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.7rem',
                                      fontFamily: 'monospace',
                                      fontWeight: 700,
                                      color: '#2563EB',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em',
                                    }}
                                  >
                                    Supported Stack & Protocols
                                  </span>
                                  <div
                                    style={{
                                      fontSize: '0.925rem',
                                      fontWeight: 700,
                                      color: isDark ? '#FFFFFF' : '#0F172A',
                                      marginTop: '0.5rem',
                                    }}
                                  >
                                    {layer.techStack}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── NEW LAYOUT 2: DEVELOPER & ARCHITECT TERMINAL BLUEPRINT (CODE VIEW) ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC' }}>
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
                  Developer & Infrastructure View
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Production-Grade Declarative Blueprint
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  TRYVION platform components deliver actual SDKs, declarative gateway configs, and
                  agent runtime contracts.
                </p>
              </div>
            </Reveal>

            <div className="terminal-grid">
              {/* Left Column: Code Selector & Tabs */}
              <Reveal>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
                >
                  <div
                    className="glass-panel"
                    style={{ padding: '2rem', borderRadius: '14px', flex: 1 }}
                  >
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        marginBottom: '1rem',
                      }}
                    >
                      Architectural Code Assets
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                        marginBottom: '1.75rem',
                      }}
                    >
                      Inspect the underlying configuration patterns used to link enterprise
                      security, vector indexing, and agent fallbacks.
                    </p>

                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {TERMINAL_TABS.map((tab, idx) => {
                        const isSelected = activeCodeTab === idx;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveCodeTab(idx)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '1rem 1.25rem',
                              borderRadius: '8px',
                              border: `1px solid ${isSelected ? '#2563EB' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}`,
                              backgroundColor: isSelected
                                ? isDark
                                  ? 'rgba(37, 99, 235, 0.2)'
                                  : 'rgba(37, 99, 235, 0.08)'
                                : 'transparent',
                              color: isDark ? '#FFFFFF' : '#0F172A',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <FileCode2
                                size={18}
                                style={{ color: isSelected ? '#2563EB' : '#64748B' }}
                              />
                              <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                                {tab.title}
                              </span>
                            </div>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                color: '#64748B',
                              }}
                            >
                              {tab.filename}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Code Terminal Viewer */}
              <Reveal delay={150}>
                <div
                  style={{
                    backgroundColor: '#050811',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Terminal Header */}
                  <div
                    style={{
                      padding: '0.85rem 1.25rem',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#EF4444',
                        }}
                      />
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#F59E0B',
                        }}
                      />
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                        }}
                      />
                    </div>
                    <span
                      style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#94A3B8' }}
                    >
                      {TERMINAL_TABS[activeCodeTab].filename}
                    </span>
                    <Terminal size={14} style={{ color: '#64748B' }} />
                  </div>

                  {/* Terminal Code Body */}
                  <pre
                    style={{
                      padding: '1.75rem',
                      margin: 0,
                      fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: '#60A5FA',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{TERMINAL_TABS[activeCodeTab].code}</code>
                  </pre>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── NEW LAYOUT 3: MODULAR CAPABILITIES (ASYMMETRIC GRID) ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#070B14' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Platform Modules
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Core Enterprise Platform Capabilities
                </h2>
              </div>
            </Reveal>

            <div className="asymmetric-caps-grid">
              {PLATFORM_CAPABILITIES.map((cap, idx) => (
                <Reveal key={idx} delay={idx * 70}>
                  <div
                    className="glass-panel glass-panel-interactive"
                    style={{
                      padding: '2rem',
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
                          justifyContent: 'space-between',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <div
                          style={{
                            padding: '0.75rem',
                            borderRadius: '10px',
                            backgroundColor: isDark
                              ? 'rgba(59, 130, 246, 0.12)'
                              : 'rgba(37, 99, 235, 0.08)',
                            color: '#2563EB',
                          }}
                        >
                          <cap.icon size={22} />
                        </div>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#64748B',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {cap.tag}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: isDark ? '#FFFFFF' : '#0F172A',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {cap.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          color: isDark ? '#94A3B8' : '#64748B',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEW LAYOUT 4: PIPELINE FLOW (PILOT TO PRODUCTION NODE RUNWAY) ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#0A0F1D' : '#F8FAFC' }}>
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
                  Execution Roadmap
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  From Isolated Pilot to Enterprise Scale
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  A structured methodology designed to escape proof-of-concept friction and
                  establish permanent platform value.
                </p>
              </div>
            </Reveal>

            <div className="pipeline-flow-container">
              {PILOT_TO_PRODUCTION.map((step, idx) => (
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
                        fontSize: '1.2rem',
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

        {/* ── NEW LAYOUT 5: METRICS WITH PROGRESS GAUGES ── */}
        <section style={{ padding: '7rem 2rem', backgroundColor: isDark ? '#070B14' : '#FFFFFF' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#2563EB',
                    textTransform: 'uppercase',
                  }}
                >
                  Quantifiable Impact
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Platform Efficiency Benchmarks
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
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#10B981',
                        marginBottom: '0.5rem',
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

                    {/* Dynamic Bar Indicator */}
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

        {/* ── FINAL EXECUTIVE CTA (PERMANENT DARK MODE) ── */}
        <section
          style={{
            padding: '8rem 2rem',
            backgroundColor: '#050811',
            backgroundImage: `linear-gradient(to bottom, rgba(5, 8, 17, 0.85), rgba(5, 8, 17, 0.95)), url('/images/hero-enterprise-ai-strategy.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
                Architect your Enterprise AI Platform with TRYVION.
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#94A3B8',
                  marginBottom: '3rem',
                  lineHeight: 1.7,
                }}
              >
                Book an architecture session with our enterprise platform engineering leaders to
                design your multi-cloud, SAP-integrated AI foundation.
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
                  Schedule Architecture Review <ArrowRight size={20} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
