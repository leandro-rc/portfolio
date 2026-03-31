import { initTRPC } from '@trpc/server';
import type { TrpcContext } from './context';

const t = initTRPC.context<TrpcContext>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user?.id) {
        throw new Error('UNAUTHORIZED');
    }

    return next({
        ctx: {
            user: ctx.session.user,
        },
    });
});

export const trpcInstance = {
    ...t,
    protectedProcedure: t.procedure.use(isAuthed),
};
