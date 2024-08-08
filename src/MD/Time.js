import React, { useState, useEffect } from 'react';

function Time() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.j3.cx/time')
            .then(response => response.json())
            .then(data => setData(data));

        const interval = setInterval(() => {
            setData(prevData => ({ ...prevData }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getAdjustedTime = () => {
        if (!data) {
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
        }

        const offsetHours = parseInt(data.utc_offset.split(':')[0]);
        const offsetMinutes = parseInt(data.utc_offset.split(':')[1]);

        const now = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);

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
