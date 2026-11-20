# 02A — Front end of every page with temporary data (no database)

Follow `AGENTS.md` (the same rules as `00-Project-Rules.md`). Run this after phase 02. **Do not use the database or Payload in this phase.** The CMS is connected later, in phases 03–10.

## Goal
Build the complete public website (homepage, every template and every interaction) so it looks and works exactly like `design/prototype-c6.html`. Use temporary typed data taken from the prototype. Later phases swap that data for the CMS without changing how the pages look.

## Design and behaviour to build
Build everything described in these prompts, **but with temporary data instead of CMS blocks and collections**:
- `prompts/06-Homepage.md`: all 16 homepage sections in C6 order, the hero slider, save-to-my-trip and every interaction listed there.
- `prompts/07-UAE-Experiences-Templates.md`: emirate pages, day trips list and the approved day trip detail page, packages list and package detail, attraction tickets.
- `prompts/08-Holidays-B2B-About-Resources-Contact-Templates.md`: International Holidays overview, style pages and Bespoke; B2B overview and services; the four About pages; Travel Guides list and article; Blog list and post; FAQs; Contact page and the three form pages; Privacy policy and Terms; the 404 page.

Ignore the parts of those prompts about the admin, `sectionControls`, `extraSections`, drafts or revalidation; they come later. Forms show their success state but don't send anything yet (phase 09).

## How to structure it so the CMS can be plugged in later
1. **Temporary data in one place.** Put it in `src/content/static/`, one file per content type:
   - `emirates.ts`, `dayTrips.ts`, `packages.ts`, `tickets.ts`, `holidayStyles.ts`, `destinations.ts`, `b2bServices.ts`, `adventures.ts`, `guides.ts`, `blogPosts.ts`, `faqs.ts`, `partners.ts`, `testimonials.ts`;
   - `homepage.ts`: the 16 sections as an ordered array of `{ blockType, ...fields }`;
   - `site.ts`: header, footer, contact details and form options.

   Copy the text **exactly** from the prototype's data arrays and templates, including placeholders such as `[Phone]`. Do not invent content.
2. **Types that match the future CMS.** Define TypeScript types in `src/content/types.ts` with the field names from `prompts/04-Content-Collections.md` and `prompts/05-Page-Builder-Blocks-and-Routing.md`. For example, a day trip has `title`, `slug`, `emirate`, `shortDescription`, `cardImage`, `highlights` and `price`, and price has `priceType` and `amountAED`.
3. **Components never import data.** Every section and card component receives its content through props. Pages load data through functions in `src/content/index.ts`, for example `getEmirate(slug)`, `getHomepage()`, `getDayTrips({ emirate })`. In phase 05 only those functions change, from static data to the Payload Local API.
4. **One `RenderBlocks` component** renders the homepage from `homepage.ts` by `blockType`, using the block names in phase 05. The CMS page builder then reuses it unchanged.
5. **Images and videos.** Use the prototype's Unsplash and Pexels URLs for now, through `next/image`, with `images.unsplash.com` added to `remotePatterns`. Keep an `alt` text on every image object. Videos keep an image fallback.
6. **Routes.** Create every URL from the table in `AGENTS.md`, using App Router pages with `generateStaticParams` from the static data. Phase 05 replaces them with one catch-all route; keep each route file small so that swap is easy. Unknown URLs show the 404 page.
7. **Remove** the temporary `/styleguide` route from phase 02 only if every component is now visible on a real page. Otherwise keep it.

## Rules
- No database, no Payload Local API, no `/admin` changes in this phase.
- No gradient fades between sections.
- Every interaction works with a keyboard and respects reduced motion.

## Done when
- Every URL in `AGENTS.md` renders with prototype content, with the database switched off.
- Every interaction from phase 06 works in the dev server: hero slider, plan bar, mood and holiday-style chips, film chapters, spin, B2B accordion, hearts and My trip, quote panel, mobile menu and the three-step quote form. Check each one by hand and list it in the report. Automated tests come in phase 12.
- `pnpm lint` and `pnpm typecheck` pass, and `pnpm build` passes once at the end.
- `reports/phase-02A.md` lists every route, the data files, and any prototype content that could not be copied exactly.
