'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  Lightbulb,
  TrendingUp,
  Globe,
  Heart,
  Search,
  MapPin,
  Briefcase,
  Layers,
  Megaphone,
  Clock,
  Send,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/* DESIGN TOKENS & THEME COLORS                                               */
/* -------------------------------------------------------------------------- */

const LIGHT = {
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  textPrimary: '#0B1E3D',
  textSecondary: '#5F6875',
  border: '#E2E6EB',
  cardBg: '#FFFFFF',
  gold: '#C9A24B',
  blue: '#1458F2',
};

const DARK = {
  bg: '#07162C',
  surface: '#040D1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AAB8',
  border: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.04)',
  gold: '#C9A24B',
  blue: '#3B7BFF',
  // Purple accent from UI image
  purple: '#7C3AED',
  purpleLight: 'rgba(124, 58, 237, 0.1)',
  purpleBorder: 'rgba(124, 58, 237, 0.3)',
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

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className={`h-[2px] w-8 ${isDark ? 'bg-[#7C3AED]' : 'bg-[#1458F2]'}`} />
      <span
        className={`font-sans text-[12px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#7C3AED]' : 'text-[#1458F2]'}`}
      >
        {children}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                               */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex items-center pt-32 lg:pt-40 pb-20 lg:pb-28"
      style={{ background: '#07162C' }}
    >
      {/* Background Image - Replace with actual asset path */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-career.png"
          alt="Futuristic purple architectural structure representing innovation"
          fill
          priority
          unoptimized
          className="object-cover object-right opacity-90 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162C] via-[#07162C]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16">
        {/* Breadcrumbs */}
        <div className="mb-12 flex items-center gap-2 text-[13px] font-semibold text-white">
          <Link href="/" className="text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Careers</span>
        </div>

        <Reveal delay={0.1}>
          <h1 className="font-sans text-[48px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-8 max-w-[800px]">
            Build your future
            <br />
            with purpose.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[16px] sm:text-[16px] leading-[1.6] text-white/80 max-w-[600px] mb-10">
            At TRYVION, we believe in empowering people to create meaningful impact. Join a team
            that's driven by innovation, collaboration and a commitment to excellence.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Link
            href="#open-positions"
            className="inline-flex items-center justify-center gap-6 px-10 py-5 rounded-md font-bold text-[14px] transition-all hover:scale-[1.02] bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHY YOU'LL LOVE WORKING HERE                                               */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  {
    icon: Users,
    title: 'People First',
    desc: 'A culture built on respect, collaboration and inclusion.',
  },
  {
    icon: Lightbulb,
    title: 'Grow Together',
    desc: 'Continuous learning opportunities to accelerate your career.',
  },
  {
    icon: TrendingUp,
    title: 'Make an Impact',
    desc: 'Work on meaningful projects that shape industries and lives.',
  },
  {
    icon: Globe,
    title: 'Global Exposure',
    desc: 'Collaborate with experts and clients across the world.',
  },
  {
    icon: Heart,
    title: 'Well-being Matters',
    desc: 'We support your well-being and promote a healthy work-life balance.',
  },
];

function BenefitsSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 relative z-30" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div
          className={`rounded-xl border p-8 sm:p-10 mt-10 ${isDark ? 'bg-white/[0.03] border-white/10 backdrop-blur-sm' : 'bg-white border-[#E2E6EB] shadow-sm'}`}
        >
          <h2
            className={`text-center text-[28px] sm:text-[32px] font-extrabold mb-12 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
          >
            Why you'll love working here
          </h2>
          <br />
          <br />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Reveal
                  key={benefit.title}
                  delay={idx * 0.08}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`mb-6 p-4 rounded-full ${isDark ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-[#1458F2]/10 text-[#1458F2]'}`}
                  >
                    <Icon className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={`text-[18px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`text-[14px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {benefit.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OPEN POSITIONS & SIDEBAR                                                   */
/* -------------------------------------------------------------------------- */

const JOBS = [
  {
    title: 'Senior Software Engineer',
    dept: 'Technology',
    location: 'Bangalore, India',
    type: 'Full-time',
    icon: Layers,
  },
  {
    title: 'Business Development Manager',
    dept: 'Business Development',
    location: 'Mumbai, India',
    type: 'Full-time',
    icon: Briefcase,
  },
  {
    title: 'Solutions Architect',
    dept: 'Technology',
    location: 'Singapore',
    type: 'Full-time',
    icon: Layers,
  },
  {
    title: 'Marketing Specialist',
    dept: 'Marketing',
    location: 'Delhi, India',
    type: 'Full-time',
    icon: Megaphone,
  },
  {
    title: 'Operations Analyst',
    dept: 'Operations',
    location: 'Dubai, UAE',
    type: 'Full-time',
    icon: Clock,
  },
];

const JOIN_REASONS = [
  {
    title: 'Innovation at the core',
    desc: 'Be part of a forward-thinking team that embraces new ideas.',
    icon: Briefcase,
  },
  {
    title: 'Diverse & inclusive culture',
    desc: 'We value diverse perspectives and celebrate individuality.',
    icon: Users,
  },
  {
    title: 'Competitive benefits',
    desc: 'Enjoy comprehensive benefits and policies that support you.',
    icon: Heart,
  },
  {
    title: 'Career growth',
    desc: 'Clear career paths and mentorship to help you reach your goals.',
    icon: TrendingUp,
  },
];

function OpenPositionsSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section id="open-positions" className="py-28 lg:py-36" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT COLUMN - Job Listings */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <Eyebrow isDark={isDark}>OPEN POSITIONS</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className={`text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-4 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Find your next opportunity
              </h2>
              <p
                className={`text-[16px] leading-[1.6] mb-8 ${isDark ? 'text-gray-300' : 'text-[#000000]'}`}
              >
                Explore roles across departments and locations.
                <br />
                We're always looking for talented minds.
              </p>
            </Reveal>
            <br />

            {/* Search Bar */}
            <Reveal delay={0.2}>
              <div
                className={`flex flex-col sm:flex-row gap-4 mb-8 p-2 rounded-lg border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E6EB]'}`}
              >
                <div className="flex-1 flex items-center px-4">
                  <Search
                    className={`w-5 h-5 mr-3 ml-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  />
                  <input
                    type="text"
                    placeholder="Search by role, keyword or location"
                    className={`w-full py-3 bg-transparent outline-none ${isDark ? 'text-white placeholder-gray-500' : 'text-[#0B1E3D] placeholder-gray-400'}`}
                  />
                </div>
                <button
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-[14px] transition-colors ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#0B1E3D] text-white hover:bg-[#142b52]'}`}
                >
                  All Departments
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Reveal>
            <br />

            {/* Job List */}
            <div className="space-y-4">
              {JOBS.map((job, idx) => {
                const Icon = job.icon;
                return (
                  <Reveal key={job.title} delay={idx * 0.08}>
                    <div
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-lg border transition-all duration-300 cursor-pointer ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-[#7C3AED]/50 hover:bg-white/[0.06]' : 'bg-white border-[#E2E6EB] hover:border-[#1458F2]/50 hover:shadow-md'}`}
                    >
                      <div className="flex items-start sm:items-center gap-6 mb-4 sm:mb-0">
                        <div
                          className={`p-3 rounded-lg ${isDark ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-[#1458F2]/10 text-[#1458F2]'}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3
                            className={`text-[18px] font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                          >
                            {job.title}
                          </h3>
                          <p
                            className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
                          >
                            {job.dept}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div
                          className={`flex items-center gap-2 text-[14px] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                        >
                          <MapPin className="w-5 h-5" />
                          {job.location}
                        </div>
                        <div
                          className={`hidden sm:block text-[14px] font-medium ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                        >
                          {job.type}
                        </div>
                        <ArrowRight
                          className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isDark ? 'text-[#7C3AED]' : 'text-[#1458F2]'}`}
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.4}>
              <div className="pt-8 text-center">
                <Link
                  href="/careers/roles"
                  className={`inline-flex items-center justify-center gap-3 px-10 py-5 rounded-md font-bold text-[14px] transition-all border ${isDark ? 'border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white' : 'border-[#1458F2] text-[#1458F2] hover:bg-[#1458F2] hover:text-white'}`}
                >
                  View All Open Positions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.2}>
              <div
                className={`rounded-xl overflow-hidden border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-[#E2E6EB] shadow-sm'}`}
              >
                <div className="relative h-[240px] w-full">
                  <Image
                    src="/images/about-bold-ideas.png" // Replace with actual asset
                    alt="Modern TRYVION office interior"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07162C] to-transparent opacity-80" />
                </div>

                <div className="p-10 sm:p-10">
                  <h3
                    className={`text-[24px] font-extrabold mb-10 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    Why join TRYVION?
                  </h3>

                  <div className="space-y-6 mb-10">
                    {JOIN_REASONS.map((reason, idx) => {
                      const Icon = reason.icon;
                      return (
                        <div key={reason.title} className="flex items-start gap-6">
                          <div
                            className={`mt-1 p-2 rounded-lg shrink-0 ${isDark ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-[#1458F2]/10 text-[#1458F2]'}`}
                          >
                            <Icon className="w-10 h-10" />
                          </div>
                          <div>
                            <h4
                              className={`text-[16px] font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                            >
                              {reason.title}
                            </h4>
                            <p
                              className={`text-[14px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                            >
                              {reason.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/careers/life-at-tryvion"
                    className={`inline-flex items-center gap-2 text-[15px] font-bold transition-colors ${isDark ? 'text-[#7C3AED] hover:text-[#9333EA]' : 'text-[#1458F2] hover:text-[#0f46c9]'}`}
                  >
                    Life at TRYVION
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* DON'T SEE THE RIGHT ROLE?                                                  */
/* -------------------------------------------------------------------------- */

function SubmitResumeSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-10 lg:py-10" style={{ background: isDark ? '#07162C' : '#FFFFFF' }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div
          className="relative rounded-xl border overflow-hidden p-10 sm:p-12 lg:p-16 min-h-[400px] flex items-center"
          style={{
            backgroundColor: isDark ? '#0B1E3D' : '#F8FAFC',
            borderColor: isDark ? 'rgba(124, 58, 237, 0.3)' : 'rgba(20, 88, 242, 0.2)',
          }}
        >
          {/* Full Background Image */}
          <Image
            src="/images/cta-career.png" // Replace with your actual image path
            alt="Global network visualization"
            fill
            unoptimized
            className="object-cover z-0"
          />

          {/* Dark Overlay for Text Readability */}
          <div
            className={`absolute inset-0 z-10 ${isDark ? 'bg-[#0B1E3D]/10' : 'bg-[#0B1E3D]/10'}`}
          />

          {/* Content Container */}
          <div className="relative z-20 max-w-[600px] ">
            <Reveal>
              <div
                className={`mb-6 mt-6 ml-6 mr-6 p-6 rounded-full inline-block ${isDark ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-[#7C3AED]/20 text-[#7C3AED]'}`}
              >
                <Send className="w-6 h-6" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-[32px] sm:text-[36px] mb-6 mt-6 ml-6 mr-6 font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
                Don't see the right role?
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[16px] leading-[1.6] mb-6 mt-6 ml-6 mr-6 text-gray-300">
                We're always excited to connect with great talent. <br /> Share your profile with
                us.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 mb-6 mt-6 ml-6 mr-6 rounded-md font-bold text-[14px] transition-all border border-[#7C3AED] bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:border-[#6D28D9]"
              >
                Submit Your Resume
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER CTA                                                                 */
/* -------------------------------------------------------------------------- */

function FooterCTA({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="p-10 lg:p-10" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div
              className={`p-6 rounded-full ${isDark ? 'bg-white/5 text-white' : 'bg-[#0B1E3D]/5 text-[#0B1E3D]'}`}
            >
              <Mail className="w-10 h-10" />
            </div>
            <div>
              <p
                className={`text-[18px] font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Stay updated with our latest opportunities
              </p>
              <a
                href="mailto:vr@thetryvion.com"
                className={`text-[16px] transition-colors ${isDark ? 'text-[#7C3AED] hover:text-[#9333EA]' : 'text-[#1458F2] hover:text-[#0f46c9]'}`}
              >
                careers@thetryvion.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function CareersPage() {
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
      {/* Header and Footer are supplied exclusively by the shared SiteHeader/SiteFooter components */}
      <HeroSection isDark={isDark} />
      <BenefitsSection isDark={isDark} />
      <OpenPositionsSection isDark={isDark} />
      <SubmitResumeSection isDark={isDark} />
      <FooterCTA isDark={isDark} />
    </main>
  );
}
