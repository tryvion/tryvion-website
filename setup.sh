#!/usr/bin/env bash
# =============================================================================
# TRYVION — One-time Mac development setup
# Run from the tryvion-website/ directory: bash setup.sh
# =============================================================================
set -euo pipefail

# ── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
info()    { echo -e "${BLUE}▶${NC} $1"; }
ok()      { echo -e "${GREEN}✓${NC} $1"; }
warn()    { echo -e "${YELLOW}⚠${NC} $1"; }
fatal()   { echo -e "${RED}✗ ERROR:${NC} $1"; exit 1; }
header()  { echo -e "\n${BOLD}$1${NC}"; echo "────────────────────────────────────────"; }

# ── Guard: must run from repo root ────────────────────────────────────────────
[[ -f "turbo.json" ]] || fatal "Run this script from the tryvion-website/ directory."

header "1 / 6  Prerequisites"

# Node.js ≥ 20
if command -v node &>/dev/null; then
  NODE_VER=$(node -e "process.stdout.write(process.versions.node)")
  NODE_MAJOR=$(echo "$NODE_VER" | cut -d. -f1)
  if [[ $NODE_MAJOR -lt 20 ]]; then
    fatal "Node.js 20+ required (found $NODE_VER). Install from https://nodejs.org or via nvm."
  fi
  ok "Node.js $NODE_VER"
else
  fatal "Node.js not found. Install from https://nodejs.org or via nvm."
fi

# pnpm
if ! command -v pnpm &>/dev/null; then
  info "pnpm not found — installing via corepack..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi
PNPM_VER=$(pnpm --version)
ok "pnpm $PNPM_VER"

# PostgreSQL — check psql exists
PG_AVAILABLE=false
if command -v psql &>/dev/null; then
  PG_AVAILABLE=true
  ok "PostgreSQL ($(psql --version | head -1))"
else
  warn "psql not found. CMS requires PostgreSQL."
  echo ""
  echo "  Options to install PostgreSQL on Mac:"
  echo "  a) Homebrew:    brew install postgresql@16 && brew services start postgresql@16"
  echo "  b) Postgres.app: https://postgresapp.com"
  echo "  c) Docker:      docker run -d --name tryvion-pg \\"
  echo "                    -e POSTGRES_PASSWORD=postgres \\"
  echo "                    -p 5432:5432 postgres:16-alpine"
  echo ""
  echo "  The web app will still run without PostgreSQL (uses static fallback data)."
  echo "  Press Enter to continue anyway, or Ctrl+C to abort and install PostgreSQL first."
  read -r
fi

header "2 / 6  Install dependencies"
info "Running pnpm install..."
pnpm install
ok "All workspace packages installed"

header "3 / 6  Environment files"

# apps/web
if [[ ! -f "apps/web/.env.local" ]]; then
  cp apps/web/.env.local.example apps/web/.env.local
  ok "Created apps/web/.env.local from example"
else
  ok "apps/web/.env.local already exists — skipped"
fi

# apps/cms
if [[ ! -f "apps/cms/.env.local" ]]; then
  cp apps/cms/.env.local.example apps/cms/.env.local

  # Generate a random PAYLOAD_SECRET automatically
  if command -v openssl &>/dev/null; then
    SECRET=$(openssl rand -hex 32)
    if [[ "$(uname)" == "Darwin" ]]; then
      sed -i '' "s/replace-with-a-long-random-secret/$SECRET/" apps/cms/.env.local
    else
      sed -i  "s/replace-with-a-long-random-secret/$SECRET/" apps/cms/.env.local
    fi
    ok "Created apps/cms/.env.local (PAYLOAD_SECRET auto-generated)"
  else
    ok "Created apps/cms/.env.local — edit PAYLOAD_SECRET manually before starting the CMS"
  fi
else
  ok "apps/cms/.env.local already exists — skipped"
fi

header "4 / 6  PostgreSQL database"

if [[ "$PG_AVAILABLE" == "true" ]]; then
  # Load DATABASE_URL from the env file
  DB_URL=$(grep "^DATABASE_URL=" apps/cms/.env.local | cut -d= -f2-)
  DB_NAME=$(echo "$DB_URL" | sed 's|.*\/||')

  info "Creating database \"$DB_NAME\" (safe to run if it already exists)..."
  if createdb "$DB_NAME" 2>/dev/null; then
    ok "Database \"$DB_NAME\" created"
  else
    ok "Database \"$DB_NAME\" already exists — skipped"
  fi
else
  warn "Skipping database creation (PostgreSQL not available)"
fi

header "5 / 6  Playwright browsers"

info "Installing Playwright browser binaries..."
pnpm --filter @tryvion/web exec playwright install --with-deps chromium firefox webkit 2>&1 | tail -5
ok "Playwright browsers ready"

header "6 / 6  Done"
echo ""
echo -e "${GREEN}${BOLD}TRYVION is ready to run.${NC}"
echo ""
echo "  Start dev servers:   bash dev.sh"
echo "  Web app only:        pnpm --filter @tryvion/web dev"
echo "  CMS only:            pnpm --filter @tryvion/cms dev"
echo ""
echo "  URLs:"
echo "  • Web app  →  http://localhost:3000"
echo "  • CMS admin →  http://localhost:3001/admin"
echo ""
if [[ "$PG_AVAILABLE" == "false" ]]; then
  echo -e "  ${YELLOW}Note:${NC} Install PostgreSQL and re-run this script to enable the CMS."
  echo ""
fi
echo -e "  ${YELLOW}Before production:${NC} replace all secrets in .env.local files."
