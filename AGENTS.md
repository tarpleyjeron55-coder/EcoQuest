# EcoQuest

## Cursor Cloud specific instructions

### Overview

EcoQuest is a single-service Expo React Native app (prototype). It runs on web via Expo's bundler. No backend, database, or external services are required.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Type-check | `npm run typecheck` |
| Start dev (web) | `npx expo start --web --port 8081` |
| Start dev (all) | `npm start` |

### Dev server notes

- The web app runs at `http://localhost:8081` by default.
- First bundle takes ~3s; subsequent hot-reloads are fast.
- Expo may print "2 packages may need updating" — this is informational, not blocking.
- There is no lint script configured in the repository yet; `npm run typecheck` (tsc --noEmit) is the primary static analysis check.
- No tests are currently configured. TypeScript type-checking is the available verification.

### Project structure

- `App.tsx` — Full single-file UI with all screens (Home, Onboarding, Feed, Map, Shop, Profile)
- `src/ecoquestData.ts` — Seed data (tasks, feed posts, wardrobe items, tips, badges)
- `index.ts` — Expo entry point
- `docs/` — Product requirements, architecture notes, screen mockups
