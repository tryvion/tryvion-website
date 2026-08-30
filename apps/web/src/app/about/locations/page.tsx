'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Globe, MapPin, Clock, Users, ShieldCheck, Cpu } from 'lucide-react';
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
      className="relative overflow-hidden min-h-[680px] lg:min-h-[740px] flex flex-col justify-between transition-colors duration-500 pt-32 lg:pt-40"
      style={{ background: '#07162C' }}
    >
      {/* Background Graphic - Global Network / Earth */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/global-presence.png" // Replace with your actual hero image path
          alt="Global network representing future enterprise presence"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-65 mix-blend-screen"
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-[#040D1A]/20 via-[#040D1A]/20 to-transparent'
              : 'bg-gradient-to-r from-[#07162C]/20 via-[#07162C]/20 to-transparent'
          }`}
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
          <span className="text-[#C9A24B]">Global Presence</span>
        </div>

        {/* Hero Left Content */}
        <div className="max-w-[620px]">
          <Reveal>
            <Eyebrow isDark={isDark}>Global Presence</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-sans text-[54px] sm:text-[72px] lg:text-[84px] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
              Global Reach
              <br />
              Local Depth.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[17px] sm:text-[19px] font-normal leading-[1.6] text-white/95 max-w-[560px]">
              With strategic hubs in every major economic center, TRYVION provides the local
              expertise and global scale required for complex AI transformation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS SECTION - 2 COLUMNS IN ONE ROW                                       */
/* -------------------------------------------------------------------------- */

const STATS = [
  { value: '3 Pillars', label: 'Transformation, Academy, Talent' },
  { value: 'Global', label: 'Reach across key markets' },
  { value: '24/7', label: 'Strategic Support' },
  { value: 'SAP + AI', label: 'Core transformation capability' }, // Added a 4th stat to complete the row
];

function StatsData({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-16 lg:py-20 border-y transition-colors duration-500"
      style={{ background: t.surface, borderColor: t.border }}
    >
      <br />
      <br />
      <br />
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        {/* Grid Layout: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x lg:divide-x"
          style={{ borderColor: t.border }}
        >
          {STATS.map((stat, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className="flex flex-col items-center justify-center py-8 sm:py-0 text-center"
            >
              <span
                className={`text-4xl sm:text-5xl font-extrabold mb-2 ${isDark ? 'text-[#3B7BFF]' : 'text-[#1458F2]'}`}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-[0.14em] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
              >
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* STRATEGIC OPERATIONS CENTERS (INTERACTIVE MAP)                             */
/* -------------------------------------------------------------------------- */

interface HubData {
  id: string;
  region: string;
  status: string;
  name: string;
  role: string;
  description: string;
  x: number; // Percentage X on SVG viewBox
  y: number; // Percentage Y on SVG viewBox
}

const HUBS: HubData[] = [
  {
    id: 'emea',
    region: 'EMEA',
    status: 'public',
    name: 'London, United Kingdom',
    role: 'SAP Strategic Consulting',
    description:
      'Our London hub serves as the primary center for EMEA operations, specializing in SAP, AI deployment and deep-tech consulting for European enterprises.',
    x: 48.5,
    y: 28.5,
  },
  {
    id: 'apac',
    region: 'APAC',
    status: 'public',
    name: 'Noida, India',
    role: 'Engineering, R&D & Innovation Hub',
    description:
      'The Noida innovation center drives our core engineering initiatives, providing scalable AI infrastructure solutions and 24/7 strategic support across the APAC region.',
    x: 68.5,
    y: 48.5,
  },
];

function OperationsMap({ isDark }: { isDark: boolean }) {
  const [activeHubId, setActiveHubId] = useState<string>('emea');
  const activeHub = HUBS.find((h) => h.id === activeHubId) || HUBS[0];
  const t = isDark ? DARK : LIGHT;

  return (
    <section className="py-28 lg:py-36 transition-colors duration-500" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <Reveal>
          <h2
            className={`text-center text-3xl sm:text-4xl font-extrabold mb-16 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
          >
            Strategic Operations Centers
          </h2>
        </Reveal>
        <br />
        <br />

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* LEFT COLUMN: Interactive Details Card */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-10 rounded-xl border backdrop-blur-md ${
                  isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-[#E2E6EB] shadow-sm'
                }`}
              >
                {/* Globe Icon - Top Right Corner */}
                <div className="absolute top-10 right-10">
                  <Globe className="w-10 h-10 text-[#1458F2]" strokeWidth={2} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                      isDark ? 'bg-[#3B7BFF]/20 text-[#3B7BFF]' : 'bg-[#1458F2]/10 text-[#1458F2]'
                    }`}
                  >
                    {activeHub.region}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                >
                  {activeHub.name}
                </h3>

                <p
                  className={`text-sm font-semibold mb-4 ${isDark ? 'text-[#3B7BFF]' : 'text-[#1458F2]'}`}
                >
                  {activeHub.role}
                </p>

                <p
                  className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
                >
                  {activeHub.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: World Map Visualization */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <Reveal delay={0.2}>
              <div
                className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden border ${
                  isDark ? 'bg-[#0A1128] border-white/10' : 'bg-[#F8FAFC] border-[#E2E6EB]'
                }`}
              >
                {/* World Map Background Image */}
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/024/305/048/non_2x/world-map-in-light-green-vector.jpg"
                  alt="Global Strategic Operations Map"
                  fill
                  unoptimized
                  className={`object-cover object-center ${isDark ? 'opacity-60 invert' : 'opacity-80'}`}
                />

                {/* Interactive Location Dots */}
                {HUBS.map((hub) => {
                  const isActive = hub.id === activeHubId;

                  // Precise coordinates as requested
                  const coords =
                    hub.id === 'emea'
                      ? { left: '46.5%', top: '37.5%' }
                      : { left: '64.5%', top: '57.5%' };

                  return (
                    <button
                      key={hub.id}
                      onClick={() => setActiveHubId(hub.id)}
                      className="absolute group focus:outline-none z-10"
                      style={{
                        left: coords.left,
                        top: coords.top,
                        transform: 'translate(-50%, -50%)',
                      }}
                      aria-label={`Select ${hub.name}`}
                    >
                      {/* Pulse Ring Animation */}
                      <span
                        className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                          isActive ? 'bg-[#1458F2]' : 'bg-gray-400'
                        }`}
                        style={{ animationDuration: '2s' }}
                      />

                      {/* Active Dot */}
                      <span
                        className={`relative flex h-5 w-5 rounded-full border-2 ${
                          isActive
                            ? 'bg-[#1458F2] border-white shadow-[0_0_15px_rgba(20,88,242,0.6)]'
                            : 'bg-gray-500 border-white hover:bg-[#1458F2] hover:shadow-[0_0_15px_rgba(20,88,242,0.4)]'
                        } transition-all duration-300`}
                      />

                      {/* Tooltip Label */}
                      <span
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                          isDark ? 'bg-white text-[#0B1E3D]' : 'bg-[#0B1E3D] text-white'
                        }`}
                      >
                        {hub.name.split(',')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      style={{
        padding: 'clamp(6rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3.5rem)',
        background: 'rgba(20,88,242,0.06)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
          }}
        >
          Work with a team near you
        </h2>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            marginBottom: '3rem',
          }}
        >
          Our offices combine local client proximity with global delivery capability. Contact the
          team to discuss your requirements.
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #1458F2, #0B1E3D)',
            color: '#fff',
            padding: '1rem 2.25rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9375rem',
          }}
        >
          Contact us
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            style={{ width: '1rem', height: '1rem' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function GlobalPresencePage() {
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
      <StatsData isDark={isDark} />
      <OperationsMap isDark={isDark} />
      <FinalCTA isDark={isDark} />
    </main>
  );
}
