# 00 — Project rules (apply to every prompt)

You are building the production website and CMS for **AB Tours UAE**, the UAE destination management company of AB Group. Beetrix360 is the agency delivering it. A senior reviewer (Claude) checks every phase before the next one starts.

## What the product is
- A **brand showcase and enquiry website**. It is **not a booking engine**: no cart, checkout, online payment, availability calendar or customer accounts. Online booking belongs to the separate AB Tours OTA built by Iplex.
- Visitors browse and then enquire: Request a Quote, Book a Consultation, Partner Enquiries, WhatsApp.
- **Every page and every section is editable in the CMS.** Editors can create new pages without a developer.
- Language at launch: **English**. Do not build Arabic. Keep text fields simple enough that Payload localization can be switched on later without restructuring.

## Stack (fixed — do not substitute)
- **Next.js** (App Router, TypeScript, React Server Components) with **Payload CMS 3** installed in the same app. The admin panel is at `/admin`.
- **Hosting: Vercel** (AB Group team, paid plan). Beetrix360 has already created the GitHub repository (`ablimo24x7/ab-tours-uae-website`), the Vercel project and the Neon database. **You never change Vercel, Neon or GitHub settings**, and never run the `vercel` or `neon` command-line tools. You commit; the developer pushes, and every push to `main` deploys to Vercel.
- **Database: Neon PostgreSQL** (free plan, added through the Vercel Marketplace), with `@payloadcms/db-postgres`.
  - **Production** uses Neon's main branch. The Vercel integration provides `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct).
  - **Local development** uses a separate Neon branch named `dev`. Its connection string goes in the local `.env` as `DATABASE_URI`. The local PostgreSQL 18 server is an optional offline fallback.
  - The adapter reads `DATABASE_URI` first, then `DATABASE_URL`.
  - **Never mix schema push and migrations on one database** (Payload's docs warn against it). In development, Payload pushes schema changes to the `dev` branch automatically. Production changes only through committed migrations: `pnpm payload migrate:create`, then `payload migrate` in the Vercel build.
  - Never point the dev server, push mode or `vercel env pull` at the production database.
- Media storage: local disk in development. In production use **Vercel Blob** (`@payloadcms/storage-vercel-blob`), enabled only when `BLOB_READ_WRITE_TOKEN` is set, with `clientUploads: true`. Vercel Functions accept request bodies of at most 4.5 MB, and AB Tours will upload videos larger than that, so uploads must go directly from the browser to storage.
- Vercel has no persistent disk. Never write files to the server's file system at runtime in production.
- Email: `@payloadcms/email-nodemailer` (SMTP from environment variables).
- Scheduled jobs: Payload's docs say never to use `autoRun` on serverless platforms. Use **Vercel Cron** to call Payload's jobs endpoints (phase 10).
- Official Payload plugins: `@payloadcms/plugin-seo`, `@payloadcms/plugin-redirects`, `@payloadcms/plugin-nested-docs`. Add no other CMS plugins without asking.
- Fonts via `next/font/google`: **Instrument Serif** (400, normal and italic), **Inter Tight** (300, 400, 500, 600), **DM Mono** (400, 500).
- Styling: CSS Modules or plain CSS with CSS custom properties, ported from the prototype. No UI kit that changes the look.
- Use the current stable Payload 3.x and a Next.js version it supports. Check the versions with `create-payload-app`; do not guess them.

## Design source of truth
`design/prototype-c6.html` is the **approved** design. Match it on desktop (1440 px), tablet (768 px) and phone (375 px): layout, typography, spacing, colours, motion and interactions. If a prompt and the prototype disagree, stop and report it. Do not "improve" the design.

Design tokens (from the prototype):

| Token | Value |
|---|---|
| `--navy` | `#263259` |
| `--navy-deep` | `#18213F` |
| `--night` | `#141A2E` |
| `--blue` | `#0A66E8` |
| `--blue-deep` | `#0846A6` |
| `--blue-night` | `#062F6E` |
| `--green` | `#14804A` |
| `--green-dark` | `#0F6A3D` |
| `--green-bright` | `#1FA463` |
| `--sun` | `#F8C64B` |
| `--sun-deep` | `#E5AE2E` |
| `--sun-ink` | `#1F2937` |
| `--cream` | `#F5EFE6` |
| `--sand` | `#EDE5D8` |
| `--line` | `#E2D8C8` |
| `--muted` | `#6A6F7E` |
| `--tint-blue` | `#E3EFFC` |
| `--tint-green` | `#E9F5EE` |
| `--ink` | `#1C2440` |
| `--radius` | `18px` |
| `--serif` | Instrument Serif |
| `--sans` | Inter Tight |
| `--mono` | DM Mono |

The prototype contains earlier design layers (v3, v4, Design C, then the C2–C6 overrides). Only the **final computed result** matters: inspect the rendered page, not the first rule you find.

## URL structure (fixed)

| URL | Page |
|---|---|
| `/` | Homepage |
| `/uae-experiences` | Overview (customisable Page) |
| `/uae-experiences/{emirate}` | dubai, abu-dhabi, sharjah, ras-al-khaimah, fujairah, umm-al-quwain |
| `/uae-experiences/day-trips` and `/uae-experiences/day-trips/{trip}` | Day trips list and detail |
| `/uae-experiences/multi-city-packages` and `/uae-experiences/multi-city-packages/{package}` | Packages list and detail |
| `/uae-experiences/attraction-tickets` | Attraction tickets |
| `/international-holidays` | Overview (customisable Page) |
| `/international-holidays/{style}` | easy-visa-destinations, budget-packages, midrange-packages, premium-packages, cruises |
| `/international-holidays/bespoke-itineraries` | Bespoke itineraries |
| `/b2b-corporate` and `/b2b-corporate/{service}` | dmc-services, transportation-services, mice, visa-services, corporate-travel |
| `/about` and `/about/{page}` | company-profile, why-ab-tours, strategic-partners, testimonials |
| `/resources` | Overview |
| `/resources/travel-guides` and `/resources/travel-guides/{guide}` | Travel guides list and article |
| `/resources/blog` and `/resources/blog/{post}` | Blog list and post |
| `/resources/faqs` | FAQs |
| `/contact` | Contact page |
| `/contact/request-a-quote`, `/contact/consultation-request`, `/contact/partner-enquiries` | Enquiry forms |
| Legal pages | Privacy policy and Terms, as customisable Pages, for example `/privacy-policy` and `/terms` |
| Anything else | 404 page |

URLs are built by the system from type, slug and parent. Editors never type a free URL.

## Working rules
1. Do only what the current prompt asks. If something is unclear or missing, **stop and ask**. Never invent business content (phone numbers, licence numbers, prices, partner names, testimonials). Use the placeholders from the prototype, such as `[Phone]` or `[Testimonial text from the CMS …]`.
2. Strict TypeScript. Use Payload's generated types (`payload generate:types`). No `any` unless explained in a comment.
3. Keep secrets in environment variables. Keep `.env.example` complete and up to date.
4. Accessibility:
   - semantic HTML and keyboard access for every interactive element;
   - visible focus;
   - alt text from the media library;
   - support for `prefers-reduced-motion`.
5. Performance: `next/image` for photos; videos `muted playsinline`, lazy and paused when off screen; no layout shift from fonts.
6. **Dev first, tests later.** Each phase is checked by looking at the pages in the browser, on the dev server the developer runs, plus `pnpm lint` and `pnpm typecheck`. Run `pnpm build` once at the end of a phase.
   - Do **not** write or run automated tests (Playwright, vitest) before phase 12, unless a prompt or the reviewer explicitly asks for one.
   - **The developer runs the dev server, not you.** Never start, restart or stop `pnpm dev`, `pnpm start` or any other long-running process. Assume it is already running at `http://localhost:3000` and reloads your changes. If you need a page checked, ask the developer to open it and tell you what they see.
   - Only run commands that finish by themselves: `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm install`, `pnpm generate:types`, git.
   - If any command runs for more than 3 minutes without finishing, stop it and report what happened, instead of waiting.
   - Use pnpm. Use npm or yarn only if the project was set up with them.
7. Commit at the end of each phase with a clear message.
8. End every phase with a **report for the reviewer**:
   - what was built and the files changed;
   - how to run and test it;
   - known gaps;
   - every place you deviated from the prompt or the prototype, and why.
