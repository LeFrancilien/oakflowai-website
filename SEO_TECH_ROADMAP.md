# 🛠️ PLAN D'ACTION : Nettoyage SEO Technique On-Page — OakFlowAI

**Contexte :** Résolution des erreurs d'exploration, d'optimisation de performance et de balisage sémantique identifiées par Semrush (Données de l'audit : 2026).
**Objectif :** Éliminer les freins d'indexation pour maximiser la transmission du score d'autorité sur `oakflowai.com`.

---

## 🟥 Priorité 1 : Les Erreurs Critiques (Données Structurées)
> **Statut global :** 5 éléments de données structurées `LocalBusiness` ne sont pas valides (1 champ obligatoire manquant).

### [x] Tâche 1.1 : Corriger le Schéma `LocalBusiness` sur les 5 URL cibles — fait (c492b10, 16/07 : telephone + priceRange ajoutés ; vérifié en live le 18/07, relancer l'audit Semrush)
* **URLs impactées :**
  1. `https://www.oakflowai.com/` (Page d'accueil)
  2. `/services/assistant-vocal`
  3. `/services/chatbot-personnalise`
  4. `/services/integration-llm`
  5. `/services/workflows-n8n`
* **Instructions pour Fable V :**
  1. Inspecte le script JSON-LD (`<script type="application/ld+json">`) sur chacune de ces pages.
  2. Identifie le champ manquant requis par Google (Semrush indique "1 champ concerné", il s'agit généralement de `image`, `priceRange`, `address` ou `telephone`).
  3. Complète le schéma avec les données réelles de l'agence (Exemple : Clichy, France).
  4. *Exemple de structure propre attendue :*

     {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Oakflow AI",
  "image": "https://www.oakflowai.com/assets/logo.png",
  "telephone": "+33 7 59 69 67 69",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Clichy",
    "postalCode": "92110",
    "addressCountry": "FR"
  }
}

---

## 🟧 Priorité 2 : Les Avertissements (On-Page & Performance)

### [x] Tâche 2.1 : Traiter les 45 fichiers CSS et JS non minimisés — fait (build.js + esbuild minifient style.css et main.js au build Vercel ; minification vérifiée en prod le 18/07)
* **Ressources critiques identifiées :** `style.css` et `main.js`.
* **Instructions pour Fable V :** 
  1. Examine si l'environnement Vercel utilise un bundler (Vite, PostCSS, Terser) lors du build.
  2. Si le projet est en HTML/CSS brut, applique une minification des fichiers `/style.css` et `/main.js` pour éliminer les espaces et commentaires inutiles, ou configure l'étape d'optimisation automatique dans le script de déploiement.

### [x] Tâche 2.2 : Réduire la longueur des balises `<title>` (7 pages) — fait le 18/07 (4 titles restants raccourcis ≤ 60 caractères, les 3 autres déjà retravaillés par les commits SEO du 17/07)
* **Problème :** Balises de titre trop longues qui risquent d'être tronquées (coupées) dans les résultats de recherche Google.
* **Instructions pour Fable V :** 
  1. Scane l'ensemble des fichiers HTML du projet.
  2. Repère les 7 pages dont le `<title>` dépasse **60 caractères**.
  3. Réécris-les de façon concise en conservant le mot-clé principal au début (Exemple : `Agence Automatisation Make pour PME | OakFlowAI`).

### [x] Tâche 2.3 : Résoudre les doublons H1 / Title (4 pages) — vérifié le 18/07 : plus aucun title strictement identique à son H1 sur les 45 pages (résolu par les refontes de titles précédentes)
* **Problème :** 4 pages possèdent exactement la même chaîne de texte dans leur balise `<title>` et leur balise `<h1>`. 
* **Instructions pour Fable V :**
  1. Modifie le `<h1>` ou le `<title>` de ces 4 pages pour apporter de la nuance sémantique (Le titre doit cibler le clic utilisateur, le H1 doit introduire la lecture de la page).

---

## 🟦 Priorité 3 : Les Avis (Crawl Budget & Maillage)

### [x] Tâche 3.1 : Rapatrier en local les ressources externes bloquées (24 ressources) — vérifié le 18/07 : plus aucun appel api.iconify.design dans le HTML, 42 références vers /assets/icons/ locaux
* **Problème :** Semrush détecte que Googlebot est bloqué par le fichier `robots.txt` d'un tiers lorsqu'il tente de lire tes icônes de logos (`https://api.iconify.design/...`). Cela nuit au rendu de ta page.
* **Ressources concernées :** `pipedrive.svg`, `hubspot.svg`, `microsoft-teams.svg`, `lucide:shield-check`, `google-gmail.svg`, etc.
* **Instructions pour Fable V :**
  1. N'appelle plus l'API externe d'Iconify en direct dans les balises `<img>`.
  2. Télécharge ces fichiers `.svg` directement dans le dossier local de ton projet (ex: `/assets/logos/`).
  3. Modifie les chemins dans ton code HTML pour pointer vers tes fichiers locaux (Exemple : `<img src="/assets/logos/hubspot.svg" ... />`).

### [x] Tâche 3.2 : Corriger les 5 liens internes avec redirections permanentes (301) — fait le 18/07 : scan complet (http, non-www, .html, slash final, anciens slugs) = HTML et sitemap propres ; 1 lien /blog/ corrigé dans feed.xml
* **Problème :** Ton site fait des liens internes vers des pages en faisant travailler inutilement le robot (Exemple : pointer vers `http` au lieu de `https`, ou oublier le slash de fin, forçant une redirection).
* **Instructions pour Fable V :**
  1. Trouve les liens internes qui pointent vers des anciennes versions d'URL.
  2. Mets à jour le code source pour pointer directement vers l'URL finale en `https://www.` sans passer par la case redirection.

### [x] Tâche 3.3 : Renforcer les 3 pages "orphelines" (1 seul lien interne entrant) — fait le 18/07 : +6 liens contextuels, toutes les pages ont désormais ≥ 3 liens internes entrants (article OpenAI EN, n8n-cloud, covenants, assistant-vocal)
* **Problème :** 3 pages de ton site ne reçoivent qu'un seul lien depuis le reste de ton site. Elles manquent de "jus de lien".
* **Instructions pour Fable V :**
  1. Identifie ces 3 pages (généralement des articles récents du blog).
  2. Ajoute au moins **2 nouveaux liens contextuels** vers ces pages depuis des articles de blog existants ou depuis ta page pilier.