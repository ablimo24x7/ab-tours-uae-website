# Approved decisions

Decisions made by Beetrix360 and AB Tours that the build must follow. Newest first.

| Date | Decision |
|---|---|
| 21 Nov 2026 | **The developer runs the dev server.** Antigravity only writes code and runs commands that finish by themselves (lint, typecheck, build, install, git). |
| 21 Nov 2026 | **Dev first, tests later.** Phases are checked in the dev server in the browser, with lint and typecheck. Automated tests (Playwright, vitest) wait until phase 12. No command is waited on for more than 3 minutes. |
| 21 Nov 2026 | **Hosting: Vercel.** Hosted PostgreSQL in production, Vercel Blob for media (direct uploads, to get around the 4.5 MB limit), Vercel Cron for scheduled publishing (Pro plan for runs more often than daily). No accounts are created or linked until phase 13. |
| 21 Nov 2026 | **Front end first.** Build every public page with temporary prototype data (phase 02A) before the database and CMS. The database is set up at the start of phase 03. |
| 20 Nov 2026 | **No Docker.** Local development uses the PostgreSQL 18 server installed on the machine (Windows service `postgresql-x64-18`). |
| 20 Nov 2026 | Build a **day trip detail page** at `/uae-experiences/day-trips/{trip}` from existing C6 components. C6 has no design for it; the proposal lists every day trip as its own CMS item. |
| 20 Nov 2026 | Every form submission creates or matches a **client** in the CMS, and adds an **enquiry** linked to that client. |
| 20 Nov 2026 | **User hierarchy:** Admin above Editor, exactly as in the proposal's permission table. More roles would be a scope change. |
| 20 Nov 2026 | Logo and brand details are editable in the CMS. The approved C6 design is the default. |
| 19 Nov 2026 | Approved design: **Design C6** (`design/prototype-c6.html`). |
| 19 Nov 2026 | Main menu has only UAE Experiences, International Holidays and B2B & Corporate, centred between the logo and the Request a Quote button. |
| 19 Nov 2026 | Footer columns, after the logo column: B2B & Corporate, About Us, Resources, Contact. |
| 19 Nov 2026 | No gradient fades between sections. Section edges are straight. |
| 19 Nov 2026 | No design switcher (A/B/C) on the website. |
| 19 Nov 2026 | English only at launch. Arabic later, quoted separately. |
| 19 Nov 2026 | Brand showcase and enquiry platform only. No booking, cart, payment or OTA connection. |

## Still open (waiting for AB Tours)
- Include Ajman as an emirate page: yes or no.
- Destinations for each international holiday style, and the cruise routes.
- Final .ae domain.
- UAE tourism licence numbers.
- Reply-time promise and the email addresses for each enquiry route.
- Vercel team and plan (Pro recommended), the hosted PostgreSQL provider and the Blob store: whose account each is in.
- Cookie banner: wanted or not.
