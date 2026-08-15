'use client';

import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────────
   SiteFooter — dark enterprise footer matching the approved mock.
   The subtree is scoped with data-theme="dark" so every semantic
   design-token (content, border, surface) resolves to its dark
   value regardless of the user's Light/Dark preference — the
   footer stays deep-navy with fully legible type in both themes.
   Type sizes deliberately sit at 15–16px so nothing reads small.
───────────────────────────────────────────────────────────────── */

/* ── Official TRYVION logo (dark lockup, from the master SVG) ── */
function FooterLogo({ height = 42 }: { height?: number }) {
  const VB_W = 66.145833;
  const VB_H = 15.875;
  const width = Math.round((VB_W / VB_H) * height);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TRYVION — The Future Is a Choice"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <g transform="matrix(0.28144253,0,0,0.28144253,-29.083686,-23.526215)">
        <text
          xmlSpace="preserve"
          x="104.0646"
          y="99.207306"
          transform="matrix(1.0816175,0,0,0.92454124,5.6310486,27.676106)"
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 500,
            fontStretch: 'normal',
            fontSize: '25.8872px',
            lineHeight: 0,
            fontFamily:
              "var(--font-manrope,'Manrope','Neue Haas Grotesk','Helvetica Neue',Arial,sans-serif)",
            letterSpacing: '11.9062px',
            writingMode: 'horizontal-tb',
            direction: 'ltr',
            textAnchor: 'start',
            fill: '#ffffff',
            fillOpacity: 1,
            stroke: 'none',
          }}
        >
          <tspan
            x="104.0646"
            y="99.207306"
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontSize: '25.8872px',
              lineHeight: 0,
              fontFamily:
                "var(--font-manrope,'Manrope','Neue Haas Grotesk','Helvetica Neue',Arial,sans-serif)",
              letterSpacing: '11.9062px',
              writingMode: 'horizontal-tb',
              direction: 'ltr',
              textAnchor: 'start',
              fill: '#ffffff',
              fillOpacity: 1,
              stroke: 'none',
            }}
          >
            {'T    VION'}
          </tspan>
        </text>
        <path
          fill="#ffffff"
          transform="translate(5.6310486,27.676106)"
          d="m 144.38441,92.106922 2.52419,0.008 -0.0532,-5.8759 h 8.23688 l 5.71091,5.87564 3.95189,-0.0108 -5.81892,-5.53536 c -0.13749,-0.21512 -0.0826,-0.46647 0.16474,-0.54914 2.1313,-0.10049 4.64388,-0.62081 4.6729,-2.76866 l -0.0602,-5.19365 c -0.21808,-1.89365 -2.48783,-3.12787 -3.29476,-3.23984 l -16.25411,0.005 v 2.6311 l 15.37552,0.10983 c 0.97542,0.0293 1.52341,0.81823 1.59246,1.37281 l 0.0376,3.04232 c -0.0104,0.83483 -0.2454,1.38413 -1.46527,1.68016 H 144.2746 Z"
        />
        <path
          fill="#ffffff"
          d="m 192.47942,111.73544 1.15021,1.90095 c 0.25242,0.38747 0.33347,0.75319 0.39706,1.11669 0.70809,4.70842 0.85125,13.30213 1.20687,17.20271 l 1.18925,-17.16276 c 0.0282,-0.36958 0.1041,-0.73395 0.28686,-1.08662 l 1.14798,-2.05561 c -1.80623,1.16418 -3.59697,1.02363 -5.37823,0.0846 z"
        />
        <path
          fill="#ffffff"
          d="m 190.99903,105.63046 c 0.37963,-0.92479 1.01944,-1.42214 1.74884,-1.77231 L 181.69294,92.844422 c -0.97384,-0.185287 -1.82618,-0.603441 -2.57955,-1.211294 0.39143,0.764508 0.95306,1.394018 0.96849,2.509882 z"
        />
        <path
          fill="#ffffff"
          d="m 199.58316,105.63046 c -0.37963,-0.92479 -1.01944,-1.42214 -1.74884,-1.77231 l 11.05493,-11.013728 c 0.97384,-0.185287 1.82618,-0.603441 2.57955,-1.211294 -0.39143,0.764508 -0.95306,1.394018 -0.96849,2.509882 z"
        />
        <circle fill="#cf9045" cx="195.20119" cy="107.73849" r="2.9662728" />
      </g>
    </svg>
  );
}

/* ── Social icons ── */
function LinkedInSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ width: 18, height: 18 }}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function XSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ width: 16, height: 16 }}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YouTubeSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ width: 18, height: 18 }}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--ink-1000)" />
    </svg>
  );
}
function ChevronSVG() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ width: 14, height: 14, flexShrink: 0 }}
    >
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Footer data ── */
const COLUMNS = [
  {
    heading: 'What We Do',
    links: [
      { label: 'Applications', href: '/services/applications' },
      { label: 'AI', href: '/services/artificial-intelligence' },
      { label: 'Talent', href: '/talent' },
      { label: 'Operate', href: '/services/operate' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Industries', href: '/industries' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Global Offices', href: '/about/locations' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Accessibility', href: '/accessibility' },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tryvion', icon: <LinkedInSVG /> },
  { label: 'X', href: 'https://twitter.com/tryvion', icon: <XSVG /> },
  { label: 'YouTube', href: 'https://youtube.com/@tryvion', icon: <YouTubeSVG /> },
];

/* ── Component ── */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-theme="dark"
      role="contentinfo"
      style={{
        background: 'var(--ink-1000)',
        color: 'var(--content-primary)',
        fontFamily: 'var(--family-text)',
      }}
    >
      <style>{`
        .tf-link{display:flex;align-items:center;justify-content:space-between;gap:1rem;color:var(--content-secondary);text-decoration:none;font-size:0.9375rem;font-weight:500;line-height:var(--line-height-body);padding:0.5rem 0;transition:color var(--motion-duration-fast) var(--motion-easing-standard);}
        .tf-link:hover{color:var(--content-primary);}
        .tf-link svg{color:var(--content-tertiary);transition:transform var(--motion-duration-fast) var(--motion-easing-standard),color var(--motion-duration-fast) var(--motion-easing-standard);}
        .tf-link:hover svg{transform:translateX(3px);color:var(--brand-accent);}
        .tf-legal{color:var(--content-secondary);text-decoration:none;font-size:0.9375rem;transition:color var(--motion-duration-fast) var(--motion-easing-standard);}
        .tf-legal:hover{color:var(--content-primary);}
        .tf-social{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--radius-full);background:var(--surface-raised);color:var(--content-primary);transition:background var(--motion-duration-fast) var(--motion-easing-standard),color var(--motion-duration-fast) var(--motion-easing-standard);}
        .tf-social:hover{background:var(--brand-accent);color:var(--ink-1000);}
        .tf-social:focus-visible,.tf-link:focus-visible,.tf-legal:focus-visible{outline:var(--border-focus-width) solid var(--focus-ring-default);outline-offset:var(--border-focus-offset);border-radius:var(--radius-xs);}
      `}</style>

      {/* ── Upper: brand + link columns ── */}
      <div
        style={{
          maxWidth: 'var(--layout-content-wide)',
          margin: '0 auto',
          padding: 'clamp(3.5rem,6vw,5.5rem) clamp(1.5rem,4vw,3rem) clamp(3rem,5vw,4.5rem)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(2.5rem,5vw,4.5rem)',
          alignItems: 'stretch',
        }}
      >
        {/* Brand column */}
        <div
          style={{
            flex: '1 1 340px',
            maxWidth: '460px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          <FooterLogo height={42} />
          <p
            style={{
              margin: '-0.75rem 0 0',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--content-secondary)',
            }}
          >
            The future is a <span style={{ color: 'var(--brand-accent)' }}>choice.</span>
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--content-secondary)',
              maxWidth: '34ch',
            }}
          >
            We help organisations navigate defining moments, make intelligent choices, and turn
            vision into sustained momentum.
          </p>
          <div
            style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', marginTop: 'auto' }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="tf-social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TRYVION on ${s.label}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns with hairline dividers */}
        <div
          style={{
            flex: '2 1 520px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
            gap: 'clamp(1.5rem,3vw,3rem)',
          }}
        >
          {COLUMNS.map((col) => (
            <nav
              key={col.heading}
              aria-label={`${col.heading} navigation`}
              style={{
                borderLeft: '1px solid var(--border-subtle)',
                paddingLeft: 'clamp(1.25rem,2.5vw,2.5rem)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 1.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brand-accent)',
                }}
              >
                {col.heading}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link className="tf-link" href={l.href}>
                      <span>{l.label}</span>
                      <ChevronSVG />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div
          style={{
            maxWidth: 'var(--layout-content-wide)',
            margin: '0 auto',
            padding: '1.75rem clamp(1.5rem,4vw,3rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--content-secondary)' }}>
            © {year} TRYVION. All rights reserved.
          </p>
          <nav aria-label="Legal navigation">
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {LEGAL.map((l, i) => (
                <li key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--brand-accent)',
                        display: 'inline-block',
                      }}
                    />
                  )}
                  <Link className="tf-legal" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
