# TimeTravel Agency

Site vitrine d'une agence de voyages temporels de luxe. Trois destinations exclusives — **Paris 1889**, le **Crétacé**, la **Florence de 1504** — un quiz de recommandation, et un concierge IA propulsé par Google Gemini.

---

## Stack

| Domaine | Techno | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.2.10 |
| UI | [React](https://react.dev) | 19.2.4 |
| Styles | [Tailwind CSS](https://tailwindcss.com) (v4, config via `@theme`) | ^4 |
| Langage | TypeScript | ^5 |
| Lint | ESLint + `eslint-config-next` | ^9 |
| IA chatbot | Google Gemini API (`gemini-2.5-flash` par défaut) | v1beta |

Thème sombre & or, défini par variables CSS dans `app/globals.css`.

---

## Démarrage

Prérequis : Node.js 20+.

```bash
# 1. Dépendances
npm install

# 2. Variables d'environnement
cp .env.local.example .env.local
# puis renseigner GEMINI_API_KEY (clé : https://aistudio.google.com/apikey)

# 3. Serveur de dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | Lint ESLint |

---

## Variables d'environnement

| Clé | Requis | Défaut | Rôle |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ | — | Clé API Google Gemini (côté serveur, jamais exposée au client) |
| `GEMINI_MODEL` | ❌ | `gemini-2.5-flash` | Modèle Gemini utilisé par le chatbot |

Définies dans `.env.local` (non commité — voir `.gitignore`). Modèle d'exemple : `.env.local.example`.

---

## Structure

```
app/
  layout.tsx              # Layout racine, polices, Header/Footer/Chatbot
  page.tsx                # Page d'accueil
  globals.css             # Design system (variables CSS + Tailwind v4)
  destinations/
    page.tsx              # Galerie des 3 destinations
    [slug]/page.tsx       # Fiche détaillée d'une destination
  quiz/
    page.tsx              # Quiz interactif de recommandation
  api/
    chat/route.ts         # Backend du chatbot (proxy Gemini + system prompt)
components/
  Header.tsx              # Navigation fixe
  Footer.tsx              # Pied de page
  Hero.tsx                # Section héro
  DestinationCard.tsx     # Carte de destination
  CTAButton.tsx           # Bouton d'appel à l'action
  Chatbot.tsx             # Widget de chat flottant (client)
lib/
  destinations.ts         # Modèle + données des 3 destinations (source unique)
public/media/             # Images & vidéos par destination
```

---

## Fonctionnalités

### Destinations
Données centralisées dans `lib/destinations.ts` (type `Destination` : slug, ère, temps forts, infos pratiques, médias). Une seule source alimente la galerie, les fiches, le quiz et le catalogue du chatbot.

### Quiz de recommandation — `/quiz`
Quiz client interactif (6 questions). Chaque réponse vote pour une destination ; le total départage (égalité tranchée par l'ordre des destinations). Affiche la destination recommandée + explication personnalisée et lien vers sa fiche.

### Concierge IA — `components/Chatbot.tsx` + `app/api/chat/route.ts`
Widget de chat flottant. Le front POST les messages vers `/api/chat` ; la route serveur construit un system prompt à partir du catalogue (`lib/destinations.ts` + prix) et relaie à l'API Gemini. La clé API reste côté serveur. Historique limité aux 12 derniers messages.

---

## Notes

⚠️ **Next.js non standard** — ce projet peut différer des conventions habituelles. Consulter `node_modules/next/dist/docs/` avant d'écrire du code Next.js (voir `AGENTS.md`).

## Déploiement

Déploiement recommandé sur [Vercel](https://vercel.com/new). Penser à définir `GEMINI_API_KEY` (et `GEMINI_MODEL` si besoin) dans les variables d'environnement du projet.
