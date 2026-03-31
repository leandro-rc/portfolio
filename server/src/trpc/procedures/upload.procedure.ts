import { z } from 'zod';
import { s3 } from '../helper';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { trpcInstance } from '../trpcInstance';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const getCustomSignedUrl = trpcInstance.procedure
    .input(
        z.object({
            fileName: z.string(),
            fileType: z.string(),
        }),
    )
    .mutation(async ({ input }) => {
        const key = `uploads/${Date.now()}-${input.fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
            ContentType: input.fileType,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return {
            url,
            key,
        };
    });
export default getCustomSignedUrl;
