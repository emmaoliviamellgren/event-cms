'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/(auth)/AuthProvider';

const Navbar = () => {
    const { handleSignOut, user } = useAuth();
    const router = useRouter();

    return (
        <nav className='flex h-24 md:h-16 items-center gap-4 border-b bg-background justify-center px-4 md:px-6'>
            <div className='w-full flex-col font-medium flex md:flex-row justify-between items-center gap-2 md:gap-8 lg:gap-12 max-w-6xl'>
                <div className='flex'>
                    <span className='text-sm md:text-base text-slate-200 md:text-foreground font-semibold'>
                        EventCorp.
                    </span>
                </div>
                <div className='flex items-center gap-1 md:gap-2'>
                    {user ? (
                        <>
                            <p className='text-sm font-normal text-muted-foreground/90'>
                                Logged in as{' '}
                                <span className='font-semibold'>
                                    {user.displayName}
                                </span>
                                . Not you?
                            </p>
                            <Button
                                onClick={handleSignOut}
                                variant='link'
                                className='p-0 text-sm text-foreground transition-colors hover:text-muted-foreground'>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => router.push('/sign-in')}
                                variant='ghost'
                                className='text-sm text-foreground transition-colors hover:text-muted-foreground'>
                                Sign in
                            </Button>
                            <Button
                                onClick={() => router.push('/sign-up')}
                                variant='ghost'
                                className='text-sm text-foreground transition-colors hover:text-muted-foreground'>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
