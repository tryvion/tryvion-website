'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import { motion } from 'motion/react';

export default function LifeAtTryvionPage() {
  const PILLARS = [
    {
      title: 'Grow With TRYVION',
      desc: 'You are joining at a stage where you can shape what this company becomes — not just step into an established role. TRYVION is being built now.',
      accent: '#1458F2',
      icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    },
    {
      title: "Build, Don't Just Inherit",
      desc: 'At TRYVION, early team members do not follow a playbook — they write one. You will contribute to how we develop solutions and grow a practice.',
      accent: '#C9A24B',
      icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
    },
    {
      title: 'Real Enterprise Impact',
      desc: 'TRYVION engagements are enterprise-critical. You will work on SAP S/4HANA transformations, AI strategy programmes and cloud migrations.',
      accent: '#10B981',
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    },
    {
      title: 'Learn Through SkillVerse',
      desc: "TRYVION Academy's SkillVerse platform gives you access to enterprise technology learning paths, SAP certifications, and AI capability training.",
      accent: '#7C3AED',
      icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    },
    {
      title: 'One Team, One Ecosystem',
      desc: 'You are not siloed in a practice. TRYVION Transformation, TRYVION Academy and TRYVION Talent work together as one ecosystem.',
      accent: '#0891B2',
      icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
    },
    {
      title: 'People First',
      desc: 'People are the foundation of every transformation. We invest in your development, support your growth, and build a culture of excellence.',
      accent: '#EC4899',
      icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
    },
  ];

  const WHAT_WE_LOOK_FOR = [
    {
      quality: 'Ambition to build',
      description:
        'People who want to create something, not just contribute to something that already exists.',
    },
    {
      quality: 'SAP or enterprise technology depth',
      description:
        'Genuine expertise across SAP S/4HANA, SuccessFactors, BTP, AI, cloud or related domains.',
    },
    {
      quality: 'Client-first instinct',
      description:
        'People who define success by client outcomes, not by the quality of their slide decks.',
    },
    {
      quality: 'Collaborative by nature',
      description:
        'TRYVION works as one ecosystem. The best people here make everyone around them better.',
    },
  ];

  return (
    <div className="life-page-root" style={{ minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .life-page-root,
        .life-page-root *,
        .life-page-root *::before,
        .life-page-root *::after {
          box-sizing: border-box;
        }

        .life-page-root {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow-x: clip;
          background: #050A18;
        }

        .life-page-root main,
        .life-page-root section,
        .life-page-root div,
        .life-page-root nav {
          min-width: 0;
          max-width: 100%;
        }

        .life-breadcrumb {
          width: min(100%, 82rem);
          min-width: 0;
        }

        .life-breadcrumb nav {
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .life-hero,
        .life-pillars,
        .life-look-for,
        .life-skillverse,
        .life-cta {
          width: 100%;
          min-width: 0;
        }

        .life-hero > *,
        .life-pillars > *,
        .life-look-for > *,
        .life-skillverse > *,
        .life-cta > * {
          min-width: 0;
          max-width: 100%;
        }

        .life-pillars-grid,
        .life-look-for-grid {
          min-width: 0;
          width: 100%;
        }

        .life-pillar-card,
        .life-skillverse-card {
          min-width: 0;
          max-width: 100%;
        }

        .life-pillar-card p,
        .life-look-for-grid p,
        .life-skillverse-copy p,
        .life-cta p {
          overflow-wrap: anywhere;
          word-break: normal;
        }

        .life-skillverse-copy {
          min-width: 0;
          max-width: 100%;
        }

        .life-skillverse-button-wrap {
          min-width: 0;
          max-width: 100%;
        }

        .life-skillverse-button {
          max-width: 100%;
        }

        .life-cta-actions {
          min-width: 0;
          max-width: 100%;
        }

        @media (max-width: 1023px) {
          .life-pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: clamp(1.25rem, 3vw, 2rem) !important;
          }

          .life-look-for-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: clamp(1.5rem, 4vw, 2.5rem) !important;
          }

          .life-skillverse-card {
            grid-template-columns: minmax(0, 1fr) minmax(0, auto) !important;
            gap: clamp(1.5rem, 4vw, 3rem) !important;
          }
        }

        @media (max-width: 767px) {
          .life-breadcrumb {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .life-breadcrumb nav {
            gap: 0.375rem !important;
            font-size: 0.75rem !important;
          }

          .life-hero {
            padding: clamp(3rem, 10vw, 4.5rem) 1rem clamp(4rem, 11vw, 5rem) !important;
          }

          .life-hero h1 {
            max-width: 100% !important;
            font-size: clamp(2.75rem, 13vw, 4rem) !important;
            line-height: 1.03 !important;
            overflow-wrap: anywhere;
          }

          .life-hero p {
            max-width: 100% !important;
            font-size: 0.95rem !important;
          }

          .life-pillars {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-bottom: 4.5rem !important;
          }

          .life-pillars-grid,
          .life-look-for-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 1rem !important;
          }

          .life-pillar-card {
            padding: 1.5rem !important;
            border-radius: 1.25rem !important;
          }

          .life-look-for {
            padding: 4rem 1rem !important;
          }

          .life-look-for > div {
            width: 100%;
          }

          .life-look-for h2 {
            margin-bottom: 2.5rem !important;
            max-width: 100% !important;
          }

          .life-look-for-grid p {
            padding-left: 1.25rem !important;
          }

          .life-skillverse {
            padding: 4rem 1rem !important;
          }

          .life-skillverse-card {
            grid-template-columns: minmax(0, 1fr) !important;
            padding: 1.5rem !important;
            border-radius: 1.25rem !important;
            gap: 1.5rem !important;
          }

          .life-skillverse-card h2 {
            max-width: 100%;
          }

          .life-skillverse-button-wrap {
            width: 100%;
          }

          .life-skillverse-button {
            width: 100%;
            justify-content: center;
            white-space: normal !important;
            text-align: center;
          }

          .life-cta {
            padding: 4rem 1rem !important;
          }

          .life-cta > div {
            width: 100%;
          }

          .life-cta h2 {
            max-width: 100%;
          }

          .life-cta p {
            margin-bottom: 2rem !important;
          }

          .life-cta-actions {
            flex-direction: column;
            align-items: stretch !important;
          }

          .life-cta-actions a {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 374px) {
          .life-hero h1 {
            font-size: clamp(2.4rem, 12vw, 3rem) !important;
          }

          .life-pillar-card,
          .life-skillverse-card {
            padding: 1.25rem !important;
          }

          .life-skillverse-button,
          .life-cta-actions a {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>

      <main>
        {/* Breadcrumb Section - Fixed collision with header */}
        <div
          className="life-breadcrumb"
          style={{
            // Keep breadcrumbs below the global fixed header with responsive spacing.
            paddingTop: 'clamp(7.5rem, 12vw, 10rem)',
            paddingLeft: 'clamp(1.5rem, 5vw, 3.5rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 3.5rem)',
            maxWidth: '82rem',
            margin: '0 auto',
          }}
        >
          <nav
            style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: '#fff',
            }}
          >
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/careers" style={{ color: '#fff', textDecoration: 'none' }}>
              Careers
            </Link>
            <span>/</span>
            <span style={{ color: '#fff' }}>Life at TRYVION</span>
          </nav>
        </div>

        {/* Hero Section - Future Forward Animations */}
        <section
          className="life-hero"
          style={{
            padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 3.5rem) clamp(5rem, 7vw, 7rem)',
            maxWidth: '82rem',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Background Glows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '-200px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '900px',
              height: '700px',
              background: 'radial-gradient(ellipse, rgba(20,88,242,0.15) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              color: '#C9A24B',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
              position: 'relative',
            }}
          >
            Life at TRYVION
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
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
            Join us while{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #1458F2 0%, #C9A24B 60%, #1458F2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              we&rsquo;re building it
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '48rem',
              lineHeight: 1.7,
              position: 'relative',
            }}
          >
            TRYVION is a growing enterprise transformation practice. The people who join now are not
            stepping into an established firm — they are shaping what it becomes. That is a
            different kind of opportunity.
          </motion.p>
        </section>

        {/* Pillars Grid Section - Staggered Reveal */}
        <section
          className="life-pillars"
          style={{
            padding: '0 clamp(1.5rem, 5vw, 3.5rem) clamp(6rem, 8vw, 9rem)',
            maxWidth: '82rem',
            margin: '0 auto',
          }}
        >
          <div
            className="life-pillars-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: '2rem',
            }}
          >
            {PILLARS.map((p, index) => (
              <motion.div
                className="life-pillar-card"
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -8, borderColor: `${p.accent}40` }}
                style={{
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '1.5rem',
                  padding: '2.5rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.875rem',
                    background: `${p.accent}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={p.accent}
                    strokeWidth={1.5}
                    style={{ width: '1.375rem', height: '1.375rem' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                  </svg>
                </div>
                <h2
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '0.875rem',
                  }}
                >
                  {p.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.75,
                  }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What We Look For Section */}
        <section
          className="life-look-for"
          style={{
            padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)',
            background: 'rgba(20,88,242,0.06)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
            <p
              style={{
                color: '#C9A24B',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              What we look for
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginBottom: '4rem',
                maxWidth: '36rem',
                color: '#FFFFFF',
              }}
            >
              The qualities that thrive here
            </h2>
            <div
              className="life-look-for-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '2.5rem',
              }}
            >
              {WHAT_WE_LOOK_FOR.map((item, i) => (
                <motion.div
                  key={item.quality}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.875rem',
                    }}
                  >
                    <div
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '50%',
                        background: '#1458F2',
                        flexShrink: 0,
                        boxShadow: '0 0 10px rgba(20,88,242,0.5)',
                      }}
                    />
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                      {item.quality}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.75,
                      paddingLeft: '1.25rem',
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SkillVerse Section */}
        <section
          className="life-skillverse"
          style={{ padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)' }}
        >
          <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
            <motion.div
              className="life-skillverse-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                background:
                  'linear-gradient(135deg, rgba(20,88,242,0.14) 0%, rgba(11,30,61,0.5) 100%)',
                border: '1px solid rgba(20,88,242,0.22)',
                borderRadius: '2rem',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '3rem',
                alignItems: 'center',
              }}
            >
              <div className="life-skillverse-copy">
                <p
                  style={{
                    color: '#C9A24B',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  TRYVION Academy
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.025em',
                    marginBottom: '1rem',
                    color: '#FFFFFF',
                  }}
                >
                  SkillVerse — learn as you build
                </h2>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    maxWidth: '40rem',
                  }}
                >
                  Our enterprise technology learning platform covers SAP S/4HANA, SuccessFactors,
                  BTP, AI and cloud — aligned to real transformation programmes. TRYVION people grow
                  through structured learning paths built around the work we actually do.
                </p>
              </div>
              <div className="life-skillverse-button-wrap" style={{ flexShrink: 0 }}>
                <Link
                  href="/get-started"
                  className="life-skillverse-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(20,88,242,0.25)',
                    border: '1px solid rgba(20,88,242,0.45)',
                    color: '#fff',
                    padding: '0.875rem 1.75rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(20,88,242,0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(20,88,242,0.25)')}
                >
                  Explore SkillVerse
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="life-cta"
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
                color: '#FFFFFF',
              }}
            >
              Ready to build with us?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '1rem',
                lineHeight: 1.75,
                marginBottom: '3rem',
              }}
            >
              Browse our current openings or send us your CV. We are always interested in
              exceptional SAP, AI and enterprise technology talent who want to do more than just
              deliver — they want to shape what comes next.
            </p>
            <div
              className="life-cta-actions"
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link
                href="/careers/roles"
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
                View open roles
              </Link>
              <Link
                href="/about/values"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  padding: '1rem 2.25rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                Our values
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
