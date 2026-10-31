# Agrivion — Version 3

**Smarter Fields. Better Decisions. Stronger Farmers.**

A professional public website for Agrivion's smart-farming ecosystem, combining agricultural robotics, crop guidance and farmer community. The interface uses clear navigation, readable light layouts and straightforward controls. This repository contains the frontend and original project assets.

Agrivion is in the building and testing phase. Rover movement, GPS navigation, market prices and other interactive demonstrations use illustrative data. They do not connect to real hardware or live agricultural services.

## Explore the site

- **Home:** product overview, useful feature summaries, clear next steps and an accessible app design gallery.
- **Ecosystem:** crop and soil guidance, crop observations, disease and pest support concepts, sample market comparisons, scheme links, experts, community and farm accounts.
- **Rover:** original concept imagery and CAD studies, modular tools and development plans.
- **Technology:** control architecture, navigation, safety and validation approach.
- **Rover Demo:** continuous manual driving, automatic coverage routes, optional custom waypoints, emergency stop and fullscreen view.
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

## Interface and demos

The public interface uses a steady navigation bar and direct links to the rover, farmer app, demo, company information and contact details. Presentation controls, custom cursor effects, magnetic buttons and word-by-word animations are disabled.

The app gallery has six labelled screen choices, previous/next controls and an enlarged original-image view. The engineering panel switches between original CAD and a steering geometry study. The rover demo offers manual control and GPS navigation with sample routes. All engineering illustrations and field values are demonstrations, not validated hardware specifications.

## Technology

React 19, TypeScript, TanStack Router/Start, Vite 8, Tailwind CSS, Motion for React, GSAP, Radix UI, Three.js/React Three Fiber and Lucide icons. The site respects reduced-motion preferences and supports keyboard and touch interaction.

## Assets and source material

- `public/Agrivion-Synopsis.pdf` — original Agrivion project synopsis.
- `public/media/` — original logo, app interface concepts, CAD studies and other synopsis figures.
- `src/assets/` — website concept imagery.

Concept imagery, prototype references and unverified research illustrations are labelled in the site. The original PDF remains available for reference.

The project began from a Lovable export and was subsequently developed locally. Local backups, installed dependencies, credentials and generated builds are excluded from version control.
