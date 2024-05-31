// Get all events
export const getAllEvents = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/events');
        if (!res.ok) {
            throw new Error();
        }
        return res.json();
    } catch (error) {
        console.log('Failed to fetch events: ', error);
    }
};

// Get event by id
export const getEventById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!res.ok) {
            throw new Error();
        }
        return res.json();
    } catch (error) {
        console.log('Failed to fetch event information: ', error);
    }
};

// Book or unbook event
export const handleBookings = async (userId, eventId, email) => {
    try {
        const res = await fetch(`http://localhost:3000/api/events/booked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, eventId, email }),
        });
        if (!res.ok) {
            throw new Error();
        }
        return res.json();
    } catch (error) {
        console.log('Failed to book or unbook event: ', error);
    }
};
