# 11 — Seed content from the prototype

Follow `00-Project-Rules.md`.

## Goal
`pnpm seed` fills an empty database so the site looks exactly like `design/prototype-c6.html`. AB Tours can then replace the content in the CMS.

## Source
Extract the data arrays from the prototype's `<script>`:
- `HERO`, `CHAPTERS`, `ADVENTURES`, `ADV_VID`, `EM_VID`
- `EMIRATES`, `DAYTRIPS`, `PACKAGES`, `DAYS`, `TICKETS`
- `DEST`, `OUTBOUND`, `GUIDES`, `B2B`, `MOODS`, `SITEMAP`
- the `IMG` photo ids

Also use the fixed texts in the homepage and page templates (`P.home`, `P.emirate`, `P.about`, `P.contact` and the others). Copy text exactly, including placeholders such as `[Phone]`, `[Year]` and `[Testimonial text from the CMS …]`. Do not invent replacements.

## Media
- Photos are the prototype's Unsplash URLs (`U(id, w)`). Videos are the Pexels URLs (`V(id)`).
- Download each one once into the Media collection, at a sensible width, with:
  - alt text from the item it belongs to;
  - credit "Placeholder — Unsplash" or "Placeholder — Pexels";
  - caption "Replace with AB Tours content".
- If a download fails, log it, continue, and list it in the report.

## What to create
1. Globals:
   - Branding: empty logos, so the text fallback is used;
   - Header: the three menus with intros, links and photos from `SITEMAP`;
   - Footer: columns B2B & Corporate, About Us, Resources, Contact;
   - Contact Details: placeholders;
   - Site Settings;
   - Form Settings: all option lists from the prototype forms; recipients empty.
2. Collections:
   - 6 emirates, 8 day trips, 4 packages (itineraries from `DAYS`, using the prototype's rule for shorter packages), 6 tickets;
   - 5 holiday styles plus bespoke, with destinations from `OUTBOUND` and `DEST`;
   - 5 B2B services, 8 adventures;
   - 6 guides, 3 blog posts (placeholder text);
   - FAQs (the questions in the prototype, with placeholder answers);
   - 6 placeholder partners per group, 6 placeholder testimonials.
3. Pages:
   - homepage with the 16 blocks in C6 order;
   - the six overview pages;
   - the list pages (Day Trips, Multi-City Packages, Attraction Tickets, Travel Guides, Blog, FAQs);
   - the four About pages;
   - Contact and its three form pages;
   - Privacy policy and Terms (placeholder text);
   - every page with its correct parent.
4. Users: one Admin from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` (environment only, never hard-coded) and one test Editor in development only.

## Rules
- Idempotent: running it twice does not create duplicates.
- `--reset` wipes content first, and only when `NODE_ENV` is not `production`. Seeding refuses to run in production unless `--allow-production` is passed.
- All seeded documents are published.

## Done when
- After `pnpm seed`, every prototype route and its new URL look the same when checked in the dev server.
- The report lists any prototype text or media that could not be seeded.
