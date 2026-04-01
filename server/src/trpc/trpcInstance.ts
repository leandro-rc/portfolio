import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import type { TrpcContext } from './context';

const t = initTRPC.context<TrpcContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
        ctx: {
            user: ctx.session.user,
        },
    });
});

export const trpcInstance = {
    ...t,
    publicProcedure: t.procedure,
    protectedProcedure: t.procedure.use(isAuthed),
};
