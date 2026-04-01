# Backend/Server Architecture Overview

## Main Structure

- **Entry Point:** [`server.ts`](../server/src/server.ts) loads environment variables, builds the Fastify app, and starts the server.
- **App Construction:** [`app.ts`](../server/src/app.ts) creates the Fastify app, registers plugins, and sets up route modules.

## Plugins ([plugins/](../server/src/plugins/))

- **prisma.ts:** Integrates Prisma ORM for database access.
- **cors.ts:** Enables CORS for cross-origin requests.
- **sensible.ts:** Adds extra Fastify utilities for error handling and more.
- **trpc.ts:** Integrates tRPC for type-safe API endpoints between backend and frontend.

## Routes ([routes/](../server/src/routes/))

- Organized by feature:
    - **user/**, **photo/**: Each contains:
        - `*.routes.ts`: Route definitions (Fastify route registration)
        - `*.schema.ts`: Validation schemas (zod-based)
        - `*.service.ts`: Business logic and database access

## tRPC Layer ([trpc/](../server/src/trpc/))

- **router.ts:** Main tRPC router combining all procedures
- **handlers/**: Request handlers for tRPC endpoints
- **procedures/**: tRPC procedures for each domain (user, photo, upload)
- **context.ts:** Context creation for tRPC (e.g., auth/session)
- **helper.ts, trpcInstance.ts:** tRPC instance helpers

## Utilities & Types

- **[utils/logger.ts](../server/src/utils/logger.ts):** Logging utilities
- **[types/fastify.d.ts](../server/src/types/fastify.d.ts):** TypeScript type definitions for Fastify extensions

## Environment

- **[env/index.ts](../server/src/env/index.ts):** Loads and manages environment variables (e.g., server port, DB URL)

## Flow

1. Server starts with [`server.ts`](../server/src/server.ts)
2. App is built with [`app.ts`](../server/src/app.ts), registering plugins and routes
3. Each route module handles a specific domain (user, photo), with validation schemas and service logic
4. tRPC router exposes type-safe API endpoints for frontend consumption
5. Plugins add database, CORS, tRPC, and utility support

---

This modular structure makes the backend scalable, type-safe, and maintainable, following best practices for a TypeScript Fastify + Prisma + tRPC API.
