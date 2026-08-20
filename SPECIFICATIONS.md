# Spécifications — Site personnel de Jonas Balandraux

_Version 1.0 — 20 août 2026_
_Document technique de référence pour le développement._

---

## 1. Contexte & objectifs

Site personnel de Jonas Balandraux (ML Engineer / Data Scientist) servant de **CV élargi et de hub professionnel unique**. Il doit adresser quatre usages simultanés :

| Usage                        | Ce que le visiteur doit pouvoir faire                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| Recherche d'emploi           | Comprendre le parcours, les compétences, télécharger le CV PDF              |
| Missions freelance / clients | Voir des réalisations concrètes, évaluer l'expertise, prendre contact       |
| Vitrine de projets           | Explorer les projets en détail, avec visuels et démos interactives          |
| Présence & réseau perso      | Lire des articles (blog), retrouver les liens sociaux, une identité durable |

**Décisions déjà validées :**

- **Langue :** anglais uniquement (v1). Architecture prête pour un ajout du français plus tard (i18n).
- **Framework :** Astro 7 (statique).
- **Style :** Tailwind CSS v4.
- **Hébergement :** Cloudflare Pages (gratuit, toujours en ligne, redéploiement à chaque `git push`).
- **Design :** sombre, moderne, épuré, typographie soignée, animations subtiles.

---

## 2. Principes directeurs

1. **100 % statique.** Aucun back-end permanent. Tout ce qui est « dynamique » (formulaire de contact, analytics) passe par des services externes gratuits. C'est ce qui garantit un hébergement gratuit et toujours en ligne.
2. **Contenu séparé du code.** Expériences, projets et articles vivent dans des fichiers Markdown/MDX versionnés (Astro Content Collections), pas dans le code des pages. Ajouter du contenu = ajouter un fichier, sans toucher aux composants.
3. **Performance et accessibilité par défaut.** Cible Lighthouse ≥ 95 sur les 4 axes. HTML sémantique, navigation clavier, contrastes AA.
4. **Progressive enhancement.** Le site est lisible sans JavaScript ; l'interactivité (visualisations, démos) est ajoutée via des _islands_ Astro uniquement là où elle apporte de la valeur.
5. **Mobile-first et responsive.** Testé mobile / tablette / desktop.

---

## 3. Stack technique

| Domaine            | Choix                                                                                    | Notes                                                |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Framework          | **Astro 7**                                                                              | `output: 'static'`                                   |
| Style              | **Tailwind CSS v4**                                                                      | Via `@tailwindcss/vite` ; tokens dans `@theme` (CSS) |
| Langage            | **TypeScript** (strict)                                                                  | `astro/tsconfigs/strict`                             |
| Contenu            | **Markdown / MDX**                                                                       | Content Collections typées (Zod)                     |
| Îlots interactifs  | **React** (`@astrojs/react`)                                                             | Ajouté quand le premier composant interactif arrive  |
| Visualisations     | **Recharts** ou **D3** / **visx**                                                        | Recharts pour le rapide, D3/visx pour le sur-mesure  |
| Polices            | **@fontsource-variable/inter** + **jetbrains-mono**                                      | Auto-hébergées (perf, RGPD)                          |
| Icônes             | **astro-icon** ou **lucide**                                                             | SVG inline                                           |
| Animations         | **View Transitions** Astro + transitions CSS ; **Framer Motion** si besoin (îlots React) | Sobriété, respect de `prefers-reduced-motion`        |
| Formulaire contact | **Cloudflare Pages Forms** ou **Formspree** (tier gratuit)                               | Pas de back-end à héberger                           |
| Analytics          | **Cloudflare Web Analytics** (gratuit, sans cookies)                                     | Alternative : Plausible                              |
| SEO                | `@astrojs/sitemap`, balises OG, JSON-LD `Person`                                         |                                                      |
| Qualité            | **ESLint**, **Prettier** (`prettier-plugin-astro`)                                       | + `astro check` en CI                                |
| CI/CD              | **GitHub** → **Cloudflare Pages**                                                        | Build auto sur push                                  |

**Versions Node :** 22 LTS (fichier `.nvmrc`).

---

## 4. Architecture de l'information

### 4.1 Pages

| Route                        | Page                       | Contenu                                                                 |
| ---------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `/`                          | **Home**                   | Hero (accroche + CTA), aperçu expériences, projets phares, liens        |
| `/#experience` (ou `/about`) | **Experience / CV élargi** | Timeline des postes, compétences, formation, certifications, CV PDF     |
| `/projects`                  | **Projects (index)**       | Grille filtrable des projets (par domaine / techno)                     |
| `/projects/[slug]`           | **Project detail**         | Page détaillée : contexte, rôle, stack, visuels, démo, résultats, liens |
| `/blog`                      | **Blog (index)**           | Liste des articles, tags                                                |
| `/blog/[slug]`               | **Article**                | Contenu Markdown/MDX, date, tags, temps de lecture                      |
| `/contact` (ou section)      | **Contact**                | Formulaire + liens sociaux + disponibilités                             |
| `/404`                       | **Not found**              | Page 404 soignée                                                        |
| `/rss.xml`                   | Flux RSS                   | Généré depuis la collection `blog`                                      |
| `/cv.pdf`                    | CV                         | Fichier statique dans `public/`                                         |

> **Note d'organisation v1 :** Home + Experience + Contact peuvent cohabiter en sections d'une même page (`/`) au départ, puis être éclatées en routes dédiées quand le volume le justifie. Les projets et le blog sont mieux en routes séparées dès le début (pages générées dynamiquement par slug).

### 4.2 Navigation

- **Header** collant : `Experience · Projects · Blog · Contact` + toggle thème (clair/sombre).
- **Footer** : liens sociaux (GitHub, LinkedIn, email), mention copyright, « Built with Astro ».

---

## 5. Modèle de contenu (Content Collections)

Trois collections typées via Zod dans `src/content.config.ts`.

### 5.1 `experiences` — _(déjà implémenté)_

```ts
{
  company: string;
  role: string;
  location: string;
  dateLabel: string;   // "Feb 2025 – Aug 2025"
  startDate: string;   // "2025-02" (tri)
  duration?: string;   // "7 months"
  summary?: string;
  tech: string[];
  highlights: string[];
  url?: string;        // site de l'entreprise
  current: boolean;
}
```

### 5.2 `projects` — _(à créer)_

```ts
{
  title: string;
  slug: string;             // dérivable du nom de fichier
  tagline: string;          // une phrase d'accroche
  role?: string;            // "Solo project" / "Team lead (5)"
  date: string;             // "2024-05" pour tri
  domains: string[];        // ["Computer Vision", "Healthcare"]
  tech: string[];
  featured: boolean;        // remonté sur la Home
  cover?: string;           // image de couverture (public/ ou import)
  repo?: string;            // lien GitHub
  demo?: string;            // lien démo en ligne (ex. Streamlit)
  highlights: string[];     // résultats clés
  interactive?: boolean;    // page avec composant interactif
}
```

Le **corps Markdown/MDX** contient la description détaillée : problème, approche, architecture (schémas/diagrammes), résultats, et éventuellement des composants interactifs (`<Chart />`, démo embarquée).

**Projets à intégrer (source : bilan de compétences) :**

1. Real-Time Image Recognition Game — FastAPI + React (team lead, 5 pers.)
2. Pokémon Captioning — Transformers encoder-decoder + Streamlit (démo HF)
3. Graph Neural Networks — solubilité moléculaire (GCN, ESOL, clustering)
4. DCGAN MNIST — C++ / libtorch
5. Electricity Price Forecasting — Challenge Elmy
6. Alzheimer Dashboard — Streamlit (démo en ligne)

### 5.3 `blog` — _(phase blog)_

```ts
{
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  draft: boolean;           // exclu du build si true
  cover?: string;
}
```

---

## 6. Composants UI

| Composant              | Rôle                                       | État                    |
| ---------------------- | ------------------------------------------ | ----------------------- |
| `BaseLayout.astro`     | `<head>`, meta, OG, fond, slot             | Fait                    |
| `Header.astro`         | Navigation + toggle thème                  | Fait (toggle à ajouter) |
| `Footer.astro`         | Liens + copyright                          | À extraire              |
| `ExperienceCard.astro` | Carte d'expérience                         | Fait                    |
| `ProjectCard.astro`    | Vignette projet (grille)                   | À créer                 |
| `ProjectLayout.astro`  | Gabarit page projet détaillée              | À créer                 |
| `SkillGroup.astro`     | Groupe de compétences (catégorie + niveau) | À créer                 |
| `Timeline.astro`       | Frise formation/expérience                 | Optionnel               |
| `TagList.astro`        | Liste de tags/techno réutilisable          | À extraire              |
| `ThemeToggle` (île)    | Bascule clair/sombre + persistance         | À créer                 |
| `Chart` (île React)    | Visualisations projets                     | Phase projets           |
| `Prose.astro`          | Styles typographiques pour Markdown rendu  | À créer                 |

---

## 7. Design system

### 7.1 Tokens (déjà posés dans `global.css`)

```
Surfaces : --color-bg #0a0a0c · --color-surface #121216 · --color-surface-2 #1a1a20 · --color-border #26262e
Texte    : --color-ink #ededf2 · --color-muted #a1a1ad · --color-faint #6b6b78
Accent   : --color-accent #818cf8 · --color-accent-strong #6366f1 · --color-accent-soft rgba(129,140,248,.12)
Polices  : Inter Variable (sans) · JetBrains Mono Variable (mono)
```

### 7.2 Mode clair / sombre

- Sombre par défaut. Ajouter une variante claire via `data-theme="light"` sur `<html>` et des tokens dédiés.
- Toggle persistant : stocker le choix (attention : **pas de `localStorage` dans un artifact Claude**, mais ici c'est ton propre site en prod → `localStorage` est parfait). Respecter `prefers-color-scheme` au premier chargement, avec script inline anti-FOUC dans le `<head>`.

### 7.3 Règles

- **Largeur de contenu :** `max-w-3xl` (texte/CV), `max-w-5xl` pour la grille de projets.
- **Rythme vertical :** sections séparées par `border-t` + `py-16`.
- **Rayons :** `rounded-2xl` cartes, `rounded-lg` boutons, `rounded-md` tags.
- **Typo :** titres Inter semibold/bold, méta et tags en JetBrains Mono.
- **Accessibilité :** contraste AA minimum, focus visible, `aria-label` sur la nav, `alt` sur toutes les images, `scroll-mt` sur les ancres.
- **Motion :** transitions ≤ 200 ms, désactivées sous `prefers-reduced-motion`.

---

## 8. Exigences non-fonctionnelles

| Axe            | Cible / règle                                                             |
| -------------- | ------------------------------------------------------------------------- |
| Performance    | Lighthouse ≥ 95 ; images optimisées (`astro:assets`) ; JS minimal         |
| SEO            | Meta + OG par page, sitemap, `robots.txt`, JSON-LD `Person`, URLs propres |
| Accessibilité  | WCAG 2.1 AA ; navigation clavier ; sémantique ; contrastes                |
| Responsive     | Mobile-first ; breakpoints Tailwind `sm/md/lg`                            |
| i18n-ready     | Structure permettant d'ajouter `/fr/` sans refonte                        |
| Privacy        | Analytics sans cookies ; polices auto-hébergées (pas d'appel Google)      |
| Maintenabilité | TS strict ; contenu en Markdown ; composants réutilisables ; lint/format  |
| Compatibilité  | Navigateurs evergreen (2 dernières versions)                              |

---

## 9. Intégrations externes

- **Formulaire de contact :** endpoint Formspree (gratuit, ~50 envois/mois) ou Cloudflare Pages Forms. Validation côté client + honeypot anti-spam. Aucun secret exposé (l'endpoint Formspree est public par design).
- **Analytics :** Cloudflare Web Analytics (snippet unique, sans cookie, gratuit).
- **CV PDF :** fichier statique servi depuis `public/cv.pdf` (mis à jour manuellement, ou généré à part).
- **Démos projets :** liens sortants vers Hugging Face Spaces / Streamlit Cloud (déjà en ligne).

---

## 10. Déploiement & domaine

1. Repo GitHub → Cloudflare Pages (**Connect to Git**).
2. Build : preset **Astro**, commande `npm run build`, sortie `dist`.
3. URL gratuite `*.pages.dev`, toujours en ligne, redéploiement auto sur push.
4. Domaine personnalisé (recommandé avant diffusion) : `prenom-nom.com/.dev` (~8–15 €/an), branché gratuitement dans l'onglet **Custom domains**.
5. Mettre à jour `site:` dans `astro.config.mjs` avec l'URL finale (canonical/OG/sitemap corrects).

---

## 11. Arborescence cible

```
site/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .nvmrc
├── public/
│   ├── favicon.svg
│   ├── cv.pdf
│   └── og/                    # images Open Graph
├── src/
│   ├── content.config.ts      # schémas des collections
│   ├── content/
│   │   ├── experiences/*.md    # ✅ fait
│   │   ├── projects/*.md       # à venir
│   │   └── blog/*.md           # à venir
│   ├── components/
│   │   ├── Header.astro         # ✅
│   │   ├── Footer.astro
│   │   ├── ExperienceCard.astro # ✅
│   │   ├── ProjectCard.astro
│   │   ├── SkillGroup.astro
│   │   ├── TagList.astro
│   │   ├── ThemeToggle.tsx      # île React
│   │   └── Prose.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro     # ✅
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro          # ✅
│   │   ├── projects/index.astro
│   │   ├── projects/[...slug].astro
│   │   ├── blog/index.astro
│   │   ├── blog/[...slug].astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts
│   └── styles/
│       └── global.css           # ✅ tokens
└── README.md
```

---

## 12. Critères d'acceptation (par section)

- **Home** : hero visible < 1 s ; CTA fonctionnels ; aperçu projets phares ; responsive OK.
- **Experience** : 3 postes triés récent → ancien ; compétences groupées ; CV PDF téléchargeable ; formation + certifications listées.
- **Projects** : grille filtrable ; chaque projet a une page détail avec au moins 1 visuel et les liens repo/démo ; les projets `interactive` embarquent un composant fonctionnel.
- **Blog** : liste triée par date ; page article lisible (typo `Prose`) ; RSS valide ; brouillons exclus du build.
- **Contact** : formulaire envoie réellement un message ; liens sociaux corrects ; anti-spam en place.
- **Global** : Lighthouse ≥ 95 (perf/a11y/best-practices/SEO) ; build sans erreur `astro check` ; déploiement Cloudflare vert.

---

_Voir `ROADMAP.md` pour l'ordre d'implémentation et `README.md` pour la mise en route._
