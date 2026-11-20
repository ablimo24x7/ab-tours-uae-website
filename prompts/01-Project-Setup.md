# 01 — Project setup

Follow `00-Project-Rules.md`.

## Goal
A running Next.js + Payload CMS 3 project, with the admin panel at `/admin` and an empty public site, ready for the next phases.

## Do
1. The repository already contains `AGENTS.md`, `README.md`, `.gitignore`, `design/`, `docs/` and `prompts/`. **Do not delete or overwrite them.** Scaffold with the official `create-payload-app` (blank template, Postgres) into a temporary folder, move the generated files into the repository root, merge the generated `.gitignore` and README instructions into the existing files, then delete the temporary folder. Record the exact Next.js and Payload versions installed in the report.
2. Install and register:
   - `@payloadcms/db-postgres`
   - `@payloadcms/plugin-seo`, `@payloadcms/plugin-redirects`, `@payloadcms/plugin-nested-docs` (installed and registered; their configuration comes in phases 05 and 10)
   - `@payloadcms/email-nodemailer`
   - `@payloadcms/storage-s3`, enabled only when `S3_BUCKET` is set
3. Folder structure:
   - `src/app/(frontend)` — public site
   - `src/app/(payload)` — admin, as generated
   - `src/collections`, `src/globals`, `src/blocks`, `src/access`, `src/fields` (shared field groups), `src/hooks`
   - `src/components` (public UI), `src/lib` (helpers), `src/seed`, `tests`
4. Write `.env.example` with:
   - `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM_NAME`, `EMAIL_FROM_ADDRESS`
   - `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
   - `PREVIEW_SECRET`, `CRON_SECRET`
5. No Docker. Local development uses the PostgreSQL server already installed on the machine (PostgreSQL 18, Windows service `postgresql-x64-18`). Document in the README how to create the `ab_tours_uae` database with `createdb` or pgAdmin, and how to set `DATABASE_URI` in `.env`. Never write the database password into any committed file.
6. Scripts:
   - `dev`, `build`, `start`, `lint`, `typecheck`, `generate:types`
   - `seed` (empty for now)
   - `test:e2e`, with Playwright installed and a single smoke test that loads `/` and `/admin`
7. Load the three fonts with `next/font/google` and expose them as `--serif`, `--sans` and `--mono` on `<html>`.
8. Copy every design token from `00-Project-Rules.md` into `src/app/(frontend)/styles/tokens.css`.
9. Write a `README.md` explaining how to run the project locally.

## Do not
- Build pages, collections or components yet.
- Add a UI framework or Tailwind.

## Done when
- With the local PostgreSQL database created and `.env` filled in, `pnpm dev` starts the app.
- `/admin` shows the "create first user" screen.
- `/` renders an empty page with the fonts loaded.
- Lint, typecheck, build and the smoke test pass.
- The report lists the installed versions.
