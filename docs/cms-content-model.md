# AB Tours UAE — CMS Content Model (v2, client structure)

For the developer. It describes what the CMS must hold so that **every page is a CMS item**, the **homepage is editable section by section**, and **new pages follow the URL structure** in [AB_Tours_DMC_Sitemap_for Developer.md](AB_Tours_DMC_Sitemap_for%20Developer.md). The site is a **brand showcase and enquiry platform — no booking, cart or payment**.

**Recommended stack:** Next.js with **Payload CMS 3** in the same app (latest npm version 3.93.0 on 16 Nov 2026). Confirmed in Payload’s official documentation on 16 Nov 2026: Blocks field, Localization (with right-to-left), Live Preview, Drafts, and the official SEO, Redirects, Nested Docs and Form Builder plugins. Payload needs a database (Postgres or MongoDB) and file storage for media.

---

## 1. Rules for every content type

| Rule | Detail |
|---|---|
| Languages | Every text field localised: `en` (default) and `ar` (right-to-left). Arabic pages at `/ar/...`. |
| Market | `market` field, default `UAE`, hidden for now — lets a future Saudi or Qatar site reuse the CMS. |
| Slug | Lower-case, hyphenated, unique within its type; suggested from the English title; not localised. |
| URL | **Built by the system** from type + slug (+ parent). Editors cannot type a free URL (section 3). |
| SEO group | Meta title, meta description, social image, canonical override, `noindex` switch (SEO plugin). |
| Quotable answer | 1–3 sentence answer near the top of the page. |
| FAQ | Repeatable question + answer → FAQPage schema. |
| Price | `priceType`: `From` (with AED amount) or `On request` — on packages, day trips, tickets, outbound items. |
| Status | Draft / Published, scheduled publishing, live preview. |
| Redirects | Changing a published slug creates a 301 automatically (Redirects plugin). |
| Media | Alt text in English and Arabic; photo credit. |

---

## 2. Content types (collections)

| # | Type | URL | Key fields |
|---|---|---|---|
| 1 | **Pages** | `/{slug}` and section overviews (`/uae-experiences`, `/international-holidays`, `/b2b-corporate`, `/about`, `/resources`, `/contact`) | Title, intro, page blocks (section 4) |
| 2 | **Emirates** | `/uae-experiences/{emirate}` | Name, hero, story, best time, getting there, map, linked day trips / packages / tickets, page blocks. Six at launch (Ajman to confirm). |
| 3 | **Day Trips** | `/uae-experiences/day-trips/{trip}` | Title, emirate, duration, pickup, highlights, inclusions, price, gallery |
| 4 | **Multi-City Packages** | `/uae-experiences/multi-city-packages/{package}` | Title, emirates covered, days, day-by-day itinerary, inclusions/exclusions, hotel levels, price, PDF itinerary, gallery |
| 5 | **Attraction Tickets** | `/uae-experiences/attraction-tickets/{ticket}` | Title, emirate, what’s included, ticket types, price, gallery — **enquiry only** |
| 6 | **Outbound Categories** | `/international-holidays/{category}` | Easy Visa, Budget, Midrange, Premium, Cruises, Bespoke — intro, hero, linked destinations |
| 7 | **Outbound Destinations / Packages** | `/international-holidays/{category}/{destination}` | Destination, category (one or more), visa note (depends on nationality), best season, itinerary, inclusions, price, gallery |
| 8 | **B2B Services** | `/b2b-corporate/{service}` | Title, description, “what we handle” list, process steps, proposal form, optional external link (Transportation → ab.limo) |
| 9 | **About Pages** | `/about/{page}` | Company Profile (story, facts, profile PDF), Why AB Tours (reasons), Strategic Partners (logos by group), Testimonials |
| 10 | **Partners** | — (shown on pages) | Name, logo, group (hotels, attractions, airlines/cruise lines), link |
| 11 | **Testimonials** | — (shown on pages) | Name, country or company, quote, related item |
| 12 | **Travel Guides** | `/resources/travel-guides/{guide}` | Title, tags (emirate, outbound, culture…), body, related items |
| 13 | **Blog Posts** | `/resources/blog/{post}` | Title, date, author, category, body |
| 14 | **FAQs** | `/resources/faqs` (grouped) | Question, answer, group (UAE experiences, International holidays, B2B) — reusable on any page |
| 15 | **Media** | — | File, alt text (en/ar), credit |
| 16 | **Leads** | — (admin only) | Created by every form: type (quote / consultation / partner / quick quote), item or page it came from, name, email, phone/WhatsApp, dates, travellers, budget, message, UTM tags, **route** (leisure / outbound / B2B), status (`new` → `contacted` → `proposal sent` → `won` / `lost`), owner |
| 17 | **Forms** | — | Request a Quote (3 steps), Consultation Request, Partner Enquiry, Quick Quote panel (Form Builder plugin) |
| 18 | **Redirects** | — | From, to, type 301 |

---

## 3. URL rules

1. Editors pick the content type and title; the slug is suggested.
2. The URL is assembled from the pattern above, using the parent where there is one (destination → category).
3. A changed slug on a published item creates a 301 automatically.
4. Duplicate URLs are blocked on save.
5. Next.js resolves each URL to its type and template; unknown URLs return 404.
6. The XML sitemap is generated from published items with `lastmod` and `en`/`ar` hreflang pairs.

---

## 4. Page blocks (homepage and section pages)

Editors can add, reorder, hide and edit these; all are localised.

| Block | As in the prototype | Editable content |
|---|---|---|
| Hero slider | Home hero | 1–3 slides (image/video, caption), headline, sub-line, two buttons |
| Statement + three pillars | “Desert, mountains, sea and city…” | Text, highlighted phrase, three pillars |
| Emirates carousel | “Discover the Emirates” | Selected emirates |
| Topic tabs | “Choose what moves you” | Tabs, each with four selected day trips / tickets / packages |
| Joined photo panels | Multi-city packages | Three selected packages |
| Full-width photo band | “Some journeys ask you to slow down” | Image, line, button |
| Category mosaic | “Beyond the UAE” | Outbound categories, one large tile, one full-width tile |
| Services list with photo | B2B section | Selected services, each with its own photo |
| Testimonials + partner logos | Testimonials strip | Selected testimonials and partners |
| Guides grid | Travel guides | Selected or latest guides |
| Three enquiry cards | Bottom of home / Contact | Quote, Consultation, Partner — text and colours |
| Card grid | Listings | Source (day trips, tickets, destinations, guides), filters |
| Editorial text + image | Emirate / service pages | Heading, text, list, image, optional button |
| Steps | “How we work” | Four or five steps |
| Key facts | Emirate / company profile | Four label + value pairs |
| FAQ | All pages | Selected FAQs |
| Enquiry band | Most pages | Heading, text, pre-filled “interested in” |

---

## 5. Site-wide settings (globals)

| Global | Contents |
|---|---|
| Header | Logo, six menu sections with their dropdown links, intro text and photo; top-bar links (Partner Enquiries, Book a Consultation, WhatsApp, العربية); **Request a Quote** button |
| Footer | Section menus, contact details, licence numbers, AB Group / AB Transport links, “Sitemap & workflow” link |
| Contact | Phone, WhatsApp, email, office address, hours — used everywhere |
| SEO defaults | Site name, default social image, Organization + TravelAgency schema, `sameAs` links |
| Tracking | Analytics ID, WhatsApp click tracking, cross-domain list (OTA) for later |
| Lead routing | Email recipients per route (leisure, outbound, B2B); CRM export; response-time promise shown on forms |

---

## 6. Roles

| Role | Can do |
|---|---|
| Admin | Everything, including settings, roles and redirects |
| Editor | All content, publishing, media |
| Sales — leisure / outbound / B2B | View and update Leads on their route |

---

## 7. Out of scope

Cart, checkout, payment, availability calendars, booking management, customer accounts. The OTA by Iplex handles booking; optional links to it can be added later if the client approves.

---

## 8. Open items

- Ajman — include or not
- Outbound destinations per tier, and the cruise routes
- Final `.ae` domain (`abtours.ae` is a placeholder)
- Arabic font to pair with Poppins; native review of Arabic copy
- UAE licence numbers, partner logos, testimonials, company profile PDF
- Response-time promise and lead routing (who receives what)
