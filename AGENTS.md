<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio — agent notes

Next.js 16.2.10 + React 19 + TS strict + Tailwind v4 (`@import "tailwindcss"`, `@tailwindcss/postcss`). Alias `@/*` → `./*`.

## Static-only — do not break

- `next.config.ts`: `output: "export"`, `images.unoptimized: true`. No Server Actions, API routes, or runtime image optimization. `npm run build` emits `out/`.
- `app/opengraph-image.tsx` + `app/twitter-image.tsx` must stay `export const dynamic = "force-static"`; OG fonts load from `assets/fonts/*.woff` via `node:fs`.

## Content — single source

- All site copy lives in `lib/content.ts`, mirroring `resume-source/*.html` (source of truth). Edit claims there, nowhere else.
- Constraint: **bastaFDA has no database.** Never add MySQL/schema claims.
- Wiring: single page in `app/page.tsx` + `components/Nav.tsx`, `components/ProjectVisual.tsx`, `components/Icons.tsx`; fonts (Martian Mono + Sometype Mono) in `app/layout.tsx`.

## Commands

```bash
npm run dev      # local dev
npm run build    # static production build (out/)
npm run lint     # eslint (ignores .next/ out/ build/)
npx tsc --noEmit # no typecheck script — use this
npm run resume:pdf # HTML → public/resume/*.pdf, needs system Chrome/Edge (playwright-core CDP, CHROME_PATH override)
npm run resume:ats # warn-only resume linter, never fails build
```

## Assets & conventions

- Project screenshots: 16:10 `.png`/`.webp` in `public/projects/`, wired via `image`/`images` in `lib/content.ts` (placeholder renders until then). Phone shots use `mobileAspect: true` + `images[]` gallery.
- Tokens + shell grammar (`$`/`>`/`#`, `.prompt-line`/`.out-line`/`.comment`) in `app/globals.css`; see `DESIGN.md`. Any animation needs a `prefers-reduced-motion` fallback.
- `--ink-faint` must stay ≥4.5:1 on `--bg` (currently `#7d8b9c`, 5.45:1) — body-size metadata uses it. No `bg-black/white/gray-*` literals; use slate tokens. Min touch target 44px; visible `:focus-visible` on all interactive elements.
- Tone per `PRODUCT.md`: honest `[shipped]`/`[in progress]`/`[planned]` labels only, recruiter-readable in <2 min.
