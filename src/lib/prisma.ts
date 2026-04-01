import { PrismaClient } from '../../server/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { join } from 'node:path';

if (!process.env.DATABASE_URL) {
    config({ path: join(process.cwd(), 'server/.env') });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error(
        'DATABASE_URL is not set. Set it in .env or server/.env before starting Next.js.',
    );
}

const adapter = new PrismaPg({ connectionString });

const createPrismaClient = () => new PrismaClient({ adapter });
type PrismaClientInstance = ReturnType<typeof createPrismaClient>;

type GlobalWithPrisma = typeof globalThis & {
    prisma?: PrismaClientInstance;
};

const globalWithPrisma = globalThis as GlobalWithPrisma;

export const prismaClient = globalWithPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalWithPrisma.prisma = prismaClient;
}
