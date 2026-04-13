# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

SvelteKit 2 static site for [nais.io](https://nais.io) — a Norwegian government application
platform. Uses Svelte 5, TypeScript, mdsvex for Markdown content, and deploys to GitHub Pages.
Primary content language is Norwegian; some blog posts are in English.

## Prerequisites

- **Node:** 24.11.0 (pinned in `mise.toml`)
- **Package manager:** pnpm (pinned in `mise.toml`)
- Install deps: `pnpm install --frozen-lockfile`

## Build / Lint / Check Commands

| Task                   | Command                   |
| ---------------------- | ------------------------- |
| Install dependencies   | `pnpm install`            |
| Dev server             | `pnpm run dev`            |
| Production build       | `pnpm run build`          |
| Preview build locally  | `pnpm run preview`        |
| Type-check             | `pnpm run check`          |
| Type-check (watch)     | `pnpm run check:watch`    |
| Lint (Prettier+ESLint) | `pnpm run lint`           |
| Format (auto-fix)      | `pnpm run format`         |
| ESLint only            | `pnpm eslint .`           |
| Prettier check only    | `pnpm prettier --check .` |
| Build RSS feed only    | `pnpm run build-rss`      |

**There is no test framework configured.** No jest, vitest, or playwright. Validation is done
via `pnpm run lint` and `pnpm run check` (svelte-check for type errors).

After making changes, always run:

```sh
pnpm run lint && pnpm run check
```

## Project Structure

```
src/
  app.html              # HTML shell template
  app.d.ts              # SvelteKit type declarations
  lib/                  # Shared components ($lib alias)
    icons/              # SVG icon components (PascalCase .svelte files)
  routes/               # SvelteKit file-based routing
    +layout.svelte      # Root layout (Header + global CSS imports)
    +layout.ts          # prerender=true, trailingSlash="always"
    +page.svelte        # Homepage
    +error.svelte       # 404 page
    (pages)/            # Route group for content pages (centered layout)
      blog/             # Blog section
        posts/          # Each post is a directory: <slug>/+page.md
      log/              # Changelog section
        posts/          # Flat .md files: YYYY-MM-DD-slug.md
  styles/               # Global CSS (app.css, reset.css, advent.css)
static/                 # Static assets served at site root
svelte.config.js        # SvelteKit + mdsvex configuration
eslint.config.js        # ESLint flat config (primary)
remark-custom-emojis.js # Custom remark plugin for Slack emojis
build-rss.js            # RSS feed generator (runs post-build)
```

## Code Style

### Formatting (enforced by Prettier)

- **Indentation:** Tabs (not spaces)
- **Quotes:** Double quotes (`"`)
- **Trailing commas:** Always
- **Print width:** 100 characters
- **Bracket placement:** Same line (`bracketSameLine: true`)
- **HTML whitespace:** Ignored
- Svelte files use `prettier-plugin-svelte` with the `svelte` parser

### TypeScript

- Strict mode enabled (`strict: true` in tsconfig)
- `allowJs` and `checkJs` are enabled — JS files are type-checked too
- Use `import type { ... }` for type-only imports
- Use JSDoc `/** @type {import('...')} */` annotations in plain JS config files
- Module resolution: `bundler`

### Svelte Components

- Use `<script lang="ts">` when TypeScript features are needed; plain `<script>` otherwise
- **Svelte 5 runes** are the standard: `$props()`, `$state()`, `{@render children()}`
- Type props with an interface:
  ```svelte
  <script lang="ts">
  	import type { Snippet } from "svelte";
  	interface Props {
  		title?: string;
  		children: Snippet;
  	}
  	let { title, children }: Props = $props();
  </script>
  ```
- Component structure: `<script>` -> template HTML -> `<style>`
- CSS is always scoped via `<style>` blocks (no CSS modules, no Tailwind)
- Use `:global()` selector to style slotted/rendered content
- Page titles: `<svelte:head><title>PageName — Nais</title></svelte:head>`

### Naming Conventions

| Category              | Convention                 | Examples                                 |
| --------------------- | -------------------------- | ---------------------------------------- |
| Svelte components     | PascalCase                 | `Header.svelte`, `Glance.svelte`         |
| SvelteKit route files | `+` prefix convention      | `+page.svelte`, `+layout.ts`             |
| Route groups          | Parenthesized dirs         | `(pages)/`                               |
| Variables/functions   | camelCase                  | `isActive`, `feedItem`                   |
| CSS custom properties | `--kebab-case`             | `--color-primary`, `--content-max-width` |
| CSS class names       | kebab-case preferred       | `.main-menu-toggle`, `.byline`           |
| Blog post dirs        | kebab-case                 | `otel-from-0-to-100/`                    |
| Log post files        | `YYYY-MM-DD-kebab-slug.md` | `2026-02-24-bedre-navn.md`               |
| Config/plugin files   | kebab-case                 | `remark-custom-emojis.js`                |

### Imports

No automated import sorter is configured. Follow this order:

1. Framework/library imports (`$app/environment`, `date-fns`, etc.)
2. Type-only imports (`import type { PageData } from "./$types"`)
3. Local/relative imports (components, icons, styles)

Use SvelteKit path aliases: `$lib/...`, `$app/...`. Use relative paths for same-directory files.

### CSS Conventions

- Define design tokens as CSS custom properties in `:root` (see `src/styles/app.css`)
- Use modern CSS: `color-mix()`, `min()`, `calc()`, CSS grid, flexbox
- Single responsive breakpoint: `@media (min-width: 768px)` (mobile-first)
- Fluid sizing patterns: `padding: min(8vw, 6rem) min(4vw, 3.6rem)`
- No CSS framework — all hand-written scoped CSS

## Content (Markdown)

### Blog Posts (`/blog`)

- One directory per post: `src/routes/(pages)/blog/posts/<slug>/+page.md`
- Co-locate images in `images/` subdirectory, reference via relative path
- Frontmatter:
  ```yaml
  ---
  title: "Title"
  description: "Short description"
  date: 2024-05-27T19:09:09+02:00
  author: Author Name
  tags: [tag1, tag2]
  language: en # optional, defaults to Norwegian
  draft: false # optional
  ---
  ```

### Log Posts (`/log`)

- Flat files: `src/routes/(pages)/log/posts/YYYY-MM-DD-slug.md`
- Frontmatter:
  ```yaml
  ---
  title: "Title"
  date: 2026-02-24T13:09:00+01:00
  author: Author Name
  tags: [tag1, tag2]
  layout: log
  ---
  ```
- Custom Slack emojis can be used inline (`:naisely-done:`, `:texas:`)
- RSS feed auto-generated at build time by `build-rss.js`

### Dates

All dates use ISO 8601 with timezone offset: `2026-02-24T13:09:00+01:00`

## Copilot / Writing Instructions

From `.github/copilot_instructions.md` — applies to all content and documentation:

- **Professional but approachable** tone; avoid jargon
- **Inclusive and empowering** — address both experienced devs and newcomers
- **Product-focused** — emphasize UX, value delivery, platform impact
- **Transparent and honest** — share strengths and areas for improvement
- Use clear, concise sentences; active voice; headings and bullet points
- Enrich content with images (descriptive alt text) and code examples
- Reference real-world use cases and practical benefits

## Key Technical Notes

- Site is fully pre-rendered (SSG): `export const prerender = true` in root `+layout.ts`
- Static adapter outputs to `build/` with `404.html` fallback
- mdsvex processes `.svelte`, `.svx`, `.md` extensions
- Shiki syntax highlighting with `github-dark` theme (JS, TS, YAML, Bash, Elm, Shell, Kotlin, JSON)
- `@nais` npm packages come from Google Artifact Registry (configured in `.npmrc`)
- The `SLACK_TOKEN` env var is needed at build time for custom emoji resolution (optional — degrades gracefully)
- Build produces RSS at `build/log/rss.xml` via post-build `build-rss.js` step
