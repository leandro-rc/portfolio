'use client';

import { trpc } from '@/api/trpc';
import { useSession } from 'next-auth/react';

export default function Users() {
    const { status } = useSession();
    const usersQuery = trpc.getAllUsers.useQuery(undefined, {
        enabled: status === 'authenticated',
    });

    if (status === 'loading') return <div>Loading session...</div>;
    if (status === 'unauthenticated')
        return <div className="text-red-500">You must be logged in to view users.</div>;
    if (usersQuery.isLoading) return <div>Loading users...</div>;
    if (usersQuery.error)
        return <div className="text-red-500">Error: {usersQuery.error.message}</div>;

    return (
        <main className="max-w-2xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul className="divide-y divide-zinc-200">
                {usersQuery.data?.map((user) => (
                    <li key={user.id} className="py-3 flex items-center gap-4">
                        {user.image && (
                            <img
                                src={user.image}
                                alt={user.name || user.email}
                                className="w-10 h-10 rounded-full border"
                            />
                        )}
                        <div>
                            <div className="font-medium">
                                {user.name || <span className="italic text-zinc-400">No name</span>}
                            </div>
                            <div className="text-sm text-zinc-500">{user.email}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
