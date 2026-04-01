import { trpcInstance } from '../trpcInstance';
import { idInputSchema, userIdInputSchema } from '../schemas/input.schema';
import {
    getAllUsersHandler,
    getPhotosByUserHandler,
    getUserByIdHandler,
} from '../handlers/user.handler';

/**
 * Returns the list of application users available to an authenticated caller.
 *
 * The result is intentionally limited to basic profile fields that are safe to
 * expose in user listing views.
 *
 * @returns Users ordered alphabetically by name.
 */
const getAllUsersProcedure = trpcInstance.protectedProcedure.query(async () =>
    getAllUsersHandler(),
);

/**
 * Fetches a single user record by its database identifier.
 *
 * @param input.id The unique user id to resolve.
 * @returns The matching user profile fields, or `null` when no user exists.
 */
const getUserByIdProcedure = trpcInstance.protectedProcedure
    .input(idInputSchema)
    .query(async ({ input }) => {
        return getUserByIdHandler(input.id);
    });

/**
 * Returns all photos that belong to a specific user.
 *
 * @param input.userId The owner id used to filter photos.
 * @returns Photos for the given user ordered from newest to oldest.
 */
const getPhotosByUserProcedure = trpcInstance.protectedProcedure
    .input(userIdInputSchema)
    .query(async ({ input }) => {
        return getPhotosByUserHandler(input.userId);
    });

export { getAllUsersProcedure, getUserByIdProcedure, getPhotosByUserProcedure };
