# 08 — International Holidays, B2B, About, Resources, Contact, legal and 404

> **Front end already built in phase 02A.** The design and interactions below already exist with temporary data. In this phase:
> - connect them to the CMS blocks and collections;
> - add `sectionControls` and `extraSections` where this prompt asks;
> - fix any gap against the prototype.
>
> Do not rebuild or restyle components that already match the pages approved in the phase 02A review.

Follow `00-Project-Rules.md`. Match the prototype pages at the hash routes shown.

## International Holidays
- **Overview** `/international-holidays`: a Page with `pageHero` (video) and `linkCards`. Prototype: `#/international-holidays`.
- **Holiday style, standard variant** `/international-holidays/{style}`. Prototype: `#/international-holidays/easy-visa-destinations`.
  1. page hero;
  2. destination cards (image, style tag, card note, name, description, Request a quote pre-filled "{style}: {destination}");
  3. note line;
  4. enquiry band;
  5. `extraSections`.
- **Bespoke variant** `/international-holidays/bespoke-itineraries`. Prototype: `#/international-holidays/bespoke-itineraries`.
  1. page hero with a Book a consultation button;
  2. "How a bespoke trip comes together" four steps.

## B2B & Corporate
- **Overview** `/b2b-corporate`: a Page.
- **Service** `/b2b-corporate/{service}`. Prototype: `#/b2b-corporate/dmc-services`.
  1. page hero with Request a proposal and Partner enquiries buttons;
  2. "What we handle": description, list and image;
  3. external link button if set (Transportation: "Visit AB Transport · ab.limo");
  4. "How we work" steps (shared defaults);
  5. enquiry band;
  6. `extraSections`.

## About Us — Pages built from blocks
| Page | Prototype | Blocks |
|---|---|---|
| Company Profile | `#/about/company-profile` | `pageHero`; `editorialTextImage` with the PDF download; `keyFacts`; `linkCards` "Part of AB Group" |
| Why AB Tours | `#/about/why-ab-tours` | `plainHero`; `numberedCards` (six reasons) |
| Strategic Partners | `#/about/strategic-partners` | `plainHero`; `logoGrid` grouped by type; Become a partner button |
| Testimonials | `#/about/testimonials` | `plainHero`; `testimonialsGrid` |

## Resources
- **Travel Guides list**: a Page with `cardGrid` (guides).
- **Guide article** `/resources/travel-guides/{guide}`: hero, intro, rich text body, related items, enquiry band.
- **Blog list**: a Page with `blogList` (alternating rows).
- **Blog post** `/resources/blog/{post}`: hero, date and category, body.
- **FAQs**: a Page with `faqGroups`, grouped as UAE experiences, International holidays, B2B & corporate.

Article and post pages reuse prototype typography and components; there is no separate prototype for them.

## Contact — Pages built from blocks
| Page | Prototype | Blocks |
|---|---|---|
| Contact | `#/contact` | `plainHero` "Let's talk"; `contactCards`; `keyFacts` from Contact Details |
| Request a Quote | `#/contact/request-a-quote` | `form` (quote): the three-step planner with progress bar, option cards with photos, then dates/travellers/budget, then contact details |
| Book a Consultation | `#/contact/consultation-request` | `plainHero`; `form` (consultation) |
| Partner Enquiries | `#/contact/partner-enquiries` | `plainHero`; `form` (partner) |

Form option lists come from Form Settings (phase 03). Submission is wired up in phase 09.

## Legal and system
- Privacy policy and Terms and conditions: Pages with `plainHero` and `richText`, linked in the footer.
- 404: `plainHero` using the Site Settings text, with links to the homepage and the three main sections.

## Done when
- Every URL in the table in `00-Project-Rules.md` renders.
- Every prototype page matches at 1440, 768 and 375 px when checked in the dev server.
- The report lists any page with no prototype equivalent and how it was designed (expected: day trip detail, guide article, blog post, legal pages).
