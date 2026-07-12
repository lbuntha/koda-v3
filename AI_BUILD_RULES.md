# Koda v3 AI Build Rules

## Product language

Use:
- learning activity
- activity engine
- activity runtime
- learning object
- learner attempt
- lesson session
- feedback
- progress
- mastery

Do not use:
- game
- gameplay
- player
- game engine
- game score

## MVP boundaries

- Do not design subject, grade, unit, skill, or question authoring.
- Build the learner application flow first.
- Build only one activity engine first: drag-to-container.
- The engine must be reusable for different objects and containers.
- React owns application UI.
- Phaser owns visual interaction and animation.
- Phaser must never call APIs directly.
- FastAPI owns business logic and persistence.
- MongoDB stores sessions, attempts, progress, rewards, and manifests.

## Architecture rules

- Follow the standard engine folder structure.
- Use asset keys instead of raw paths.
- Keep route files thin.
- Use service and repository layers.
- Reuse UI components.
- Use Koda Tailwind tokens only.
- Do not hard-code colors.
- Do not duplicate activity-specific screens.
- Keep the lesson screen data-driven.

## Definition of done

- mobile, tablet, and desktop responsive
- touch friendly
- audio controls
- retry flow
- correct and incorrect feedback
- lesson completion
- attempts saved
- progress saved
- rewards saved
- no duplicated drag-to-container implementation
