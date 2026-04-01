import { z } from 'zod';

/**
 * Input contract for procedures that resolve a single entity by primary id.
 */
const idInputSchema = z.object({
    id: z.string(),
});

/**
 * Input contract for procedures that filter records by owning user id.
 */
const userIdInputSchema = z.object({
    userId: z.string(),
});

/**
 * Input contract for photo listing procedures with optional pagination fields.
 */
const photosListInputSchema = z.object({
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
});

/**
 * Input contract for creating a persisted photo record.
 */
const savePhotoInputSchema = z.object({
    url: z.string(),
    title: z.string(),
});

/**
 * Input contract for generating a signed upload URL for object storage.
 */
const uploadSignedUrlInputSchema = z.object({
    fileName: z.string(),
    fileType: z.string(),
});

export {
    idInputSchema,
    userIdInputSchema,
    photosListInputSchema,
    savePhotoInputSchema,
    uploadSignedUrlInputSchema,
};
