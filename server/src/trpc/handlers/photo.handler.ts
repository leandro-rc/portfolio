import { prismaClient } from '@server/plugins/prisma';

/**
 * Returns all photo records ordered from newest to oldest.
 */
export const getPhotosHandler = async () => {
    const photos = await prismaClient.photo.findMany({ orderBy: { createdAt: 'desc' } });

    return photos ?? [];
};

/**
 * Persists a photo record for the provided user.
 *
 * @param params.url The stored asset URL.
 * @param params.title The human-readable title shown in the UI.
 * @param params.userId The owner id for the new photo.
 */
export const savePhotoHandler = async ({
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
