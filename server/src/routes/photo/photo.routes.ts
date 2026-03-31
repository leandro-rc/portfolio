import { type FastifyInstance } from 'fastify';
import { PhotosResponse } from './photo.schema.js';
import { listPhotos, savePhoto } from './photo.service.js';
import { Error500Response } from '@server/schemas/common.js';

export default async function photoRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/api/photos',
        {
            schema: {
                response: {
                    200: PhotosResponse,
                    500: Error500Response,
                },
            },
        },
        async (request, reply) => {
            try {
                const photos = await listPhotos();
                return { message: 'Welcome to the Photos API', photos };
            } catch (error) {
                request.log.error(error);
                return reply.internalServerError(
                    error instanceof Error ? error.message : String(error),
                );
            }
        },
    );

    fastify.post(
        '/api/photos',
        {
            schema: {
                response: {
                    200: PhotosResponse,
                    500: Error500Response,
                },
            },
        },
        async (request, reply) => {
            try {
                const { url, title } = request.body;
                const photo = await savePhoto({ url, title });
                return { message: 'Photo saved successfully', photo };
            } catch (error) {
                request.log.error(error);
                return reply.internalServerError(
                    error instanceof Error ? error.message : String(error),
                );
            }
        },
    );
}
