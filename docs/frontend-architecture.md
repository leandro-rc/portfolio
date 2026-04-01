# Frontend Architecture Overview

## Main Structure

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Entry Point:** [`layout.tsx`](../src/app/layout.tsx) and [`app.tsx`](../src/app/app.tsx)
- **Routing:** File-based routing under [`src/app/`](../src/app/)
- **Styling:** Tailwind CSS via [`globals.css`](../src/app/globals.css)

## Providers & State Management

- **TrpcProvider:** Wraps the app with tRPC and React Query context ([`TrpcProvider.tsx`](../src/api/TrpcProvider.tsx))
- **SessionProvider:** Handles authentication state (NextAuth.js)
- **React Query:** Used for data fetching, caching, and mutations

## API Layer

- **tRPC Client:** [`trpc.ts`](../src/api/trpc.ts) and [`trpcClient.ts`](../src/api/trpcClient.ts) provide a type-safe API client for backend communication
- **All API calls are type-safe and auto-generated from backend tRPC router**

## Authentication

- **NextAuth.js:** Handles GitHub OAuth login/signup ([`/api/auth/[...nextauth]/route.ts`](../src/app/api/auth/[...nextauth]/route.ts))
- **AuthStatus Component:** Shows login/logout state ([`AuthStatus.tsx`](../src/app/components/AuthStatus.tsx))

## Pages & Components

- **Home:** [`page.tsx`](../src/app/page.tsx) renders the main app shell
- **Photos:** [`photos/page.tsx`](../src/app/photos/page.tsx) displays photos from backend
- **Users:** [`users/page.tsx`](../src/app/users/page.tsx) lists users (requires authentication)
- **Upload:** [`upload/page.tsx`](../src/app/upload/page.tsx) and [`UploadForm.tsx`](../src/app/components/uploadForm/UploadForm.tsx) handle photo uploads to S3
- **Login/Signup:** [`login/page.tsx`](../src/app/login/page.tsx), [`signup/page.tsx`](../src/app/signup/page.tsx)

## Uploads

- **S3 Upload:** [`useUploadToS3.ts`](../src/hooks/useUploadToS3.ts) custom hook for uploading files to S3 using signed URLs from backend

## Type Safety

- **End-to-end types:** All API calls and data models are fully type-safe via tRPC and Prisma

## Dev Tools

- **React Query Devtools:** Included in layout for debugging queries

---

This architecture enables a modern, type-safe, full-stack experience with instant API type inference, authentication, and scalable modularity using Next.js, tRPC, and React Query.
