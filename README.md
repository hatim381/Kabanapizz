# 🔥 Kabana Pizz — site web

Refonte moderne du site de **Kabana Pizz**, kiosque à pizza à Brie-Comte-Robert (77).
Single-page React (Vite) — rapide, responsive, accessible et optimisée pour le SEO local.

> Concept visuel : *la cabane à pizza au feu de bois, la nuit.*
> Bois carbonisé + braise incandescente (Fraunces × Outfit).

---

## ✨ Ce qui a été amélioré

Cette refonte corrige les principaux défauts de la version WordPress d'origine.

### Expérience client

- **Prix affichés** sur chaque pizza et boisson (défaut n°1 corrigé).
- **Horaires complets** avec un badge **« Ouvert / Ferme bientôt / Fermé »** calculé en direct selon l'heure du visiteur.
- **3 modes de commande** clairs : sur place, à emporter (tél.), en livraison (Uber Eats).
- **Numéro de secours** mis en avant si la ligne principale est occupée.
- Menu **filtrable** (viande / végé / base tomate / base crème).

### UI / UX

- Identité visuelle cohérente et mémorable (palette braise, typographie Fraunces/Outfit).
- Hiérarchie claire : nom de pizza › base › ingrédients › tags (l'inverse de l'ancien « 01/02 » illisible).
- **Carrousel d'avis fonctionnel** (flèches + points), à la place de la liste cassée d'origine.
- Animations discrètes au scroll, **respectant `prefers-reduced-motion`**.
- Carte Google Maps intégrée en `loading="lazy"`.

### Technique / SEO / Accessibilité

- **Données structurées Schema.org** (`Restaurant` + `Menu` + `AggregateRating`) injectées au runtime → horaires, note et prix éligibles aux résultats enrichis Google.
- Balises **Open Graph / Twitter**, `title` et `meta description` optimisées, `lang="fr"`.
- **Bandeau cookies corrigé** (un seul, mémorisé via `localStorage`, vrais boutons accepter / refuser).
- Contrastes, focus clavier visibles, `aria-*`, structure sémantique (`header`, `main`, `section`, `address`, `blockquote`).
- En-têtes de sécurité HTTP (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`…) via `vercel.json`.
- Build léger (~66 kB JS gzip) sans dépendance superflue.

---

## 🚀 Démarrage rapide

Prérequis : **Node.js 20+**.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de dev (http://localhost:5173)
npm run build      # build de production dans dist/
npm run preview    # prévisualise le build
```

---

## 🗂️ Structure du projet

```
kabana-pizz/
├── public/
│   └── favicon.svg            # logo flamme
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # nav + statut ouvert/fermé en direct
│   │   ├── Hero.jsx           # accroche + prix d'appel
│   │   ├── Menu.jsx           # carte filtrable avec prix
│   │   ├── Order.jsx          # 3 modes de commande
│   │   ├── Reviews.jsx        # carrousel d'avis
│   │   ├── Info.jsx           # horaires + adresse + carte
│   │   └── Footer.jsx         # footer + bandeau cookies
│   ├── data/
│   │   └── menu.js            # ⭐ source de vérité : carte, prix, horaires, avis
│   ├── utils/
│   │   ├── hours.js           # logique ouvert/fermé
│   │   └── useReveal.js       # hook d'animation au scroll
│   ├── App.jsx               # assemblage + JSON-LD SEO
│   ├── App.css               # styles des composants
│   ├── index.css             # design tokens + base
│   └── main.jsx
├── settings.yml              # config lisible (horaires, carte, thème, SEO)
├── vercel.json               # déploiement + cache + en-têtes sécurité
├── .nvmrc                    # version Node
└── README.md
```

---

## ✏️ Modifier le contenu

Tout le contenu éditable se trouve dans **`src/data/menu.js`** :

- **Prix / pizzas** → tableau `pizzas`
- **Photos des pizzas** → déposez simplement l'image dans `public/pizzas/`
  en la nommant d'après l'`id` de la pizza (`cannibale.jpg`, `kabana.jpg`…).
  Elle s'affiche automatiquement ; si le fichier manque, un visuel de
  remplacement prend le relais. Détails dans `public/pizzas/LISEZ-MOI.txt`.
- **Boissons** → tableau `drinks`
- **Horaires** → tableau `hours` (le statut ouvert/fermé se met à jour automatiquement)
- **Avis** → tableau `reviews`
- **Coordonnées** → objet `restaurant`

Le fichier `settings.yml` reprend ces mêmes informations dans un format lisible,
pratique pour une relecture ou une future synchronisation avec un CMS.

---

## ☁️ Déploiement sur Vercel

Le projet est prêt pour Vercel (configuration dans `vercel.json`).

**Option A — via le dashboard**
1. Pousser le code sur GitHub/GitLab.
2. Sur [vercel.com](https://vercel.com) → *New Project* → importer le dépôt.
3. Framework détecté automatiquement : **Vite**. Laisser les réglages par défaut.
4. *Deploy*.

**Option B — via la CLI**

```bash
npm i -g vercel
vercel          # déploiement de prévisualisation
vercel --prod   # déploiement en production
```

Réglages (déjà dans `vercel.json`) :

| Paramètre        | Valeur          |
| ---------------- | --------------- |
| Framework        | Vite            |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node             | 20.x            |

Pour brancher le domaine `kabanapizz.fr` : *Project → Settings → Domains*.

---

## 🧱 Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS natif (variables, grid, clamp) — aucun framework UI
- Polices : [Fraunces](https://fonts.google.com/specimen/Fraunces) & [Outfit](https://fonts.google.com/specimen/Outfit)

## 📄 Licence & crédits

Contenu, marque et avis : © Kabana Pizz. Code de la refonte librement réutilisable
par l'établissement.
