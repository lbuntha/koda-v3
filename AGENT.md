# Koda v3 Development Instructions

Before changing code, read:

1. KODA_V3_MVP_BLUEPRINT.md
2. AI_BUILD_RULES.md
3. asset-manifest.example.json
4. drag-apples-to-jar.activity.json

## Product terminology

Koda is an education platform.

Use these terms:

- learning activity
- activity engine
- activity runtime
- learning object
- learner
- learner attempt
- lesson session
- feedback
- progress
- reward

Do not use these terms in project naming:

- game
- gameplay
- player
- game engine
- game scene
- game object

Phaser may be used internally as the visual interaction runtime.

## Technology

- ReactJS
- TypeScript
- Vite
- Tailwind CSS
- Phaser
- FastAPI
- Python
- MongoDB
- Pydantic
- PyMongo or Motor
- Docker Compose

## Architecture

- React owns application UI, routing, feedback, and API communication.
- Phaser owns visual learning interactions and animation.
- Phaser must never call FastAPI directly.
- FastAPI owns business logic and persistence.
- MongoDB stores learners, lesson sessions, attempts, progress, and rewards.
- Learning activities are driven by definitions, not custom-coded screens.
- Use asset keys instead of hard-coded file paths.
- Reuse existing components before creating new components.

## MVP boundaries

Build only:

- application shell
- learner home
- learning path
- lesson shell
- drag-to-container activity engine
- correct and incorrect feedback
- lesson completion
- learner progress
- basic rewards
- FastAPI persistence

Do not build:

- subject management
- grade management
- unit management
- skill authoring
- question authoring
- advanced admin tools
- payment
- subscription
- adaptive mastery

## Standard engine location

Use:

src/engines/drag-to-container/

The engine must follow the structure documented in
KODA_V3_MVP_BLUEPRINT.md.

## Branding

Use only the named Tailwind tokens.

- brand-50: #EEEDFE
- brand-500: #534AB7
- brand-900: #26215C
- reward-amber: #EF9F27
- status-danger: #E24B4A
- status-success: #3B6D11

Do not hard-code these colors in components.

## Quality rules

- TypeScript strict mode
- No `any`
- Keep API routes thin
- Use service and repository layers
- Add tests for validators and API services
- Support mobile, tablet, and desktop
- Use touch-friendly controls
- Clean up Phaser event listeners when the runtime unmounts
- Do not duplicate activity implementations
- Do not silently change architecture
- Ask before introducing a major dependency

## Work process

For each task:

1. Inspect the repository.
2. Explain the proposed implementation plan.
3. List the files to create or change.
4. Implement only the requested phase.
5. Run formatting, linting, type checking, and tests.
6. Report failures honestly.
7. Summarize changed files.
8. Do not start the next phase automatically.