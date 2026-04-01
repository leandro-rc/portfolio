'use client';

import Link from 'next/link';
import { AuthStatus } from './components/authStatus/AuthStatus';

function App() {
    return (
        <>
            <header className="flex items-center justify-between w-full max-w-3xl py-4">
                <h1 className="text-xl font-bold">Localhost dev</h1>
                <AuthStatus />
            </header>
            <nav className="flex gap-4 mb-6">
                <Link href="/photos">Photos</Link>
                <Link href="/upload">Upload photo</Link>
                <Link href="/users">Users</Link>
            </nav>
        </>
    );
}

export default App;
