'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export function AuthStatus() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="text-sm text-zinc-500">Loading session...</div>;
    }

    if (!session) {
        return (
            <button
                className="rounded bg-black px-3 py-1 text-white hover:bg-zinc-800 text-sm"
                onClick={() => signIn('github')}
            >
                Login with GitHub
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3">
            {session.user?.image && (
                <img
                    src={session.user.image}
                    alt={session.user.name || 'User avatar'}
                    width={28}
                    height={28}
                    className="rounded-full border"
                />
            )}
            <span className="text-sm font-medium">{session.user?.name || session.user?.email}</span>
            <button
                className="rounded bg-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-300"
                onClick={() => signOut({ callbackUrl: '/' })}
            >
                Logout
            </button>
        </div>
    );
}
