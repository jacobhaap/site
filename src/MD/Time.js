import React, { useState, useEffect } from 'react';

function Time() {
    const [data, setData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        fetch('https://api.j3.cx/time')
            .then(response => response.json())
            .then(data => {
                setData(data);
                // Set an interval to update the time every second
                const interval = setInterval(() => {
                    setCurrentTime(new Date());
                }, 1000);
                // Clear the interval when the component is unmounted
                return () => clearInterval(interval);
            });
    }, []);

    // Compute the current time based on utc_offset
    const getAdjustedTime = () => {
        if (!data) return currentTime;

        const offsetHours = parseInt(data.utc_offset.split(':')[0]);
        const offsetMinutes = parseInt(data.utc_offset.split(':')[1]);

        const adjustedTime = new Date(currentTime);
        adjustedTime.setHours(currentTime.getHours() + offsetHours);
        adjustedTime.setMinutes(currentTime.getMinutes() + offsetMinutes);

        return adjustedTime;
    };

    const adjustedTime = getAdjustedTime();

    return data ? (
        <div>
            <pre>
                <p><em>The current time is...</em></p>
                <h2>{adjustedTime.toLocaleTimeString()}</h2>
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
