'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const EventCard = ({ event }) => {
    const router = useRouter();

    const { name, location, date, image, bookedUsers, numberOfSpots, id } =
        event;

    // Check if event is fully booked
    const eventIsFull = (event?.bookedUsers?.length || 0) === Number(event?.numberOfSpots);

    return (
        <div
            onClick={() => router.push(`/${id}`)}
            className={`p-6 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer m-5 max-w-96 w-full sm:w-[370px] h-[360px] sm:h-auto flex flex-col border border-input bg-background hover:text-accent-foreground ${
                eventIsFull ? 'opacity-70' : 'hover:bg-accent'
            }`}>
            <div className='justify-center text-left leading-0'>
                <div className='flex flex-col mb-2'>
                    <p className='text-lg m-0 w-fit bg-tertiary font-semibold text-primary'>
                        {name}
                    </p>
                    {eventIsFull && (
                        <p className='text-lg px-2 text-white font-semibold bg-red-700 w-fit'>
                            Sold out
                        </p>
                    )}
                </div>

                <div className='w-full h-[150px]'>
                    <Image
                        src={image || '/assets/placeholder.jpg'}
                        width={200}
                        height={200}
                        alt='Event image'
                        className='w-full h-[150px] object-cover rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4 text-sm'>
                    <span>
                        <span className='font-semibold'>Location: </span>
                        {location}
                    </span>
                    <span>
                        <span className='font-semibold'>Date: </span>
                        {date}
                    </span>
                    <span>
                        <span className='font-semibold'>Spots left: </span>
                        {numberOfSpots - bookedUsers?.length}
                    </span>
                </div>
            </div>
        </div>
    );
};
