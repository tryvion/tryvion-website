'use client';

import React from 'react';

import Link from 'next/link';

import { useSiteTheme } from '@/providers/SiteThemeProvider';

import { motion } from 'motion/react';

const ROLES = [
  {
    title: 'SAP S/4HANA Finance Lead Consultant',
    location: 'London / Frankfurt',
    type: 'Permanent',
    level: 'Senior',
    practice: 'SAP',
    accent: '#1458F2',
    desc: 'Lead S/4HANA Finance workstream delivery on large-scale enterprise migrations. 8+ years SAP Finance experience required.',
  },
  {
    title: 'SAP BTP Integration Architect',
    location: 'London / Remote',
    type: 'Permanent',
    level: 'Lead',
    practice: 'SAP',
    accent: '#1458F2',
    desc: 'Design and deliver complex SAP BTP integration landscapes. Deep expertise in Integration Suite, API Management, and Event Mesh.',
  },
  {
    title: 'AWS Cloud Architect',
    location: 'New York / London',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Cloud',
    accent: '#22D3EE',
    desc: 'Design and deliver enterprise AWS solutions across migration, native development, and FinOps. AWS Solutions Architect Professional required.',
  },
  {
    title: 'Azure Data Engineer',
    location: 'London / Singapore',
    type: 'Permanent',
    level: 'Mid',
    practice: 'AI & Data',
    accent: '#7C3AED',
    desc: 'Build enterprise-grade data platforms on Azure — Synapse, Data Factory, Databricks. Strong Python and SQL skills essential.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'London / New York',
    type: 'Permanent',
    level: 'Senior',
    practice: 'AI & Data',
    accent: '#7C3AED',
    desc: 'Develop and deploy machine learning models for enterprise clients. Experience with LLMs, MLOps, and regulated industry data requirements.',
  },
  {
    title: 'DevOps / Platform Engineer',
    location: 'London / Amsterdam',
    type: 'Permanent',
    level: 'Mid-Senior',
    practice: 'Cloud',
    accent: '#22D3EE',
    desc: 'Build and operate cloud native delivery infrastructure. Kubernetes, Terraform, CI/CD, and observability expertise required.',
  },
  {
    title: 'Enterprise Architect',
    location: 'London',
    type: 'Permanent',
    level: 'Principal',
    practice: 'Strategy',
    accent: '#F59E0B',
    desc: 'Lead enterprise architecture advisory engagements. Define target-state architectures across SAP, cloud, and data platforms for large enterprise clients.',
  },
  {
    title: 'Programme Manager',
    location: 'London / Dubai',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Delivery',
    accent: '#34D399',
    desc: 'Manage complex multi-workstream enterprise transformation programmes. PMP or PRINCE2 required. £20M+ programme experience preferred.',
  },
  {
    title: 'Business Development Manager — Financial Services',
    location: 'London',
    type: 'Permanent',
    level: 'Senior',
    practice: 'Commercial',
    accent: '#EC4899',
    desc: 'Originate and develop new client relationships in UK and EMEA financial services. Enterprise consulting sales background essential.',
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Mid: 'rgba(255,255,255,0.12)',
  'Mid-Senior': 'rgba(255,255,255,0.16)',
  Senior: 'rgba(20,88,242,0.18)',
  Lead: 'rgba(201,162,75,0.18)',
  Principal: 'rgba(34,211,238,0.18)',
};

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function RolesPage() {
  useSiteTheme();

  return (
    <main
      className="roles-page"
      style={{
        background: '#050A18',
        minHeight: '100vh',
        color: '#fff',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'clip',
      }}
    >
      <style>{`
        .roles-page,
        .roles-page *,
        .roles-page *::before,
        .roles-page *::after {
          box-sizing: border-box;
        }

        .roles-page .roles-container {
          width: min(100%, 82rem);
          min-width: 0;
          margin: 0 auto;
        }

        .roles-page .roles-breadcrumb {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          margin: 0;
        }

        .roles-page .role-card,
        .roles-page .role-card-main {
          min-width: 0;
          max-width: 100%;
        }

        .roles-page .role-card-title,
        .roles-page .role-description {
          overflow-wrap: anywhere;
        }

        .roles-page .apply-link {
          flex: 0 0 auto;
        }

        @media (max-width: 767px) {
          .roles-page .roles-breadcrumb {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .roles-page .roles-breadcrumb nav {
            font-size: 0.75rem !important;
            gap: 0.375rem !important;
          }

          .roles-page .roles-hero {
            padding: clamp(7.5rem, 12vw, 10rem) 1rem 4.5rem !important;
          }

          .roles-page .roles-list {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-bottom: 4.5rem !important;
          }

          .roles-page .role-card {
            padding: 1.25rem !important;
            border-radius: 1.125rem !important;
          }

          .roles-page .role-card-header {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .roles-page .apply-link {
            width: 100%;
            justify-content: center;
          }

          .roles-page .roles-cta {
            padding: 4.5rem 1rem !important;
          }

          .roles-page .roles-cta-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 374px) {
          .roles-page .roles-hero h1 {
            font-size: clamp(2.45rem, 12vw, 3.25rem) !important;
          }

          .roles-page .role-card {
            padding: 1rem !important;
          }
        }
      `}</style>
      <motion.section
        className="roles-container roles-hero"
        variants={reveal}
        initial="hidden"
        animate="visible"
        style={{
          padding: 'clamp(7.5rem, 12vw, 10rem) clamp(1rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)',
          maxWidth: '82rem',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="roles-breadcrumb">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.35)',
              minWidth: 0,
              maxWidth: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/careers" style={{ color: 'inherit', textDecoration: 'none' }}>
              Careers
            </Link>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Open Roles</span>
          </motion.nav>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: 0,
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(20,88,242,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <p
          style={{
            color: '#1458F2',
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            position: 'relative',
          }}
        >
          Open Positions
        </p>
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '2rem',
            maxWidth: '42rem',
            position: 'relative',
          }}
        >
          Build the future of{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            enterprise technology
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '44rem',
            lineHeight: 1.7,
            position: 'relative',
          }}
        >
          We are growing across every practice. If you have deep enterprise technology expertise and
          high standards, we want to hear from you.
        </p>
      </motion.section>

      <motion.section
        className="roles-container roles-list"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        style={{
          padding: '0 clamp(1rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)',
          maxWidth: '82rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {ROLES.map((role) => (
          <motion.div
            key={role.title}
            className="role-card"
            variants={cardReveal}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1.5rem',
              padding: '2rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              className="role-card-header"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.5rem',
                  }}
                >
                  {role.title}
                </h2>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
                    {role.location}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
                    {role.type}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: role.accent,
                      background: `${role.accent}18`,
                      padding: '0.25rem 0.625rem',
                      borderRadius: '999px',
                    }}
                  >
                    {role.practice}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.5)',
                      background: LEVEL_COLORS[role.level] || 'rgba(255,255,255,0.1)',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '999px',
                    }}
                  >
                    {role.level}
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  color: '#1458F2',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '0.625rem 1.25rem',
                  border: '1px solid rgba(20,88,242,0.35)',
                  borderRadius: '0.75rem',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Apply
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: '0.75rem', height: '0.75rem' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              {role.desc}
            </p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="roles-cta"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        style={{
          padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)',
          background: 'rgba(20,88,242,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            Don&rsquo;t see your role?
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              lineHeight: 1.75,
              marginBottom: '3rem',
            }}
          >
            We are always interested in exceptional enterprise technology talent. Send us your
            profile and we will be in touch when the right opportunity arises.
          </p>
          <motion.div variants={reveal}>
            <Link
              className="roles-cta-button"
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #1458F2, #0B1E3D)',
                color: '#fff',
                padding: '1rem 2.25rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
              }}
            >
              Send your CV
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
