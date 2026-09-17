# Roadmap — Site personnel de Jonas Balandraux

_Version 1.0 — 20 août 2026_
_Plan d'implémentation phasé. Chaque phase est livrable indépendamment et déployable._

Légende : `[x]` fait · `[ ]` à faire · ⏱ estimation indicative (dev solo, à ton rythme).

---

## Phase 0 — Fondations ✅ _(déjà en place)_

**But :** un projet Astro qui build et se déploie.

- [x] Scaffold Astro 7 + Tailwind v4 + TypeScript strict
- [x] Tokens de design (mode sombre) dans `global.css`
- [x] `BaseLayout` (meta, OG, fond) + `Header`
- [x] Collection `experiences` (schéma Zod) + `_template.md`
- [x] Rédiger les expériences pro (anglais) dans `src/content/experiences/`
- [x] `ExperienceCard` + timeline sur la Home
- [x] `Footer`, page `404`, `robots.txt`, sitemap
- [x] Outillage : ESLint, Prettier, `astro check`
- [x] Build vérifié

**Definition of done :** `npm run build` passe, page rendue correcte. ✅

**➡️ Prochaine action concrète :** brancher Cloudflare Workers (voir Phase 1.0) pour être en ligne dès maintenant.

---

## Phase 1 — MVP en ligne ⏱ ~1 week-end

**But :** un site public, crédible, avec CV élargi et contact. C'est la version qu'on peut déjà envoyer à un recruteur.

### 1.0 Mise en ligne

- [x] Pousser le repo sur GitHub
- [ ] Connecter Cloudflare Workers (`wrangler.jsonc` → assets `dist`, deploy `npx wrangler deploy`)
- [ ] Vérifier le déploiement sur l'URL `*.workers.dev`
- [ ] Mettre `site:` à jour dans `astro.config.mjs` avec l'URL réelle

### 1.1 Structure & polish de base

- [x] Extraire un composant `Footer.astro` (liens sociaux, copyright)
- [ ] `ThemeToggle` (île React) + script anti-FOUC dans le `<head>`, persistance `localStorage`
- [x] Page `404.astro`
- [x] `robots.txt` + `@astrojs/sitemap`
- [ ] Favicon + image OG par défaut (`public/og/`)

### 1.2 Section Experience / CV élargi

- [ ] Bloc **Skills** : composant `SkillGroup` (catégories : Languages, ML/DL, Data & MLOps, Apps & Viz) depuis le bilan
- [ ] Bloc **Education** (IMT Mines Albi, Licence Maths, CPGE)
- [ ] Bloc **Certifications** (Stanford, Harvard CS50 AI, TOEIC…)
- [ ] Bloc **Languages** (FR natif, EN C1, IT)
- [ ] Bouton **Download CV (PDF)** → `public/cv.pdf`

### 1.3 Contact

- [ ] Formulaire de contact (Formspree ou Cloudflare Forms) + validation + honeypot
- [ ] Liens sociaux vérifiés (GitHub, LinkedIn, email)
- [ ] Message de confirmation / gestion d'erreur

### 1.4 Qualité

- [x] ESLint + Prettier (`prettier-plugin-astro`) configurés
- [x] `astro check` sans erreur
- [ ] Audit Lighthouse ≥ 95 (mobile + desktop)

**Definition of done :** site en ligne, CV téléchargeable, formulaire fonctionnel, Lighthouse ≥ 95, responsive OK.

---

## Phase 2 — Projets ⏱ ~1–2 semaines

**But :** la vitrine. Chaque projet a sa page détaillée ; les projets phares remontent sur la Home.

### 2.1 Infrastructure projets

- [ ] Collection `projects` (schéma Zod, cf. specs §5.2)
- [ ] `ProjectCard.astro` (vignette : titre, tagline, domaines, tech)
- [ ] Page `/projects` : grille responsive + filtres (par domaine / techno)
- [ ] `ProjectLayout.astro` + route `/projects/[...slug]`
- [ ] Composant `Prose.astro` (styles typo du Markdown rendu)
- [ ] Bloc « Featured projects » sur la Home

### 2.2 Contenu des 6 projets (1 fichier Markdown chacun)

- [ ] Real-Time Image Recognition Game (FastAPI + React, team lead)
- [ ] Pokémon Captioning (Transformers, Streamlit/HF)
- [ ] Graph Neural Networks — solubilité moléculaire (GCN, ESOL)
- [ ] DCGAN MNIST (C++ / libtorch)
- [ ] Electricity Price Forecasting (Challenge Elmy)
- [ ] Alzheimer Dashboard (Streamlit, démo en ligne)

Pour chaque projet : problème, rôle, stack, **au moins 1 visuel** (capture/schéma), résultats chiffrés, liens repo + démo.

**Definition of done :** `/projects` filtrable, 6 pages détail complètes avec visuels et liens, projets phares sur la Home.

---

## Phase 3 — Interactivité & visualisations ⏱ ~1 semaine (itératif)

**But :** ce qui différencie ton site — des projets « vivants ».

- [ ] Ajouter `@astrojs/react` (îlots)
- [ ] Composant `Chart` réutilisable (Recharts ou D3/visx) — **lire le skill `dataviz` avant** pour la palette/accessibilité
- [ ] Intégrer 1–2 visualisations concrètes, ex. :
  - [ ] GNN : nuage de points des embeddings moléculaires (clusters KMeans/DBSCAN)
  - [ ] Elmy : série temporelle Intraday vs SPOT
  - [ ] LAAS : courbe d'amélioration du modèle (0,4 % → 18 %)
- [ ] Démo embarquée ou lien iframe vers Hugging Face / Streamlit
- [ ] Vérifier que les îlots n'alourdissent que les pages concernées (`client:visible`)

**Definition of done :** au moins 2 projets avec une visualisation interactive accessible (clavier + `prefers-reduced-motion`), sans régression de perf sur les autres pages.

---

## Phase 4 — Blog ⏱ ~3–4 jours

**But :** présence et partage d'idées ; bon pour le SEO et le personal branding.

- [ ] Collection `blog` (schéma Zod, cf. specs §5.3)
- [ ] Page `/blog` (liste triée par date, tags)
- [ ] Route `/blog/[...slug]` (rendu Markdown/MDX via `Prose`, temps de lecture)
- [ ] Flux `rss.xml` (`@astrojs/rss`)
- [ ] Filtres/pages par tag (optionnel)
- [ ] Gestion des brouillons (`draft: true` exclu du build)
- [ ] 1er article de lancement

**Definition of done :** blog navigable, RSS valide, brouillons exclus, 1 article publié.

---

## Phase 5 — Polish, diffusion & domaine ⏱ continu

**But :** finition et mise en visibilité.

- [ ] Micro-animations (View Transitions entre pages, apparition des cartes)
- [ ] Page **Now** et/ou **Uses** (optionnel)
- [ ] Achat + branchement du **nom de domaine** personnalisé
- [ ] Mettre `site:` à jour dans `astro.config.mjs`
- [ ] Cloudflare Web Analytics
- [ ] Vérif OG (aperçus LinkedIn/Twitter), JSON-LD `Person`
- [ ] Relecture EN (ton, cohérence)
- [ ] Diffusion : lien LinkedIn, signature mail, CV

**Definition of done :** domaine actif, analytics en place, aperçus sociaux corrects, site diffusé.

---

## Phase 6 — Backlog / nice-to-have

- [ ] Version française (`/fr/`, i18n Astro)
- [ ] Recherche interne (Pagefind) pour le blog
- [ ] Génération automatique du CV PDF depuis les données du site
- [ ] Page « timeline » interactive du parcours
- [ ] Mode « print » propre pour le CV
- [ ] Tests end-to-end (Playwright) sur les parcours clés
- [ ] Commentaires blog (giscus) si souhaité

---

## Suggestion d'ordre de priorité

1. **Mettre en ligne le MVP (Phase 1)** — le plus vite possible, même minimal : un site en ligne vaut mieux qu'un site parfait local.
2. **Projets (Phase 2)** — c'est ton principal argument différenciant.
3. **1–2 visualisations (Phase 3)** — l'effet « waouh » sur les projets clés.
4. Blog et polish ensuite, au fil de l'eau.

---

## Dépendances entre phases

```
Phase 0 (✅) ─► Phase 1 ─► Phase 2 ─► Phase 3
                   │           └─► Phase 4 (blog, indépendant de la 3)
                   └─────────────────► Phase 5 (domaine dès que présentable)
```

Phase 4 (blog) ne dépend pas de la Phase 3 : les deux peuvent être menées dans l'ordre qui t'arrange après la Phase 2.
