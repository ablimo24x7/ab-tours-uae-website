# Phase 02 — Design system and site shell report

## What was built
1. **Base styles (`src/app/(frontend)/styles/base.css`)**:
   - Ported the final computed Design C6 styles from `design/prototype-c6.html`: `.wrap` (`1240px`, `24px` gutters), `.pad` / `.pad-s`, `.eyebrow` (DM Mono uppercase with `--sun` dash), `.head` (italic Instrument Serif headings with split-word `.w` reveal), buttons (`btn-green`, `btn-sun`, `btn-line`, `btn-ghost`), `.link`, `.tag`, `.chips`, `.card`, `.box`, `.ornament`, `.field` / `.grid2`, `.sr` skip link, `:focus-visible` outlines, and `prefers-reduced-motion: reduce`.
2. **Site shell (`src/app/(frontend)/layout.tsx` & `src/components/`)**:
   - `SiteShellContext.tsx`: Client state for the Quote drawer (`openQuote`, `closeDrawer`, focus restoration), Toast notifications, `savedTrips` (`localStorage` `'abTrip'`), and delegated `[data-quote]` / `[data-toast]` click handling.
   - `Header.tsx`: Top bar (tagline left, Partner Enquiries, Book a Consultation, WhatsApp `[number]`, العربية right), C6 3-column bar (logo left, 3 centred main nav items with full-width 3-column megamenu dropdowns, My trip counter + yellow Request a Quote button right), transparent over hero / solid cream with blur on scroll or open or non-hero pages, hover + click + Escape, and full-screen collapsible `<details>` mobile menu below `1320px`.
   - `Footer.tsx`: Brand column (`AB.TOURS UAE`, description, `[Office address] · [Phone] · [Email]`), four columns in C6 order (**B2B & Corporate, About Us, Resources, Contact**), and bottom line with copyright, licence placeholder, and legal links.
   - `FloatingWhatsApp.tsx`: Yellow `"Need help? / Chat with us"` pill (`.wa`) with WhatsApp icon.
   - `QuoteDrawer.tsx`: Slide-over quote panel with `role="dialog"`, `aria-modal="true"`, keyboard focus trap, focus restoration on close, Escape handling, all 8 fields, `console.log` on submit, and animated SVG tick success state.
   - `Toast.tsx`: Accessible `role="status"` `aria-live="polite"` toast notification.
   - `RevealObserver.tsx`: `IntersectionObserver` reveal for `.rv` and `.head` (word-by-word heading split and grid stagger `--d`), respecting `prefers-reduced-motion`.
3. **Shared section components**:
   - `PageHero.tsx` (photo or video, breadcrumbs, ornament, eyebrow, title, lead, CTAs)
   - `PlainHero.tsx` (breadcrumbs, ornament, eyebrow, title, lead)
   - `EnquiryBand.tsx` (heading, text, inline form, consultation link)
   - `FAQList.tsx` (`<details>`/`<summary>` accordion)
   - `Breadcrumbs.tsx`, `ArrowIcon.tsx`, `Ornament.tsx`
4. **Temporary styleguide (`src/app/(frontend)/styleguide/page.tsx`)**:
   - Renders `PageHero`, all 18 colour tokens, `Ornament`, buttons (`btn-green`, `btn-sun`, `btn-line`, `btn-ghost`), `.link`, filter chips, Quote panel / Toast / My trip interactive triggers, `.card` + `.box` cards, `PlainHero`, `EnquiryBand`, and `FAQList`.
   - Typed sample data in `src/lib/sample-shell-data.ts`.
   - Added `images.unsplash.com` to `images.remotePatterns` in `next.config.ts`.

## How to run and test
1. Ensure the dev server is running (`pnpm dev`).
2. Open `http://localhost:3000/styleguide` at `1440px`, `768px`, and `375px` and compare against `design/prototype-c6.html`.
3. Verify:
   - Header transparency over `PageHero`, solid cream on scroll and on megamenu open, 3-column dropdowns, and burger menu below `1320px`.
   - Keyboard navigation: Tab through menus, `Enter`/`Space` to open, `Escape` to close; `QuoteDrawer` focus trap and focus return on close.
   - Footer column order: B2B & Corporate, About Us, Resources, Contact.
   - "Save" buttons update the "My trip" counter in the header; clicking "My trip" opens the Quote drawer pre-filled.

## Verification results
- `pnpm lint`: **Pass** (0 errors, 0 warnings).
- `pnpm typecheck`: **Pass** (`tsc --noEmit` exited with code 0).
- `pnpm build`: **Pass** (`next build` succeeded; `/styleguide` prerendered as static content).

## Known gaps & deviations
- None for Phase 02. All components use typed props with sample data in `src/lib/sample-shell-data.ts` (connected to static prototype data in Phase 02A and Payload CMS in Phase 03+).
