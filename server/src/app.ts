// File: app.ts
import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.js';
import corsPlugin from './plugins/cors.js';
import sensiblePlugin from './plugins/sensible.js';

import photosRoutes from './routes/photos/photos.routes.js';
import trpcPlugin from './plugins/trpc.js';

export function buildApp() {
    const fastify = Fastify({ logger: true });

    fastify.register(prismaPlugin);
    fastify.register(corsPlugin);
    fastify.register(sensiblePlugin);

    fastify.register(photosRoutes);

    fastify.register(trpcPlugin);

    fastify.get('/health', async () => ({ status: 'ok' }));

    return fastify;
}
