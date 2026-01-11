# Gestion Projets & Tâches — PWA (flat)

✅ PWA installable + hors-ligne  
✅ **Aucun dossier** : uniquement des fichiers à la racine

## Code d'accès (auth)
Code par défaut : `12345azerty`

Pour changer le code :
- Ouvre `index.html`
- Cherche `DEFAULT_ACCESS_CODE`
- Modifie la valeur.

## Déploiement GitHub Pages
1. Crée un repo GitHub
2. Upload **tous les fichiers** de ce dossier à la racine du repo
3. Settings → Pages → Deploy from branch → `main` + `/ (root)`
4. Ouvre le lien HTTPS

## Test local
- `python -m http.server 8000`
- `http://localhost:8000`


## Sauvegarde des données (GitHub Pages)
GitHub Pages est un hébergement **statique** (lecture seule), donc l'app ne peut pas écrire dans le dossier du site.
Solution recommandée : **Exporter / Importer**.

- **Exporter JSON** : télécharge un fichier `gestion-projets-backup_....json`
- **Importer JSON** : recharge un backup (puis rechargement)

➡️ Les données restent aussi enregistrées localement sur l'appareil via le stockage du navigateur.


## Zone (projet)
Au démarrage, l'app demande une **zone** (SKOURA/SEFROU/RABAT/CASA). Tu peux changer la zone via le bouton **Zone** en haut.
