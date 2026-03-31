// import Image from 'next/image';
import App from './app';
export default function Home() {
    return (
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
            <h1>Page container</h1>
            <App />
        </main>
    );
}
