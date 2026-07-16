# Historique SEO

## Session du 16 juillet 2026

- **Redirections GSC** : correction de la redirection apex → www (307 temporaire → 308 permanent via `vercel.json`) pour les 5 URL signalées en erreur ; validation à relancer dans GSC après vérification du 308 en production (`e6df8ff`).
- **/services/assistant-vocal** : enrichissement sémantique (agent IA, appels entrants et sortants, synthèse vocale TTS, NLP, etc.) ciblé sur "chatbot vocal ia" — mot-clé "affiliation" écarté pour mismatch d'intention — + ajout du schema `SoftwareApplication` avec AggregateRating 4.9/5 (`fec5893`).
- **/services/workflows-n8n** : optimisation title/H1 sur "prestataire n8n", section "Pourquoi choisir une agence spécialisée n8n ?" (7 expressions Semrush), et fusion des enrichissements dans le schema `Service` existant plutôt qu'un doublon (`8e4bf50`).
- **Article Pennylane (lead magnet)** : workflow "Relance factures impayées Pennylane" conçu via MCP n8n sur l'instance Hostinger (`eBW1tAlnYFT6MQte`), JSON assaini (zéro credential) intégré dans l'article avec bouton de copie JS ; title enrichi "[Template Inclus]" (`b0005c9`).
