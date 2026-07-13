# Koda v3

Koda v3 is an education platform foundation built as a monorepo.

## Structure

- `apps/learner-web` - React, TypeScript, Vite, Tailwind CSS learner app
- `apps/api` - FastAPI service with MongoDB connectivity
- `packages/theme` - Koda Tailwind brand tokens
- `packages/learning-ui` - reusable learner UI components
- `packages/activity-core` - shared activity engine contracts
- `packages/activity-schema` - learning activity definition types
- `packages/asset-catalog` - asset manifest types and lookup helpers
- `packages/shared-types` - shared cross-app types
- `content/activities` - learning activity definitions
- `content/asset-manifests` - asset manifests

## Development

```bash
npm install
cp .env.example .env
docker compose up -d
npm run dev
```

## Docker Local Development

```bash
make dev-local
```

This starts:

- learner web: http://localhost:5173
- API: http://localhost:8000/api/v1/health
- MongoDB: localhost:27017

Stop the stack with:

```bash
make dev-local-stop
```

## Checks

```bash
npm run typecheck
npm run lint
npm run test:frontend
cd apps/api && pytest
```
