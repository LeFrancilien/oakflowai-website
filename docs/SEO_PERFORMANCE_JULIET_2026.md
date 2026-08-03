# Performance SEO, juillet 2026

Période : 1er au 31 juillet 2026. Source : export Search Console (recherche Web, propriété `sc-domain:oakflowai.com`), croisé avec les volumes Google Ads mesurés via DataForSEO (France, fr) le 3 août 2026.

## 1. Métriques clés

| Indicateur | Valeur |
| --- | --- |
| Clics | 80 |
| Impressions | 4 280 |
| CTR | 1,87 % |
| Position moyenne (pondérée par les impressions) | 11,6 |

Le mois se coupe en deux. Du 1er au 24 juillet, le site fait 35 clics en 24 jours, soit 1,5 par jour. Du 25 au 31 juillet, il en fait 45 en 7 jours, soit 6,4 par jour. Le pic tombe le 28 juillet avec 9 clics. La bascule suit la publication de l'article "meilleurs skills Claude" le 24 juillet (commit `7a5995a`).

Les impressions quotidiennes passent d'un creux à 40 le 14 juillet à 263 le 30 juillet. La position moyenne quotidienne se dégrade en parallèle, de 7,5 le 3 juillet à 16,2 le 31. Cette dégradation vient de l'élargissement de la longue traîne, pas d'une perte de classement sur les requêtes déjà acquises : les positions des requêtes existantes sont stables sur la période.

### Appareils

| Appareil | Clics | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Ordinateur | 63 | 3 717 | 1,69 % | 11,38 |
| Mobile | 16 | 555 | 2,88 % | 13,05 |
| Tablette | 1 | 8 | 12,5 % | 7,75 |

L'ordinateur porte 87 % des impressions mais convertit moins bien que le mobile (1,69 % contre 2,88 %), alors que sa position moyenne est meilleure. Cohérent avec une audience technique qui lit sur desktop et scanne beaucoup de résultats.

### Pays

| Pays | Clics | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| France | 55 | 2 457 | 2,24 % | 13,34 |
| Belgique | 9 | 186 | 4,84 % | 6,79 |
| États-Unis | 0 | 447 | 0 % | 8,77 |
| Suisse | 2 | 48 | 4,17 % | 8,33 |
| Algérie | 2 | 45 | 4,44 % | 11,89 |
| Côte d'Ivoire | 2 | 31 | 6,45 % | 5,84 |
| Vietnam | 1 | 79 | 1,27 % | 19,71 |
| Maroc | 1 | 75 | 1,33 % | 8,93 |

La France pèse 69 % des clics pour 57 % des impressions. Les États-Unis sont le deuxième pays en impressions (447) avec zéro clic : ces impressions viennent de l'article anglais `/blog/how-to-integrate-openai-api-with-n8n` (484 impressions, 1 clic, CTR 0,21 %, position 11,57). La Belgique affiche le meilleur CTR des marchés à volume, à 4,84 % pour une position moyenne de 6,79.

## 2. Pages piliers

| # | Page | Clics | Impressions | CTR | Position |
| --- | --- | --- | --- | --- | --- |
| 1 | `/blog/meilleurs-skills-claude` | 30 | 213 | 14,08 % | 6,81 |
| 2 | `/blog/claude-code-skill-guide` | 12 | 685 | 1,75 % | 9,37 |
| 3 | `/blog/n8n-pennylane-automatisation-facture-electronique` | 12 | 620 | 1,94 % | 8,11 |
| 4 | `/` (accueil) | 9 | 128 | 7,03 % | 5,09 |
| 5 | `/blog/claude-code-thinking-mode` | 4 | 139 | 2,88 % | 6,65 |
| 6 | `/blog/tri-mails-ia` | 4 | 109 | 3,67 % | 10,28 |
| 7 | `/blog/automatiser-comptabilite` | 2 | 198 | 1,01 % | 11,08 |
| 8 | `/votre-expert` | 2 | 54 | 3,70 % | 3,56 |

Ces 8 pages font 75 des 80 clics du mois.

**`/blog/meilleurs-skills-claude`** est la page de l'année. Elle a été publiée le 24 juillet et a produit 30 clics en 8 jours, soit 37,5 % du trafic du mois. Son CTR de 14,08 % à la position 6,81 est huit fois la moyenne du site. C'est la seule page qui transforme correctement ses impressions.

**`/blog/claude-code-skill-guide`** est l'inverse : 685 impressions, le plus gros volume du site, pour 12 clics et un CTR de 1,75 % à la position 9,37. Elle capte la demande mais ne la convertit pas.

**`/blog/n8n-pennylane-automatisation-facture-electronique`** tient le duo `n8n pennylane` / `pennylane n8n` en positions 2,6 et 2,33, avec des CTR de 15 % et 16,67 %. C'est le meilleur couple requête-page du site en qualité, mais le volume plafonne à 38 impressions cumulées.

Pages à fort volume d'impressions et zéro clic : `/blog/crm-ia-pme` (287), `/blog/n8n-vs-zapier-vs-make` (181), `/automatisation-n8n` (180, position 30,43), `/blog/guide-configuration-serveur-n8n` (145), `/automatisation-n8n/n8n-cloud` (143), `/services/workflows-n8n` (123, position 28,94), `/blog/roi-automatisation` (111), `/blog` (111).

## 3. Requêtes à fort potentiel

### 3.1 Le gisement mesuré : le cluster "claude skills"

C'est le seul cluster du site dont le volume de recherche est confirmé par Google Ads.

| Requête | Volume/mois (FR) | Impressions | Clics | Position | Page servie |
| --- | --- | --- | --- | --- | --- |
| `claude skills` | 4 400 | 36 | 0 | 11,08 | 2 pages en concurrence |
| `skills claude` | 2 400 | 20 | 2 | 10,25 | `/blog/meilleurs-skills-claude` |
| `claude code skills` | 1 300 | 27 | 0 | 8,52 | 2 pages en concurrence |

`claude skills` a culminé à 9 900 recherches en mars 2026 et se stabilise autour de 4 400 à 5 400. Le site est en page 2 dessus, et les impressions se répartissent entre deux URL :

- `/blog/meilleurs-skills-claude` : 24 impressions, position 10,375
- `/blog/claude-code-skill-guide` : 12 impressions, position 12,5

Même situation sur `claude code skills` : le guide est en position 8 avec 23 impressions, l'article "meilleurs skills" en position 11,5 avec 4 impressions. Les deux pages se partagent le signal au lieu de le concentrer. Aucune des deux n'entre dans le top 5.

L'écart de CTR entre les deux pages tranche la question : à position quasi égale, `meilleurs-skills-claude` convertit à 14,08 % et `claude-code-skill-guide` à 1,75 %. La page à pousser sur les requêtes génériques est `meilleurs-skills-claude`.

### 3.2 Le cluster CRM : position 1,24 sans volume réel

`/blog/crm-ia-pme` accumule 287 impressions et zéro clic. Le détail requête par requête, obtenu en croisant les dimensions requête et page dans GSC :

| Requête | Impressions | Position | Volume Google Ads (FR) |
| --- | --- | --- | --- |
| `problèmes pme logiciel crm` | 41 | 1,24 | aucune donnée |
| `problèmes pme b2b logiciel crm` | 32 | 4,56 | aucune donnée |
| `problèmes crm ia pour pme` | 19 | 2,53 | aucune donnée |
| `crm ia` | 18 | 24,06 | aucune donnée |
| `problèmes équipes commerciales crm mal configurés` | 14 | 9,14 | aucune donnée |
| `pourquoi l'activation d'outils d'ia crm n'allège pas les équipes` | 13 | 8,54 | aucune donnée |
| `deals dormants crm` | 12 | 5,50 | aucune donnée |
| `quels problèmes un crm ia peut résoudre pour une pme ?` | 10 | 1,60 | aucune donnée |
| `problèmes résolus par crm ia pour pme` | 7 | 1,14 | aucune donnée |
| `intégrations crm échouent pme françaises` | 3 | 3,00 | aucune donnée |

Toutes ces requêtes pointent vers `/blog/crm-ia-pme`. Aucune ne remonte de volume Google Ads, y compris `crm ia pme`, testée séparément.

Ces requêtes ont la forme d'invites, pas de recherches tapées : phrases complètes, questions rédigées, formulations en "pourquoi" et "quels problèmes". Le fichier de requêtes contient d'ailleurs des entrées non ambiguës sur leur origine, dont un prompt de persona de 900 caractères et des requêtes préfixées `is it`. Ce sont des impressions de citation dans les réponses génératives, pas des affichages de lien bleu. Une position 1,24 y signifie "cité en premier dans le jeu de sources", et aucun clic n'est possible depuis ce format.

Conséquence directe : réécrire le title et la meta-description de `/blog/crm-ia-pme` ne produira pas de clics sur ces dix requêtes. Le levier réel sur cette page est `crm ia`, la seule requête du lot dont la forme est humaine, et sur laquelle la page est en position 24,06. C'est un travail de contenu et de maillage, pas de balise.

Ce constat prolonge l'audit de juillet 2026 sur les impressions fantômes, qui chiffrait à 40 % la part des impressions sans volume mesurable.

### 3.3 `n8n pour comptable automatisation` : cannibalisation à six URL

La requête totalise 43 impressions et zéro clic au niveau requête, sans volume Google Ads. L'agrégation par page révèle six URL du site en concurrence sur la même requête :

| Page | Impressions | Position |
| --- | --- | --- |
| `/blog/automatiser-comptabilite` | 42 | 8,69 |
| `/blog/n8n-pennylane-automatisation-facture-electronique` | 39 | 20,03 |
| `/automatisation-n8n/integration/pennylane` | 24 | 55,33 |
| `/automatisation-n8n` | 11 | 78,00 |
| `/blog` | 11 | 54,36 |
| `/services/workflows-n8n` | 1 | 91,00 |

Google hésite entre six pages et n'en pousse aucune dans le top 5. Le signal est réel même si la requête est générative : la même dispersion pénalisera les requêtes commerciales du silo comptabilité. La page à désigner comme cible est `/blog/automatiser-comptabilite`, déjà la mieux placée à 8,69, recalée sur le cluster IA le 25 juillet (commit `29aaf99`).

### 3.4 Quick wins de second rang

| Requête | Impressions | Position | Page |
| --- | --- | --- | --- |
| `comment installer skill claude` | 6 | 8,83 | `/blog/claude-code-skill-guide` |
| `claude skill` | 4 | 9,00 | `/blog/claude-code-skill-guide` |
| `n8n cloud` | 33 | 6,76 | `/automatisation-n8n/n8n-cloud` |
| `n8n vs make pour pme` | 19 | 5,32 | `/blog/n8n-vs-zapier-vs-make` |
| `n8n cloud vs self hosted prix` | 10 | 5,50 | `/automatisation-n8n/n8n-cloud` |
| `agence automatisation n8n` | 76 | 45,92 | `/automatisation-n8n` |

`agence automatisation n8n` est la première requête du site en impressions avec zéro clic, à la position 45,92. Elle est commerciale et correspond à l'offre. La position rend tout gain à court terme illusoire, mais elle mérite d'être suivie.

## 4. Ce que le mois établit

Le trafic est porté par un cluster unique, celui des skills Claude, et par une seule page publiée le 24 juillet. Le reste du site produit des impressions sans clics, en grande partie sur des requêtes génératives dont aucun volume n'est mesurable.

L'écart entre 685 impressions à 1,75 % de CTR sur le guide et 213 impressions à 14,08 % sur l'article "meilleurs skills" est le chiffre le plus exploitable du mois : la demande existe et elle est mesurée à 4 400 recherches mensuelles, mais elle se répartit entre deux pages qui se neutralisent en page 2.
