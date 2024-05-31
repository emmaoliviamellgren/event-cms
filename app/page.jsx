'use client';

import { EventCard } from './(root)/_components/EventCard';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

import Navbar from './(root)/_components/Navbar';
import Footer from './(root)/_components/Footer';

// API
import { getAllEvents } from '@/lib/handleEventsAPI';

const HomePage = () => {
    const [locationSorted, setLocationSorted] = useState(false);
    const [dateSorted, setDateSorted] = useState(false);

    const [events, setEvents] = useState([]);

    // Display fetched events
    const displayEvents = async () => {
        try {
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Check if event date has expired
    const checkDatesOnEvents = () => {
        events.forEach((event) => {
            const eventDate = new Date(event.date);
            const currentDate = new Date();
            if (eventDate < currentDate) {
                hideEventAfterExpiration(event.id);
            }
        });
    };

    // Sort events by date
    const sortByDate = () => {
        const sortedByDate = [...events].sort((a, b) => {
            if (a.date < b.date) {
                return dateSorted ? -1 : 1;
            }
            if (a.date > b.date) {
                return dateSorted ? 1 : -1;
            }
            return 0;
        });
        setEvents(sortedByDate);
        // Undo sorting when triggered
        setDateSorted(!dateSorted);
    };

    // Sort events by location
    const sortByLocation = () => {
        const sortedByLocation = [...events].sort((a, b) => {
            if (a.location < b.location) {
                return locationSorted ? -1 : 1;
            }
            if (a.location > b.location) {
                return locationSorted ? 1 : -1;
            }
            return 0;
        });
        setEvents(sortedByLocation);
        // Undo sorting when triggered
        setLocationSorted(!locationSorted);
    };

    // Hide event after expiration
    const hideEventAfterExpiration = (eventId) => {
        try {
            setEvents((prevState) => prevState.filter((x) => x.id !== eventId));
        } catch (error) {
            console.log('Failed to filter out expired events');
        }
    };

    useEffect(() => {
        displayEvents();
        checkDatesOnEvents();
    }, []);

    return (
        <>
            <Navbar />
            <header className='flex justify-center md:justify-end max-w-7xl'>
                <div className='text-center md:text-right mt-24 md:mr-12 w-72 h-auto gap-2 leading-10'>
                    <span className='font-bold text-3xl text-gray-300 mr-1'>
                        EventCorp.
                    </span>
                    <span className='text-3xl font-medium'>
                        For all your needs in event planning and management.
                    </span>
                </div>
            </header>
            <div className='flex flex-col py-12 md:py-8 px-6 md:px-16 lg:px-36 items-center'>
                <div className='flex mt-10 md:mt-20 space-x-5'>
                    <Button
                        variant='outline'
                        className='flex gap-2 items-center'
                        onClick={sortByLocation}>
                        <span>
                            <ArrowUpDown className='size-4' />
                        </span>
                        <span>Sort by location</span>
                    </Button>
                    <Button
                        variant='outline'
                        className='flex gap-2 items-center'
                        onClick={sortByDate}>
                        <span>
                            <ArrowUpDown className='size-4' />
                        </span>
                        <span>Sort by date</span>
                    </Button>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-2'>
                    {events.map((event) => {
                        return (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
