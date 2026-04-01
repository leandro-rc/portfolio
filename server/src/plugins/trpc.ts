import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from '../trpc/router.js';
import { type FastifyInstance } from 'fastify';
import { createTrpcContext } from '../trpc/context.js';

export default async function trpcPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: appRouter,
            createContext: createTrpcContext,
        },
    });
}
