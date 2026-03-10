# PERFORMANCE-OPTIMISATION.md

# Plan d'optimisation PageSpeed — oakflowai.com

# Score actuel : 46/100 → Cible : ~90/100

# Généré le : 10/03/2026

---

## CONTEXTE

Site : <https://www.oakflowai.com>  
Stack : HTML statique + CSS vanilla + JS vanilla, hébergé sur Vercel  
Fichiers principaux : `index.html`, `style.css`, `main.js`  
Problèmes détectés via PageSpeed Insights (Lighthouse 13.0.1)
Métriques actuelles (mobile) :

- FCP : 0,7s ✅
- LCP : 9,5s 🔴 (cible < 2,5s)
- TBT : 26 680ms 🔴 (cible < 200ms)
- CLS : 0 ✅
- Speed Index : 2,7s 🟡

---

## TÂCHE 1 — Lazy load Spline 3D [PRIORITÉ CRITIQUE]

**Fichier :** `index.html`  
**Impact :** TBT -26 000ms, +25 pts de score  
**Problème :** Le runtime Spline (`esm.sh/@splinetool/runtime@1.9.48`, 690 KiB) et la scène (`prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`, 1 212 KiB) sont chargés immédiatement au démarrage sans aucun différé, monopolisant le thread principal pendant ~33 secondes.

### 1a. Supprimer les preconnect Spline du `<head>`

Localiser et SUPPRIMER ces deux lignes dans `<head>` :

```html
<link rel="preconnect" href="https://esm.sh" crossorigin />
<link rel="preconnect" href="https://prod.spline.design" crossorigin />
```

### 1b. Remplacer le script module Spline

Localiser le `<script type="module">` qui contient `Application` et `splinecode` (environ 1089 caractères, 27 lignes).
Le script contient ces deux URLs :

- `https://esm.sh/@splinetool/runtime@1.9.48`
- `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
**REMPLACER l'intégralité de ce bloc** par :

```html
<script type="module">
  // Spline lazy load — ne charge que sur desktop et quand le hero est visible
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    // Mobile : masquer le loader, la section est déjà cachée via CSS
    const loader = document.getElementById('splineLoader');
    if (loader) loader.style.display = 'none';
  } else {
    let splineLoaded = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && !splineLoaded) {
          splineLoaded = true;
          observer.disconnect();
          const { Application } = await import('https://esm.sh/@splinetool/runtime@1.9.48');
          const canvas = document.getElementById('spline-canvas');
          const loader = document.getElementById('splineLoader');
          try {
            const app = new Application(canvas);
            await app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
            if (loader) loader.style.display = 'none';
          } catch (err) {
            if (loader) loader.style.display = 'none';
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '200px' });
    const heroSection = document.getElementById('hero');
    if (heroSection) observer.observe(heroSection);
  }
</script>
```

---

## TÂCHE 2 — Optimisation des images [PRIORITÉ HAUTE]

**Fichiers :** `index.html` + fichiers images dans la racine du projet  
**Impact :** LCP -6s, +12 pts de score  
**Économies estimées :** 1 332 KiB

### 2a. Convertir et redimensionner les images

Utiliser [Squoosh.app](https://squoosh.app) ou sharp/imagemin en CI pour convertir :

| Fichier source | Taille actuelle | Dimensions actuelles | Dimensions cibles | Format cible | Qualité | Taille estimée |
|---|---|---|---|---|---|---|
| `avatar-1.png` | 516 KiB | 640×640px | 36×36px | WebP | 85 | ~3 KiB |
| `avatar-2.png` | 562 KiB | 640×640px | 36×36px | WebP | 85 | ~3 KiB |
| `oakflow_logo_cube.jpg` | 254 KiB | 1024×1024px | 96×96px | WebP | 85 | ~8 KiB |
| `cyril-de-la-rue.jpg` | 74 KiB | 1024×961px | 640×640px | WebP | 82 | ~20 KiB |
Nommer les fichiers exportés :

- `avatar-1.webp`
- `avatar-2.webp`
- `oakflow_logo_cube.webp`
- `cyril-de-la-rue.webp`
Placer ces fichiers à la racine du projet (même niveau que les `.jpg`/`.png` actuels).

### 2b. Mettre à jour le `<link rel="preload">` du logo dans `<head>`

**REMPLACER :**

```html
<link rel="preload" as="image" href="oakflow_logo_cube.jpg" fetchpriority="high" />
```

**PAR :**

```html
<link rel="preload" as="image" href="oakflow_logo_cube.webp" fetchpriority="high" />
```

### 2c. Mettre à jour les balises `<img>` du logo (2 occurrences dans le nav)

**RECHERCHER** (dans les 2 `<nav>` ou sections de navigation) :

```html
<img src="oakflow_logo_cube.jpg" alt="Oakflow AI" class="logo-img" style="height: 48px; width: auto; border-radius: 8px;">
```

**REMPLACER PAR :**

```html
<img src="oakflow_logo_cube.webp" alt="Oakflow AI" class="logo-img" width="48" height="48" fetchpriority="high">
```

> Note : Supprimer l'attribut `style=""` inline, les dimensions sont gérées dans `style.css` (voir Tâche 4a).
>
### 2d. Mettre à jour les avatars (3 occurrences dans `.proof-avatars`)

**REMPLACER :**

```html
<img class="av" src="avatar-1.png" alt="Cliente satisfaite" width="36" height="36">
<img class="av" src="avatar-2.png" alt="Client satisfait" width="36" height="36">
<img class="av" src="avatar-2.png" alt="Client satisfait" width="36" height="36">
```

**PAR :**

```html
<img class="av" src="avatar-1.webp" alt="Cliente satisfaite" width="36" height="36" loading="lazy">
<img class="av" src="avatar-2.webp" alt="Client satisfait" width="36" height="36" loading="lazy">
<img class="av" src="avatar-2.webp" alt="Client satisfait" width="36" height="36" loading="lazy">
```

### 2e. Mettre à jour la photo expert

**REMPLACER :**

```html
<img src="cyril-de-la-rue.jpg" alt="Cyril DE LA RUE - Expert IA Oakflow" class="expert-img" />
```

**PAR :**

```html
<img src="cyril-de-la-rue.webp" alt="Cyril DE LA RUE - Expert IA Oakflow" class="expert-img" width="320" height="320" loading="lazy" />
```

---

## TÂCHE 3 — CSS non-bloquant [PRIORITÉ HAUTE]

**Fichier :** `index.html`  
**Impact :** FCP -60ms, +4 pts de score  
**Problème :** `style.css` (10,9 KiB) est chargé de manière bloquante, retardant le premier rendu.
Dans `<head>`, **REMPLACER :**

```html
<link rel="stylesheet" href="style.css">
```

**PAR :**

```html
<link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="style.css"></noscript>
```

---

## TÂCHE 4 — Corrections CSS [PRIORITÉ MOYENNE]

**Fichier :** `style.css`  
**Impact :** CLS, +2 pts de score

### 4a. Ajouter les dimensions du logo dans le CSS

Après le bloc `.logo-text em { ... }` (autour de la ligne correspondant au sélecteur `.logo-img` s'il existe, sinon ajouter après `.logo-svg`), **AJOUTER :**

```css
.logo-img {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: contain;
}
```

### 4b. Corriger l'animation `pulse-dot` (propriété non composée)

**Problème :** `box-shadow` dans `@keyframes` force un repaint complet à chaque frame.
**LOCALISER** ce bloc dans `style.css` (autour du sélecteur `.hero-badge .dot`) :

```css
.hero-badge .dot {
    width: 6px;
    height: 6px;
    background: #7c3aff;
    border-radius: 50%;
    animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(124, 58, 255, 0.4);
    }
    50% {
        box-shadow: 0 0 0 6px rgba(124, 58, 255, 0);
    }
}
```

**REMPLACER PAR :**

```css
.hero-badge .dot {
    width: 6px;
    height: 6px;
    background: #7c3aff;
    border-radius: 50%;
    position: relative;
}
.hero-badge .dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(124, 58, 255, 0.4);
    animation: pulse-dot 2s infinite;
    will-change: transform, opacity;
}
@keyframes pulse-dot {
    0%   { transform: scale(1);   opacity: 0.6; }
    50%  { transform: scale(2.5); opacity: 0; }
    100% { transform: scale(1);   opacity: 0.6; }
}
```

### 4c. Ajouter `will-change` sur le loader ring (optimisation)

**LOCALISER** `.loader-ring` dans `style.css` et **AJOUTER** la propriété :

```css
.loader-ring {
    /* ... propriétés existantes ... */
    will-change: transform; /* AJOUTER cette ligne */
}
```

---

## TÂCHE 5 — Attributs `width`/`height` manquants sur les social icons [PRIORITÉ BASSE]

**Fichier :** `index.html`  
**Impact :** CLS mineur
**LOCALISER** les balises social-svg sans dimensions :

```html
<img src="https://api.iconify.design/simple-icons:linkedin.svg?color=white" class="social-svg" alt="LinkedIn">
<img src="https://api.iconify.design/simple-icons:tiktok.svg?color=white" class="social-svg" alt="TikTok">
<img src="https://api.iconify.design/simple-icons:youtube.svg?color=white" class="social-svg" alt="YouTube">
```

**REMPLACER PAR :**

```html
<img src="https://api.iconify.design/simple-icons:linkedin.svg?color=white" class="social-svg" alt="LinkedIn" width="32" height="32">
<img src="https://api.iconify.design/simple-icons:tiktok.svg?color=white" class="social-svg" alt="TikTok" width="32" height="32">
<img src="https://api.iconify.design/simple-icons:youtube.svg?color=white" class="social-svg" alt="YouTube" width="32" height="32">
```

---

## TÂCHE 6 — Google Fonts : vérifier `display=swap` [PRIORITÉ BASSE]

**Fichier :** `index.html`  
**Impact :** FCP, évite le FOIT (Flash of Invisible Text)
**VÉRIFIER** que le lien Google Fonts dans `<head>` contient bien `&display=swap` :

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Si `display=swap` est absent, **AJOUTER** `&display=swap` à la fin de l'URL
---

## RÉCAPITULATIF DES FICHIERS À MODIFIER

### `index.html`

- [ ] TÂCHE 1a : Supprimer `<link rel="preconnect" href="https://esm.sh">` et `prod.spline.design`
- [ ] TÂCHE 1b : Remplacer le `<script type="module">` Spline par la version lazy
- [ ] TÂCHE 2b : Mettre à jour `<link rel="preload">` logo `.jpg` → `.webp`
- [ ] TÂCHE 2c : Remplacer les 2 balises `<img class="logo-img">` (`.jpg` → `.webp`, + `width`/`height`, supprimer `style=""`)
- [ ] TÂCHE 2d : Remplacer les 3 balises `<img class="av">` (`.png` → `.webp`, + `loading="lazy"`)
- [ ] TÂCHE 2e : Remplacer `<img class="expert-img">` (`.jpg` → `.webp`, + `width`/`height`, + `loading="lazy"`)
- [ ] TÂCHE 3  : Passer `<link rel="stylesheet" href="style.css">` en chargement non-bloquant
- [ ] TÂCHE 5  : Ajouter `width="32" height="32"` sur les 3 social-svg
- [ ] TÂCHE 6  : Vérifier `&display=swap` sur Google Fonts

### `style.css`

- [ ] TÂCHE 4a : Ajouter bloc `.logo-img { width: 48px; height: 48px; ... }`
- [ ] TÂCHE 4b : Remplacer `@keyframes pulse-dot` (box-shadow → transform/opacity)
- [ ] TÂCHE 4c : Ajouter `will-change: transform` sur `.loader-ring`

### Fichiers images (créer et uploader à la racine du projet)

- [ ] Créer `avatar-1.webp` (36×36px, depuis `avatar-1.png` 640×640px)
- [ ] Créer `avatar-2.webp` (36×36px, depuis `avatar-2.png` 640×640px)
- [ ] Créer `oakflow_logo_cube.webp` (96×96px, depuis `oakflow_logo_cube.jpg` 1024×1024px)
- [ ] Créer `cyril-de-la-rue.webp` (640×640px, depuis `cyril-de-la-rue.jpg` 1024×961px)

---

## GAIN ESTIMÉ PAR TÂCHE

| Tâche | Métrique impactée | Gain estimé |
|---|---|---|
| 1 — Spline lazy load | TBT : 26 680ms → <500ms | +25 pts |
| 2 — Images WebP + resize | LCP : 9,5s → ~2,5s | +12 pts |
| 3 — CSS non-bloquant | FCP amélioré | +4 pts |
| 4 — Animations composées | CLS, fluidité | +2 pts |
| 5+6 — Fixes mineurs | CLS, FID | +1 pt |
| **TOTAL** | **46 → ~90/100** | **+44 pts** |

---

## NOTES IMPORTANTES POUR L'AGENT

1. **Ne pas toucher** aux fichiers du blog (`/blog/`) — hors scope de cette optimisation.
2. **Ne pas toucher** à `main.js` — le fichier gère le spotlight, le scroll nav et le menu mobile, il n'est pas en cause.
3. **La scène Spline doit rester fonctionnelle** sur desktop — le lazy load via IntersectionObserver la charge toujours, simplement après que le hero est visible.
4. **Conserver les fichiers `.jpg`/`.png` originaux** en backup au cas où — ne pas les supprimer.
5. **L'ordre d'exécution recommandé** : Tâche 1 → Tâche 2 (images d'abord créées manuellement) → Tâche 3 → Tâche 4 → Tâches 5+6.
6. Après chaque tâche majeure (1 et 2), relancer PageSpeed Insights pour valider le gain.
