import { prismaClient } from '../../plugins/prisma.js';

export async function listPhotos() {
    return prismaClient.photo.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function savePhoto({ url, title }: { url: string; title: string }) {
    return prismaClient.photo.create({
        data: {
            url,
            title,
            userId: 'default-user-id', // Replace with actual user ID from session
        },
    });
}
