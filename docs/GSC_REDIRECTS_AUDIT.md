# Audit "Pages avec redirection" (Search Console)

Audit du 3 août 2026. Motif : 12 URLs remontées par Search Console sous le statut "Page avec redirection", et échec répété de la validation.

## Le résumé en une ligne

Le site est propre. Les 12 URLs redirigent parce qu'elles sont **censées** rediriger, et la validation Search Console échouera toujours sur elles. Il n'y a rien à corriger.

## 1. Ce qui a été vérifié

Toutes les vérifications ci-dessous sont passées sans anomalie. Aucune correction n'a été nécessaire.

| Vérification | Résultat |
| --- | --- |
| `sitemap.xml` : URLs avec `.html` | 0 sur 41 |
| `sitemap.xml` : URLs en `http://` | 0 |
| `sitemap.xml` : URLs sans `www` | 0 |
| `sitemap.xml` : ressources non HTML (xml, json, pdf, images) | 0 |
| `sitemap.xml` : URLs qui sont elles-mêmes source d'une 301 | 0 |
| Code source (29 fichiers HTML, plus MD, JS, XML) : liens internes en `.html` | 0 |
| Code source : liens internes en `http://` | 0 |
| Code source : liens vers `oakflowai.com` sans `www` | 0 |
| Balises `rel="canonical"` non conformes | 0 sur 40 |
| `robots.txt` déclare le sitemap | oui |

La seule occurrence de `http://` dans le projet est `http://www.sitemaps.org/schemas/sitemap/0.9`, dans l'en-tête de `sitemap.xml`. C'est un identifiant d'espace de noms XML, pas un lien. **Il ne doit jamais être passé en HTTPS**, sous peine d'invalider le sitemap.

## 2. Configuration Vercel

`cleanUrls: true` et `trailingSlash: false` sont bien positionnés. Les 32 règles de redirection sont toutes en `permanent: true`, servies en 308.

Aucune destination de redirection n'est elle-même source d'une autre redirection. La table est donc cohérente en interne.

### Deux chaînes à deux sauts subsistent, par construction

Tracé en production le 3 août :

```
https://oakflowai.com/services/assistant-vocal
  308 -> https://www.oakflowai.com/services/assistant-vocal
  308 -> /solutions-ia-entreprise
  200
```

```
https://www.oakflowai.com/blog/n8n-vs-make.html
  308 -> /blog/n8n-vs-make
  308 -> /blog/n8n-vs-zapier-vs-make
  200
```

La première vient de la normalisation d'hôte : la règle apex vers `www` s'applique avant les règles de chemin. La supprimer imposerait de dupliquer les 32 règles pour chaque hôte.

La seconde vient de `cleanUrls`, qui retire l'extension `.html` **avant** que la table de redirections soit évaluée. Conséquence directe : les 10 règles dont la source se termine par `.html` et qui visent un slug différent ne se déclenchent jamais. Elles sont neutralisées par `cleanUrls` (lignes 28, 35, 36, 37, 39, 48, 50, 52, 54, 56 de `vercel.json`).

**Ces règles n'ont pas été supprimées.** Les retirer ne changerait strictement rien au comportement observé, et les garder ne coûte rien non plus. Elles sont documentées ici pour éviter qu'on perde du temps à les déboguer à la prochaine passe.

Deux sauts restent dans ce que Google suit et à travers quoi il transmet le signal. Le seul moyen de les ramener à un saut serait de désactiver `cleanUrls`, ce qui casserait toutes les URLs propres du site. Le remède serait pire que le mal.

## 3. Pourquoi la validation Search Console échoue mécaniquement

"Page avec redirection" n'est pas une erreur. C'est un **statut d'exclusion** : Google signale qu'il a trouvé une URL, qu'elle renvoie une 301 ou une 308, et qu'il indexe donc la cible à la place. C'est exactement le comportement attendu d'une redirection.

Le bouton "Valider la correction" déclenche un nouveau crawl des URLs concernées. Ce crawl retrouve la redirection, puisqu'elle est intentionnelle et toujours en place. La validation échoue. Elle échouera à chaque tentative, indéfiniment.

Il n'existe que deux façons de vider ce rapport :

1. Supprimer les redirections. Les anciennes URLs renverraient alors une 404, les liens entrants existants seraient cassés et le signal accumulé serait perdu. C'est strictement pire que la situation actuelle.
2. Attendre que Google cesse de recrawler ces anciennes URLs. Cela prend des mois et ne se pilote pas.

**L'action correcte est de ne rien faire.** Ces 12 URLs sont d'anciens slugs, d'anciennes pages `/services/` consolidées vers `/solutions-ia-entreprise` et `/automatisation-n8n`, et des variantes `.html` héritées. Leur présence dans ce rapport est le signe que les redirections fonctionnent, pas qu'elles sont cassées.

## 4. Le décalage de Search Console

Les dates de dernier crawl expliquent une bonne partie de l'incompréhension. Relevé le 3 août via l'API d'inspection d'URL :

| URL | Dernier crawl Google | Verdict GSC | État réel en production |
| --- | --- | --- | --- |
| `/services/assistant-vocal` | 24 mai 2026 | "Envoyée et indexée" | 308 vers `/solutions-ia-entreprise` |
| `/feed.xml` | 14 mai 2026 | "Explorée, actuellement non indexée" | inchangé |

Search Console affiche l'état du site **au dernier crawl**, pas son état actuel. Sur ces deux URLs, le rapport a deux mois et demi de retard. Un rapport qui décrit un site de mai ne peut pas refléter des corrections d'août.

Conséquence pratique : ne jamais juger une correction technique sur le rapport de couverture avant que la date de dernier crawl de l'URL concernée soit postérieure à la correction.

Voir aussi `docs/GSC_CRAWLED_NOT_INDEXED.md` pour le statut "Explorée, actuellement non indexée", et la priorité 3 de `SEO_TECH_ROADMAP.md` pour le nettoyage des liens internes effectué le 18 juillet.
