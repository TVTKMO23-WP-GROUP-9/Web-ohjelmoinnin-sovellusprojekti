import React, { useState, useEffect } from 'react';
import './Comingsoon.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const Comingsoon = () => {
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
            imageUrl: eventNode.querySelector('EventLargeImagePortrait').textContent,
            title: eventNode.querySelector('Title').textContent,
            eventUrl: eventNode.querySelector('EventURL').textContent
          };
        });
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error('Tiedonhakuvirhe:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      {loading ? (
        <p>Hetkonen...</p>
      ) : (
        <div className="events-container">
          {events.map(event => (
            <div key={event.id} className="event-item">
                <a href={event.eventUrl} target="_blank" rel="noopener noreferrer"> {/* Avaa linkki uuteen välilehteen */}
                <img src={event.imageUrl} alt="Event" />
                <div className="head">{event.title}</div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comingsoon;
