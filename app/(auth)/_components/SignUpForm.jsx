'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

import { useAuth } from '@/app/_providers/auth-provider';
import { addNewUser } from '@/lib/user.db';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z
    .object({
        email: z.string().email({ message: 'You need to enter a valid email' }),
        firstName: z
            .string()
            .min(1, { message: 'You need to enter a first name' }),
        lastName: z
            .string()
            .min(1, { message: 'You need to enter a first name' }),
        password: z.string().min(6, {
            message: 'The password must be at least 6 characters long',
        }),
        confirmPassword: z.string(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: 'Passwords must match',
            path: ['confirmPassword'],
        }
    );

const SignUpForm = () => {
    const { register } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    // Error handling
    const { errors } = form.formState;

    // Add user to database on submit
    const onSubmit = async (values) => {
        try {
            const uid = await register(values);
            await addNewUser(
                {
                    name: values.firstName + values.lastName,
                    email: values.email,
                    password: values.password,
                },
                uid
            );
            router.push('/');
        } catch (error) {
            console.error('Could not add user to database!', error);
        }
    };

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle className='text-2xl'>Register</CardTitle>
                <CardDescription>
                    Enter your information to create an account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='first-name'>First name</Label>
                        <Input
                            id='first-name'
                            name='first-name'
                            type='text'
                            {...form.register('firstName')}
                        />
                        {errors.firstName && (
                            <span className='text-muted-foreground text-xs mb-2 flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {errors.firstName.message}
                                </span>
                            </span>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='last-name'>Last name</Label>
                        <Input
                            id='last-name'
                            name='last-name'
                            type='text'
                            {...form.register('lastName')}
                        />
                        {errors.lastName && (
                            <span className='text-muted-foreground text-xs mb-2 flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {errors.lastName.message}
                                </span>
                            </span>
                        )}
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='text'
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
                    <div className='grid gap-2'>
                        <Label htmlFor='confirm-password'>
                            Confirm Password
                        </Label>
                        <Input
                            id='confirm-password'
                            name='confirm-password'
                            type='password'
                            {...form.register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <span className='text-muted-foreground text-xs mb-2 flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {errors.confirmPassword.message}
                                </span>
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type='submit'
                        className='w-full'>
                        Create account
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
export default SignUpForm;
