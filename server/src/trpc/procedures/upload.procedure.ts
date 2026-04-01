import { trpcInstance } from '../trpcInstance';
import { uploadSignedUrlInputSchema } from '../schemas/input.schema';
import { getCustomSignedUrlHandler } from '../handlers/upload.handler';

/**
 * Creates a short-lived signed upload URL for direct object storage uploads.
 *
 * The generated key is namespaced under `uploads/` and can be used by the
 * frontend to upload the file without proxying the binary through the app
 * server.
 *
 * @param input.fileName The original file name used to derive the storage key.
 * @param input.fileType The MIME type applied to the uploaded object.
 * @returns A signed URL and the generated object key.
 */
const getCustomSignedUrl = trpcInstance.procedure
    .input(uploadSignedUrlInputSchema)
    .mutation(async ({ input }) => {
        return getCustomSignedUrlHandler({
            fileName: input.fileName,
            fileType: input.fileType,
        });
    });
export default getCustomSignedUrl;
