# Phase 02A — Front end of every page with temporary data (no database)

## Goal & architecture
Built the complete public website using Design C6 (`design/prototype-c6.html`) with temporary typed data and **no database or Payload Local API calls**.

### Content layer (`src/content/`)
- `src/content/types.ts`: TypeScript interfaces matching the future CMS collections and blocks (`EmirateItem`, `DayTripItem`, `PackageItem`, `TicketItem`, `AdventureItem`, `HolidayStyleItem`, `DestinationItem`, `B2BServiceItem`, `GuideItem`, `BlogPostItem`, `FAQGroupItem`, `PartnerItem`, `TestimonialItem`, `HomepageBlock`, `SiteData`, `StaticOverviewPage`).
- `src/content/static/`:
  - `media.ts` (Unsplash & Pexels URL helpers matching the prototype)
  - `emirates.ts`, `dayTrips.ts`, `packages.ts`, `tickets.ts`, `holidayStyles.ts`, `destinations.ts`, `b2bServices.ts`, `adventures.ts`, `guides.ts`, `blogPosts.ts`, `faqs.ts`, `partners.ts`, `testimonials.ts`
  - `homepage.ts` (ordered array of all 16 homepage blocks)
  - `site.ts` (header, footer, WhatsApp, contact details, form options, overview pages, 404 text)
- `src/content/index.ts`: Loader functions (`getHomepage()`, `getSiteData()`, `getOverviewPage()`, `getEmirates()`, `getEmirate()`, `getDayTrips()`, `getDayTrip()`, `getPackages()`, `getPackage()`, `getTickets()`, `getAdventures()`, `getHolidayStyles()`, `getHolidayStyle()`, `getDestinations()`, `getB2BServices()`, `getB2BService()`, `getGuides()`, `getGuide()`, `getBlogPosts()`, `getBlogPost()`, `getFAQGroups()`, `getPartners()`, `getHomepagePartners()`, `getTestimonials()`). Components never import data directly.

### Homepage blocks & `RenderBlocks`
- `src/components/RenderBlocks.tsx` maps all 16 homepage blocks in C6 order:
  1. `heroSlider` (`HeroSliderBlock.tsx`)
  2. `planBar` (`PlanBarBlock.tsx`)
  3. `thingsToDo` (`ThingsToDoBlock.tsx`)
  4. `packagesStack` (`PackagesStackBlock.tsx`)
  5. `adventuresRail` (`AdventuresRail.tsx`)
  6. `holidayStylesFilter` (`HolidayStylesFilterBlock.tsx`)
  7. `filmChapters` (`FilmChaptersBlock.tsx`)
  8. `statement` (`StatementBlock.tsx`)
  9. `emiratesRail` (`EmiratesRailBlock.tsx`)
  10. `spinCompass` (`SpinCompassBlock.tsx`)
  11. `seasonCampaign` (`SeasonCampaignBlock.tsx`, with hard 55% step split bridge into dark B2B section)
  12. `b2bAccordion` (`B2BAccordionBlock.tsx`)
  13. `partnersStrip` (`PartnersStripBlock.tsx`)
  14. `momentsWall` (`MomentsWallBlock.tsx`)
  15. `guidesGrid` (`GuidesGridBlock.tsx`)
  16. `contactRows` (`ContactRowsBlock.tsx`)

### Routes built (all in `src/app/(frontend)/`)
- `/` (`page.tsx`)
- `/uae-experiences` (`uae-experiences/page.tsx`)
- `/uae-experiences/[emirate]` (`dubai`, `abu-dhabi`, `sharjah`, `ras-al-khaimah`, `fujairah`, `umm-al-quwain`)
- `/uae-experiences/day-trips` (`page.tsx`) and `/uae-experiences/day-trips/[trip]` (8 day trip detail pages)
- `/uae-experiences/multi-city-packages` (`page.tsx`) and `/uae-experiences/multi-city-packages/[package]` (4 package detail pages)
- `/uae-experiences/attraction-tickets` (`page.tsx`)
- `/international-holidays` (`page.tsx`), `/international-holidays/[style]` (5 styles), `/international-holidays/bespoke-itineraries` (`page.tsx`)
- `/b2b-corporate` (`page.tsx`), `/b2b-corporate/[service]` (5 services)
- `/about` (`page.tsx`), `/about/company-profile`, `/about/why-ab-tours`, `/about/strategic-partners`, `/about/testimonials`
- `/resources` (`page.tsx`), `/resources/travel-guides`, `/resources/travel-guides/[guide]` (6 articles), `/resources/blog`, `/resources/blog/[post]` (3 posts), `/resources/faqs`
- `/contact` (`page.tsx`), `/contact/request-a-quote`, `/contact/consultation-request`, `/contact/partner-enquiries`
- `/privacy-policy`, `/terms`, and `not-found.tsx` (404)
- Removed temporary `/styleguide` route (`src/app/(frontend)/styleguide`) and `src/lib/sample-shell-data.ts` since all components are now rendered on real pages.

### Pages without a prototype equivalent (built from existing C6 components)
- **Day trip detail** (`/uae-experiences/day-trips/[trip]`): Built from `PageHero`, `.facts` (duration & transport, pickup, emirate, `PriceDisplay`), `.inc` (highlights & included), `.cards` gallery, `FAQList`, and `EnquiryBand` pre-filled `"Day trip: {title}"`.
- **Guide article** (`/resources/travel-guides/[guide]`) and **Blog post** (`/resources/blog/[post]`): Built from `PageHero`, `Ornament` + editorial paragraphs, related guides / back link, and `EnquiryBand`.
- **Privacy Policy** (`/privacy-policy`) and **Terms & Conditions** (`/terms`): Built from `PlainHero` and editorial placeholder text.
- **404** (`not-found.tsx`): Built from `PlainHero` and four `.box` cards linking to `/`, `/uae-experiences`, `/international-holidays`, and `/b2b-corporate`.

### Prototype content notes
- All prototype texts, placeholders (`[Phone]`, `[Office address]`, `[response time]`, `[Months]`, `[From Dubai: time]`, `[price]`, `[Partner logo 1]`, `[Testimonial 1 from the CMS.]`, etc.), Unsplash photo IDs, and Pexels video URLs were copied verbatim from `design/prototype-c6.html`.
- No database or Payload Local API calls were added.

## Verification results
- `pnpm lint`: **Pass** (0 errors, 0 warnings).
- `pnpm typecheck`: **Pass** (`tsc --noEmit` exited with code 0).
- `pnpm build`: **Pass** (`next build` generated all 64 static/SSG pages cleanly).

## Manual check checklist (for dev server)
Open `http://localhost:3000/` and verify:
- [ ] Hero slider: next slide peeks at right, 8 s advance, pause/play, counter `01 — 05`, "Watch the film" scroll, only active video plays.
- [ ] Plan bar: Explore & Travel dates selects open quote panel pre-filled `"{Explore} · {Travel dates}"`.
- [ ] Mood chips ("All day trips" + 5 moods) & Holiday-style chips ("All" + 5 styles + Bespoke) animate cards on switch.
- [ ] Film chapters: autoplays muted when visible, advances every 12 s, center play/pause works.
- [ ] Statement words light up on scroll (or all lit with `prefers-reduced-motion`).
- [ ] Spin compass: 2.4 s spin picks a random adventure with "Add to my trip" & "Spin again".
- [ ] B2B accordion: first row open, one row open at a time with height animation.
- [ ] Hearts & My trip: clicking hearts persists to `localStorage`, shows toast, updates header "My trip" counter, opens pre-filled quote panel.
- [ ] Quote panel, mobile menu (< 1320 px), and 3-step quote form (`/contact/request-a-quote`).
