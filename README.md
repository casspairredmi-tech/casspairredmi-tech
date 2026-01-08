# Gestion Projets & Tâches — PWA

Cette version est une **PWA (Progressive Web App)** : elle peut être installée sur mobile/PC et fonctionne **hors‑ligne**.

## Contenu
- `index.html` : application complète (Table / Board / Timeline + budgets & paiements)
- `manifest.json` : manifeste PWA
- `sw.js` : service worker (cache hors‑ligne)
- `icons/` : icônes

## Déploiement GitHub Pages (simple)
1. Crée un repo GitHub (ex: `gestion-projets-pwa`)
2. Ajoute ces fichiers à la racine du repo
3. Va dans **Settings → Pages**
4. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)`
5. Ouvre l’URL GitHub Pages (HTTPS).
   Ensuite sur mobile: menu navigateur → **Ajouter à l’écran d’accueil**.

## Local (optionnel)
Pour tester le Service Worker (recommandé), lance un serveur local :
- Python : `python -m http.server 8000`
- Ouvre : `http://localhost:8000`
