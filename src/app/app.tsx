'use client';

import Link from 'next/link';

function App() {
    return (
        <>
            <h1>Localhost dev</h1>
            <Link href="/photos">Photos</Link>
            <Link href="/upload">Upload photo</Link>
        </>
    );
}

export default App;
