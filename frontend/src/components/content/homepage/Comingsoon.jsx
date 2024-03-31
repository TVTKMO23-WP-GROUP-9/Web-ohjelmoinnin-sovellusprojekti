import React, { useState, useEffect } from 'react';
import './Comingsoon.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const Comingsoon = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEventIndex, setHoveredEventIndex] = useState(-1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState([]);

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

  useEffect(() => {
    setVisibleEvents(events.slice(currentEventIndex, currentEventIndex + 5));
  }, [currentEventIndex, events]);

  const handleNext = () => {
    setCurrentEventIndex(prevIndex => Math.min(prevIndex + 1, events.length - 5));
  };

  const handlePrev = () => {
    setCurrentEventIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="event-list">
      {loading ? (
        <p>Hetkonen...</p>
      ) : (
        <div className="events-container">
          <img src="../src/components/content/images/leftarrow.jpg" alt="Left Arrow" onClick={handlePrev} />
          {visibleEvents.map((event, index) => (
            <div
              key={event.id}
              className="event-item"
              onMouseEnter={() => setHoveredEventIndex(index)}
              onMouseLeave={() => setHoveredEventIndex(-1)}
            >
              <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">
                <img src={event.imageUrl} alt="Event" />
                {hoveredEventIndex === index && <div className="head">{event.title}</div>}
              </a>
            </div>
          ))}
          <img src="../src/components/content/images/rightarrow.jpg" alt="Right Arrow" onClick={handleNext} />
        </div>
      )}
    </div>
  );
};

export default Comingsoon;
