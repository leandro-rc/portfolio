'use client';

import { signIn } from 'next-auth/react';

const LoginPage = () => {
    const handleGitHubLogin = async () => {
        await signIn('github', { callbackUrl: '/' });
    };

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center gap-6 px-6 py-12">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-zinc-600">
                Sign in with GitHub to access your portfolio dashboard.
            </p>

            <button
                type="button"
                onClick={handleGitHubLogin}
                className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
                Continue with GitHub
            </button>
        </main>
    );
};

export default LoginPage;
