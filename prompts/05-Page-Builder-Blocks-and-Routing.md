# 05 — Page builder, blocks and routing

Follow `00-Project-Rules.md`.

**Switch from temporary data to the CMS.** Phase 02A built every page with temporary data in `src/content/static/` and loader functions in `src/content/index.ts`.
- In this phase, change only those loader functions to read from the Payload Local API, and replace the per-route page files with the catch-all route below.
- Make the block fields match the props the 02A components already take.
- The pages must look exactly the same before and after the switch. Compare against the pages approved in the phase 02A review.

## Goal
Editors can build any page from sections, edit the overview pages (UAE Experiences, International Holidays, B2B & Corporate, About Us, Resources, Contact), create **new pages** anywhere in the structure, and every URL resolves to the right template.

## 1. `pages` collection
- Fields:
  - title, slug, parent (Nested Docs plugin; breadcrumbs and full path generated);
  - `layout` (blocks field, the full library below);
  - `isHomepage` (checkbox, only one allowed; Admin-only to change);
  - SEO (phase 10).
- The overview pages, the list pages (Day Trips, Multi-City Packages, Attraction Tickets, Travel Guides, Blog, FAQs), the About sub-pages, the Contact page and its three form pages, and the legal pages are all **Pages built from blocks**. This makes every one of them fully customisable.
- Editors can create a new page under any parent (for example a new page under International Holidays) and choose its sections freely.

## 2. Block library (`src/blocks/`)
- Every block has a `settings` group: hidden (checkbox), anchor ID, and a light/dark theme where the prototype uses both.
- Every heading, eyebrow, intro, button label, image and list item is a field. Nothing visible is hard-coded.
- Defaults equal the prototype text.

**Homepage blocks** (exact designs in phase 06)

| Block | Fields |
|---|---|
| `heroSlider` | slides: location label, headline, video, fallback image; film button label; anchor of the film block |
| `planBar` | labels; travel-date options; "Explore" options built from the Header menu |
| `thingsToDo` | eyebrow, heading, intro, link; "All day trips" label; mood filters: name, icon from a fixed icon set, items (title, emirate relation, image, link) |
| `packagesStack` | eyebrow, heading, intro, link, packages (relation; empty means all) |
| `adventuresRail` | eyebrow, heading, intro, source (all, by emirate, selected) |
| `holidayStylesFilter` | eyebrow, heading, intro, link, holiday styles (relation) |
| `filmChapters` | eyebrow, heading, intro, chapters: name, place, video, poster |
| `statement` | eyebrow, text, highlighted phrase |
| `emiratesRail` | eyebrow, heading, intro, emirates (relation) |
| `spinCompass` | eyebrow, heading, line, button label |
| `seasonCampaign` | tag, headline, highlighted last word, text, quick links (label + link), button label and quote item, background image, "bridge into dark section below" toggle |
| `b2bAccordion` | eyebrow, heading, intro, services (relation) |
| `partnersStrip` | label, partners (relation; empty means "show on homepage" partners) |
| `momentsWall` | hashtag, heading, intro, photos (image + caption) |
| `guidesGrid` | eyebrow, heading, link, number of guides |
| `contactRows` | eyebrow, heading, highlighted words, rows: title, line, link |

**General blocks** (used by overview, list, about, resources, contact and new pages)

| Block | Fields |
|---|---|
| `pageHero` | image, optional video, eyebrow, title, lead, buttons, breadcrumbs on/off |
| `plainHero` | eyebrow, title, lead |
| `linkCards` | cards (title, short line, link), or "show child pages automatically" |
| `cardGrid` | source: day trips, tickets, guides, destinations, packages or manual; optional emirate filter; card style |
| `packageRows` | the alternating image and text rows from the packages list |
| `editorialTextImage` | heading, rich text, list, image, optional button or PDF download |
| `steps` | heading, steps (name, line) |
| `keyFacts` | four label + value pairs |
| `numberedCards` | Why AB Tours style |
| `logoGrid` | partners grouped by type, with an optional button |
| `testimonialsGrid` | |
| `blogList` | |
| `faqGroups` | groups, or selected FAQs |
| `enquiryBand` | heading, text, pre-filled "interested in" |
| `contactCards` | the three coloured cards on the Contact page |
| `richText` | |
| `form` | which form: quote, consultation or partner — wired up in phase 09 |
| `adventures` | the bucket-list section used on inner pages |

## 3. Rendering
- One `RenderBlocks` component maps `blockType` to a component.
- Hidden blocks are skipped.
- Unknown blocks log a warning in development and render nothing in production.

## 4. Routing (`src/app/(frontend)/[[...segments]]/page.tsx`)
Resolution order:
1. Homepage: the Page with `isHomepage`.
2. Page by full nested path.
3. Typed routes (each with its own template):
   - `/uae-experiences/{emirate}`
   - `/uae-experiences/day-trips/{trip}`
   - `/uae-experiences/multi-city-packages/{package}`
   - `/international-holidays/{style}`
   - `/b2b-corporate/{service}`
   - `/resources/travel-guides/{guide}`
   - `/resources/blog/{post}`
4. Redirects (phase 10).
5. 404.

Prevent clashes: a `beforeValidate` hook on Pages and on every routed collection blocks saving a document whose URL already belongs to another document, with a clear error message. Use `generateStaticParams` and on-demand revalidation (an `afterChange` hook calls `revalidatePath`) so published changes appear immediately.

## Done when
- An Editor can create a new page under International Holidays, add five different blocks, reorder and hide one, publish it, and see it live at the right URL.
- An attempt to create a clashing URL is blocked with an error.
- Every block renders with prototype default text.
- The report lists every block with its fields.
