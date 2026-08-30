'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Compass,
  Telescope,
  Send,
  Star,
  TrendingUp,
  Cpu,
  Users,
  CheckCircle2,
  Brain,
  ChevronsRight,
  Infinity as InfinityIcon,
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
  iconBg: '#FFFFFF',
  iconBorder: '#E2E6EB',
  badgeBg: '#0B1E3D',
  badgeText: '#C9A24B',
  ctaBg: '#07162C',
  ctaText: '#FFFFFF',
};

const DARK = {
  bg: '#07162C',
  surface: '#040D1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AAB8',
  border: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.06)',
  iconBg: 'rgba(255, 255, 255, 0.06)',
  iconBorder: 'rgba(255, 255, 255, 0.15)',
  badgeBg: 'rgba(255, 255, 255, 0.08)',
  badgeText: '#C9A24B',
  ctaBg: '#C9A24B',
  ctaText: '#07162C',
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
        className={`font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] ${isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}`}
      >
        {children}
      </span>
      <span
        className={`h-[1px] w-10 flex-shrink-0 ${isDark ? 'bg-[#C9A24B]/60' : 'bg-[#C9A24B]/60'}`}
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
      className={`relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-[#07162C] text-white'}`}
    >
      {/* Background Graphic - Always Dark Navy Base */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/what-we-believe.png"
          alt="Human silhouette looking at horizon choice"
          fill
          priority
          unoptimized
          className="object-cover object-center lg:object-right opacity-65 mix-blend-screen"
        />
        <div
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#040D1A]/95 via-[#040D1A]/60 to-transparent' : 'bg-gradient-to-r from-[#07162C]/90 via-[#07162C]/50 to-transparent'}`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 pt-8 pb-20 lg:pt-10 lg:pb-28 my-auto">
        {/* Breadcrumbs */}
        <div className="mb-8 lg:mb-12 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <span>&gt;</span>
          <span className="text-[#C9A24B]">What We Believe</span>
        </div>
        <br />

        {/* Hero Left Content */}
        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow isDark={isDark}>WHAT WE BELIEVE</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-sans text-[54px] sm:text-[72px] lg:text-[84px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              The Future
              <br />
              Is a Choice.
            </h1>
          </Reveal>
          <br />
          <Reveal delay={0.2}>
            <p className="mt-8 text-[17px] sm:text-[19px] font-normal leading-[1.6] text-white/95 max-w-[560px]">
              The organisations that shape tomorrow are those willing to make purposeful choices
              today. At TRYVION, we believe transformation begins with clarity, is guided by vision
              and creates momentum for what comes next.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PHILOSOPHY SECTION                                                         */
/* -------------------------------------------------------------------------- */

const PHILOSOPHY_STEPS = [
  {
    num: '01',
    icon: Compass,
    title: 'CHOICE',
    subtitle: 'The Decision',
    desc: 'Every transformation begins with the courage to choose a better path.',
  },
  {
    num: '02',
    icon: Telescope,
    title: 'VISION',
    subtitle: 'The Direction',
    desc: 'A clear vision turns ambition into opportunity and helps organisations see beyond today.',
  },
  {
    num: '03',
    icon: Send,
    title: 'MOMENTUM',
    subtitle: 'The Progress',
    desc: 'Vision becomes valuable when it moves. We turn decisions into action and sustained progress.',
  },
  {
    num: '04',
    icon: Star,
    title: 'FUTURE',
    subtitle: 'The Creation',
    desc: 'Transformation is not a destination. It is the continuous evolution of people, technology and the enterprise.',
  },
];

function PhilosophySection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className={`py-28 lg:py-36 transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'}`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR PHILOSOPHY</Eyebrow>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.05] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              Transformation follows a simple truth.
            </h2>
          </Reveal>
          <br />
        </div>

        <div className="mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {PHILOSOPHY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                <Reveal
                  delay={idx * 0.1}
                  className="flex flex-col items-center text-center group relative z-10"
                >
                  <span className="text-[14px] font-bold text-[#C9A24B] tracking-wider mb-4">
                    {step.num}
                  </span>
                  <div
                    className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full border shadow-sm transition-all duration-300 group-hover:border-[#C9A24B] group-hover:shadow-md mb-6 backdrop-blur-md`}
                    style={{ borderColor: t.iconBorder, backgroundColor: t.iconBg }}
                  >
                    <Icon
                      className={`h-7 w-7 transition-transform duration-300 group-hover:scale-110 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                    />
                  </div>
                  <h3
                    className={`text-[18px] font-extrabold tracking-wide uppercase ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {step.title}
                  </h3>
                  <span
                    className={`text-[13px] font-semibold mt-1 mb-3 ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {step.subtitle}
                  </span>
                  <p
                    className={`text-[14px] leading-[1.65] max-w-[250px] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {step.desc}
                  </p>
                </Reveal>
                {idx < PHILOSOPHY_STEPS.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-[74px] transform -translate-y-1/2 items-center justify-center z-0"
                    style={{ left: `calc(${(idx + 1) * 25}% - 26px)` }}
                  >
                    <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
                      <path
                        d="M0 8H44M44 8L37 1M44 8L37 15"
                        stroke="#C9A24B"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHAT THIS MEANS FOR US                                                     */
/* -------------------------------------------------------------------------- */

const MEANING_CARDS = [
  {
    title: 'Strategy',
    desc: 'Define the right direction and outcomes.',
    icon: TrendingUp,
    img: '/images/strategy-what-we-believe.png',
  },
  {
    title: 'Technology',
    desc: 'Enable new ways of working and innovating.',
    icon: Cpu,
    img: '/images/technology-what-we-believe.png',
  },
  {
    title: 'People',
    desc: 'Bring the expertise, mindset and leadership to make change real.',
    icon: Users,
    img: '/images/people-what-we-believe.jpg',
  },
];

function WhatThisMeansSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className={`py-28 lg:py-36 transition-colors duration-500 ${isDark ? 'bg-[#040D1A] text-white' : 'bg-[#F4F6F9] text-[#0B1E3D]'}`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 pr-0 lg:pr-4">
            <Reveal>
              <Eyebrow isDark={isDark}>WHAT THIS MEANS FOR US</Eyebrow>
            </Reveal>
            <br />
            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Technology creates possibility. People create progress.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                className={`mt-6 text-[15px] sm:text-[16px] leading-[1.75] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                We believe the greatest transformation happens when strategy, technology and people
                move together—creating organisations that can adapt, innovate and continuously
                evolve.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MEANING_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={idx * 0.1} className="h-full">
                  <div
                    className={`rounded-[4px] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow backdrop-blur-md border`}
                    style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                  >
                    <div className="relative h-[140px] sm:h-[150px] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <Icon className="h-6 w-6 text-[#C9A24B] mb-3" />
                      <h3
                        className={`text-[18px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`mt-2 text-[13px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
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
/* OUR BELIEF IN ACTION                                                       */
/* -------------------------------------------------------------------------- */

const BELIEF_ACTION_ITEMS = [
  {
    icon: CheckCircle2,
    title: 'Choose with clarity.',
    desc: 'Understand what matters and make decisions with purpose.',
  },
  {
    icon: Brain,
    title: 'Transform with intelligence.',
    desc: 'Bring together human expertise, technology and data to create better outcomes.',
  },
  {
    icon: ChevronsRight,
    title: 'Move with confidence.',
    desc: 'Turn vision into measurable progress.',
  },
  {
    icon: InfinityIcon,
    title: 'Keep evolving.',
    desc: 'Build the capability to adapt as the world changes.',
  },
];

function BeliefInActionSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className={`py-28 lg:py-36 transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'}`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-20">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR BELIEF IN ACTION</Eyebrow>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.05] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              What we stand for, every day.
            </h2>
          </Reveal>
        </div>
        <br />

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x ${isDark ? 'divide-white/10' : 'divide-[#E2E6EB]'}`}
        >
          {BELIEF_ACTION_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={idx * 0.1}
                className="pt-8 pb-8 lg:py-0 px-4 sm:px-6 flex flex-col items-center text-center"
              >
                <div
                  className="mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-sm backdrop-blur-md border"
                  style={{
                    backgroundColor: t.badgeBg,
                    borderColor: t.iconBorder,
                    color: t.badgeText,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3
                  className={`text-[20px] font-bold leading-[1.25] mb-3 max-w-[220px] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-[14px] leading-[1.65] max-w-[240px] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                >
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PURPOSE + PROMISE                                                          */
/* -------------------------------------------------------------------------- */

function PurposePromiseSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
      {/* Left: Our Purpose */}
      <div
        className={`relative py-24 px-8 sm:px-14 lg:py-28 lg:px-20 flex flex-col justify-center overflow-hidden border-r transition-colors duration-500 ${
          isDark
            ? 'bg-[#040D1A] text-white border-white/10'
            : 'bg-[#07162C] text-white border-white/10'
        }`}
      >
        {/* Full-panel background image */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/planetary-wave.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Optional dark overlay for text readability */}
        <div
          className={`absolute inset-0 z-[1] pointer-events-none ${
            isDark ? 'bg-[#040D1A]/20' : 'bg-[#07162C]/10'
          }`}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[650px]">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR PURPOSE</Eyebrow>
          </Reveal>

          <br />

          <Reveal delay={0.1}>
            <h2 className="font-sans text-[36px] sm:text-[44px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Empower organisations to choose, create and continuously shape their future.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Right: Our Promise */}
      <div
        className={`relative py-24 px-8 sm:px-14 lg:py-28 lg:px-20 flex flex-col justify-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B1E3D] text-white' : 'bg-[#F4F6F9] text-[#0B1E3D]'}`}
      >
        <div
          className="absolute right-[-10px] top-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ color: isDark ? 'rgba(201,162,75,0.1)' : 'rgba(201,162,75,0.1)' }}
        >
          <svg width="240" height="300" viewBox="0 0 100 120" fill="currentColor">
            <path d="M20 0 L60 60 L20 120 L40 120 L80 60 L40 0 Z" />
            <path d="M50 0 L90 60 L50 120 L70 120 L110 60 L70 0 Z" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[500px]">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR PROMISE</Eyebrow>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[36px] sm:text-[44px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              Turning Vision
              <br />
              into Momentum.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className={`mt-6 text-[16px] sm:text-[17px] leading-[1.7] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              We help organisations move beyond uncertainty, <br />
              make the choices that matter, and create lasting business value.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* THE MANIFESTO                                                              */
/* -------------------------------------------------------------------------- */

function ManifestoSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className={`relative overflow-hidden py-32 lg:py-44 flex items-center min-h-[540px] transition-colors duration-500 ${isDark ? 'bg-[#040D1A] text-white' : 'bg-[#07162C] text-white'}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/manifesto-what-we-deliver.png"
          alt="Figure standing in doorway toward horizon"
          fill
          unoptimized
          className={`object-cover object-right ${isDark ? 'opacity-40' : 'opacity-60'}`}
        />
        <div
          className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#040D1A] via-[#040D1A]/5 to-transparent' : 'bg-gradient-to-r from-[#07162C] via-[#07162C]/5 to-transparent'}`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow isDark={isDark}>THE MANIFESTO</Eyebrow>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2 className="font-sans text-[42px] sm:text-[58px] lg:text-[68px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white">
              The future does not happen to those who wait.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans text-[42px] sm:text-[58px] lg:text-[68px] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#C9A24B] mt-2">
              It belongs to those <br />
              who choose it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTASection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className={`py-24 lg:py-32 border-t transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white border-white/10' : 'bg-white text-[#0B1E3D] border-[#E2E6EB]'}`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-12 lg:p-14 rounded-[4px] backdrop-blur-md border"
          style={{ backgroundColor: t.cardBg, borderColor: t.border }}
        >
          <div className="flex items-center gap-6 max-w-[720px]">
            <div
              className="hidden sm:flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border shadow-sm"
              style={{
                borderColor: '#C9A24B',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#FFFFFF',
                color: '#C9A24B',
              }}
            >
              <Compass className="h-7 w-7" />
            </div>
            <div>
              <h3
                className={`font-sans text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.2] tracking-[-0.025em] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                The next transformation begins with a choice. Let's shape what <br />
                comes next together.
              </h3>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/contact"
              className="group inline-flex h-[56px] min-w-[200px] w-full md:w-auto items-center justify-center gap-3 px-8 text-[14px] font-bold tracking-wide transition-all"
              style={{ backgroundColor: t.ctaBg, color: t.ctaText }}
            >
              <span>Talk to an Expert</span>
              <ArrowRight
                className="h-6 w-6 transition-transform group-hover:translate-x-1"
                style={{ color: isDark ? '#07162C' : '#C9A24B' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE EXPORT                                                           */
/* -------------------------------------------------------------------------- */

export default function WhatWeBelievePage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  // Apply dark class to document element for global Tailwind dark mode support
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main
      className={`min-h-screen font-sans antialiased transition-colors duration-500 ${isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'}`}
    >
      {/* Header and Footer are supplied exclusively by the shared SiteHeader/SiteFooter components */}
      <HeroSection isDark={isDark} />
      <PhilosophySection isDark={isDark} />
      <WhatThisMeansSection isDark={isDark} />
      <BeliefInActionSection isDark={isDark} />
      <PurposePromiseSection isDark={isDark} />
      <ManifestoSection isDark={isDark} />
      <FinalCTASection isDark={isDark} />
    </main>
  );
}
