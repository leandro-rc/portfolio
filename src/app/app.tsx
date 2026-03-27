'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Photos } from './components/photos/Photos';
import { TrpcProvider } from '@/api/TrpcProvider';

function App() {
    return (
        <TrpcProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <h1>Localhost dev</h1>
            <Photos />
        </TrpcProvider>
    );
}

export default App;
