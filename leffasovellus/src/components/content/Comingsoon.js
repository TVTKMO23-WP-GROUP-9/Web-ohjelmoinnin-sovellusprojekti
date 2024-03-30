import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://www.finnkino.fi/xml/Events/?listType=ComingSoon');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const eventNodes = xmlDoc.getElementsByTagName('Event');
        const eventsData = Array.from(eventNodes).map(eventNode => {
          return {
            id: eventNode.querySelector('ID').textContent,
            title: eventNode.querySelector('Title').textContent,
            genres: eventNode.querySelector('Genres').textContent,
            synopsis: eventNode.querySelector('ShortSynopsis').textContent,
            imageUrl: eventNode.querySelector('EventLargeImagePortrait').textContent,
            eventUrl: eventNode.querySelector('EventURL').textContent
          };
        });
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Finnkino Events - Coming Soon</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>Genres: {event.genres}</p>
              <p>{event.synopsis}</p>
              <img src={event.imageUrl} alt={event.title} />
              <a href={event.eventUrl}>More Info</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
