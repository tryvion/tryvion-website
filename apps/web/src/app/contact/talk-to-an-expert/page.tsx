'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Layers,
  BrainCircuit,
  Users,
  Settings,
  BarChart3,
  Cloud,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  Clock,
  Compass,
  CheckSquare,
  Calendar,
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
      <span className={`h-[2px] w-8 ${isDark ? 'bg-[#C9A24B]' : 'bg-[#C9A24B]'}`} />
      <span
        className={`font-sans text-[12px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}`}
      >
        {children}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO SECTION - WITH DIAGONAL SLANT                                         */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex items-center pt-32 lg:pt-40 pb-20 lg:pb-28"
      style={{ background: '#0B1E3D' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-talk-to-an-expert.png" // Replace with actual asset path
          alt="Professional expert looking forward"
          fill
          priority
          unoptimized
          className="object-cover object-right opacity-95 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16">
        {/* Breadcrumbs */}
        <div className="mb-12 mt-20 pt-32 flex items-center gap-2 text-[13px] font-semibold text-white">
          <Link href="/" className="text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/contact" className="text-white transition-colors">
            Contact
          </Link>
          <span>&gt;</span>
          <span className="text-white">Talk to an Expert</span>
        </div>

        <Reveal delay={0.1}>
          <h1 className="font-sans text-[48px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-8 max-w-[800px]">
            Start with the challenge.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[15px] sm:text-[15px] leading-[1.6] text-white/80 max-w-[600px] mb-12">
            Whether you are modernising your enterprise, exploring AI, transforming your SAP
            landscape or building new capabilities, connect with the right expert.
          </p>
        </Reveal>

        {/* Hero Feature Points */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex items-start gap-6 mt-10">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#C9A24B]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white mb-1">Right expertise</h3>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Connect with specialists for your challenge and priorities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 mt-10">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-[#C9A24B]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white mb-1">Clear next steps</h3>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Get clarity on the right path, options and opportunities.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Diagonal Slant Divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 lg:h-32 z-20"
        style={{
          background: isDark ? '#07162C' : '#FFFFFF',
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        }}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPERTISE GRID SECTION                                                     */
/* -------------------------------------------------------------------------- */

const EXPERTISE_CARDS = [
  {
    title: 'Applications',
    desc: 'Transform the systems at the heart of your business with intelligent enterprise applications built for continuous change.',
    icon: Users,
  },
  {
    title: 'Artificial Intelligence',
    desc: 'Move from AI experimentation to enterprise value through strategy, platforms, intelligent automation and AI agents.',
    icon: BrainCircuit,
  },
  {
    title: 'TRYVION Talent',
    desc: 'Connect with specialist enterprise technology talent to build stronger teams and accelerate transformation.',
    icon: Users,
  },
  {
    title: 'Operate',
    desc: 'Stabilise, operate, optimise and continuously improve your SAP and enterprise technology environment.',
    icon: BrainCircuit,
  },
  {
    title: 'Data & Analytics',
    desc: 'Build trusted data foundations, unlock actionable insights and enable better decisions across the enterprise.',
    icon: Users,
  },
  {
    title: 'Cloud',
    desc: 'Create secure, scalable and adaptable cloud foundations that enable modern enterprise transformation.',
    icon: BrainCircuit,
  },
];

function ExpertiseSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 relative z-30" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <Reveal>
            <div
              className={`h-[2px] w-12 mx-auto mb-6 ${isDark ? 'bg-[#C9A24B]' : 'bg-[#C9A24B]'}`}
            />
            <h2
              className={`font-sans text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              Expertise across every layer of transformation
            </h2>
            <p
              className={`text-[16px] sm:text-[18px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              Tell us about your challenge and we will connect you with the right TRYVION experts
              across our capabilities and transformation ecosystem.
            </p>
          </Reveal>
        </div>
        <br />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {EXPERTISE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={idx * 0.08}>
                <div
                  className={`group relative p-10 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-[#E2E6EB]'}`}
                >
                  <div
                    className={`mb-6 inline-flex items-center justify-center w-10 h-10 rounded-full ${isDark ? 'bg-white/5' : 'bg-[#F4F6F9]'}`}
                  >
                    <Icon
                      className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#0B1E3D]'}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3
                    className={`text-[20px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {card.title}
                  </h3>

                  <p
                    className={`text-[15px] leading-[1.6] mb-6 ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {card.desc}
                  </p>

                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-2 text-[14px] font-bold group-hover:gap-3 transition-all ${isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}`}
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
        <br />
        <br />

        {/* Bottom CTA Banner */}
        <Reveal delay={0.4}>
          <div
            className={`rounded-xl p-10 flex flex-col md:flex-row items-center gap-10 ${isDark ? 'bg-white/[0.03]' : 'bg-[#F8FAFC]'}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-white'} shadow-sm`}
            >
              <MessageCircle
                className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#0B1E3D]'}`}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3
                className={`text-[20px] sm:text-[24px] font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Ready to start the conversation?
              </h3>
              <p
                className={`text-[15px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                Tell us about your organisation, your priorities and the challenge you are looking
                to solve.
                <br /> Our experts will reach out to you soon.
              </p>
            </div>

            <Link
              href="/contact"
              className={`shrink-0 inline-flex items-center justify-center gap-3 px-10 py-6 rounded-md font-bold text-[14px] transition-all hover:scale-[1.02] ${isDark ? 'bg-white text-[#07162C]' : 'bg-[#0B1E3D] text-white'}`}
            >
              Tell us about your challenge
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TRUST INDICATORS                                                           */
/* -------------------------------------------------------------------------- */

const TRUST_ITEMS = [
  {
    title: 'Confidential',
    desc: 'Your information is secure and handled with care.',
    icon: CheckSquare,
  },
  {
    title: 'Relevant',
    desc: 'We connect you with the right expert for your challenge.',
    icon: Users,
  },
  { title: 'Responsive', desc: 'Our team will respond as quickly as possible.', icon: Calendar },
  {
    title: 'Focused on you',
    desc: 'We focus on your outcomes, not just technology.',
    icon: BrainCircuit,
  },
];

function TrustSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-16 border-t" style={{ background: t.surface, borderColor: t.border }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16 mt-10 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.1} className="flex items-start gap-6">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-white'} shadow-sm`}
                >
                  <Icon
                    className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#0B1E3D]'}`}
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4
                    className={`text-[16px] font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-[14px] leading-[1.5] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
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
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function TalkToExpertPage() {
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
      <ExpertiseSection isDark={isDark} />
      <TrustSection isDark={isDark} />
    </main>
  );
}
