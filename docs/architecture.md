# EcoQuest architecture notes

## Recommended stack

- Mobile app: React Native with Expo for rapid shared iOS and Android development.
- Avatar rendering: begin with a 2D placeholder, then evaluate VRM via Unity or Three.js, or Ready Player Me for a hosted SDK path.
- Auth: Firebase Auth with email/password, Google, and Apple sign-in.
- Primary datastore: Firestore for MVP user profiles, task assignments, feed posts, point ledger entries, and moderation state.
- Media storage: Google Cloud Storage or AWS S3 with private upload paths and signed read URLs.
- Automated image review: Google Vision API or AWS Rekognition.
- Push notifications: Firebase Cloud Messaging.
- Maps: Google Maps SDK with server-side geospatial bucketing.

## MVP data model

### User

- `id`
- `displayName`
- `avatarName`
- `avatarConfig`
- `pointBalance`
- `currentStreak`
- `privacySettings`
- `createdAt`

### Task template

- `id`
- `title`
- `category`
- `difficulty`
- `basePoints`
- `cadence`
- `evidenceLabels`
- `safetyNotes`
- `active`

### Assigned task

- `id`
- `userId`
- `taskTemplateId`
- `status`
- `assignedAt`
- `expiresAt`
- `completedAt`

### Submission

- `id`
- `userId`
- `assignedTaskId`
- `mediaPath`
- `submittedAt`
- `locationPrecision`
- `regionBucket`
- `automatedReview`
- `moderationStatus`
- `approvedAt`

### Feed post

- `id`
- `submissionId`
- `userId`
- `regionBucket`
- `visibility`
- `reactionCount`
- `createdAt`

### Point ledger entry

- `id`
- `userId`
- `sourceType`
- `sourceId`
- `points`
- `multiplier`
- `createdAt`

## Verification pipeline

1. User uploads photo to a private temporary media path.
2. Cloud Function creates a submission record and invokes automated image analysis.
3. The automated result marks the submission as likely approved, flagged, or rejected.
4. Flagged and low-confidence submissions enter the moderation queue.
5. Approval triggers a point ledger transaction and optional feed post creation.
6. Rejection keeps an audit record and notifies the user with a clear reason.

## Location privacy model

- Store exact coordinates only when explicit consent is granted and verification needs them.
- Derive region buckets server-side for feed and map queries.
- Never expose exact coordinates in public feed responses.
- Add rate limits and aggregation thresholds for hotspots to prevent re-identification.

## Moderation dashboard requirements

- Queue filters by category, confidence score, age sensitivity, location sensitivity, and report count.
- Side-by-side task evidence requirements and uploaded photo.
- Actions: approve, reject, request resubmission, escalate, ban media, and add moderator note.
- Full audit history for every decision.

## Scaling considerations

Firestore is suitable for early development, but high-volume local feeds will eventually need a dedicated service with geospatial indexing. A Node.js API backed by PostgreSQL and PostGIS can support richer proximity ranking, abuse analysis, and hotspot aggregation once feed traffic grows.
