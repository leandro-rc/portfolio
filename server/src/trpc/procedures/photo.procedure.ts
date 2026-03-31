import { prismaClient } from '@server/plugins/prisma';
import { trpcInstance } from '../trpcInstance';
import z from 'zod';
import { getPhotosRoute } from '../routes/photos.route';

const getPhotosProcedure = trpcInstance.procedure
    .input(
        z.object({
            pageToken: z.string().optional(),
            pageSize: z.number().optional(),
        }),
    )
    .query(async (opts) => {
        // TODO: Implement pagination logic using pageToken and pageSize
        // if (!opts.input.id) {
        //     throw new TRPCError({
        //         code: 'BAD_REQUEST',
        //         message: 'ID is required',
        //     });
        // }

        const response = await getPhotosRoute();
        console.log('Response from getPhotosRoute:', response);

        if (!response) {
            return [];
        }

        return response;
    });

const addPhotoProcedure = trpcInstance.protectedProcedure
    .input(
        z.object({
            url: z.string(),
            title: z.string(),
        }),
    )
    .mutation(({ ctx, input }) => {
        if (!ctx?.session?.user?.id) {
            throw new Error('User ID is required to add a photo.');
        }
        return prismaClient.photo.create({
            data: {
                url: input.url,
                title: input.title,
                userId: ctx.session.user.id,
            },
        });
    });

export { getPhotosProcedure, addPhotoProcedure };
