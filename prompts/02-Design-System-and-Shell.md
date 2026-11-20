# 02 — Design system and site shell

Follow `00-Project-Rules.md`. Source: `design/prototype-c6.html`.

## Goal
Port the prototype's visual system and the parts that appear on every page. In this phase they use **typed props with sample data**; phase 03 connects them to the CMS.

## Build these components to match the prototype exactly

**1. Base styles.** Port the final computed styles for:
- body, `.wrap` (max width 1240 px, 24 px gutters), section spacing (`.pad`, `.pad-s`) and the home flow spacing;
- `.eyebrow` (mono uppercase with a short yellow dash);
- `.head` (italic serif heading row with a link on the right);
- buttons (`btn-green`, `btn-sun`, `btn-line`, `btn-ghost`);
- links (mono uppercase with an arrow);
- tags, chips and card styles.

**2. Reveal animation.** Elements fade up when they enter the viewport (IntersectionObserver), with staggered delays in grids and word-by-word section headings. Respect reduced motion.

**3. Header.**
- Top bar: tagline on the left; links on the right (Partner Enquiries, Book a Consultation, WhatsApp, Arabic link).
- Logo on the left; main menu centred; Request a Quote button on the right (the C6 grid layout). A "My trip" counter button appears before Request a Quote when the visitor has saved items.
- Transparent over a hero; solid cream with blur once scrolled or when a menu is open.
- Main menu items: UAE Experiences, International Holidays, B2B & Corporate.
- Each item opens a full-width dropdown with three columns: intro (title, text, Overview link), a two-column list of links (each with a name and a short line), and a feature photo card.
- Desktop: opens on hover and on click, closes on Escape.
- Below 1320 px: burger button opens a full-screen menu with collapsible groups.

**4. Footer.**
- Logo column: logo, description, address, phone and email.
- Four link columns in this order: **B2B & Corporate, About Us, Resources, Contact**.
- Bottom line: copyright, licence numbers and legal links.

**5. Floating chat button.** Yellow "Need help? / Chat with us" pill with a WhatsApp icon, opening `https://wa.me/{number}`.

**6. Quote panel.** Slides in from the right on any element with `data-quote="…"`.
- Fields: I'm interested in (pre-filled), name, email, phone/WhatsApp, travel dates, adults, children, message.
- Success state with the animated tick and the reply-time line.
- Submission is wired up in phase 09. For now, log the payload.

**7. Toast** notifications.

**8. Shared section components** used later by blocks and templates:
- `PageHero`: photo or video, breadcrumbs, eyebrow, title, lead, buttons;
- `PlainHero`;
- `EnquiryBand`: heading, text, small form, consultation button;
- `FAQList`: details/summary accordion;
- `Breadcrumbs`.

## Accessibility
- Keyboard: menus open with Enter or Space and close with Escape.
- The quote panel traps focus and returns it on close; it has `aria-modal`.
- Every icon-only button has a label.

## Done when
- A temporary `/styleguide` route shows every component and matches the prototype side by side at 1440, 768 and 375 px.
- Lint, typecheck and build pass.
- The report lists the `/styleguide` URL and what to look at. The reviewer checks it in the browser against the prototype.
