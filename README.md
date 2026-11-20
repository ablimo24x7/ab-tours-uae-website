# AB Tours UAE — website and CMS

Brand showcase and enquiry website for AB Tours UAE, built by Beetrix360 with Next.js and Payload CMS 3. Target launch: 7 December 2026.

This repository is prepared for **Antigravity** to build in phases, with **Claude** reviewing each phase.

## Folders
| Folder | Contents |
|---|---|
| `AGENTS.md` | Project rules. Antigravity loads it automatically in every conversation. |
| `design/prototype-c6.html` | Approved design. Open it in a browser; pages use hash links such as `#/uae-experiences/dubai`. |
| `docs/scope.md` | What was committed in the proposal. |
| `docs/decisions.md` | Approved decisions and open questions. |
| `docs/sitemap.md`, `docs/cms-content-model.md` | URL structure and the earlier content model. |
| `docs/content-request-forms/` | The fields AB Tours was asked to supply (Markdown copies of the Word forms). |
| `prompts/` | Phase prompts `01`–`13` and the reviewer checklist. |
| `reports/` | Antigravity's report after each phase. |

## How to build
1. Open this folder in Antigravity.
2. Send: **"Run phase 01. Read prompts/01-Project-Setup.md."**
3. When Antigravity finishes, ask Claude to review it. The review request is at the top of `prompts/REVIEW-Checklist.md`.
4. Send Claude's fix list back to Antigravity. When the phase passes, run the next one.

## Running locally

### Prerequisites
- Node.js (`^22.23.5 || ^24.22.3 || >=26.13.1` — see `.nvmrc`)
- pnpm (`corepack enable` or `npm i -g pnpm`)
- PostgreSQL 18 (local Windows service `postgresql-x64-18`)

### Setup
1. Create the `ab_tours_uae` database on your local PostgreSQL 18 server using `createdb` or pgAdmin:
   ```bash
   createdb -U postgres ab_tours_uae
   ```
2. Copy `.env.example` to `.env`, set `DATABASE_URI` with your PostgreSQL password, and set `PAYLOAD_SECRET`:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the Payload admin panel.

### Useful scripts
- `pnpm dev` — start Next.js + Payload in development mode
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — run ESLint
- `pnpm typecheck` — run TypeScript type checking (`tsc --noEmit`)
- `pnpm generate:types` — regenerate `src/payload-types.ts`
- `pnpm seed` — run the CMS seed script (populated in Phase 11)
- `pnpm test:e2e` — run Playwright end-to-end tests
