# TimeTravel Agency — Front (jet 1)

Date: 2026-07-09

## But
Webapp Next.js présentant TimeTravel Agency + ses 3 destinations temporelles. Style luxe/historique. Front d'abord, design affiné après.

## Scope
- Accueil: hero vidéo fond, présentation agence, CTA destinations.
- Galerie `/destinations`: 3 cards interactives.
- Détail `/destinations/[slug]`: hero, année, description, highlights, CTA "Réserver".

## Hors scope (ce jet)
Chatbot IA, formulaire réservation (CTA seulement), backend/persistance, i18n (FR only).

## Stack
Next.js 16 App Router, TypeScript, Tailwind CSS v4, React Server Components par défaut.

## Destinations
1. `paris-1889` — Paris 1889, Exposition Universelle & Belle Époque.
2. `cretace` — Crétacé -65M, derniers jours des dinosaures.
3. `florence-1504` — Renaissance Florence 1504, âge d'or artistique.

## Assets
Depuis `contenu généré/` → `public/media/<dest>/{hero,square,portrait,video}`.
- Paris: `Paris hero.jpeg`, `Paris 1-1.jpeg`, `Paris 9-16.png`, `paris video.mp4`
- Crétacé: `Cretace hero.png`, `Cretace 1-1.png`, `Cretace 9-16.png`, `cretace video.mp4`
- Florence: `Florence hero.png`, `Gemini 1-1.png`, `Gemini 9-16.png`, `florence video.mp4`

## Structure
```
app/{layout,page,globals.css}
app/destinations/{page, [slug]/page}
components/{Header,Footer,Hero,DestinationCard,CTAButton}
lib/destinations.ts
public/media/<dest>/*
```

## Style
Palette sombre + or, serif display titres + sans corps, espace généreux, transitions douces.
