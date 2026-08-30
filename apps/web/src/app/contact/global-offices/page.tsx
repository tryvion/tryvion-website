'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Handshake,
  ShieldCheck,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

/* -------------------------------------------------------------------------- */
/* DESIGN TOKENS                                                              */
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
  border: 'rgba(255,255,255,.10)',
  cardBg: 'rgba(255,255,255,.04)',
  gold: '#C9A24B',
  blue: '#3B7BFF',
};

/* -------------------------------------------------------------------------- */
/* MOTION                                                                     */
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, isDark }: { children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-[#C9A24B]" />
      <span
        className={`font-sans text-[12px] font-bold uppercase tracking-[0.2em] ${
          isDark ? 'text-[#C9A24B]' : 'text-[#C9A24B]'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* OFFICE DATA                                                                */
/* -------------------------------------------------------------------------- */

const REGIONS = ['All Regions', 'Asia Pacific', 'Europe, the Middle East, and Africa'] as const;

type Region = (typeof REGIONS)[number];

interface OfficeData {
  id: 'noida' | 'london';
  city: string;
  country: string;
  region: Exclude<Region, 'All Regions'>;
  address: string[];
  phone: string;
  email: string;
  image: string;
  flag: string;
  lat: number;
  lon: number;
  mapLabel: string;
  mapPosition: { left: string; top: string };
}

const OFFICES: OfficeData[] = [
  {
    id: 'noida',
    city: 'Noida',
    country: 'India',
    region: 'Asia Pacific',
    address: [
      'TOWER A-I, Corporate Park,',
      '609, Plot 7A, Sector 142,',
      'Noida, Uttar Pradesh 201304',
    ],
    phone: '+91 97739 93926',
    email: 'vr@thetryvion.com',
    image: '/images/noida-office.webp',
    flag: '🇮🇳',
    lat: 28.5355,
    lon: 77.391,
    mapLabel: 'Noida, India',
    mapPosition: { left: '66.8%', top: '47.5%' },
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe, the Middle East, and Africa',
    address: ['151, Ruxley Lane,', 'KT19 9EX, Epsom,', 'Surrey, United Kingdom'],
    phone: '+44(0) 79517 85497',
    email: 'vr@thetryvion.com',
    image: '/images/london-office.jpg',
    flag: '🇬🇧',
    lat: 51.5,
    lon: -0.13,
    mapLabel: 'London, United Kingdom',
    mapPosition: { left: '46.7%', top: '24.8%' },
  },
];

/* -------------------------------------------------------------------------- */
/* WORLD MAP ARTWORK                                                          */
/* -------------------------------------------------------------------------- */

const MAP_ARTWORK = '/images/world-map-global-offices.png';

function WorldMap({
  isDark,
  offices,
  selectedOffice,
  onSelect,
}: {
  isDark: boolean;
  offices: OfficeData[];
  selectedOffice: OfficeData | null;
  onSelect: (office: OfficeData) => void;
}) {
  const getPosition = (office: OfficeData) => office.mapPosition;

  return (
    <div
      className={`relative w-full overflow-visible rounded-xl border ${
        isDark ? 'border-white/10 bg-[#07162C]' : 'border-[#EEF1F5] bg-white'
      }`}
    >
      {/*
       * The supplied artwork is 1790 × 879 (ratio ≈ 2.036:1).
       * Keeping this exact aspect ratio prevents the continents from being
       * stretched or compressed at different viewport sizes.
       */}
      <div className="relative aspect-[1790/879] w-full overflow-hidden rounded-xl">
        <Image
          src={MAP_ARTWORK}
          alt="World map showing TRYVION offices in Noida, India and London, United Kingdom"
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1280px"
          className={`object-contain ${isDark ? 'opacity-55' : 'opacity-100'}`}
        />

        {/* Dark-mode integration without altering the artwork geometry. */}
        {isDark && (
          <div className="pointer-events-none absolute inset-0 bg-[#07162C]/60 mix-blend-multiply" />
        )}

        {/* Interactive office markers. */}
        {offices.map((office) => {
          const selected = selectedOffice?.id === office.id;
          const position = getPosition(office);

          return (
            <button
              key={office.id}
              type="button"
              aria-label={`Show ${office.mapLabel} address`}
              aria-pressed={selected}
              onClick={() => onSelect(office)}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2"
              style={position}
            >
              <span className="relative flex h-[54px] w-[54px] items-center justify-center">
                {/* Soft geographic glow */}
                <span
                  className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
                    selected
                      ? 'scale-110 opacity-60'
                      : 'scale-90 opacity-35 group-hover:scale-105 group-hover:opacity-55'
                  } ${isDark ? 'bg-[#C9A24B]' : 'bg-[#0B1E3D]'}`}
                />

                {/* Gold outer ring */}
                <span
                  className={`absolute h-[48px] w-[48px] rounded-full border-[3px] border-[#C9A24B] bg-[#0B1E3D] shadow-[0_8px_26px_rgba(11,30,61,.25)] transition-transform duration-300 ${
                    selected ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />

                {/* Flag badge */}
                <span className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/20 bg-[#0B1E3D] text-[19px] leading-none shadow-inner">
                  <span aria-hidden="true">{office.flag}</span>
                </span>
              </span>

              {/* Location name appears on hover / selection. */}
              <span
                className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[12px] font-extrabold transition-opacity duration-200 ${
                  selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}
              >
                {office.city}
              </span>
            </button>
          );
        })}

        {/* Address popup */}
        <AnimatePresence>
          {selectedOffice && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute left-1/2 top-1/2 z-40 w-[min(555px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-6 shadow-[0_24px_70px_rgba(11,30,61,.22)] sm:p-7 ${
                isDark
                  ? 'border-white/10 bg-[#0B1E3D]/96 text-white backdrop-blur-xl'
                  : 'border-[#E2E6EB] bg-white/96 text-[#0B1E3D] backdrop-blur-xl'
              }`}
              role="dialog"
              aria-label={`${selectedOffice.city} office details`}
            >
              <button
                type="button"
                onClick={() => onSelect(selectedOffice)}
                aria-label="Close office details"
                className={`absolute right-6 top-6 rounded-full p-1.5 transition ${
                  isDark
                    ? 'text-white/45 hover:bg-white/10 hover:text-white'
                    : 'text-[#7A8492] hover:bg-[#F4F6F9] hover:text-[#0B1E3D]'
                }`}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-5 flex items-start gap-6 pr-8 pl-8">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E7D5A4] bg-[#FBF7EA] text-[27px] leading-none shadow-sm"
                  aria-hidden="true"
                >
                  {selectedOffice.flag}
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[.18em] text-[#C9A24B]">
                    TRYVION Office
                  </p>
                  <h3 className="mt-1 text-[28px] font-extrabold tracking-tight">
                    {selectedOffice.city}
                  </h3>
                  <p
                    className={`mt-0.5 text-[15px] ${isDark ? 'text-white/60' : 'text-[#697384]'}`}
                  >
                    {selectedOffice.country}
                  </p>
                </div>
              </div>

              <div
                className={`space-y-4 text-[15px] pt-2 pl-10 mb-6 leading-6 ${isDark ? 'text-white/80' : 'text-[#30405A]'}`}
              >
                <div className="flex gap-6 mb-6">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#C9A24B]" />
                  <div>
                    {selectedOffice.address.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 mb-6">
                  <Phone className="mt-0.5 h-6 w-6 mb-2 shrink-0 text-[#C9A24B]" />
                  <span>{selectedOffice.phone}</span>
                </div>

                <div className="flex gap-6 mb-6">
                  <Mail className="mt-0.5 h-6 w-6 mb-2 shrink-0 text-[#C9A24B]" />
                  <span>{selectedOffice.email}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                      */
/* -------------------------------------------------------------------------- */

function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden pb-20 pt-32 lg:min-h-[680px] lg:pb-28 lg:pt-40"
      style={{ background: '#0B1E3D' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-global-offices.png"
          alt="Earth horizon representing TRYVION global presence"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-95 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="mb-12 flex items-center gap-2 text-[13px] font-semibold text-white/60">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
          <span>&gt;</span>
          <span className="text-white">Global Offices</span>
        </div>

        <Reveal delay={0.1}>
          <Eyebrow isDark={isDark}>GLOBAL OFFICES</Eyebrow>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="mb-8 max-w-[800px] font-sans text-[48px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[64px] lg:text-[72px]">
            Global expertise.
            <br />
            Local understanding.
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="max-w-[600px] text-[18px] leading-[1.6] text-white/80 sm:text-[20px]">
            Connect with TRYVION teams across the countries where we operate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FILTERS + MAP                                                              */
/* -------------------------------------------------------------------------- */

function FiltersAndMapSection({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  const [activeRegion, setActiveRegion] = useState<Region>('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeData | null>(null);

  const filteredOffices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return OFFICES.filter((office) => {
      const regionMatch = activeRegion === 'All Regions' || office.region === activeRegion;

      const searchMatch =
        !query ||
        office.city.toLowerCase().includes(query) ||
        office.country.toLowerCase().includes(query) ||
        office.address.join(' ').toLowerCase().includes(query);

      return regionMatch && searchMatch;
    });
  }, [activeRegion, searchQuery]);

  const selectOffice = (office: OfficeData) => {
    setSelectedOffice((current) => (current?.id === office.id ? null : office));
  };

  return (
    <section className="relative z-30 py-16 lg:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        {/* Search + filters */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className={`relative w-full lg:w-[340px] rounded-lg border ${
              isDark ? 'border-white/10 bg-white/5' : 'border-[#E2E6EB] bg-white'
            }`}
          >
            <Search
              className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder="Search country or city"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedOffice(null);
              }}
              className={`w-full rounded-lg bg-transparent py-3.5 p-10 pr-4 text-[15px] outline-none ${
                isDark ? 'text-white placeholder-gray-500' : 'text-[#0B1E3D] placeholder-gray-400'
              }`}
              aria-label="Search country or city"
            />
          </div>

          <div
            className="flex flex-wrap items-center justify-start gap-3 lg:justify-end"
            role="tablist"
            aria-label="Office regions"
          >
            {REGIONS.map((region) => {
              const active = activeRegion === region;

              return (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveRegion(region);
                    setSelectedOffice(null);
                  }}
                  className={`rounded-full border px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                    active
                      ? isDark
                        ? 'border-white bg-white text-[#07162C]'
                        : 'border-[#0B1E3D] bg-[#0B1E3D] text-white'
                      : isDark
                        ? 'border-white/10 bg-transparent text-gray-300 hover:border-white/30'
                        : 'border-[#E2E6EB] bg-white text-[#5F6875] hover:border-[#0B1E3D]/30'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className={`text-[13px] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}>
            {filteredOffices.length === OFFICES.length
              ? `Showing ${OFFICES.length} of ${OFFICES.length} offices`
              : `Showing ${filteredOffices.length} of ${OFFICES.length} offices`}
          </p>

          {selectedOffice && (
            <button
              type="button"
              onClick={() => setSelectedOffice(null)}
              className={`text-[13px] font-semibold ${isDark ? 'text-white/70' : 'text-[#1458F2]'}`}
            >
              Clear selection
            </button>
          )}
        </div>

        {/* Interactive SVG map */}
        <WorldMap
          isDark={isDark}
          offices={filteredOffices}
          selectedOffice={selectedOffice}
          onSelect={selectOffice}
        />

        {/* If a filter/search produces no offices */}
        {filteredOffices.length === 0 && (
          <div
            className={`mt-6 rounded-xl border p-10 text-center ${
              isDark ? 'border-white/10 bg-white/[.03]' : 'border-[#E2E6EB] bg-[#F8FAFC]'
            }`}
          >
            <Globe
              className={`mx-auto mb-4 h-9 w-9 ${isDark ? 'text-white/30' : 'text-[#0B1E3D]/25'}`}
            />
            <h3 className={`text-[20px] font-bold ${isDark ? 'text-white' : 'text-[#0B1E3D]'}`}>
              No office matches your search.
            </h3>
            <p className={`mt-2 text-[14px] ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}>
              Try another country, city or region.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* OFFICE CARDS                                                               */
/* -------------------------------------------------------------------------- */

function OfficeCardsGrid({ isDark }: { isDark: boolean }) {
  const t = isDark ? DARK : LIGHT;
  const [activeOfficeId, setActiveOfficeId] = useState<OfficeData['id'] | null>(null);

  return (
    <section id="office-list" className="py-16 lg:py-24" style={{ background: t.bg }}>
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2
            className={`text-[32px] font-extrabold tracking-tight sm:text-[40px] ${
              isDark ? 'text-white' : 'text-[#0B1E3D]'
            }`}
          >
            Our Offices
          </h2>
          <p className={`text-[15px] font-medium ${isDark ? 'text-gray-400' : 'text-[#5F6875]'}`}>
            Showing {OFFICES.length} of {OFFICES.length} offices
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-10">
          {OFFICES.map((office, idx) => {
            const active = activeOfficeId === office.id;

            return (
              <Reveal key={office.id} delay={idx * 0.1}>
                <article
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    active
                      ? isDark
                        ? 'border-[#C9A24B] shadow-[0_0_0_1px_rgba(201,162,75,.25)]'
                        : 'border-[#C9A24B] shadow-[0_0_0_1px_rgba(201,162,75,.20)]'
                      : isDark
                        ? 'border-white/10 bg-white/[.03]'
                        : 'border-[#E2E6EB] bg-white shadow-sm'
                  }`}
                >
                  <div className="relative h-[230px] w-full overflow-hidden">
                    <Image
                      src={office.image}
                      alt={`${office.city}, ${office.country} office`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-10 sm:p-10">
                    <div className="mb-6 flex items-start gap-6">
                      <span className="text-3xl leading-none" aria-hidden="true">
                        {office.flag}
                      </span>
                      <div>
                        <h3
                          className={`text-[22px] font-extrabold uppercase tracking-[.01em] ${
                            isDark ? 'text-white' : 'text-[#000000]'
                          }`}
                        >
                          {office.city}
                        </h3>
                        <p className={`text-[16px] ${isDark ? 'text-gray-400' : 'text-[#000000]'}`}>
                          {office.country}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`space-y-4 text-[16px] leading-[1.6] ${
                        isDark ? 'text-gray-300' : 'text-[#000000]'
                      }`}
                    >
                      <div className="flex gap-6 mb-6">
                        <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#C9A24B]" />
                        <div>
                          {office.address.map((line) => (
                            <div key={line}>{line}</div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-6">
                        <Phone className="h-6 w-6 shrink-0 text-[#C9A24B]" />
                        <span>{office.phone}</span>
                      </div>

                      <div className="flex items-center gap-6 mb-6">
                        <Mail className="h-6 w-6 shrink-0 text-[#C9A24B]" />
                        <span>{office.email}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveOfficeId((current) => (current === office.id ? null : office.id))
                      }
                      className={`mt-7 inline-flex items-center gap-2 text-[14px] font-bold transition ${
                        isDark
                          ? 'text-white hover:text-[#C9A24B]'
                          : 'text-[#1458F2] hover:text-[#0B1E3D]'
                      }`}
                    >
                      {active ? 'Selected on map' : 'Select on map'}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div
            className={`mt-10 flex flex-col items-center justify-between gap-8 rounded-xl p-8 sm:p-10 mb-10 md:flex-row ${
              isDark ? 'border border-white/10 bg-[#0B1E3D]' : 'bg-[#0B1E3D]'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10">
                <Users className="h-10 w-10 text-[#C9A24B]" />
              </div>
              <div>
                <h3 className="mb-2 gap-6 text-[20px] font-extrabold text-white sm:text-[24px]">
                  One team. Two locations. One connected vision.
                </h3>
                <p className="max-w-[560px] text-[15px] leading-relaxed text-white/70">
                  Wherever you are, our experts are ready to help you transform.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-6 rounded-lg border border-[#C9A24B] p-5 py-5 text-[15px] font-bold text-[#C9A24B] no-underline transition-all hover:bg-[#C9A24B] hover:text-[#0B1E3D]"
            >
              Contact Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>

        {/* Stats */}
        <div
          className={`mt-10 grid grid-cols-2 gap-6 border-t p-10 lg:grid-cols-4 lg:gap-12 ${
            isDark ? 'border-white/10' : 'border-[#E2E6EB]'
          }`}
        >
          {[
            {
              icon: Globe,
              value: '2',
              label: 'Countries',
              desc: 'Global presence across key markets',
            },
            {
              icon: MapPin,
              value: '2',
              label: 'Strategic Offices',
              desc: 'Located in India and the United Kingdom',
            },
            {
              icon: Users,
              value: '1000+',
              label: 'Experts',
              desc: 'Delivering value worldwide',
            },
            {
              icon: ShieldCheck,
              value: '',
              label: 'Trusted Partner',
              desc: 'Deep local understanding backed by global scale',
            },
          ].map((stat, idx) => (
            <Reveal
              key={stat.label}
              delay={idx * 0.1}
              className="flex items-start gap-6 mb-10 mt-10"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-[#F4F6F9]'
                }`}
              >
                <stat.icon
                  className={`h-10 w-10 ${isDark ? 'text-[#C9A24B]' : 'text-[#0B1E3D]'}`}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h4
                  className={`mb-1 text-[24px] font-extrabold ${
                    isDark ? 'text-white' : 'text-[#0B1E3D]'
                  }`}
                >
                  {stat.value || stat.label}
                </h4>
                {stat.value && (
                  <p
                    className={`mb-1 text-[15px] font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1E3D]'
                    }`}
                  >
                    {stat.label}
                  </p>
                )}
                <p
                  className={`text-[14px] leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-[#5F6875]'
                  }`}
                >
                  {stat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function GlobalOfficesPage() {
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
      className={`min-h-screen antialiased transition-colors duration-500 ${
        isDark ? 'bg-[#07162C] text-white' : 'bg-white text-[#0B1E3D]'
      }`}
    >
      <HeroSection isDark={isDark} />
      <FiltersAndMapSection isDark={isDark} />
      <OfficeCardsGrid isDark={isDark} />
    </main>
  );
}
