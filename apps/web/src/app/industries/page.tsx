'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CarFront,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Cpu,
  Database,
  Dna,
  Factory,
  FlaskConical,
  Flame,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  Pickaxe,
  Plane,
  Radio,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Store,
  Trophy,
  Tv,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/*  DATA & TYPES                                                              */
/* -------------------------------------------------------------------------- */

type IconType = React.ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

type SubIndustry = {
  name: string;
  href: string;
  icon: IconType;
};

type IndustryGroup = {
  id: string;
  number: string;
  title: string;
  description: string;
  subIndustries: SubIndustry[];
};

const INDUSTRIES: IndustryGroup[] = [
  {
    id: 'service-industries',
    number: '01',
    title: 'SERVICE INDUSTRIES',
    description: 'Transform the business behind the service.',
    subIndustries: [
      {
        name: 'Professional Services',
        href: '/industries',
        icon: BriefcaseBusiness,
      },
      { name: 'Media', href: '/industries', icon: Tv },
      { name: 'Telco', href: '/industries', icon: Radio },
      {
        name: 'Transportation & Logistics',
        href: '/industries',
        icon: Truck,
      },
      {
        name: 'Engineering, Construction & Operations',
        href: '/industries',
        icon: Building2,
      },
      { name: 'Sports & Entertainment', href: '/industries', icon: Trophy },
      {
        name: 'Commercial Real Estate',
        href: '/industries',
        icon: Landmark,
      },
      { name: 'Travel & Leisure', href: '/industries', icon: Compass },
    ],
  },
  {
    id: 'consumer-industries',
    number: '02',
    title: 'CONSUMER INDUSTRIES',
    description: 'Connect the business to the customer.',
    subIndustries: [
      { name: 'Consumer Products', href: '/industries', icon: ShoppingBag },
      { name: 'Retail', href: '/industries', icon: Store },
      { name: 'Fashion', href: '/industries', icon: ShoppingBag },
      { name: 'Wholesale Distribution', href: '/industries', icon: Layers3 },
      { name: 'Life Sciences', href: '/industries', icon: Dna },
      { name: 'Agribusiness', href: '/industries', icon: Sprout },
    ],
  },
  {
    id: 'financial-services',
    number: '03',
    title: 'FINANCIAL SERVICES',
    description: 'Build trusted, intelligent financial enterprises.',
    subIndustries: [
      { name: 'Banking', href: '/industries', icon: CircleDollarSign },
      { name: 'Insurance', href: '/industries', icon: ShieldCheck },
    ],
  },
  {
    id: 'public-services',
    number: '04',
    title: 'PUBLIC SERVICES',
    description: 'Technology that creates better outcomes for society.',
    subIndustries: [
      { name: 'Public Sector', href: '/industries', icon: Building2 },
      { name: 'Health Care', href: '/industries', icon: HeartPulse },
      { name: 'Education & Research', href: '/industries', icon: GraduationCap },
      { name: 'Defence & Security', href: '/industries', icon: Shield },
    ],
  },
  {
    id: 'discrete-industries',
    number: '05',
    title: 'DISCRETE INDUSTRIES',
    description: 'Engineer the next generation of industry.',
    subIndustries: [
      {
        name: 'Industrial Manufacturing',
        href: '/industries',
        icon: Factory,
      },
      { name: 'High Tech', href: '/industries', icon: Cpu },
      { name: 'Automotive', href: '/industries', icon: CarFront },
      { name: 'Aerospace & Defence', href: '/industries', icon: Plane },
    ],
  },
  {
    id: 'energy-natural-resources',
    number: '06',
    title: 'ENERGY & NATURAL RESOURCES',
    description: 'Transform the enterprise behind the resource.',
    subIndustries: [
      { name: 'Utilities', href: '/industries', icon: Zap },
      { name: 'Mill Products', href: '/industries', icon: Layers3 },
      { name: 'Mining', href: '/industries', icon: Pickaxe },
      { name: 'Chemicals', href: '/industries', icon: FlaskConical },
      { name: 'Oil & Gas & Energy', href: '/industries', icon: Flame },
    ],
  },
];

const CAPABILITIES = [
  {
    step: '01',
    title: 'BUSINESS',
    description: 'Understand the operating model.',
    icon: BriefcaseBusiness,
  },
  {
    step: '02',
    title: 'ENTERPRISE',
    description: 'Modernise the systems that run the organisation.',
    icon: Layers3,
  },
  {
    step: '03',
    title: 'DATA',
    description: 'Create trusted information foundations.',
    icon: Database,
  },
  { step: '04', title: 'AI', description: 'Apply intelligence where it creates value.', icon: Cpu },
  {
    step: '05',
    title: 'PEOPLE',
    description: 'Enable adoption and new ways of working.',
    icon: Users,
  },
  {
    step: '06',
    title: 'CHANGE',
    description: 'Build an organisation capable of continuous evolution.',
    icon: RefreshCw,
  },
];

/* -------------------------------------------------------------------------- */
/*  MOTION COMPONENTS                                                         */
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
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO SECTION - FULL IMAGE BACKGROUND, NO CSS GRADIENTS OR OVERLAYS            */
/* -------------------------------------------------------------------------- */

function IndustriesHero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: 'clamp(400px, 50vh, 600px)',
        height: 'clamp(400px, 50vh, 600px)',
        background: '#03050C',
        color: '#FFFFFF',
      }}
    >
      {/* Pure Background Image - No CSS Glows or Grids */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/industries-banner.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(3,5,12,0.68) 0%, rgba(3,5,12,0.42) 50%, rgba(3,5,12,0.12) 90%, rgba(3,5,12,0) 100%)',
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex min-h-[400px] items-end px-6 pb-16 pt-24 sm:px-8 lg:min-h-[50vh] lg:px-12 lg:pb-20"
        style={{ maxWidth: 1320 }}
      >
        <div className="max-w-3xl">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs font-semibold"
              style={{ color: '#94A3B8' }}
            >
              <Link
                href="/"
                className="transition-colors hover:text-white"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Home
              </Link>
              <ChevronRight size={16} style={{ opacity: 0.5 }} />
              <span style={{ color: '#FFFFFF' }}>Industries</span>
            </nav>
          </Reveal>

          <Reveal delay={0.06}>
            <span
              className="mb-4 block text-[11px] font-extrabold tracking-[.22em]"
              style={{ color: '#C9A24B' }}
            >
              INDUSTRIES
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <h1
              className="m-0 font-extrabold tracking-[-.055em]"
              style={{ color: '#FFFFFF', fontSize: 'clamp(3.1rem, 7vw, 6.3rem)', lineHeight: 0.94 }}
            >
              Industries
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-6 max-w-2xl text-base leading-7 sm:text-lg"
              style={{ color: '#CBD5E1' }}
            >
              Industry context meets enterprise transformation, technology and intelligence.
              <br className="hidden sm:block" />
              We help organisations navigate complexity and build what comes next.
            </p>
            <br />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  INDUSTRY CARD                                                             */
/* -------------------------------------------------------------------------- */

function IndustryCard({
  group,
  expanded,
  onToggle,
  isDark,
}: {
  group: IndustryGroup;
  expanded: boolean;
  onToggle: () => void;
  isDark: boolean;
}) {
  const reduce = useReducedMotion();
  const regionId = `industry-panel-${group.id}`;

  return (
    <motion.article
      layout={!reduce}
      className="overflow-hidden rounded-2xl"
      style={{
        background: isDark ? '#0B1220' : '#FFFFFF',
        border: expanded
          ? '1px solid rgba(37,99,235,.55)'
          : isDark
            ? '1px solid rgba(15,23,42,.08)'
            : '1px solid #E2E8F0',
        boxShadow: expanded ? '0 24px 65px rgba(15,23,42,.10)' : '0 8px 30px rgba(15,23,42,.045)',
        transition: 'border-color .25s ease, box-shadow .25s ease',
      }}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={regionId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 text-left"
        style={{
          minHeight: 116,
          padding: 'clamp(1.35rem, 2.8vw, 2rem) clamp(1.35rem, 3vw, 2.25rem)',
          border: 0,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        <span className="flex min-w-0 items-center gap-5 sm:gap-7">
          <span
            className="shrink-0 font-mono text-xl font-extrabold sm:text-2xl"
            style={{ color: '#C9A24B' }}
          >
            {group.number}
          </span>
          <span className="min-w-0">
            <span
              className="block text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold tracking-[-.02em]"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              {group.title}
            </span>
            <span
              className="mt-1 block text-sm leading-6"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              {group.description}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span
            className="hidden text-[14px] font-extrabold uppercase tracking-[.14em] sm:block"
            style={{ color: expanded ? '#2563EB' : isDark ? '#CBD5E1' : '#475569' }}
          >
            {expanded ? 'Collapse' : 'Explore'}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: expanded ? '#2563EB' : isDark ? 'rgba(255,255,255,.06)' : '#F1F5F9',
              color: expanded ? '#FFFFFF' : isDark ? '#FFFFFF' : '#0F172A',
            }}
          >
            <ChevronDown size={24} strokeWidth={2.2} />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={regionId}
            role="region"
            aria-label={`${group.title} sub-industries`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              borderTop: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
              background: isDark ? '#080F1C' : '#F8FAFC',
            }}
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', columnGap: '1rem', rowGap: '1rem' }}
            >
              {group.subIndustries.map((sub, index) => {
                const Icon = sub.icon;
                return (
                  <motion.div
                    key={sub.name}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    className="min-w-0"
                  >
                    <Link
                      href={sub.href}
                      className="group/sub flex min-h-[88px] items-center justify-between gap-4 rounded-xl"
                      style={{
                        padding: '1.25rem 1.35rem',
                        textDecoration: 'none',
                        background: isDark ? '#0D1727' : '#FFFFFF',
                        border: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
                        color: isDark ? '#FFFFFF' : '#0F172A',
                        boxShadow: '0 4px 18px rgba(15,23,42,.025)',
                        transition:
                          'transform .22s ease, border-color .22s ease, box-shadow .22s ease, background .22s ease',
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                          style={{
                            background: isDark ? 'rgba(37,99,235,.12)' : '#F1F5F9',
                            color: '#2563EB',
                          }}
                        >
                          <Icon size={28} strokeWidth={1.75} />
                        </span>
                        <span
                          className="text-[14px] font-bold leading-[1.35]"
                          style={{ color: isDark ? '#F8FAFC' : '#172033' }}
                        >
                          {sub.name}
                        </span>
                      </span>
                      <ArrowRight
                        size={20}
                        strokeWidth={2}
                        className="shrink-0 transition-transform duration-200 group-hover/sub:translate-x-1"
                        style={{ color: '#C9A24B' }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  INDUSTRY EXPLORER                                                         */
/* -------------------------------------------------------------------------- */

function IndustryExplorer({ isDark }: { isDark: boolean }) {
  const [expanded, setExpanded] = useState('service-industries');

  return (
    <section
      style={{
        padding: 'clamp(5rem, 8vw, 7rem) 1.5rem',
        background: isDark ? '#070B14' : '#F8FAFC',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <Reveal>
          <div
            className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            style={{
              marginBottom: '2.5rem',
              paddingBottom: '1.75rem',
              borderBottom: isDark ? '1px solid rgba(255,255,255,.08)' : '1px solid #E2E8F0',
            }}
          >
            <div>
              <span
                className="text-[11px] font-extrabold tracking-[.2em]"
                style={{ color: '#2563EB' }}
              >
                SECTOR COVERAGE
              </span>
              <h2
                className="mt-2 m-0 font-extrabold tracking-[-.04em]"
                style={{
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: 1.05,
                }}
              >
                Explore Our Expertise
              </h2>
            </div>
            <p
              className="m-0 max-w-md text-sm leading-6"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              Explore the sectors where TRYVION brings business and technology together.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {INDUSTRIES.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.035}>
              <IndustryCard
                group={group}
                expanded={expanded === group.id}
                onToggle={() => setExpanded((current) => (current === group.id ? '' : group.id))}
                isDark={isDark}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  INDUSTRY + TECHNOLOGY                                                     */
/* -------------------------------------------------------------------------- */

function IndustryTechnology({ isDark }: { isDark: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: 'clamp(5rem, 8vw, 7rem) 1.5rem',
        background: isDark ? '#0A0F1D' : '#FFFFFF',
        borderTop: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1320 }}>
        <Reveal>
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              className="text-[11px] font-extrabold tracking-[.2em]"
              style={{ color: '#C9A24B' }}
            >
              INTEGRATED CAPABILITIES
            </span>
            <h2
              className="mt-2 m-0 font-extrabold tracking-[-.04em]"
              style={{
                color: isDark ? '#FFFFFF' : '#0F172A',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.05,
              }}
            >
              Industry + Technology
            </h2>
            <p
              className="mt-3 m-0 text-sm leading-6"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              The right technology starts with the right context.
            </p>
          </div>
        </Reveal>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          onMouseLeave={() => setHovered(null)}
          style={{ columnGap: '1rem', rowGap: '1rem' }}
        >
          {CAPABILITIES.map((item, index) => {
            const Icon = item.icon;
            const active = hovered === index;
            return (
              <Reveal key={item.title} delay={index * 0.035}>
                <motion.div
                  onMouseEnter={() => setHovered(index)}
                  whileHover={useReducedMotion() ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    minHeight: 240,
                    height: '100%',
                    padding: '1.6rem',
                    borderRadius: 16,
                    background: isDark
                      ? active
                        ? 'rgba(37,99,235,.12)'
                        : 'rgba(255,255,255,.035)'
                      : active
                        ? '#F8FAFC'
                        : '#FFFFFF',
                    border: active
                      ? '1px solid rgba(201,162,75,.7)'
                      : isDark
                        ? '1px solid rgba(255,255,255,.08)'
                        : '1px solid #E2E8F0',
                    boxShadow: active ? '0 18px 45px rgba(15,23,42,.08)' : 'none',
                    transition:
                      'background .25s ease, border-color .25s ease, box-shadow .25s ease',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-xs font-extrabold text-[16px]"
                      style={{ color: '#C9A24B' }}
                    >
                      {item.step}
                    </span>
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      style={{
                        color: active ? '#C9A24B' : '#2563EB',
                        transition: 'color .2s ease',
                      }}
                    />
                  </div>
                  <h3
                    className="mt-10 m-0 text-base font-extrabold tracking-[.02em] text-[18px]"
                    style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 m-0 text-xs leading-5 text-[14px]"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA SECTION - FULL IMAGE BACKGROUND, NO CSS GRADIENTS OR OVERLAYS             */
/* -------------------------------------------------------------------------- */

function IndustriesCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(5rem, 9vw, 8rem) 1.5rem',
        color: '#FFFFFF',
        textAlign: 'center',
        minHeight: '500px',
        height: 'auto',
      }}
    >
      {/* CTA image is the actual visible background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/industries-cta.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(3,5,12,0.68) 0%, rgba(3,5,12,0.42) 32%, rgba(3,5,12,0.12) 68%, rgba(3,5,12,0) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth: 900 }}>
        <Reveal>
          <span className="text-[11px] font-extrabold tracking-[.2em]" style={{ color: '#C9A24B' }}>
            THE NEXT MOVE
          </span>
          <h2
            className="mt-3 m-0 font-extrabold tracking-[-.045em]"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.25rem, 5.2vw, 4.7rem)',
              lineHeight: 1.02,
            }}
          >
            Your Industry Is Changing.
            <span className="mt-2 block" style={{ color: '#FFFFFF' }}>
              Is Your Enterprise Ready For What Comes Next?
            </span>
          </h2>
          <br />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-bold text-white no-underline transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#03050C]"
              style={{ background: '#2563EB' }}
            >
              Talk to an Expert <ArrowRight size={20} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white no-underline transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#03050C]"
            >
              Explore TRYVION Services <ArrowRight size={20} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function TryvionIndustriesPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: isDark ? '#070B14' : '#FFFFFF',
        color: isDark ? '#F8FAFC' : '#0F172A',
        fontFamily:
          'var(--family-text, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
      }}
    >
      <main>
        <IndustriesHero />
        <IndustryExplorer isDark={isDark} />
        <IndustryTechnology isDark={isDark} />
        <IndustriesCTA />
      </main>
    </div>
  );
}
