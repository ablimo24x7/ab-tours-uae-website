# Review checklist (for Claude as reviewer)

Use this after each Antigravity phase. A phase passes only when every check for it is met, or the gap has been explicitly accepted by Beetrix360.

## How to ask Claude for a review
Open the repository in Claude Code and send:

> Review phase NN of the AB Tours UAE build. Read `prompts/NN-….md`, `prompts/00-Project-Rules.md` and the "Phase NN" section of `prompts/REVIEW-Checklist.md`. Compare against `design/prototype-c6.html`. Check the diff since the last phase, run lint and typecheck (and build at the end of the phase), and open the pages in the dev server in the browser. Report: pass or fail for each check, bugs with file and line, design differences with screenshots, and the exact fix list to send back to Antigravity. Do not fix the code yourself unless I ask.

Copy this folder into the repository as `prompts/` so these paths work.

## Checks for every phase
- [ ] Only the work in the prompt was done. Nothing was added that the proposal excludes: booking, cart, payment, accounts, Arabic.
- [ ] No Vercel, database, storage or email account was created, logged in to or linked, and nothing was deployed, unless Beetrix360 asked for it in phase 13.
- [ ] No invented business content: phone numbers, prices, partner names, testimonials, licence numbers.
- [ ] Lint and typecheck pass; build passes once at the end of the phase. No automated tests were added before phase 12 unless asked.
- [ ] No command was left hanging (dev server in the background; nothing waited on for more than 3 minutes).
- [ ] No secrets in the code; `.env.example` is updated.
- [ ] The report lists every deviation from the prompt or the prototype.

## Phase checks
**01 Setup**
- [ ] The Payload 3 and Next.js versions are recorded and are versions Payload supports.
- [ ] Postgres adapter in use.
- [ ] Plugins installed: SEO, Redirects, Nested Docs.
- [ ] Nodemailer email adapter and S3 storage adapter configured, with S3 only when its environment variables are set.
- [ ] All three fonts are loaded through `next/font`, and every token is in `tokens.css`.

**02 Design system and shell**
- [ ] The header matches C6:
  - [ ] logo left, three menu items centred, yellow button right;
  - [ ] transparent over the hero, solid when scrolled;
  - [ ] dropdowns with intro, links and photo;
  - [ ] burger menu below 1320 px.
- [ ] Footer columns are in the order B2B & Corporate, About Us, Resources, Contact.
- [ ] The quote panel traps focus, closes on Escape and pre-fills from `data-quote`.
- [ ] Reduced motion is respected.

**02A Front end with temporary data**
- [ ] No database or Payload calls in public pages. The site runs with PostgreSQL stopped.
- [ ] All temporary data is in `src/content/static/`, copied exactly from the prototype. Components get content only through props. Pages load data only through `src/content/index.ts`.
- [ ] Types in `src/content/types.ts` use the field names from phases 04 and 05.
- [ ] Every URL in `AGENTS.md` renders in the dev server and matches the prototype at 1440, 768 and 375 px (reviewer checks in the browser).
- [ ] Every interaction from phase 06 works by hand.

**Database setup (start of phase 03)**
- [ ] `ab_tours_uae` exists locally. The password is only in `.env`. `/admin` shows the create-first-user screen.

**03 CMS foundation**
- [ ] The permissions matrix matches the proposal exactly; checked by hand with an Admin and an Editor account (automated tests in phase 12).
- [ ] The first user is an Admin. The last Admin cannot be removed. Editors cannot change roles.
- [ ] Media uses Vercel Blob with `clientUploads: true` when `BLOB_READ_WRITE_TOKEN` is set, and local disk otherwise. S3 is removed.
- [ ] Branding, Header, Footer, Contact Details, Site Settings and Form Settings exist. Form recipients are Admin-only.
- [ ] The front end reads the header, footer, WhatsApp number and logo from the CMS.

**04 Collections**
- [ ] 18 collections in total, matching the proposal's "18 collections": users, media, pages, emirates, dayTrips, packages, tickets, holidayStyles, destinations, b2bServices, adventures, partners, testimonials, guides, blogPosts, faqs, clients, enquiries.
- [ ] The content-form-to-field mapping table has no unexplained gaps.
- [ ] The price field renders "From AED …" or "Price on request".

**05 Page builder and routing**
- [ ] Only the loaders in `src/content/index.ts` and the routes changed. Pages look the same as the pages approved in phase 02A.
- [ ] Every visible text, image and list in every block is a field with prototype defaults.
- [ ] Blocks can be hidden, reordered and added on any Page. Typed pages have `sectionControls` and `extraSections`.
- [ ] An Editor can create a new page under any section, and it publishes at the right URL.
- [ ] URL clashes are blocked. Unknown URLs return 404.

**06 Homepage**
- [ ] The 16 blocks are in C6 order and look identical at 1440, 768 and 375 px (checked in the browser).
- [ ] Hero: next slide peeks, 8-second advance, pause, counter, only the active video plays.
- [ ] Sticky stacked packages; film chapters autoplay and advance; statement words light up on scroll; spin, accordion, hearts and My trip all work.
- [ ] No gradient fades between sections. The season card bridges into the dark B2B section.

**07 and 08 Templates**
- [ ] Every URL in `00-Project-Rules.md` renders.
- [ ] Every prototype page matches the prototype in the browser.
- [ ] Pages with no prototype (day trip detail, guide article, blog post, legal) use only existing components and look consistent with the rest.
- [ ] Every call to action is an enquiry. Pre-fill texts follow the prototype ("Day trip: …", "Tickets: …", "{style}: {destination}").

**09 Forms, clients and enquiries**
- [ ] Every form creates or matches a **client** and creates an **enquiry** with its source page, route and status.
- [ ] Route rules are correct, and the email goes to the route's recipients.
- [ ] Honeypot, minimum submit time and rate limit all work.
- [ ] The CSV export is Admin-only. Editors cannot delete. There is no public API access to clients or enquiries.
- [ ] No personal data in the logs.

**10 Publishing and search**
- [ ] Drafts, live preview and scheduled publishing work. No `autoRun`. `vercel.json` cron calls the Payload jobs endpoints with `CRON_SECRET`, and a local script tests it.
- [ ] SEO fields are on every page type. Metadata, canonical URLs, sitemap, robots and JSON-LD are valid.
- [ ] Renaming a published page creates a 301 with no chains. Analytics loads only when the ID is set.

**11 Seed**
- [ ] Every prototype text is copied exactly, placeholders included.
- [ ] Media are labelled as placeholders. The seed is idempotent and refuses to run in production.

**12 Quality**
- [ ] The deferred tests are written (admin smoke test, access control, forms and enquiries), and Playwright passes on Chromium, Firefox, WebKit, mobile and tablet with a reporter that always exits.
- [ ] axe reports no serious or critical issues. Contrast exceptions are listed for a decision.
- [ ] Lighthouse scores and the visual comparison folder are delivered.

**13 Launch and handover**
- [ ] Migrations are used in production. Security headers are set. The styleguide route is removed.
- [ ] `DEPLOYMENT.md` covers Vercel: hosted PostgreSQL, Blob store, uploads over 4.5 MB, environment variables, migrations, cron on Pro, domain and SSL, rollback, and preview deployments kept off production data.
- [ ] `DEPLOYMENT.md`, `LAUNCH-CHECKLIST.md`, `HANDOVER.md` and the editor guide PDF exist and are accurate.

## Proposal commitments → where they are built

| Commitment in the proposal | Phase |
|---|---|
| Video cover, five slides, next slide at the side, pause | 06 |
| Film section with five chapters | 06 |
| Mood and holiday-style filters, save-to-trip hearts, spin compass | 06 |
| Quote panel on every page, pre-filled; WhatsApp button | 02, 09 |
| Scroll animations, hover videos, stacked package panels | 02, 06 |
| Responsive on phones, tablets and desktops | 02–08, 12 |
| Every page a CMS item; homepage sections editable, re-orderable, hideable, addable | 04, 05, 06 |
| Header, menus, footer, contact details and WhatsApp edited once | 03 |
| Media library with alt text | 03 |
| Drafts, preview, scheduled publishing | 10 |
| Search fields, automatic web addresses, redirects on rename | 05, 10 |
| Leads with source page and status, emailed to the right team; export | 09 |
| Admin and Editor roles, exact permission table, unlimited accounts | 03 |
| 18 collections | 03, 04, 09 |
| Pages at launch: homepage, 5 overviews, 6 emirates, day trips, 4 packages, tickets, 6 holiday pages, 5 B2B, 4 About, 3 Resources, 4 Contact, 3 legal/system | 05–08, 11 |
| Spam protection | 09 |
| Titles, descriptions, social images, structured data, XML sitemap, analytics | 10 |
| Image and video optimisation, page speed | 06, 12 |
| Testing on devices; form, link and accessibility checks | 12 |
| Live deployment, domain and SSL | 13 |
| Editor guide (PDF) | 13 |
| Source code and account handover | 13 |
| Added on 20 Nov: form submissions become **clients** in the CMS | 09 |
| Added on 20 Nov: **user hierarchy** (Admin above Editor) | 03 |

**Not built by Antigravity** (people work in the proposal):
- kick-off, progress calls and launch sign-off;
- design sign-off;
- entering AB Tours' real content from the returned content forms (16 hours);
- preparing AB Tours' photos and videos (8 hours);
- the AB Tours review round;
- the training session.

The CMS from phases 03–11 is what the content specialist uses for the content entry.
