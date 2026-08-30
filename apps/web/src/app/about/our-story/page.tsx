'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Layers,
  Sparkles,
  Users,
  GraduationCap,
  RefreshCw,
  BarChart3,
  Cloud,
  FlaskConical,
  Navigation,
  GitBranch,
  Rocket,
  TrendingUp,
  Infinity as InfinityIcon,
  Target,
  Network,
  BrainCircuit,
  Repeat,
  Compass,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/* DESIGN TOKENS & THEME COLORS                                               */
/* -------------------------------------------------------------------------- */

const LIGHT = {
  bg: '#FFFFFF',
  surface: '#F4F6F9',
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
  cardBg: 'rgba(255, 255, 255, 0.06)',
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
/* HERO SECTION - PERMANENT HEADER COLLISION FIX                              */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-between transition-colors duration-500"
      // Dynamic padding-top ensures content never overlaps with sticky header
      // Assumes header height is ~120px (utility + main nav). Adjust if needed.
      style={{
        background: '#07162C',
        paddingTop: 'calc(var(--header-height, 120px) + 2rem)',
      }}
    >
      {/* Background Graphic - Cosmic Earth/Horizon */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/futuristic-golden-emblem-atrium.png"
          alt="Earth horizon with golden light representing future vision"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-65 mix-blend-screen"
        />
        <div
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#040D1A]/95 via-[#040D1A]/60 to-transparent' : 'bg-gradient-to-r from-[#07162C]/90 via-[#07162C]/50 to-transparent'}`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 pb-20 lg:pb-28 my-auto">
        {/* Breadcrumbs - Proper Spacing from Header */}
        <div className="mb-12 lg:mb-16 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <span>&gt;</span>
          <span className="text-[#C9A24B]">Our Story</span>
        </div>
        <br />

        {/* Hero Left Content */}
        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR STORY</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-sans text-[54px] sm:text-[72px] lg:text-[84px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              Built for what
              <br />
              comes next.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 text-[14px] sm:text-[16px] font-normal leading-[1.6] text-white/95 max-w-[560px]">
              TRYVION was created around a simple conviction: organisations should not simply adapt
              to change. They should have the capability to shape it. We bring together technology,
              intelligence and people to help organisations make better decisions, transform with
              confidence and continuously evolve.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4]"
            >
              Talk to an Expert
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
            <Link
              href="/capabilities"
              className="inline-flex min-h-[50px] items-center justify-center border border-white/30 px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10"
            >
              Explore Our Capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHY TRYVION SECTION                                                        */
/* -------------------------------------------------------------------------- */

function WhyTryvionSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 pr-0 lg:pr-4 order-2 lg:order-1">
            <Reveal>
              <div className="flex items-center gap-4 mb-2">
                <span
                  className={`font-mono text-[14px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                >
                  01
                </span>
                <Eyebrow isDark={isDark}>WHY TRYVION</Eyebrow>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Transformation was becoming more connected. So were we.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className={`mt-6 text-[15px] sm:text-[16px] leading-[1.75] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                Cloud, AI and digital technologies are reshaping how organisations operate and
                compete. Yet transformation often happens in silos—separated by systems, teams and
                decisions.
              </p>
              <p
                className={`mt-4 text-[15px] sm:text-[16px] leading-[1.75] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                TRYVION exists to connect those pieces.
              </p>
              <p
                className={`mt-4 text-[15px] sm:text-[16px] leading-[1.75] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                We help organisations move from isolated initiatives to connected
                transformation—bringing strategy, technology and human capability together around
                the outcomes that matter.
              </p>
            </Reveal>
          </div>

          {/* Right Image - RESIZED TO 718x430 ASPECT RATIO */}
          <Reveal delay={0.3} className="lg:col-span-7 order-1 lg:order-2">
            <div
              className="relative w-full overflow-hidden rounded-lg shadow-lg"
              style={{ backgroundColor: isDark ? '#1A1F2E' : '#F0F2F5', aspectRatio: '718 / 430' }}
            >
              <Image
                src="/images/tryvion-connect.png"
                alt="Architectural spiral staircase representing connected transformation"
                fill
                unoptimized
              />
              <div
                className={`absolute inset-0 ${isDark ? 'bg-[#0B1E3D]/10' : 'bg-[#0B1E3D]/8'}`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OUR ECOSYSTEM SECTION                                                      */
/* -------------------------------------------------------------------------- */

const ECOSYSTEM_CARDS = [
  {
    title: 'Applications',
    desc: 'Modernise the enterprise with intelligent applications and SAP capabilities.',
    icon: Layers,
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Turn intelligence into action with AI strategy, platforms, automation and agents.',
    icon: Sparkles,
  },
  {
    title: 'Talent',
    desc: 'Build the capabilities transformation demands with specialised talent.',
    icon: Users,
  },
  {
    title: 'Academy',
    desc: 'Develop future-ready skills through learning, mentoring, certification and practice.',
    icon: GraduationCap,
  },
  {
    title: 'Operate',
    desc: 'Stabilise, optimise and automate operations to continuously improve.',
    icon: RefreshCw,
  },
  {
    title: 'Data & Analytics',
    desc: 'Build trusted data foundations and turn insights into better business decisions.',
    icon: BarChart3,
  },
  {
    title: 'Cloud',
    desc: 'Create secure, scalable and adaptable cloud foundations for modern enterprise.',
    icon: Cloud,
  },
  {
    title: 'Labs',
    desc: 'Develop accelerators and innovations that turn emerging technology into value.',
    icon: FlaskConical,
  },
];

function EcosystemSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section
      className="py-28 lg:py-36 transition-colors duration-500"
      style={{ background: t.surface }}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <span
                className={`font-mono text-[14px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
              >
                02
              </span>
              <Eyebrow isDark={isDark}>OUR ECOSYSTEM</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              One ecosystem. Infinite possibilities.
            </h2>
          </Reveal>
          <br />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ECOSYSTEM_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={idx * 0.06} className="h-full">
                <div
                  className={`rounded-[4px] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow backdrop-blur-md border p-6`}
                  style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                >
                  <div
                    className="mb-6 flex h-40 w-40 items-center justify-center rounded-full"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F4F6F9' }}
                  >
                    <Icon
                      className={`w-40 h-40 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3
                    className={`text-[18px] font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-[13px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {card.desc}
                  </p>
                  <ArrowRight
                    className={`mt-auto pt-6 w-5 h-5 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
        <br />
        <Reveal delay={0.4}>
          <p
            className={`text-center text-base sm:text-lg italic ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
          >
            These capabilities work together to help organisations choose with clarity, transform
            with confidence and keep moving forward.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHAT CONNECTS IT ALL SECTION - CLEAN CARD LAYOUT                           */
/* -------------------------------------------------------------------------- */

const CONNECTION_STEPS = [
  { title: 'Understand', desc: "See what's possible and what matters.", icon: Navigation },
  { title: 'Choose', desc: 'Make intelligent choices with confidence.', icon: GitBranch },
  {
    title: 'Transform',
    desc: 'Turn strategy into action and drive meaningful change.',
    icon: Rocket,
  },
  {
    title: 'Improve',
    desc: 'Optimise, automate and unlock new levels of value.',
    icon: TrendingUp,
  },
  {
    title: 'Evolve',
    desc: 'Build the capability to constantly adapt and lead.',
    icon: InfinityIcon,
  },
];

function ConnectsItAllSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      {/* STANDARDIZED CONTAINER MATCHING SECTION 02 */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Text - Aligned Top */}
          <div className="space-y-8 pt-2">
            <Reveal>
              <div className="flex items-center gap-4 mb-2">
                <span
                  className={`font-mono text-[14px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                >
                  03
                </span>
                <Eyebrow isDark={isDark}>WHAT CONNECTS IT ALL</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Technology. People.
                <br />
                Knowledge. Outcomes.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                className={`space-y-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                <p>Technology creates possibility.</p>
                <p>People create progress.</p>
                <p>Knowledge creates capability.</p>
                <p>Connected execution creates momentum.</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}>
                  That's the TRYVION way.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/how-we-work"
                className={`inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] group ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
              >
                See how we work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Right Flow Diagram - Clean Vertical Cards */}
          <div className="flex flex-col gap-6 w-full">
            {CONNECTION_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                  whileHover={{
                    y: -4,
                    borderColor: isDark ? '#C9A24B' : '#1458F2',
                    boxShadow: isDark
                      ? '0 10px 30px rgba(201,162,75,0.1)'
                      : '0 10px 30px rgba(20,88,242,0.08)',
                  }}
                  // EXACTLY 20px LEFT PADDING AS REQUESTED
                  className={`relative flex items-center pl-[20px] pr-20 py-20 rounded-lg border backdrop-blur-sm cursor-default transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white border-[#E2E6EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {/* Icon - NO CIRCLE BACKGROUND, 40px SIZE */}
                  <div className="shrink-0 mr-6 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Icon
                        className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-[18px] font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-[13px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Subtle Arrow Indicator on Hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex shrink-0 ml-4"
                  >
                    <ArrowRight
                      className={`w-5 h-5 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OUR DIFFERENCE SECTION                                                     */
/* -------------------------------------------------------------------------- */

const DIFFERENCES = [
  { title: 'Business-first', desc: 'We start with the outcome, not the technology.', icon: Target },
  {
    title: 'Connected',
    desc: 'We bring technology, data, people and operations together.',
    icon: Network,
  },
  {
    title: 'Intelligent',
    desc: 'We turn technology and human expertise into better decisions.',
    icon: BrainCircuit,
  },
  {
    title: 'Continuous',
    desc: 'We build organisations capable of evolving beyond one project.',
    icon: Repeat,
  },
];

function DifferenceSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-28 lg:py-36" style={{ background: isDark ? '#040D1A' : '#0B1E3D' }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-4 space-y-8">
            <Reveal>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-[14px] font-bold text-[#C9A24B]">04</span>
                <Eyebrow isDark={isDark}>OUR DIFFERENCE</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
                We do more than implement.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                We start with the business outcome, bring the right capabilities together and stay
                committed to the results that matter.
              </p>
            </Reveal>
          </div>
          {/* Right Grid - Animated Cards */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENCES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={idx * 0.08}>
                    <motion.div
                      className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm cursor-default"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        borderColor: 'rgba(201,162,75,0.4)',
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        <Icon className="w-10 h-10 text-[#C9A24B] mb-6" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHERE WE ARE GOING SECTION                                                 */
/* -------------------------------------------------------------------------- */

function WhereWeAreGoingSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Image */}
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/choosing-the-connected-future.png"
                alt="Winding road through mountains representing continuous evolution"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </Reveal>
          {/* Right Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <Reveal>
              <div className="flex items-center gap-4 mb-2">
                <span
                  className={`font-mono text-[14px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                >
                  05
                </span>
                <Eyebrow isDark={isDark}>WHERE WE ARE GOING</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Building the capability to continuously evolve.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                className={`space-y-6 text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                <p>
                  The next era of transformation will be defined by how organisations combine human
                  capability, intelligent technology and continuous learning.
                </p>
                <p>
                  Our ambition is to build one of the world's most trusted ecosystems for
                  transformation—creating meaningful impact for organisations, professionals and the
                  communities we serve.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* BOTTOM CTA BAR                                                             */
/* -------------------------------------------------------------------------- */

function BottomCTA({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="py-16 lg:py-20 border-t"
      style={{
        background: '#0B1E3D',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1280px] pl-[20px] py-20 px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Custom Icon Image Container */}
            <div
              className={`w-40 h-40 rounded-full border flex items-center justify-center flex-shrink-0 overflow-hidden ${isDark ? 'border-[#C9A24B]/30 bg-[#C9A24B]/10' : 'border-white/20 bg-white/10'}`}
            >
              <Image
                src="/images/social_media_avatar.png"
                alt="TRYVION Icon"
                width={40}
                height={40}
                className="cover object-center"
              />
            </div>
            <div>
              <h3 className={`text-2xl sm:text-3xl font-extrabold leading-tight text-white`}>
                The next transformation starts here.
              </h3>
              <p className={`mt-2 text-base sm:text-lg text-gray-300`}>
                Let's explore what's possible—together.
              </p>
            </div>
          </div>

          {/* Primary Action Button */}
          <Link
            href="/contact"
            className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4]"
          >
            Talk to an Expert
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

export default function OurStoryPage() {
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
      className={`min-h-screen antialiased transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'}`}
    >
      {/* Header and Footer are supplied exclusively by the shared SiteHeader/SiteFooter components */}
      <HeroSection isDark={isDark} />
      <WhyTryvionSection isDark={isDark} />
      <EcosystemSection isDark={isDark} />
      <ConnectsItAllSection isDark={isDark} />
      <DifferenceSection isDark={isDark} />
      <WhereWeAreGoingSection isDark={isDark} />
      <BottomCTA isDark={isDark} />
    </main>
  );
}
