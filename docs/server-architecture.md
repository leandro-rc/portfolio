# Backend/Server Architecture Overview

## Main Structure

- **Entry Point:** [`server.ts`](server/src/server.ts) loads environment variables, builds the Fastify app, and starts the server.
- **App Construction:** [`app.ts`](server/src/app.ts) creates the Fastify app, registers plugins, and sets up route modules.

## Plugins ([plugins/](server/src/plugins/))

- **prisma.ts:** Integrates Prisma ORM for database access.
- **cors.ts:** Enables CORS for cross-origin requests.
- **sensible.ts:** Adds extra Fastify utilities for error handling and more.

## Routes ([routes/](server/src/routes/))

- Organized by feature:
    - **notes/**, **countries/**, **vin/**: Each contains:
        - `*.routes.ts`: Route definitions
        - `*.schema.ts`: Validation schemas
        - `*.service.ts`: Business logic (where present)

## Utilities & Types

- **[utils/logger.ts](server/src/utils/logger.ts):** Logging utilities.
- **[types/fastify.d.ts](server/src/types/fastify.d.ts):** TypeScript type definitions for Fastify extensions.

## Environment

- **[env/index.ts](server/src/env/index.ts):** Loads and manages environment variables (e.g., server port).

## Flow

1. Server starts with [`server.ts`](server/src/server.ts).
2. App is built with [`app.ts`](server/src/app.ts), registering plugins and routes.
3. Each route module handles a specific domain (notes, countries, VIN), with validation schemas and service logic.
4. Plugins add database, CORS, and utility support.

---

This modular structure makes the backend scalable and maintainable, following best practices for a TypeScript Fastify API.
