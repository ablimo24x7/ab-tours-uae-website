# 03 — CMS foundation: users, roles, media and site-wide settings

Follow `00-Project-Rules.md`.

**Before starting — database and migrations (the developer has created Neon on Vercel with a `dev` branch):**
1. Ask the developer to put the Neon **`dev` branch** connection string in the local `.env` as `DATABASE_URI`. Never write it anywhere else.
2. In `payload.config.ts`, set the Postgres adapter's connection string to `process.env.DATABASE_URI || process.env.DATABASE_URL`, so Vercel uses the integration's `DATABASE_URL`. Update `.env.example` and the README to match. Remove the local-PostgreSQL-only wording, and keep PostgreSQL 18 as an optional fallback.
3. Ask the developer to open `/admin` on their running dev server and confirm the create-first-user screen appears.
4. Migrations for Vercel, following Payload's migrations docs:
   - after this phase's collections and globals exist, create the first migration with `pnpm payload migrate:create initial` and commit it;
   - add a script `build:vercel` that runs `payload migrate` and then `pnpm build`. Run the migration with the **direct** connection (`DATABASE_URL_UNPOOLED`) rather than the pooled one, and check Neon's pooling notes for why;
   - add `vercel.json` with `"buildCommand": "pnpm run build:vercel"`;
   - every later phase that changes collections, globals or fields must add a new migration;
   - never run `payload migrate` against the `dev` branch (it uses push).
5. Leave the skipped `/admin` smoke test skipped; tests are re-enabled in phase 12.
6. In the report, tell the developer to push, then open `/admin` on the Vercel deployment and create the first Admin there.

## Goal
The admin panel with the user hierarchy, the media library, and every site-wide setting. The header, footer, chat button and quote panel from phase 02 must read from these settings.

## 1. Users and hierarchy (`users` collection, auth enabled)
- Fields: name, email, `role` (select: `admin`, `editor`; default `editor`), active (checkbox), last login (read-only).
- The hierarchy is **Admin above Editor**:
  - Only Admins can create, edit, deactivate or delete users, or change anyone's `role`.
  - Editors can see and edit only their own profile (name, password), never their role.
  - The first user created is forced to `admin`.
  - The last active Admin cannot be demoted, deactivated or deleted.
- Put access rules in `src/access/` as reusable functions: `isAdmin`, `isAdminOrEditor`, `isAdminOrSelf`, `adminFieldOnly`.
- Write the role list so a new role can be added later in one place.

## 2. Permissions matrix (from the proposal — implement exactly)

| Permission | Admin | Editor |
|---|---|---|
| Create, edit and publish pages and sections | Yes | Yes |
| Upload and manage photos, videos and files | Yes | Yes |
| Edit header, footer and contact details | Yes | Yes |
| View and update enquiries | Yes | Yes |
| Export enquiries | Yes | No |
| Add and manage users | Yes | No |
| Change site settings, redirects and form recipients | Yes | No |
| Delete pages permanently | Yes | No |

- Editors can unpublish and move content back to draft, but cannot delete documents in any content collection.
- Admin-only collections and globals (Users, Redirects, Site Settings, Form Settings recipients) are hidden from Editors in the admin navigation.

## 3. Media (`media` collection, uploads)
- Fields: alt text (required), caption, credit (photographer).
- Accept images, MP4 videos and PDFs.
- Image sizes for hero, card, thumbnail and OG (1200 × 630). Keep the focal point.
- Validation: show a warning, not an error, when a hero image is under 2400 px wide.
- **Storage for Vercel.**
  - Replace `@payloadcms/storage-s3` with `@payloadcms/storage-vercel-blob` for the `media` collection, enabled only when `BLOB_READ_WRITE_TOKEN` is set, with `clientUploads: true`. Without the token, files are stored on local disk (development).
  - Remove the `S3_*` variables from `.env.example` and add `BLOB_READ_WRITE_TOKEN` (empty).
  - Add the Vercel Blob host to `next/image` `remotePatterns`. Read the exact host from the adapter documentation; do not guess it.
  - Do not create a Blob store or any account.

## 4. Globals
**Branding** (Admin and Editor):
- full-colour logo, white logo, favicon (upload), default social share image;
- optional colour overrides for `--blue`, `--green`, `--sun`, `--night` and `--cream`, each with a hex validator. Empty means the prototype value.
- Output the overrides as CSS custom properties on `<html>`. The logo text "AB.TOURS UAE" in the prototype is the fallback when no logo is uploaded.

**Header** (Admin and Editor):
- top-bar tagline;
- top-bar links (array of label + link);
- main menu (array, max 6): label, link to a Page, dropdown intro text, feature photo, and a dropdown links array (name, short line, link);
- header button label and link.
- Links use a shared `link` field group: internal document reference (any routed collection) or external URL, plus "open in new tab".

**Footer** (Admin and Editor):
- description, link columns (array: heading + links), bottom line text, legal links.
- Seed the columns in the order B2B & Corporate, About Us, Resources, Contact.

**Contact Details** (Admin and Editor): office address, phone, WhatsApp number, email, office hours, map link, social links (platform + URL), licence numbers.

**Site Settings** (Admin only):
- site name;
- default SEO title suffix and description;
- Google Analytics / Tag Manager ID;
- the 404 page title and text.

**Form Settings**:
- Admin only: recipient emails per route (`leisure`, `outbound`, `b2b`) and the reply-time promise text.
- Admin and Editor: form option lists (quote "What are you planning?" options with photos, budget levels, preferred contact methods, consultation topics, consultation methods, time slots, partner types, partner interests) and the thank-you heading and text.
- Use field-level access to split the two.

## 5. Admin experience
- Group the admin navigation into: Content, Pages, Enquiries, Media, Settings, Users.
- The admin uses the AB Tours logo from Branding.

## Done when
- An Admin and an Editor test account behave exactly as the matrix says.
- Check this by hand in `/admin`, logged in as each account. The automated access tests (Local API with `overrideAccess: false`) are written in phase 12.
- Header, footer, chat button and quote panel render from the globals.
- The report lists every access rule and the test that proves it.
