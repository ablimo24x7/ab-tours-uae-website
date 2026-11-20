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
**Accounts are connected in this phase only, and only when Beetrix360 confirms which accounts to use.** The Vercel team and plan, the database provider and the Blob store must be in AB Tours' name or approved by AB Tours.

Step-by-step deployment to Vercel:
- Import the Git repository into a Vercel project (framework: Next.js).
- Create a hosted PostgreSQL database (for example Neon from the Vercel Marketplace) and set `DATABASE_URI` to its connection string, as the provider recommends for serverless.
- Create a Vercel Blob store and set `BLOB_READ_WRITE_TOKEN`. Check that uploads larger than 4.5 MB (videos) work through `clientUploads`.
- Set every other environment variable for Production and Preview.
- Run database migrations before the new deployment serves traffic, for example `payload migrate` in the build step. Document the exact command.
- Cron jobs from `vercel.json` are active, and the plan supports the schedule (Pro).
- Connect the .ae domain in Vercel and confirm SSL.
- Email: SMTP settings, with SPF/DKIM notes for the sending domain.
- Backups: the database provider's backup and restore, plus how to export the Blob store.
- Roll back with Vercel's instant rollback, and how to handle a migration that must be reversed.
- Preview deployments use a separate database branch or database, never production data.

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
