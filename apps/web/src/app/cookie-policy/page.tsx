'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Cookie, ArrowUp } from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import { getSiteOrigin } from '@/lib/seo/config';

interface CookieSection {
  id: string;
  num: string;
  title: string;
  content: React.ReactNode;
}

export default function CookiePolicyPage() {
  const SITE_URL = getSiteOrigin();
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State for exclusive accordion/tabs (Section 01 open by default)
  const [activeTab, setActiveTab] = useState<string>('what-are-cookies');

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? '' : id);
  };

  const sections: CookieSection[] = [
    {
      id: 'what-are-cookies',
      num: '01',
      title: 'What are cookies?',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>Cookies are small files that websites place on your device when you visit them.</p>
          <p>
            We may also use technologies that perform similar functions, including pixels, tags,
            scripts, local storage, SDKs, device identifiers and similar tracking or storage
            technologies.
          </p>
        </div>
      ),
    },
    {
      id: 'why-tryvion-uses-cookies',
      num: '02',
      title: 'Why TRYVION uses cookies',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>TRYVION may use technologies for the following purposes:</p>
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>
              <strong>Strictly Necessary:</strong> functions such as security, authentication,
              session management, load balancing, consent management, fraud prevention and core
              website functionality.
            </li>
            <li>
              <strong>Preferences:</strong> remembering user settings such as language, region and
              display settings.
            </li>
            <li>
              <strong>Analytics:</strong> measuring pages viewed, navigation, website performance,
              user interactions and technical errors.
            </li>
            <li>
              <strong>Marketing:</strong> tracking campaign performance, engagement and interactions
              with TRYVION content.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'your-choices',
      num: '03',
      title: 'Your choices',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Where consent is required, TRYVION will request your permission before activating
            non-essential cookies or similar technologies.
          </p>
          <p>
            Our cookie controls may provide options such as Accept All, Reject Non-Essential and
            Manage Preferences. You may change your preferences at any time through the
            website&apos;s Cookie Settings function.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies-and-privacy',
      num: '04',
      title: 'Cookies and privacy',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Some cookies may involve information that constitutes personal data. Where this occurs,
            the processing of that information is also governed by our{' '}
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>{' '}
            and applicable data-protection law.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-technologies',
      num: '05',
      title: 'Third-party technologies',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Certain website functions may be provided by third parties. These may include providers
            supporting analytics, security, content delivery, video, maps, forms, CRM, marketing,
            communications, customer support and website performance.
          </p>
          <p>
            Where third-party technologies are used, the relevant provider may process information
            in accordance with its own terms and privacy policy, subject to the contractual and
            legal requirements applicable to TRYVION.
          </p>
        </div>
      ),
    },
    {
      id: 'cookie-categories',
      num: '06',
      title: 'Cookie categories',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>
              <strong>Strictly Necessary:</strong> website operation, security and essential
              functionality.
            </li>
            <li>
              <strong>Preferences:</strong> remembering user settings.
            </li>
            <li>
              <strong>Analytics:</strong> understanding website usage and performance.
            </li>
            <li>
              <strong>Marketing:</strong> measuring campaigns and relevant engagement.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'our-cookie-register',
      num: '07',
      title: 'Our cookie register',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>TRYVION will maintain an up-to-date cookie and similar-technology register.</p>
          <p>
            The register should identify, where applicable, technology name, provider, purpose,
            category, duration, first-party or third-party status, information collected and
            applicable consent requirement. The public cookie register should reflect the actual
            technologies deployed on the live website.
          </p>
        </div>
      ),
    },
    {
      id: 'how-long-cookies-remain',
      num: '08',
      title: 'How long cookies remain',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Cookies may be session cookies, which generally expire when the browsing session ends,
            or persistent cookies, which remain on your device for a defined period or until
            manually deleted.
          </p>
          <p>The retention period depends on the purpose and technology.</p>
        </div>
      ),
    },
    {
      id: 'managing-cookies-browser',
      num: '09',
      title: 'Managing cookies through your browser',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Most browsers allow users to view cookies, delete cookies, block cookies, restrict
            third-party cookies and change privacy settings. Blocking certain cookies may affect
            website functionality.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-policy',
      num: '10',
      title: 'Changes to this Cookie Policy',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            We may update this Policy when our website changes, new technologies are introduced,
            existing technologies are removed, our vendors change, or applicable laws or regulatory
            guidance change. The latest version will be published on this page.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      num: '11',
      title: 'Contact us',
      content: (
        <div className="space-y-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <div
            className="p-5 rounded-xl border backdrop-blur-md"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
            }}
          >
            <p className="font-semibold mb-2" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
              TRYVION Privacy Team
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:vr@thetryvion.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                vr@thetryvion.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                www.thetryvion.com
              </a>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: isDark ? '#070B14' : '#FFFFFF',
        color: isDark ? '#F8FAFC' : '#0F172A',
        fontFamily: 'var(--family-text, system-ui, -apple-system, sans-serif)',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* ── HERO SECTION WITH FORCED DARK BACKGROUND AND WAVE OVERLAY IN BOTH MODES ── */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#070B14',
          color: '#F8FAFC',
          paddingTop: 'clamp(10rem, 15vw, 13rem)',
          paddingBottom: '4rem',
          paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Data & AI Wave Background Overlay (Always Active in Hero Section) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 15%, rgba(37, 99, 235, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 80% 35%, rgba(147, 51, 234, 0.15) 0%, transparent 45%),
              linear-gradient(to bottom, rgba(7, 11, 20, 0.8), rgba(7, 11, 20, 1))
            `,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-25"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
          >
            <path
              fill="none"
              stroke="url(#ai-wave-gradient)"
              strokeWidth="1.5"
              d="M0,160 C320,300 420,50 720,220 C1020,390 1120,120 1440,260 L1440,0 L0,0 Z"
            />
            <path
              fill="none"
              stroke="url(#ai-wave-gradient-2)"
              strokeWidth="1"
              d="M0,320 C360,100 480,400 760,280 C1040,160 1200,340 1440,200 L1440,0 L0,0 Z"
            />
            <defs>
              <linearGradient id="ai-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="ai-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          {/* Breadcrumb */}
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
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Cookie Policy</span>
          </nav>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
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
            <Cookie size={14} /> Global Digital Services & Transparency
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Cookie Policy
          </h1>

          <div
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#60A5FA',
              fontFamily: 'monospace',
              marginBottom: '1.5rem',
            }}
          >
            Last Updated: 19th August 2026
          </div>

          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#E2E8F0',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            A better digital experience, with transparency built in.
          </p>

          <div
            style={{
              fontSize: '1rem',
              color: '#94A3B8',
              lineHeight: 1.8,
              maxWidth: '850px',
            }}
          >
            <p className="mb-4" style={{ color: '#FFFFFF' }}>
              TRYVION uses cookies and similar technologies to operate, secure, analyse and improve
              our websites and digital experiences.
            </p>
            <p style={{ color: '#FFFFFF' }}>
              This Cookie Policy explains what these technologies are, why we use them and how you
              can control your preferences. This Policy should be read together with the TRYVION
              Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE TAB / ACCORDION CONTENT SECTION ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '4rem 1.5rem 6rem',
        }}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
            Cookie Policy Index
          </h2>
          <p className="text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Click any tab below to expand its details. Opening a tab automatically collapses the
            previously active section.
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = activeTab === section.id;
            return (
              <div
                key={section.id}
                style={{
                  backgroundColor: isOpen
                    ? isDark
                      ? 'rgba(15, 23, 42, 0.85)'
                      : 'rgba(241, 245, 249, 1)'
                    : isDark
                      ? 'rgba(15, 23, 42, 0.4)'
                      : 'rgba(255, 255, 255, 0.85)',
                  border: `1px solid ${
                    isOpen
                      ? isDark
                        ? 'rgba(59, 130, 246, 0.4)'
                        : '#3B82F6'
                      : isDark
                        ? 'rgba(255, 255, 255, 0.08)'
                        : '#E2E8F0'
                  }`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <button
                  onClick={() => toggleTab(section.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-sm font-bold px-2.5 py-1 rounded-md border"
                      style={{
                        color: isDark ? '#60A5FA' : '#2563EB',
                        backgroundColor: isDark
                          ? 'rgba(37, 99, 235, 0.15)'
                          : 'rgba(37, 99, 235, 0.08)',
                        borderColor: isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                      }}
                    >
                      {section.num}
                    </span>
                    <span
                      className="text-base sm:text-lg font-bold tracking-tight"
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                    >
                      {section.title}
                    </span>
                  </div>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: isOpen
                        ? isDark
                          ? '#60A5FA'
                          : '#2563EB'
                        : isDark
                          ? '#94A3B8'
                          : '#64748B',
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        style={{
                          padding: '0 1.5rem 1.75rem 1.5rem',
                          borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#E2E8F0'}`,
                          marginTop: '0.25rem',
                          paddingTop: '1.25rem',
                        }}
                      >
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BACK TO TOP BUTTON */}
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#CBD5E1'}`,
              color: isDark ? '#FFFFFF' : '#0F172A',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.08)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)')
            }
          >
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </section>
    </div>
  );
}
