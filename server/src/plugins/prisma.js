import fp from 'fastify-plugin';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient({ adapter });
export default fp(async (fastify) => {
    fastify.decorate('prisma', prismaClient);
    fastify.addHook('onClose', async () => {
        await prismaClient.$disconnect();
    });
});
export { prismaClient };
