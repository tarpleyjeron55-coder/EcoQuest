# EcoQuest

EcoQuest is a mobile app concept that turns everyday climate-positive actions into a playful local challenge loop. This repository now contains an Expo React Native prototype and product documentation for the MVP path.

## What is included

- A static Expo prototype with tabs for Home, Onboarding, Feed, Map, Shop, and Profile.
- Seed data for daily tasks, weekly challenges, wardrobe items, tips, badges, and local feed posts.
- Product requirements and architecture notes for avatar customization, photo verification, geolocation, moderation, rewards, and privacy.
- Low-fidelity screen mockups for the character creator, task home, local feed, map, wardrobe, and profile.

## Getting started

```bash
npm install
npm run typecheck
npm start
```

Then open the Expo project on iOS, Android, or web from the Expo CLI.

## Available scripts

- `npm start` - start the Expo development server.
- `npm run ios` - start Expo for an iOS simulator.
- `npm run android` - start Expo for an Android emulator.
- `npm run web` - start Expo for web.
- `npm run typecheck` - run TypeScript validation.

## Documentation

- [Product requirements](docs/product-requirements.md)
- [Architecture notes](docs/architecture.md)
- [Screen mockups](docs/screen-mockups.md)

## MVP scope

The current app is a visual and interaction prototype. Production implementation still requires authentication, persistent storage, photo upload, ML verification, moderation tooling, map SDK integration, push notifications, and a real 3D avatar pipeline.
