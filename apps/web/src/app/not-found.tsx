'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  GitBranch,
  Eye,
  PlayCircle,
  Sparkles,
  ChevronRight,
  Home,
  LayoutGrid,
  Layers,
  GraduationCap,
  FileText,
  Mail,
} from 'lucide-react';
import { useSiteTheme } from '@/providers/SiteThemeProvider';

const NotFoundPage = React.memo(function NotFoundPage() {
  const { theme } = useSiteTheme();

  // Custom Gold Gradient Utilities
  const goldGradient = 'bg-gradient-to-r from-[#C9A24B] to-[#E8C37D]';
  const goldTextGradient =
    'bg-clip-text text-transparent bg-gradient-to-r from-[#C9A24B] to-[#F0D080]';

  return (
    <div
      className={`min-h-screen ${theme === 'dark' ? 'bg-[#050814]' : 'bg-gray-50'} font-sans selection:bg-[#C9A24B]/30`}
    >
      {/* --- HERO SECTION --- */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden pb-16 md:pb-24"
        style={{
          paddingTop: 'calc(var(--header-height, 140px) + 2rem)',
          minHeight: 'max(85vh, calc(100vh - var(--header-height, 140px) + 2rem))',
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cosmic-gateway-at-dawn.png"
            alt="Cosmic Gateway"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle gradient to ensure text readability on the left while keeping image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050814]/90 via-[#050814]/40 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="max-w-2xl space-y-6">
            <p className="text-[#C9A24B] font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
              Page Not Found
            </p>

            <h1 className="text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] leading-none font-bold tracking-tighter text-white drop-shadow-2xl">
              4<span className={goldTextGradient}>0</span>4
            </h1>

            <div className="space-y-4 max-w-xl mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                We couldn't find this page.
                <br />
                <span className={goldTextGradient}>But opportunity is everywhere.</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                The page you're looking for may have moved, been deleted, or never existed. Let's
                get you back on the right path.
              </p>
            </div>

            <Link
              href="/"
              className={`inline-flex items-center gap-3 ${goldGradient} hover:brightness-110 text-black font-bold py-3.5 px-8 rounded-md transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,75,0.3)] group min-h-[52px] text-base mt-6`}
            >
              Go to Homepage
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- OUR BELIEF SECTION - RESTRUCTURED INTO 3 ROWS --- */}
      <section className="py-16 md:py-24 bg-[#050814]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col gap-12">
            {/* ROW 1: Center Aligned Content */}
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              <p className="text-[#C9A24B] font-semibold tracking-[0.15em] uppercase text-xs">
                Our Belief
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                The Future <span className={goldTextGradient}>Is a Choice.</span>
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                TRYVION helps organisations make the right choices today to create the future they
                want tomorrow.
              </p>
            </div>
            <br />

            {/* ROW 2: Icons Spread Equally Across Section */}
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-4">
                {[
                  { icon: GitBranch, title: 'Choice', desc: 'The defining decision.' },
                  { icon: Eye, title: 'Vision', desc: 'The foresight to see beyond.' },
                  { icon: PlayCircle, title: 'Momentum', desc: 'Continuous forward movement.' },
                  { icon: Sparkles, title: 'Future', desc: 'The future you choose to create.' },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center gap-4 group flex-1">
                      {/* Icon Circle */}
                      <div className="w-38 h-38 md:w-38 md:h-38 rounded-full border border-[#C9A24B]/30 flex items-center justify-center bg-[#050814] shadow-[0_0_20px_rgba(201,162,75,0.05)] group-hover:border-[#C9A24B]/60 transition-colors duration-300">
                        <item.icon
                          className="w-40 h-40 md:w-40 md:h-40 text-[#C9A24B]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base md:text-lg">{item.title}</h4>
                        <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-[140px] leading-snug mx-auto">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Connector Arrow (Hidden on mobile) */}
                    {index < 3 && (
                      <ChevronRight className="w-5 h-5 text-[#C9A24B]/40 hidden md:block shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p
                className="text-center italic text-base md:text-lg font-medium mt-10"
                style={{ color: '#C9A24B' }}
              >
                Transformation begins with a choice.
              </p>
            </div>

            {/* ROW 3: Button Positioned at Bottom Right */}
            <div className="w-full flex justify-end pt-4">
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-3 border border-[#C9A24B]/50 text-[#C9A24B] hover:bg-[#C9A24B]/10 font-semibold py-3.5 px-8 rounded-md transition-all duration-300 min-h-[52px] text-sm md:text-base"
              >
                Explore Our Ideology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION GRID --- */}
      <section className="py-16 md:py-24 bg-[#050814]">
        <div className="container mx-auto px-6 lg:px-12">
          <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mb-12 md:mb-16 tracking-wide text-white uppercase">
            Where would you like to go?
          </h3>

          {/* Small gold underline below title */}
          <div className="w-12 h-0.5 bg-[#C9A24B] mx-auto -mt-10 mb-12 md:-mt-12 md:mb-16"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { icon: Home, label: 'Home', desc: 'Return to the homepage.', href: '/' },
              {
                icon: LayoutGrid,
                label: 'Services',
                desc: 'Explore our integrated capabilities.',
                href: '/services',
              },
              {
                icon: Layers,
                label: 'Industries',
                desc: 'Discover solutions for your industry.',
                href: '/industries',
              },
              {
                icon: GraduationCap,
                label: 'Academy',
                desc: 'Learn. Grow. Lead the future.',
                href: '/services/academy',
              },
              {
                icon: FileText,
                label: 'Insights',
                desc: 'Explore ideas and perspectives.',
                href: '/insights',
              },
              {
                icon: Mail,
                label: 'Contact Us',
                desc: "Let's start a conversation.",
                href: '/contact',
              },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group flex flex-col items-center text-center p-6 rounded-xl border border-white/5 bg-[#0a0f1e] hover:border-[#C9A24B]/30 hover:bg-[#0d1424] transition-all duration-300 min-h-[220px] justify-center"
              >
                {/* Fixed Icon Size: Standard Corporate Size (40px) */}
                <link.icon
                  className="w-10 h-10 text-[#C9A24B] mb-5 group-hover:scale-110 transition-transform"
                  strokeWidth={1.2}
                />

                <h4 className="font-bold text-white text-base mb-2">{link.label}</h4>
                <p className="text-xs text-gray-400 mb-5 line-clamp-2 leading-relaxed px-2">
                  {link.desc}
                </p>

                {/* Small arrow at bottom of card */}
                <ArrowRight className="w-4 h-4 text-[#C9A24B] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA BANNER --- */}
      <section className="py-12 md:py-16 bg-[#050814] pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Mountain Graphic Placeholder */}
            <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-3/4 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M0 100 L40 40 L70 70 L110 20 L150 60 L200 100 Z"
                  fill="none"
                  stroke="#C9A24B"
                  strokeWidth="1"
                />
                <circle cx="40" cy="40" r="3" fill="#C9A24B" />
                <path
                  d="M40 40 Q60 80 80 50 T120 70"
                  fill="none"
                  stroke="#C9A24B"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Every path leads somewhere.
              </h3>
              <p className="text-xl md:text-2xl font-medium mt-2" style={{ color: '#C9A24B' }}>
                Let's build what comes next.
              </p>
            </div>

            <Link
              href="/contact"
              className={`relative z-10 inline-flex items-center gap-3 ${goldGradient} hover:brightness-110 text-black font-bold py-3.5 px-8 rounded-md transition-all duration-300 whitespace-nowrap shadow-[0_4px_20px_rgba(201,162,75,0.3)] min-h-[52px] text-base`}
            >
              Talk to an Expert
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

export default NotFoundPage;
