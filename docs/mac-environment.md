# TRYVION Mac Development Environment

This document records every operation that must be executed on the Mac development machine.
This Windows machine is for source review and file generation only.

---

## Prerequisites

| Tool | Required Version | Install |
|------|-----------------|---------|
| Node.js | >= 20.9.0 | `nvm install 20` or [nodejs.org](https://nodejs.org) |
| pnpm | >= 10.x | `npm install -g pnpm@latest` |
| PostgreSQL | >= 15 | `brew install postgresql@15` |
| Git | Any current | `brew install git` |

---

## 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url> tryvion-website
cd tryvion-website

# Install all workspace dependencies
pnpm install
```

Expected: pnpm resolves all workspace packages including `@tryvion/design-tokens`.

---

## 2. Environment Variables

```bash
# CMS environment
cp apps/cms/.env.example apps/cms/.env
```

Then edit `apps/cms/.env`:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/tryvion
PAYLOAD_SECRET=<generate-with: openssl rand -base64 32>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**DATABASE_URL format:** `postgresql://<user>:<password>@<host>:<port>/<dbname>`

**PAYLOAD_SECRET:** Must be a strong random string. Generate with:
```bash
openssl rand -base64 32
```

Never commit `.env` files to version control.

---

## 3. Database Setup

```bash
# Start PostgreSQL
brew services start postgresql@15

# Create the database
createdb tryvion

# Verify connection
psql tryvion -c "SELECT version();"
```

Payload CMS will run its own migrations on first startup — no manual schema setup needed.

---

## 4. Start Development Servers

Open two terminal windows:

**Terminal 1 — CMS (Payload):**
```bash
pnpm --filter @tryvion/cms dev
```
CMS admin: http://localhost:3001/admin

**Terminal 2 — Web (Next.js):**
```bash
pnpm --filter @tryvion/web dev
```
Website: http://localhost:3000

Or start both together from the root:
```bash
pnpm dev
```

---

## 5. Read Next.js 16 Documentation

The AGENTS.md in the repository includes this warning:
> "This version has breaking changes — APIs, conventions, and file structure may all differ from your training data."

Before writing any Next.js-specific code, read the installed docs:
```bash
ls apps/web/node_modules/next/dist/docs/
cat apps/web/node_modules/next/dist/docs/01-getting-started.md
```

Key areas to verify: App Router conventions, Server/Client component boundaries, font loading with next/font.

---

## 6. Generate Payload Types

After adding or modifying Payload collections, regenerate TypeScript types:

```bash
pnpm --filter @tryvion/cms payload generate:types
```

This regenerates `apps/cms/src/payload-types.ts`.

Also regenerate the import map after adding new collections or components:
```bash
pnpm --filter @tryvion/cms payload generate:importmap
```

---

## 7. Validate Design Tokens

Verify the design token package is correctly linked:
```bash
# Check package resolves
pnpm --filter @tryvion/web ls | grep design-tokens

# Check CSS file is accessible
cat node_modules/@tryvion/design-tokens/dist/css/variables.css | head -20
```

Verify Tailwind processes the tokens in development:
```bash
pnpm --filter @tryvion/web dev
# Open http://localhost:3000 and inspect CSS in DevTools
# Confirm --color-ink, --color-momentum etc. appear in :root
```

---

## 8. Font Setup (After License Acquisition)

Once commercial licenses are obtained for Neue Haas Grotesk and Optima:

1. Place font files in `apps/web/src/assets/fonts/`
2. Add `@font-face` declarations in `apps/web/src/styles/fonts.css`
3. Import `fonts.css` in `apps/web/src/app/globals.css` before the token import
4. Update `--tryvion-font-primary` and `--tryvion-font-tertiary` in `variables.css` to put licensed fonts first in the stack

Manrope (secondary typeface) is already configured via `next/font/google` — no action needed.

See `/docs/source-of-truth.md → STT-001` for full licensing context.

---

## 9. Production Deployment

See `/docs/deployment.md` (to be created in Phase 22).

Summary:
- **Platform:** Vercel
- **Database:** Vercel Postgres / Neon / Supabase
- **Media:** Cloudflare R2 or AWS S3 (local disk does not persist on Vercel)
- **Build command:** `pnpm turbo run build`
- **Install command:** `pnpm install --frozen-lockfile`

DO NOT deploy to Vercel until:
- [ ] Font licenses acquired
- [ ] PostgreSQL production database provisioned
- [ ] All environment variables set in Vercel dashboard
- [ ] Media storage configured
