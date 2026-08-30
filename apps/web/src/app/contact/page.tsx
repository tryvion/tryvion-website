'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  FileText,
  Store, // Fixed: Changed from Storefront to Store
  Headphones,
  Globe,
  ChevronDown,
  SquareCheck, // Fixed: Changed from CheckSquare to SquareCheck
  Square,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import { url } from 'inspector';

/* -------------------------------------------------------------------------- */
/* DESIGN TOKENS & THEME COLORS                                               */
/* -------------------------------------------------------------------------- */

const LIGHT = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  textPrimary: '#0B1E3D',
  textSecondary: '#5F6875',
  border: '#E2E6EB',
  inputBg: '#F4F6F9',
  gold: '#C9A24B',
  blue: '#1458F2',
};

const DARK = {
  bg: '#07162C',
  surface: '#040D1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AAB8',
  border: 'rgba(255, 255, 255, 0.1)',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  gold: '#C9A24B',
  blue: '#3B7BFF',
};

/* -------------------------------------------------------------------------- */
/* MOTION WRAPPERS                                                            */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                               */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[500px] lg:min-h-[550px] flex items-center pt-32 lg:pt-40 pb-20"
      style={{ background: '#3167bf' }}
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-contact.jpg" // Replace with actual contact hero image path
          alt="Modern enterprise architecture background"
          fill
          priority
          unoptimized
          className={`object-cover object-center ${isDark ? 'opacity-30 mix-blend-screen' : 'opacity-60 mix-blend-multiply'}`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-[#07162C]/20 via-[#07162C]/20 to-transparent'
              : 'bg-gradient-to-r from-[#0B1E3D]/20 via-[#0B1E3D]/20 to-transparent'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 my-auto">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Contact</span>
        </div>

        <Reveal>
          <h1 className="font-sans text-[48px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Contact TRYVION
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-[600px] text-[17px] sm:text-[19px] font-normal leading-[1.6] text-white/90">
            Forge strategic partnerships that redefine enterprise capability. Engage with our global
            experts to orchestrate your transformation, from advanced AI integration to global
            operational restructuring.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CONTACT CARDS & DIRECTORY                                                  */
/* -------------------------------------------------------------------------- */

function ContactCardsSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN - Action Cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Talk to an Expert */}
            <Reveal>
              <div
                className="group relative p-10 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                style={{ backgroundColor: t.surface || t.bg, borderColor: t.border }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: t.inputBg }}
                  >
                    <ArrowRight
                      className={`w-6 h-6 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                    />
                  </div>
                  <Link
                    href="/contact/talk-to-an-expert"
                    className="hover:text-[#C9A24B] transition-colors"
                  >
                    <ArrowRight
                      className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                    />
                  </Link>
                </div>
                <h3
                  className={`text-[24px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                >
                  Talk to an Expert
                </h3>
                <p
                  className={`text-[15px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                >
                  Connect directly with our specialized AI and systems architects to discuss
                  tailored solutions for your immediate technical hurdles.
                </p>
              </div>
            </Reveal>

            {/* Book Consultation & Request Proposal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Reveal delay={0.1}>
                <div
                  className="group relative p-10 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full"
                  style={{ backgroundColor: t.surface || t.bg, borderColor: t.border }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: t.inputBg }}
                    >
                      <Calendar
                        className={`w-6 h-6 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                      />
                    </div>
                    <Link
                      href="/contact/book-a-consultation"
                      className="hover:text-[#C9A24B] transition-colors"
                    >
                      <ArrowRight
                        className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                      />
                    </Link>
                  </div>
                  <h3
                    className={`text-[20px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    Book a Consultation
                  </h3>
                  <p
                    className={`text-[14px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    Schedule a high-level strategic alignment session for executive leadership.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div
                  className="group relative p-10 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full"
                  style={{ backgroundColor: t.surface || t.bg, borderColor: t.border }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: t.inputBg }}
                    >
                      <FileText
                        className={`w-6 h-6 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                      />
                    </div>
                    <Link
                      href="/contact/request-a-proposal"
                      className="hover:text-[#C9A24B] transition-colors"
                    >
                      <ArrowRight
                        className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                      />
                    </Link>
                  </div>
                  <h3
                    className={`text-[20px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    Request a Proposal
                  </h3>
                  <p
                    className={`text-[14px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    Access our secure procurement portal to submit an RFP or RFQ.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* RIGHT COLUMN - Directory & Support */}
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <div
                className="p-10 rounded-xl border h-full flex flex-col"
                style={{ backgroundColor: t.surface || t.bg, borderColor: t.border }}
              >
                <h4
                  className={`text-[12px] font-bold uppercase tracking-[0.14em] mb-8 ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
                >
                  Directory & Support
                </h4>
                <br />

                <div className="space-y-6 flex-grow">
                  {[
                    {
                      icon: Store,
                      title: 'Sales Enquiries',
                      desc: 'Strategic routing for new business.',
                      href: '/contact/sales-enquiries',
                    },
                    {
                      icon: Headphones,
                      title: 'Customer Support',
                      desc: 'AI-augmented concierge services.',
                      href: '/contact/customer-support',
                    },
                    {
                      icon: Globe,
                      title: 'Global Offices',
                      desc: 'Hub directory and global locations.',
                      href: '/contact/global-offices',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group flex items-center gap-5 cursor-pointer">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}
                      >
                        <item.icon
                          className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h5
                          className={`text-[16px] font-bold ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                        >
                          {item.title}
                        </h5>
                        <p className={`text-[13px] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <Link
                        href={item.href}
                        aria-label={`Go to ${item.title}`}
                        className="flex-shrink-0"
                      >
                        <ArrowRight
                          className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDark ? 'text-white' : 'text-[#0B1E3D]'
                          }`}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
                <br />
                <br />

                {/* Systems Status */}
                <div
                  className={`mt-10 pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span
                      className={`text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-500`}
                    >
                      Systems Fully Operational
                    </span>
                  </div>
                  <p className={`text-[13px] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}>
                    Current average response time: &lt; 2 hours.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  /*
   * IMPORTANT:
   * These values MUST exactly match the values defined in
   * ContactSubmissions.ts / Payload.
   *
   * The previous frontend used:
   *   Applications
   *   Artificial Intelligence
   *   Data & Analytics
   *   Cloud
   *   Labs
   *   Talent
   *   Academy
   *   Operate
   *
   * Payload actually expects:
   *   Tryvion Applications
   *   Tryvion AI
   *   Tryvion Data & Analytics
   *   Tryvion Cloud
   *   Tryvion Labs
   *   Tryvion Talent
   *   Tryvion Academy
   *   Tryvion Operate
   */

  const SERVICE_DATA = [
    {
      value: 'Tryvion Applications',
      label: 'TRYVION Applications',
      subServices: [
        'SAP S/4HANA',
        'SAP SuccessFactors',
        'SAP Customer Experience (CX)',
        'SAP Ariba',
        'SAP Business Technology Platform (BTP)',
      ],
    },
    {
      value: 'Tryvion AI',
      label: 'TRYVION AI',
      subServices: ['Enterprise AI Strategy', 'Enterprise AI Platforms', 'Intelligent Automation'],
    },
    {
      value: 'Tryvion Data & Analytics',
      label: 'TRYVION Data & Analytics',
      subServices: [
        'Data Engineering',
        'Data Platforms',
        'Data Integration',
        'Data Governance',
        'Business Intelligence',
        'Enterprise Reporting',
        'Advanced & Predictive Analytics',
      ],
    },
    {
      value: 'Tryvion Cloud',
      label: 'TRYVION Cloud',
      subServices: [
        'Cloud Strategy',
        'Cloud Migration & Modernization',
        'Amazon Web Services (AWS)',
        'Microsoft Azure',
        'Google Cloud Platform (GCP)',
      ],
    },
    {
      value: 'Tryvion Labs',
      label: 'TRYVION Labs',
      subServices: [
        'Custom Application Development',
        'API Management & Integration',
        'Enterprise Integration',
        'DevSecOps & Platform Engineering',
      ],
    },
    {
      value: 'Tryvion Talent',
      label: 'TRYVION Talent',
      subServices: [
        'SAP Talent Solutions',
        'Technology Contract Staffing',
        'Permanent Hiring',
        'Executive Search',
        'Global Resource Augmentation',
        'Freelancer Marketplace',
      ],
    },
    {
      value: 'Tryvion Academy',
      label: 'TRYVION Academy',
      subServices: [
        'Tryvion Learning Platform (TLP)',
        'Inside TLP - SAP Learning',
        'Corporate Learning - Change & Adoption',
        'Leadership Development',
      ],
    },
    {
      value: 'Tryvion Operate',
      label: 'TRYVION Operate',
      subServices: ['SAP Run in the New', 'Cloud Operations', 'Application Support'],
    },
  ] as const;

  type ServiceValue = (typeof SERVICE_DATA)[number]['value'];

  type FormData = {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    mainService: string;
    subService: string;
    message: string;
    privacyConsent: boolean;
    newsletterOptIn: boolean;
    website: string;
  };

  const INITIAL_FORM: FormData = {
    fullName: '',
    company: '',
    email: '',
    phone: '',
    mainService: '',
    subService: '',
    message: '',
    privacyConsent: false,
    newsletterOptIn: false,
    website: '',
  };

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [submitMessage, setSubmitMessage] = useState('');

  const selectedService = SERVICE_DATA.find((service) => service.value === formData.mainService);

  const availableSubServices = selectedService?.subServices ?? [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = e.target;

    const { name, value, type } = target;

    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;

      setFormData((previous) => ({
        ...previous,
        [name]: checked,
      }));
    } else {
      setFormData((previous) => ({
        ...previous,
        [name]: value,
        ...(name === 'mainService'
          ? {
              subService: '',
            }
          : {}),
      }));
    }

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isSubmitting) return;

    const fullName = formData.fullName.trim();
    const company = formData.company.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const mainService = formData.mainService.trim();
    const subService = formData.subService.trim();
    const message = formData.message.trim();

    const fail = (message: string): void => {
      setSubmitStatus('error');
      setSubmitMessage(message);
    };

    /* -------------------------------------------------------------- */
    /* CLIENT-SIDE VALIDATION                                         */
    /* -------------------------------------------------------------- */

    if (fullName.length < 2) {
      return fail('Please enter your full name.');
    }

    if (fullName.length > 100) {
      return fail('Full name must be 100 characters or fewer.');
    }

    if (company.length < 2) {
      return fail('Please enter your company name.');
    }

    if (company.length > 150) {
      return fail('Company name must be 150 characters or fewer.');
    }

    if (!email) {
      return fail('Please enter your business email address.');
    }

    if (email.length > 254) {
      return fail('Email address is too long.');
    }

    const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i;

    if (!emailPattern.test(email)) {
      return fail('Please enter a valid business email address.');
    }

    if (phone && !/^[+0-9().\-\s]{7,40}$/.test(phone)) {
      return fail('Please enter a valid phone number.');
    }

    const validService = SERVICE_DATA.find((service) => service.value === mainService);

    if (!validService) {
      return fail('Please select a valid service area.');
    }

    if (!subService) {
      return fail('Please select a specific capability.');
    }

    if (!validService.subServices.includes(subService as never)) {
      return fail('The selected capability does not belong to the selected service.');
    }

    if (message.length < 20) {
      return fail('Please provide at least 20 characters describing your enquiry.');
    }

    if (message.length > 5000) {
      return fail('Your message must be 5000 characters or fewer.');
    }

    if (!formData.privacyConsent) {
      return fail('Please agree to the Privacy Policy before submitting your enquiry.');
    }

    /* -------------------------------------------------------------- */
    /* HONEYPOT                                                       */
    /* -------------------------------------------------------------- */

    if (formData.website.trim()) {
      setSubmitStatus('success');
      setSubmitMessage('Thank you. Your enquiry has been received.');
      setFormData(INITIAL_FORM);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    /* -------------------------------------------------------------- */
    /* SAME-ORIGIN NEXT.JS API                                       */
    /* -------------------------------------------------------------- */
    /*
     * IMPORTANT:
     *
     * Do NOT call:
     *
     *   http://localhost:3001/api/contact
     *
     * from the browser.
     *
     * Do NOT use NEXT_PUBLIC_CMS_URL here.
     *
     * The browser calls the Next.js API route on the same origin:
     *
     *   /api/contact
     *
     * That route is responsible for communicating with the CMS.
     *
     * This eliminates browser CORS failures.
     */

    const apiUrl = '/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          fullName,
          company,
          email,
          phone: phone || undefined,
          mainService,
          subService,
          message,
          privacyConsent: formData.privacyConsent,
          newsletterOptIn: Boolean(formData.newsletterOptIn),
          website: '',
        }),
      });

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
        id?: string | number;
      } = {};

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch {
          result = {};
        }
      } else {
        const text = await response.text();

        result = {
          message: text || undefined,
        };
      }

      if (response.ok && result.success === true) {
        setSubmitStatus('success');
        setSubmitMessage(
          result.message ||
            'Thank you. Your enquiry has been received. Our team will contact you shortly.',
        );
        setFormData(INITIAL_FORM);
        return;
      }

      setSubmitStatus('error');
      setSubmitMessage(
        result.message ||
          result.error ||
          `Unable to submit your enquiry. Server returned ${response.status}.`,
      );
    } catch (error) {
      console.error('[TRYVION Contact Form]', error);

      setSubmitStatus('error');
      setSubmitMessage('Unable to submit your enquiry. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  /* ------------------------------------------------------------------ */
  /* EXISTING DESIGN STYLES — UNCHANGED                                */
  /* ------------------------------------------------------------------ */

  const inputClassName = `
    w-full
    px-6
    py-3.5
    rounded-lg
    border
    outline-none
    transition-all
    focus:ring-2
    focus:ring-offset-2
    ${isDark ? 'focus:ring-[#C9A24B]/50' : 'focus:ring-[#1458F2]/50'}
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  const labelClassName = `
    block
    mb-6
    text-[12px]
    font-bold
    uppercase
    tracking-[0.1em]
    ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}
  `;

  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <Reveal>
          <div
            className="rounded-xl border p-8 sm:p-10 lg:p-14"
            style={{
              backgroundColor: t.surface,
              borderColor: t.border,
            }}
          >
            <div className="mb-10">
              <p
                className={`mb-3 text-[11px] font-bold uppercase tracking-[0.15em] ${
                  isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                }`}
              >
                START A CONVERSATION
              </p>

              <h2
                className={`text-[32px] font-extrabold leading-tight sm:text-[44px] ${
                  isDark ? 'text-white' : 'text-[#0B1E3D]'
                }`}
              >
                Tell us what comes next.
              </h2>

              <p
                className={`mt-4 max-w-[680px] text-[15px] leading-[1.7] ${
                  isDark ? 'text-gray-400' : 'text-[#5F6875]'
                }`}
              >
                Tell us about your organisation, your priorities and the challenge you are looking
                to solve.
              </p>
            </div>

            {submitStatus !== 'idle' && (
              <div
                role={submitStatus === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                className={`mb-8 rounded-lg border px-5 py-4 text-[14px] leading-relaxed ${
                  submitStatus === 'success'
                    ? isDark
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : isDark
                      ? 'border-red-400/30 bg-red-400/10 text-red-300'
                      : 'border-red-200 bg-red-50 text-red-700'
                }`}
              >
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate autoComplete="on">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className={labelClassName}>
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    disabled={isSubmitting}
                    className={inputClassName}
                    style={{
                      backgroundColor: t.inputBg,
                      borderColor: t.border,
                      color: t.textPrimary,
                    }}
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClassName}>
                    Company <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    minLength={2}
                    maxLength={150}
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                    disabled={isSubmitting}
                    className={inputClassName}
                    style={{
                      backgroundColor: t.inputBg,
                      borderColor: t.border,
                      color: t.textPrimary,
                    }}
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="email" className={labelClassName}>
                    Work Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@acme.com"
                    disabled={isSubmitting}
                    className={inputClassName}
                    style={{
                      backgroundColor: t.inputBg,
                      borderColor: t.border,
                      color: t.textPrimary,
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClassName}>
                    Phone
                    <span
                      className={`ml-2 text-[11px] normal-case font-medium ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      Optional
                    </span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={40}
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    disabled={isSubmitting}
                    className={inputClassName}
                    style={{
                      backgroundColor: t.inputBg,
                      borderColor: t.border,
                      color: t.textPrimary,
                    }}
                  />
                </div>

                {/* Main Service */}
                <div>
                  <label htmlFor="mainService" className={labelClassName}>
                    Main Service Area <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="mainService"
                      name="mainService"
                      required
                      value={formData.mainService}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`${inputClassName} appearance-none pr-12`}
                      style={{
                        backgroundColor: t.inputBg,
                        borderColor: t.border,
                        color: t.textPrimary,
                      }}
                    >
                      <option value="">Select a service area</option>

                      {SERVICE_DATA.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Sub Service */}
                <div>
                  <label htmlFor="subService" className={labelClassName}>
                    Specific Capability <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      id="subService"
                      name="subService"
                      required
                      value={formData.subService}
                      onChange={handleChange}
                      disabled={isSubmitting || !formData.mainService}
                      className={`${inputClassName} appearance-none pr-12`}
                      style={{
                        backgroundColor: t.inputBg,
                        borderColor: t.border,
                        color: t.textPrimary,
                      }}
                    >
                      <option value="">
                        {formData.mainService ? 'Select a capability' : 'Select a service first'}
                      </option>

                      {availableSubServices.map((subService) => (
                        <option key={subService} value={subService}>
                          {subService}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className={labelClassName}>
                    How can we help? <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={20}
                    maxLength={5000}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    disabled={isSubmitting}
                    className={`${inputClassName} resize-y`}
                    style={{
                      backgroundColor: t.inputBg,
                      borderColor: t.border,
                      color: t.textPrimary,
                    }}
                  />

                  <div
                    className={`mt-2 text-right text-[11px] ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {formData.message.length}/5000
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* HONEYPOT                                                   */}
              {/* ---------------------------------------------------------- */}

              <div
                aria-hidden="true"
                className="absolute -left-[10000px] h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Website</label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* ---------------------------------------------------------- */}
              {/* CONSENTS                                                    */}
              {/* ---------------------------------------------------------- */}

              <div className="mb-10 mt-8 space-y-5">
                {/* Privacy Consent */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="sr-only"
                  />

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors ${
                      formData.privacyConsent
                        ? isDark
                          ? 'border-[#C9A24B] bg-[#C9A24B]'
                          : 'border-[#1458F2] bg-[#1458F2]'
                        : isDark
                          ? 'border-gray-600'
                          : 'border-gray-300'
                    }`}
                  >
                    {formData.privacyConsent && <SquareCheck className="h-3.5 w-3.5 text-white" />}
                  </span>

                  <span
                    className={`text-[14px] leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-[#5F6875]'
                    }`}
                  >
                    I agree to the processing of my personal data in accordance with the{' '}
                    <Link
                      href="/privacy"
                      className={`underline decoration-1 underline-offset-2 ${
                        isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                      }`}
                    >
                      Privacy Policy
                    </Link>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>

                {/* Newsletter */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="newsletterOptIn"
                    checked={formData.newsletterOptIn}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="sr-only"
                  />

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors ${
                      formData.newsletterOptIn
                        ? isDark
                          ? 'border-[#C9A24B] bg-[#C9A24B]'
                          : 'border-[#1458F2] bg-[#1458F2]'
                        : isDark
                          ? 'border-gray-600'
                          : 'border-gray-300'
                    }`}
                  >
                    {formData.newsletterOptIn && <SquareCheck className="h-3.5 w-3.5 text-white" />}
                  </span>

                  <span
                    className={`text-[14px] leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-[#5F6875]'
                    }`}
                  >
                    I would like to receive insights, updates, and promotional communications from
                    TRYVION.
                  </span>
                </label>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* SUBMIT                                                     */}
              {/* ---------------------------------------------------------- */}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className={`inline-flex min-w-[170px] items-center justify-center gap-3 rounded-lg px-6 py-5 font-bold text-[14px] uppercase tracking-[0.05em] transition-all ${
                    isSubmitting
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:scale-[1.02] active:scale-[0.98]'
                  } ${
                    isDark
                      ? 'bg-[#C9A24B] text-[#07162C] hover:bg-[#d4ad5a]'
                      : 'bg-[#0B1E3D] text-white hover:bg-[#142b52]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function ContactPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main
      className={`min-h-screen antialiased transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'}`}
    >
      <HeroSection isDark={isDark} />
      <ContactCardsSection isDark={isDark} />
      <ContactFormSection isDark={isDark} />
    </main>
  );
}
