'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as RMouseEvent,
} from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { TryvionLogo } from '@tryvion/ui';
import { useSiteTheme } from '@/providers/SiteThemeProvider';
import {
  UTILITY_LEFT,
  ABOUT_LINKS,
  SERVICES_GROUPS,
  INDUSTRY_LINKS,
  CAREERS_LINKS,
  CONTACT_COLUMNS,
  POPULAR_SEARCHES,
  RECENT_PAGES,
  SEARCH_INDEX,
} from './NavData';

/* ─────────────────────────────────────────────────────────────────
   ScrollHeader — Bain-style enterprise header for TRYVION.
   • Idle over hero: transparent, white labels & white toggle icon.
   • Cursor near top / scroll / panels open: solid surface, dark labels.
   • Toggle (hamburger) on the RIGHT opens a FULL-SCREEN drawer that
     slides RIGHT → LEFT. Mirrored McKinsey layout: dark nav rail on
     the RIGHT, sub-link content panel on the LEFT. The heading arrow
     inside the content panel keeps pointing RIGHT (→) as designed.
   • GLOBAL | ENGLISH opens the region/language panel — selecting a
     language translates the page via Google Translate.
   • OFFICES opens the offices panel (India & UK under continents).
   • Hover colour everywhere = Content/Accent (text-safe Choice Gold),
     the same gold used by the main menu hover.
───────────────────────────────────────────────────────────────── */

const UTILITY_H = 36;
const HEADER_H = 80; /* Layout/Header/Height/Desktop */

/* ── Region & language data (Google Translate codes) ── */
interface LangItem {
  flag: string;
  name: string;
  lang: string;
  code: string;
}
const LANG_GROUPS: { heading: string; items: LangItem[] }[] = [
  { heading: 'Global', items: [{ flag: '🌐', name: 'Global', lang: 'English', code: 'en' }] },
  {
    heading: 'North & Latin America',
    items: [
      { flag: '🇧🇷', name: 'Brazil', lang: 'Português', code: 'pt' },
      { flag: '🇦🇷', name: 'Argentina', lang: 'Español', code: 'es' },
      { flag: '🇨🇦', name: 'Canada', lang: 'Français', code: 'fr' },
      { flag: '🇨🇱', name: 'Chile', lang: 'Español', code: 'es' },
      { flag: '🇨🇴', name: 'Colombia', lang: 'Español', code: 'es' },
    ],
  },
  {
    heading: 'Europe, Middle East, & Africa',
    items: [
      { flag: '🇫🇷', name: 'France', lang: 'Français', code: 'fr' },
      { flag: '🇩🇪', name: 'DACH Region', lang: 'Deutsch', code: 'de' },
      { flag: '🇮🇹', name: 'Italy', lang: 'Italiano', code: 'it' },
      { flag: '🇪🇸', name: 'Spain', lang: 'Español', code: 'es' },
      { flag: '🇬🇷', name: 'Greece', lang: 'Elliniká', code: 'el' },
    ],
  },
  {
    heading: 'Asia & Australia',
    items: [
      { flag: '🇨🇳', name: 'China', lang: '中文版', code: 'zh-CN' },
      { flag: '🇰🇷', name: 'Korea', lang: '한국어', code: 'ko' },
      { flag: '🇯🇵', name: 'Japan', lang: '日本語', code: 'ja' },
    ],
  },
];

/* ── Offices data — continents on top, India & UK for now ── */
const OFFICE_GROUPS: { heading: string; offices: { city: string; country: string }[] }[] = [
  {
    heading: 'Asia',
    offices: [
      { city: 'Bengaluru', country: 'India' },
      { city: 'Mumbai', country: 'India' },
      { city: 'New Delhi', country: 'India' },
    ],
  },
  {
    heading: 'Europe',
    offices: [{ city: 'London', country: 'United Kingdom' }],
  },
];

/* ── Drawer sections (right rail → left content panel) ── */
interface DrawerCol {
  heading?: string;
  links: { label: string; href: string }[];
}
interface DrawerSection {
  key: string;
  label: string;
  href: string;
  columns: DrawerCol[];
}
const DRAWER_SECTIONS: DrawerSection[] = [
  {
    key: 'industries',
    label: 'Industries',
    href: '/industries',
    columns: [{ links: INDUSTRY_LINKS }],
  },
  {
    key: 'services',
    label: 'Services',
    href: '/services',
    columns: SERVICES_GROUPS.map((g) => ({ heading: g.heading, links: g.links })),
  },
  {
    key: 'ai',
    label: 'Tryvion AI',
    href: '/services/ai',
    columns: [{ links: SERVICES_GROUPS[1].links }],
  },
  {
    key: 'insights',
    label: 'Our Insights',
    href: '/insights',
    columns: [
      {
        links: [
          { label: 'All Insights', href: '/insights' },
          { label: 'Enterprise Strategy', href: '/insights/strategy' },
          { label: 'Tryvion AI', href: '/insights/ai' },
          { label: 'Talent & Academy', href: '/insights/talent' },
        ],
      },
    ],
  },
  { key: 'about', label: 'About Us', href: '/about', columns: [{ links: ABOUT_LINKS }] },
  {
    key: 'careers',
    label: 'Careers',
    href: '/careers',
    columns: [{ links: [...CAREERS_LINKS, { label: 'View Open Roles', href: '/careers/roles' }] }],
  },
  { key: 'contact', label: 'Contact', href: '/contact', columns: CONTACT_COLUMNS },
];

/* ── Google Translate bootstrap ── */
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}
function ensureTranslateAssets() {
  if (!document.getElementById('google_translate_element')) {
    const d = document.createElement('div');
    d.id = 'google_translate_element';
    d.style.display = 'none';
    document.body.appendChild(d);
  }
  if (!document.getElementById('gt_hide_style')) {
    const st = document.createElement('style');
    st.id = 'gt_hide_style';
    st.textContent =
      '.goog-te-banner-frame,.skiptranslate{display:none!important}body{top:0!important}';
    document.head.appendChild(st);
  }
}
function loadGoogleTranslate(): Promise<void> {
  return new Promise((resolve) => {
    ensureTranslateAssets();
    if (window.google?.translate?.TranslateElement) return resolve();
    window.googleTranslateElementInit = () => resolve();
    if (!document.getElementById('google_translate_script')) {
      const s = document.createElement('script');
      s.id = 'google_translate_script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(s);
    }
  });
}

/* ── Icons ─ */
function Caret({ open, size = 9 }: { open?: boolean; size?: number }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        transition: 'transform var(--motion-duration-fast) var(--motion-easing-standard)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 16, height: 16 }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ArrowRight({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <path d="M3 12h16M13 6l6 6-6 6" />
    </svg>
  );
}
function SearchIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function GlobeIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 13, height: 13 }}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 18, height: 18 }}
    >
      <path d="M6 3h12v18l-6-4.5L6 21V3z" />
    </svg>
  );
}
function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
function HistoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 20, height: 20 }}
    >
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l3.5 3.5" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 15, height: 15 }}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.2-3.6 4.3-5.5 8-5.5s6.8 1.9 8 5.5" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 15, height: 15 }}
    >
      <path d="M3 5h18v14H3V5z" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export interface ScrollHeaderProps {
  /** When set, overrides the user's Light/Dark preference for this page only */
  theme?: 'dark' | 'light';
}

export function ScrollHeader({ theme: themeProp }: ScrollHeaderProps) {
  const router = useRouter();
  const { theme: contextTheme, setTheme } = useSiteTheme();
  const resolvedTheme = themeProp ?? contextTheme;
  const isDark = resolvedTheme === 'dark';

  const [scrolled, setScrolled] = useState(false);
  const [nearTop, setNearTop] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [utilPanel, setUtilPanel] = useState<'offices' | 'lang' | null>(null);
  const [activeLang, setActiveLang] = useState('en');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState('industries');

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const gtInitRef = useRef(false);

  /* scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* cursor proximity → header wakes up (colours only, no layout shift) */
  useEffect(() => {
    const onMove = (e: MouseEvent) => setNearTop(e.clientY < UTILITY_H + HEADER_H + 48);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* escape closes everything */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setSearchOpen(false);
        setUtilPanel(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* lock scroll while the full-screen drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  /* focus the search field once the slide-in finishes */
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const openMenu = useCallback((key: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setActiveMenu(key), 80);
  }, []);
  const scheduleClose = useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 180);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);
  const closeAll = useCallback(() => {
    setActiveMenu(null);
    setSearchOpen(false);
    setQuery('');
    setUtilPanel(null);
  }, []);

  /* Google Translate — apply language on click */
  const applyLanguage = useCallback(async (code: string) => {
    setActiveLang(code);
    await loadGoogleTranslate();
    const w = window as any;
    if (w.google?.translate?.TranslateElement && !gtInitRef.current) {
      gtInitRef.current = true;
      new w.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element',
      );
    }
    let tries = 24;
    const pick = () => {
      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        if (combo.value !== code) {
          combo.value = code;
          combo.dispatchEvent(new Event('change'));
        }
      } else if (tries-- > 0) {
        setTimeout(pick, 250);
      }
    };
    pick();
    setUtilPanel(null);
  }, []);

  /* transparent while idle over the hero; solid on approach / scroll / open */
  const solid =
    scrolled || nearTop || activeMenu !== null || searchOpen || utilPanel !== null || drawerOpen;

  /* token-driven colour roles for both header states */
  const cPrimary = solid ? 'var(--content-primary)' : '#FFFFFF';
  const cSecondary = solid ? 'var(--content-secondary)' : 'rgba(255,255,255,0.72)';
  const cFaint = solid ? 'var(--content-tertiary)' : 'rgba(255,255,255,0.55)';
  const headerBg = solid ? 'var(--nav-header-background-default)' : 'transparent';
  const headerBorder = solid ? 'var(--nav-header-border)' : 'rgba(255,255,255,0.16)';
  const headerShadow = scrolled && solid ? 'var(--elevation-02)' : 'var(--elevation-00)';
  const panelTop = scrolled ? HEADER_H : UTILITY_H + HEADER_H;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((e) => (e.label + ' ' + e.group).toLowerCase().includes(q)).slice(
      0,
      8,
    );
  }, [query]);

  /* ── shared styles ── */
  const navItem = (active: boolean): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    height: '100%',
    padding: '0 14px',
    fontFamily: 'var(--family-text)',
    fontSize: 'var(--size-label-large)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-label)',
    whiteSpace: 'nowrap',
    background: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: active ? '2px solid var(--nav-header-item-indicator)' : '2px solid transparent',
    color: active
      ? solid
        ? 'var(--content-accent)'
        : 'var(--brand-accent)'
      : solid
        ? 'var(--nav-header-item-label-default)'
        : '#FFFFFF',
    cursor: 'pointer',
    textDecoration: 'none',
    transition:
      'color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)',
  });
  const panelShell: CSSProperties = {
    background: 'var(--nav-mega-menu-surface)',
    borderRadius: '0 0 var(--nav-mega-menu-radius) var(--nav-mega-menu-radius)',
    boxShadow: 'var(--nav-mega-menu-shadow)',
    borderTop: 'none',
    borderLeft: '1px solid var(--nav-mega-menu-border)',
    borderRight: '1px solid var(--nav-mega-menu-border)',
    borderBottom: '6px solid var(--brand-accent)',
    padding: '2.5rem 3rem 3rem',
  };
  const panelHeading: CSSProperties = {
    fontFamily: 'var(--family-display)',
    fontSize: 'var(--size-h4)',
    lineHeight: 'var(--line-height-h4)',
    fontWeight: 600,
    letterSpacing: 'var(--tracking-h4)',
    color: 'var(--content-primary)',
    margin: '0 0 2rem',
  };
  const groupHead: CSSProperties = {
    display: 'block',
    fontFamily: 'var(--family-text)',
    fontSize: 'var(--size-label-small)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--content-accent)',
    textDecoration: 'none',
    marginBottom: '0.875rem',
  };
  const panelLink: CSSProperties = {
    display: 'block',
    padding: '0.4375rem 0',
    fontSize: 'var(--size-label-large)',
    lineHeight: 'var(--line-height-label-large)',
    fontWeight: 500,
    color: 'var(--menu-item-label)',
    textDecoration: 'none',
    transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
  };
  /* gold hover — same as the main menu hover */
  const linkHover = {
    onMouseEnter: (e: RMouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.color = 'var(--content-accent)';
    },
    onMouseLeave: (e: RMouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.color = 'var(--menu-item-label)';
    },
  };
  const panelContainer = (id: string): CSSProperties => ({
    position: 'fixed',
    top: panelTop,
    left: 0,
    right: 0,
    zIndex: 45,
    opacity: activeMenu === id ? 1 : 0,
    transform: activeMenu === id ? 'translateY(0)' : 'translateY(-8px)',
    pointerEvents: activeMenu === id ? 'auto' : 'none',
    transition:
      'opacity var(--motion-duration-default) var(--motion-easing-standard), transform var(--motion-duration-default) var(--motion-easing-standard)',
  });

  const NAV: {
    key: string;
    label: string;
    hasPanel: boolean;
    href: string;
  }[] = [
    {
      key: 'about',
      label: 'About',
      hasPanel: true,
      href: '/about',
    },
    {
      key: 'services',
      label: 'Services',
      hasPanel: true,
      href: '/services',
    },
    {
      key: 'industries',
      label: 'Industries',
      hasPanel: true,
      href: '/industries',
    },
    {
      key: 'careers',
      label: 'Careers',
      hasPanel: true,
      href: '/careers',
    },
    {
      key: 'contact',
      label: 'Contact',
      hasPanel: true,
      href: '/contact',
    },
  ];

  const activeDrawer = DRAWER_SECTIONS.find((s) => s.key === drawerSection) ?? DRAWER_SECTIONS[0];

  return (
    <>
      {/* ═══ HEADER WRAPPER — fixed, transparent until approached ═══ */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 /* Z/Sticky */ }}>
        {/* ── Utility bar — collapses on scroll, identical layout in both states ── */}
        <div
          style={{
            height: scrolled ? 0 : UTILITY_H,
            opacity: scrolled ? 0 : 1,
            overflow: 'visible',
            background: headerBg,
            borderBottom: solid
              ? '1px solid var(--nav-header-border)'
              : '1px solid rgba(255,255,255,0.14)',
            transition:
              'height var(--motion-duration-moderate) var(--motion-easing-standard), opacity var(--motion-duration-default) var(--motion-easing-standard), background var(--motion-duration-default) var(--motion-easing-standard), border-color var(--motion-duration-default) var(--motion-easing-standard)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--layout-content-wide)',
              margin: '0 auto',
              height: UTILITY_H,
              padding: '0 clamp(1.25rem,4vw,2.5rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {/* Left: corporate links — Offices opens the offices panel */}
            <nav
              aria-label="Corporate navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                minWidth: 0,
                overflow: 'visible',
              }}
            >
              {UTILITY_LEFT.map((u, i) =>
                i === 0 ? (
                  <button
                    key={u.label}
                    type="button"
                    aria-expanded={utilPanel === 'offices'}
                    onClick={() => setUtilPanel(utilPanel === 'offices' ? null : 'offices')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color:
                        utilPanel === 'offices'
                          ? solid
                            ? 'var(--content-accent)'
                            : 'var(--brand-accent)'
                          : cSecondary,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    {u.label}
                    <Caret open={utilPanel === 'offices'} />
                  </button>
                ) : (
                  <NextLink
                    key={u.label}
                    href={u.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: cSecondary,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {u.label}
                  </NextLink>
                ),
              )}
            </nav>

            {/* Right: locale · theme toggle · saved items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexShrink: 0 }}>
              <button
                type="button"
                aria-expanded={utilPanel === 'lang'}
                onClick={() => setUtilPanel(utilPanel === 'lang' ? null : 'lang')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color:
                    utilPanel === 'lang'
                      ? solid
                        ? 'var(--content-accent)'
                        : 'var(--brand-accent)'
                      : cSecondary,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <GlobeIcon />
                <span>Global | English</span>
                <Caret open={utilPanel === 'lang'} />
              </button>

              <span
                aria-hidden="true"
                style={{
                  width: 1,
                  height: 14,
                  background: solid ? 'var(--border-default)' : 'rgba(255,255,255,0.25)',
                  flexShrink: 0,
                }}
              />

              {/* Light / Dark segmented toggle */}
              <div
                role="group"
                aria-label="Choose colour theme"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: solid ? 'var(--surface-sunken)' : 'rgba(255,255,255,0.14)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '2px',
                  gap: '2px',
                  flexShrink: 0,
                }}
              >
                {(['Light', 'Dark'] as const).map((lbl) => {
                  const val = lbl.toLowerCase() as 'light' | 'dark';
                  const selected = resolvedTheme === val;
                  return (
                    <button
                      key={lbl}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        if (!themeProp) setTheme(val);
                      }}
                      style={{
                        height: '20px',
                        padding: '0 9px',
                        borderRadius: '2px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        background: selected
                          ? solid
                            ? 'var(--action-primary-default)'
                            : '#FFFFFF'
                          : 'transparent',
                        color: selected
                          ? solid
                            ? 'var(--action-primary-on-action)'
                            : 'var(--ink-950)'
                          : cFaint,
                        transition:
                          'background var(--motion-duration-fast) var(--motion-easing-standard), color var(--motion-duration-fast) var(--motion-easing-standard)',
                      }}
                    >
                      {lbl}
                    </button>
                  );
                })}
              </div>

              <span
                aria-hidden="true"
                style={{
                  width: 1,
                  height: 14,
                  background: solid ? 'var(--border-default)' : 'rgba(255,255,255,0.25)',
                  flexShrink: 0,
                }}
              />

              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: cSecondary,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <FolderIcon />
                <span>Saved items</span>
                <Caret />
              </button>
            </div>

            {/* ═══ OFFICES PANEL — continents on top, India & UK ═══ */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 'calc(-1 * clamp(1.25rem,4vw,2.5rem))',
                right: 'calc(-1 * clamp(1.25rem,4vw,2.5rem))',
                background: 'var(--surface-default)',
                borderBottom: '1px solid var(--border-subtle)',
                boxShadow: 'var(--elevation-03)',
                opacity: utilPanel === 'offices' ? 1 : 0,
                transform: utilPanel === 'offices' ? 'translateY(0)' : 'translateY(-6px)',
                pointerEvents: utilPanel === 'offices' ? 'auto' : 'none',
                transition:
                  'opacity var(--motion-duration-default) var(--motion-easing-standard), transform var(--motion-duration-default) var(--motion-easing-standard)',
                zIndex: 59,
              }}
            >
              <div
                style={{
                  maxWidth: 'var(--layout-content-wide)',
                  margin: '0 auto',
                  padding: '2.5rem clamp(1.25rem,4vw,2.5rem) 3rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--content-primary)',
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    Offices
                  </h2>
                  <button
                    type="button"
                    onClick={() => setUtilPanel(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--content-secondary)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--content-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--content-secondary)';
                    }}
                  >
                    Close <CloseIcon size={16} />
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
                    gap: '2.5rem',
                  }}
                >
                  {OFFICE_GROUPS.map((g) => (
                    <div
                      key={g.heading}
                      style={{
                        borderLeft: '1px solid var(--border-subtle)',
                        paddingLeft: '1.5rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0 0 1rem',
                        }}
                      >
                        {g.heading}
                      </h3>
                      {g.offices.map((o) => (
                        <NextLink
                          key={o.city}
                          href="/about/locations"
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.625rem',
                            padding: '0.5rem 0',
                            fontSize: '0.9375rem',
                            color: 'var(--content-primary)',
                            textDecoration: 'none',
                            transition:
                              'color var(--motion-duration-fast) var(--motion-easing-standard)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--content-accent)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--content-primary)';
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{o.country}</span>
                          <span style={{ color: 'var(--content-tertiary)' }}>— {o.city}</span>
                        </NextLink>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ REGION & LANGUAGE PANEL — Google Translate on select ═══ */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 'calc(-1 * clamp(1.25rem,4vw,2.5rem))',
                right: 'calc(-1 * clamp(1.25rem,4vw,2.5rem))',
                background: 'var(--surface-default)',
                borderBottom: '1px solid var(--border-subtle)',
                boxShadow: 'var(--elevation-03)',
                opacity: utilPanel === 'lang' ? 1 : 0,
                transform: utilPanel === 'lang' ? 'translateY(0)' : 'translateY(-6px)',
                pointerEvents: utilPanel === 'lang' ? 'auto' : 'none',
                transition:
                  'opacity var(--motion-duration-default) var(--motion-easing-standard), transform var(--motion-duration-default) var(--motion-easing-standard)',
                zIndex: 59,
              }}
            >
              <div
                style={{
                  maxWidth: 'var(--layout-content-wide)',
                  margin: '0 auto',
                  padding: '2.5rem clamp(1.25rem,4vw,2.5rem) 3rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--content-primary)',
                      letterSpacing: '-0.01em',
                      margin: 0,
                    }}
                  >
                    Select your region and language
                  </h2>
                  <button
                    type="button"
                    onClick={() => setUtilPanel(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--content-secondary)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--content-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--content-secondary)';
                    }}
                  >
                    Close <CloseIcon size={16} />
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
                    gap: '2.5rem',
                  }}
                >
                  {LANG_GROUPS.map((g) => (
                    <div
                      key={g.heading}
                      style={{
                        borderLeft: '1px solid var(--border-subtle)',
                        paddingLeft: '1.5rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--content-primary)',
                          margin: '0 0 1rem',
                        }}
                      >
                        {g.heading}
                      </h3>
                      {g.items.map((it) => (
                        <button
                          key={it.name}
                          type="button"
                          onClick={() => applyLanguage(it.code)}
                          aria-pressed={activeLang === it.code}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            padding: '0.5rem 0',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.9375rem',
                            color: 'var(--content-primary)',
                            transition:
                              'color var(--motion-duration-fast) var(--motion-easing-standard)',
                            fontFamily: 'var(--family-text)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--content-accent)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--content-primary)';
                          }}
                        >
                          <span aria-hidden="true" style={{ fontSize: '1rem' }}>
                            {it.flag}
                          </span>
                          <span style={{ fontWeight: 600 }}>{it.name}</span>
                          <span style={{ color: 'var(--content-tertiary)' }}>({it.lang})</span>
                          {activeLang === it.code && (
                            <span style={{ color: 'var(--content-accent)', fontWeight: 700 }}>
                              ✓
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main header bar ── */}
        <header
          style={{
            height: HEADER_H,
            background: headerBg,
            backdropFilter: solid ? 'blur(var(--nav-header-blur))' : 'none',
            WebkitBackdropFilter: solid ? 'blur(var(--nav-header-blur))' : 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: `1px solid ${headerBorder}`,
            boxShadow: headerShadow,
            transition:
              'background var(--motion-duration-moderate) var(--motion-easing-standard), border-color var(--motion-duration-moderate) var(--motion-easing-standard), box-shadow var(--motion-duration-moderate) var(--motion-easing-standard)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--layout-content-wide)',
              margin: '0 auto',
              padding: '0 clamp(1.25rem,4vw,2.5rem)',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {/* Logo */}
            <NextLink
              href="/"
              aria-label="TRYVION — Return to homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  filter: solid ? 'none' : 'brightness(0) invert(1)',
                  transition: 'filter var(--motion-duration-default) var(--motion-easing-standard)',
                }}
              >
                <TryvionLogo height={40} variant={isDark ? 'dark' : 'light'} />
              </span>
            </NextLink>

            {/* Nav ↔ Search crossfade/slide region */}
            <div style={{ position: 'relative', flex: 1, height: '100%', minWidth: 0 }}>
              {/* Layer 1 — primary nav + right actions (slides out left) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '1.5rem',
                  transform: searchOpen ? 'translateX(-32px)' : 'translateX(0)',
                  opacity: searchOpen ? 0 : 1,
                  pointerEvents: searchOpen ? 'none' : 'auto',
                  transition:
                    'transform var(--motion-duration-moderate) var(--motion-easing-emphasized), opacity var(--motion-duration-default) var(--motion-easing-standard)',
                }}
              >
                <nav
                  aria-label="Primary navigation"
                  style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'stretch' }}
                  onMouseLeave={scheduleClose}
                >
                  {NAV.map(({ key, label, hasPanel, href }) => {
                    const active = activeMenu === key;
                    if (!hasPanel && href) {
                      return (
                        <NextLink
                          key={key}
                          href={href}
                          style={navItem(false)}
                          onMouseEnter={scheduleClose}
                        >
                          {label}
                        </NextLink>
                      );
                    }
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-expanded={active}
                        aria-haspopup="true"
                        style={navItem(active)}
                        onMouseEnter={() => openMenu(key)}
                        onClick={() => {
                          if (href) {
                            setActiveMenu(null);
                            router.push(href);
                          } else {
                            setActiveMenu(active ? null : key);
                          }
                        }}
                      >
                        {label}
                        <Caret open={active} size={11} />
                      </button>
                    );
                  })}
                </nav>

                {/* Right actions — toggle (hamburger) stays on the RIGHT */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1.125rem', flexShrink: 0 }}
                >
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: cSecondary,
                      fontSize: 'var(--size-label-large)',
                      fontWeight: 500,
                      padding: 0,
                    }}
                  >
                    Explore
                  </button>
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={() => setSearchOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: cPrimary,
                      display: 'flex',
                      padding: 4,
                    }}
                  >
                    <SearchIcon />
                  </button>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 20,
                      background: solid ? 'var(--border-default)' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Saved items"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: cPrimary,
                      display: 'flex',
                      padding: 4,
                    }}
                  >
                    <BookmarkIcon />
                  </button>
                  {/* Toggle icon: white when transparent, dark when solid */}
                  <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={drawerOpen}
                    onClick={() => setDrawerOpen(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: cPrimary,
                      display: 'flex',
                      padding: 4,
                      marginLeft: '0.25rem',
                      transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      aria-hidden="true"
                      style={{ width: 22, height: 22 }}
                    >
                      <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Layer 2 — search takeover (slides in from the right, covers the nav) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transform: searchOpen ? 'translateX(0)' : 'translateX(60px)',
                  opacity: searchOpen ? 1 : 0,
                  pointerEvents: searchOpen ? 'auto' : 'none',
                  transition:
                    'transform var(--motion-duration-moderate) var(--motion-easing-emphasized), opacity var(--motion-duration-default) var(--motion-easing-standard)',
                }}
              >
                <span
                  style={{ color: 'var(--content-link-default)', display: 'flex', flexShrink: 0 }}
                >
                  <SearchIcon size={20} />
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search insights, services, and experts"
                  aria-label="Search TRYVION"
                  style={{
                    flex: 1,
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    color: 'var(--content-primary)',
                    fontFamily: 'var(--family-text)',
                    fontSize: 'var(--size-body-large)',
                    fontWeight: 400,
                    minWidth: 0,
                  }}
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--content-tertiary)',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: 8,
                    flexShrink: 0,
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ═══ BACKDROP ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--translucency-scrim-light)',
          zIndex: 40,
          opacity: activeMenu || searchOpen ? 1 : 0,
          pointerEvents: activeMenu || searchOpen ? 'auto' : 'none',
          transition: 'opacity var(--motion-duration-default) var(--motion-easing-standard)',
        }}
        onClick={closeAll}
        onMouseEnter={scheduleClose}
      />

      {/* ═══ ABOUT PANEL ═══ */}
      <div style={panelContainer('about')} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={panelShell}>
            <h2 style={panelHeading}>About</h2>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '3rem' }}
            >
              {ABOUT_LINKS.map((l) => (
                <NextLink key={l.href} href={l.href} style={panelLink} {...linkHover}>
                  {l.label}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SERVICES PANEL ═══ */}
      <div
        style={panelContainer('services')}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={panelShell}>
            <h2 style={panelHeading}>Services</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                columnGap: '3rem',
                rowGap: '2rem',
              }}
            >
              {SERVICES_GROUPS.slice(0, 3).map((g) => (
                <div key={g.heading}>
                  <NextLink href={g.href} style={groupHead}>
                    {g.heading}
                  </NextLink>
                  {g.links.map((l) => (
                    <NextLink key={l.href} href={l.href} style={panelLink} {...linkHover}>
                      {l.label}
                    </NextLink>
                  ))}
                </div>
              ))}
              <div>
                {SERVICES_GROUPS.slice(3).map((g) => (
                  <div key={g.heading} style={{ marginBottom: '1.25rem' }}>
                    <NextLink href={g.href} style={groupHead}>
                      {g.heading}
                    </NextLink>
                    {g.links.map((l) => (
                      <NextLink key={l.href} href={l.href} style={panelLink} {...linkHover}>
                        {l.label}
                      </NextLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ INDUSTRIES PANEL ═══ */}
      <div
        style={panelContainer('industries')}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={panelShell}>
            <h2 style={panelHeading}>Industries</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                columnGap: '3rem',
                rowGap: '0.25rem',
              }}
            >
              {INDUSTRY_LINKS.map((l) => (
                <NextLink key={l.label} href={l.href} style={panelLink} {...linkHover}>
                  {l.label}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CAREERS PANEL ═══ */}
      <div
        style={panelContainer('careers')}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={panelShell}>
            <h2 style={panelHeading}>Careers</h2>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '3rem' }}
            >
              <div>
                {CAREERS_LINKS.map((l) => (
                  <NextLink key={l.href} href={l.href} style={panelLink} {...linkHover}>
                    {l.label}
                  </NextLink>
                ))}
                <NextLink
                  href="/careers"
                  style={{ ...panelLink, color: 'var(--content-link-default)', fontWeight: 700 }}
                  {...linkHover}
                >
                  View all careers →
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTACT PANEL ═══ */}
      <div
        style={panelContainer('contact')}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={panelShell}>
            <h2 style={panelHeading}>Contact</h2>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '3rem' }}
            >
              {CONTACT_COLUMNS.map((col) => (
                <div key={col.heading}>
                  <span style={groupHead}>{col.heading}</span>
                  {col.links.map((l) => (
                    <NextLink key={l.href} href={l.href} style={panelLink} {...linkHover}>
                      {l.label}
                    </NextLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SEARCH PANEL ═══ */}
      <div
        style={{
          position: 'fixed',
          top: panelTop,
          left: 0,
          right: 0,
          zIndex: 45,
          opacity: searchOpen ? 1 : 0,
          transform: searchOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: searchOpen ? 'auto' : 'none',
          transition:
            'opacity var(--motion-duration-default) var(--motion-easing-standard), transform var(--motion-duration-default) var(--motion-easing-standard)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem,4vw,2.5rem)',
          }}
        >
          <div style={{ ...panelShell, minHeight: 320 }}>
            {query.trim() ? (
              results.length ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {results.map((r) => (
                    <NextLink
                      key={r.href}
                      href={r.href}
                      style={{
                        ...panelLink,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.625rem 0',
                      }}
                      {...linkHover}
                    >
                      <span style={{ flex: 1 }}>{r.label}</span>
                      <span
                        style={{
                          fontSize: 'var(--size-caption)',
                          color: 'var(--content-tertiary)',
                        }}
                      >
                        {r.group}
                      </span>
                    </NextLink>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    fontFamily: 'var(--family-text)',
                    fontSize: 'var(--size-body)',
                    color: 'var(--content-secondary)',
                    padding: '1rem 0',
                    margin: 0,
                  }}
                >
                  No results for “{query}”. Try “SAP S/4HANA”, “AI” or “Talent”.
                </p>
              )
            ) : (
              <>
                <span style={{ ...groupHead, color: 'var(--content-tertiary)' }}>
                  Popular Searches
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem' }}>
                  {POPULAR_SEARCHES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setQuery(p)}
                      style={{
                        ...panelLink,
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--family-text)',
                        fontSize: 'var(--size-body)',
                        lineHeight: 'var(--line-height-body)',
                        padding: '0.625rem 0',
                        color: 'var(--menu-item-label)',
                      }}
                      {...linkHover}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                  <span style={{ ...groupHead, color: 'var(--content-tertiary)' }}>
                    Recently Visited Pages
                  </span>
                  {RECENT_PAGES.map((r) => (
                    <NextLink
                      key={r.href}
                      href={r.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.5rem 0',
                        textDecoration: 'none',
                      }}
                    >
                      <span
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 'var(--radius-xs)',
                          background: 'var(--surface-sunken)',
                          color: 'var(--content-tertiary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <HistoryIcon />
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--size-body)',
                          fontWeight: 600,
                          color: 'var(--content-primary)',
                        }}
                      >
                        {r.label}
                      </span>
                    </NextLink>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          FULL-SCREEN DRAWER — slides RIGHT → LEFT (mirrored layout)
          • RIGHT rail: dark navy, logo + close on top, main nav list
            (labels right, chevrons left), Sign In / Subscriptions below.
          • LEFT panel: light surface, heading + RIGHT arrow (→) and
            multi-column sub-links — same arrow direction as designed.
      ════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden={!drawerOpen}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 500 /* Z/Drawer */,
          pointerEvents: drawerOpen ? 'auto' : 'none',
        }}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--translucency-scrim-default)',
            opacity: drawerOpen ? 1 : 0,
            transition: 'opacity var(--motion-duration-slow) var(--motion-easing-standard)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform var(--motion-duration-slow) var(--motion-easing-emphasized)',
            boxShadow: 'var(--elevation-05)',
          }}
        >
          {/* LEFT — content panel */}
          <div
            style={{
              flex: 1,
              background: 'var(--surface-default)',
              overflowY: 'auto',
              padding: 'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4.5rem)',
            }}
          >
            <NextLink
              href={activeDrawer.href}
              onClick={() => setDrawerOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.875rem',
                fontFamily: 'var(--family-display)',
                fontSize: 'clamp(1.5rem,2.5vw,2rem)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--content-primary)',
                textDecoration: 'none',
                marginBottom: '2.75rem',
              }}
            >
              {activeDrawer.label}
              {/* heading arrow keeps pointing RIGHT, same as the reference */}
              <span style={{ color: 'var(--content-link-default)', display: 'flex' }}>
                <ArrowRight />
              </span>
            </NextLink>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: '3rem',
                rowGap: '0.25rem',
              }}
            >
              {activeDrawer.columns.map((col, ci) => (
                <div key={ci}>
                  {col.heading && (
                    <span style={{ ...groupHead, display: 'block' }}>{col.heading}</span>
                  )}
                  {col.links.map((l) => (
                    <NextLink
                      key={l.label}
                      href={l.href}
                      onClick={() => setDrawerOpen(false)}
                      style={{
                        ...panelLink,
                        padding: '0.6875rem 0',
                        fontSize: 'var(--size-body)',
                        lineHeight: 'var(--line-height-body)',
                      }}
                      {...linkHover}
                    >
                      {l.label}
                    </NextLink>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — dark nav rail */}
          <div
            style={{
              width: 'min(420px, 88vw)',
              background: '#0B1E3D',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* top row (mirrored): logo left, close right */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <NextLink
                href="/"
                onClick={() => setDrawerOpen(false)}
                aria-label="TRYVION — Return to homepage"
                style={{ display: 'flex', textDecoration: 'none' }}
              >
                <TryvionLogo height={40} variant="dark" />
              </NextLink>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: 6,
                  transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#C9A24B';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* main navigation — labels right, chevrons left (mirrored) */}
            <nav
              aria-label="Mobile navigation"
              style={{ display: 'flex', flexDirection: 'column', paddingTop: '1rem' }}
            >
              {DRAWER_SECTIONS.map((s) => {
                const active = drawerSection === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setDrawerSection(s.key)}
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.125rem 2rem',
                      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#fff',
                      transition:
                        'background var(--motion-duration-fast) var(--motion-easing-standard)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        letterSpacing: '-0.005em',
                        borderBottom: active ? '2px solid #fff' : '2px solid transparent',
                        paddingBottom: 2,
                      }}
                    >
                      {s.label}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex' }}>
                      <ChevronLeft />
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* bottom utility (mirrored rows) */}
            <div
              style={{
                marginTop: 'auto',
                padding: '1.5rem 2rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <NextLink
                href="/login"
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '0.625rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#C9A24B';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <UserIcon /> Sign In
              </NextLink>
              <NextLink
                href="/subscribe"
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '0.625rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'color var(--motion-duration-fast) var(--motion-easing-standard)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#C9A24B';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <MailIcon /> Email Subscriptions
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
