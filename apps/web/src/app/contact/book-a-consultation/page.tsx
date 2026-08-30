'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Users,
  CalendarCheck,
  Layers,
  BrainCircuit,
  Network,
  UserPlus,
  RefreshCw,
  User,
  Clock,
  CheckCircle2,
  Star,
  Globe,
  TrendingUp,
  Handshake,
  MessageCircle,
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
/* HERO SECTION                                                               */
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
          src="/images/book-a-consultation.png" // Replace with actual asset path
          alt="Professional consultation meeting"
          fill
          priority
          unoptimized
          className="object-cover object-right opacity-95 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16">
        {/* Breadcrumbs */}
        <div className="mb-12 mt-20 pt-32 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <span>&gt;</span>
          <span className="text-white">Book a Consultation</span>
        </div>

        <Reveal delay={0.1}>
          <h1 className="font-sans text-[48px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-8 max-w-[800px]">
            Turn your next decision
            <br />
            into momentum.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[15px] sm:text-[15px] leading-[1.6] text-white/80 max-w-[600px] mb-12">
            A focused strategic conversation with TRYVION to explore your transformation priorities,
            challenges and opportunities. Share a few details and our team will connect you with the
            right expert.
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
                <h3 className="text-[16px] font-bold text-white mb-1">Strategic conversations</h3>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Discuss your priorities with experienced TRYVION specialists.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 mt-10">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-6 h-6 text-[#C9A24B]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white mb-1">Focused & outcome-driven</h3>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  We'll help you identify the right path forward.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* EXPLORE TOGETHER SECTION                                                   */
/* -------------------------------------------------------------------------- */

const EXPLORE_CARDS = [
  {
    title: 'Modernise the Core',
    desc: 'Transform enterprise applications and processes to create a stronger digital core.',
    icon: Layers,
  },
  {
    title: 'Build Intelligence',
    desc: 'Explore how AI and intelligent automation can drive efficiency and better decisions.',
    icon: BrainCircuit,
  },
  {
    title: 'Connect the Enterprise',
    desc: 'Unify systems, data and processes with modern platforms and integration architectures.',
    icon: Network,
  },
  {
    title: 'Enable Your People',
    desc: 'Build capabilities, skills and ways of working that enable continuous transformation.',
    icon: UserPlus,
  },
  {
    title: 'Operate & Evolve',
    desc: 'Optimise operations, strengthen performance and create a foundation for continuous change.',
    icon: RefreshCw,
  },
];

function ExploreTogetherSection({ isDark }: { isDark: boolean }) {
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
              What we can explore together
            </h2>
            <p
              className={`text-[16px] sm:text-[18px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              Every organisation's journey is unique. A TRYVION consultation gives you dedicated
              time with the right specialist to explore what matters most to your business.
            </p>
          </Reveal>
        </div>
        <br />
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {EXPLORE_CARDS.map((card, idx) => {
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
                    className={`text-[15px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                  >
                    {card.desc}
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
/* REQUEST CONSULTATION STEPS                                                 */
/* -------------------------------------------------------------------------- */

const CONSULTATION_STEPS = [
  {
    num: '01',
    title: 'Tell us about you',
    desc: 'Share your details and organisation information.',
    icon: User,
  },
  {
    num: '02',
    title: 'Choose your focus',
    desc: 'Let us know the areas you would like to discuss.',
    icon: CalendarCheck,
  },
  {
    num: '03',
    title: 'Preferred time',
    desc: 'Share your preferred timeframe and availability.',
    icon: Clock,
  },
  {
    num: '04',
    title: 'Confirmation',
    desc: "We'll confirm your consultation and the right expert.",
    icon: CheckCircle2,
  },
];

function RequestConsultationSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36" style={{ background: isDark ? '#040D1A' : '#F8FAFC' }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <Reveal>
            <h2
              className={`font-sans text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              Request your consultation
            </h2>
            <p
              className={`text-[16px] sm:text-[18px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              Complete the form below and we will be in touch to confirm the next steps.
            </p>
          </Reveal>
        </div>
        <br />
        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {CONSULTATION_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.num}
                delay={idx * 0.1}
                className="flex flex-col items-center text-center p-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#0B1E3D] text-white' : 'bg-[#0B1E3D] text-white'}`}
                >
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <span
                  className={`text-[14px] font-bold mb-2 ${isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}`}
                >
                  {step.num}
                </span>
                <h3
                  className={`text-[18px] font-bold mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-[14px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                >
                  {step.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center">
            <Link
              href="/contact/form"
              className={`inline-flex items-center justify-center gap-3 px-10 py-6 rounded-md font-bold text-[14px] transition-all hover:scale-[1.02] ${isDark ? 'bg-white text-[#07162C]' : 'bg-[#0B1E3D] text-white'}`}
            >
              Request a Consultation
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHY LEADERS CHOOSE SECTION                                                 */
/* -------------------------------------------------------------------------- */

const STATS_ITEMS = [
  { value: '1000+', label: 'Transformation conversations', icon: Users },
  { value: '25+', label: 'Industries served', icon: Globe },
  { value: '98%', label: 'Client satisfaction rate', icon: TrendingUp },
  { value: 'Long-term', label: 'Partnership approach', icon: Handshake },
];

function WhyLeadersChooseSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36" style={{ background: isDark ? '#0B1E3D' : '#0B1E3D' }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 flex items-start gap-6">
            <div className="w-10 h-10 rounded-full border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
              <Star className="w-10 h-10 text-[#C9A24B]" />
            </div>
            <div>
              <h3 className="text-[24px] font-bold text-white mb-3">
                Why leaders choose TRYVION consultations
              </h3>
              <p className="text-[15px] leading-[1.6] text-white/70">
                Get clarity, perspective and practical recommendations from experts who understand
                both business and technology.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-10 p-10">
            {STATS_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex flex-col items-center text-center"
                >
                  <Icon className="w-10 h-10 text-[#C9A24B] mb-4" strokeWidth={1.5} />
                  <span className="text-[24px] font-extrabold text-white mb-2">{item.value}</span>
                  <span className="text-[13px] leading-[1.5] text-white/60">{item.label}</span>
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
/* FINAL CTA BAR                                                              */
/* -------------------------------------------------------------------------- */

function FinalCTA({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-16 lg:py-20 border-t"
      style={{ background: t.surface, borderColor: t.border }}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-xl border"
          style={{ backgroundColor: t.cardBg, borderColor: t.border }}
        >
          <div className="flex items-center gap-6 p-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDark ? 'bg-white/5' : 'bg-white'}`}
            >
              <MessageCircle
                className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#0B1E3D]'}`}
              />
            </div>
            <div>
              <h3
                className={`text-[24px] font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                Have questions before booking?
              </h3>
              <p
                className={`text-[15px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
              >
                Our team is happy to help. Talk to an expert and we'll guide you.
              </p>
            </div>
          </div>

          <Link
            href="/contact/talk-to-an-expert"
            className={`shrink-0 inline-flex items-center justify-center gap-3 px-10 py-6 rounded-md font-bold text-[14px] transition-all hover:scale-[1.02] border ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-[#E2E6EB] text-[#0B1E3D] hover:bg-gray-50'}`}
          >
            Talk to an Expert
            <ArrowRight className="w-6 h-6 text-[#C9A24B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function BookConsultationPage() {
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
      <ExploreTogetherSection isDark={isDark} />
      <RequestConsultationSection isDark={isDark} />
      <WhyLeadersChooseSection isDark={isDark} />
      <FinalCTA isDark={isDark} />
    </main>
  );
}
