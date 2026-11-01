# UN INSTANT DANS LE TEMPS ❤️

> *« Je ne peux pas remonter le temps pour changer ce qui s'est passé, mais je peux reconnaître mes erreurs, apprendre de cette situation et faire mieux à l'avenir. »*

Une expérience web romantique, cinématique et immersive conçue pour présenter des excuses sincères et réparer un moment précieux à travers un voyage interactif dans le temps.

---

## ✨ Caractéristiques de l'expérience

1. **Écran 1 — Introduction (Le Départ)** :
   - Horloge ancienne animée avec aiguilles mécaniques et cadran vintage en or champagne.
   - Fond bordeaux sombre, lumière dorée et pluie douce de pétales de roses.
   - Typographie soignée (*Cormorant Garamond* et *Alex Brush*).
   - Bouton cinématique *« Entrer dans notre histoire »* avec démarrage fluide de l'ambiance sonore.

2. **Écran 2 — Voyage dans le temps (Rembobinage)** :
   - Animation spectaculaire : l'horloge tourne à l'envers, vortex temporel et distorsion lumineuse.
   - Les pétales remontent le flux du temps.
   - Compteur de dates qui défile en arrière jusqu'au jour symbolique de l'événement.
   - Son de rembobinage et carillon céleste à l'arrivée.

3. **Écran 3 — Ce jour-là (Le Souvenir)** :
   - Mise en scène immersive avec photographie romantique en arrière-plan.
   - Révélation progressive et poétique des explications et de la reconnaissance de la déception causée.

4. **Écran 4 — La Lettre d'excuses (Séquence Émotionnelle Principale)** :
   - Enveloppe vintage réaliste avec sceau de cire rouge rubis orné d'un cœur en relief 3D.
   - Interaction tactile : au clic, le sceau se brise avec un craquement sonore et l'enveloppe s'ouvre.
   - La lettre en papier parchemin se déplie avec les mots exacts d'excuses et la signature calligraphique.

5. **Écran 5 — Surprise finale interactive (Demain)** :
   - Première étape : *« Si le temps pouvait nous offrir une nouvelle occasion de partager un beau moment, accepterais-tu de m'en offrir une ? »*
   - Deuxième étape : L'horloge s'arrête (le passé est figé), cœur lumineux vibrant, pluie de pétales et feux dorés.
   - Troisième étape : Carte finale *« Et si nous écrivions un nouveau souvenir ensemble ? ❤️ »*.
   - Choix bienveillant : Bouton d'acceptation avec suggestions de rendez-vous (dîner aux chandelles, balade étoilée, escapade surprise) OU option douce *« J'ai besoin d'un peu de temps »* sans aucune pression.

---

## 🎨 Palette artistique

- **Bordeaux profond** : `#3B101D`
- **Rouge cerise** : `#711F35`
- **Or champagne** : `#D6B77A`
- **Rose poudré** : `#E8C7CB`
- **Ivoire** : `#FFF4E8`

---

## 🎵 Ambiance sonore et Web Audio API

L'application intègre un moteur hybride intelligent :
- **Fichiers audio personnalisables** dans le dossier `public/audio/` (`music.mp3`, `tick.mp3`, `rewind.mp3`, `open-letter.mp3`, `chime.mp3`).
- **Générateur Web Audio API procédural intégré** : même si aucun fichier MP3 n'est déposé, l'application génère en temps réel des accords d'ambiance harmoniques, le tic-tac mécanique de l'horloge, le balayage temporel du rembobinage, le craquement de la cire et le carillon final !
- Bouton de contrôle flottant pour couper/activer le son à tout moment.

---

## ⚙️ Personnalisation facile

Toutes les données (prénoms, surnoms, date de l'événement, textes, lettres, options) sont centralisées dans :

```
src/config/story.ts
```

Il suffit de modifier ce fichier pour adapter le contenu :
- `recipient.name` : Prénom de votre bien-aimée.
- `recipient.nickname` : Surnom d'affection.
- `event.symbolicDate` : Date exacte de l'événement.
- `letter.paragraphs` : Paragraphes de la lettre.
- `finale.suggestedMoments` : Vos propositions de moments à deux.

---

## 🚀 Lancement local

### Prérequis
- [Node.js](https://nodejs.org) (version 18+)
- npm ou pnpm

### Installation et démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans votre navigateur
http://localhost:3000
```

### Build de production

```bash
npm run build
npm run start
```

---

## 🌐 Déploiement sur Vercel

Le projet est configuré et testé pour un déploiement instantané sur Vercel :

1. Déposez ce dossier sur GitHub / GitLab.
2. Rendez-vous sur [Vercel](https://vercel.com) et cliquez sur **Add New > Project**.
3. Importez votre dépôt et cliquez sur **Deploy**.
4. Partagez le lien avec votre moitié ❤️.
