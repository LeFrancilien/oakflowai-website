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

---

## 🟩 Priorité 4 : Exploitation des données Search Console de juillet 2026

> **Source :** `docs/SEO_PERFORMANCE_JUILLET_2026.md` (80 clics, 4 280 impressions, CTR 1,87 %, position moyenne 11,6), données brutes dans `docs/data/`. Volumes de recherche mesurés via Google Ads le 03/08.

### [x] Tâche 4.1 : Réécrire le `<title>` et la `<meta description>` de `/blog/crm-ia-pme` — fait le 03/08 (`8da29da` puis `b6c2e6f`)
* **État avant :** la page cumulait 287 impressions et 0 clic. Les 10 requêtes qui la déclenchent la placent entre les positions 1,14 et 9,14, dont `problèmes pme logiciel crm` en position 1,24 avec 41 impressions.
* **Réserve maintenue :** aucune de ces 10 requêtes ne remonte de volume Google Ads, et toutes ont une forme d'invite rédigée. Ce sont des impressions de citation générative, sans lien cliquable. **Le gain attendu sur ces requêtes reste nul.** L'intérêt réel porte sur `crm ia` (18 impressions, position 24,06), la seule requête du lot de forme humaine.
* **Balises livrées** (choisies par Cyril, différentes de la proposition initiale de cette fiche) :
  * Title : `Problèmes PME et logiciel CRM : 7 cas résolus par l'IA` (54 caractères)
  * Description : `Vos équipes perdent du temps sur un CRM inadapté ? Voici les 7 problèmes majeurs des PME et comment l'automatisation IA les règle.` (130 caractères)
  * `og:description` alignée sur la meta. `og:title` laissé inchangé, il diverge du title par choix et reprend le H1.
* **Incident corrigé en cours de route :** la première version livrée (`8da29da`) annonçait 3 solutions dans le title et 5 problèmes dans la meta, alors que la page livre 7 cas numérotés. Les trois chiffres ont été alignés sur 7 dans `b6c2e6f`. À retenir : vérifier qu'un chiffre annoncé dans une balise correspond au décompte réel des sections de la page.
* **Reste ouvert :** la position 24 sur `crm ia` est un problème de classement, pas de balise. Un chantier de contenu distinct reste à ouvrir si la requête devient prioritaire.
* **Vérification :** relever la position de `crm ia` dans GSC fin septembre. Ne pas juger la tâche sur le CTR des requêtes génératives.

### [x] Tâche 4.2 : Ajouter 2 liens internes contextuels depuis `/blog/meilleurs-skills-claude` vers `/votre-expert` — fait le 03/08 (`cfbde09`)
* **Pourquoi cette page :** elle a produit 30 des 80 clics du mois en 8 jours, avec un CTR de 14,08 % à la position 6,81. C'est la seule page du site qui transforme correctement ses impressions, et la seule qui peut transmettre de l'autorité utile.
* **État avant :** 3 liens vers `/votre-expert`, dont 2 dans la navigation et 1 en "En savoir plus" dans l'encart auteur. Aucun lien contextuel dans le corps.
* **Liens livrés :**
  1. Bloc `Vous voulez des skills connectés à vos vrais outils ?`, ancre `consultant en automatisation et IA`, placée après la mention de l'audit pour ne pas concurrencer le bouton Calendly.
  2. Section `Quel skill pour quelle fonction dans une PME ?`, ancre `déploiements d'agents IA en PME`, en introduction du tableau par fonction plutôt qu'en fin de section, où le paragraphe final pointe déjà vers `/solutions-ia-entreprise`.
* Navigation et encart auteur laissés intacts. Les deux ancres reprennent la formulation de l'encart auteur, elles sont donc fidèles à la page cible.
* **Écart assumé avec la convention de silo :** la règle interne envoie les articles IA vers `/solutions-ia-entreprise` (déjà 4 liens sur la page) et réserve `/votre-expert` aux sujets ROI et productivité. Le choix de `/votre-expert` ici est délibéré : l'audience de l'article est technique et `/votre-expert` est en position 3,56 avec seulement 54 impressions, donc sous-alimentée.
* **Vérification :** `/votre-expert` doit dépasser 54 impressions et 2 clics sur le mois d'août.

### [x] Tâche 4.3 : Décannibaliser le cluster `claude skills` — fait le 03/08 (`6b3099d`)
* **Constat de départ :** le seul cluster du site à volume mesuré (`claude skills` 4 400/mois, `skills claude` 2 400, `claude code skills` 1 300) était servi par deux pages qui se partageaient les impressions en restant toutes les deux en page 2.

| Requête | `/blog/meilleurs-skills-claude` | `/blog/claude-code-skill-guide` |
| --- | --- | --- |
| `claude skills` | 24 impr., position 10,4 | 12 impr., position 12,5 |
| `claude code skills` | 4 impr., position 11,5 | 23 impr., position 8,0 |

* **Mécanisme identifié :** la section `#installer` du roundup était un quasi-doublon textuel de "Comment activer un skill selon votre environnement" du guide. Le roundup se classait donc sur les requêtes d'installation du guide (`installer skill claude` en position 9,5, un clic capté sur `comment installer skill claude` alors que le guide est mieux placé).
* **Répartition des cibles retenue :** le roundup prend `claude skills` et `skills claude`, le guide garde `claude code skills` et la traîne installer/créer.
* **Livré :**
  1. Roundup : section `#installer` ramenée de 180 à 102 mots, doublon et arborescence supprimés, ancre `guide pour installer et configurer un skill Claude Code` ajoutée. La réponse complète reste dans la FAQ visible, le `FAQPage` JSON-LD reste donc adossé à du contenu affiché.
  2. Roundup : ajout d'un JSON-LD `ItemList` de 10 items nommés et décrits.
  3. Guide : "Où trouver des skills" ramenée de 214 à 141 mots, renvoi au roundup, encadré sécurité conservé.
  4. Guide : nouveau title `Claude Code Skills : créer un skill.md en 4 étapes (2026)` (57 car.) et nouvelle meta (152 car. au lieu de 163 tronquées, sans l'amorce "Découvrez comment"), répercutés sur les balises Open Graph.
  5. Guide : les quatre sections de construction numérotées `Étape 1.` à `Étape 4.` pour que le chiffre du title soit exact.
* **Erreur de mesure à ne pas reproduire :** la fiche initiale annonçait 1 716 mots à rapatrier, chiffre produit par une plage `awk` qui avait démarré sur une occurrence de la chaîne dans le JSON-LD du `<head>`. La section réelle faisait 180 mots. Mesurer une section HTML en relevant d'abord les numéros de ligne des `<h2>`, jamais par une plage de texte.
* **Attente réaliste :** la duplication supprimée est trop petite pour à elle seule sortir le guide de la page 2. Le gain viendra surtout des nouvelles balises et de la répartition des cibles.
* **Vérification :** positions de `claude skills` et `claude code skills` fin septembre, et CTR du guide une fois le nouveau title recrawlé (compter une à trois semaines).

---

## ⬜ À arbitrer (constat de l'analyse, pas encore une tâche validée)

### Dispersion sur `n8n pour comptable automatisation`
Six URL du site se présentent sur la même requête, la mieux placée étant `/blog/automatiser-comptabilite` en position 8,69, les cinq autres au-delà de la position 20. Même si la requête est générative, la dispersion pénalisera les requêtes commerciales du silo comptabilité.