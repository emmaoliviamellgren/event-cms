import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './(auth)/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'EventCorp.',
    description: 'For all your needs in event planning and management.',
};

export default function RootLayout({ children }) {
    return (
        <AuthContextProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <main>
                        <Toaster />
                        {children}
                    </main>
                </body>
            </html>
        </AuthContextProvider>
    );
}
