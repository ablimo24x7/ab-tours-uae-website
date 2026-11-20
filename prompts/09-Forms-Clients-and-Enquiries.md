# 09 — Forms, clients and enquiries

Follow `00-Project-Rules.md`.

## Goal
Every form on the site saves a **client** and an **enquiry** in the CMS. It emails the right team. The team then manages each enquiry from new to won or lost. Do **not** use the Payload Form Builder plugin: the forms are fixed designs from the prototype.

## Forms to connect
| Form | Where | Fields |
|---|---|---|
| Quote panel | Every page, through `data-quote` | Pre-filled "interested in", name, email, phone/WhatsApp, travel dates, adults, children, message |
| Plan bar | Homepage | Opens the quote panel pre-filled |
| My trip | Header | Opens the quote panel with saved items |
| Request a Quote | Three-step page | Planning options (multi-select), start date, nights, adults, children, where to, budget level, name, email, phone, preferred contact, message |
| Book a Consultation | Page | Topic, how to talk, preferred date, time slot, name, phone, message |
| Partner Enquiries | Page | I am a…, company, country, licence/registration no., contact name, email, interested in, about the business |
| Enquiry bands and the package quote box | Inner pages | Name, email or WhatsApp, travel dates, interested in / travellers |

## 1. `clients` collection (admin only, never public)
- Fields:
  - name, email (unique, stored lower-case), phone/WhatsApp (stored normalised), country, company;
  - client type: Individual, Travel agency / tour operator, Hotel or attraction, Corporate client, Other supplier;
  - preferred contact method;
  - first source page, first enquiry date, last enquiry date;
  - a join (reverse relationship) listing all of the client's enquiries;
  - owner (user), tags, internal notes.
- Matching: a new submission attaches to an existing client with the same email, otherwise the same normalised phone; otherwise a new client is created. Empty fields on the client are filled from the new submission; existing values are not overwritten.

## 2. `enquiries` collection (admin only)
- Fields:
  - type: quote panel, request a quote, consultation, partner, enquiry band;
  - client (relation);
  - interested in, source page URL, source item (optional relation);
  - route: `leisure`, `outbound`, `b2b`;
  - all form answers as readable fields, plus the raw submission as JSON (read-only);
  - UTM source, medium and campaign (captured from the landing URL and kept for the session);
  - status: `new` → `contacted` → `proposal sent` → `won` or `lost`;
  - owner (user), internal notes (array: note, author, date — author and date set automatically);
  - created date.
- Route rules, applied server-side:
  - Partner enquiries → `b2b`.
  - Request a Quote with "Corporate or MICE" → `b2b`. With "International holiday" or "Cruise" → `outbound`. Otherwise `leisure`.
  - Consultation topic "Corporate / MICE" → `b2b`. "International holiday" or "Bespoke itinerary" → `outbound`. Otherwise `leisure`.
  - Quote panel and enquiry bands: by source path. `/b2b-corporate/*` → `b2b`; `/international-holidays/*` → `outbound`; everything else → `leisure`.
- Access (matching the phase 03 matrix):
  - Admin and Editor can read and update status, owner and notes.
  - Nobody can edit the original answers.
  - Only Admin can delete.
  - Only Admin can export.
  - Public `read`/`create` through the REST or GraphQL API is denied; submissions come only through the endpoint below.

## 3. Submission endpoint
`POST /api/enquiry` (Next.js route handler):
1. Validate with zod against the form type.
2. Spam protection:
   - hidden honeypot field;
   - a minimum time between page load and submit (3 seconds);
   - per-IP rate limit (5 submissions per 10 minutes, stored in Postgres so it works with several server instances).
   - Rejected spam returns a generic error and is not saved.
3. Upsert the client, then create the enquiry, both through the Local API.
4. Email the route's recipients from Form Settings. The email contains the type, route, every answer, the source page and a link to the enquiry in `/admin`. Use `payload.sendEmail`. If email fails, the enquiry is still saved and the failure is logged on the enquiry.
5. Return success. The UI shows the success state with the reply-time promise from Form Settings.
6. Never log personal data to the console.

## 4. Admin views
- Enquiries list: default columns date, client, type, route, interested in, status, owner. Filters by status, route, type and date.
- Clients list: name, email, phone, type, last enquiry, number of enquiries.
- **Export CSV** (Admin only):
  - an admin-only endpoint `/api/enquiries/export` that respects the current filters (status, route, date range);
  - a button in the Enquiries list view, hidden for Editors.

## Done when
- Submitting every form by hand creates a client and an enquiry with the right route, visible in `/admin`. Automated tests come in phase 12.
- A second submission with the same email attaches to the same client.
- The honeypot and rate limit block submissions.
- An Editor cannot export or delete.
- Emails are captured in development (log transport or Mailpit) and their content is shown in the report.
