# 07 — UAE Experiences templates

> **Front end already built in phase 02A.** The design and interactions below already exist with temporary data. In this phase:
> - connect them to the CMS blocks and collections;
> - add `sectionControls` and `extraSections` where this prompt asks;
> - fix any gap against the prototype.
>
> Do not rebuild or restyle components that already match the pages approved in the phase 02A review.

Follow `00-Project-Rules.md`. Match the prototype's inner pages. Open them in `design/prototype-c6.html` with the hash routes below.

## Templates

**Emirate page** (`/uae-experiences/{emirate}`; prototype `#/uae-experiences/dubai`). Sections in order:
1. Page hero: video if set, otherwise image. Breadcrumbs, eyebrow "UAE Experiences", name, line, and two buttons: Request a quote (pre-filled "{name} experience") and Book a consultation.
2. Sticky jump bar: The story, Day trips, Packages, Tickets, Good to know, FAQs. A link shows only when its section has content.
3. Story: editorial text with an image.
4. Adventures in this emirate. Shown only when there are two or more.
5. Day trips in this emirate (cards).
6. Packages that include this emirate (route contains it): alternating rows, maximum two.
7. Tickets in this emirate: cards, maximum three.
8. Good to know: four key facts.
9. FAQs.
10. Enquiry band, pre-filled with the emirate.
11. `extraSections`.

Every default section can be hidden, and its heading overridden, through `sectionControls`.

**Day trips** — the list page is a Page using `cardGrid` (source: day trips) and `adventures`. New **day trip detail** template at `/uae-experiences/day-trips/{trip}` (approved by Beetrix360 on 20 November 2026; C6 has no design for it), built only from existing prototype components:
1. page hero;
2. key facts (duration and transport, pickup, emirate, price);
3. highlights and included lists, using the package detail's "Included" style;
4. gallery;
5. FAQs;
6. enquiry band pre-filled "Day trip: {title}".

**Packages** — the list page is a Page using `packageRows`. **Package detail** (`/uae-experiences/multi-city-packages/{package}`; prototype `#/uae-experiences/multi-city-packages/7-day-uae-highlights`):
1. Page hero.
2. Two columns:
   - left: route line, summary, day-by-day timeline (Day n circle, place, title, text, optional image), then "Included" and "Shaped around you" boxes;
   - right: sticky quote box with the price line, a small form and a consultation link.
3. FAQs.
4. Optional itinerary PDF download button.

**Attraction tickets** — a Page using `cardGrid` (source: tickets), a note, and `adventures`. Each ticket card's button opens the quote panel pre-filled "Tickets: {name}".

## Rules
- Cards link to their detail page where one exists.
- Price shows through the shared `price` renderer only.
- No booking, availability or checkout elements. Every call to action is an enquiry.
- Each template generates breadcrumbs from the URL structure.

## Done when
- All 6 emirates, the day trip detail, the 4 package pages, the tickets page and the list pages render with seed data (phase 11 adds full seed data; use a few test documents for now).
- The pages match the prototype at 1440, 768 and 375 px when checked in the dev server.
- Hiding a section or overriding its heading in the admin works.
