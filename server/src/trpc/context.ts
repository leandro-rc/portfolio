import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prismaClient } from '../plugins/prisma.js';

type SessionUser = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
};

export type TrpcContext = {
    session: {
        user: SessionUser;
    } | null;
};

function parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) {
        return {};
    }

    return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
        const [name, ...valueParts] = part.trim().split('=');

        if (!name || valueParts.length === 0) {
            return acc;
        }

        acc[name] = decodeURIComponent(valueParts.join('='));

        return acc;
    }, {});
}

function getSessionToken(cookieHeader?: string): string | null {
    const cookies = parseCookies(cookieHeader);

    return (
        cookies['__Secure-next-auth.session-token'] ??
        cookies['next-auth.session-token'] ??
        cookies['__Secure-authjs.session-token'] ??
        cookies['authjs.session-token'] ??
        null
    );
}

export async function createTrpcContext({
    req,
}: CreateFastifyContextOptions): Promise<TrpcContext> {
    const sessionToken = getSessionToken(req.headers.cookie);
    if (!sessionToken) {
        return { session: null };
    }

    const session = await prismaClient.session.findUnique({
        where: { sessionToken },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });

    if (!session || session.expires <= new Date()) {
        return { session: null };
    }

    return {
        session: {
            user: session.user,
        },
    };
}
