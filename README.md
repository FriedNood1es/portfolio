# Kent Lozano — Portfolio

Revamp of [kent-lozano.vercel.app](https://kent-lozano.vercel.app), built with Next.js + TypeScript + Tailwind. Deployed to Vercel.

## Rules of this repo

- Every claim on the site mirrors `resume-source/KentLozano-Resume.html` (the source of truth). Notably: **bastaFDA has no database**. Projects shown: bastaFDA, Kanbo, This Portfolio.
- All content lives in `lib/content.ts`. Edit claims there, nowhere else.
- Project screenshots: drop 16:10 images in `public/projects/` and set `image` on the project in `lib/content.ts` — placeholder panels render until then (see `public/projects/README.md`).

## Commands

```bash
npm run dev     # local dev server
npm run build   # static production build
```

## Publishing later

Create the GitHub repo, `git remote add origin …`, push, and import into Vercel — the site is fully static.
