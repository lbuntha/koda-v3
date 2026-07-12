# Koda v3 MVP Blueprint

## 1. MVP Goal

Build the first working Koda learning experience using:

- ReactJS for the application UI
- Phaser for visual learning interactions and animation
- FastAPI for API and business logic
- MongoDB for persistence
- Tailwind CSS for branding and responsive UI

The MVP must focus on the application experience shown in the reference designs:

1. Welcome
2. Sign up
3. Learner profile
4. Daily goal
5. Learning path
6. Learning activity
7. Correct feedback
8. Incorrect feedback
9. Lesson complete
10. Progress
11. Rewards
12. Profile
13. Parent area

Do not build subject, grade, unit, skill, or question authoring in the first MVP.

The first reusable learning activity is:

`drag-to-container`

Example:

- Drag apples into a jar
- Drag stars into a chest
- Drag shapes into matching containers

---

## 2. Monorepo Structure

```text
koda-v3/
├─ apps/
│  ├─ learner-web/
│  ├─ admin-web/
│  └─ api/
├─ packages/
│  ├─ learning-ui/
│  ├─ theme/
│  ├─ activity-core/
│  ├─ activity-schema/
│  ├─ asset-catalog/
│  └─ shared-types/
├─ content/
│  ├─ activities/
│  └─ asset-manifests/
├─ docs/
├─ .ai/
└─ docker-compose.yml
```

---

## 3. Learner Web Structure

```text
apps/learner-web/
├─ public/
│  └─ assets/
│     ├─ brand/
│     ├─ characters/
│     ├─ objects/
│     ├─ containers/
│     ├─ backgrounds/
│     ├─ feedback/
│     ├─ rewards/
│     ├─ icons/
│     ├─ audio/
│     └─ effects/
│
└─ src/
   ├─ app/
   │  ├─ router/
   │  ├─ providers/
   │  └─ layouts/
   │
   ├─ features/
   │  ├─ onboarding/
   │  ├─ learner-profile/
   │  ├─ daily-goal/
   │  ├─ learning-path/
   │  ├─ lesson-session/
   │  ├─ progress/
   │  ├─ rewards/
   │  ├─ profile/
   │  └─ parent-area/
   │
   ├─ core/
   │  ├─ activity-engine/
   │  ├─ lesson-engine/
   │  ├─ feedback-engine/
   │  ├─ hint-engine/
   │  ├─ audio-engine/
   │  ├─ reward-engine/
   │  └─ asset-engine/
   │
   ├─ engines/
   │  └─ drag-to-container/
   │
   ├─ components/
   │  ├─ ui/
   │  ├─ layout/
   │  ├─ activity/
   │  ├─ feedback/
   │  ├─ learner/
   │  └─ navigation/
   │
   ├─ services/
   ├─ stores/
   ├─ hooks/
   ├─ types/
   └─ styles/
```

---

## 4. Standard Drag-to-Container Engine

```text
src/engines/drag-to-container/
├─ index.ts
├─ DragToContainerEngine.ts
├─ DragToContainerRenderer.tsx
├─ DragToContainerCanvas.tsx
├─ DragToContainerController.ts
├─ DragToContainerValidator.ts
├─ DragToContainerAdapter.ts
├─ DragToContainer.types.ts
├─ DragToContainer.schema.ts
├─ DragToContainer.events.ts
├─ DragToContainer.constants.ts
├─ DragToContainer.test.ts
│
├─ runtime/
│  ├─ ActivityScene.ts
│  ├─ createActivityRuntime.ts
│  ├─ LearningObject.ts
│  ├─ ContainerObject.ts
│  ├─ DragInteractionManager.ts
│  ├─ PlacementManager.ts
│  ├─ ActivityAnimationManager.ts
│  └─ ActivityAudioManager.ts
│
├─ components/
│  ├─ ActivityInstruction.tsx
│  ├─ ActivityCounter.tsx
│  ├─ ActivityToolbar.tsx
│  └─ ActivityFallback.tsx
│
├─ assets/
│  ├─ keys.ts
│  ├─ manifest.ts
│  └─ preload.ts
│
└─ examples/
   ├─ apples-to-jar.activity.json
   ├─ stars-to-chest.activity.json
   └─ shapes-to-baskets.activity.json
```

### Responsibilities

- `Engine`: lifecycle and orchestration
- `Renderer`: connects definition to React UI
- `Canvas`: hosts Phaser
- `Controller`: commands and state transitions
- `Validator`: checks learner response
- `Adapter`: converts generic activity data
- `ActivityScene`: renders and animates learning objects
- `DragInteractionManager`: drag behavior
- `PlacementManager`: drop-zone behavior
- `ActivityAudioManager`: instruction and feedback audio

---

## 5. Core Activity Engine

```text
src/core/activity-engine/
├─ ActivityEngine.ts
├─ ActivityRegistry.ts
├─ ActivityRenderer.tsx
├─ ActivityProvider.tsx
├─ ActivityContext.ts
├─ ActivityStateMachine.ts
├─ ActivitySession.ts
├─ Activity.types.ts
├─ Activity.events.ts
│
├─ runtime/
│  ├─ RuntimeHost.tsx
│  ├─ RuntimeBridge.ts
│  ├─ RuntimeEventBus.ts
│  └─ RuntimeCommandBus.ts
│
├─ state/
│  ├─ createActivityStore.ts
│  ├─ activityActions.ts
│  ├─ activityReducer.ts
│  └─ activitySelectors.ts
│
└─ validation/
   ├─ validateActivityDefinition.ts
   └─ validateActivityResult.ts
```

The core activity engine must not know about apples, jars, stars, or chests.

---

## 6. Standard Activity Definition

```json
{
  "id": "drag-apples-to-jar-001",
  "type": "drag-to-container",
  "title": "Put apples in the jar",
  "instruction": {
    "text": "Put five apples into the jar.",
    "audioKey": "audio.instruction.put-five-apples"
  },
  "scene": {
    "backgroundAssetKey": "background.meadow.day"
  },
  "objects": {
    "arrangement": "scattered",
    "items": [
      { "id": "apple-1", "assetKey": "object.apple.red" },
      { "id": "apple-2", "assetKey": "object.apple.red" },
      { "id": "apple-3", "assetKey": "object.apple.red" },
      { "id": "apple-4", "assetKey": "object.apple.red" },
      { "id": "apple-5", "assetKey": "object.apple.red" },
      { "id": "apple-6", "assetKey": "object.apple.red" }
    ]
  },
  "containers": [
    {
      "id": "jar-1",
      "assetKey": "container.jar.star",
      "capacity": 5
    }
  ],
  "interaction": {
    "allowReturn": true,
    "snapToContainer": true,
    "showDropHighlight": true
  },
  "validation": {
    "rule": "exact-count",
    "expectedCount": 5
  },
  "feedback": {
    "correct": {
      "title": "Great job!",
      "message": "You placed five apples in the jar.",
      "mascotEmotion": "celebrating"
    },
    "incorrect": {
      "title": "Let's try again!",
      "message": "Count every apple slowly.",
      "mascotEmotion": "thinking"
    }
  },
  "reward": {
    "coins": 10,
    "stars": 3
  }
}
```

---

## 7. Standard Asset Collection for MVP

### 7.1 Brand

```text
assets/brand/
├─ koda-logo-horizontal.svg
├─ koda-logo-stacked.svg
├─ koda-symbol.svg
└─ app-icon.png
```

### 7.2 Koda Character

```text
assets/characters/koda/
├─ idle.png
├─ welcome.png
├─ pointing.png
├─ thinking.png
├─ encouraging.png
├─ celebrating.png
├─ reading.png
└─ sad-soft.png
```

Recommended export:

- PNG with transparent background
- 1024 × 1024 master
- 512 × 512 web version
- Keep consistent character scale and outfit

### 7.3 Learning Objects

```text
assets/objects/
├─ fruits/
│  ├─ apple-red.png
│  ├─ orange.png
│  ├─ banana.png
│  └─ strawberry.png
├─ shapes/
│  ├─ circle-red.png
│  ├─ circle-blue.png
│  ├─ square-yellow.png
│  ├─ triangle-green.png
│  └─ star-amber.png
├─ numbers/
│  ├─ number-1.png
│  ├─ number-2.png
│  ├─ number-3.png
│  ├─ number-4.png
│  └─ number-5.png
└─ classroom/
   ├─ pencil.png
   ├─ book.png
   └─ block.png
```

### 7.4 Containers

```text
assets/containers/
├─ jars/
│  ├─ jar-star.png
│  ├─ jar-red.png
│  ├─ jar-blue.png
│  └─ jar-green.png
├─ chests/
│  ├─ treasure-chest-open.png
│  └─ treasure-chest-closed.png
├─ baskets/
│  ├─ basket-red.png
│  ├─ basket-blue.png
│  └─ basket-green.png
└─ boxes/
   ├─ box-circle.png
   ├─ box-square.png
   └─ box-triangle.png
```

### 7.5 Backgrounds

```text
assets/backgrounds/
├─ lesson-soft-purple.png
├─ meadow-day.png
├─ meadow-night.png
├─ classroom-soft.png
└─ plain-soft-fill.png
```

### 7.6 Feedback

```text
assets/feedback/
├─ correct-sparkles.png
├─ correct-confetti.png
├─ incorrect-soft-cloud.png
├─ hint-lightbulb.png
├─ check-green.png
└─ retry-red.png
```

### 7.7 Rewards

```text
assets/rewards/
├─ coin.png
├─ star-filled.png
├─ star-empty.png
├─ streak-flame.png
├─ trophy.png
└─ badge-first-step.png
```

### 7.8 Icons

```text
assets/icons/
├─ audio.svg
├─ close.svg
├─ back.svg
├─ replay.svg
├─ hint.svg
├─ check.svg
├─ heart.svg
├─ settings.svg
├─ profile.svg
└─ home.svg
```

### 7.9 Effects

```text
assets/effects/
├─ drop-glow.png
├─ placement-ring.png
├─ sparkle-small.png
├─ sparkle-large.png
└─ trail-dot.png
```

### 7.10 Audio

```text
assets/audio/
├─ ui/
│  ├─ tap.mp3
│  ├─ open.mp3
│  └─ close.mp3
├─ activity/
│  ├─ drag-start.mp3
│  ├─ drop-valid.mp3
│  ├─ drop-invalid.mp3
│  └─ object-count.mp3
├─ feedback/
│  ├─ correct.mp3
│  ├─ incorrect-soft.mp3
│  └─ lesson-complete.mp3
└─ instructions/
   └─ put-five-apples.mp3
```

---

## 8. Asset Naming Rules

Use semantic asset keys.

```text
object.apple.red
object.shape.circle.red
container.jar.star
container.chest.open
background.meadow.day
character.koda.thinking
feedback.correct.sparkles
reward.coin
icon.audio
audio.feedback.correct
```

Do not reference raw file paths inside activities.

Good:

```json
{ "assetKey": "object.apple.red" }
```

Avoid:

```json
{ "src": "/assets/objects/fruits/apple-red.png" }
```

---

## 9. Asset Manifest Shape

```json
{
  "version": "1.0.0",
  "assets": {
    "object.apple.red": {
      "type": "image",
      "src": "/assets/objects/fruits/apple-red.png",
      "width": 256,
      "height": 256,
      "tags": ["object", "fruit", "red", "counting"]
    },
    "container.jar.star": {
      "type": "image",
      "src": "/assets/containers/jars/jar-star.png",
      "width": 512,
      "height": 512,
      "tags": ["container", "jar", "drop-target"]
    }
  }
}
```

---

## 10. React and Phaser Boundary

React owns:

- routing
- onboarding
- profiles
- progress
- navigation
- buttons
- answer controls
- feedback panels
- lesson completion
- responsive layout
- API communication

Phaser owns:

- draggable learning objects
- drop zones
- object placement
- visual counting
- movement
- animation
- particle effects
- scene audio timing

Phaser must not call the API directly.

---

## 11. Runtime Events

```ts
export type ActivityEvent =
  | { type: "ACTIVITY_READY" }
  | { type: "OBJECT_DRAG_STARTED"; objectId: string }
  | { type: "OBJECT_PLACED"; objectId: string; containerId: string }
  | { type: "OBJECT_RETURNED"; objectId: string }
  | { type: "PLACEMENT_REJECTED"; objectId: string }
  | { type: "RESPONSE_CHANGED"; placedCount: number }
  | { type: "ACTIVITY_SUBMITTED" }
  | { type: "ACTIVITY_COMPLETED"; isCorrect: boolean };
```

```ts
export type ActivityCommand =
  | { type: "START_ACTIVITY" }
  | { type: "RESET_ACTIVITY" }
  | { type: "SHOW_HINT" }
  | { type: "PLAY_CORRECT_FEEDBACK" }
  | { type: "PLAY_INCORRECT_FEEDBACK" }
  | { type: "SET_REDUCED_MOTION"; enabled: boolean };
```

---

## 12. FastAPI Structure

```text
apps/api/
├─ app/
│  ├─ main.py
│  ├─ core/
│  │  ├─ config.py
│  │  ├─ logging.py
│  │  ├─ security.py
│  │  └─ exceptions.py
│  ├─ api/
│  │  ├─ dependencies.py
│  │  └─ v1/
│  │     ├─ auth.py
│  │     ├─ learners.py
│  │     ├─ learning_paths.py
│  │     ├─ lesson_sessions.py
│  │     ├─ activity_attempts.py
│  │     ├─ progress.py
│  │     └─ rewards.py
│  ├─ domain/
│  ├─ models/
│  ├─ schemas/
│  ├─ repositories/
│  ├─ services/
│  ├─ db/
│  └─ tests/
└─ requirements.txt
```

Route files must remain thin.

```text
route → service → repository → MongoDB
```

---

## 13. MongoDB MVP Collections

Only create the collections required by the MVP:

```text
users
learners
learning_paths
lessons
activities
lesson_sessions
activity_attempts
learner_progress
reward_transactions
daily_goals
asset_manifests
```

### activity_attempts

```json
{
  "_id": "attempt-id",
  "learnerId": "learner-id",
  "lessonSessionId": "session-id",
  "activityId": "drag-apples-to-jar-001",
  "activityType": "drag-to-container",
  "attemptNumber": 1,
  "response": {
    "containerId": "jar-1",
    "placedObjectIds": [
      "apple-1",
      "apple-2",
      "apple-3",
      "apple-4",
      "apple-5"
    ]
  },
  "isCorrect": true,
  "durationMs": 18420,
  "createdAt": "2026-07-13T00:00:00Z"
}
```

---

## 14. MVP Screens

Build these screens first:

```text
/onboarding/welcome
/onboarding/sign-up
/onboarding/learner-profile
/onboarding/daily-goal
/home
/lesson/:lessonId
/lesson/:lessonId/complete
/progress
/rewards
/profile
/parent
```

The lesson screen uses one reusable layout:

```text
LessonShell
├─ LessonHeader
├─ InstructionBar
├─ ActivityStage
│  └─ DragToContainerRenderer
├─ ActivityToolbar
├─ FeedbackPanel
└─ LessonActionBar
```

---

## 15. Tailwind Brand Tokens

```ts
colors: {
  brand: {
    50: "#EEEDFE",
    100: "#E0DCFC",
    200: "#C4C2F7",
    300: "#A7A3EF",
    400: "#7F76E1",
    500: "#534AB7",
    600: "#443AA0",
    700: "#373080",
    800: "#2F286D",
    900: "#26215C"
  },
  reward: {
    amber: "#EF9F27"
  },
  status: {
    danger: "#E24B4A",
    success: "#3B6D11"
  }
}
```

Use:

- `brand-50` for soft fills
- `brand-500` for primary buttons and active states
- `brand-900` for text on tinted surfaces
- `reward-amber` for coins and stars
- `status-danger` for hearts, streak warnings, and incorrect states
- `status-success` for correct states and progress

---

## 16. MVP Implementation Order

### Step 1 — Foundation

- monorepo
- React app
- FastAPI app
- MongoDB connection
- Tailwind theme
- shared UI components
- asset manifest loader

### Step 2 — Main Application Flow

- welcome
- sign up
- learner profile
- daily goal
- learning path
- profile and rewards shell

### Step 3 — Activity Core

- activity registry
- activity renderer
- runtime bridge
- activity session state
- feedback states
- attempt submission

### Step 4 — Drag-to-Container

- object preload
- draggable object
- container drop zone
- snap behavior
- valid and invalid placement
- reset
- exact-count validation
- correct and incorrect feedback

### Step 5 — Persistence

- lesson session
- learner attempts
- progress
- coins and stars
- resume lesson

### Step 6 — Responsive Layout

- mobile portrait
- tablet landscape
- desktop web

---

## 17. MVP Definition of Done

The MVP is complete when a learner can:

1. create or select a profile
2. enter the learning path
3. open a lesson
4. hear an instruction
5. drag objects into a jar or chest
6. receive correct or incorrect feedback
7. retry the activity
8. complete the lesson
9. earn stars and coins
10. see progress and rewards
11. resume an unfinished lesson

The same `drag-to-container` engine must support at least:

- apples to jar
- stars to chest
- shapes to matching baskets

No duplicated activity implementation is allowed.
