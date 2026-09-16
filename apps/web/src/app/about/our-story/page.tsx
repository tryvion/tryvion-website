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
  Navigation,
  Rocket,
  Infinity as InfinityIcon,
  Target,
  Compass,
  CheckCircle,
  ShieldCheck,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  Mountain,
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
/* HERO SECTION                                                               */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-between transition-colors duration-500"
      style={{
        background: '#07162C',
        paddingTop: 'calc(var(--header-height, 120px) + 2rem)',
      }}
    >
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

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 pb-20 lg:pb-28 my-auto p-6">
        <div className="mb-12 lg:mb-16 flex items-center gap-2 text-[13px] font-semibold text-white">
          <Link href="/" className="text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/about" className="text-white transition-colors">
            About Us
          </Link>
          <span>&gt;</span>
          <span className="text-white">Our Story</span>
        </div>
        <br />

        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR STORY</Eyebrow>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h1 className="font-sans text-[54px] sm:text-[72px] lg:text-[84px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              Built for what
              <br />
              comes next.
            </h1>
          </Reveal>
          <div className="" style={{ opacity: 1, transform: 'none' }}>
            <p className="mt-8 text-[14px] sm:text-[16px] font-normal leading-[1.6] text-white/95 max-w-[560px]">
              The world of business is changing faster than organizations can adapt. TRYVION helps
              enterprises transform technology, enable people and build the capability to
              continuously evolve.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4]"
            >
              Talk to an Expert
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
            <Link
              href="/services"
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
/* SECTION 1: OUR STORY (60% CONTENT / 40% IMAGE - EQUAL COLUMN HEIGHT)        */
/* -------------------------------------------------------------------------- */

function OurStoryIntroSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500"
      style={{ background: t.bg }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] items-stretch gap-12 lg:gap-16">
          {/* Content Column (60%) */}
          <div className="flex flex-col justify-center pr-0 lg:pr-6 order-2 lg:order-1">
            <Reveal>
              <div className="flex items-center gap-6 mb-2 mt-2">
                <span
                  className={`font-mono text-[16px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                >
                  01 OUR FOUNDING BELIEF
                </span>
              </div>
            </Reveal>
            <br />

            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Every generation witnesses a shift that redefines how businesses operate.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                className={`mt-6 space-y-5 text-[16px] sm:text-[17px] leading-[1.8] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                <p>
                  Today, that shift is being driven by Cloud, Artificial Intelligence, Automation,
                  and Software-as-a-Service (SaaS). Organizations across the world are reimagining
                  how they engage employees, serve customers, manage operations, and make decisions.
                  Yet many continue to struggle with fragmented processes, complex technology
                  landscapes, and an ever-growing shortage of skilled digital talent.
                </p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}>
                  TRYVION was founded to solve this challenge.
                </p>
                <p>
                  We believe successful transformation is never just about implementing technology.
                  It is about bringing together business strategy, standardized processes,
                  intelligent platforms, innovation, and people to create sustainable business
                  value.
                </p>
                <p>
                  Our focus is to help organizations embrace modern enterprise solutions that
                  simplify operations, accelerate innovation, and build resilient digital
                  businesses. From human capital management and finance to procurement, supply
                  chain, manufacturing, customer experience, retail, professional services, and tax,
                  we enable enterprises to transform end-to-end business processes through
                  intelligent cloud solutions and AI-powered innovation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Image Column (40%) - Equal Height matching Content Column via flex/grid stretch */}
          <Reveal delay={0.3} className="order-1 lg:order-2 flex flex-col">
            <div
              className="relative w-full h-full min-h-[380px] lg:min-h-full overflow-hidden rounded-xl shadow-lg"
              style={{ backgroundColor: isDark ? '#1A1F2E' : '#F0F2F5' }}
            >
              <Image
                src="/images/tryvion-connect.png"
                alt="Architectural spiral staircase representing connected transformation"
                fill
                unoptimized
                className="object-cover object-center"
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
/* SECTION 2: OUR NORTH STAR: PURPOSE, VISION, MISSION                        */
/* -------------------------------------------------------------------------- */

function PropositionSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16"
      style={{ background: isDark ? '#040D1A' : '#0B1E3D' }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[16px] font-bold text-[#C9A24B]">
                02 OUR NORTH STAR
              </span>
            </div>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
              Building organizations ready for what comes next.
            </h2>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <p className="mt-8 text-[14px] sm:text-[16px] font-normal leading-[1.6] text-white">
              The world of business is changing faster than organizations can adapt. TRYVION helps
              enterprises transform technology, enable people
              <br /> and build the capability to continuously evolve.
            </p>
          </Reveal>
          <br />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Reveal delay={0.1}>
            <div className="p-8 sm:p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-8">
                  <CheckCircle className="w-22 h-22 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">PURPOSE</h3>
                <h4 className="text-lg sm:text-xl text-white">Make transformation sustainable.</h4>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-300 mt-6 pt-6 border-t border-white/10 leading-[1.7]">
                We exist to turn organizational change into lasting capability.
              </p>
              <br />
              <br />
              <br />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-8 sm:p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-8">
                  <ShieldCheck className="w-22 h-22 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">MISSION</h3>
                <h4 className="text-lg sm:text-xl text-white">
                  Transform technology. Enable people. Build capability.
                </h4>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-300 mt-6 pt-6 border-t border-white/10 leading-[1.7]">
                To become the world’s most trusted partner for organisations shaping the future
                through intelligent choices, continuous innovation, and purposeful transformation.
              </p>
              <br />
              <br />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="p-8 sm:p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-8">
                  <Target className="w-22 h-22 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">VISION</h3>
                <h4 className="text-lg sm:text-xl text-white">
                  A world of organizations built to continuously evolve.
                </h4>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-300 mt-6 pt-6 border-t border-white/10 leading-[1.7]">
                To empower organisations to confidently navigate change by combining strategic
                insight, human ingenuity, and intelligent technologies that transform vision into
                sustained momentum and long-term growth.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 3: WHY TRYVION                                                     */
/* -------------------------------------------------------------------------- */
function WhyTryvionSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500"
      style={{ background: t.bg }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] items-stretch gap-12 lg:gap-16">
          {/* Image Column (50%) - Left */}
          <Reveal delay={0.3} className="order-1 flex flex-col">
            <div
              className="relative w-full h-full min-h-[380px] lg:min-h-full overflow-hidden rounded-xl shadow-lg"
              style={{ backgroundColor: isDark ? '#1A1F2E' : '#F0F2F5' }}
            >
              <Image
                src="/images/why-tryvion.png"
                alt="Architectural spiral staircase representing connected transformation"
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div
                className={`absolute inset-0 ${isDark ? 'bg-[#0B1E3D]/10' : 'bg-[#0B1E3D]/8'}`}
              />
            </div>
          </Reveal>

          {/* Content Column (50%) - Right */}
          <div className="flex flex-col justify-center pl-0 lg:pl-6 order-2">
            <Reveal>
              <div className="flex items-center gap-4 mb-2 mt-2">
                <span
                  className={`font-mono text-[16px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                >
                  03 WHY TRYVION
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] mt-4 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Technology transformation and talent transformation must happen together.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                className={`mt-6 space-y-5 text-[16px] sm:text-[17px] leading-[1.8] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                <p>
                  Organizations across industries are investing heavily in modern SaaS technologies,
                  AI, automation and digital platforms. Yet one challenge continues to grow: the
                  shortage of professionals with the expertise required to turn these technologies
                  into lasting business value.
                </p>
                <p>
                  Consulting can transform technology. Training can develop skills. But sustainable
                  transformation requires both to move together.
                </p>
                <p>
                  That is why TRYVION was built differently. We bring enterprise transformation,
                  innovation, digital learning and talent enablement together within one integrated
                  ecosystem.
                </p>
                <h4>
                  We don't just transform technology.
                  <br />
                  We build the talent that makes transformation sustainable.
                </h4>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 4: THE TRYVION DIFFERENCE                                            */
/* -------------------------------------------------------------------------- */

function TheTryvionDifferenceSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16"
      style={{ background: isDark ? '#040D1A' : '#0B1E3D' }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-[16px] font-bold text-[#C9A24B]">
                04 THE TRYVION DIFFERENCE
              </span>
            </div>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
              Built differently. Delivering transformation differently.
            </h2>
          </Reveal>
          <br />
          <Reveal delay={0.2}>
            <p className="mt-4 text-[16px] sm:text-[18px] font-normal leading-[1.6] text-gray-300">
              Senior expertise at the front. AI embedded throughout. Accountability end-to-end.
            </p>
          </Reveal>
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Practitioners, not pyramids */}
          <Reveal delay={0.1} className="h-full">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-6">
                  <Users className="w-24 h-24 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Practitioners, not pyramids</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-300 leading-[1.6]">
                  You get practitioners who have actually architected, implemented and operated
                  complex enterprise environments. The people shaping strategy stay connected to
                  delivery.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                  Senior expertise, always.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: AI embedded into delivery */}
          <Reveal delay={0.2} className="h-full">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-6">
                  <Sparkles className="w-24 h-24 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI embedded into delivery</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-300 leading-[1.6]">
                  AI, automation and reusable assets are embedded across the lifecycle — from
                  discovery and design through testing, documentation, migration and operations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                  Faster. Smarter. Best outcomes.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Standard-first transformation */}
          <Reveal delay={0.3} className="h-full">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-6">
                  <Layers className="w-24 h-24 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Standard-first transformation</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-300 leading-[1.6]">
                  We challenge unnecessary customisation and resist recreating legacy complexity.
                  Standard-first means smaller teams, faster decisions, easier evolution and lower
                  TCO.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                  Simplicity creates value.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Live knowledge transfer */}
          <Reveal delay={0.4} className="h-full">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col justify-between">
              <div>
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-[#C9A24B]/10 mb-6">
                  <GraduationCap className="w-24 h-24 text-[#C9A24B]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Live knowledge <br /> transfer
                </h3>
                <p className="text-[14px] sm:text-[15px] text-gray-300 leading-[1.6]">
                  Your people work alongside our practitioners throughout. Through TRYVION Academy,
                  learning is part of delivery — not a handover deck at the end.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                  More capable, not dependent.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 5: THE TRYVION PROMISE                                               */
/* -------------------------------------------------------------------------- */

const PROMISE_STEPS = [
  {
    title: 'CLARITY',
    desc: 'See the path forward.',
    icon: Lightbulb,
  },
  {
    title: 'PURPOSE',
    desc: 'Align around what matters.',
    icon: Target,
  },
  {
    title: 'PROGRESS',
    desc: 'Turn intent into measurable results.',
    icon: TrendingUp,
  },
  {
    title: 'FUTURE',
    desc: "Create what's next.",
    icon: Mountain,
  },
];

function TheTryvionPromiseSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className={`relative overflow-hidden py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 ${
        isDark ? 'bg-[#040D1A] text-white' : 'bg-[#F4F6F9] text-[#0B1E3D]'
      }`}
    >
      {/* Background Architectural Visual without gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/tryvion-promise-bg.png')",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] p-6">
        {/* Header Content */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-3">
              <span
                className={`font-mono text-[14px] sm:text-[16px] font-bold tracking-[0.22em] uppercase ${
                  isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                }`}
              >
                05 THE TRYVION PROMISE
              </span>
            </div>
          </Reveal>
          <br />

          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[38px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-0.035em] leading-[1.05] ${
                isDark ? 'text-white' : 'text-[#0B1E3D]'
              }`}
            >
              Turning Vision into{' '}
              <span className={isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}>Momentum.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className={`mt-6 text-[16px] sm:text-[18px] font-normal leading-[1.7] max-w-[720px] ${
                isDark ? 'text-gray-300' : 'text-[#5F6875]'
              }`}
            >
              Every engagement begins with clarity, is driven by purpose, and delivers measurable
              progress. We help organisations move beyond uncertainty and confidently create their
              future.
            </p>
          </Reveal>
        </div>
        <br />

        {/* 4-Step Infographic Flow Grid with Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-4">
          {PROMISE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const cardMarkup = (
              <Reveal key={item.title} delay={0.1 * (idx + 1)} className="h-full">
                <div className="flex flex-col items-center h-full">
                  <div
                    className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 flex-shrink-0 backdrop-blur-md shadow-sm ${
                      isDark
                        ? 'bg-white/10 border border-white/20 text-[#C9A24B]'
                        : 'bg-white/80 border border-gray-200 text-[#1458F2]'
                    }`}
                  >
                    <Icon style={{ width: '52px', height: '52px' }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className={`font-sans text-[18px] font-extrabold tracking-wider mb-2 uppercase ${
                      isDark ? 'text-white' : 'text-[#0B1E3D]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-[15px] leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-[#5F6875]'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );

            if (idx < PROMISE_STEPS.length - 1) {
              return (
                <React.Fragment key={item.title}>
                  {cardMarkup}
                  <div className="hidden lg:flex items-center justify-center text-gray-400 opacity-60 px-2">
                    <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </React.Fragment>
              );
            }
            return cardMarkup;
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 5: THE PRINCIPLES BEHIND OUR PROMISE                               */
/* -------------------------------------------------------------------------- */

const PRINCIPLES = [
  {
    num: '01',
    title: 'Challenge before commitment',
    desc: 'We challenge assumptions before recommending solutions, investments or transformation paths.',
    icon: Target,
  },
  {
    num: '02',
    title: 'Outcomes before activity',
    desc: 'Transformation is measured by value created—not the number of workshops completed or deliverables produced.',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Standard before customisation',
    desc: 'We protect the value of modern technology by resisting unnecessary complexity and customisation.',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'Expertise where it matters',
    desc: 'Senior practitioners stay close to the decisions that shape transformation.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Knowledge is a deliverable',
    desc: 'Capability transfer is embedded throughout the engagement, not added at the end.',
    icon: GraduationCap,
  },
  {
    num: '06',
    title: 'Transformation without dependency',
    desc: 'Our objective is not to make organizations dependent on consultants.',
    icon: HelpCircle,
  },
];

function PrinciplesSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500"
      style={{ background: t.surface }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <span
                className={`font-mono text-[16px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
              >
                06 THE PRINCIPLES BEHIND OUR PROMISE
              </span>
            </div>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              How we hold ourselves accountable.
            </h2>
          </Reveal>
          <br />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.num} delay={idx * 0.08} className="h-full">
                <div
                  className={`rounded-xl p-8 lg:p-10 flex flex-col h-full border backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-xl`}
                  style={{ backgroundColor: t.cardBg, borderColor: t.border }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isDark ? 'rgba(201,162,75,0.1)' : 'rgba(20,88,242,0.08)',
                      }}
                    >
                      <Icon
                        className={`w-22 h-22 ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={`font-mono text-2xl font-extrabold ${isDark ? 'text-[#C9A24B]/60' : 'text-[#1458F2]/40'}`}
                    >
                      {item.num}
                    </span>
                  </div>
                  <h3
                    className={`text-[20px] sm:text-[22px] font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-[15px] sm:text-[16px] leading-[1.7] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 6: ONE MODEL, SIX WAYS TO ENGAGE                                   */
/* -------------------------------------------------------------------------- */

const ENGAGEMENT_WAYS = [
  {
    title: 'TRYVION Advisory',
    subtitle: 'Shape the transformation.',
    desc: 'Independent, senior challenge and assurance — validating architecture, challenging design and protecting your interests, including alongside another SI.',
    icon: Compass,
    highlight: false,
  },
  {
    title: 'TRYVION Transformation',
    subtitle: 'Transform the enterprise.',
    desc: 'Practitioner-led, AI-enabled transformation across SAP, SaaS, cloud, data and processes — standard-first, outcome-led and built for lasting capability.',
    icon: Rocket,
    highlight: false,
  },
  {
    title: 'TRYVION Innovation',
    subtitle: 'Create what comes next.',
    desc: 'Explore, validate and scale what’s next — through TRYVION Labs, AI, automation and emerging technologies that turn new ideas into practical enterprise value.',
    icon: Lightbulb,
    highlight: false,
  },
  {
    title: 'TRYVION Academy',
    subtitle: 'Build the knowledge.',
    desc: 'Your people learn alongside delivery, developing practical expertise and relevant certifications through live knowledge transfer—not a handover deck at the end.',
    icon: GraduationCap,
    highlight: false,
  },
  {
    title: 'TRYVION Talent',
    subtitle: 'Build the capability.',
    desc: 'A curated network of vetted technology specialists you can draw on flexibly to strengthen transformation delivery and sustain capability when you need it.',
    icon: Users,
    highlight: false,
  },
  {
    title: 'TRYVION Operate',
    subtitle: 'Run. Optimise. Evolve.',
    desc: 'Post-go-live operations and continuous optimisation that keep your technology performing, your teams enabled and value compounding rather than plateauing.',
    icon: RefreshCw,
    highlight: false,
  },
];

function EngagementModelSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  return (
    <section
      className="py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500"
      style={{ background: t.bg }}
    >
      <div className="mx-auto max-w-[1280px] p-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-2">
              <span
                className={`font-mono text-[16px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
              >
                07 OUR MODEL
              </span>
            </div>
          </Reveal>
          <br />
          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.08] ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              One ecosystem. Six ways to transform.
            </h2>
          </Reveal>
          <br />
          <Reveal delay={0.2}>
            <p
              className={`mt-4 text-[16px] sm:text-[17px] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              Organizations enter transformation from different starting points. Some need strategic
              clarity. Some need technology transformation. Some need new skills. Some need access
              to specialized talent. Some need all of these simultaneously.
            </p>
          </Reveal>
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENT_WAYS.map((way, idx) => {
            const Icon = way.icon;
            return (
              <Reveal key={way.title} delay={idx * 0.08} className="h-full">
                <div
                  className={`rounded-xl p-6 flex flex-col h-full border backdrop-blur-md transition-all duration-300 hover:shadow-xl ${
                    way.highlight
                      ? isDark
                        ? 'bg-[#142642] border-[#C9A24B]'
                        : 'bg-[#0B1E3D] text-white border-[#1458F2]'
                      : ''
                  }`}
                  style={{
                    backgroundColor: way.highlight ? undefined : t.cardBg,
                    borderColor: way.highlight ? undefined : t.border,
                  }}
                >
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
                    <Icon
                      className={`w-24 h-24 ${way.highlight ? 'text-[#C9A24B]' : isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3
                    className={`text-[18px] sm:text-[20px] font-bold tracking-tight mb-2 ${
                      way.highlight ? 'text-white' : isDark ? 'text-white' : 'text-[#0B1E3D]'
                    }`}
                  >
                    {way.title}
                  </h3>
                  <h4
                    className={`text-[15px] sm:text-[16px] font-semibold mb-4 ${
                      way.highlight
                        ? 'text-[#C9A24B]'
                        : isDark
                          ? 'text-[#C9A24B]'
                          : 'text-[#1458F2]'
                    }`}
                  >
                    {way.subtitle}
                  </h4>
                  <p
                    className={`text-[15px] sm:text-[16px] leading-[1.7] mt-auto ${
                      way.highlight ? 'text-gray-200' : isDark ? 'text-gray-300' : 'text-[#5F6875]'
                    }`}
                  >
                    {way.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 4: WHAT CONNECTS IT ALL (Fully Responsive)                         */
/* -------------------------------------------------------------------------- */

const LIFECYCLE_STEPS = [
  {
    title: 'Advise',
    desc: 'Judgement before investment.',
    icon: Navigation,
  },
  {
    title: 'Simplify',
    desc: 'Remove complexity before you rebuild it.',
    icon: Layers,
  },
  {
    title: 'Transform',
    desc: 'Rebuild how the business RUNS — not how it RAN.',
    icon: Rocket,
  },
  {
    title: 'Automate',
    desc: "Let AI do the work people shouldn't.",
    icon: Sparkles,
  },
  {
    title: 'Operate',
    desc: 'Run it like it matters.',
    icon: RefreshCw,
  },
  {
    title: 'Evolve',
    desc: 'Adapt without another programme.',
    icon: InfinityIcon,
  },
];

function ConnectsItAllSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className={`py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 transition-colors duration-500 ${
        isDark ? 'bg-[#040D1A] text-white' : 'bg-[#F4F6F9] text-[#0B1E3D]'
      }`}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header & Description (Desktop) / Static Stack (Mobile) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  className={`font-mono text-[14px] sm:text-[16px] font-bold tracking-wider ${
                    isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                  }`}
                >
                  08 TRANSFORMATION PHILOSOPHY & CYCLE
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className={`font-sans text-[30px] sm:text-[38px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.1] ${
                  isDark ? 'text-white' : 'text-[#0B1E3D]'
                }`}
              >
                Technology. People. Knowledge. Outcomes.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className={`text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-[#5F6875]'
                }`}
              >
                <strong>Advise and Simplify</strong> protect the decisions. <br />
                <strong>Transform and Automate</strong> deliver the change. <br />
                <strong>Operate and Evolve</strong> keep the value compounding. <br />
                An SI's model ends at go-live. Ours is built so that go-live is where the return
                starts. <br />
                Before you customise it, <strong>let us challenge it.</strong> <br />
                Before you build it, <strong>let us validate it.</strong> <br />
                Before you accept it, <strong>let us assure it.</strong>
              </p>
            </Reveal>
          </div>

          {/* Right Column: Responsive Lifecycle Steps Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-6 p-6">
            {LIFECYCLE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className={`flex flex-col sm:flex-row items-start p-6 sm:p-6 lg:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E6EB] shadow-sm'
                  }`}
                >
                  <div className="shrink-0 mb-4 sm:mb-0 sm:mr-6 lg:mr-6 mt-1">
                    <div
                      className="w-24 h-24 sm:w-24 sm:h-24 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{
                        backgroundColor: isDark ? 'rgba(201,162,75,0.1)' : 'rgba(20,88,242,0.08)',
                      }}
                    >
                      <Icon
                        className={`w-24 h-24 sm:w-24 sm:h-24 lg:w-24 lg:h-24 ${
                          isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 sm:mb-3">
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold ${
                          isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <h3
                        className={`text-[18px] sm:text-[20px] lg:text-[22px] font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-[#0B1E3D]'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className={`text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] sm:leading-[1.7] ${
                        isDark ? 'text-gray-300' : 'text-[#5F6875]'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
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
/* SECTION 6: WHERE WE ARE GOING                                              */
/* -------------------------------------------------------------------------- */

function WhereWeAreGoingSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-16 transition-colors duration-500 ${
        isDark ? 'bg-[#040D1A] text-white' : 'bg-white text-[#0B1E3D]'
      }`}
    >
      {/* Background Roadmap Graphic with seamless dark-mode blending, inversion, and edge masking */}
      <div
        className={`absolute inset-y-0 right-0 w-full lg:w-[65%] pointer-events-none z-0 bg-contain lg:bg-right bg-no-repeat transition-all duration-500 ${
          isDark
            ? 'opacity-45 mix-blend-screen filter invert hue-rotate-180 [mask-image:linear-gradient(to_left,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_75%,transparent_100%)]'
            : 'opacity-95'
        }`}
        style={{
          backgroundImage: "url('/images/where-we-are-going-roadmap.png')",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1360px] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Card */}
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/images/choosing-the-connected-future.png"
                alt="Winding road through mountains representing continuous evolution"
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          {/* Right Column: Content */}
          <Reveal className="lg:col-span-7 order-1 lg:order-2 space-y-6 lg:pl-4" delay={0.1}>
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-[16px] font-bold ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
              >
                09 WHERE WE ARE GOING
              </span>
            </div>

            <h2
              className={`font-sans text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.1] ${
                isDark ? 'text-white' : 'text-[#0B1E3D]'
              }`}
            >
              Building the capability to continuously evolve.
            </h2>

            <div
              className={`space-y-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed max-w-2xl ${
                isDark ? 'text-gray-300' : 'text-[#5F6875]'
              }`}
            >
              <p>
                The next era of transformation will be defined by how organisations
                <br /> combine human capability, intelligent technology and continuous learning.
              </p>
              <p>
                Our ambition is to build one of the world's most trusted ecosystems for
                <br />
                transformation—creating meaningful impact for organisations,
                <br /> professionals and the communities we serve.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <span
                className={`font-mono text-[12px] sm:text-[13px] font-bold tracking-[0.18em] uppercase ${
                  isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                }`}
              >
                EXPERIENCE TODAY. A BRIGHTER TOMORROW.
              </span>
              <div className={`h-[1px] w-12 ${isDark ? 'bg-[#C9A24B]' : 'bg-[#1458F2]'}`} />
            </div>
          </Reveal>
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
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border flex items-center justify-center flex-shrink-0 overflow-hidden ${isDark ? 'border-[#C9A24B]/30 bg-[#C9A24B]/10' : 'border-white/20 bg-white/10'}`}
            >
              <Image
                src="/images/social_media_avatar.png"
                alt="TRYVION Icon"
                width={50}
                height={50}
                className="object-cover object-center"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                The next transformation starts here.
              </h3>
              <p className="mt-2 text-base sm:text-lg text-gray-300">
                Let's explore what's possible—together.
              </p>
            </div>
          </div>

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
      <OurStoryIntroSection isDark={isDark} />
      <PropositionSection isDark={isDark} />
      <WhyTryvionSection isDark={isDark} />
      <TheTryvionDifferenceSection isDark={isDark} />
      <TheTryvionPromiseSection isDark={isDark} />
      <PrinciplesSection isDark={isDark} />
      <EngagementModelSection isDark={isDark} />
      <ConnectsItAllSection isDark={isDark} />
      <WhereWeAreGoingSection isDark={isDark} />
      <BottomCTA isDark={isDark} />
    </main>
  );
}
