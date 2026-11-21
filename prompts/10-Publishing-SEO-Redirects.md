# 10 — Publishing, preview, SEO and redirects

Follow `00-Project-Rules.md`. Use the official Payload docs for every option below. If an option behaves differently in the installed version, report it rather than working around it silently.

## 1. Drafts and scheduled publishing
- Enable versions with drafts on `pages` and every routed collection: emirates, dayTrips, packages, holidayStyles, b2bServices, guides, blogPosts. Also enable them on the tickets, destinations, adventures, partners, testimonials and faqs collections.
- Enable `schedulePublish` (`versions.drafts.schedulePublish: true`).
- Scheduled publishing runs as a background job in the Payload **Jobs Queue**. The site runs on Vercel, so:
  - do **not** use `autoRun`;
  - add **Vercel Cron** jobs to the existing `vercel.json` (created in phase 03) that call Payload's jobs endpoints (`/api/payload-jobs/handle-schedules` and `/api/payload-jobs/run`, as named in the Payload Jobs Queue docs for serverless platforms);
  - protect those calls with `CRON_SECRET`, following the current Vercel Cron documentation for how the secret is sent.
- Vercel's Hobby plan runs cron jobs at most **once per day**, so scheduled posts could go live hours late. The Pro plan allows once per minute. Set the schedule for Pro (every 5 minutes) and note the plan requirement in the README.
- For local testing, provide a script that calls the same endpoints with the secret.
- Do not change Vercel project settings; cron comes from `vercel.json` in the repository.
- The public site shows published content only.

## 2. Live preview
- Configure `admin.livePreview` with a `url` function that returns the front-end URL of the document being edited, through a preview route that turns on Next.js draft mode using `PREVIEW_SECRET`.
- Breakpoints: Mobile 375 × 812, Tablet 768 × 1024, Desktop 1440 × 900.
- Enable it for Pages and all routed collections. Editors see unsaved changes update in the preview.

## 3. On-demand revalidation
Publishing, unpublishing, or changing a global (Header, Footer, Branding, Contact Details) revalidates the affected paths immediately.

## 4. SEO (`@payloadcms/plugin-seo`)
- Add SEO fields (meta title, meta description, image) to Pages and every routed collection.
- `generateTitle`: "{title} | AB Tours UAE". `generateDescription`: from the intro or lead.
- Fallback image: the Branding share image.
- Each route's `generateMetadata` outputs:
  - title, description, canonical URL, Open Graph and Twitter tags;
  - `noindex` when an editor ticks it (add a `noindex` checkbox to the SEO group).
- `app/sitemap.ts`: every published, indexable URL with `lastModified`. `app/robots.ts` points to it.
- JSON-LD:
  - `TravelAgency` with name, URL, logo, address, telephone and `sameAs` social links from Contact Details, on every page;
  - `BreadcrumbList` on inner pages;
  - `FAQPage` on any page showing FAQs;
  - `Article` on guides and blog posts.

## 5. Redirects (`@payloadcms/plugin-redirects`)
- Admin-only collection (from the plugin).
- A hook on Pages and every routed collection: when a published document's slug or parent changes, automatically create a 301 from the old path to the new one, and avoid redirect chains and loops.
- The route resolver checks redirects before returning 404.

## 6. Analytics
Load Google Analytics or Tag Manager with `next/script` **only** when the Site Settings ID is filled in. Do not add a cookie banner unless asked; list the question in the report for AB Tours.

## Done when
- A scheduled publish goes live at the set time in a local test, with the job runner running.
- Live preview updates while typing.
- Renaming a published page creates a working 301.
- `/sitemap.xml` and `/robots.txt` are correct.
- Rich Results Test-valid JSON-LD is shown for the homepage, one emirate, the FAQs page and one guide.
