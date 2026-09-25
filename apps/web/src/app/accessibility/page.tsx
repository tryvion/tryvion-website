'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2, ArrowUp } from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import { getSiteOrigin } from '@/lib/seo/config';

interface AccessibilitySection {
  id: string;
  num: string;
  title: string;
  content: React.ReactNode;
}

export default function AccessibilityStatementPage() {
  const SITE_URL = getSiteOrigin();
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State for exclusive accordion/tabs (Section 01 open by default)
  const [activeTab, setActiveTab] = useState<string>('our-accessibility-commitment');

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? '' : id);
  };

  const sections: AccessibilitySection[] = [
    {
      id: 'our-accessibility-commitment',
      num: '01',
      title: 'Our accessibility commitment',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            TRYVION is working toward accessibility consistent with the Web Content Accessibility
            Guidelines (WCAG) 2.2 Level AA. WCAG is an international standard developed by the World
            Wide Web Consortium (W3C) for making websites, applications and digital content more
            accessible.
          </p>
          <p>
            Our objective is to make TRYVION&apos;s digital experiences Perceivable, Operable,
            Understandable and Robust.
          </p>
        </div>
      ),
    },
    {
      id: 'accessibility-across-the-experience',
      num: '02',
      title: 'Accessibility across the experience',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            We implement accessibility principles across all facets of our digital user journey:
          </p>
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>
              <strong>Keyboard navigation:</strong> core website functions should be accessible
              without requiring a mouse or other pointing device.
            </li>
            <li>
              <strong>Clear structure:</strong> we use meaningful headings, navigation structures,
              labels, page titles and content hierarchy.
            </li>
            <li>
              <strong>Accessible forms:</strong> where forms are provided, we aim to provide clear
              labels, understandable instructions, meaningful validation, accessible error messages,
              visible focus states and keyboard accessibility.
            </li>
            <li>
              <strong>Alternative text:</strong> we aim to provide meaningful alternative text for
              informative images, while decorative images should be appropriately identified.
            </li>
            <li>
              <strong>Colour and contrast:</strong> we aim to provide sufficient contrast between
              text, controls and backgrounds.
            </li>
            <li>
              <strong>Responsive design:</strong> we design the website to work across desktop,
              laptop, tablet and mobile devices.
            </li>
            <li>
              <strong>Focus visibility:</strong> interactive elements should provide clear visual
              indication when they receive keyboard focus.
            </li>
            <li>
              <strong>Motion:</strong> where animation or movement is used, we seek to ensure that
              it does not unnecessarily prevent users from accessing or interacting with content.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'assistive-technologies',
      num: '03',
      title: 'Assistive technologies',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            We aim to support users who access our website using screen readers, keyboard
            navigation, browser zoom, screen magnification, voice-control software, alternative
            input devices and other assistive technologies.
          </p>
          <p>
            Actual compatibility may vary depending on the combination of browser, operating system,
            assistive technology and third-party content.
          </p>
        </div>
      ),
    },
    {
      id: 'accessibility-and-content',
      num: '04',
      title: 'Accessibility and content',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            We seek to make our content accessible through readable typography, logical content
            hierarchy, descriptive links, meaningful headings, accessible forms, appropriate
            alternative text, captions or transcripts where appropriate, and accessible document
            formats where reasonably practicable.
          </p>
        </div>
      ),
    },
    {
      id: 'accessibility-limitations',
      num: '05',
      title: 'Accessibility limitations',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            We are continually improving our digital accessibility. Some content or functionality
            may not yet fully meet our accessibility objectives.
          </p>
          <p>
            This may include legacy content, older downloadable documents, third-party content,
            embedded third-party applications, external platforms, content outside TRYVION&apos;s
            technical control, or newly introduced functionality undergoing accessibility review.
            Where we identify an accessibility barrier, we seek to assess and address it as part of
            our ongoing improvement process.
          </p>
        </div>
      ),
    },
    {
      id: 'accessibility-testing',
      num: '06',
      title: 'Accessibility testing',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>Our accessibility approach includes consideration of:</p>
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>Keyboard accessibility and focus management</li>
            <li>Semantic structure and colour contrast</li>
            <li>Responsive behaviour and alternative text</li>
            <li>Form accessibility and screen-reader interaction</li>
            <li>Zoom, reflow, and user experience across different devices</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'feedback-and-assistance',
      num: '07',
      title: 'Feedback and assistance',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Accessibility is an ongoing journey, and feedback from users helps us improve. If you
            experience an accessibility barrier while using the TRYVION website, please contact us.
          </p>
          <p>
            Where reasonably possible, we will seek to provide assistance or an alternative way to
            access the relevant information. When contacting us, it is helpful to provide the page
            URL, a description of the problem, the type of content affected, the technology or
            assistive technology being used if relevant, and your preferred method of contact.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-content',
      num: '08',
      title: 'Third-party content',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Some functionality, content or services available through the TRYVION website may be
            provided by third parties. TRYVION cannot always control the accessibility of
            third-party content. Where practical, we seek to identify accessibility barriers and
            work with relevant providers to improve accessibility.
          </p>
        </div>
      ),
    },
    {
      id: 'accessibility-standard',
      num: '09',
      title: 'Accessibility standard',
      content: (
        <div
          className="space-y-3 text-sm sm:text-base"
          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
        >
          <p>
            Our current accessibility target is WCAG 2.2 — Level AA. We will review our
            accessibility approach as accessibility standards, technology and applicable legal
            requirements evolve.
          </p>
          <p>
            TRYVION should not publish a formal WCAG 2.2 AA compliance claim until the live website
            has actually been tested against the applicable WCAG success criteria.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      num: '10',
      title: 'Contact us',
      content: (
        <div className="space-y-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <div
            className="p-5 rounded-xl border backdrop-blur-md space-y-3"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
            }}
          >
            <p
              className="font-semibold text-base mb-2"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              TRYVION Accessibility Team
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:vr@thetryvion.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                vr@thetryvion.com
              </a>
            </p>
            <p>
              <strong>TRYVION Ltd:</strong> 151 Ruxley Lane, Epsom, Surrey, KT19 9EX, United Kingdom
            </p>
            <p>
              <strong>TRYVION Private Limited:</strong> C – 040 Sector – 32 Pi Police Sas Ltd.
              Greater Noida, Uttar Pradesh, India – 201309
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
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Accessibility Statement</span>
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
            <CheckCircle2 size={14} /> Digital Inclusion & Standards
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
            Accessibility Statement
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
            Technology should create access, not barriers.
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
              At TRYVION, we believe digital experiences should be designed to be usable by as many
              people as possible.
            </p>
            <p style={{ color: '#FFFFFF' }}>
              We are committed to improving the accessibility of our website and digital experiences
              and to reducing barriers that may prevent people from accessing information,
              navigating content or interacting with our services.
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
            Accessibility Index
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
