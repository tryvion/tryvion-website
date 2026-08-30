'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Activity,
  Server,
  Network,
  Bot,
  Workflow,
  Zap,
  FileCode2,
  ChevronDown,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

// ── DATA DEFINITIONS: INTELLIGENT AUTOMATION ARCHITECTURE ──

const ARCHITECTURE_STACK = [
  {
    id: 'layer-5',
    layerNum: '05',
    name: 'Agentic Execution & Autonomous Workflow Layer',
    badge: 'Autonomous Action',
    icon: Bot,
    summary:
      'Enabling AI agents capable of reasoning, multi-step task coordination, and dynamic business action under human-in-the-loop controls.',
    details: [
      'Multi-agent workflow orchestration & task delegation',
      'Configurable human-in-the-loop authorization gates',
      'Context-aware exception intelligence & automated resolution',
      'Joule & generative AI assistant integration across core apps',
    ],
    techStack: 'SAP Joule, Agentic AI Runtimes, Custom Agent Meshes',
  },
  {
    id: 'layer-4',
    layerNum: '04',
    name: 'AI & Contextual Intelligence Layer',
    badge: 'Cognitive Engine',
    icon: Cpu,
    summary:
      'Injecting enterprise context, document intelligence, and predictive models directly into business processes.',
    details: [
      'Intelligent Document Processing (IDP) for multi-format extraction',
      'Generative AI context retrieval and decision assistance',
      'Predictive recommendations for workflow routing',
      'Semantic data parsing & automated validation pipelines',
    ],
    techStack: 'SAP Business AI, Multi-Model LLM Gateway, Vector Stores',
  },
  {
    id: 'layer-3',
    layerNum: '03',
    name: 'Process Orchestration & Business Rules Engine',
    badge: 'Workflow Core',
    icon: Workflow,
    summary:
      'Coordinating systems, applications, data, business rules, and human approvals into unified end-to-end execution paths.',
    details: [
      'SAP Build Process Automation workflow modeling',
      'Declarative enterprise business rules engine',
      'Cross-department approval & escalation orchestration',
      'Structured exception handling and SLA tracking',
    ],
    techStack: 'SAP Build Process Automation, Camunda, Event Hubs',
  },
  {
    id: 'layer-2',
    layerNum: '02',
    name: 'Enterprise Integration & API Connectivity Mesh',
    badge: 'System Bridge',
    icon: Network,
    summary:
      'Connecting automated processes seamlessly across SAP S/4HANA, SuccessFactors, legacy databases, and 3rd-party SaaS platforms.',
    details: [
      'SAP BTP Integration Suite side-by-side extensions',
      'Real-time event-driven triggers via Kafka & SAP Event Mesh',
      'Bi-directional REST, OData, and gRPC transactional connectors',
      'Clean Core extension wrappers preserving core system integrity',
    ],
    techStack: 'SAP BTP, SAP Integration Suite, OData APIs',
  },
  {
    id: 'layer-1',
    layerNum: '01',
    name: 'Governance, Access Control & Security Foundation',
    badge: 'Control Plane',
    icon: ShieldCheck,
    summary:
      'Enforcing strict RBAC, audit trails, data isolation, and operational compliance across every automated execution.',
    details: [
      'Role-based & attribute-based identity propagation (RBAC/ABAC)',
      'Immutable audit logging for automated & agentic decisions',
      'Granular permission boundaries for automated transaction limits',
      'Zero-trust data encryption in transit and at rest',
    ],
    techStack: 'SAP Cloud Identity Services, OPA, OAuth2/SAML',
  },
];

const TERMINAL_TABS = [
  {
    id: 'workflow-config',
    title: 'Process_Workflow.json',
    filename: 'sap-build-automation.json',
    code: `{
  "process_id": "proc_lead_to_cash_v4",
  "name": "Intelligent Order Exception Handling",
  "trigger": {
    "type": "EVENT_MESH",
    "source": "sap.s4.salesorder.created",
    "condition": "order.credit_hold == true"
  },
  "steps": [
    {
      "step_id": "idp_extraction",
      "action": "sap.document.intelligence.extract",
      "target": "po_document_attachment"
    },
    {
      "step_id": "ai_decision_gate",
      "action": "tryvion.ai.recommend_credit_override",
      "confidence_threshold": 0.94
    }
  ]
}`,
  },
  {
    id: 'idp-pipeline',
    title: 'Document_IDP.ts',
    filename: 'intelligent-document-pipeline.ts',
    code: `import { SAPBuildDocumentAI, AutomationMesh } from '@tryvion/automation-sdk';

export async function processSupplierInvoice(pdfBuffer: Buffer, userContext: UserSession) {
  const docAI = new SAPBuildDocumentAI({ mode: 'STRICT_ENTERPRISE' });

  // Extract unstructured invoice data with confidence scoring
  const extraction = await docAI.extractFields(pdfBuffer, [
    'vendor_vat', 'line_items', 'total_amount', 'po_reference'
  ]);

  if (extraction.confidence < 0.90) {
    return AutomationMesh.triggerHumanInTheLoop({
      taskType: 'INVOICE_VALIDATION_REVIEW',
      payload: extraction,
      assigneeRole: 'AP_SUPERVISOR'
    });
  }

  return AutomationMesh.postToS4HanaInvoice(extraction.data);
}`,
  },
  {
    id: 'agentic-handler',
    title: 'Agentic_Execution.py',
    filename: 'agentic_exception_handler.py',
    code: `from tryvion.automation import AgenticWorkflow, SafetyBoundary

agent = AgenticWorkflow(
    name="Supply_Chain_Reconciler",
    model="sap-joule-boosted-v2",
    capabilities=["stock_lookup", "reorder_trigger", "sap_po_create"]
)

@agent.enforce_boundary(max_po_value=25000, require_human_over=50000)
def reconcile_inventory_discrepancy(event_data):
    analysis = agent.reason(
        context=event_data,
        prompt="Identify inventory shortfall and construct automated purchase order if vendor SLA permits."
    )
    if analysis.requires_approval:
        return agent.request_approval(role="PROCUREMENT_LEAD", details=analysis)
    return agent.execute_transaction(analysis.target_action)`,
  },
];

const PLATFORM_CAPABILITIES = [
  {
    title: 'Robotic Process Automation (RPA)',
    desc: 'Eliminate high-volume, repetitive data entry and manual tasks across SAP transaction screens and legacy applications.',
    tag: 'Task Automation',
    icon: Zap,
  },
  {
    title: 'Process & Workflow Orchestration',
    desc: 'Connect applications, systems, people, and business rules across complete end-to-end enterprise execution paths.',
    tag: 'End-to-End Orchestration',
    icon: Workflow,
  },
  {
    title: 'Intelligent Document Processing',
    desc: 'Automatically extract, classify, validate, and process information from unstructured invoices, POs, and contracts.',
    tag: 'Document Intelligence',
    icon: FileCode2,
  },
  {
    title: 'AI-Assisted Workflow & Decisions',
    desc: 'Embed contextual AI recommendations into business workflows to resolve exceptions and speed up complex approvals.',
    tag: 'Cognitive Decisioning',
    icon: Cpu,
  },
  {
    title: 'Agentic Workflow Execution',
    desc: 'Deploy AI agents capable of multi-step reasoning, cross-system coordination, and autonomous transaction execution under safety controls.',
    tag: 'Agentic AI',
    icon: Bot,
  },
  {
    title: 'Automation Governance Cockpit',
    desc: 'Establish enterprise-wide standards, security policies, access controls, auditability, and monitoring for scalable automation.',
    tag: 'Governance & Control',
    icon: ShieldCheck,
  },
];

const PILOT_TO_PRODUCTION = [
  {
    phase: '01',
    title: 'Discover & Simplify',
    desc: 'Analyze core processes, identify high-impact bottlenecks, eliminate redundant steps, and standardize workflows before applying automation.',
  },
  {
    phase: '02',
    title: 'Standardize & Automate',
    desc: 'Deploy rules-based automation, SAP Build workflows, API integrations, and IDP pipelines across prioritized enterprise functions.',
  },
  {
    phase: '03',
    title: 'Intelligent Enhancement',
    desc: 'Integrate AI recommendations, SAP Joule assistance, and agentic exception handling into active business processes.',
  },
  {
    phase: '04',
    title: 'Scale & Govern',
    desc: 'Establish a Centralized Automation Center of Excellence (CoE), reusable components, audit logging, and continuous improvement loops.',
  },
];

const METRICS_GAUGES = [
  {
    label: 'Cycle-Time Reduction',
    value: '75%',
    description: 'Accelerated end-to-end execution across Finance and Procurement workflows.',
    percentage: 75,
  },
  {
    label: 'Manual Effort Reduction',
    value: '65%',
    description:
      'Saved repetitive operational hours through RPA and Intelligent Document Processing.',
    percentage: 65,
  },
  {
    label: 'Process Accuracy & Compliance',
    value: '99.8%',
    description: 'Near-zero error rates achieved with automated validation and RBAC governance.',
    percentage: 99.8,
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

export default function IntelligentAutomationPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  const [expandedLayer, setExpandedLayer] = useState<string | null>('layer-5');
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [activeHeroNode, setActiveHeroNode] = useState<'workflow' | 'idp' | 'agentic'>('workflow');

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
            url('/images/earthBeam-01.png');
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
        {/* ── 1. HERO SECTION (PERMANENT DARK MODE BASELINE WITH BACKGROUND IMAGE) ── */}
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
                    color: '#94A3B8',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Services
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6 }} />
                  <Link
                    href="/services/artificial-intelligence"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    TRYVION AI
                  </Link>
                  <ChevronRight size={14} style={{ opacity: 0.6 }} />
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Intelligent Automation</span>
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
                  <Zap size={14} /> Automate Smarter. Move Faster.
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
                  Turn Intelligence into Action Across{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #10B981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Business Processes.
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
                  Move beyond isolated task scripts. Connect SAP Build Process Automation, SAP BTP,
                  Business AI, Joule, and autonomous agent workflows to create intelligent execution
                  engines that scale.
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
                    Talk to an Automation Expert <ArrowRight size={18} />
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
                    Explore Automation Spectrum <ChevronRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Interactive Automation Telemetry Visual HUD */}
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
                        AUTOMATION_HUD :: LIVE EXECUTION
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                      TARGET: SAP S/4HANA & BTP
                    </span>
                  </div>

                  {/* Node Selector Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {[
                      { id: 'workflow', label: 'Workflow Engine', icon: Workflow },
                      { id: 'idp', label: 'Doc Intelligence', icon: FileCode2 },
                      { id: 'agentic', label: 'Agentic Execution', icon: Bot },
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
                    {activeHeroNode === 'workflow' && (
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
                          <span>SAP Build Orchestrator:</span>
                          <span style={{ color: '#10B981', fontWeight: 700 }}>
                            Active (0.12s latency)
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
                          <span>Cross-App Approvals:</span>
                          <span style={{ color: '#60A5FA' }}>S/4HANA & SuccessFactors</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Business Rules Engine:</span>
                          <span style={{ color: '#10B981' }}>100% Rule Compliance</span>
                        </div>
                      </motion.div>
                    )}

                    {activeHeroNode === 'idp' && (
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
                          <span>Document Extraction Accuracy:</span>
                          <span style={{ color: '#10B981', fontWeight: 700 }}>99.4% Parsed</span>
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
                          <span>Multi-Format Ingestion:</span>
                          <span style={{ color: '#60A5FA' }}>PDF, EDI, Invoice XML</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Exception Routing:</span>
                          <span style={{ color: '#10B981' }}>Auto-Routed to AP Desk</span>
                        </div>
                      </motion.div>
                    )}

                    {activeHeroNode === 'agentic' && (
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
                          <span>SAP Joule & Agent Mesh:</span>
                          <span style={{ color: '#60A5FA', fontWeight: 700 }}>
                            Reasoning & Active Execution
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
                          <span style={{ color: '#F59E0B' }}>Active (&gt; $25,000 PO)</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94A3B8',
                          }}
                        >
                          <span>Audit Trail Integrity:</span>
                          <span style={{ color: '#10B981' }}>Immutably Logged</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 2. INTERACTIVE VERTICAL STACK / ACCORDION INSPECTOR ── */}
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
                  The Automation Spectrum
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  5-Tier Intelligent Automation Architecture
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#475569',
                    marginTop: '0.75rem',
                  }}
                >
                  Click each tier to inspect how task execution, workflow orchestration, AI
                  assistance, and agentic governance interlock into connected enterprise operations.
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
                                    Supported Tools & Frameworks
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

        {/* ── 3. DEVELOPER & ARCHITECT CODE BLUEPRINT (TERMINAL VIEW) ── */}
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
                  Automation Code Assets
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Declarative Process & Agentic Code Blueprint
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  Examine the actual configurations used to connect SAP Build workflows, IDP
                  extraction pipelines, and agentic exception handlers.
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
                      Production Integration Snippets
                    </h3>
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: isDark ? '#94A3B8' : '#64748B',
                        lineHeight: 1.6,
                        marginBottom: '1.75rem',
                      }}
                    >
                      TRYVION automation architectures leverage modular JSON declarations,
                      TypeScript SDKs, and Python agent safety wrappers.
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

        {/* ── 4. MODULAR CAPABILITIES (ASYMMETRIC GRID) ── */}
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
                  Core Capabilities
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  What Intelligent Automation Enables
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

        {/* ── 5. EXECUTION ROADMAP (PHASE PIPELINE RUNWAY) ── */}
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
                  The TRYVION Methodology
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Simplify. Automate. Intelligently Scale.
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: isDark ? '#94A3B8' : '#64748B',
                    marginTop: '0.75rem',
                  }}
                >
                  We simplify and standardize processes before deciding what should be automated,
                  ensuring long-term operational impact.
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

        {/* ── 6. QUANTIFIABLE IMPACT (METRICS GAUGES) ── */}
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
                  Business Outcomes
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: isDark ? '#FFFFFF' : '#0F172A',
                    marginTop: '0.5rem',
                  }}
                >
                  Measuring Automation Impact
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

        {/* ── 7. EXECUTIVE CLOSING CTA SECTION (PERMANENT DARK BASELINE) ── */}
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
                  color: '#FFFFFF',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Ready to Automate What Comes Next?
              </h2>

              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#94A3B8',
                  marginBottom: '3rem',
                  lineHeight: 1.7,
                }}
              >
                Transform repetitive tasks, fragmented workflows, and intelligent decision-making
                into a connected, highly responsive enterprise execution engine.
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
                  Book a Consultation <ArrowRight size={20} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
