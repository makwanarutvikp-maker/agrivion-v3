# Agrivion — Version 2

**Smarter Fields. Better Decisions. Stronger Farmers.**

A responsive presentation website for Agrivion's smart-farming ecosystem, combining agricultural robotics, crop guidance and farmer community. This repository contains the Version 2 frontend and original project assets.

Agrivion is in the building and testing phase. Rover movement, GPS navigation, market prices and other interactive demonstrations use illustrative data. They do not connect to real hardware or live agricultural services.

## Explore the site

- **Home:** cinematic hero, animated typography, scroll effects and a large app design gallery.
- **Ecosystem:** crop and soil guidance, crop observations, disease and pest support concepts, sample market comparisons, scheme links, experts, community and farm accounts.
- **Rover:** original concept imagery and CAD studies, modular tools and development plans.
- **Technology:** control architecture, navigation, safety and validation approach.
- **Field Lab:** continuous manual driving, automatic coverage routes, custom waypoints, operation effects, emergency stop and fullscreen presentation.
- **Intelligence:** illustrative computer-vision and satellite-monitoring interfaces.
- **Applications:** spraying, cultivation, scouting and research use cases.
- **About:** project proposer, methodology, development phases and proposed business models.
- **Contact:** collaboration details and an email-draft form.

## Run locally

Use Node.js 24 or a compatible version supported by Vite 8, and npm.

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. To choose an explicit local port:

```sh
npm run dev -- --host 127.0.0.1 --port 5174
```

## Checks and production build

```sh
npm test
npx tsc --noEmit
npm run build
```

The project uses the existing TanStack Start/Vite setup. Production files are generated in `.output/`. No backend feature services, database or hardware integration are implemented.

## Technology

React 19, TypeScript, TanStack Router/Start, Vite 8, Tailwind CSS, Motion for React, GSAP, Radix UI, Three.js/React Three Fiber and Lucide icons. The site respects reduced-motion preferences and supports keyboard and touch interaction.

## Assets and source material

- `public/Agrivion-Synopsis.pdf` — original Agrivion project synopsis.
- `public/media/` — original logo, app interface concepts, CAD studies and other synopsis figures.
- `src/assets/` — website concept imagery.

Concept imagery, prototype references and unverified research illustrations are labelled in the site. The original PDF remains available for reference.

The project began from a Lovable export and was subsequently developed locally. Local backups, installed dependencies, credentials and generated builds are excluded from version control.
