import React, { useState, useEffect } from 'react';

function Time() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.j3.cx/time')
            .then(response => response.json())
            .then(data => setData(data));

        // Set an interval to update the time every second
        const interval = setInterval(() => {
            setData(prevData => ({ ...prevData }));
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    // Compute the current time based on utc_offset
    const getAdjustedTime = () => {
        if (!data) {
            // Return the current UTC time if data is not yet loaded
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
        }

        const offsetHours = parseInt(data.utc_offset.split(':')[0]);
        const offsetMinutes = parseInt(data.utc_offset.split(':')[1]);

        // Get current UTC time
        const now = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);

        // Apply the offset from the API data
        now.setHours(now.getHours() + offsetHours);
        now.setMinutes(now.getMinutes() + offsetMinutes);

        return now;
    };

    const adjustedTime = getAdjustedTime();

    return data ? (
        <div>
            <pre>
                <p><em>The current time is...</em></p>
                <h2>{adjustedTime.toLocaleTimeString('en-DE')}</h2>
                <strong>{adjustedTime.toLocaleDateString('en-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                <p>{data.timezone} ({data.abbreviation}) // Timezone & Abbreviation</p>
                <p>UTC{data.utc_offset} // UTC Offset</p>
            </pre>
        </div>
    ) : (
        <div>Loading...</div>
    );
}

export default Time;
