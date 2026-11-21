# Phase 03 — review by Claude (21 Nov 2026, 12:55)

**Result: not passed — one blocking bug.** The first Admin cannot be created. Everything else checked is correct or a minor fix.

## The blocking bug: first user can't be created
I reproduced it against the local dev server with a throwaway test account (`POST /api/users/first-register`). The response was **404 "Not Found"** after about 7 seconds. The database still has 0 users, because the transaction rolled back, so nothing needs cleaning up.

The cause is in `src/collections/Users.ts`, in the `afterLogin` hook:
1. Payload's first-user registration creates the user **inside a database transaction**, then logs them in.
2. `afterLogin` calls `req.payload.update({ collection: 'users', id: user.id, … })` **without passing `req`**, so that update runs outside the transaction.
3. Outside the transaction the new user doesn't exist yet. The update throws "Not Found", and Payload rolls the whole registration back.

The same pattern (Local API calls in hooks without `req`) also appears in the `beforeChange` counts and in `beforeDelete`'s `findByID` and count. Those don't break today, but they read outside the transaction too.

## Checks
| Check | Result |
|---|---|
| Database | Pass. `.env` points at the Neon `dev` branch (pooled host); 30 tables were pushed; `payload_migrations` holds only the dev-push marker. |
| Adapter reads `DATABASE_URI`, then `DATABASE_URL` | Pass. |
| First migration committed | Pass (`src/migrations/20261121_074209_initial.ts`). |
| `build:vercel` | Pass. Migrates with `DATABASE_URL_UNPOOLED` first, then builds; `vercel.json` uses it. |
| Roles in one place, access helpers in `src/access/` | Pass. |
| Users: Admin-only create and delete, Editor sees only self, role field Admin-only, first user forced to Admin, last-Admin guards | Code is correct, but **can't be checked by hand until the bug is fixed**. |
| Users and Site Settings hidden from Editors | Pass. |
| Form Settings: recipients and reply-time are Admin-only fields | Pass. The public page receives only the reply-time text, not the recipients (checked in the rendered HTML). |
| Media: alt, caption, credit; images, MP4, PDF; four sizes with focal point; non-blocking width notice | Pass. |
| Vercel Blob with `clientUploads`, only when `BLOB_READ_WRITE_TOKEN` is set; S3 removed | Pass. |
| Globals: Branding (hex-validated overrides), Header, Footer, Contact Details, Site Settings, Form Settings | Pass. |
| Site shell reads the globals, with prototype fallbacks | Pass. |
| Lint, typecheck, build | Pass. The 4 lint warnings are in the generated migration file. |
| Pushed | Not yet. Local `main` is 1 commit ahead of GitHub (the phase 03 commit). Push after the fix. The Vercel build will then run the first migration against the production database. |

## Fix list for Antigravity
> Phase 03 review fixes. Do only these:
> 1. **Blocking.** In `src/collections/Users.ts`, pass `req` to every Local API call inside hooks, so they run in the same transaction:
>    - the `payload.update` in `afterLogin`;
>    - both `payload.count` calls in `beforeChange`;
>    - the `findByID` and `count` in `beforeDelete`.
>
>    Then ask the developer to create the first Admin at `http://localhost:3000/admin`, and an Editor from the Users list.
> 2. Add `src/migrations/` to the ESLint ignores (generated files).
> 3. No schema change, so no new migration is needed. Commit, then update `reports/phase-03.md`.

## After the fix — hand check (the developer)
Log in as the Admin and as the Editor, and check:
- the Editor can't see Users or Site Settings, and can't see the recipient fields in Form Settings;
- the Editor can edit Header, Footer and Contact Details;
- the Editor can change their own name, but not their role;
- the Admin can't demote or deactivate themselves while they are the only Admin.
