# AGENTS.md — rafayak.github.com

Handoff guide for coding agents working on Rafay's personal site (AI Engineer
portfolio + blog). Read this first, then `DESIGN.md` for the visual system.

> House rule: the repo's `.github/copilot-instructions.md` ("lazy senior dev")
> applies. Reuse what exists, smallest working diff, leave one check behind for
> non-trivial logic, don't add abstractions nobody asked for.

## What this is

A static, content-driven personal site:

- **Home (`/`)** — leads with profile + portfolio (project cards with demo
  videos), then recent blog posts. Work first, blog second.
- **Blog (`/blog`, `/blog/<slug>`)** — Markdown/MDX posts with a pencil reading
  rail and animated squiggly section dividers.
- Warm "letterpress on cream" aesthetic, **Lora** everywhere, light + warm-dark
  with a smooth day/night toggle, and an ambient music toggle.

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 7** (static output) | Zero-JS by default; ideal for GitHub Pages + content |
| Interactive bits | **React 18 islands** | The scroll/hover components need JS; Astro hydrates only those |
| Animation | **framer-motion** | Scroll-linked pencil beam, link-preview spring |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Matches DESIGN.md `@theme`; semantic tokens flip on `.dark` |
| Content | **MDX + content collections** (`glob` loader) | Type-safe frontmatter, `---` → animated divider |
| Fonts | **@fontsource/lora** | Self-hosted Lora, no network font fetch |

## Commands

```bash
npm install        # install deps
npm run dev        # local dev server (http://localhost:4321)
npm run dev:logs   # follow live dev logs in foreground
npm run dev:status # daemon status
npm run dev:stop   # stop daemon
npm run build      # static build → dist/
npm run preview    # serve the built dist/ locally
```

Build must stay green; run `npm run build` before declaring done.

## Layout

```
astro.config.mjs            # site/base, react + mdx, tailwind vite plugin
src/
  content.config.ts         # blog collection + frontmatter schema (zod)
  styles/global.css         # tokens (light + .dark), prose, squiggle keyframes
  lib/utils.ts              # cn(), href() [base-aware], formatDate()
  layouts/BaseLayout.astro  # <head>, no-FOUC theme script, ClientRouter, nav, music
  components/
    Nav.astro               # logo + links + ThemeToggle
    ThemeToggle.tsx         # island — flips .dark, persists localStorage
    MusicPlayer.tsx         # island — ambient audio, persists across nav
    LinkPreview.tsx         # island — hover screenshot card (microlink)
    PencilTracingBeam.tsx   # island — scroll-linked pencil rail (wraps post)
    SquigglyDivider.astro   # SVG draw-on-scroll rule (maps to MDX <hr>)
    ProfileSummary.astro    # profile prose with company LinkPreviews
    ProjectCard.astro       # portfolio card with <video>
  pages/
    index.astro             # home: hero, profile, work grid, recent posts
    blog/index.astro        # post list
    blog/[...slug].astro    # post: PencilTracingBeam + hr→SquigglyDivider
  content/blog/*.mdx        # posts (placeholders)
public/                     # favicon.svg; media/ for project videos (placeholders)
.github/workflows/deploy.yml
```

## Conventions

- **Islands.** Default to `.astro` (zero JS). Only reach for a React island when
  you need client interactivity. Pick the lightest directive: `client:visible`
  (in-viewport, e.g. LinkPreview) > `client:load` (needed immediately, e.g.
  ThemeToggle, MusicPlayer, PencilTracingBeam). Never `client:only` unless SSR is
  impossible.
- **Internal links** must go through `href()` (`src/lib/utils.ts`) so they
  respect the Astro `base`. Don't hardcode `/...`.
- **Colors/fonts** come from semantic Tailwind tokens (`bg-canvas`, `text-ink`,
  `border-border`, `text-muted`, `bg-surface`, `font-serif`). These flip in dark
  mode automatically — never hardcode hex in components. New tokens go in
  `global.css` (`@theme inline` + `:root`/`.dark`).
- **Dark mode** is class-based (`.dark` on `<html>`), set before paint by an
  inline script in `BaseLayout` and re-applied on `astro:after-swap`. Don't use
  `prefers-color-scheme` in CSS for theming.
- **Blog posts**: add an `.mdx` (or `.md`) file under `src/content/blog/`. Required
  frontmatter: `title`, `description`, `pubDate`. Optional: `tags`, `updatedDate`,
  `music`, `draft`. A `---` in the body renders the animated squiggly divider.
- **No drop shadows.** Depth is borders + surface contrast (see DESIGN.md).

## Feature notes (sources)

- **Squiggly dividers** ([astro-blog-template](https://astro-blog-template.netlify.app/blog/markdown-test/#Horizontal)):
  `SquigglyDivider.astro` is an SVG path hidden via `stroke-dasharray`; a global
  `IntersectionObserver` in `BaseLayout` adds `.in-view` to `[data-animate]` to
  draw it. Mapped to MDX `<hr>` via `<Content components={{ hr: SquigglyDivider }} />`.
- **Pencil tracing beam** ([aceternity tracing-beam](https://ui.aceternity.com/components/tracing-beam)):
  `PencilTracingBeam.tsx` uses `useScroll`/`useSpring`; an SVG `pathLength` draws
  a graphite line and a pencil rides the leading edge. Wraps the rendered post.
- **Link preview** ([aceternity link-preview](https://ui.aceternity.com/components/link-preview)):
  `LinkPreview.tsx` shows a hover screenshot from **microlink.io** (runtime
  network dep). Pass `imageSrc` to use a committed static image instead and stay
  fully self-contained.
- **Music player** ([creative.inc](https://www.creative.inc/)): `MusicPlayer.tsx`
  is mounted once in `BaseLayout` with `transition:persist` so audio survives
  blog navigations under the View Transitions router. Drop a real track at
  `public/media/ambient.mp3` (placeholder path; the control hides itself if the
  file is missing).
- **Project videos**: `ProjectCard.astro` renders a lazy self-hosted `<video>`
  (`preload="none"` + poster). Put files in `public/media/`; reference as
  `/media/<name>.mp4`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`, `withastro/action`) builds and
deploys to GitHub Pages on push to `main`. Enable Pages → Source: **GitHub
Actions** in repo settings once.

⚠️ **Base path.** The repo is named `rafayak.github.com` (note `.com`), which is
**not** a GitHub user-page repo. As-is it deploys to
`https://rafayak.github.io/rafayak.github.com/` and needs
`base: '/rafayak.github.com'` in `astro.config.mjs`.

- **Recommended:** rename the repo to `rafayak.github.io` → clean root URL, keep
  `base: '/'` (current setting).
- If you keep the name, set `base: '/rafayak.github.com'`. All links use `href()`,
  so that's the only change required.

## Quality bar

- `npm run build` passes; `npm run preview` renders home + a blog post.
- `prefers-reduced-motion` disables the squiggle draw + theme cross-fade
  (already handled in `global.css`); keep new animations behind it.
- Theme persists with no flash on reload; music keeps playing across blog nav.
- Accessibility: real `aria-label`/`aria-pressed` on toggles, `alt` on media,
  keyboard-reachable controls. Keep it.
- Don't regress the zero-JS-by-default posture: no new `client:*` without a
  concrete interaction reason.
