import { trpcInstance } from '../trpcInstance';
import { getPhotosHandler, savePhotoHandler } from '../handlers/photo.handler';
import { photosListInputSchema, savePhotoInputSchema } from '../schemas/input.schema';

/**
 * Returns the photo feed for an authenticated user.
 *
 * Pagination inputs are already part of the procedure contract, but the current
 * implementation still returns the full route result until pagination is added.
 *
 * @param input.pageToken Optional cursor token for a future paginated query.
 * @param input.pageSize Optional page size for a future paginated query.
 * @returns The available photos, or an empty array when no records are found.
 */
const getPhotosProcedure = trpcInstance.protectedProcedure
    .input(photosListInputSchema)
    .query(async () => {
        // TODO: Implement pagination logic using pageToken and pageSize
        // if (!opts.input.id) {
        //     throw new TRPCError({
        //         code: 'BAD_REQUEST',
        //         message: 'ID is required',
        //     });
        // }

        const response = await getPhotosHandler();

        if (!response) {
            return [];
        }

        return response;
    });

/**
 * Creates a new photo record for the authenticated user.
 *
 * The caller provides the uploaded asset URL and display title, while the user
 * id is resolved from the protected tRPC context.
 *
 * @param input.url The stored asset URL.
 * @param input.title The human-readable title for the photo.
 * @returns The newly created photo record.
 */
const savePhotoProcedure = trpcInstance.protectedProcedure
    .input(savePhotoInputSchema)
    .mutation(({ ctx, input }) => {
        return savePhotoHandler({
            url: input.url,
            title: input.title,
            userId: ctx.user.id,
        });
    });

export { getPhotosProcedure, savePhotoProcedure };
