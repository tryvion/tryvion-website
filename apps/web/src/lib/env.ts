// Environment variable registry for apps/web
// Import serverEnv only in server components, route handlers, and server actions.
// Import publicEnv anywhere — it contains only NEXT_PUBLIC_ vars.
//
// Neither object is safe to expose to the client bundle via JSON serialisation.
// If you need a value in a client component, pass it as a prop from a server component.

function optional(key: string): string | undefined
function optional(key: string, fallback: string): string
function optional(key: string, fallback?: string): string | undefined {
  return process.env[key] ?? fallback
}


// Server-side only — never include in client bundles
// Validated lazily on first import; throws at startup if any required var is absent
export const serverEnv = {
  REVALIDATE_SECRET: optional('REVALIDATE_SECRET'),
  CMS_URL:           optional('CMS_URL',           'http://localhost:3001'),
  NODE_ENV:          optional('NODE_ENV',           'development') as 'development' | 'test' | 'production',
}

// Safe to import in shared modules — NEXT_PUBLIC_ vars are inlined at build time
export const publicEnv = {
  SITE_URL:    optional('NEXT_PUBLIC_SITE_URL',             'https://tryvion.com'),
  CMS_URL:     optional('NEXT_PUBLIC_CMS_URL',              'http://localhost:3001'),
  GA_ID:       optional('NEXT_PUBLIC_GA_MEASUREMENT_ID'),
  POSTHOG_KEY: optional('NEXT_PUBLIC_POSTHOG_KEY'),
}
