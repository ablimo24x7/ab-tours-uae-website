# AB Tours UAE — Website Sitemap (v4, client structure)

**What the site is:** a UAE brand showcase and enquiry platform for AB Tours UAE — **not a booking engine**. It presents destinations, services and expertise and drives quote requests, consultations and partner enquiries.

**Source:** client review of the full-flow sitemap (Nov 2026), which asked for a UAE-only structure in six sections. This version replaces v3.

**Domain:** a separate `.ae` domain (`abtours.ae` is a placeholder; still to be confirmed and registered). Every English page has an Arabic copy at `/ar/...` with hreflang tags and right-to-left markup.

**Design:** the clickable prototype [AB_Tours_UAE_Prototype.html](AB_Tours_UAE_Prototype.html) — Diriyah / Visit Saudi style, OTA branding (Poppins; navy `#263259`, blue `#0A66E8`, green `#14804A`), Fraunces headlines proposed. Its footer links to a **Sitemap & enquiry workflow** page that mirrors this document.

Related files: [flowchart](AB_Tours_Sitemap_Flowchart.html) · [page list (Excel)](AB_Tours_Sitemap_Flowchart_Data.xlsx) · [CMS content model](AB_Tours_CMS_Content_Model.md)

Phase labels: **P1** = at launch · **P2** = ~2 months later · **P3** = after the OTA launch

---

## Changes from v3

| Removed | Why |
|---|---|
| Travelling From (source-market pages) | Not in the client’s UAE structure |
| What’s On | Not in the client’s structure (events can live in Travel Guides / Blog) |
| “Book online” links to the OTA | Site is enquiry-only; links can return later if the client approves |
| Umrah Plus hand-off | Not part of UAE operations |
| Separate Travel Styles section | Folded into UAE Experiences content |

| Added / renamed | |
|---|---|
| Holidays Abroad → **International Outbound Holidays**, split into Easy Visa, Budget, Midrange, Premium, Cruises, Bespoke | |
| Things To Do → **Day Trips** and **Attraction Tickets** (enquiry only) | |
| Corporate & Events + Visas + Travel Agents → **B2B & Corporate Solutions** | |
| New **About** and **Resources** sections; **Contact** split into three enquiry types | |

**To confirm with the client:** Ajman is not in their emirate list, so it is not in this sitemap.

---

## 1. Home `/` [P1]

Hero → intro statement → emirates carousel → day trips & tickets (topic tabs) → multi-city packages → “Beyond the UAE” (outbound categories) → B2B services → testimonials & partner logos → travel guides → three enquiry options.

## 2. UAE Experiences `/uae-experiences` [P1]

```
/uae-experiences                                   Section overview
/uae-experiences/dubai                             [P1]
/uae-experiences/abu-dhabi                         [P1]
/uae-experiences/sharjah                           [P1]
/uae-experiences/ras-al-khaimah                    [P1]
/uae-experiences/fujairah                          [P1]
/uae-experiences/umm-al-quwain                     [P1]
/uae-experiences/day-trips                         [P1]
    /uae-experiences/day-trips/{trip}              e.g. /abu-dhabi-in-a-day [P2]
/uae-experiences/multi-city-packages               [P1]
    /uae-experiences/multi-city-packages/{package} e.g. /7-day-uae-highlights [P1]
/uae-experiences/attraction-tickets                [P1]  — enquiry only, no checkout
    /uae-experiences/attraction-tickets/{ticket}   e.g. /dubai-frame [P2]
```

Emirate page: story, day trips, packages, tickets, good-to-know facts, FAQ, enquiry form.

## 3. International Outbound Holidays `/international-holidays` [P1]

```
/international-holidays                                      Section overview
/international-holidays/easy-visa-destinations               [P1]
/international-holidays/budget-packages                      [P1]
/international-holidays/midrange-packages                    [P1]
/international-holidays/premium-packages                     [P1]
/international-holidays/cruises                              [P1]
/international-holidays/bespoke-itineraries                  [P1]
    /international-holidays/{category}/{destination}         e.g. /budget-packages/georgia [P2]
```

Destinations per tier come from the client (prototype examples: Georgia, Azerbaijan, Turkey, Thailand, Maldives, Switzerland). Visa notes depend on nationality and are kept in the CMS.

## 4. B2B & Corporate Solutions `/b2b-corporate` [P1]

```
/b2b-corporate                              Section overview
/b2b-corporate/dmc-services                 [P1]
/b2b-corporate/transportation-services      [P1]  — delivered with AB Transport (links to ab.limo)
/b2b-corporate/mice                         [P1]
/b2b-corporate/visa-services                [P1]
/b2b-corporate/corporate-travel             [P1]
```

Service page: what we handle, how we work (4 steps), proposal form.

## 5. About AB Tours UAE `/about`

```
/about                                 Section overview [P1]
/about/company-profile                 [P1]  — includes downloadable profile PDF
/about/why-ab-tours                    [P1]
/about/strategic-partners              [P2]
/about/testimonials                    [P2]
```

## 6. Resources `/resources`

```
/resources                             Section overview [P1]
/resources/travel-guides               [P1]
    /resources/travel-guides/{guide}   [P2]
/resources/blog                        [P2]
    /resources/blog/{post}             [P2]
/resources/faqs                        [P1]
```

## 7. Contact & Enquiries `/contact` [P1]

```
/contact                               Contact hub: three options + office details
/contact/request-a-quote               3-step form: what / when & who / contact
/contact/consultation-request          Topic, call type, preferred date and time
/contact/partner-enquiries             Agencies, suppliers, corporate partners
```

## 8. Legal & utility

```
/privacy-policy  /terms-and-conditions  /cookie-policy  /sitemap.xml  /robots.txt
```

---

## Enquiry workflow

1. **Discover** — visitor explores emirates, packages, holidays or B2B services.
2. **Enquire** — Request a Quote, Consultation, Partner Enquiry or WhatsApp. Every “Request a quote” button opens a quick form pre-filled with the item being viewed.
3. **Lead in CMS** — saved with the page it came from and UTM tags, then routed:
   - Leisure UAE (UAE Experiences pages) → leisure team
   - Outbound (International Holidays pages) → outbound team
   - B2B (B2B & Corporate pages, Partner Enquiries) → B2B team
4. **Consult & propose** — a travel designer replies within [response time] with a tailored proposal.
5. **Confirm & travel** — confirmed offline; AB Transport handles transfers.

---

## Page templates

**Every page:** short quotable answer near the top; “Request a quote” (pre-filled); WhatsApp button that records the source page; trust signals (licences, AB Group, testimonials); breadcrumbs; FAQ block; schema markup.

| Template | Used for | Schema |
|---|---|---|
| Section overview | 5 section hubs | CollectionPage, BreadcrumbList |
| Emirate | 6 emirate pages | TouristDestination, FAQPage |
| Listing with cards | Day Trips, Attraction Tickets, outbound categories, Travel Guides | ItemList |
| Package detail | Multi-city packages, outbound destination packages | TouristTrip (+ Offer when a “From” price is shown), FAQPage |
| Service | B2B pages | Service |
| Content | About pages, guides, blog posts | AboutPage / Article |
| Form | Contact pages | ContactPage |

Prices: “From AED [price]” or “Price on request”, set per item.

---

## Website and OTA

Two independent applications on two separate domains.

| | Now | When the OTA is live |
|---|---|---|
| `abtours.ae` (placeholder) | AB Tours UAE website — showcase and enquiries | Unchanged |
| OTA by Iplex | `app.dmcgulf.com`, in development | Live on `ab.tours` |

- At website launch, the current AB Tours landing page redirects (301) to the matching `.ae` pages.
- The website never moves, so its rankings are not affected by the OTA launch.
- Optional booking links from packages to the OTA can be added later if the client approves.

---

## Lessons carried over from ab.limo

Keep: location-based URL structure, keyword in title/H1/meta, real local detail, FAQ on every page, Arabic version.
Fix: hreflang and right-to-left markup, full schema on the deepest pages, unique text per page, proofreading of generated text, a real FAQ page and regular guides.
