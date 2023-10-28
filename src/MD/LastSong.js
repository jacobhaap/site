import React, { useState, useEffect } from 'react';

function LastSong() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('https://api.j3.cx/last-song')
            .then(response => response.json())
            .then(data => setSongs(data));
    }, []);

    return (
        <ul>
        {songs.map((song, index) => (
            <li key={index}>
                <a href={song.url} target="_blank" rel="noopener noreferrer">{song.name}</a> by {song.artist}
            </li>
        ))}
    </ul>
    );
}

export default LastSong;