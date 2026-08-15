import type { NextConfig } from 'next'

// ---------------------------------------------------------------------------
// Security headers — applied to all routes
// CSP uses 'unsafe-inline' for Next.js script injection and GA4.
// TODO Phase 14+: migrate to nonce-based CSP for stricter hardening.
// ---------------------------------------------------------------------------

const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control',  value: 'on' },
  { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  {
    key:   'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    // HSTS — 2 years; only effective over HTTPS (ignored on HTTP)
    key:   'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration; GA4 needs gtm domain
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      // blob: for Next.js image optimisation; https: for CMS media
      "img-src 'self' data: blob: https:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

// ---------------------------------------------------------------------------
// CMS image domain — parsed from NEXT_PUBLIC_CMS_URL at build time
// ---------------------------------------------------------------------------

function parseCmsPattern() {
  const raw = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'
  try {
    const u = new URL(raw)
    return {
      protocol: u.protocol.replace(':', '') as 'http' | 'https',
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
      pathname: '/api/media/file/**',
    }
  } catch {
    return { protocol: 'http' as const, hostname: 'localhost', port: '3001', pathname: '/api/media/file/**' }
  }
}

// ---------------------------------------------------------------------------
// Next.js config
// ---------------------------------------------------------------------------

const nextConfig: NextConfig = {
  // Monorepo packages — ensure they are transpiled for the web bundle
  transpilePackages: ['@tryvion/ui', '@tryvion/utils', '@tryvion/design-tokens'],

  // Remove X-Powered-By header (minor fingerprint reduction)
  poweredByHeader: false,

  // React 19 strict mode
  reactStrictMode: true,

  // Compress responses
  compress: true,

  images: {
    // Serve AVIF + WebP where supported
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Payload CMS media — derived from NEXT_PUBLIC_CMS_URL
      parseCmsPattern(),
      // Allow placeholder images in development and staging
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },

  async headers() {
    return [
      {
        // Apply to all routes including _next/static
        source:  '/(.*)',
        headers: SECURITY_HEADERS,
      },
    ]
  },

  // Redirect /admin to the CMS admin panel in development
  async redirects() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source:      '/admin',
            destination: `${process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:3001'}/admin`,
            permanent:   false,
          },
        ]
      : []
  },
}

export default nextConfig
