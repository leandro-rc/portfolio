import { type FastifyInstance } from 'fastify';
import { UsersResponseSchema } from './user.schema';
import { Error500Response } from '@server/schemas/common';
import { listUsers, saveUser } from './user.service';

export default async function userRoutes(fastify: FastifyInstance) {
    // Define user-related routes here
    fastify.get(
        '/api/users',
        {
            schema: {
                response: {
                    200: UsersResponseSchema,
                    500: Error500Response,
                },
            },
        },
        async (request, reply) => {
            try {
                const users = await listUsers();

                return { message: 'Welcome to the Users API', users };
            } catch (error) {
                request.log.error(error);
                return reply.internalServerError(
                    error instanceof Error ? error.message : String(error),
                );
            }
        },
    );

    fastify.post(
        '/api/users',
        {
            schema: {
                response: {
                    200: UsersResponseSchema,
                    500: Error500Response,
                },
            },
        },
        async (request, reply) => {
            try {
                const { name, email } = request.body;
                const user = await saveUser({ name, email });
                return { message: 'User created successfully', user };
            } catch (error) {
                request.log.error(error);
                return reply.internalServerError(
                    error instanceof Error ? error.message : String(error),
                );
            }
        },
    );
}
