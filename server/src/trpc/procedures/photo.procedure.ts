import { prismaClient } from '@server/plugins/prisma';
import { trpcInstance } from '../trpcInstance';
import z from 'zod';
import { getPhotosRoute, savePhotoRoute } from '../routes/photo.route';

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

// TODO: Once auth is in place, change this to protected procedure and get user ID from session context instead of passing it in the input
const savePhotoProcedure = trpcInstance.procedure
    .input(
        z.object({
            url: z.string(),
            title: z.string(),
        }),
    )
    .mutation(({ ctx, input }) => {
        // if (!ctx?.session?.user?.id) {
        //     throw new Error('User ID is required to add a photo.');
        // }

        return savePhotoRoute({
            url: input.url,
            title: input.title,
            userId: 'dummy', //ctx.session.user.id,
        });
    });

export { getPhotosProcedure, savePhotoProcedure };
