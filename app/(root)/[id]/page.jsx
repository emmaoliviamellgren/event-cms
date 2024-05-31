'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaArrowLeft } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { X, Check, Users } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '@/app/(auth)/auth-provider';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

// API
import { getEventById, handleBookings } from '@/lib/handleEventsAPI';

const EventPage = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [event, setEvent] = useState(null);

    // Fetch event by id
    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEventById(id);
            setEvent(event);
        };

        fetchEvent();
    }, [id]);

    // Users that have booked the event
    const bookedByUsers = event?.bookedUsers ? event.bookedUsers : [];

    // Check if event is fully booked
    const eventIsFull = event?.bookedUsers?.length === Number(event?.numberOfSpots);

    // Check if user has booked the event by comaparing user id with booked users
    const bookedByCurrentUser = event?.bookedUsers?.some(
        (users) => users.id === user?.uid
    );

    // Handle booking by current user
    const handleBooking = () => {
        //Unbook user if user has booked event
        if (bookedByCurrentUser) {
            handleBookings(user?.uid, id, user?.email)
                .then((response) => {
                    if (response.message === 'Booking removed') {
                        setEvent((prevState) => ({
                            ...prevState,
                            bookedUsers: bookedByUsers.filter(
                                (x) => x.id !== user?.uid
                            ),
                        }));
                        toast.success('Event booking undone successfully!');
                    }
                })
                .catch(() => {
                    toast.error('Failed to unbook event, please try again.');
                });
        } else {
            // Book user if user has not booked event
            handleBookings(user?.uid, id, user?.email)
                .then((response) => {
                    if (response.message !== 'Booking removed') {
                        setEvent((prevState) => ({
                            ...prevState,
                            bookedUsers: [
                                ...bookedByUsers,
                                {
                                    id: user?.uid,
                                    email: user?.email,
                                    bookedAt: new Date().toISOString(),
                                },
                            ],
                        }));
                        toast.success('Event booked successfully!');
                    }
                })
                .catch(() => {
                    toast.error('Failed to book event, please try again.');
                });
        }
    };

    return (
        <div>
            {event && (
                <>
                    <Link
                        href='/'
                        className='z-10 p-2 md:p-4 absolute flex items-center gap-2 transition-all hover:-translate-x-2 bg-accent rounded-full shadow-sm w-fit mt-2 md:mt-4 mx-6 md:mx-16 lg:mx-36'>
                        <FaArrowLeft className='size-3 md:size-4 text-black' />
                    </Link>
                    <Image
                        src={event.image}
                        width={400}
                        height={400}
                        alt='event'
                        className='w-screen max-h-96 object-cover object-center'
                    />

                    <div className='px-6 md:px-16 lg:px-36 pb-2 md:py-8'>
                        <Card className='md:w-[520px] relative bottom-[120px] z-10'>
                            <CardHeader>
                                <CardTitle>{event.name}</CardTitle>
                                <CardDescription className='pt-2 leading-5'>
                                    {event.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='grid gap-4'>
                                <div>
                                    <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                                        <FaLocationDot className='flex size-4' />
                                        <div className='space-y-1 ml-2'>
                                            <p className='text-sm font-medium leading-none'>
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                                        <FaRegCalendarAlt className='flex size-4' />
                                        <div className='space-y-1 ml-2'>
                                            <p className='text-sm font-medium leading-none'>
                                                {event.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                                        <MdPersonAddAlt1 className='flex size-4' />
                                        <div className='space-y-1 ml-2'>
                                            <p className='text-sm font-medium leading-none'>
                                                <span className='font-bold'>
                                                    {event.numberOfSpots -
                                                        event?.bookedUsers
                                                            ?.length}
                                                </span>
                                                <span className='ml-1'>
                                                    spots left
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                                        <Users className='flex size-4' />
                                        <div className='space-y-1 ml-2'>
                                            <p className='text-sm font-medium leading-none'>
                                                Participants
                                            </p>
                                            {event &&
                                            event.bookedUsers?.length ? (
                                                event.bookedUsers.map(
                                                    (user) => (
                                                        <div
                                                            key={user.id}
                                                            className='flex flex-col'>
                                                            <p className='text-sm text-muted-foreground'>
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <span className='text-sm leading-6 text-muted-foreground'>
                                                    No participants yet.
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant={
                                        (eventIsFull && !bookedByCurrentUser) ||
                                        !user
                                            ? 'disabled'
                                            : 'default'
                                    }
                                    onClick={handleBooking}
                                    className='w-full'>
                                    {bookedByCurrentUser ? (
                                        <span className='flex gap-2 items-center'>
                                            <X className='mr-2 h-4 w-4' /> Undo
                                            booking
                                        </span>
                                    ) : user ? (
                                        <span className='flex gap-2 items-center'>
                                            <Check className='mr-2 h-4 w-4' />{' '}
                                            Book event!
                                        </span>
                                    ) : (
                                        <span className='flex gap-2 items-center'>
                                            <X className='mr-2 h-4 w-4' /> You
                                            must be logged in to book!
                                        </span>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventPage;
