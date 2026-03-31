import { savePhotoProcedure, getPhotosProcedure } from './procedures/photo.procedure';
import getCustomSignedUrl from './procedures/upload.procedure';
import { trpcInstance } from './trpcInstance';

export const appRouter = trpcInstance.router({
    getPhotos: getPhotosProcedure,
    savePhoto: savePhotoProcedure,
    getCustomSignedUrl,
});

export type AppRouter = typeof appRouter;
