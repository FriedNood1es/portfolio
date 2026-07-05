# Kent Lozano — Portfolio

Revamp of [kent-lozano.vercel.app](https://kent-lozano.vercel.app), built with Next.js + TypeScript + Tailwind. Local-only for now — no remote, no Vercel link — until it's ready to publish.

## Rules of this repo

- Every claim on the site mirrors `../KentLozano-Resume.html` (the source of truth). See `../CONTEXT.md` for the campaign glossary — notably: **bastaFDA has no database**, and unshipped projects (GamotCheck, ModQueue) must stay labeled "In progress"/"Planned".
- All content lives in `lib/content.ts`. Edit claims there, nowhere else.
- Project screenshots: drop 16:10 images in `public/projects/` and set `image` on the project in `lib/content.ts` — placeholder panels render until then (see `public/projects/README.md`).

## Commands

```bash
npm run dev     # local dev server
npm run build   # static production build
```

## Publishing later

Create the GitHub repo, `git remote add origin …`, push, and import into Vercel — the site is fully static.
