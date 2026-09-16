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

const INDUSTRY_TAB_CONTENT: Record<
  IndustryGroup['id'],
  {
    eyebrow: string;
    headline: string;
    intro: string;
    support: string;
    segments: { name: string; description: string }[];
    futureTitle: string;
    futureText: string;
    cta: string;
  }
> = {
  'service-industries': {
    eyebrow: 'INDUSTRIES – SERVICE',
    headline: 'From Timesheet to Invoice — Finance You Can Trust',
    intro:
      'For service-led businesses, revenue is earned project by project, milestone by milestone and hour by hour. Your finance systems must keep pace. Service organisations must balance growth, profitability, client satisfaction, and employee experience—all while managing complex projects and rapidly changing resource demands.',
    support:
      'TRYVION helps organisations across professional services, engineering and construction, media, real estate, telecommunications, travel and leisure, sports and entertainment, and transportation and logistics connect project delivery, billing, revenue recognition and finance through SAP S/4HANA Cloud Public Edition.',
    segments: [
      {
        name: 'Professional Services',
        description:
          'firms managing complex engagements, rate structures, resource utilisation, time recording, project profitability and intercompany delivery.',
      },
      {
        name: 'Engineering & Construction',
        description:
          'firms seeking greater control over long-term projects, milestones, costs, commitments, billing schedules and revenue recognition.',
      },
      {
        name: 'Media & Telecommunications',
        description:
          'companies managing productions, talent, rights, sponsorships, multi-party revenue arrangements, and subscription- or usage-based business models.',
      },
      {
        name: 'Transportation & Logistics',
        description:
          'operators seeking real-time visibility into revenue, costs and margins by route, load, service or customer contract.',
      },
      {
        name: 'Travel, Leisure, Sports & Entertainment',
        description:
          'businesses managing dynamic demand, partner arrangements, customer experiences and diverse revenue streams across locations and channels.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose finance systems designed around how your business delivers value—not processes that force your business to fit the technology.',
    cta: 'Let’s map your current billing and revenue processes against SAP S/4HANA Cloud Public Edition best practices—and identify where greater control, automation and value can be achieved.',
  },
  'financial-services': {
    eyebrow: 'INDUSTRIES – FINANCIAL SERVICES',
    headline: 'Finance Transformation, Led by People Who Understand Finance',
    intro:
      'For banking and insurance organisations, financial close, regulatory reporting and auditability are more than back-office functions—they are fundamental to trust, control and performance.',
    support:
      'TRYVION brings finance-first expertise to SAP transformation, helping regulated organisations build connected, transparent and audit-ready finance operations.',
    segments: [
      {
        name: 'Retail & Commercial Banking',
        description:
          'organisations managing complex products, entities, jurisdictions and regulatory reporting obligations.',
      },
      {
        name: 'Insurance Providers',
        description:
          'requiring accurate accounting for premiums, claims, commissions, provisions and reserves.',
      },
      {
        name: 'Multi-Entity Financial Groups',
        description:
          'consolidating subsidiaries operating across different currencies and local accounting requirements.',
      },
      {
        name: 'Finance & Risk Functions',
        description:
          'under pressure to shorten close cycles while strengthening governance, control and transparency.',
      },
      {
        name: 'Audit and Compliance-Driven Organisations',
        description:
          'seeking to resolve reconciliation gaps, improve traceability and reduce dependence on manual adjustments.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose finance systems that do more than pass an audit. Build a financial core designed from the outset to be controlled, transparent, traceable and ready for change.',
    cta: 'Let’s assess your current close cycle, regulatory reporting and control environment against SAP S/4HANA Cloud best practices—and identify where risk, complexity and inefficiency can be reduced.',
  },
  'energy-natural-resources': {
    eyebrow: 'INDUSTRIES – ENERGY & NATURAL RESOURCES',
    headline: 'Built for Assets That Outlive the Systems That Track Them',
    intro:
      'For chemicals, mill products, mining, oil and gas, and utilities organisations, financial control must extend across decades—not simply reporting periods.',
    support:
      'TRYVION helps asset-intensive businesses establish a connected, transparent financial core that strengthens capital governance, operational control and regulatory reporting across the asset lifecycle.',
    segments: [
      {
        name: 'Utilities',
        description:
          'managing regulated asset bases, infrastructure investment, maintenance costs and multi-entity reporting.',
      },
      {
        name: 'Oil & Gas',
        description:
          'organisations operating capital-intensive assets, complex partner arrangements, and joint ventures across multiple jurisdictions.',
      },
      {
        name: 'Mining',
        description:
          'companies requiring greater control over capital projects, operational costs, asset performance, and partner accounting.',
      },
      {
        name: 'Chemicals',
        description:
          'manufacturers managing complex production environments, compliance obligations, product costing and high-value assets.',
      },
      {
        name: 'Mill Products',
        description:
          'businesses seeking improved visibility across raw materials, production costs, inventory, assets, and margin performance.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose a financial core designed to remain controlled, transparent, and adaptable throughout the life of your assets—not simply through implementation and go-live.',
    cta: 'Let’s assess your asset accounting, capital investment, operational finance and regulatory reporting processes against SAP best practices—and identify where greater visibility, control and long-term value can be achieved.',
  },
  'consumer-industries': {
    eyebrow: 'INDUSTRIES – CONSUMER',
    headline: 'Margins Are Won in Every Transaction',
    intro:
      'For agribusiness, consumer products, wholesale distribution, life sciences, fashion and retail organisations, profitability depends on controlling cost and protecting margin across every product, channel and customer interaction.',
    support:
      'TRYVION helps high-volume businesses establish a connected, scalable financial core—bringing finance, inventory, procurement, sales and performance insight together through SAP.',
    segments: [
      {
        name: 'Retail',
        description:
          'organisations managing high transaction volumes, omnichannel operations, dynamic pricing, promotions and complex inventory flows.',
      },
      {
        name: 'Wholesale Distribution',
        description:
          'businesses seeking stronger control over inventory, fulfilment, working capital and margin by customer or channel.',
      },
      {
        name: 'Consumer Products',
        description:
          'companies managing diverse brands, product portfolios, trade promotions, rebates and demand volatility.',
      },
      {
        name: 'Fashion',
        description:
          'businesses balancing seasonal collections, short product lifecycles, multiple channels and inventory risk.',
      },
      {
        name: 'Agribusiness',
        description:
          'organisations managing commodity-driven costs, seasonal demand, complex supply networks and margin volatility.',
      },
      {
        name: 'Life Sciences',
        description:
          'companies requiring precise product costing, inventory traceability, controlled financial processes and regulatory readiness.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose a financial core that keeps pace with growth—connecting every transaction, stock movement and commercial decision to trusted financial insight.',
    cta: 'Let’s assess your finance, inventory, working-capital and margin-management processes against SAP best practices—and identify where greater efficiency, visibility and scalable growth can be achieved.',
  },
  'discrete-industries': {
    eyebrow: 'INDUSTRIES – DISCRETE INDUSTRIES',
    headline: 'Finance That Keeps Pace with Production',
    intro:
      'For aerospace and defence, automotive, high-tech and industrial manufacturing organisations, financial performance depends on understanding the true cost of every product, project and production decision.',
    support:
      'TRYVION helps manufacturers connect engineering, production, supply chain and finance through SAP—creating a transparent financial core that keeps pace with operational change.',
    segments: [
      {
        name: 'Aerospace & Defence',
        description:
          'organisations managing long-term programmes, complex product structures, project-based production, regulatory controls and contract profitability.',
      },
      {
        name: 'Automotive',
        description:
          'manufacturers and suppliers operating high-volume production networks with complex costing, quality, supply-chain and intercompany requirements.',
      },
      {
        name: 'High Tech',
        description:
          'companies managing rapid innovation cycles, engineering changes, outsourced manufacturing and short product lifecycles.',
      },
      {
        name: 'Industrial Manufacturing',
        description:
          'businesses seeking greater control over product cost, work in progress, production variances and multi-site performance.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose a financial core that moves at the speed of production—connecting every material movement, engineering change and manufacturing decision to trusted financial insight.',
    cta: 'Let’s assess your product costing, work-in-progress, production variance and intercompany processes against SAP best practices—and identify where greater accuracy, control and manufacturing profitability can be achieved.',
  },
  'public-services': {
    eyebrow: 'INDUSTRIES – PUBLIC SERVICES',
    headline: 'Built for Scrutiny, Not Just Compliance',
    intro:
      'For defence and security, education and research, healthcare, and public sector organisations, accountability and transparency are not simply reporting requirements—they are fundamental to public trust.',
    support:
      'TRYVION helps public-serving organisations establish a controlled, transparent financial core that strengthens budget governance, funding accountability and audit readiness through SAP.',
    segments: [
      {
        name: 'Defence & Security',
        description:
          'organisations requiring rigorous financial controls, secure processes, detailed cost visibility and complete auditability across programmes and operations.',
      },
      {
        name: 'Education & Research',
        description:
          'institutions managing grants, restricted funds, research programmes, departmental budgets and complex stakeholder reporting.',
      },
      {
        name: 'Healthcare',
        description:
          'organisations balancing clinical priorities with budget pressures, procurement control, funding accountability and regulatory reporting.',
      },
      {
        name: 'Central & Local Government',
        description:
          'bodies requiring transparent management of public funds, departmental budgets, commitments, programmes and statutory reporting.',
      },
      {
        name: 'Public Agencies & Non-Departmental Bodies',
        description:
          'managing diverse funding sources, service-delivery obligations and high levels of public and regulatory scrutiny.',
      },
    ],
    futureTitle: 'The Future Is a Choice',
    futureText:
      'Choose a financial core designed to withstand scrutiny at any moment—not one prepared for it only at year-end.',
    cta: 'Let’s assess your funding, budget management, financial control and reporting processes against SAP best practices—and identify where greater transparency, accountability and public value can be achieved.',
  },
};

const INDUSTRY_SEGMENT_ICONS: Record<string, IconType> = {
  'Professional Services': BriefcaseBusiness,
  'Engineering & Construction': Building2,
  'Media & Telecommunications': Radio,
  'Transportation & Logistics': Truck,
  'Travel, Leisure, Sports & Entertainment': Trophy,
  'Retail & Commercial Banking': CircleDollarSign,
  'Insurance Providers': ShieldCheck,
  'Multi-Entity Financial Groups': Layers3,
  'Finance & Risk Functions': Landmark,
  'Audit and Compliance-Driven Organisations': Shield,
  Utilities: Zap,
  'Oil & Gas': Flame,
  Mining: Pickaxe,
  Chemicals: FlaskConical,
  'Mill Products': Factory,
  Retail: Store,
  'Wholesale Distribution': Layers3,
  'Consumer Products': ShoppingBag,
  Fashion: ShoppingBag,
  Agribusiness: Sprout,
  'Life Sciences': Dna,
  'Aerospace & Defence': Plane,
  Automotive: CarFront,
  'High Tech': Cpu,
  'Industrial Manufacturing': Factory,
  'Defence & Security': ShieldCheck,
  'Education & Research': GraduationCap,
  Healthcare: HeartPulse,
  'Central & Local Government': Landmark,
  'Public Agencies & Non-Departmental Bodies': Building2,
};

function IndustryContentPanel({ group, isDark }: { group: IndustryGroup; isDark: boolean }) {
  const reduce = useReducedMotion();
  const content = INDUSTRY_TAB_CONTENT[group.id];
  if (!content) return null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(1.25rem, 3vw, 2.25rem)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
      }}
    >
      <div
        style={{
          padding: 'clamp(1.4rem, 3vw, 2.15rem)',
          borderRadius: 18,
          background: isDark ? '#0D1727' : '#FFFFFF',
          border: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
          boxShadow: '0 8px 28px rgba(15,23,42,.035)',
        }}
      >
        <span
          className="text-[10px] font-extrabold tracking-[.2em] sm:text-[11px]"
          style={{ color: '#2563EB' }}
        >
          {content.eyebrow}
        </span>
        <h3
          className="mt-3 m-0 font-extrabold tracking-[-.035em]"
          style={{
            color: isDark ? '#FFFFFF' : '#0F172A',
            fontSize: 'clamp(1.55rem, 3.4vw, 2.5rem)',
            lineHeight: 1.08,
            maxWidth: 920,
          }}
        >
          {content.headline}
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
          <p
            className="m-0 text-[15px] leading-7 sm:text-[16px] sm:leading-7"
            style={{ color: isDark ? '#CBD5E1' : '#475569' }}
          >
            {content.intro}
          </p>
          <p
            className="m-0 border-l-0 pl-0 text-[15px] leading-7 sm:text-[16px] sm:leading-7 lg:border-l lg:pl-7"
            style={{
              color: isDark ? '#AEBBCD' : '#64748B',
              borderColor: isDark ? 'rgba(255,255,255,.10)' : '#E2E8F0',
            }}
          >
            {content.support}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-[.18em] sm:text-[11px]"
              style={{ color: '#2563EB' }}
            >
              Industry focus
            </span>
            <h4
              className="mt-1 m-0 text-[17px] font-extrabold tracking-[-.02em] sm:text-[20px] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Built for Your Industry
            </h4>
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[.14em] sm:text-[12px] mb-6"
            style={{ color: '#C9A24B' }}
          >
            {String(content.segments.length).padStart(2, '0')} focus areas
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.segments.map((segment, index) => {
            const Icon = INDUSTRY_SEGMENT_ICONS[segment.name] ?? Layers3;

            return (
              <motion.div
                key={segment.name}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.025 }}
                className="min-w-0 rounded-xl"
                style={{
                  padding: '1.25rem 1.3rem',
                  background: isDark ? 'rgba(255,255,255,.035)' : '#F8FAFC',
                  border: isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid #E2E8F0',
                  boxShadow: '0 4px 18px rgba(15,23,42,.025)',
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl sm:h-32 sm:w-32"
                    style={{
                      background: isDark ? 'rgba(37,99,235,.12)' : '#F1F5F9',
                      color: '#2563EB',
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={32} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="m-0 text-[15px] font-extrabold leading-6 sm:text-[16px]"
                      style={{ color: isDark ? '#F8FAFC' : '#172033' }}
                    >
                      {segment.name}
                    </p>
                    <p
                      className="mt-1.5 m-0 text-[14px] leading-[1.65] sm:text-[15px]"
                      style={{ color: isDark ? '#CBD5E1' : '#475569' }}
                    >
                      {segment.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div
        className="relative mt-7 overflow-hidden"
        style={{
          padding: 'clamp(1.45rem, 3vw, 2.15rem)',
          borderRadius: 18,
          background: isDark ? 'linear-gradient(145deg, #0B1E3D 0%, #102B53 100%)' : '#0B1E3D',
          border: '1px solid rgba(201,162,75,.32)',
          color: '#FFFFFF',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: '1px solid rgba(201,162,75,.25)',
            right: -55,
            top: -55,
          }}
        />
        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-10">
          <div>
            <span
              className="text-[11px] font-extrabold tracking-[.16em] sm:text-[12px]"
              style={{ color: '#C9A24B' }}
            >
              The Future Is a Choice
            </span>
            <h4
              className="mt-3 m-0 font-extrabold tracking-[-.025em]"
              style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', lineHeight: 1.12, color: '#fff' }}
            >
              {content.futureTitle}
            </h4>
          </div>
          <div>
            <p className="m-0 text-[15px] leading-7 sm:text-[16px]" style={{ color: '#CBD5E1' }}>
              {content.futureText}
            </p>
            <p
              className="mt-5 m-0 text-[14px] font-semibold leading-6 sm:text-[15px]"
              style={{ color: '#FFFFFF' }}
            >
              {content.cta}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
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
            <IndustryContentPanel group={group} isDark={isDark} />
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
            THE FUTURE IS A CHOICE
          </span>
          <h2
            className="mt-3 m-0 font-extrabold tracking-[-.045em]"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(2.25rem, 5.2vw, 4.7rem)',
              lineHeight: 1.02,
            }}
          >
            Choose systems designed around how your business creates value.
          </h2>
          <br />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-bold text-white no-underline transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#03050C]"
              style={{ background: '#2563EB' }}
            >
              Book a Fit-to-Standard Discovery <ArrowRight size={20} />
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
