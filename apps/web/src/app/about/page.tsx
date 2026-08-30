'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Subtitles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/* DESIGN TOKENS (theme-aware)                                                */
/* -------------------------------------------------------------------------- */

const themeColors = {
  light: {
    ink: '#0B1E3D',
    inkDeep: '#07162C',
    paper: '#FFFFFF',
    fog: '#F2F4F7',
    text: '#111827',
    muted: '#5F6875',
    line: '#DDE2E8',
    gold: '#C9A24B',
    blue: '#1458F2',
    white: '#FFFFFF',
    black: '#000000',
  },
  dark: {
    ink: '#E8EDF5',
    inkDeep: '#C8D0DC',
    paper: '#1A1F2E',
    fog: '#121724',
    text: '#F0F2F6',
    muted: '#A0AAB8',
    line: '#2D3548',
    gold: '#C9A24B',
    blue: '#3B7BFF',
    white: '#1A1F2E',
    black: '#FFFFFF',
  },
};

/* -------------------------------------------------------------------------- */
/* MOTION WRAPPERS                                                            */
/* -------------------------------------------------------------------------- */

function SectionContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
          },
        },
      }}
      transition={reduce ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  const initial = reduce ? {} : { opacity: 0, ...directions[direction] };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GoldenLine() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="h-0.5 w-12 flex-shrink-0"
        style={{ backgroundColor: '#C9A24B' }}
        aria-hidden
      />
      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9A24B]">
        <span className="sr-only">Golden accent</span>
      </span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="h-px w-12 flex-shrink-0"
        style={{ backgroundColor: '#C9A24B' }}
        aria-hidden
      />
      <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-[#C9A24B]">
        {children}
      </span>
    </div>
  );
}

function ArrowLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const { theme } = useSiteTheme();
  const color = dark ? (theme === 'dark' ? '#FFFFFF' : '#FFFFFF') : '#1458F2';
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] transition-all"
      style={{ color }}
    >
      <span>{children}</span>
      <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';
  const heroBg = isDark ? '#0B1526' : '#07162C';

  return (
    <section
      className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40"
      style={{ minHeight: 'clamp(600px, 65vw, 880px)', background: heroBg }}
    >
      <Image
        src="/images/about-us.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.55, mixBlendMode: 'screen' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(11,21,38,.92) 0%, rgba(11,21,38,.70) 40%, rgba(11,21,38,.30) 70%, rgba(11,21,38,.10) 100%)'
            : 'linear-gradient(135deg, rgba(7,22,44,.92) 0%, rgba(7,22,44,.70) 40%, rgba(7,22,44,.30) 70%, rgba(7,22,44,.10) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 40%, rgba(20,88,242,.18), transparent 50%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[600px] max-w-[1440px] items-center px-4 py-12 sm:px-6 lg:min-h-[880px] lg:px-20 lg:py-20 w-full">
        <Reveal>
          <div
            className="w-full max-w-[640px] border px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,.25)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
            style={{
              borderColor: isDark ? '#2D3548' : '#E2E6EB',
              backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF',
            }}
          >
            <Eyebrow>About TRYVION</Eyebrow>

            <h1
              className="text-[38px] font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-[56px] lg:text-[72px]"
              style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
            >
              The Future Is A
              <br />
              Choice.
            </h1>

            <p
              className="mt-5 text-[17px] font-semibold leading-[1.4] sm:text-[20px] lg:text-[22px]"
              style={{ color: isDark ? '#F0F2F6' : '#111827' }}
            >
              We help organisations shape what comes next.
            </p>

            <p
              className="mt-5 max-w-[520px] text-[14px] leading-[1.7] sm:text-[15px] lg:text-[16px]"
              style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
            >
              TRYVION is an enterprise transformation partner helping organisations navigate
              complexity, make intelligent choices and turn vision into sustained momentum.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4]"
              >
                Talk to an Expert
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>

              <Link
                href="/about/our-story"
                className="inline-flex min-h-[50px] items-center justify-center border border-[#C8CDD5] px-7 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[#F5F6F8]"
                style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
              >
                Our Story
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* WHO WE ARE (Section 1: #FFFFFF in light mode)                              */
/* -------------------------------------------------------------------------- */

function WhoWeAre() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF' }}
    >
      <SectionContainer className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 w-full">
        <Reveal direction="right" distance={60}>
          <div className="relative aspect-square w-full overflow-hidden bg-[#F0F2F5] shadow-lg">
            <Image
              src="/images/about-section.png"
              alt="Abstract visual representing connected transformation"
              fill
              unoptimized
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-[#0B1E3D]/8" />
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <Eyebrow>About TRYVION</Eyebrow>
          </Reveal>

          <Reveal delay={0.15}>
            <h2
              className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-[48px] lg:text-[56px]"
              style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
            >
              Transformation begins with a choice.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              className="mt-7 max-w-[600px] space-y-5 text-[15px] leading-[1.75] sm:text-[16px] lg:text-[17px]"
              style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
            >
              <p>
                Organisations today are navigating constant change—from cloud and AI to evolving
                business models, customer expectations and increasingly complex technology
                landscapes.
              </p>
              <p>
                TRYVION helps organisations make the choices that matter. We combine strategic
                insight, technology and human expertise to transform businesses, create lasting
                value and build foundations for continuous evolution.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10">
              <ArrowLink href="/about/our-story">Discover Our Story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OUR FIRM (Section 2: #F2F4F7 in light mode)                                */
/* -------------------------------------------------------------------------- */

const FIRM_ITEMS = [
  {
    title: 'What We Believe',
    body: 'We believe meaningful transformation begins with purposeful choices. Vision creates direction, and the right choices turn ambition into momentum.',
    href: '/about/what-we-believe',
  },
  {
    title: 'What We Do',
    body: 'We help organisations modernise enterprise systems, apply intelligence, build specialist capability and continuously improve how they operate.',
    href: '/about/what-we-do',
  },
  {
    title: 'Our Story',
    body: 'TRYVION was founded to help organisations navigate a rapidly changing world of cloud, AI, automation and intelligent enterprise technology. We bring together transformation, technology and talent to create sustainable business value.',
    href: '/about/connected-transformation',
  },
  {
    title: 'Global Presence',
    body: 'TRYVION connects global transformation expertise with local insight, helping organisations navigate change and create lasting business value wherever they operate.',
    href: '/about/global-presence',
  },
  {
    title: 'Our Values',
    body: 'Courage, vision, intelligence, excellence and trust guide how we think, collaborate, innovate and deliver meaningful outcomes.',
    href: '/about/brand-values',
  },
  {
    title: 'Media Center',
    body: 'Explore TRYVION perspectives, announcements and stories shaping enterprise transformation, intelligent technology and the future of work.',
    href: '/media',
  },
];

function OurFirm() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: isDark ? '#121724' : '#F2F4F7' }}
    >
      <SectionContainer className="mx-auto max-w-[1140px] px-4 sm:px-6 w-full">
        <Reveal>
          <h2
            className="text-center text-[34px] font-extrabold tracking-[-0.04em] sm:text-[48px] lg:text-[56px]"
            style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
          >
            Our Firm
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FIRM_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} direction="up" distance={30}>
              <Link href={item.href} className="block h-full">
                <article
                  className="group h-full min-h-[190px] border-t-2 border-[#C9A24B] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF',
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A24B]" aria-hidden />
                    <div>
                      <h3
                        className="text-[16px] font-bold sm:text-[17px] group-hover:text-[#1458F2] transition-colors"
                        style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-3 text-[13px] leading-[1.7] sm:text-[14px]"
                        style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* ECOSYSTEM (Section 3: #FFFFFF in light mode)                               */
/* -------------------------------------------------------------------------- */

const ECOSYSTEM = [
  {
    title: 'Applications',
    body: 'Transform the systems at the heart of your business with intelligent enterprise applications built for continuous change.',
    href: '/services/applications',
  },
  {
    title: 'Artificial Intelligence',
    body: 'Move from AI experimentation to enterprise value through strategy, platforms, intelligent automation and AI agents.',
    href: '/services/artificial-intelligence',
  },
  {
    title: 'TRYVION Talent',
    body: 'Connect with specialist enterprise technology talent to build stronger teams and accelerate transformation.',
    href: '/services/talent',
  },
  {
    title: 'TRYVION Academy',
    body: 'Develop future-ready skills through structured learning, practical experience, mentoring and continuous development.',
    href: '/services/academy',
  },
  {
    title: 'Operate',
    body: 'Stabilise, operate, optimise and continuously improve your SAP and enterprise technology environment.',
    href: '/services/operate',
  },
  {
    title: 'Data & Analytics',
    body: 'Build trusted data foundations, unlock actionable insights and enable better decisions across the enterprise.',
    href: '/services/data-analytics',
  },
  {
    title: 'Cloud',
    body: 'Create secure, scalable and adaptable cloud foundations that enable modern enterprise transformation.',
    href: '/services/cloud',
  },
  {
    title: 'TRYVION Labs',
    body: 'Develop accelerators, reusable assets and innovative solutions that turn emerging technology into practical enterprise value.',
    href: '/services/labs',
  },
];

function Ecosystem() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF' }}
    >
      <SectionContainer className="mx-auto max-w-[1140px] px-4 text-center sm:px-6 w-full">
        <Reveal>
          <GoldenLine />
          <h2
            className="text-center text-[34px] font-extrabold tracking-[-0.04em] sm:text-[48px] lg:text-[56px]"
            style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
          >
            One ecosystem. Connected transformation.
          </h2>

          <p
            className="mt-5 text-[16px] font-semibold sm:text-[18px]"
            style={{ color: isDark ? '#F0F2F6' : '#111827' }}
          >
            Capabilities that move together.
          </p>

          <p
            className="mx-auto mt-5 max-w-[760px] text-[13px] leading-[1.8] sm:text-[14px] lg:text-[15px]"
            style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
          >
            Transformation does not happen through one technology or one function. TRYVION connects
            the capabilities organisations need to transform and continuously evolve.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} direction="up" distance={25}>
              <Link href={item.href} className="block h-full text-left">
                <article
                  className="group h-full min-h-[170px] border-t-2 border-[#C9A24B] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: isDark ? '#121724' : '#FFFFFF',
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A24B]" aria-hidden />
                    <div>
                      <h3
                        className="text-[14px] font-bold sm:text-[15px] group-hover:text-[#1458F2] transition-colors"
                        style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-3 text-[13px] leading-[1.7] sm:text-[14px]"
                        style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <ArrowLink href="/services">Explore Our Capabilities</ArrowLink>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PEOPLE (Section 4: #F2F4F7 in light mode)                                  */
/* -------------------------------------------------------------------------- */

const PEOPLE_ITEMS = [
  {
    title: 'Culture of Excellence',
    body: 'We foster a culture where exceptional people thrive through collaboration, high standards and a shared commitment to client success.',
    href: '/careers/culture',
  },
  {
    title: 'Leadership in Transformation',
    body: 'Our people combine deep enterprise experience with continuous learning to lead transformation in a rapidly changing technology landscape.',
    href: '/about/leadership',
  },
  {
    title: 'Social Impact',
    body: 'We use our expertise to create positive change, supporting sustainable growth, digital inclusion and opportunities for people and communities.',
    href: '/social-impact',
  },
];

function People() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: isDark ? '#121724' : '#F2F4F7' }}
    >
      <SectionContainer className="mx-auto max-w-[1140px] px-4 sm:px-6 w-full">
        <Reveal>
          <h2
            className="text-center text-[34px] font-extrabold tracking-[-0.04em] sm:text-[48px] lg:text-[56px]"
            style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
          >
            Our People
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PEOPLE_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} direction="up" distance={30}>
              <Link href={item.href} className="block h-full">
                <article
                  className="group h-full min-h-[170px] border-t-2 border-[#C9A24B] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF',
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <h3
                    className="text-[16px] font-bold sm:text-[17px] group-hover:text-[#1458F2] transition-colors"
                    style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-[13px] leading-[1.7] sm:text-[14px]"
                    style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
                  >
                    {item.body}
                  </p>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <Link
            href="/careers"
            className="group relative mt-14 block w-full aspect-[2.25/1] min-h-[260px] overflow-hidden sm:min-h-[340px]"
          >
            <Image
              src="/images/about-bold-ideas.png"
              alt="TRYVION team collaborating"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 1140px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
              <h3 className="text-[28px] font-extrabold tracking-[-0.035em] text-white drop-shadow-md sm:text-[40px] lg:text-[52px]">
                Bold ideas. Extraordinary teams.
                <ArrowRight className="ml-3 inline-block h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
              </h3>
            </div>
          </Link>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA (Section 5: #FFFFFF in light mode)                                     */
/* -------------------------------------------------------------------------- */

function CTA() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="py-28 sm:py-32 lg:py-40"
      style={{ backgroundColor: isDark ? '#1A1F2E' : '#FFFFFF' }}
    >
      <SectionContainer className="mx-auto max-w-[860px] px-4 text-center sm:px-6 w-full">
        <Reveal>
          <h2
            className="text-[34px] font-extrabold tracking-[-0.04em] sm:text-[48px] lg:text-[56px]"
            style={{ color: isDark ? '#E8EDF5' : '#0B1E3D' }}
          >
            What Comes Next?
          </h2>

          <p
            className="mx-auto mt-6 max-w-[760px] text-[14px] leading-[1.8] sm:text-[15px] lg:text-[16px]"
            style={{ color: isDark ? '#A0AAB8' : '#5F6875' }}
          >
            Let's turn your next decision into momentum. Whether you are modernising your
            enterprise, exploring AI or building new transformation capabilities, TRYVION can help
            you determine what comes next.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#1458F2] px-8 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0444D4]"
            >
              Talk to an Expert
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>

            <Link
              href="/book-consultation"
              className="inline-flex min-h-[50px] items-center justify-center border border-[#1458F2] px-8 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[#F0F4FF]"
              style={{ color: isDark ? '#3B7BFF' : '#1458F2' }}
            >
              Book a Consultation
            </Link>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function TryvionAboutPage() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <main
      className={`min-h-screen antialiased ${isDark ? 'dark' : ''}`}
      style={{
        backgroundColor: isDark ? '#121724' : '#FFFFFF',
        color: isDark ? '#E8EDF5' : '#0B1E3D',
      }}
    >
      <Hero />
      <WhoWeAre />
      <OurFirm />
      <Ecosystem />
      <People />
      <CTA />
    </main>
  );
}
