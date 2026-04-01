'use client';

import { signIn } from 'next-auth/react';

const SignUpPage = () => {
    const handleGitHubSignUp = async () => {
        await signIn('github', { callbackUrl: '/' });
    };

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center gap-6 px-6 py-12">
            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="text-sm text-zinc-600">
                We currently use GitHub authentication. Click below to create or access your
                account.
            </p>

            <button
                type="button"
                onClick={handleGitHubSignUp}
                className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
                Sign up with GitHub
            </button>
        </main>
    );
};

export default SignUpPage;
