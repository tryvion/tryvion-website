'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Target, Users, TrendingUp, Binoculars, Network, Rocket, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/* CUSTOM BRAND / UTILITY ICONS                                               */
/* -------------------------------------------------------------------------- */

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function MailIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

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
/* LEADERSHIP DATA                                                            */
/* -------------------------------------------------------------------------- */

interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  biography: string;
  background: string;
  expertise: string;
  beyondrole: string;
  linkedin?: string;
  email?: string;
}

const LEADERSHIP_TEAM: LeaderProfile[] = [
  {
    id: 'meena-thevi-kandasamy',
    name: 'Meena Kandasamy',
    role: 'Founder & Strategic Leadership',
    image: '/images/meena-thevi-kandasamy.png',
    linkedin: 'https://www.linkedin.com/in/meenakandasamy/',
    email: 'mailto:meena@thetryvion.com',
    biography:
      'Meena leads TRYVION’s vision of helping organisations accelerate business transformation through SAP S/4HANA Cloud, AI, and intelligent enterprise solutions. Her focus is on simplifying complex transformations by combining industry best practices, Clean Core principles, and pragmatic delivery — helping customers maximise the value of their digital investments.',
    background:
      'With over 25 years of experience in SAP consulting and business transformation, Meena has led and advised on global ERP programmes across Financial Services, Professional Services, Manufacturing, Retail, Public Sector, and Energy. Throughout her career, she has provided SAP consulting services through leading global consulting organisations, including Deloitte UK, IBM UK, and HCL AXON, supporting complex transformation programmes for major organisations across the UK, Europe, Asia-Pacific, and the Middle East.',
    expertise:
      'A recognised SAP transformation leader and experienced Solution Architect, Meena has been invited by SAP to share her transformation experience and industry insights at SAP Sapphire on two occasions, as well as at other SAP-hosted events. She specialises in translating business strategy into practical, scalable technology solutions, with expertise spanning SAP S/4HANA Cloud, enterprise and solution architecture, finance transformation, programme governance, data migration, localisation, and AI adoption. Meena advocates a standard-first approach, helping organisations embrace SAP standard capabilities and Clean Core principles while ensuring solutions remain sustainable, scalable, and aligned with long-term business objectives.',
    beyondrole:
      'Meena is passionate about developing people, building trusted partnerships, and creating a culture of collaboration, innovation, and continuous learning. She believes successful transformation is driven as much by people as by technology — and that the strongest outcomes come from combining deep expertise with simplicity, transparency, and a clear focus on business value.',
  },
  {
    id: 'rp-shukla',
    name: 'R.P. Shukla',
    role: 'Director - Global',
    image: '/images/r-p-shukla.png',
    linkedin: 'https://linkedin.com/',
    email: 'mailto:rpshukla@thetryvion.com',
    biography:
      'Mr. R.P. Shukla brings 36 years of leadership experience across the Oil & Gas and Manufacturing sectors. As Director of TRYVION India Limited, he brings deep industry knowledge, operational insight, and a practical understanding of complex business environments to TRYVION’s growth and transformation journey.',
    background:
      'A seasoned industry leader, Mr. Shukla has held senior responsibilities in large-scale operations and served as General Manager with a reputed Government organisation. His experience spans operational leadership, people management, governance, and driving excellence across complex industrial environments.',
    expertise:
      'At TRYVION, Mr. Shukla brings an industry-led perspective to transformation, ensuring that technology is aligned with business realities, people, processes, and sustainable value. He contributes to TRYVION’s India growth strategy while strengthening its capabilities across Enterprise Transformation, AI, SAP, Talent, and Learning.',
    beyondrole:
      'Mr. Shukla is passionate about developing people, sharing industry experience, and mentoring the next generation of professionals. His leadership philosophy reflects TRYVION’s approach to combining decades of experience with new-age thinking to create meaningful and lasting change.',
  },
  {
    id: 'abhishek-srivastava',
    name: 'Abhishek Srivastava',
    role: 'Director - India',
    image: '/images/abhishek-srivastava.png',
    linkedin: 'https://www.linkedin.com/in/abhishekosrivastava/',
    email: 'mailto:abhishek.srivastava@thetryvion.com',
    biography:
      'Abhishek Srivastava is an entrepreneur and global business leader with 15+ years of experience spanning technology, industrial solutions, international trade, healthcare, consulting, and strategic business development. He brings a multidisciplinary perspective to TRYVION, combining technology-led thinking with commercial strategy, global partnerships, and a strong focus on sustainable value creation.',
    background:
      'With 15+ years of professional experience across multiple industries and international markets, Abhishek has built and led businesses spanning industrial technology, management consulting, entrepreneurship, healthcare, marketing, and global business development. His journey includes building ventures, developing international partnerships, advising organisations, and driving market expansion across diverse sectors, with exposure to markets across Asia, Europe, Africa, Australia, and North America.',
    expertise:
      'At TRYVION, Abhishek brings together technology, business strategy, international partnerships, and entrepreneurial thinking to help shape the organisation’s global growth. His experience spans enterprise technology, industrial automation, international trade, strategic sales, management consulting, healthcare solutions, and digital innovation — enabling him to connect emerging opportunities with practical business outcomes.',
    beyondrole:
      'Abhishek believes meaningful transformation comes from combining technology with people, partnerships, and purposeful execution. His leadership philosophy is grounded in integrity, transparency, collaboration, relationship building, and continuous innovation, with a focus on creating organisations and solutions that deliver meaningful and lasting value.',
  },
];

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
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className={`font-sans text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.16em] ${isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'}`}
      >
        {children}
      </span>
      <span
        className={`h-[1px] w-12 flex-shrink-0 ${isDark ? 'bg-[#C9A24B]/60' : 'bg-[#1458F2]/60'}`}
        aria-hidden="true"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO SECTION                                                               */
/* -------------------------------------------------------------------------- */

function LeadershipHero({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative overflow-hidden min-h-[620px] sm:min-h-[700px] lg:min-h-[800px] flex items-center transition-colors duration-500 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20"
      style={{ background: '#0B1E3D' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-leadership.png"
          alt="Architectural pathway representing strategic direction and future leadership"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-100 mix-blend-screen"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-12">
        <div className="max-w-[650px] space-y-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-white mb-8">
              <Link href="/" className="text-white transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/about" className="text-white transition-colors">
                About Us
              </Link>
              <span>&gt;</span>
              <span className="text-white">Leadership</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#C9A24B] mb-4">
              Leadership
            </span>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-sans text-[42px] sm:text-[64px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white">
              Experience that
              <br />
              helps shape what
              <br />
              comes next<span className="text-[#ffffff]">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[16px] sm:text-[20px] leading-[1.6] text-white/90 max-w-[550px]">
              TRYVION is led by experienced enterprise technology and transformation professionals
              who bring deep expertise, practical perspective and a shared commitment to helping
              organisations navigate change with confidence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* LEADERSHIP PHILOSOPHY                                                      */
/* -------------------------------------------------------------------------- */

const PHILOSOPHY_ITEMS = [
  { icon: Eye, title: 'THINK AHEAD', desc: 'Anticipate what comes next.' },
  { icon: Target, title: 'LEAD WITH CLARITY', desc: 'Turn complexity into purposeful action.' },
  { icon: Users, title: 'COLLABORATE', desc: 'Bring people and ideas together.' },
  {
    icon: TrendingUp,
    title: 'BUILD FOR TOMORROW',
    desc: 'Create capabilities that continue to evolve.',
  },
];

function LeadershipPhilosophy({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;

  return (
    <section
      className="py-20 sm:py-28 lg:py-36 transition-colors duration-500"
      style={{ background: t.bg }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-12">
        <div className="max-w-[700px] mb-16 lg:mb-20">
          <Reveal>
            <Eyebrow isDark={isDark}>OUR LEADERSHIP PHILOSOPHY</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className={`font-sans text-[32px] sm:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-8 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
            >
              Creating clarity for
              <br />
              the choices that matter<span className="text-[#C9A24B]">.</span>
            </h2>
          </Reveal>
          <br />

          <Reveal delay={0.2}>
            <div
              className={`space-y-6 text-[16px] sm:text-[18px] leading-[1.6] ${isDark ? 'text-gray-300' : 'text-[#5F6875]'}`}
            >
              <p>
                We believe effective transformation requires leaders who understand both business
                and technology—and know how to bring people, ideas and capabilities together. Our
                leadership is guided by vision, accountability, collaboration and continuous
                evolution.
              </p>
            </div>
          </Reveal>
        </div>
        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {PHILOSOPHY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={idx * 0.1} className="group">
                <motion.div
                  className="flex flex-col items-left text-left relative pb-8"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-6 p-4 rounded-full bg-transparent group-hover:bg-[#C9A24B]/5 transition-colors duration-300">
                    <Icon
                      className={`w-10 h-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}`}
                      strokeWidth={1.75}
                    />
                  </div>

                  <h3
                    className={`text-[14px] font-bold uppercase tracking-[0.12em] mb-3 ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-[15px] leading-[1.5] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
                  >
                    {item.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A24B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
/* FOUNDING LEADERSHIP - SIDE-BY-SIDE EXPANDABLE CARDS                        */
/* -------------------------------------------------------------------------- */

function FoundingLeadership({ isDark }: { isDark: boolean }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section
      className="py-20 sm:py-28 lg:py-36 transition-colors duration-500"
      style={{ background: isDark ? '#0A1128' : '#F4F6F9' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
        <Reveal>
          <Eyebrow isDark={isDark}>FOUNDING LEADERSHIP</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className={`font-sans text-[32px] sm:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-12 sm:mb-16 ${
              isDark ? 'text-white' : 'text-[#0B1E3D]'
            }`}
          >
            Meet the people
            <br /> behind{' '}
            <span className={isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'}>TRYVION</span>
          </h2>
        </Reveal>
        <br />

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_TEAM.map((leader, idx) => {
            const isExpanded = expandedCard === leader.id;

            return (
              <Reveal
                key={leader.id}
                delay={idx * 0.15}
                className={isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}
              >
                <motion.div
                  layout
                  initial={false}
                  className={`relative w-full rounded-[24px] border backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:border-[#C9A24B]/40 hover:bg-white/[0.08]'
                      : 'bg-white border-[#E2E6EB] hover:border-[#C9A24B]/50 hover:shadow-xl'
                  }`}
                  onClick={() => handleCardClick(leader.id)}
                >
                  {/* Close Button when expanded - perfectly positioned with high polish */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-6 right-6 lg:top-8 lg:right-8 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
                        style={{
                          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15, 23, 42, 0.05)',
                          color: isDark ? '#FFFFFF' : '#0B1E3D',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard(null);
                        }}
                        aria-label="Close profile"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <div className="p-6 sm:p-6 lg:p-6 xl:p-6">
                    {isExpanded ? (
                      /* Expanded Side-by-Side Layout: MNC Google-level clean spacing & margins */
                      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-6 mb-10 mt-10 items-start">
                        {/* Left Column: Image, Name, Role, Socials */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                          <div
                            className="relative w-full max-w-[240px] lg:max-w-none h-[280px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden mb-6 bg-[#eef1f5]"
                            style={{
                              boxShadow: isDark
                                ? '0 10px 30px rgba(0,0,0,0.5)'
                                : '0 10px 30px rgba(11,30,61,0.08)',
                            }}
                          >
                            <Image
                              src={leader.image}
                              alt={`${leader.name}, ${leader.role}`}
                              fill
                              unoptimized
                              className="object-cover object-top"
                            />
                          </div>

                          <h3
                            className={`text-[22px] sm:text-[24px] font-bold leading-snug mb-1.5 ${
                              isDark ? 'text-white' : 'text-[#0B1E3D]'
                            }`}
                          >
                            {leader.name}
                          </h3>
                          <p
                            className={`text-[14px] sm:text-[15px] font-semibold mb-6 ${
                              isDark ? 'text-[#3B7BFF]' : 'text-[#1458F2]'
                            }`}
                          >
                            {leader.role}
                          </p>

                          <div className="flex items-center gap-3">
                            {leader.linkedin && (
                              <a
                                href={leader.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0A66C2] text-white hover:scale-105 transition-transform shadow-sm"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${leader.name}'s LinkedIn`}
                              >
                                <LinkedinIcon className="w-6 h-6 text-white" />
                              </a>
                            )}
                            {leader.email && (
                              <a
                                href={leader.email}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5A623] text-white hover:scale-105 transition-transform shadow-sm"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Email ${leader.name}`}
                              >
                                <MailIcon className="w-6 h-6 text-white" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right Column: Comprehensive Content Sections with polished vertical spacing */}
                        <div className="space-y-8 lg:pr-12">
                          <div className="space-y-2">
                            <h4
                              className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] ${
                                isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                              }`}
                            >
                              Biography
                            </h4>
                            <p
                              className={`text-[15px] sm:text-[16px] leading-[1.75] ${
                                isDark ? 'text-gray-300' : 'text-[#5F6875]'
                              }`}
                            >
                              {leader.biography}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4
                              className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] ${
                                isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                              }`}
                            >
                              Background & Experience
                            </h4>
                            <p
                              className={`text-[15px] sm:text-[16px] leading-[1.75] ${
                                isDark ? 'text-gray-300' : 'text-[#5F6875]'
                              }`}
                            >
                              {leader.background}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4
                              className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] ${
                                isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                              }`}
                            >
                              Leadership & Expertise
                            </h4>
                            <p
                              className={`text-[15px] sm:text-[16px] leading-[1.75] ${
                                isDark ? 'text-gray-300' : 'text-[#5F6875]'
                              }`}
                            >
                              {leader.expertise}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4
                              className={`text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] ${
                                isDark ? 'text-[#C9A24B]' : 'text-[#1458F2]'
                              }`}
                            >
                              Beyond the Role
                            </h4>
                            <p
                              className={`text-[15px] sm:text-[16px] leading-[1.75] ${
                                isDark ? 'text-gray-300' : 'text-[#5F6875]'
                              }`}
                            >
                              {leader.beyondrole}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Collapsed Compact Card Layout: Image on Left, Details on Right */
                      <div className="flex items-center gap-5">
                        <div
                          className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] min-w-[110px] sm:min-w-[130px] rounded-xl overflow-hidden bg-[#eef1f5]"
                          style={{
                            boxShadow: isDark
                              ? '0 4px 20px rgba(0,0,0,0.4)'
                              : '0 4px 16px rgba(11,30,61,0.08)',
                          }}
                        >
                          <Image
                            src={leader.image}
                            alt={`${leader.name}, ${leader.role}`}
                            fill
                            unoptimized
                            className="object-cover object-top"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-[18px] sm:text-[20px] font-bold leading-snug mb-1.5 ${
                              isDark ? 'text-white' : 'text-[#0B1E3D]'
                            }`}
                          >
                            {leader.name}
                          </h3>
                          <p
                            className={`text-[13px] sm:text-[14px] font-medium leading-normal mb-3 ${
                              isDark ? 'text-[#3B7BFF]' : 'text-[#5F6875]'
                            }`}
                          >
                            {leader.role}
                          </p>
                          <br />

                          <div className="flex items-center gap-6">
                            {leader.linkedin && (
                              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0A66C2] text-white">
                                <LinkedinIcon className="w-5 h-5 text-white" />
                              </span>
                            )}
                            {leader.email && (
                              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F5A623] text-white">
                                <MailIcon className="w-5 h-5 text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <p
          className={`mt-8 text-[13px] text-center ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}
        >
          Click a card to view full profile →
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* HOW WE LEAD                                                                */
/* -------------------------------------------------------------------------- */

const LEAD_CARDS = [
  {
    icon: Binoculars,
    title: 'Understand',
    desc: 'We start by deeply understanding business context, industry dynamics and the outcomes that matter.',
    geometry: 'waves',
  },
  {
    icon: Network,
    title: 'Connect',
    desc: 'We connect strategy, people, process and technology to design solutions that deliver real impact.',
    geometry: 'dots',
  },
  {
    icon: Rocket,
    title: 'Lead Forward',
    desc: 'We lead with accountability and create the conditions for organisations to evolve and stay ahead.',
    geometry: 'arcs',
  },
];

function CardGeometry({ type }: { type: string }) {
  if (type === 'waves') {
    return (
      <svg
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1557C8" stopOpacity="0" />
            <stop offset="45%" stopColor="#1557C8" stopOpacity="0.15" />
            <stop offset="75%" stopColor="#1677FF" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#1683FF" stopOpacity="0.22" />
          </linearGradient>

          <radialGradient id="waveGlow" cx="100%" cy="75%" r="75%">
            <stop offset="0%" stopColor="#1769E8" stopOpacity="0.16" />
            <stop offset="45%" stopColor="#1769E8" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#1769E8" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="waveVerticalFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="42%" stopColor="white" stopOpacity="0.25" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.8" />
          </linearGradient>

          <mask id="waveMask">
            <rect x="0" y="0" width="400" height="320" fill="url(#waveVerticalFade)" />
          </mask>
        </defs>

        <rect x="0" y="0" width="400" height="320" fill="url(#waveGlow)" opacity="0.9" />

        <g
          mask="url(#waveMask)"
          fill="none"
          stroke="url(#waveFade)"
          strokeWidth="0.85"
          strokeLinecap="round"
        >
          <path d="M-70 295 C 40 240, 105 268, 170 252 C 235 236, 276 168, 430 145" />
          <path d="M-70 303 C 40 248, 105 276, 170 260 C 235 244, 278 176, 430 153" />
          <path d="M-70 311 C 40 256, 105 284, 170 268 C 235 252, 280 184, 430 161" />
          <path d="M-70 319 C 40 264, 105 292, 170 276 C 235 260, 282 192, 430 169" />

          <path d="M-70 327 C 40 272, 105 300, 170 284 C 235 268, 284 200, 430 177" />
          <path d="M-70 335 C 40 280, 105 308, 170 292 C 235 276, 286 208, 430 185" />
          <path d="M-70 343 C 40 288, 105 316, 170 300 C 235 284, 288 216, 430 193" />
          <path d="M-70 351 C 40 296, 105 324, 170 308 C 235 292, 290 224, 430 201" />

          <path d="M-70 359 C 40 304, 105 332, 170 316 C 235 300, 292 232, 430 209" />
          <path d="M-70 367 C 40 312, 105 340, 170 324 C 235 308, 294 240, 430 217" />
          <path d="M-70 375 C 40 320, 105 348, 170 332 C 235 316, 296 248, 430 225" />
          <path d="M-70 383 C 40 328, 105 356, 170 340 C 235 324, 298 256, 430 233" />

          <path d="M-70 391 C 40 336, 105 364, 170 348 C 235 332, 300 264, 430 241" />
          <path d="M-70 399 C 40 344, 105 372, 170 356 C 235 340, 302 272, 430 249" />
        </g>
      </svg>
    );
  }

  if (type === 'dots') {
    return (
      <svg
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="dotFieldFade" cx="88%" cy="46%" r="72%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="35%" stopColor="white" stopOpacity="0.85" />
            <stop offset="65%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <mask id="dotMask">
            <rect x="0" y="0" width="400" height="320" fill="url(#dotFieldFade)" />
          </mask>

          <pattern id="dotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1.15" fill="#1675F4" />
          </pattern>
        </defs>

        <g mask="url(#dotMask)" opacity="0.65">
          <rect x="125" y="0" width="275" height="320" fill="url(#dotPattern)" />
        </g>
      </svg>
    );
  }

  if (type === 'arcs') {
    return (
      <svg
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arcStroke" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#1263D8" stopOpacity="0" />
            <stop offset="45%" stopColor="#126BE7" stopOpacity="0.12" />
            <stop offset="72%" stopColor="#1678F5" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#2586FF" stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id="arcGlow" cx="100%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#1673EE" stopOpacity="0.10" />
            <stop offset="55%" stopColor="#1673EE" stopOpacity="0.035" />
            <stop offset="100%" stopColor="#1673EE" stopOpacity="0" />
          </radialGradient>

          <mask id="arcMask">
            <linearGradient id="arcFadeMask" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="38%" stopColor="black" />
              <stop offset="65%" stopColor="white" />
              <stop offset="100%" stopColor="white" />
            </linearGradient>
            <rect width="400" height="320" fill="url(#arcFadeMask)" />
          </mask>
        </defs>

        <rect width="400" height="320" fill="url(#arcGlow)" />

        <g mask="url(#arcMask)" fill="none" stroke="url(#arcStroke)" strokeLinecap="round">
          <circle cx="390" cy="70" r="70" strokeWidth="0.7" />
          <circle cx="390" cy="70" r="92" strokeWidth="0.7" />
          <circle cx="390" cy="70" r="114" strokeWidth="0.75" />
          <circle cx="390" cy="70" r="136" strokeWidth="0.8" />
          <circle cx="390" cy="70" r="158" strokeWidth="0.8" />
          <circle cx="390" cy="70" r="180" strokeWidth="0.7" />
        </g>
      </svg>
    );
  }

  return null;
}

function HowWeLead({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="py-28 lg:py-36 transition-colors duration-500"
      style={{ background: '#0B1E3D' }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-12">
        <div className="max-w-[700px] mb-16 lg:mb-20">
          <Reveal>
            <Eyebrow isDark={isDark}>HOW WE LEAD</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-sans text-[36px] sm:text-[48px] font-extrabold leading-[1.1] tracking-tight text-white mb-8">
              Business understanding.
              <br />
              Technology expertise.
              <br />
              Human perspective.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="w-16 h-[2px] bg-[#C9A24B] mb-8" />
            <p className="text-[18px] leading-[1.6] text-white/80">
              We believe leadership in transformation is about more than technology. It is about
              understanding the challenge, creating clarity around the choices ahead and building
              the confidence and capability to move forward.
            </p>
          </Reveal>
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEAD_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.3)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-[18px] border border-[#29466F] bg-[#10274A] p-8 min-h-[320px] flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                >
                  <CardGeometry type={card.geometry} />

                  <div className="relative z-10 mb-8 ml-6 mt-6">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 mt-auto mb-6 mr-6 ml-6">
                    <h3 className="text-[24px] font-bold text-white mb-3">{card.title}</h3>
                    <div className="w-8 h-[2px] bg-[#C9A24B] mb-4" />
                    <p className="text-[15px] leading-[1.6] text-white/70">{card.desc}</p>
                  </div>
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
/* BENTO GRID SECTION                                                         */
/* -------------------------------------------------------------------------- */

function LeadershipBentoGrid() {
  const { theme } = useSiteTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-28 lg:py-36 transition-colors duration-300 ${isDark ? 'bg-[#07162C]' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,557px)_minmax(0,1fr)] gap-5 sm:gap-6 auto-rows-min">
          <Reveal delay={0.1}>
            <div className="group relative h-[420px] sm:h-[557px] w-full overflow-hidden rounded-[20px] bg-[#4C1D95]">
              <Image
                src="/images/leadership-bento.png"
                alt="Leadership team silhouettes in purple light"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute inset-0 p-6 sm:p-[45px] flex flex-col justify-between z-10">
                <h3 className="text-[32px] sm:text-[43px] font-semibold leading-[normal] tracking-[0] text-white font-[family-name:var(--font-manrope)]">
                  Leadership that
                  <br />
                  grows with the future.
                </h3>
                <p className="w-full max-w-[466px] text-sm font-semibold leading-[normal] tracking-[0] text-white/90 font-[family-name:var(--font-manrope)]">
                  As TRYVION grows, we will continue to bring together experienced professionals who
                  share our commitment to innovation, collaboration, integrity and continuous
                  learning.
                  <br />
                  <br />
                  Our ambition is to build a leadership community capable of helping organisations
                  navigate the opportunities and challenges of a constantly evolving world.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.2}>
              <Link
                href="/about"
                className={`group relative block h-[220px] sm:h-[250px] w-full overflow-hidden rounded-[20px] transition-all duration-300 ${
                  isDark ? 'bg-[#DC2626]/80 hover:bg-[#DC2626]' : 'bg-[#DC2626]'
                }`}
              >
                <Image
                  src="/images/about-bento.png"
                  alt="About TRYVION abstract red background"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 p-6 sm:p-[31px] flex flex-col justify-between z-10">
                  <h3 className="text-[32px] sm:text-[43px] font-semibold leading-[normal] tracking-[0] text-white font-[family-name:var(--font-manrope)]">
                    About
                  </h3>
                  <div className="self-end">
                    <motion.div
                      className="h-[49px] w-[65px] aspect-[1.32]"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg viewBox="0 0 65 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2 24.5H58M58 24.5L48 14.5M58 24.5L48 34.5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              <Reveal delay={0.3}>
                <Link
                  href="/services"
                  className={`group relative block h-[240px] sm:h-[287px] w-full overflow-hidden rounded-[20px] transition-all duration-300 ${
                    isDark ? 'bg-[#0D9488]/80 hover:bg-[#0D9488]' : 'bg-[#0D9488]'
                  }`}
                >
                  <Image
                    src="/images/services-bento.png"
                    alt="Services abstract teal background"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-6 sm:p-[32px] flex flex-col justify-between z-10">
                    <h3 className="text-3xl font-semibold leading-[normal] tracking-[0] text-white font-[family-name:var(--font-manrope)]">
                      Services
                    </h3>
                    <div className="self-end">
                      <motion.div
                        className="h-[49px] w-[65px] aspect-[1.32]"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg viewBox="0 0 65 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2 24.5H58M58 24.5L48 14.5M58 24.5L48 34.5"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.4}>
                <Link
                  href="/industries"
                  className={`group relative block h-[240px] sm:h-[287px] w-full overflow-hidden rounded-[20px] transition-all duration-300 ${
                    isDark ? 'bg-[#EA580C]/80 hover:bg-[#EA580C]' : 'bg-[#EA580C]'
                  }`}
                >
                  <Image
                    src="/images/industries-bento.png"
                    alt="Industries abstract orange background"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 p-6 sm:p-[32px] flex flex-col justify-between z-10">
                    <h3 className="text-3xl font-semibold leading-[normal] tracking-[0] text-white font-[family-name:var(--font-manrope)]">
                      Industries
                    </h3>
                    <div className="self-end">
                      <motion.div
                        className="h-[49px] w-[65px] aspect-[1.32]"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg viewBox="0 0 65 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2 24.5H58M58 24.5L48 14.5M58 24.5L48 34.5"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA SECTION                                                          */
/* -------------------------------------------------------------------------- */

function LeadershipCTA({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-20 lg:py-28 bg-[#040D1A] transition-colors duration-500">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#0038FF] px-6 py-10 sm:px-12 sm:py-16 lg:px-20 lg:py-20 min-h-[420px] sm:min-h-[380px] lg:min-h-[440px] flex items-center shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none overflow-hidden flex items-center justify-end">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at 80% 50%, rgba(0, 200, 255, 0.3) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />
              <svg
                viewBox="0 0 700 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover object-right opacity-70 scale-105 sm:scale-100"
                aria-hidden="true"
              >
                <path
                  d="M200 440 C 350 200, 500 300, 700 100 L 700 440 Z"
                  fill="url(#waveGradient1)"
                />
                <path
                  d="M300 440 C 450 250, 600 350, 700 150 L 700 440 Z"
                  fill="url(#waveGradient2)"
                  opacity="0.8"
                />
                <defs>
                  <linearGradient
                    id="waveGradient1"
                    x1="200"
                    y1="440"
                    x2="700"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient
                    id="waveGradient2"
                    x1="300"
                    y1="440"
                    x2="700"
                    y2="150"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 max-w-[620px]">
              <h2 className="font-sans text-[32px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.08] tracking-tight text-white mb-6 ml-0 sm:ml-6">
                Let's shape the
                <br />
                future together.
              </h2>
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6] text-white max-w-[530px] mb-6 ml-0 sm:ml-6 lg:mb-10 font-normal">
                Whether you are looking to transform your enterprise, explore new technology or
                build the capabilities required for what comes next, TRYVION brings together the
                experience & expertise to help you move forward with confidence.
              </p>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 mb-6 ml-0 sm:ml-6 rounded-full bg-white text-[#040D1A] font-medium text-[15px] hover:bg-white/95 transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  Talk to an expert
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE EXPORT                                                                */
/* -------------------------------------------------------------------------- */

export default function LeadershipPage() {
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
      <LeadershipHero isDark={isDark} />
      <LeadershipPhilosophy isDark={isDark} />
      <FoundingLeadership isDark={isDark} />
      <HowWeLead isDark={isDark} />
      <LeadershipBentoGrid />
      <LeadershipCTA isDark={isDark} />
    </main>
  );
}
