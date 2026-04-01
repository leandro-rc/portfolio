import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '../helper';

/**
 * Creates a short-lived signed upload URL and storage key for direct uploads.
 *
 * @param params.fileName The original file name used to derive the object key.
 * @param params.fileType The MIME type applied to the stored object.
 * @returns A signed URL and the generated object key.
 */
export const getCustomSignedUrlHandler = async ({
    fileName,
    fileType,
}: {
    fileName: string;
    fileType: string;
}) => {
    const key = `uploads/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return {
        url,
        key,
    };
};
