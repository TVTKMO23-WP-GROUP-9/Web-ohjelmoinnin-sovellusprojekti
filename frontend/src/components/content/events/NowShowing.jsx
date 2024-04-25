import React, { useState, useEffect } from 'react';

const NowShowing = ({ setSelectedMovie }) => {
    const [inMovies, setInMovies] = useState([]);

    useEffect(() => {
        fetch(`https://www.finnkino.fi/xml/Events/?listType=NowInTheatres`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'text/xml');
                const eventsData = Array.from(xmlDoc.getElementsByTagName('Event')).map(event => ({
                    id: event.querySelector('ID')?.textContent || '',
                    name: event.querySelector('Title')?.textContent || '',
                }));
                setInMovies(eventsData);
            })
            .catch(error => console.error('Virhe haettaessa tapahtumia:', error));
    }, []);

    return (
        <div>
            <select className="selectMaxWidth eventItem dropdown" id="movie" onChange={(e) => setSelectedMovie(e.target.value)}>
                <option value="">Kaikki elokuvat</option>
                {inMovies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.name}</option>
                ))}
            </select>
        </div>
    );
};

export default NowShowing;
