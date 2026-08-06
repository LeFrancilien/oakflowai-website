# GEO / AI Search : /automatisation-n8n

Analyse du 6 août 2026. Page auditée : `https://www.oakflowai.com/automatisation-n8n`
(source locale `automatisation-n8n/index.html`, 1 532 mots dans le corps, version en ligne
identique à la version locale).

---

## 1. Score de préparation GEO : 74/100

| Critère | Poids | Score | Pondéré |
| --- | --- | --- | --- |
| Citabilité des passages | 25 % | 76/100 | 19,0 |
| Lisibilité structurelle | 20 % | 80/100 | 16,0 |
| Contenu multi-modal | 15 % | 47/100 | 7,0 |
| Autorité et signaux de marque | 20 % | 70/100 | 14,0 |
| Accessibilité technique | 20 % | 90/100 | 18,0 |
| **Total** | | | **74/100** |

Le socle technique est propre : HTML statique, aucune dépendance JavaScript, crawlers IA
autorisés nommément. Ce qui plafonne le score, c'est le hors-page (aucune mention tierce)
et le multi-modal (une seule image, aucune vidéo).

---

## 2. Répartition par plateforme

| Surface | Score | Ce qui décide |
| --- | --- | --- |
| Google AI Overviews | 55/100 | 92 % des citations AIO viennent du top 10. La page est en position 32 sur « agence automatisation n8n » et 36 sur « agence n8n » (GSC, 7 juillet au 4 août). Elle est hors du pool de citation sur ses requêtes commerciales, quelle que soit la qualité du texte. |
| Google AI Mode | 72/100 | Corrélation faible au classement, pool plus large (~9 domaines cités par requête), la fraîcheur et l'autorité d'entité pèsent plus que la position. `dateModified` à aujourd'hui, deux tableaux comparatifs, entité liée : la page joue mieux ici. |
| ChatGPT | 60/100 | GPTBot et OAI-SearchBot autorisés, contenu entièrement extractible. Mais ChatGPT tire 47,9 % de ses citations de Wikipédia et 11,3 % de Reddit : aucune présence sur ces deux surfaces. |
| Perplexity | 50/100 | PerplexityBot autorisé. Perplexity tire 46,7 % de ses citations de Reddit. Empreinte Reddit nulle, donc exclusion structurelle de la moitié de son pool. |

Un signal positif que les positions moyennes masquent : la page se classe déjà sur des
requêtes conversationnelles longues, typiques du fan-out d'AI Mode.

| Requête | Position | Impressions |
| --- | --- | --- |
| n8n est-il adapté aux petites entreprises ? | 4,5 | 12 |
| expert n8n france | 9,1 | 7 |
| plateformes qui s'intègrent avec n8n | 11,0 | 2 |
| consultant n8n france | 15,9 | 11 |

Ces quatre requêtes sont dans le pool de citation. Les requêtes commerciales courtes
(« agence n8n », position 36) n'y sont pas. La stratégie GEO à court terme se joue donc sur
la longue traîne conversationnelle, pas sur les têtes de requête.

---

## 3. Accès des crawlers IA

Le `robots.txt` autorise explicitement dix agents, ce qui est au-dessus de la pratique
courante.

| Crawler | Statut | Effet |
| --- | --- | --- |
| GPTBot, OAI-SearchBot, ChatGPT-User | Allow | ChatGPT web search accessible |
| ClaudeBot, anthropic-ai | Allow | Claude accessible |
| PerplexityBot | Allow | Perplexity accessible |
| Google-Extended | Allow | Grounding Gemini et Vertex accessible |
| Applebot-Extended | Allow | Apple Intelligence accessible |
| Bytespider, cohere-ai | Allow | accessible |
| CCBot | **Disallow** | Common Crawl exclu |

Le blocage de CCBot est un arbitrage, pas un bug : le commentaire du fichier l'assume
(« données propriétaires »). Coût réel : Common Crawl alimente une partie des corpus de
récupération en aval, pas seulement l'entraînement. Si la priorité est la visibilité IA
plutôt que la protection du contenu, c'est la ligne à rouvrir en premier.

Absents du fichier, sans conséquence bloquante puisque `User-agent: *` les couvre en Allow :
`Meta-ExternalAgent`, `Amazonbot`, `DuckAssistBot`. Les autoriser nommément ne change rien
techniquement, ça documente juste l'intention.

Aucune directive `nosnippet`, `data-nosnippet`, `max-snippet` ni `noindex` sur la page : elle
est éligible aux AI Overviews et à AI Mode. C'est le bon réglage.

---

## 4. Statut llms.txt

Présent à `https://www.oakflowai.com/llms.txt`, servi en texte brut, bien structuré
(description, pages principales, services, tarifs, cas d'usage, auteur, conditions de
citation).

Google déclare depuis le 29 juin 2026 ignorer ces fichiers dans Search, y compris pour ses
fonctionnalités génératives : ni bénéfice ni pénalité. Mueller a qualifié le cas d'usage
« découverte » d'impasse. Aucun poids de classement ne lui est attribué ici.

Il reste utile pour les services IA non-Google et, surtout, comme source unique de vérité
sur les tarifs et les chiffres. Ce rôle impose une contrainte : le `llms.txt` doit rester
synchrone avec les pages. Il l'est aujourd'hui sur la grille tarifaire n8n (490 €, 800 à
2 500 €, 2 500 à 5 000 €, 149 €/mois, 10 à 20 €/mois). Il ne l'est pas sur les gains horaires,
voir le point 8.1.

---

## 5. Analyse des mentions de marque

Rappel du signal : les mentions de marque corrèlent trois fois plus fortement avec la
visibilité IA que les backlinks (Ahrefs, décembre 2025, 75 000 marques). Les mentions
YouTube arrivent en tête (~0,737), le Domain Rating ferme la marche (~0,266).

État constaté après recherche sur la marque et sur le nom du fondateur :

| Surface | Présence | Constat |
| --- | --- | --- |
| Site propre | Forte | Tous les résultats de recherche sur « Oakflow AI » pointent vers oakflowai.com |
| LinkedIn | Oui | Profil `de-la-rue` déclaré en `sameAs` sur Organization et Person, indexé |
| YouTube | Chaîne déclarée | `UCdYJvJyUV6DHNa3AoRCXB-g` dans le `sameAs`, mais aucune vidéo ne remonte sur la marque et aucune n'est intégrée sur la page |
| Reddit | Aucune | Zéro mention détectée |
| Wikipédia / Wikidata | Aucune | Attendu à ce stade, non actionnable à court terme |
| TikTok, Instagram, Facebook, X | Déclarés en `sameAs` | Non vérifiés en volume de mentions |

Le diagnostic tient en une phrase : 100 % de la surface de citation est en première partie.
Un moteur IA qui veut corroborer « Oakflow AI est une agence n8n en France » ne trouve
aucune source indépendante. C'est le plafond principal sur ChatGPT et Perplexity.

---

## 6. Citabilité au niveau du passage

Longueur optimale pour la citation : 134 à 167 mots. Environ 44 % des citations IA
proviennent des 30 premiers pour cent de la page.

Découpage mesuré :

| Bloc | Mots | Verdict |
| --- | --- | --- |
| `.answer-block` (haut de page) | **166** | Dans la fenêtre optimale, en haut de page. Le meilleur actif GEO de la page. |
| Header complet (H1 + accroche + answer-block) | 233 | |
| Section `n8n-intro` | 183 | |
| Section `comparatif` | 162 | |
| Section `roi` | 196 | |
| Section `agence-expert` | 235 | |
| Section `faq` | 425 | 8 réponses de 31 à 58 mots |
| Section « Aller plus loin » | 81 | |

Les 30 premiers pour cent de la page (environ 460 mots) couvrent le header et
`n8n-intro`. L'`answer-block` est donc placé exactement là où les citations se prennent.

Le problème est ailleurs : **un seul passage contigu de la page atteint la fenêtre 134-167
mots**. Les paragraphes isolés font 19 à 70 mots, les sections n'atteignent 162-235 mots
qu'en agrégeant plusieurs paragraphes et un tableau. Un moteur qui extrait à la maille du
paragraphe ne trouve qu'un seul bloc autoportant.

Densité de faits chiffrés, en revanche, solide : 400 intégrations, 490 €, 800 à 2 500 €,
2 500 à 5 000 €, 149 €/mois, 10 à 20 €/mois, 16 à 29 $/mois, 49 à 299 $/mois, 400 factures,
30 h, 20 h, 80 %, 1 à 3 semaines.

Faiblesse de citabilité la plus nette : **zéro source externe**. Les deux seuls liens sortants
sont Calendly et LinkedIn. Les tarifs Make et Zapier, les 400+ intégrations, la mention de
l'open source : aucune de ces affirmations ne pointe vers une source primaire. Les systèmes
IA propagent préférentiellement les affirmations attribuées.

---

## 7. Rendu serveur

HTML statique servi tel quel. Vérifié : le texte complet est présent dans la réponse HTML
initiale, y compris les réponses de la FAQ (balises `<details>` fermées mais présentes dans
le DOM). Les crawlers IA n'exécutent pas JavaScript : ce point est acquis.

Deux scripts seulement : Microsoft Clarity dans le `<head>` et `main.js` en `defer`. Aucun
contenu ne dépend d'eux.

`canonical` auto-référent et correct. Fil d'Ariane HTML et `BreadcrumbList` cohérents.
Les anciennes URL `/services/workflows-n8n` et `/services/agence-automatisation-make`
redirigent en 301 vers cette page (`vercel.json`), pas de cannibalisation.

---

## 8. Les 5 changements à plus fort impact

### 8.1. Corriger « en moyenne 40 h/mois, plage 10 à 40 h/mois » (Critique)

**Observation de premier principe.** Une moyenne ne peut pas être égale au maximum d'une
plage, sauf si tous les clients sont exactement à 40 h. La formulation est arithmétiquement
impossible, et elle est contredite deux paragraphes plus bas par les cas documentés de la
page elle-même : Levallois 30 h, Boulogne-Billancourt 20 h. La moyenne des cas documentés
tourne autour de 25 h, pas 40 h.

Le commit `23f8b65`, intitulé « cohérence arithmétique », a introduit cette formulation en
remplaçant « 8 à 40 heures par mois », qui était cohérent. La régression touche cinq
emplacements : `meta description`, `.answer-block`, section ROI, FAQ visible, schéma FAQPage.

**Pourquoi c'est le point numéro un en GEO.** C'est le chiffre le plus repris de la page.
Un moteur IA qui l'extrait obtient une valeur incohérente avec les preuves de la même page.
Les systèmes de citation pénalisent l'incohérence interne, et un lecteur humain qui compare
les deux paragraphes perd confiance. Le chiffre est aussi désynchronisé dans `llms.txt`.

**Correctif proposé,** défendable avec les seules preuves déjà publiées :

> Sur les déploiements que nous documentons, le gain va de 20 à 30 heures par mois selon le
> volume traité.

**Comment savoir si c'est faux.** Reprendre les trois cas clients affichés et vérifier que
la fourchette annoncée les contient tous. Si un quatrième cas sort de la plage, la plage
change, pas le cas.

**Indicateur à suivre.** Cohérence du chiffre sur les 6 emplacements (5 sur la page +
`llms.txt`), vérifiable par un simple `grep` avant chaque déploiement.

### 8.2. Sourcer les affirmations sur Make et Zapier (Haut)

**Observation.** Le tableau comparatif avance « Make 16 à 29 $/mois » et « Zapier 49 à
299 $/mois » sans aucune attribution. Ce sont des faits tiers, datés, vérifiables, et ils
périment. Les moteurs IA relaient beaucoup plus volontiers une affirmation attribuée à une
source primaire qu'une affirmation nue.

**Action.** Lier chaque ligne à la page tarifaire de l'éditeur et dater le relevé :
« tarifs relevés le 6 août 2026 sur make.com/pricing et zapier.com/pricing ». Idem pour
« plus de 400 intégrations » vers `n8n.io/integrations`.

**Dépendance.** Aucune, c'est le changement le plus rapide de la liste.

**Comment savoir si c'est faux.** Ouvrir les trois pages sources et comparer. Si un tarif a
bougé, la date du relevé rend l'écart lisible au lieu de le rendre trompeur.

**Indicateur.** Nombre de liens sortants vers des sources primaires : 0 aujourd'hui, cible 3.

### 8.3. Baliser la grille tarifaire en `Service` + `Offer` (Haut)

**Observation.** La page publie cinq prix en HTML et n'en balise aucun. « Combien coûte une
agence n8n » est une requête à intention transactionnelle directe, et le prix est la donnée
la plus extractible qui soit. Le schéma actuel décrit l'organisation, la personne, la page et
la FAQ, mais jamais l'offre.

**Dépendance.** À faire après 8.1, sinon le schéma fige un chiffre incohérent.

**Comment savoir si c'est faux.** Validator.schema.org sans erreur, et Rich Results Test
reconnaît les entités `Service`. Si les prix du schéma et du tableau divergent, le balisage
est pire que rien.

**Indicateur.** Apparition de la page sur les requêtes « prix / tarif / combien coûte » dans
GSC, à comparer sur 60 jours.

### 8.4. Intégrer une vidéo de démonstration (Moyen, plafond haut)

**Observation.** Les mentions YouTube portent la corrélation la plus forte avec la citation
IA (~0,737), et les contenus multi-modaux sont sélectionnés 156 % plus souvent. La chaîne
YouTube est déclarée en `sameAs` sur cette page, mais aucune vidéo n'y est intégrée. La page
compte une seule image de contenu.

**Action.** Une démonstration de 60 à 90 secondes du workflow devis / contrat / facture,
celui déjà illustré par le schéma statique, intégrée dans la section `n8n-intro`, plus un
nœud `VideoObject` avec transcription.

**Dépendance.** Demande une production vidéo, c'est le poste le plus lent des cinq.

**Comment savoir si c'est faux.** Si la vidéo n'est pas indexée dans GSC (rapport Vidéo)
sous 30 jours, le balisage ou l'intégration est en cause, pas le contenu.

**Indicateur.** Impressions sur l'onglet Vidéo de GSC, et vues YouTube référencées depuis
oakflowai.com.

### 8.5. Construire une empreinte tierce, Reddit en priorité (Moyen, plafond le plus haut)

**Observation.** Reddit pèse 46,7 % des citations Perplexity et 11,3 % des citations ChatGPT.
L'empreinte actuelle est nulle. Toute la matière citable sur la marque est auto-publiée, donc
non corroborable par un moteur.

**Action.** Réponses de fond, non promotionnelles, sur r/n8n, r/automation, r/entrepreneur,
sur les questions où l'expérience réelle a de la valeur : hébergement self-hosted et RGPD,
coût réel d'un workflow, migration depuis Zapier. Le signal recherché est la mention de la
marque dans un fil, pas le lien.

**Dépendance.** Indépendant des quatre autres, à lancer en parallèle. Effet le plus lent,
plusieurs mois.

**Comment savoir si c'est faux.** Si après 3 mois de contributions une recherche sur la
marque ne remonte toujours que des pages oakflowai.com et LinkedIn, le canal ne prend pas et
il faut réallouer vers YouTube.

**Indicateur.** Nombre de domaines tiers distincts mentionnant « Oakflow AI » : 1 aujourd'hui
(LinkedIn).

---

## 9. Recommandations de schéma

État actuel : trois blocs JSON-LD séparés, `BreadcrumbList`, `FAQPage`, et un `@graph`
contenant `Organization`, `Person` et `WebPage`. Valides, mais partiellement déconnectés.

**À ajouter.**

1. **`Service` avec `offers`** sur les cinq prestations du tableau. Chaque `Offer` porte
   `price`, `priceCurrency: "EUR"`, `priceValidUntil`, et `areaServed: "FR"`. Rattacher via
   `provider: {"@id": "...#organization"}`.
2. **`datePublished`** sur le nœud `WebPage`. Seul `dateModified` est présent. Les systèmes
   IA pondèrent la fraîcheur relative, ils ont besoin des deux bornes.
3. **`knowsAbout`** sur le nœud `Person` : `["n8n", "automatisation des processus métier",
   "RGPD", "intégration LLM"]`. Le nœud actuel se limite à `jobTitle` + `worksFor` +
   LinkedIn, ce qui est mince pour la résolution d'entité.
4. **`description` et `image`** sur `Person`, pour ancrer l'entité Cyril DE LA RUE.
5. **`VideoObject`**, à ajouter en même temps que la vidéo (8.4).
6. **`ImageObject`** pour le schéma de workflow, avec `caption` reprenant la légende.

**À connecter.** Donner un `@id` au nœud `FAQPage` et le référencer depuis `WebPage` via
`mainEntity`, idem pour `BreadcrumbList` via `breadcrumb`. Trois graphes isolés se lisent
moins bien qu'un graphe unique.

**À ne pas faire.**

- Ne pas retirer le `FAQPage`. Google a supprimé les rich results FAQ pour tous les sites le
  7 mai 2026 : il n'y a plus de gain SERP, mais aucun bénéfice à le supprimer non plus, et
  aucune preuve d'un gain de citation IA. Le laisser en l'état, ne pas en créer de nouveaux
  en attendant un affichage SERP.
- Ne pas ajouter d'`aggregateRating` sur l'organisation. Les avis auto-déclarés sur sa propre
  entité sont contraires aux consignes Google et exposent à une action manuelle.

---

## 10. Reformulations de contenu

**a. Créer deux blocs autoportants supplémentaires.** Un seul passage de la page est dans la
fenêtre 134-167 mots. Cibles prioritaires : ouverture de la section `roi` et ouverture de la
section `comparatif`. Modèle : réponse directe en 40 premiers mots, puis deux ou trois faits
chiffrés, puis la conséquence pratique. Réutiliser la classe `.answer-block` existante.

**b. Reformuler les titres en forme de requête.** Cinq H2 sur huit sont déjà interrogatifs,
ce qui est bien. Les trois autres ne le sont pas :

| Actuel | Proposition |
| --- | --- |
| `H2` ROI concret : ce que gagnent les PME avec n8n | Quel ROI attendre d'une automatisation n8n ? |
| `H3` Nos tarifs, en toute transparence | Combien coûte une mission n8n en 2026 ? |
| `H2` Aller plus loin avec n8n | Quelles ressources pour approfondir n8n ? |

Le H3 « Ce que vous pouvez automatiser dès maintenant » fonctionne, il correspond à une
intention réelle.

**c. Avancer la définition.** L'accroche du hero ouvre sur le problème (« Vos équipes perdent
des heures... ») et la définition de n8n n'arrive qu'au mot 37 environ. Elle reste dans les
60 premiers mots, donc ce n'est pas bloquant, mais inverser les deux premières phrases de
l'`answer-block` mettrait « n8n est une plateforme d'automatisation open source » dans les
15 premiers mots du bloc.

**d. Ouvrir la première FAQ par défaut.** Les huit réponses sont dans des `<details>` fermés.
Le texte est bien dans le HTML, donc extractible, mais l'ajout de l'attribut `open` sur
« Qu'est-ce que n8n ? » supprime toute ambiguïté sur le contenu masqué par défaut et sert le
lecteur au passage.

**e. Nommer les cas clients par secteur et par ville dans la même phrase que le chiffre.**
La section ROI le fait déjà pour Levallois et Boulogne-Billancourt. Le troisième cas
(« un e-commerçant ») n'a ni ville ni volume : c'est le seul des trois qui n'est pas citable.
