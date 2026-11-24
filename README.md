# Portfolio – Ulrich Fosso

Site : https://karma1237-ops.github.io/Portfolio-GitHub-Ulrich/

Portfolio en **TypeScript** avec une scène 3D **Three.js**, des carrousels 3D animés par projet, un mode clair / sombre et le CV consultable en ligne.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html`, `styles.css` | Page et styles |
| `src/data.ts` | **Contenu à modifier** : projets, compétences, lien du CV (Google Drive) |
| `src/scene.ts` | Scène 3D du haut de page |
| `src/carousel.ts` | Carrousels des projets |
| `src/theme.ts`, `src/modals.ts` | Mode sombre, fenêtre du CV et vue agrandie |
| `assets/main.js` | Code compilé (généré, servi par GitHub Pages) |
| `public/media/` | Visites animées des projets (`.mp4` utilisés sur le site, `.gif` pour LinkedIn / README) |

## Modifier le site

```bash
npm install
npm run dev     # serveur local sur http://localhost:8000 avec recompilation automatique
npm run build   # vérifie les types puis génère assets/main.js
```

Après `npm run build`, faites un commit de `assets/main.js` avec vos sources : GitHub Pages publie la branche `main` telle quelle.

## Aperçus

![Ma Bibliothèque](public/media/biblio.gif)
![AutolocPro](public/media/autoloc.gif)
![Athletix](public/media/athletix.gif)
