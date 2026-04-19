#!/bin/bash
# scripts/setup.sh — Run this after unzipping: bash scripts/setup.sh

set -e

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  NAVY.SYS — SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check node
if ! command -v node &> /dev/null; then
  echo "✗ Node.js not found. Install from https://nodejs.org (v18+)"
  exit 1
fi

NODE_VERSION=$(node -v | cut -d. -f1 | tr -d 'v')
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "✗ Node.js 18+ required. Current: $(node -v)"
  exit 1
fi

echo "✓ Node.js $(node -v)"

# Install dependencies
echo ""
echo "→ Installing dependencies..."
npm install

# .env setup
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo ""
  echo "✓ Created .env from .env.example"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ACTION REQUIRED: Edit .env"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "  Open .env and set:"
  echo "    NEXTAUTH_SECRET  — run: openssl rand -base64 32"
  echo "    ADMIN_USERNAME   — your login username"
  echo "    ADMIN_PASSWORD   — your login password"
  echo ""
  echo "  Then run: bash scripts/setup.sh again (or continue below)"
  echo ""
  read -p "  Press Enter after editing .env to continue setup..." _
fi

echo ""
echo "→ Generating Prisma client..."
npx prisma generate

echo ""
echo "→ Pushing database schema..."
npx prisma db push

echo ""
read -p "→ Seed database with sample posts? (y/N): " SEED
if [ "$SEED" = "y" ] || [ "$SEED" = "Y" ]; then
  echo "→ Seeding..."
  npx ts-node --skip-project prisma/seed.ts
  echo "✓ Seeded with 5 sample posts"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✓ SETUP COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Run:  npm run dev"
echo "  Open: http://localhost:3000"
echo "  Admin: http://localhost:3000/admin"
echo ""
