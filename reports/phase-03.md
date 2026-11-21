# Phase 03 — CMS foundation: users, roles, media and site-wide settings

## What was built

### 1. Database, Neon & Vercel migrations
- **`src/payload.config.ts`**: Postgres adapter uses `process.env.DATABASE_URI || process.env.DATABASE_URL || ''` so local development uses the Neon `dev` branch (`DATABASE_URI`) and Vercel uses its Neon integration (`DATABASE_URL`).
- **`.env.example` & `README.md`**: Updated for Neon `dev` branch in `.env` (`DATABASE_URI`), with local PostgreSQL 18 noted as an optional offline fallback. Removed `S3_*` variables and added `BLOB_READ_WRITE_TOKEN=`.
- **Initial migration**: Created `src/migrations/20261121_074209_initial.ts` via `pnpm payload migrate:create initial`.
- **`scripts/build-vercel.mjs` & `vercel.json`**: `vercel.json` sets `"buildCommand": "pnpm run build:vercel"`, which runs `payload migrate` using `DATABASE_URL_UNPOOLED` (direct connection) and then `pnpm build`.
  - *Why `DATABASE_URL_UNPOOLED`*: Neon's PgBouncer connection pooler operates in transaction pooling mode, which does not support session-level advisory locks or multi-statement DDL transactions reliably during schema migrations.

### 2. Users, hierarchy & access rules (`src/access/`, `src/collections/Users.ts`)
- **Role registry (`src/access/roles.ts`)**: `ROLES` (`admin`, `editor`) and `DEFAULT_ROLE` (`editor`) defined in one place so new roles can be added cleanly.
- **Reusable access helpers (`src/access/index.ts`)**:
  - `isAdmin`: Active user with `role === 'admin'`.
  - `isAdminOrEditor`: Active user with `role === 'admin'` or `role === 'editor'`.
  - `isAdminOrSelf`: Admin sees/edits all users; Editor sees/edits only `{ id: { equals: user.id } }`.
  - `isAdminField` / `isAdminOrSelfField` / `adminFieldOnly`: Field-level access controls.
  - `hideFromNonAdmin`: Hides Admin-only collections and globals from Editors in `/admin` navigation.
- **`Users` collection (`src/collections/Users.ts`)**:
  - Fields: `name` (required), `email` (auth), `role` (`admin` / `editor`, default `editor`, `saveToJWT: true`, `create`/`update` Admin-only, `read` Admin-or-self), `active` (checkbox, Admin-only), `lastLogin` (read-only sidebar date updated in `afterLogin`).
  - `beforeChange`: Forces the very first user created (`totalDocs === 0`) to `role: 'admin'` and `active: true`; blocks demoting or deactivating the last active Admin.
  - `beforeDelete`: Blocks deleting the last active Admin.
  - Admin group: `Users` (hidden from Editors).

### 3. Media & Vercel Blob (`src/collections/Media.ts`, `next.config.ts`)
- Replaced `@payloadcms/storage-s3` with `@payloadcms/storage-vercel-blob` (`3.94.1`), enabled only when `BLOB_READ_WRITE_TOKEN` is set, with `clientUploads: true`. Without the token, files are stored on local disk.
- Added `*.public.blob.vercel-storage.com` (verified from `@payloadcms/storage-vercel-blob/dist/index.js`) to `images.remotePatterns` in `next.config.ts`.
- Fields: `alt` (required), `caption`, `credit` (photographer), plus non-blocking `heroWidthWarning` sidebar notice when an uploaded image is under `2400px` wide (logs a warning without blocking save).
- Accepted MIME types: `image/*`, `video/mp4`, `application/pdf`.
- Image sizes: `thumbnail` (`400×300`), `card` (`900×675`), `og` (`1200×630`), `hero` (`2400px` wide), with `focalPoint: true` and `crop: true`.

### 4. Globals (`src/globals/`) & shared `link` field (`src/fields/link.ts`)
- **`Branding`** (Admin & Editor, group `Settings`): `fullColourLogo`, `whiteLogo`, `favicon`, `defaultSocialImage`, and optional hex-validated colour overrides (`--blue`, `--green`, `--sun`, `--night`, `--cream`).
- **`Header`** (Admin & Editor, group `Settings`): `tagline`, `topLinks`, `mainMenu` (max 6 items with overview link, intro, feature photo, dropdown links), `ctaLabel`, `ctaLink`.
- **`Footer`** (Admin & Editor, group `Settings`): `description`, `columns`, `bottomText`, `legalLinks`.
- **`ContactDetails`** (Admin & Editor, group `Settings`): `officeAddress`, `phone`, `whatsappNumber`, `email`, `officeHours`, `mapLink`, `socialLinks`, `licenceNumbers`.
- **`SiteSettings`** (Admin-only, hidden from Editors, group `Settings`): `siteName`, `seoTitleSuffix`, `defaultSeoDescription`, `analyticsId`, `notFoundTitle`, `notFoundText`.
- **`FormSettings`** (group `Settings`): Admin-only (`adminFieldOnly`) `recipients` (`leisure`, `outbound`, `b2b`) and `replyTimePromise`; Admin & Editor option lists (`quotePlanningOptions` with photos, `budgetLevels`, `preferredContactMethods`, `consultationTopics`, `consultationMethods`, `timeSlots`, `partnerTypes`, `partnerInterests`) and thank-you heading/text.
- **`src/content/globals.ts` & `src/app/(frontend)/layout.tsx`**: Reads `Branding`, `Header`, `Footer`, `ContactDetails`, and `FormSettings` from Payload Local API, outputs `Branding` colour overrides as CSS custom properties on `<html>`, and passes logos/links/WhatsApp/reply-time to `Header`, `Footer`, `FloatingWhatsApp`, and `QuoteDrawer` (with prototype fallbacks until seeded in Phase 11).
- **Admin branding**: `src/components/admin/AdminLogo.tsx` and `AdminIcon.tsx` registered in `src/payload.config.ts` and `src/app/(payload)/admin/importMap.js`.

## Access rules & verification plan
| Rule / Helper | Behaviour | Proof / Verification |
|---|---|---|
| `isAdmin` | Allows only active `admin` users | Enforced on `Users` create/delete, `SiteSettings` read/update; automated Local API test with `overrideAccess: false` in Phase 12 |
| `isAdminOrEditor` | Allows active `admin` or `editor` users | Enforced on `Media` create/update/delete, `Branding`/`Header`/`Footer`/`ContactDetails`/`FormSettings` update; automated test in Phase 12 |
| `isAdminOrSelf` | `admin` sees/edits all users; `editor` sees/edits only own user ID | Enforced on `Users` read/update; automated test in Phase 12 |
| `adminFieldOnly` | Field-level create/read/update restricted to `admin` | Enforced on `Users.active`, `FormSettings.recipients`, `FormSettings.replyTimePromise`; automated test in Phase 12 |
| `isAdminField` / `isAdminOrSelfField` | `Users.role` readable by self & admin, editable only by `admin` | Enforced on `Users.role`; automated test in Phase 12 |
| First user & last Admin guards | First user forced to `admin`; last active `admin` cannot be demoted, deactivated, or deleted | Enforced in `Users.hooks.beforeChange` & `beforeDelete`; automated test in Phase 12 |

## Verification results
- `pnpm generate:importmap`: **Pass**
- `pnpm generate:types`: **Pass**
- `pnpm payload migrate:create initial`: **Pass** (`src/migrations/20261121_074209_initial.ts`)
- `pnpm lint`: **Pass** (0 errors; 4 unused-arg warnings in Payload's generated `src/migrations/20261121_074209_initial.ts`)
- `pnpm typecheck`: **Pass** (`tsc --noEmit` exited with code 0)
- `pnpm build`: **Pass** (64 static/SSG pages + dynamic `/admin` and `/api` routes built cleanly)

## Next steps for the developer
1. Open `http://localhost:3000/admin` on the running dev server and confirm the **create-first-user** screen appears, then create your first Admin account and an Editor test account to verify the permissions matrix by hand.
2. Push `main` to GitHub to trigger the Vercel deployment, then open `/admin` on the Vercel deployment and create the first Admin there.
3. Note: the `/admin` smoke test in `tests/e2e/smoke.e2e.spec.ts` remains skipped until Phase 12.

## Known gaps & deviations
- `linkField` (`src/fields/link.ts`) currently uses `internalPath` (`text`) instead of a polymorphic `relationship` field because the routed content collections (`pages`, `emirates`, etc.) are added in Phases 04–05. The document picker will be added to `linkField` in Phase 05.
- `AdminLogo` uses a plain `<img>` with `eslint-disable-next-line @next/next/no-img-element` inside the Payload admin header.
