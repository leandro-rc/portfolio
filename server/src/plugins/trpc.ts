import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from '../trpc/router.js';
import { type FastifyInstance } from 'fastify';
import type { TrpcContext } from '../trpc/context';

export default async function trpcPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: appRouter,
            createContext: async ({ req }): Promise<TrpcContext> => {
                // Example: Attach session from request (customize as needed)
                // If you use a session plugin, replace this with actual session extraction
                return {
                    session: (req as any).session ?? null,
                };
            },
        },
    });
}
