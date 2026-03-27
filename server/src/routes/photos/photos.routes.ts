import { type FastifyInstance } from 'fastify';
import { PhotosResponse } from './photos.schema.js';
import { listPhotos } from './photos.service.js';

export default async function photosRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/api/photos',
        {
            schema: {
                response: {
                    200: PhotosResponse,
                    500: {
                        type: 'object',
                        properties: {
                            statusCode: { type: 'number' },
                            error: { type: 'string' },
                            message: { type: 'string' },
                        },
                        required: ['statusCode', 'error', 'message'],
                    },
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
}
