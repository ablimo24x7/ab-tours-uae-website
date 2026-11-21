# 13 — Launch and handover

Follow `00-Project-Rules.md`. The proposal commits to delivering on **7 December 2026**:
- the live site on the AB Tours UAE .ae domain with SSL;
- the CMS at `/admin` with Admin and Editor accounts;
- all content entered;
- forms emailing the right team;
- search setup and analytics;
- an editor guide (PDF) and a training session;
- the source code and access to every account.

## 1. Production readiness
- Remove the temporary `/styleguide` route.
- Use Payload database **migrations** for Postgres. Commit them, and run them as part of deployment instead of auto-pushing schema changes in production.
- Production environment variables, all documented in `.env.example` and `DEPLOYMENT.md`:
  - database;
  - `PAYLOAD_SECRET`;
  - `BLOB_READ_WRITE_TOKEN` (Vercel Blob);
  - SMTP;
  - `NEXT_PUBLIC_SERVER_URL` (the .ae domain);
  - `PREVIEW_SECRET`, `CRON_SECRET`.
- Scheduled jobs (phase 10) run in production.
- Security:
  - HTTP security headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, a Content Security Policy that allows the analytics provider and media storage);
  - admin rate limiting on login;
  - strong password rules for users.
- Error pages and logging without personal data.

## 2. `DEPLOYMENT.md` — Vercel
The Vercel project (AB Group team), the GitHub repository and the Neon database were set up by Beetrix360 on 21 November. Document how they are set up, for the handover:
- the GitHub repository and how pushes to `main` deploy;
- Neon: the main branch for production, the `dev` branch for local development, and the free-plan limits (1 GB storage per project, 100 compute-hours a month, 10 branches, suspend after 5 minutes idle, so the first request after a quiet period is slower). Say whether the site is close to any limit and when to move to a paid Neon plan;
- Create a Vercel Blob store and set `BLOB_READ_WRITE_TOKEN`. Check that uploads larger than 4.5 MB (videos) work through `clientUploads`.
- Set every other environment variable for Production and Preview.
- Migrations run in the Vercel build (`build:vercel`, from phase 03). Document how to create one and what happens when one fails (the deployment is rejected).
- Cron jobs from `vercel.json` are active, and the plan supports the schedule (Pro).
- Connect the .ae domain in Vercel and confirm SSL.
- Email: SMTP settings, with SPF/DKIM notes for the sending domain.
- Backups: the database provider's backup and restore, plus how to export the Blob store.
- Roll back with Vercel's instant rollback, and how to handle a migration that must be reversed.
- Preview deployments never use production data: either turn on Neon's per-branch Preview databases (mind the 10-branch limit on the free plan) or keep work on `main` only.

## 3. Launch checklist (`LAUNCH-CHECKLIST.md`)
- DNS and SSL.
- Admin and Editor accounts created by AB Tours' Admin. Remove the test Editor.
- Form recipients filled in.
- Analytics ID filled in.
- Placeholder media replaced (list any still in use).
- Placeholders such as `[Phone]` replaced (list any still on the site).
- Sitemap submitted to Google Search Console.
- 301s from any old AB Tours URLs, if AB Tours provides a list.

## 4. Editor guide (`docs/editor-guide.md`, also exported to PDF)
Written for non-technical AB Tours staff, with screenshots from the admin:
- logging in;
- roles (what Admins and Editors can do);
- editing the homepage sections (edit, reorder, hide, add);
- creating a new page under a section;
- editing emirates, day trips, packages, tickets, holiday styles and destinations, B2B services, guides, blog posts and FAQs;
- media library and image sizes (same as the content request forms);
- prices ("From AED" or "On request");
- drafts, preview and scheduling;
- header, footer, contact details and branding;
- working with enquiries and clients (statuses, owner, notes; export for Admins);
- managing users (Admins).

## 5. Handover (`HANDOVER.md`)
- Repository location.
- List of every account and service created for the project, with who owns it. Never put passwords in the file.
- How to update dependencies.
- Known limitations and items left for later. Expected: Arabic version, booking or OTA connection, cookie banner if AB Tours wants one.

## Done when
The reviewer can deploy from `DEPLOYMENT.md` to a staging server without help, the launch checklist is complete, and the editor guide PDF exists.
