// import { trpcInstance } from '../trpcInstance';
import { prismaClient } from '@server/plugins/prisma';

export const getPhotosRoute = async () => {
    const photos = await prismaClient.photo.findMany({ orderBy: { createdAt: 'desc' } });
    console.log('Fetched photos:', photos);
    return photos ?? [];
};
