# Design

## Theme

"Ice on slate" full-terminal: the site reads as a typeset shell session on a blue-black ground. Modern shell (Ghostty/Warp adjacent), not retro CRT — no scanlines, no glow filters, no Matrix green.

## Color

OKLCH-first; hex fallbacks listed.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0d1117` | page ground (blue-black) |
| `--bg-raised` | `#151b23` | panels, cards, window chrome |
| `--ink` | `#dbe4ee` | body text (cool white, ≥4.5:1 on bg) |
| `--ink-dim` | `#8b98a7` | secondary text (still ≥4.5:1) |
| `--ink-faint` | `#5b6673` | hairline metadata, large sizes only |
| `--accent` | `#6cc7e6` | cyan — prompts, links, interactive |
| `--ok` | `#7ee2a8` | status: shipped/ok |
| `--warn` | `#e6b566` | status: in-progress |
| `--line` | `#232c37` | borders, rules |

Strategy: Committed — the slate ground IS the surface; cyan is functional (prompt, links), never decorative wash.

## Typography

- **Display/headings**: Martian Mono (condensed weights for big sizes).
- **Body/UI**: Sometype Mono for shell output and labels; long prose paragraphs may relax tracking/line-height (1.7) to stay readable.
- Mono-led is the register; cap heading clamp at 6rem, letter-spacing ≥ -0.02em.
- Shell grammar: `$` prompt lines in accent, `>` output lines, `#` comment lines in dim.

## Components

- **Window chrome**: sections framed as terminal panes only where it earns its place (hero); below, the page is one continuous session.
- **Prompt headings**: sections open with a command line (`$ kent --projects`), not decorative eyebrows or numbered markers.
- **Project entries**: ls-style listing rows + detail blocks; status rendered as `[shipped]` / `[in progress]` / `[planned]` in ok/warn colors.
- **Placeholder visuals**: 16:10 slots rendered as framed "no signal" panes with project name; swapped for screenshots via `image` in `lib/content.ts`.

## Motion

- One typewriter/cursor moment in the hero (respecting reduced-motion: instant render).
- Scroll reveals enhance already-visible content; never gate visibility.
- Blinking block cursor as the single ambient motion; everything else eases out (expo), <300ms.
