import { t } from './t';
import { prismaClient } from '@server/plugins/prisma';

export const appRouter = t.router({
    photos: t.procedure.query(async () => {
        return prismaClient.photo.findMany({ orderBy: { createdAt: 'desc' } });
    }),
});

export type AppRouter = typeof appRouter;
