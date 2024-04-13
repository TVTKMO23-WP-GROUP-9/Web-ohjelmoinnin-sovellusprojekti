import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin
import.meta.env.VITE_APP_BACKEND_URL;

const Comingsoon = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEventIndex, setHoveredEventIndex] = useState(-1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [intervalId, setIntervalId] = useState(null); // Lisätty intervalId
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
            eventUrl: eventNode.querySelector('EventURL').textContent,
            originalTitle: eventNode.querySelector('OriginalTitle').textContent,
            productionYear: eventNode.querySelector('ProductionYear').textContent
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
    if (hoveredEventIndex === -1) {
      setCurrentEventIndex(prevIndex => Math.min(prevIndex + 1, events.length - 5));
    }
  };
  const handlePrev = () => {
    if (hoveredEventIndex === -1) {
      setCurrentEventIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };
  const handleMouseEnter = (handler) => {
    handler(); // Kutsu tapahtumakäsittelijää heti
    // Kutsu tapahtumakäsittelijää uudelleen 0.2 sekunnin välein
    const id = setInterval(handler, 200);
    setIntervalId(id); // Tallenna intervalin id
    // Pysäytä interval, kun hiiri poistuu nuolen päältä
    return () => clearInterval(id);
  };
  const handleMouseLeave = () => {
    clearInterval(intervalId); // Pysäytä interval, kun hiiri poistuu nuolen päältä
  };
  
  const handleClick = async (originalTitle, productionYear) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}movie/search?query=${encodeURIComponent(originalTitle)}&page=1&year=${encodeURIComponent(productionYear)}&language=any`);
      const movieId = response.data[0].id; 
      if (movieId) {
        // Navigoi elokuvan sivulle suoraan
        window.location.href = `/movie/${movieId}`;
      } else {
        console.error('Elokuvan id:tä ei löydy');
      }
    } catch (error) {
      console.error('Virhe elokuvien haussa:', error);
    }
  };
  return (
    <div className="event-list">
      {loading ? (
        <p>Hetkonen...</p>
      ) : (
        <div className="events-container">
          <div className="arrow">
          <img
            src="../src/components/content/images/leftarrow.jpg"
            alt="Left Arrow"
            onClick={handlePrev}
            onMouseEnter={() => handleMouseEnter(handlePrev)}
            onMouseLeave={handleMouseLeave} // Kutsu handleMouseLeave, kun hiiri poistuu
          /></div>
          {visibleEvents.map((event, index) => (
            <div
              key={event.id}
              className="event-item"
              onMouseEnter={() => setHoveredEventIndex(index)}
              onMouseLeave={() => setHoveredEventIndex(-1)}
              onClick={() => handleClick(event.originalTitle, event.productionYear)} 
            >

            <img src={event.imageUrl} alt={event.title} />
            <img src={event.imageUrl} alt="Event" />
            <div className="head">{event.title}</div>

            </div>
          ))}
          <div className="arrow">
          <img
            src="../src/components/content/images/rightarrow.jpg"
            alt="Right Arrow"
            onClick={handleNext}
            onMouseEnter={() => handleMouseEnter(handleNext)}
            onMouseLeave={handleMouseLeave} // Kutsu handleMouseLeave, kun hiiri poistuu
          /></div>
        </div>
      )}
    </div>
  );
};
export default Comingsoon;