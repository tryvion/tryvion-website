#!/usr/bin/env bash
# =============================================================================
# TRYVION — Start all dev servers
# Run from the tryvion-website/ directory: bash dev.sh
#
# Starts:
#   • apps/web  → http://localhost:3000  (Next.js)
#   • apps/cms  → http://localhost:3001  (Payload CMS admin)
#
# Press Ctrl+C once to stop both servers cleanly.
# =============================================================================
set -euo pipefail

[[ -f "turbo.json" ]] || { echo "Run from the tryvion-website/ directory."; exit 1; }

# Verify env files exist
if [[ ! -f "apps/web/.env.local" ]]; then
  echo "apps/web/.env.local not found. Run: bash setup.sh"
  exit 1
fi

# Trap Ctrl+C — kill both background servers
trap 'echo -e "\n\033[1;33mStopping dev servers...\033[0m"; kill 0' SIGINT SIGTERM

echo -e "\033[1m▶ Starting TRYVION dev servers\033[0m"
echo "  Web  →  http://localhost:3000"
echo "  CMS  →  http://localhost:3001/admin"
echo "  Press Ctrl+C to stop."
echo ""

# Start both apps in parallel via Turborepo
# Turborepo streams output from both apps with prefixed labels
exec pnpm turbo dev --filter="@tryvion/web" --filter="@tryvion/cms"
