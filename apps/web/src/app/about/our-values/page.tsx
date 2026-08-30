'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Eye,
  BrainCircuit,
  Award,
  Handshake,
  Lightbulb,
  RefreshCw,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';
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
  // Glassmorphic Surface for Dark Mode
  cardBg: 'rgba(255, 255, 255, 0.04)',
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

function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * staggerDelay, ease: [0.16, 1, 0.3, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className={`font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] ${
          isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
        }`}
      >
        {children}
      </span>
      <span
        className={`h-[1px] w-10 flex-shrink-0 ${isDark ? 'bg-[#C9A24B]/60' : 'bg-[#1458F2]/60'}`}
        aria-hidden="true"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                               */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-between transition-colors duration-500 pt-32 lg:pt-40"
      style={{ background: '#07162C' }}
    >
      {/* Background Graphic - Open Source Hero Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-our-values-digital-waveform.png" // Replace with your open source hero image path
          alt="Abstract representation of values and vision"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-65 mix-blend-screen"
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-[#040D1A]/95 via-[#040D1A]/20 to-transparent'
              : 'bg-gradient-to-r from-[#07162C]/90 via-[#07162C]/20 to-transparent'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 pb-20 lg:pb-28 my-auto">
        {/* Breadcrumbs */}
        <div className="mb-12 lg:mb-16 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <span>&gt;</span>
          <span className="text-[#C9A24B]">Our Values</span>
        </div>

        {/* Hero Content */}
        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR VALUES</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-sans text-[54px] sm:text-[72px] lg:text-[84px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              How we choose
              <br />
              to work.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[17px] sm:text-[19px] font-normal leading-[1.6] text-white/95 max-w-[560px]">
              Our values shape how we think, collaborate, innovate and deliver. They guide the
              choices we make, the relationships we build, and the transformation we create.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHAT GUIDES US SECTION                                                     */
/* -------------------------------------------------------------------------- */

function WhatGuidesUsSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <Eyebrow isDark={isDark}>WHAT GUIDES US</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${
                  isDark ? 'text-white' : 'text-[#0B1E3D]'
                }`}
              >
                Values that turn belief into action.
              </h2>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.2}>
              <p
                className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                The future is a choice. At TRYVION, our values define how we make that choice — with
                courage to move beyond the familiar, vision to see what comes next, intelligence to
                make better decisions, and purpose to create lasting value.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* THE TRYVION VALUES GRID                                                    */
/* -------------------------------------------------------------------------- */

const VALUES_DATA = [
  {
    num: '01',
    title: 'Courage',
    desc: 'Every meaningful transformation begins with the courage to challenge the familiar and choose what comes next.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Vision',
    desc: "We look beyond today's challenges to identify possibilities, shape direction and prepare organisations for tomorrow.",
    icon: Eye,
  },
  {
    num: '03',
    title: 'Intelligence',
    desc: 'We combine human expertise, data and intelligent technologies to turn complexity into clarity and insight into action.',
    icon: BrainCircuit,
  },
  {
    num: '04',
    title: 'Excellence',
    desc: 'We pursue excellence in thinking, execution and outcomes, with precision, accountability and an uncompromising focus on value.',
    icon: Award,
  },
  {
    num: '05',
    title: 'Trust',
    desc: 'We act with integrity, transparency and accountability, earning trust through what we say, what we do and how consistently we deliver.',
    icon: Handshake,
  },
  {
    num: '06',
    title: 'Innovation',
    desc: 'We question established ways of working and continuously explore better ways to simplify, transform and create meaningful impact.',
    icon: Lightbulb,
  },
  {
    num: '07',
    title: 'Adaptability',
    desc: 'Evolve with confidence. Change is constant. We embrace it as an opportunity to learn, adapt and help organisations move forward with confidence.',
    icon: RefreshCw,
  },
  {
    num: '08',
    title: 'Collaboration',
    desc: 'Work as one. The strongest transformation happens when people, technology and ideas come together around a shared ambition.',
    icon: Users,
  },
  {
    num: '09',
    title: 'Purpose',
    desc: 'Create meaningful value. We make decisions with purpose — focused on creating lasting value for our clients, our people and the future we help shape.',
    icon: Target,
  },
  {
    num: '10',
    title: 'Continuous Evolution',
    desc: 'Never stop improving. Transformation does not end at implementation. We learn, improve and evolve so progress continues long after the initial change.',
    icon: TrendingUp,
  },
];

function TryvionValuesGrid({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-28 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? '#040D1A' : '#F8FAFC' }}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="max-w-[600px] mb-16">
          <Reveal>
            <Eyebrow isDark={isDark}>THE TRYVION VALUES</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${
                isDark ? 'text-white' : 'text-[#0B1E3D]'
              }`}
            >
              What we stand for.
            </h2>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {VALUES_DATA.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.num}
                className={`relative p-8 rounded-xl border backdrop-blur-md flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-[#C9A24B]/30'
                    : 'bg-white border-[#E2E6EB] hover:shadow-lg hover:border-[#1458F2]/30'
                }`}
              >
                {/* Large Number Background */}
                <span
                  className={`absolute top-4 right-6 text-[60px] font-extrabold leading-none select-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity ${
                    isDark ? 'text-white' : 'text-[#0B1E3D]'
                  }`}
                >
                  {value.num}
                </span>

                <div className="mb-6">
                  <Icon
                    className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                >
                  {value.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-[#5F6875]'
                  }`}
                >
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* VALUES IN ACTION SECTION                                                   */
/* -------------------------------------------------------------------------- */

const ACTION_ITEMS = [
  {
    title: 'WITH OUR CLIENTS',
    desc: 'We partner with organizations to solve complex challenges and drive growth. We listen, understand, and tailor our approach to deliver outcomes that matter.',
  },
  {
    title: 'WITH OUR PEOPLE',
    desc: 'We foster an environment where talent thrives. We empower our teams to learn, grow, and lead, knowing that our collective success is built on individual excellence.',
  },
  {
    title: 'WITH OUR PARTNERS',
    desc: 'We build alliances based on mutual trust and shared goals. Together, we leverage diverse expertise to create more comprehensive and effective solutions.',
  },
  {
    title: 'IN TRANSFORMATION',
    desc: 'We navigate change with agility and insight. We turn disruption into opportunity, guiding organizations through the complexities of evolving landscapes.',
  },
];

function ValuesInActionSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <Eyebrow isDark={isDark}>VALUES IN ACTION</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${
                  isDark ? 'text-white' : 'text-[#0B1E3D]'
                }`}
              >
                Values are only meaningful when they show up in what we do.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                className={`text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-[#5F6875]'
                }`}
              >
                Our values shape the way we work — from the decisions we make to the partnerships we
                build and the outcomes we deliver.
              </p>
            </Reveal>
          </div>

          {/* Right Column Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {ACTION_ITEMS.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.1}>
                <h3
                  className={`text-xs font-bold uppercase tracking-[0.14em] mb-3 ${
                    isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-[#5F6875]'
                  }`}
                >
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* THE MANIFESTO - DARK BACKGROUND ALWAYS                                     */
/* -------------------------------------------------------------------------- */

function ManifestoSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="py-28 lg:py-36 relative overflow-hidden transition-colors duration-500"
      style={{ background: '#07162C' }} // Always dark navy
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16 text-center">
        <Reveal>
          <h2 className="font-sans text-[48px] sm:text-[64px] lg:text-[80px] font-extrabold leading-[0.95] tracking-[-0.04em] text-white mb-6">
            THE FUTURE IS A<br />
            CHOICE.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-tight text-white/40 mb-12">
            We choose to shape it.
          </p>
        </Reveal>

        {/* Values List */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-16 max-w-4xl mx-auto">
            {[
              'COURAGE',
              'VISION',
              'INTELLIGENCE',
              'EXCELLENCE',
              'TRUST',
              'INNOVATION',
              'ADAPTABILITY',
              'COLLABORATION',
              'PURPOSE',
              'CONTINUOUS EVOLUTION',
            ].map((val, i) => (
              <span key={i} className="text-[11px] font-bold tracking-[0.14em] text-white/50">
                {val}
                {i < 9 && <span className="ml-6 text-[#C9A24B]/30">•</span>}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-[20px] sm:text-[24px] font-bold text-[#1458F2] mb-10">
            Turning Vision into Momentum.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA - THEME AWARE BACKGROUND                                         */
/* -------------------------------------------------------------------------- */

function FinalCTASection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-28 lg:py-36 border-t transition-colors duration-500"
      style={{
        background: t.bg,
        borderColor: t.border,
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16 text-center">
        <Reveal>
          <h3
            className="font-sans text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-6"
            style={{ color: t.textPrimary }}
          >
            Ready to shape what's next?
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="text-base sm:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: t.textSecondary }}
          >
            Let's turn ambition into action, and vision into momentum.
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4] rounded-sm"
          >
            Talk to an Expert
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[50px] items-center justify-center border px-8 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors rounded-sm"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : t.border,
              color: t.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : t.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Explore TRYVION
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function OurValuesPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // Sync dark class to document element for global Tailwind dark mode support
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main
      className={`min-h-screen antialiased transition-colors duration-500 ${
        isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'
      }`}
    >
      {/* Header and Footer are supplied exclusively by the shared SiteHeader/SiteFooter components */}
      <HeroSection isDark={isDark} />
      <WhatGuidesUsSection isDark={isDark} />
      <TryvionValuesGrid isDark={isDark} />
      <ValuesInActionSection isDark={isDark} />
      <ManifestoSection isDark={isDark} />
      <FinalCTASection isDark={isDark} />
    </main>
  );
}
