import { z } from 'zod';
import { trpcInstance } from '../trpcInstance';
import { prismaClient } from '@server/plugins/prisma';

// List all users
export const getAllUsersProcedure = trpcInstance.protectedProcedure.query(async () => {
    return prismaClient.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
        orderBy: { name: 'asc' },
    });
});

// Get user by ID
export const getUserByIdProcedure = trpcInstance.protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
        return prismaClient.user.findUnique({
            where: { id: input.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            },
        });
    });

// Get images by user
export const getPhotosByUserProcedure = trpcInstance.protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
        return prismaClient.photo.findMany({
            where: { userId: input.userId },
            orderBy: { createdAt: 'desc' },
        });
    });
