'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MdErrorOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/_providers/auth-provider';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
    email: z.string().email({ message: 'You need to enter a valid email' }),
    password: z.string().min(1, { message: 'You need to enter a password' }),
});

const SignInForm = () => {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Error handling
    const { errors } = form.formState;

    // Log in user on submit
    function onSubmit(values) {
        login(values);
        router.push('/');
    }

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle className='text-2xl'>Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            {...form.register('email')}
                        />
                        {errors.email && (
                            <span className='text-muted-foreground text-xs mb-2 flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {errors.email.message}
                                </span>
                            </span>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            {...form.register('password')}
                        />
                        {errors.password && (
                            <span className='text-muted-foreground text-xs mb-2 flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {errors.password.message}
                                </span>
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type='submit'
                        className='w-full'>
                        Sign in
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
export default SignInForm;
