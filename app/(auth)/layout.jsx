'use client';

export default function AuthLayout({ children }) {
    return (
        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            {children}
        </div>
    );
}
