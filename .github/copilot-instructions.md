# Project: portfolio

## Overview

Portfolio project with Next.js frontend and Fastify/Prisma backend. Monorepo structure for full-stack development.

## Tech Stack

- Language: TypeScript
- Framework: Next.js (frontend), Fastify (backend)
- Package Manager: bun

## Code Standards

- Follow Airbnb/Prettier conventions
- Use Prettier for formatting
- Run ESLint before committing

## Architecture

Monorepo with separate frontend (src/) and backend (server/) apps. Backend uses Fastify and Prisma ORM. Frontend is a Next.js app.

## Development Workflow

1. Install dependencies with `bun install`
2. Run backend: `bun run dev` in server/
3. Run frontend: `bun run dev` in root

## Important Patterns

- Use TypeScript types throughout
- Keep API logic in server/src/routes and src/api

## Do Not

- Do not mix frontend and backend code
- Do not commit without linting and formatting
