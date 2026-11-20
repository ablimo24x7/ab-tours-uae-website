# Phase 01 — Project setup report

## Installed versions
- **Payload CMS**: `3.94.1` (`payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/ui`, `@payloadcms/plugin-seo`, `@payloadcms/plugin-redirects`, `@payloadcms/plugin-nested-docs`, `@payloadcms/email-nodemailer`, `@payloadcms/storage-s3`)
- **Next.js**: `16.4.6` (`next`, `eslint-config-next`)
- **React**: `19.2.9` (`react`, `react-dom`)
- **Node.js**: `v24.22.3` (`.nvmrc` pinned to `24.22.3`, matching `package.json` `engines`: `^22.23.5 || ^24.22.3 || >=26.13.1`)
- **Playwright**: `1.63.0` (`@playwright/test`)

## What was built
1. **Project scaffold**: Scaffolded with `create-payload-app@3.94.1` (blank template, Postgres) and merged into the repository root without overwriting existing `AGENTS.md`, `design/`, `docs/`, or `prompts/`.
2. **Adapters & plugins (`src/payload.config.ts`)**:
   - `@payloadcms/db-postgres` configured with `DATABASE_URI`.
   - `@payloadcms/email-nodemailer` configured via `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM_NAME`, and `EMAIL_FROM_ADDRESS` (enabled when `SMTP_HOST` is set).
   - `@payloadcms/storage-s3` configured via `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` (enabled only when `S3_BUCKET` is set).
   - `@payloadcms/plugin-seo` and `@payloadcms/plugin-nested-docs` registered; `@payloadcms/plugin-redirects` installed and deferred to Phase 10 (see Deviations).
3. **Directory structure**:
   - `src/app/(frontend)` (public site), `src/app/(payload)` (Payload admin & API)
   - `src/collections`, `src/globals`, `src/blocks`, `src/access`, `src/fields`, `src/hooks`, `src/components`, `src/lib`, `src/seed`, `tests`
4. **Environment & local database**:
   - `.env.example` updated with all required variables (`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, SMTP, S3, `PREVIEW_SECRET`, `CRON_SECRET`) for local PostgreSQL 18 (`postgresql-x64-18`).
   - `.nvmrc` added with `24.22.3`.
   - `README.md` updated with local PostgreSQL 18 setup instructions and available scripts.
5. **Scripts (`package.json`)**:
   - `dev`, `build`, `start`, `lint`, `typecheck`, `generate:types`, `seed`, `test:e2e`.
   - `src/seed/index.ts` created as an empty placeholder using `pathToFileURL(process.argv[1]).href` for Windows compatibility.
   - `playwright.config.ts` configured with `reporter: [['list'], ['html', { open: 'never' }]]` and `tests/e2e/smoke.e2e.spec.ts` added.
6. **Fonts & design tokens**:
   - `src/app/(frontend)/layout.tsx` loads `Instrument_Serif` (400, normal & italic), `Inter_Tight` (300, 400, 500, 600), and `DM_Mono` (400, 500) via `next/font/google`, exposed as `--serif`, `--sans`, and `--mono` on `<html>`.
   - `src/app/(frontend)/styles/tokens.css` defines all 20 color tokens and `--radius: 18px` from `00-Project-Rules.md`.
   - `src/app/(frontend)/page.tsx` renders an empty placeholder page.

## How to run
1. Ensure PostgreSQL 18 (`postgresql-x64-18`) is running and create the `ab_tours_uae` database (`createdb -U postgres ab_tours_uae` or via pgAdmin).
2. Copy `.env.example` to `.env`, set `DATABASE_URI` with your PostgreSQL password, and set `PAYLOAD_SECRET`.
3. Run `pnpm install` (if not already installed).
4. Run `pnpm dev` and open `http://localhost:3000/` (and `http://localhost:3000/admin` once the database is configured).

## Verification results
- `pnpm lint`: **Pass** (0 errors, 0 warnings).
- `pnpm typecheck`: **Pass** (`tsc --noEmit` exited with code 0).
- `pnpm build`: **Pass** (Next.js 16.4.6 Turbopack production build succeeded; generated `/`, `/_not-found`, `/admin/[[...segments]]`, `/api/[...slug]`, `/api/graphql`, `/api/graphql-playground`). Note: on Windows, `next build` must run outside the restricted sandbox because Turbopack creates junction points under `.next/node_modules/`.
- `pnpm dev` + `http://localhost:3000/`: **Pass** (`pnpm dev` ready in 914 ms; `GET http://localhost:3000/` returned HTTP `200` within 45 s with `--serif`, `--sans`, and `--mono` CSS variable classes on `<html>`).

## Deferred items
- **Database & `/admin` check**: Deferred until the database setup just before Phase 03 (create `ab_tours_uae` on PostgreSQL 18, set password in `.env`, verify `/admin` shows the create-first-user screen, and re-enable the `/admin` test in `tests/e2e/smoke.e2e.spec.ts`).
- **Automated tests (`pnpm test:e2e`)**: Deferred to Phase 12 per the "dev first, tests later" decision (`AGENTS.md` rule 6). `tests/e2e/smoke.e2e.spec.ts` has the `/admin` check marked `test.skip` with a comment to re-enable before Phase 03.

## Deviations
1. **`@payloadcms/plugin-redirects` removed from `plugins` array until Phase 10**: The package is installed, but Payload 3.94.1 throws `Field "reference" of type "relationship" has an empty relationTo array` when `redirectsPlugin` is registered without collections, and redirects must not target `media`. Added a comment in `src/payload.config.ts` to register it in Phase 10 once routed collections exist.
2. **No `docker-compose.yml`**: Dropped per the 20 Nov 2026 decision to use the local PostgreSQL 18 Windows service (`postgresql-x64-18`) instead of Docker.
3. **Template extras retained**: `vitest.config.mts`, `vitest.setup.ts`, `tests/int/api.int.spec.ts`, `.prettierrc.json`, `.vscode/`, and the GraphQL API routes were kept from the `create-payload-app` blank template (to be reviewed in Phase 12).
4. **`eslint.config.mjs` updated for Next.js 16**: Replaced `@eslint/eslintrc` `FlatCompat` from the template with native flat config imports (`eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`) so `pnpm lint` runs cleanly without adding `@eslint/eslintrc`.
