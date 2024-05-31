'use client';

import Link from 'next/link';
import SignUpForm from '../../_components/SignUpForm';
import { FaArrowLeft } from 'react-icons/fa';

export default function SignUpPage() {
    return (
        <>
            <Link
                href='/'
                className='flex absolute top-8 left-2 items-center gap-2 transition-all hover:-translate-x-2 w-fit px-6 md:px-16 lg:px-36'>
                <FaArrowLeft className='size-3 text-primary-muted' />
                <p className='text-sm text-primary-muted'>Go back</p>
            </Link>
            <SignUpForm />
        </>
    );
}
