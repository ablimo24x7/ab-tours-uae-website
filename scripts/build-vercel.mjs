import { execSync } from 'node:child_process'

// Run Payload migrations using the direct (unpooled) Neon connection string,
// because Neon's PgBouncer transaction pooler does not support session-level
// advisory locks or multi-statement DDL transactions reliably during migrations.
const migrationUri =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  ''

const migrationEnv = {
  ...process.env,
  DATABASE_URI: migrationUri,
}

console.log('[build:vercel] Running Payload migrations...')
execSync('pnpm payload migrate', { stdio: 'inherit', env: migrationEnv })

console.log('[build:vercel] Running Next.js production build...')
execSync('pnpm build', { stdio: 'inherit', env: process.env })
