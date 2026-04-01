import { httpBatchLink } from '@trpc/client';
import { trpc } from './trpc';

export function createTRPCClient() {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:5000/trpc', // Always use backend
                fetch(url, options) {
                    return fetch(url, {
                        ...options,
                        credentials: 'include',
                    });
                },
            }),
        ],
    });
}
