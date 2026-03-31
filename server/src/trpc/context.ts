// import { TRPCError } from '@trpc/server';
// import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export type TrpcContext = {
    session: {
        user: {
            id: string;
            // add other user properties as needed
        };
        // add other session properties as needed
    } | null;
};

// TODO: Implement actual context creation logic based on your authentication/session management

// export const createContext = (options: CreateFastifyContextOptions) => {
//     const user = options.req.headers.authorization
//         ? getUserFromHeader(options.req.headers.authorization)
//         : undefined;

//     if (!user) {
//         throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
//     }

//     return {
//         req: options.req,
//         user,
//         launchDarklyService: FeatureFlagsService,
//     };
// };

// export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
