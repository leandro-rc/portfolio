# Full Stack Portfolio Project

This is a modern, full-stack portfolio application built to showcase my skills as a TypeScript developer across both frontend and backend. It demonstrates scalable architecture, type safety, authentication, file uploads, and best practices for real-world web apps.

---

## Architecture Overview

- **Frontend:** Next.js 16 (App Router, TypeScript, Tailwind CSS)
    - Modular file-based routing, React Server/Client Components
    - tRPC + React Query for type-safe data fetching
    - NextAuth.js for GitHub OAuth authentication
    - S3 file uploads with signed URLs
- **Backend:** Fastify (TypeScript) + Prisma ORM
    - Modular route structure (user, photo, upload)
    - tRPC for end-to-end type-safe API
    - PostgreSQL (via Prisma)
    - Environment-based config, plugin-based extensibility

See [`docs/server-architecture.md`](docs/server-architecture.md) and [`docs/frontend-architecture.md`](docs/frontend-architecture.md) for full details.

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, tRPC, React Query, NextAuth.js
- **Backend:** Fastify, TypeScript, Prisma ORM, tRPC, PostgreSQL
- **Dev Tools:** Bun, ESLint, Prettier, React Query Devtools

---

## Features

- End-to-end type safety (tRPC + Prisma)
- GitHub OAuth authentication (NextAuth.js)
- Modular, scalable codebase (monorepo)
- File uploads to S3 (with signed URLs)
- User and photo management (CRUD)
- Modern UI with Tailwind CSS
- React Query for caching and mutations

---

## Project Structure

- `src/` — Next.js frontend (App Router, pages, components, API)
- `server/` — Fastify backend (routes, plugins, Prisma, tRPC)
- `shared/` — Shared types and utilities
- `docs/` — Architecture documentation
