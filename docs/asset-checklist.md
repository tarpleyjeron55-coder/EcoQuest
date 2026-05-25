# Asset and service checklist

This prototype implements the flows that can be done locally in Expo. To move toward a production Android and iOS app, gather the items below.

## App branding assets

- App icon source artwork, ideally vector or 1024 x 1024 PNG. Initial repository asset: `assets/icon.png`.
- Android adaptive icon foreground, 432 x 432 PNG with safe-area padding. Initial repository asset: `assets/adaptive-icon.png`.
- Android adaptive icon background color or background image. Initial color: `#001C4F`.
- iOS icon export, 1024 x 1024 PNG, no transparency. Initial repository asset: `assets/icon.png`.
- Splash screen artwork or logo, preferably centered on a solid brand color. Initial repository asset: `assets/splash.png`.
- Brand colors with contrast-approved light and dark variants.
- App store screenshots or design comps for phone sizes.
- App store short description, long description, keywords, support URL, and privacy policy URL.

## Avatar and wardrobe assets

- Decision on avatar pipeline: VRM, Unity, Three.js, Ready Player Me, or custom 2D/3D.
- Base avatar models for each supported body or gender expression.
- Skin tone, face, hair, and representation options approved by an artist and inclusion reviewer.
- Rigged clothing/accessory assets: hats, jackets, shoes, backpacks, face accessories, hairstyles, and seasonal items.
- Item thumbnails for the wardrobe grid.
- Rarity and category metadata for every cosmetic.
- Avatar idle animation and turntable animation.

## Task and content assets

- Reviewed task catalog with category, difficulty, point value, recurrence, safety note, and evidence requirements.
- Environmental tips with sources for factual claims.
- Badge names, badge artwork, unlock rules, and descriptions.
- Empty states, error states, and moderation rejection copy.

## Backend and service details

- Firebase project for development, staging, and production.
- Firebase Auth providers: email/password, Google, and Apple configuration.
- Cloud Storage bucket or AWS S3 bucket for submission photos.
- Image recognition provider choice: Google Vision API or AWS Rekognition.
- Google Maps API key with Android and iOS restrictions.
- Firebase Cloud Messaging setup for Android and Apple Push Notification service setup for iOS.
- Analytics and crash reporting decision, for example Firebase Analytics and Crashlytics.

## Compliance and safety materials

- Privacy policy covering photos, location, minors, moderation, and data retention.
- Terms of service and community guidelines.
- COPPA/GDPR age-gating and parental consent requirements if minors can use the app.
- Moderation policy with approve/reject/escalate criteria.
- Data retention policy for rejected photos and exact coordinates.
- Abuse reporting flow and support contact.

## Native app configuration

- Android package name, for example `com.yourcompany.ecoquest`.
- iOS bundle identifier, for example `com.yourcompany.ecoquest`.
- App display name confirmation.
- Android signing key and Play Console account access.
- Apple Developer account team ID and app record.
- Production domains for privacy policy, support, and password reset links.

## Features still requiring native/service integration

The current prototype mocks these pieces and does not yet perform real device or backend work:

- Camera capture and image picker.
- Location permission prompts and GPS reading.
- Authenticated user accounts.
- Persistent Firestore or database storage.
- Photo upload to cloud storage.
- Automated image recognition.
- Human moderation dashboard.
- Push notifications.
- Real Google Maps rendering.
- Production 3D avatar rendering.

## Current icon files

- `assets/icon.png` - Expo app icon for iOS and general app metadata.
- `assets/adaptive-icon.png` - Android adaptive icon foreground.
- `assets/favicon.png` - Web favicon.
- `assets/splash.png` - Splash screen artwork.

If you have the original high-resolution icon file, replace `assets/icon.png` with that source and regenerate the other exports from it.
