# PRD — Oakflow AI V2 : Interactive Portfolio & Lead Gen

---

## 1. Vue d'Ensemble

| Champ | Détail |
|---|---|
| **Propriétaire** | Cyril DE LA RUE (Fondateur) |
| **Site** | [oakflowai.com](https://www.oakflowai.com) |
| **Objectif Principal** | Transformer le site vitrine en plateforme immersive & conversion-centric |
| **Objectif Secondaire** | Moderniser l'identité visuelle (nouveau logo) |

> **Ambition :** Mettre en valeur 8 mois de workflows n8n via un portfolio interactif avec éléments 3D pour asseoir un positionnement premium.

---

## 2. Cibles & Problématique

### Cible Principale

- Dirigeants de PME
- Directeurs financiers
- Managers (tourisme, services clients, RH, marketing, comptabilité)

### Problème Utilisateur

Perte de temps sur des tâches répétitives + manque de compréhension concrète du ROI de l'IA.

### Solution Oakflow AI

Portfolio visuel démontrant le ROI immédiat (temps gagné, erreurs réduites) via des cas d'usage n8n réels, packagés comme des **"solutions produits"**.

---

## 3. Stack Technique

| Couche | Outil |
|---|---|
| **Frontend / UI** | Framer (animations fluides, responsive, intégration 3D) |
| **3D** | Spline (intégration native Framer) |
| **Backend / Automatisation** | n8n (capture leads, qualification IA, mails automatisés) |
| **Dev Environment** | Antigravity + Claude Code Pro (MCP actifs) |

> Le site OakflowAI doit être **le premier cas d'usage opérationnel** de l'agence.

---

## 4. Fonctionnalités Clés

### 4.1 Identité Visuelle & Logo

- **Concept :** Robustesse/croissance (Oak) + fluidité/tech (Flow)
- **Livrables :**
  - Logo vectoriel (SVG)
  - Palette dark mode avec accents néon/organiques
  - Typographie : Inter ou Geist

---

### 4.2 Hero Section Immersive

- **Élément 3D interactif :** Nœuds de données qui se connectent (scroll / mouse tracking)
- **Proposition de valeur :** *"Transformez vos processus répétitifs en croissance grâce à l'IA et l'automatisation"*
- **CTA Primaire :**
  - `Voir les cas d'usage`
  - `Évaluer mon potentiel d'automatisation`

---

### 4.3 Portfolio des Workflows (Cœur du site)

**Affichage :** Grille Bento Box

**Structure d'une page Use Case :**

1. **Problématique** — Contexte client initial *(ex: tri de 500 factures/mois)*
2. **Solution Technique** — Architecture n8n + LLM utilisé
3. **Résultats / ROI** — Métriques concrètes *(ex: 30h gagnées/mois, 0 erreur de saisie)*
4. **Visuel** — Capture stylisée ou animation du workflow n8n

---

### 4.4 Tunnel de Capture de Leads

- **Formulaire Typeform-like** — Qualification prospect :
  - Secteur d'activité ?
  - Outils actuels ?
  - Volume de tâches manuelles ?
- **Lead Magnet :** Audit gratuit OU template n8n en échange de l'email
- **Intégration Backend :**

  ```
  Formulaire → Webhook n8n → Qualification LLM → Calendly (prise de RDV)
  ```

---

## 5. Exigences Non-Fonctionnelles

| Critère | Cible |
|---|---|
| **Performance** | Chargement < 2s (optimisation assets 3D Framer) |
| **SEO / GEO** | Balises meta : "Consultant IA", "Automatisation n8n", "Agence automatisation France/Paris" |
| **Responsive** | Dégradation gracieuse de l'expérience 3D sur mobile et tablette |

---

## 6. Roadmap

### Semaine 1 — Conception & Identité

- [ ] Brainstorming + création du nouveau logo
- [ ] Sélection des 3-4 workflows n8n à mettre en avant
- [ ] Rédaction du copywriting (pages + cas d'usage)

### Semaine 2 — Prototypage Framer & 3D

- [ ] Création / achat d'un asset 3D via Spline
- [ ] Setup projet Framer (Navbar, Hero, Footer)

### Semaine 3 — Portfolio & Lead Gen

- [ ] CMS Framer pour gestion des cas d'usage n8n
- [ ] Création du webhook n8n (réception leads)

### Semaine 4 — QA, Finitions & Lancement

- [ ] Tests mobile + desktop
- [ ] Optimisation SEO & GEO
- [ ] Connexion domaine `oakflowai.com`
- [ ] Lancement + annonce LinkedIn

---

## 7. Prompts Utiles (Claude Code / Antigravity)

**Composant Portfolio :**

```
Génère un composant React Framer-motion pour une grille Bento 
affichant des statistiques de ROI.
```

**Génération Logo :**

```
Propose 5 concepts de logos minimalistes pour une agence d'automatisation IA 
nommée Oakflow AI, combinant la nature (chêne) et la tech (flux de données).
```

