import { PrismaClient } from '../../server/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
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
