# 12 — Quality: testing, accessibility and speed

Follow `00-Project-Rules.md`. This phase covers the proposal's "Testing on phones, tablets and desktop browsers" and "Form, link and accessibility checks".

## Automated tests (Playwright)
This is the first phase with automated tests. Re-enable the skipped `/admin` smoke test. Write the access-control tests from phase 03 (Local API with `overrideAccess: false`). Write the form, client and enquiry tests from phase 09. Make the Playwright reporter `[['list'], ['html', { open: 'never' }]]` so runs always exit.

- Projects:
  - Chromium, Firefox and WebKit, each at desktop 1440 × 900;
  - mobile emulation for Pixel 7 and iPhone 14;
  - a tablet at 768 × 1024.
- Every URL from `00-Project-Rules.md` returns 200 and has one `h1`. Unknown URLs return the 404 page.
- Interactions:
  - hero slider next/pause;
  - plan bar pre-fill;
  - mood chips;
  - holiday style chips;
  - film chapters;
  - spin;
  - B2B accordion;
  - hearts and My trip;
  - quote panel open, close and focus return;
  - mobile menu;
  - package page sticky quote box.
- Every form: submit, success state, client and enquiry created, route correct. Validation errors are shown and announced.
- Access control: the role matrix tests from phase 03 and the export restriction from phase 09.
- Redirects: renaming a page keeps the old URL working with a 301.
- Link check: no broken internal links on any page.

## Accessibility
- Run `@axe-core/playwright` on every template. There must be no serious or critical issues.
- Check keyboard-only use of the header, menus, sliders, chips, accordion, quote panel and forms.
- Colour contrast: every text and background pair in the design meets WCAG AA. Report any pair from the approved design that fails, and the closest fix that keeps the look, for the reviewer to decide.

## Speed
- Lighthouse (mobile) on the homepage, an emirate page, a package page and the contact form. Report the scores and the top three issues for each page.
- Images use `next/image` with the right `sizes`. Hero images are prioritised; others are lazy.
- Videos:
  - only the active hero video and visible videos load;
  - `preload="none"` elsewhere;
  - paused when off screen.
- Fonts are self-hosted through `next/font` with no layout shift.

## Visual check
Screenshot every prototype route and its new URL at 1440, 768 and 375 px, and put the pairs side by side in a `qa/visual/` folder for the reviewer.

## Done when
All tests pass in CI (`pnpm test:e2e`), and the report includes the axe summary, Lighthouse scores, the visual folder and the list of fixed issues.
