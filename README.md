# Jonas Balandraux — Personal Site

Personal website and extended CV for **Jonas Balandraux** (ML Engineer / Data
Scientist). A static site built with [Astro](https://astro.build) and Tailwind
CSS, deployed to **Cloudflare Pages** — free and always online, no server to
keep running.

> **Live:** _add your `*.pages.dev` or custom domain here once deployed._

---

## Stack

- **[Astro 7](https://astro.build)** — static output (`output: 'static'`)
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the `@tailwindcss/vite` plugin, design tokens declared in `@theme`
- **TypeScript** — strict (`astro/tsconfigs/strict`)
- **Content Collections** — Markdown content (experience, projects, blog) typed with Zod
- **Self-hosted fonts** — Inter + JetBrains Mono (`@fontsource-variable/*`)
- **React islands** — added when interactive components (charts, demos) are introduced

---

## Quick start

Requires **Node 22.12+** (see `.nvmrc`).

```bash
npm install
npm run dev       # dev server → http://localhost:4321
npm run build     # static build → ./dist
npm run preview   # serve the production build locally
```

### Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the dev server with HMR               |
| `npm run build`   | Build the static site to `dist/`            |
| `npm run preview` | Preview the production build                |
| `npm run astro`   | Run Astro CLI commands (e.g. `astro check`) |

---

## Project structure

```
src/
├── content.config.ts       # Zod schemas for content collections
├── content/
│   ├── experiences/*.md     # professional experience (one file per role)
│   ├── projects/*.md        # projects (one file per project)
│   └── blog/*.md            # blog posts
├── components/              # reusable UI (cards, header, footer, islands…)
├── layouts/                 # BaseLayout, ProjectLayout…
├── pages/                   # routes (index, projects, blog, 404, rss.xml)
└── styles/global.css        # Tailwind import + design tokens (@theme)
public/                      # static assets (favicon, cv.pdf, OG images)
```

Content is decoupled from code: adding an item means adding a Markdown file, no
component changes required.

---

## Content model

### Add a professional experience

Create `src/content/experiences/<company>.md`:

```markdown
---
company: Example Corp
role: Machine Learning Engineer
location: Paris, France
dateLabel: Jan 2026 – Present
startDate: '2026-01' # used for sorting (recent first)
duration: ongoing
summary: One-line summary of the role.
tech: [Python, PyTorch, AWS]
highlights:
  - Shipped X that achieved Y.
  - Led Z.
url: https://example.com
current: true
---

Optional longer narrative (Markdown) shown on a future detail view.
```

### Add a project _(collection to be created — see SPECIFICATIONS.md §5.2)_

```markdown
---
title: Project Name
tagline: One sentence describing it.
role: Solo project
date: '2024-05'
domains: [Computer Vision, Healthcare]
tech: [Python, PyTorch, Streamlit]
featured: true
repo: https://github.com/JonasBlx/...
demo: https://...
highlights:
  - Key result 1.
interactive: false
---

Full write-up: problem, approach, architecture, results.
```

### Add a blog post _(collection to be created — see SPECIFICATIONS.md §5.3)_

```markdown
---
title: Post title
description: Short description for SEO and listing.
pubDate: 2026-08-20
tags: [machine-learning, mlops]
draft: false
---

Post content in Markdown / MDX.
```

---

## Design tokens

Defined in `src/styles/global.css` under `@theme` (dark theme):

| Token                   | Value     | Use                        |
| ----------------------- | --------- | -------------------------- |
| `--color-bg`            | `#0a0a0c` | Page background            |
| `--color-surface`       | `#121216` | Cards                      |
| `--color-surface-2`     | `#1a1a20` | Nested surfaces / tags     |
| `--color-border`        | `#26262e` | Borders                    |
| `--color-ink`           | `#ededf2` | Primary text               |
| `--color-muted`         | `#a1a1ad` | Secondary text             |
| `--color-faint`         | `#6b6b78` | Tertiary text              |
| `--color-accent`        | `#818cf8` | Accent (links, highlights) |
| `--color-accent-strong` | `#6366f1` | Buttons                    |

Fonts: **Inter Variable** (sans), **JetBrains Mono Variable** (mono, used for
meta and tags).

---

## Deployment — Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**,
   select the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. You get a free `*.pages.dev` URL, always online, redeployed on every
   `git push`.
5. **Custom domain (recommended before sharing):** add it under the project's
   **Custom domains** tab (free), then set the final URL in `astro.config.mjs`
   (`site:`) so canonical / Open Graph / sitemap are correct.

---

## Git workflow

`main` is the stable branch — it is what Cloudflare Pages deploys, so every
commit on it should build. Development happens on `dev`, one phase at a time,
and lands on `main` through a merge commit at the end of each phase.

```bash
git switch dev                  # work here
# … commits, following Conventional Commits …

npm run format:check && npm run check && npm run lint && npm run build

git switch main
git merge --no-ff dev -m "Merge branch 'dev': Phase N — <summary>"
git switch dev
git merge --ff-only main        # bring dev back in sync
```

`--no-ff` is what keeps the graph readable: each phase shows up as its own
bubble instead of a flat line. It is set as the default for merges into `main`
via `git config branch.main.mergeoptions --no-ff`, so a forgotten flag still
produces a merge commit.

Inspect the result with:

```bash
git log --graph --oneline --all
```

Conventional Commits prefixes in use: `feat`, `fix`, `docs`, `chore`, `refactor`,
`style`, `perf`, `test`.

---

## Roadmap

Development is phased — see **`ROADMAP.md`**. Current status:

- [x] **Phase 0** — Astro scaffold, design tokens, layout, Experience collection (content still to write)
- [ ] **Phase 1** — MVP online: skills, education, certifications, CV PDF, contact form
- [ ] **Phase 2** — Projects: filterable index + detail pages
- [ ] **Phase 3** — Interactive visualizations
- [ ] **Phase 4** — Blog + RSS
- [ ] **Phase 5** — Polish, custom domain, analytics

Full functional & technical spec: **`SPECIFICATIONS.md`**.

---

## License

© Jonas Balandraux. All rights reserved unless stated otherwise.
