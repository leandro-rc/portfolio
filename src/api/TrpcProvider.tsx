'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { trpc } from '@/api/trpc';
import { createTRPCClient } from '@/api/trpcClient';

interface TrpcProviderProps {
    children: ReactNode;
}

export function TrpcProvider({ children }: TrpcProviderProps) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => createTRPCClient());

    return (
        <SessionProvider>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </trpc.Provider>
        </SessionProvider>
    );
}
