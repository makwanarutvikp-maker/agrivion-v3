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

## Present the project

Select **Present** on the homepage to enable the eight-section pitch controls. Use the arrows or Page Up/Page Down to move between sections, **Shift+D** to open the rover demo, and **Esc** to exit. Presentation shortcuts are inactive in form controls and the steering study.

The app gallery includes a guided **Play app tour** control alongside manual navigation. The engineering panel switches between the original annotated CAD and an interactive **Steer it** geometry study. The homepage field preview also supports sample lane changes and a latched emergency stop. All engineering illustrations and field values are demonstrations, not validated hardware specifications.

## Technology

React 19, TypeScript, TanStack Router/Start, Vite 8, Tailwind CSS, Motion for React, GSAP, Radix UI, Three.js/React Three Fiber and Lucide icons. The site respects reduced-motion preferences and supports keyboard and touch interaction.

## Assets and source material

- `public/Agrivion-Synopsis.pdf` — original Agrivion project synopsis.
- `public/media/` — original logo, app interface concepts, CAD studies and other synopsis figures.
- `src/assets/` — website concept imagery.

Concept imagery, prototype references and unverified research illustrations are labelled in the site. The original PDF remains available for reference.

The project began from a Lovable export and was subsequently developed locally. Local backups, installed dependencies, credentials and generated builds are excluded from version control.
