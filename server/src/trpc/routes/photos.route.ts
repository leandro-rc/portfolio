// import { trpcInstance } from '../trpcInstance';
import { prismaClient } from '@server/plugins/prisma';

export const getPhotosRoute = async () => {
    const photos = await prismaClient.photo.findMany({ orderBy: { createdAt: 'desc' } });

    return photos ?? [];
};

export const savePhotoRoute = async ({
    url,
    title,
    userId,
}: {
    url: string;
    title: string;
    userId: string;
}) => {
    const photo = await prismaClient.photo.create({
        data: {
            url,
            title,
            userId,
        },
    });

    return photo;
};
