# Audit "Explorée, actuellement non indexée" (Search Console)

Audit du 3 août 2026. Motif : URLs remontées par Search Console comme explorées mais non indexées, dont `feed.xml`, d'anciennes URLs et des pages qui n'existent plus.

## Le résumé en une ligne

Aucun lien cassé dans le projet. `feed.xml` n'a rien à faire dans l'index Google et son statut actuel est le bon. Les anciennes URLs disparaîtront d'elles-mêmes.

## 1. Ce qui a été vérifié

| Vérification | Résultat |
| --- | --- |
| Liens relatifs imbriqués du type `/blog/.../blog/page.html` | 0 |
| Occurrences de `/blog/blog/` dans le code source | 0 |
| Occurrences d'une page `confidentialite` | 0, la page n'existe pas dans le projet |
| Liens relatifs dans les pages | uniquement des `../` vers les assets |
| `feed.xml` présent dans `sitemap.xml` | non, conforme |
| Ressources non HTML dans `sitemap.xml` | 0 |
| `/blog/meilleurs-skills-claude` dans le sitemap, en canonique | oui |
| `/blog/combien-coute-automatisation-n8n-pme` dans le sitemap, en canonique | oui |
| `/blog/claude-code-skill-guide` dans le sitemap, en canonique | oui |
| `/blog/crm-ia-pme` dans le sitemap, en canonique | oui |

Les seuls liens relatifs du projet sont des `../favicon-32x32.png`, `../style.css`, `../main.js`, `../logo-oakflow-v2.webp` et `../cyril-de-la-rue.jpg`, dans les articles de blog. Les articles étant servis à un niveau de profondeur (`/blog/slug`), un `../style.css` résout vers `/style.css`. C'est correct et il ne faut pas y toucher.

Les règles `/blog/blog/:path*` et `/blog/:section/blog/:path*` présentes dans `vercel.json` traitent un bug d'imbrication qui n'existe plus dans le code source. Elles restent utiles tant que Google recrawle ces anciennes URLs, elles ne sont pas à supprimer.

## 2. Le cas `feed.xml`

Relevé le 3 août via l'API d'inspection d'URL de Search Console :

| Champ | Valeur |
| --- | --- |
| Verdict | `NEUTRAL` |
| État de couverture | Explorée, actuellement non indexée |
| État robots.txt | `ALLOWED` |
| Dernier crawl | 14 mai 2026 |
| Récupération de la page | `SUCCESSFUL` |
| URL référente | `https://oakflowai.com/` |

**Ce n'est pas un échec.** `feed.xml` est un flux RSS. Il n'a aucune raison d'apparaître dans les résultats de recherche, et Google a pris seul la bonne décision en l'explorant sans l'indexer. Le statut recherché pour ce fichier est exactement celui qu'il a.

Trois points à connaître pour ne pas s'agiter dessus.

**L'état `ALLOWED` est périmé.** `robots.txt` contient `Disallow: /feed.xml` depuis le commit `357d3fe` du 8 juin 2026. Google a exploré le fichier pour la dernière fois le 14 mai, soit trois semaines avant l'ajout de la règle. Search Console affiche l'état constaté au dernier crawl, pas l'état actuel du `robots.txt`.

**Un `Disallow` ne désindexe pas.** Il empêche l'exploration. Une URL déjà connue peut rester listée, et une URL bloquée mais liée depuis ailleurs peut même être indexée sans son contenu. L'outil qui désindexe vraiment est l'en-tête `X-Robots-Tag: noindex`, mais il exige que Google puisse crawler la page pour le lire, ce que le `Disallow` lui interdit précisément. Les deux directives se neutralisent.

**Aucune action n'est nécessaire ici**, puisque le flux n'est de toute façon pas indexé. Si un jour il l'était, la marche à suivre serait de retirer le `Disallow` et de servir un `X-Robots-Tag: noindex` sur `/feed.xml`, dans cet ordre.

L'URL référente relevée est `https://oakflowai.com/`, sans `www`, donc une URL qui redirige elle-même. Google a découvert le flux depuis une version de la page d'accueil antérieure à la normalisation d'hôte. C'est une trace d'historique, pas un lien présent dans le code aujourd'hui.

## 3. Les anciennes URLs et les pages fantômes

Même mécanique que pour le rapport "Page avec redirection", documenté dans `docs/GSC_REDIRECTS_AUDIT.md`.

Les anciennes URLs (`/services/assistant-vocal`, `/services/workflows-n8n`, anciens slugs de blog) ont été consolidées vers `/solutions-ia-entreprise` et `/automatisation-n8n`. Elles renvoient une 308. Google les garde en mémoire et les recrawle périodiquement pendant des mois avant de les abandonner. Pendant toute cette période, elles occupent une ligne dans les rapports d'exclusion.

L'inspection du 3 août montre l'ampleur du décalage : `/services/assistant-vocal` est encore donnée pour "Envoyée et indexée" par Search Console, sur la foi d'un crawl du 24 mai, alors que l'URL redirige en production. Ces impressions résiduelles se retrouvent d'ailleurs dans les données de juillet, avec 85 impressions et 1 clic sur cette seule URL.

Ces lignes disparaîtront des rapports quand Google aura recrawlé. Cela ne se pilote pas et ne se valide pas.

## 4. Ce qu'il faut faire, et ne pas faire

Ne pas relancer la validation sur ces URLs, elle échouera pour les mêmes raisons mécaniques que sur le rapport des redirections.

Ne pas ajouter `feed.xml` au sitemap pour "aider" Google à l'indexer. Un sitemap ne doit contenir que des pages HTML canoniques et indexables.

Ne pas supprimer les règles `/blog/blog/:path*` de `vercel.json` tant que ces URLs remontent dans les rapports.

Utiliser l'inspection d'URL pour forcer un recrawl uniquement sur les pages qui ont réellement changé. La liste courante est dans `URLS_A_SOUMETTRE_GSC.txt`, à la racine du dépôt.
