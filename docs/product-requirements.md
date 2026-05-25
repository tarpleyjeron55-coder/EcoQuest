# EcoQuest product requirements

## Product vision

EcoQuest motivates users to take measurable environmental actions by combining task-based challenges, avatar progression, photo proof, and a privacy-preserving local community feed. Cosmetics are earned only through approved eco-actions; there is no real-money purchase path.

## Core personas

- New player: wants a friendly onboarding flow and a character that reflects them.
- Daily challenger: wants quick tasks, streak feedback, and clear rewards.
- Community participant: wants to see nearby impact without exposing precise personal location.
- Moderator: needs to review flagged submissions quickly and consistently.

## Feature requirements

### 1. Onboarding and character creation

- First launch opens a character creator inspired by Pokemon Go.
- Users choose an avatar base, avatar name, race or ethnicity representation, and a free starter outfit.
- The long-term avatar target is a cel-shaded, anime-inspired 3D character with expressive proportions.
- The MVP may use a static 2D or simplified 3D placeholder while the avatar pipeline matures.
- Onboarding must include age gating, consent, and location-sharing education before any geolocation prompt.

### 2. Avatar and customization system

- Avatar is persistent on the user profile and appears in feed posts.
- Wardrobe categories include hats, jackets, shoes, backpacks, face accessories, hairstyles, and seasonal items.
- Items have rarity, category, point cost, ownership state, and optional event availability.
- The shop preview should show the avatar on a rotating platform once 3D rendering is available.
- All cosmetics are earned with eco-points; no paid currency or cash purchase flow is allowed.

### 3. Task engine

- Each user receives 3 to 5 daily tasks and 1 to 2 weekly challenges.
- Categories: waste reduction, sustainable transport, nature and biodiversity, water conservation, energy saving, and community action.
- Tasks define title, category, difficulty, base point value, evidence requirements, recurrence, and verification labels.
- Weekly set completion grants a bonus multiplier.
- Task assignment should avoid unsafe, inaccessible, or location-inappropriate activities.

### 4. Photo submission and verification

- Users submit a photo as evidence for task completion.
- Each submission stores task ID, timestamp, uploader ID, verification status, and optional geolocation precision.
- Automated verification checks image plausibility with services such as AWS Rekognition or Google Vision API.
- Flagged, ambiguous, or safety-sensitive submissions enter a human moderation queue.
- Points are credited only after approval.
- Approved photos can become feed posts, subject to privacy settings.

### 5. Local community feed

- Feed shows approved nearby submissions with avatar, task, photo, approximate distance, neighborhood or city, and a leaf-style reaction.
- Exact addresses are never displayed.
- Users can choose whether approved submissions are public, friends-only, or private.
- Feed ranking should account for recency, proximity bucket, moderation quality, and abuse prevention.

### 6. Geolocation and map

- Location sharing is opt-in and supports exact, neighborhood, or city-only precision.
- Exact coordinates may be used privately for verification when the user consents.
- Public surfaces use anonymized pins and hotspot zones.
- The map should use colorblind-friendly styling and avoid exposing repeat home or school patterns.

### 7. Points and rewards economy

- Approved submissions grant base points by difficulty.
- Streaks multiply earnings within safe caps.
- Weekly challenges pay bonus points and can unlock badges or cosmetics.
- Points never expire.
- Fraud prevention must detect duplicate images, repeated submissions, and implausible task velocity.

### 8. Loading screens with eco-tips

- Loading screens rotate short environmental tips.
- Each tip has a category, headline, and one-sentence explanation.
- Tips can be themed to the task category or current screen.
- Tips should be sourced and reviewed before production use.

### 9. User profile and stats

- Profile shows avatar, total eco-points, current streak, task completion count, category breakdown, badges, and approved photo gallery.
- Visibility can be public or friends-only.
- Profile must include privacy controls for location, posts, and gallery visibility.

## Non-functional requirements

- Platforms: iOS and Android using React Native with Expo or bare React Native as needed.
- Accessibility: screen reader labels, scalable text, sufficient contrast, and colorblind-friendly map colors.
- Compliance: COPPA and GDPR readiness if minors can use the app, including age gates and parental consent flows.
- Security: authenticated uploads, private storage paths, signed media URLs, and server-side authorization checks.
- Moderation: human review tooling is required before broad social launch.
- Observability: log task assignment, verification decisions, moderation outcomes, and point grants for auditability.

## Development phases

### Phase 1: MVP

- Authentication and onboarding.
- Static avatar stand-in.
- Daily task engine.
- Photo upload.
- Basic point ledger.
- User profile and stats.

### Phase 2: Social layer

- Local feed.
- Geolocation precision controls.
- Map view.
- Reactions.
- Moderation queue.
- Streaks and weekly challenges.

### Phase 3: Polish and retention

- Full 3D avatar and wardrobe shop.
- Loading screen eco-tips.
- Badges and leaderboards.
- Push notifications.

### Phase 4: Growth

- Guild or team features.
- AR camera mode for identifying recyclables.
- NGO partnership integrations.
- Environmental event campaigns such as Earth Day challenges.
