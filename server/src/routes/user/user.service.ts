import { prismaClient } from '../../plugins/prisma.js';

async function listUsers() {
    return prismaClient.user.findMany({
        orderBy: { name: 'desc' },
    });
}

async function saveUser({ name, email }: { name: string; email: string }) {
    return prismaClient.user.create({
        data: {
            name,
            email,
        },
    });
}

export { listUsers, saveUser };
