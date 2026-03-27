import { prismaClient } from '../../plugins/prisma.js';

export async function listPhotos() {
    return prismaClient.photo.findMany({
        orderBy: { createdAt: 'desc' },
    });
}
