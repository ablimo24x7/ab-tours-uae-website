# 04 — Content collections

Follow `00-Project-Rules.md`. Check every field against `docs/content-request-forms/` (forms 04–12): each item AB Tours was asked to send must have a field.

## Shared field groups (`src/fields/`)
- `slug`: suggested from the title; lower-case and hyphenated; unique within the collection; editable before first publish. After publish, changing it creates a redirect (phase 10).
- `price`:
  - `priceType` (select: `from`, `onRequest`);
  - `amountAED` (number, required when `from`);
  - `priceNote` (text).
  - It renders as "From AED 1,250 per person" or "Price on request".
- `image` and `video`: upload relations to Media. A video always has an image fallback.
- `faqs`: relationship to `faqs` (hasMany, sortable).
- `sectionControls`: for templates. Each default section on the page can be hidden, and its heading or intro overridden. Empty means the default text.
- `extraSections`: a blocks field (the library from phase 05) rendered after the template's default sections, so editors can add sections to any typed page.
- `market`: select, default `UAE`, hidden in the admin. Kept for future markets.
- SEO fields come from the SEO plugin in phase 10. Leave room for them.

## Collections (16 here; Users and Media exist from phase 03)

| Collection | URL | Fields |
|---|---|---|
| `pages` | built in phase 05 | Title, parent, layout blocks |
| `emirates` | `/uae-experiences/{slug}` | name, slug, one-line intro, cover image, cover video, card image (homepage, portrait), story heading (default "{name}, our way"), story (rich text), story image, best time, getting there, visa note, transfers, faqs, enquiry band heading, sectionControls, extraSections, sort order |
| `dayTrips` | `/uae-experiences/day-trips/{slug}` | title, slug, emirate (relation), short description, card image, duration and transport line (default "Full day · private transport"), pickup, highlights (array), included (array), price, gallery (array of images), faqs, sectionControls, extraSections |
| `packages` | `/uae-experiences/multi-city-packages/{slug}` | title, slug, days, style (select: Culture, Family, Desert, Adventure — editable list), route (ordered relation to emirates), intro, main image, summary, itinerary (array: place, title, text, optional image), included (array), shaped around you (array), price, itinerary PDF, faqs, sectionControls, extraSections |
| `tickets` | listed on `/uae-experiences/attraction-tickets` | name, emirate, image, what's included (array), ticket types (array), price |
| `holidayStyles` | `/international-holidays/{slug}` | title, slug, variant (`standard` or `bespoke`), cover image, intro, card note (shown on destination cards), destinations (relation, sortable), bespoke steps (array: name, line; shown when variant is bespoke), enquiry band heading, sectionControls, extraSections, sort order |
| `destinations` | shown on holiday style pages | name, image, short description, included (array), best season, price, visa note, holiday styles (relation, hasMany) |
| `b2bServices` | `/b2b-corporate/{slug}` | title, slug, cover image, intro, service description (rich text), what we handle (array), section image, external link (label, URL — used by Transportation to link to AB Transport at ab.limo), enquiry band heading, row line (short line used in the homepage accordion), sectionControls, extraSections, sort order |
| `adventures` | shown on home, emirates, day trips, tickets | title, emirate, badge, one-line description, portrait image, optional hover video, sort order |
| `partners` | shown on Strategic Partners and the homepage strip | name, logo, group (Hotels & resorts, Attractions, Airlines & cruise lines), website, show on homepage (checkbox), permission confirmed (checkbox) |
| `testimonials` | Testimonials page and blocks | quote, name, country or company, related item (optional relation), consent given (checkbox, required before publishing) |
| `guides` | `/resources/travel-guides/{slug}` | title, slug, tag, cover image, intro, body (rich text), related items, published date, author (relation to users) |
| `blogPosts` | `/resources/blog/{slug}` | title, slug, category, cover image, summary, body (rich text), published date, author |
| `faqs` | FAQs page and any page | question, answer (rich text), group (`UAE experiences`, `International holidays`, `B2B & corporate`), sort order |
| `clients` | admin only — defined in phase 09 | |
| `enquiries` | admin only — defined in phase 09 | |

## Admin usability
- `useAsTitle` set on every collection.
- Default columns that make sense (for example, day trips list title, emirate and price).
- Helpful field descriptions, written in the words of the content request forms.
- Required fields marked, conditional fields hidden until relevant.
- Collections grouped under "Content".

## Rich text
Use Payload's Lexical editor with headings (H2–H4), lists, links, bold and italic, quotes, and an upload node for images. No raw HTML.

## Done when
- Every collection appears in the admin with correct access from phase 03 (Editors can create and edit but not delete).
- `payload generate:types` is committed.
- The report has a table mapping every row of the content request forms (04–12) to its collection and field. Mark any row with no field as a gap.
