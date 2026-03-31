import { addPhotoProcedure, getPhotosProcedure } from './procedures/photo.procedure';
import { trpcInstance } from './trpcInstance';

export const appRouter = trpcInstance.router({
    getPhotos: getPhotosProcedure,
    addPhoto: addPhotoProcedure,
});

export type AppRouter = typeof appRouter;
