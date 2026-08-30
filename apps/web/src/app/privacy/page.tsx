'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Shield, ArrowUp } from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

interface PolicySection {
  id: string;
  num: string;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicyPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // State for exclusive accordion/tabs (Section 01 open by default)
  const [activeTab, setActiveTab] = useState<string>('who-we-are');

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? '' : id);
  };

  const sections: PolicySection[] = [
    {
      id: 'who-we-are',
      num: '01',
      title: 'Who we are',
      content: (
        <div>
          <p className="mb-4 text-sm sm:text-base">
            TRYVION operates internationally through its corporate entities:
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
              <p className="text-sm" style={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                Company Number: 17371095
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
                Registered Office: C – 040 Sector – 32 Pi Police Sas Ltd. Greater Noida, Uttar
                Pradesh, India – 201309
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
            <strong>Website:</strong>{' '}
            <a
              href="https://www.thetryvion.com"
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
    {
      id: 'scope',
      num: '02',
      title: 'Scope of this Policy',
      content: (
        <div>
          <p
            className="mb-3 text-sm sm:text-base"
            style={{ color: isDark ? '#CBD5E1' : '#334155' }}
          >
            This Privacy Policy applies to personal information collected or processed in connection
            with:
          </p>
          <ul
            className="list-disc pl-5 space-y-2 text-sm"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <li>TRYVION websites and digital properties.</li>
            <li>Online enquiry and contact forms.</li>
            <li>Consultation requests.</li>
            <li>Client and prospective-client communications.</li>
            <li>Proposals and business-development activities.</li>
            <li>Events, webinars and conferences.</li>
            <li>Marketing communications.</li>
            <li>Recruitment and careers activities.</li>
            <li>Talent and professional networks.</li>
            <li>Supplier and partner relationships.</li>
            <li>Digital platforms and applications operated by TRYVION.</li>
            <li>Customer and service-support activities.</li>
            <li>Other interactions where this Privacy Policy is referenced.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'information-collected',
      num: '03',
      title: 'Information we collect',
      content: (
        <ul
          className="list-disc pl-5 space-y-2 text-sm"
          style={{ color: isDark ? '#94A3B8' : '#475569' }}
        >
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
              Identity and contact information:
            </strong>{' '}
            name, business email address, telephone number, job title, organisation, business
            address, country or region and professional contact information.
          </li>
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
              Professional information:
            </strong>{' '}
            employment information, professional experience, skills and qualifications,
            certifications, professional profiles, CV or résumé information and career preferences.
          </li>
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>Business information:</strong>{' '}
            organisation details, business requirements, project information, service requirements,
            procurement information, proposal information and contract-related information.
          </li>
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
              Technical information:
            </strong>{' '}
            IP address, browser type, device type, operating system, language preferences,
            approximate location, website interactions, usage information, log information, security
            information and cookie information.
          </li>
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>Communications:</strong>{' '}
            information contained in enquiries, feedback, support requests and correspondence.
          </li>
          <li>
            <strong style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
              Recruitment information:
            </strong>{' '}
            employment history, education, qualifications, skills, experience, CV/resumé,
            references, professional interests and application information.
          </li>
        </ul>
      ),
    },
    {
      id: 'how-collected',
      num: '04',
      title: 'How we collect information',
      content: (
        <ul
          className="list-disc pl-5 space-y-2 text-sm"
          style={{ color: isDark ? '#94A3B8' : '#475569' }}
        >
          <li>Directly from you.</li>
          <li>From your organisation.</li>
          <li>When you submit a form.</li>
          <li>When you contact us.</li>
          <li>When you participate in an event.</li>
          <li>When you apply for a position.</li>
          <li>Through our websites and applications.</li>
          <li>Through cookies and similar technologies.</li>
          <li>From publicly available professional sources.</li>
          <li>From service providers or business partners.</li>
          <li>From other lawful sources.</li>
        </ul>
      ),
    },
    {
      id: 'how-used',
      num: '05',
      title: 'How we use information',
      content: (
        <ul
          className="list-disc pl-5 space-y-2 text-sm"
          style={{ color: isDark ? '#94A3B8' : '#475569' }}
        >
          <li>Respond to enquiries.</li>
          <li>Provide requested information.</li>
          <li>Deliver and administer services.</li>
          <li>Manage client relationships.</li>
          <li>Manage partner and supplier relationships.</li>
          <li>Prepare proposals and commercial documentation.</li>
          <li>Provide support.</li>
          <li>Operate our websites and digital platforms.</li>
          <li>Improve our services.</li>
          <li>Understand website usage.</li>
          <li>Manage events and communications.</li>
          <li>Conduct recruitment.</li>
          <li>Maintain our talent network.</li>
          <li>Send relevant business communications.</li>
          <li>Protect our systems and information.</li>
          <li>Detect and prevent fraud or misuse.</li>
          <li>Comply with legal obligations.</li>
          <li>Establish, exercise or defend legal rights.</li>
          <li>Perform other purposes disclosed when information is collected.</li>
        </ul>
      ),
    },
    {
      id: 'lawful-processing',
      num: '06',
      title: 'Lawful processing',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where UK GDPR or EU GDPR applies, TRYVION will process personal data only where an
            applicable lawful basis exists.
          </p>
          <p>
            Depending on the circumstances, this may include consent; performance of a contract;
            taking steps at your request before entering into a contract; compliance with a legal
            obligation; protection of vital interests; or legitimate interests where those interests
            are not overridden by applicable rights and interests.
          </p>
        </div>
      ),
    },
    {
      id: 'united-kingdom',
      num: '07',
      title: 'United Kingdom',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where applicable, TRYVION processes personal information in accordance with the UK's
            applicable data-protection framework, including the UK General Data Protection
            Regulation, Data Protection Act 2018, applicable privacy and electronic-communications
            requirements, and other applicable UK data-protection legislation and regulatory
            requirements.
          </p>
        </div>
      ),
    },
    {
      id: 'european-union',
      num: '08',
      title: 'European Union and EEA',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where EU GDPR applies to our processing activities, TRYVION will process personal data
            in accordance with the applicable requirements of the EU GDPR.
          </p>
          <p>
            Depending on the circumstances, individuals may have rights including access,
            rectification, erasure, restriction, objection, data portability, withdrawal of consent,
            and rights relating to certain automated decision-making and profiling. These rights are
            subject to applicable legal conditions and exemptions.
          </p>
        </div>
      ),
    },
    {
      id: 'eu-data-act',
      num: '09',
      title: 'EU Data Act and connected or industrial data',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION operates in enterprise technology environments that may involve cloud platforms,
            connected technologies, enterprise applications, industrial systems, automation and
            data-driven services.
          </p>
          <p>
            The EU Data Act is distinct from the GDPR. It establishes rules concerning access to and
            use of data generated by connected products and related services, including certain
            industrial and machine-generated data.
          </p>
          <p>
            Where a TRYVION service, technology or contractual relationship falls within the scope
            of the EU Data Act, TRYVION will address the applicable requirements concerning data
            access, use, sharing and related contractual arrangements.
          </p>
          <p>
            The GDPR continues to apply where the relevant data constitutes personal data. The Data
            Act does not replace the GDPR.
          </p>
        </div>
      ),
    },
    {
      id: 'india',
      num: '10',
      title: 'India',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where applicable to processing undertaken by TRYVION Private Limited or other TRYVION
            entities operating in India, TRYVION will comply with applicable Indian data-protection
            and information-technology requirements.
          </p>
          <p>
            These may include the Digital Personal Data Protection Act, 2023; Digital Personal Data
            Protection Rules, 2025; applicable provisions of the Information Technology Act, 2000;
            applicable rules and regulations made under the Information Technology Act; and other
            applicable Indian privacy, cybersecurity and technology requirements.
          </p>
          <p>
            The Digital Personal Data Protection Rules, 2025 were notified on 14 November 2025 and
            contain different commencement dates for different provisions. TRYVION will implement
            applicable obligations in accordance with their respective legal commencement dates.
          </p>
        </div>
      ),
    },
    {
      id: 'sharing-information',
      num: '11',
      title: 'Sharing information',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION group companies; clients and authorised representatives; professional advisers;
            technology providers; cloud and hosting providers; CRM providers; communications
            providers; analytics providers; cybersecurity providers; recruitment providers;
            professional consultants; suppliers and contractors; business partners; regulators;
            courts and public authorities; and other parties where permitted or required by law.
          </p>
          <p>
            Where third parties process information on our behalf, we seek to implement appropriate
            contractual, technical and organisational safeguards.
          </p>
        </div>
      ),
    },
    {
      id: 'international-transfers',
      num: '12',
      title: 'International transfers',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION operates internationally. Personal information may therefore be transferred to,
            stored in or accessed from countries outside the jurisdiction in which it was originally
            collected.
          </p>
          <p>
            Where applicable law requires safeguards for international transfers, TRYVION will use
            an appropriate lawful transfer mechanism, which may include adequacy decisions, standard
            contractual clauses, applicable international data-transfer agreements, contractual
            safeguards or another legally recognised mechanism.
          </p>
        </div>
      ),
    },
    {
      id: 'information-security',
      num: '13',
      title: 'Information security',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            TRYVION uses reasonable technical and organisational measures designed to protect
            information against unauthorised access, unauthorised disclosure, accidental loss,
            destruction, alteration, misuse and unlawful processing.
          </p>
          <p>
            Security measures may include access controls, authentication, encryption, monitoring,
            logging, vulnerability management, backup procedures and security governance appropriate
            to the information and associated risks.
          </p>
          <p>
            No electronic transmission or storage environment can be guaranteed to be completely
            secure.
          </p>
        </div>
      ),
    },
    {
      id: 'data-retention',
      num: '14',
      title: 'Data retention',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            We retain personal information only for as long as reasonably necessary for the purposes
            for which it was collected, including where necessary to provide services, maintain
            business records, comply with legal obligations, resolve disputes, enforce agreements,
            maintain security records or protect our legal rights.
          </p>
          <p>
            Retention periods vary depending on the type of information, purpose of processing and
            applicable legal requirements.
          </p>
        </div>
      ),
    },
    {
      id: 'privacy-rights',
      num: '15',
      title: 'Your privacy rights',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Depending on your location and applicable law, you may have rights relating to your
            personal information. These may include requesting access, requesting correction,
            requesting deletion, requesting restriction, objecting to processing, withdrawing
            consent, requesting portability, exercising rights relating to automated decision-making
            and making a complaint to an applicable supervisory or regulatory authority.
          </p>
          <p>
            TRYVION will assess each request in accordance with the law applicable to the relevant
            processing activity.
          </p>
        </div>
      ),
    },
    {
      id: 'marketing-communications',
      num: '16',
      title: 'Marketing communications',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Where permitted by law, TRYVION may send business communications relating to services,
            industry insights, research, events, webinars, newsletters, technology developments and
            other relevant business information.
          </p>
          <p>
            Where consent is required, we will obtain appropriate consent. You may unsubscribe from
            marketing communications at any time.
          </p>
        </div>
      ),
    },
    {
      id: 'childrens-information',
      num: '17',
      title: "Children's information",
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>TRYVION's services are primarily designed for organisations and professionals.</p>
          <p>
            We do not knowingly collect children's personal information through our corporate
            website for purposes that are not permitted under applicable law.
          </p>
          <p>
            If you believe that a child has provided personal information to TRYVION improperly,
            please contact us.
          </p>
        </div>
      ),
    },
    {
      id: 'third-party-websites',
      num: '18',
      title: 'Third-party websites',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            Our website may contain links to third-party websites, platforms or services. Those
            websites operate under their own privacy policies. TRYVION is not responsible for the
            privacy, security or content practices of third parties.
          </p>
        </div>
      ),
    },
    {
      id: 'policy-changes',
      num: '19',
      title: 'Changes to this Privacy Policy',
      content: (
        <div className="space-y-3 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our business,
            new services, technological developments, changes in applicable law, regulatory guidance
            or changes to our data-processing activities. The latest version will always be
            published on this page.
          </p>
        </div>
      ),
    },
    {
      id: 'contact-us',
      num: '20',
      title: 'Contact us',
      content: (
        <div className="space-y-4 text-sm" style={{ color: isDark ? '#94A3B8' : '#475569' }}>
          <p>
            If you have any questions, requests or concerns regarding this Privacy Policy or our
            handling of personal information, please contact our Privacy Team:
          </p>
          <div
            className="p-5 rounded-xl border backdrop-blur-md"
            style={{
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#CBD5E1',
            }}
          >
            <p className="font-bold mb-2" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
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
                  C – 040 Sector – 32 Pi Police Sas Ltd. Greater Noida, Uttar Pradesh, India –
                  201309
                </p>
              </div>
            </div>
          </div>
          <p>
            <strong>Website:</strong>{' '}
            <a
              href="https://www.thetryvion.com"
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
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Legal & Privacy Policy</span>
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
            <Shield size={14} /> Global Compliance & Data Security
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
            Privacy Policy
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
            Your privacy. Our responsibility.
          </p>

          <div
            style={{
              fontSize: '1rem',
              color: '#FFFFFF',
              lineHeight: 1.8,
              maxWidth: '850px',
            }}
          >
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              At TRYVION, trust is fundamental to the way we build relationships, deliver technology
              and create long-term value.
            </p>
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              We recognise that personal information is entrusted to us by individuals across our
              clients, partners, suppliers, employees, candidates and professional communities. We
              are committed to handling that information responsibly, transparently and securely.
            </p>
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              This Privacy Policy explains how TRYVION collects, uses, discloses, protects and
              retains personal information when you interact with TRYVION through our websites,
              digital platforms, services, communications, recruitment activities and other
              activities covered by this Policy.
            </p>
            <p className="mb-4" style={{ color: isDark ? '#FFFFFF' : '#FFFFFF' }}>
              We apply consistent global privacy principles while complying with the laws applicable
              to the jurisdiction in which personal information is collected or processed.
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
            Policy Sections Index
          </h2>
          <p className="text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Click any tab below to open its complete legal disclosure. Opening a tab automatically
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
