import { savePhotoProcedure, getPhotosProcedure } from './procedures/photo.procedure';
import getCustomSignedUrl from './procedures/upload.procedure';
import {
    getAllUsersProcedure,
    getUserByIdProcedure,
    getPhotosByUserProcedure,
} from './procedures/user.procedure';
import { trpcInstance } from './trpcInstance';

export const appRouter = trpcInstance.router({
    getPhotos: getPhotosProcedure,
    savePhoto: savePhotoProcedure,
    getCustomSignedUrl,
    getAllUsers: getAllUsersProcedure,
    getUserById: getUserByIdProcedure,
    getPhotosByUser: getPhotosByUserProcedure,
});

export type AppRouter = typeof appRouter;
