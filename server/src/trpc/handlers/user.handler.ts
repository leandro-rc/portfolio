import { prismaClient } from '@server/plugins/prisma';

/**
 * Returns the basic profile fields for all users ordered by display name.
 */
export const getAllUsersHandler = async () => {
    const users = await prismaClient.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
        orderBy: { name: 'asc' },
    });

    return users;
};

/**
 * Resolves a single user by id and returns the public profile fields used by the app.
 *
 * @param id The unique user id to resolve.
 */
export const getUserByIdHandler = async (id: string) => {
    const user = await prismaClient.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });

    return user;
};

/**
 * Returns photos that belong to the provided user ordered from newest to oldest.
 *
 * @param userId The owner id used to filter photo records.
 */
export const getPhotosByUserHandler = async (userId: string) => {
    const photos = await prismaClient.photo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });

    return photos;
};
