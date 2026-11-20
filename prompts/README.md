# AB Tours UAE — Build Prompts for Antigravity

These prompts build the AB Tours UAE website and CMS from the approved prototype **Design C6** (`AB_Tours_UAE_Prototype_C6.html`). They cover everything committed in the Beetrix360 proposal to AB Tours (19 November 2026), plus two requests added on 20 November:

- form submissions create **Clients** in the CMS;
- the CMS has a **user hierarchy**.

**Roles**
- **Antigravity** writes the code, one prompt at a time.
- **Claude** reviews each phase before the next prompt is sent (see `REVIEW-Checklist.md`).

## How to run it

1. This repository is already prepared: the design is in `design/prototype-c6.html`, and the project rules are in `AGENTS.md`, which Antigravity loads automatically. Open the repository folder in Antigravity.
2. Phase reports go in `reports/phase-NN.md`.
3. Approved decisions are in `docs/decisions.md`, and the committed scope is in `docs/scope.md`.
4. Run prompts `01` to `13` in order. After each one:
   - Antigravity commits its work and writes the report the prompt asks for.
   - Claude reviews it using the matching section of `REVIEW-Checklist.md`.
   - Any fixes Claude lists go back to Antigravity before moving on.
5. Do not skip a phase. Later prompts assume the earlier ones passed review.

## Phases

| # | Prompt | Result |
|---|---|---|
| 01 | Project setup | Next.js + Payload CMS 3 app running locally with Postgres |
| 02 | Design system and site shell | Tokens, fonts, components, header, footer, menus, quote panel |
| 02A | Front end of every page | Homepage and all templates built with temporary prototype data, no database |
| — | Database setup | Local PostgreSQL password and database, at the start of phase 03 |
| 03 | CMS foundation | Users and roles, media, site-wide settings (branding, header, footer, contact, forms) |
| 04 | Content collections | Every content type with its fields |
| 05 | Page builder and routing | Block library, customisable Pages, nested pages, URL resolution |
| 06 | Homepage | All 16 homepage sections as editable blocks, with their interactions |
| 07 | UAE Experiences templates | Emirates, day trips, packages, tickets |
| 08 | Remaining templates | International holidays, B2B, About, Resources, Contact, legal, 404 |
| 09 | Forms, clients and enquiries | Forms, client records, enquiry pipeline, emails, spam protection, export |
| 10 | Publishing and search | Drafts, live preview, scheduled publishing, SEO, sitemap, redirects, analytics |
| 11 | Seed content | Prototype content loaded so the site matches C6 before client content arrives |
| 12 | Quality | Accessibility, speed, responsive checks, automated tests |
| 13 | Launch and handover | Production deployment, editor guide, handover |

## Source documents
Give these to Antigravity when a prompt mentions them:
- `design/prototype-c6.html` (from `AB_Tours_UAE_Prototype_C6.html`) — approved design, behaviour and sample content.
- `docs/sitemap.md` (from `AB_Tours_DMC_Sitemap_for Developer.md`) — URL structure.
- `docs/cms-content-model.md` (from `AB_Tours_CMS_Content_Model.md`) — the earlier content model. Where it differs from these prompts, these prompts win.
- `docs/content-request-forms/` — the fields AB Tours was asked to supply. Every field in these forms must exist in the CMS.
