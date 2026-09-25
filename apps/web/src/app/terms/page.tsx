'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Shield, ArrowUp } from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import { getSiteOrigin } from '@/lib/seo/config';

interface TermsSection {
  id: string;
  num: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsConditionsPage() {
  const SITE_URL = getSiteOrigin();
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State for exclusive accordion/tabs (Section 01 open by default)
  const [activeTab, setActiveTab] = useState<string>('about-tryvion');

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? '' : id);
  };

  const sections: TermsSection[] = [
    {
      id: 'about-tryvion',
      num: '01',
      title: 'About TRYVION',
      content: (
        <div>
          <p
            className="mb-4 text-sm sm:text-base"
            style={{ color: isDark ? '#CBD5E1' : '#334155' }}
          >
            TRYVION Ltd is the parent company of TRYVION Private Limited. TRYVION operates
            internationally through its group companies, partners, technology providers and
            professional networks. Different TRYVION entities may provide or contract for different
            services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div
              className="p-4 rounded-xl border backdrop-blur-md transition-colors"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
              }}
            >
              <h4 className="font-bold mb-2" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                TRYVION Ltd
              </h4>
              <p className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                United Kingdom
              </p>
              <p className="text-sm mt-1" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                Registered Office: 151 Ruxley Lane, Epsom, Surrey, KT19 9EX, United Kingdom
              </p>
            </div>
            <div
              className="p-4 rounded-xl border backdrop-blur-md transition-colors"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
              }}
            >
              <h4 className="font-bold mb-2" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                TRYVION Private Limited
              </h4>
              <p className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                India
              </p>
              <p className="text-sm mt-1" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                Registered Office: C-040 Sector - 32 Pi Police Sas Ltd. Greater Noida, Uttar
                Pradesh, India - 201309
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
            The specific legal entity responsible for a service or commercial engagement will be
            identified in the applicable proposal, statement of work, order form, master services
            agreement or other contractual documentation.
          </p>
        </div>
      ),
    },
    {
      id: 'website-use',
      num: '02',
      title: 'Website use',
      content: (
        <div>
          <p
            className="mb-3 text-sm sm:text-base"
            style={{ color: isDark ? '#CBD5E1' : '#334155' }}
          >
            You may use this website for legitimate informational and business purposes. You must
            not:
          </p>
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>Use the website unlawfully.</li>
            <li>Attempt to gain unauthorised access.</li>
            <li>Interfere with website operations.</li>
            <li>Introduce malicious software.</li>
            <li>Circumvent security controls.</li>
            <li>Perform unauthorised vulnerability testing.</li>
            <li>Scrape or systematically extract website content without permission.</li>
            <li>Impersonate another person or organisation.</li>
            <li>Infringe intellectual-property rights.</li>
            <li>Distribute malicious or misleading content.</li>
            <li>Use the website in a way that could damage TRYVION or its users.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'website-content',
      num: '03',
      title: 'Website content',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION seeks to maintain accurate and current information. However, information
            published on the website may change without notice.
          </p>
          <p>
            Website content is provided for general information and does not constitute legal
            advice, financial advice, tax advice, investment advice, professional advice, a binding
            commercial offer, a guarantee of results, or a contractual commitment.
          </p>
          <p>
            Specific services and deliverables are governed by applicable contractual documentation.
          </p>
        </div>
      ),
    },
    {
      id: 'intellectual-property',
      num: '04',
      title: 'Intellectual property',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Unless expressly stated otherwise, the website and its content are owned by or licensed
            to TRYVION.
          </p>
          <p>
            This includes TRYVION trademarks, logos, brand assets, text, graphics, photography,
            video, illustrations, reports, publications, software, designs, page layouts,
            downloadable materials and other intellectual property.
          </p>
          <p>
            You may not reproduce, distribute, modify, republish or commercially exploit TRYVION
            content without prior written permission, except where permitted by applicable law.
          </p>
        </div>
      ),
    },
    {
      id: 'tryvion-trademarks',
      num: '05',
      title: 'TRYVION trademarks',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION, its logos, names, visual identity and associated marks are trademarks or
            protected intellectual property of TRYVION or its relevant licensors. Nothing on this
            website grants you a licence to use TRYVION trademarks.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-trademarks',
      num: '06',
      title: 'Third-party trademarks',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Third-party names, trademarks, logos and product names appearing on this website belong
            to their respective owners. Their inclusion does not necessarily indicate an
            endorsement, partnership or commercial relationship unless expressly stated.
          </p>
        </div>
      ),
    },
    {
      id: 'professional-technology-information',
      num: '07',
      title: 'Professional and technology information',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION provides information about SAP, enterprise applications, artificial
            intelligence, cloud technologies, automation, enterprise data, digital transformation,
            cybersecurity and other emerging technologies.
          </p>
          <p>
            Technology changes rapidly. Product capabilities, availability, licensing, integrations,
            roadmaps and regulatory requirements may change. References to third-party technologies
            should therefore be understood in the context in which they are presented.
          </p>
        </div>
      ),
    },
    {
      id: 'ai-generated-information',
      num: '08',
      title: 'AI-generated and AI-assisted information',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION may use artificial intelligence and automation in the development, analysis or
            presentation of certain digital content and services.
          </p>
          <p>
            AI-generated or AI-assisted information may contain inaccuracies or omissions. Users
            should independently evaluate information before relying upon it for material business,
            legal, financial, operational or other decisions.
          </p>
          <p>
            Nothing on the website should be interpreted as a guarantee that an AI technology,
            model, platform or use case will produce a particular result.
          </p>
        </div>
      ),
    },
    {
      id: 'no-confidential-information',
      num: '09',
      title: 'No confidential information',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            The TRYVION website is a publicly accessible environment. Unless expressly agreed
            otherwise in writing, information submitted through general website forms should not be
            considered confidential.
          </p>
          <p>
            Please do not submit trade secrets, confidential client information, proprietary
            technical information, passwords, security credentials or other highly sensitive
            information through general website forms.
          </p>
        </div>
      ),
    },
    {
      id: 'user-submissions',
      num: '10',
      title: 'User submissions',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where you submit information, documents or other materials to TRYVION, you confirm that:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You have the right to provide them.</li>
            <li>The information is accurate to the best of your knowledge.</li>
            <li>Submission does not violate another party's rights.</li>
            <li>The material does not contain unlawful content.</li>
            <li>The material does not contain malicious software.</li>
          </ul>
          <p className="mt-2">
            Personal information submitted to TRYVION will be handled in accordance with our Privacy
            Policy.
          </p>
        </div>
      ),
    },
    {
      id: 'careers-recruitment',
      num: '11',
      title: 'Careers and recruitment',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Career opportunities published on the TRYVION website are subject to the applicable
            recruitment process. Publication of a vacancy does not constitute an offer of
            employment. Any employment or engagement will be governed by separate documentation.
          </p>
        </div>
      ),
    },
    {
      id: 'external-links',
      num: '12',
      title: 'External links',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            The website may contain links to third-party websites. Third-party websites are not
            controlled by TRYVION. We are not responsible for third-party content, security,
            availability, privacy practices, terms of use or services provided by third parties.
          </p>
        </div>
      ),
    },
    {
      id: 'website-availability',
      num: '13',
      title: 'Website availability',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            We aim to maintain a reliable website experience. However, we do not guarantee that the
            website will always be available, operate without interruption, be free from errors, be
            free from vulnerabilities or remain unchanged. We may modify, suspend or discontinue any
            part of the website where reasonably necessary.
          </p>
        </div>
      ),
    },
    {
      id: 'limitation-of-liability',
      num: '14',
      title: 'Limitation of liability',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            To the maximum extent permitted by applicable law, TRYVION shall not be liable for
            indirect, incidental, consequential, special or punitive losses arising from or relating
            to your use of the website.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or
            limited. Nothing in these Terms affects mandatory legal rights that cannot be excluded.
          </p>
        </div>
      ),
    },
    {
      id: 'indemnity',
      num: '15',
      title: 'Indemnity',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            To the extent permitted by applicable law, you agree to indemnify TRYVION against
            claims, losses, liabilities and reasonable costs arising from your unlawful use of the
            website; your breach of these Terms; your infringement of third-party rights; or your
            submission of unlawful or malicious material.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy',
      num: '16',
      title: 'Privacy',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Your use of the website is also subject to the TRYVION{' '}
            <Link
              href="/privacy-policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      num: '17',
      title: 'Cookies',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            The use of cookies and similar technologies is governed by the TRYVION Cookie Policy.
          </p>
        </div>
      ),
    },
    {
      id: 'changes-to-terms',
      num: '18',
      title: 'Changes to these Terms',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION may update these Terms from time to time. The latest version will be published
            on this website. Your continued use of the website following publication of updated
            Terms constitutes acceptance of the updated Terms to the extent permitted by applicable
            law.
          </p>
        </div>
      ),
    },
    {
      id: 'governing-law',
      num: '19',
      title: 'Governing law',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Unless a separate written agreement provides otherwise, these Terms shall be governed by
            the laws of England and Wales. The courts of England and Wales shall have jurisdiction,
            subject to mandatory rights or jurisdictional requirements that may apply to users in
            other jurisdictions.
          </p>
          <p>
            Where services are contracted directly with TRYVION Private Limited in India, the
            applicable commercial agreement may specify Indian law and the appropriate jurisdiction.
          </p>
        </div>
      ),
    },
    {
      id: 'contact',
      num: '20',
      title: 'Contact',
      content: (
        <div className="space-y-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            For any questions regarding these Terms & Conditions, please contact us through our
            official channels:
          </p>
          <div
            className="p-5 rounded-xl border backdrop-blur-md"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
            }}
          >
            <p className="mb-2">
              <strong>General enquiries:</strong>{' '}
              <a
                href="mailto:vr@thetryvion.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                vr@thetryvion.com
              </a>
            </p>
            <p className="mb-4">
              <strong>Legal enquiries:</strong>{' '}
              <a
                href="mailto:vr@thetryvion.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                vr@thetryvion.com
              </a>
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1' }}
            >
              <div>
                <p className="font-semibold" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  TRYVION Ltd
                </p>
                <p className="text-xs mt-1" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
                  151 Ruxley Lane, Epsom, Surrey, KT19 9EX, United Kingdom
                </p>
              </div>
              <div>
                <p className="font-semibold" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                  TRYVION Private Limited
                </p>
                <p className="text-xs mt-1" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
                  C-040 Sector - 32 Pi Police Sas Ltd. Greater Noida, Uttar Pradesh, India - 201309
                </p>
              </div>
            </div>
          </div>
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
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Terms & Conditions</span>
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
            <Shield size={14} /> Global Digital Services & Legal Compliance
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
            Terms & Conditions
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
            Welcome to TRYVION
          </p>

          <div
            style={{
              fontSize: '1rem',
              color: '#94A3B8',
              lineHeight: 1.8,
              maxWidth: '850px',
            }}
          >
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              These Terms & Conditions govern your access to and use of the TRYVION website and
              publicly available digital services.
            </p>
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              The website is operated within the TRYVION group, whose parent company is TRYVION Ltd
              in the United Kingdom and whose Indian subsidiary includes TRYVION Private Limited.
            </p>
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              By accessing or using this website, you agree to these Terms. If you do not agree with
              these Terms, please discontinue use of the website.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE 20-TAB / ACCORDION CONTENT SECTION ── */}
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
            Terms & Conditions Index
          </h2>
          <p className="text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Click any tab below to expand its complete legal terms. Opening a tab automatically
            collapses the previously active section.
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
