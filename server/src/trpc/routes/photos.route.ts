import { t } from '../t';
import { prismaClient } from '@server/plugins/prisma';

export const photosRoute = t.procedure.query(async () => {
    return prismaClient.photo.findMany({ orderBy: { createdAt: 'desc' } });
});
