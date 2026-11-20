# Committed scope

From the Beetrix360 proposal to AB Tours, 19 November 2026. Prices are left out because they are not needed for the build. Launch date: **7 December 2026**.

## What the product is
A website for AB Tours UAE on its own .ae domain. It presents the UAE and AB Tours' holidays and services, and turns visitors into enquiries. It is a brand showcase and enquiry platform, **not a booking engine**: there is no cart, checkout or online payment. Online booking stays with the AB Tours OTA built by Iplex.

## Pages at launch (about 43)

| Template | Pages | Includes |
|---|---|---|
| Homepage | 1 | 16 sections from the approved design, each editable and re-orderable |
| Section overview pages | 5 | UAE Experiences, International Holidays, B2B & Corporate, About Us, Resources |
| Emirate pages | 6 | Dubai, Abu Dhabi, Sharjah, Ras Al Khaimah, Fujairah, Umm Al Quwain (Ajman if confirmed) |
| Day Trips | 1 + items | List page; every day trip is its own CMS item with its own page |
| Multi-City Packages | 1 + 4 | List page and package pages with a day-by-day itinerary |
| Attraction Tickets | 1 | Tickets arranged on request |
| International Holidays | 6 | Easy Visa, Budget, Midrange, Premium, Cruises, Bespoke Itineraries |
| B2B & Corporate services | 5 | DMC, Transportation (linked to AB Transport), MICE, Visa Services, Corporate Travel |
| About Us | 4 | Company Profile, Why AB Tours, Strategic Partners, Testimonials |
| Resources | 3 + items | Travel Guides and Blog with article pages, FAQs |
| Contact | 4 | Contact page, Request a Quote (3 steps), Book a Consultation, Partner Enquiries |
| Legal and system pages | 3 | Privacy policy, Terms and conditions, Page not found |

New pages of any type can be added in the CMS afterwards.

## Website features
- Full-screen video cover with five slides, the next slide shown at the side, and pause control.
- "Watch the UAE" film section with five chapters.
- Travel-mood and holiday-style filters, save-to-my-trip hearts, and the "Spin for an adventure" compass.
- Quote panel on every page, pre-filled with the page the visitor came from; WhatsApp chat button.
- Scroll animations, hover videos and stacked package panels, as in the approved prototype.
- Responsive on phones, tablets and desktops.

## Content management system
Payload CMS 3, built into the Next.js website, with its own admin panel at `/admin`.
- Every page is a CMS item: emirates, day trips, packages, tickets, holiday destinations, B2B services, guides, blog posts, FAQs, partners and testimonials.
- The homepage is built from sections that can be edited, re-ordered, hidden or added.
- Header, menus, footer, contact details and the WhatsApp number are edited once and update across the site.
- Media library for photos, videos and PDFs, with alt text.
- Drafts, preview before publishing, and scheduled publishing.
- Search fields on every page. Web addresses are created automatically, and old addresses redirect when a page is renamed.
- Every form submission is stored as a lead with its source page and status, and emailed to the right team (leisure, outbound or B2B).

## User roles (unlimited accounts)

| Permission | Admin | Editor |
|---|---|---|
| Create, edit and publish pages and sections | ✓ | ✓ |
| Upload and manage photos, videos and files | ✓ | ✓ |
| Edit header, footer and contact details | ✓ | ✓ |
| View and update enquiries | ✓ | ✓ |
| Export enquiries | ✓ | — |
| Add and manage users | ✓ | — |
| Change site settings, redirects and form recipients | ✓ | — |
| Delete pages permanently | ✓ | — |

## Committed work items (from the workload table)
- **Front-end:** project setup, page structure and routing; header, dropdown menus, mobile menu and footer; homepage (16 sections); emirate, day trip, package list and ticket templates; package detail with day-by-day itinerary; Holidays, B2B, About, Resources and Contact templates; interactive features.
- **CMS:** setup, database and media storage; content types (18 collections); homepage and page section blocks; site settings (header, footer, contact details, SEO defaults); user roles and permissions; drafts, preview and scheduled publishing; automatic web addresses and redirects.
- **Forms:** Request a Quote (3 steps), Consultation and Partner forms; leads in the CMS with status and export; email notifications to the leisure, outbound and B2B teams; spam protection.
- **SEO:** page titles, descriptions, social images and structured data; XML sitemap and search-engine settings; image and video optimisation, page speed; analytics setup.
- **Testing:** on phones, tablets and desktop browsers; form, link and accessibility checks.
- **Launch:** live deployment, domain and SSL; editor guide (PDF); handover of accounts and source code.

## Not included
- Online booking, payments or a connection to the OTA.
- Copywriting, photography and video production.
- An Arabic version of the website (can be added later).
- Hosting, database, domain, email and other third-party fees.
- Paid stock photos or videos.
- New features or maintenance after the 30-day support period.
