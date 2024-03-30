import React, { useState, useEffect } from 'react';
import '@css/Comingsoon.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const EventList = () => {
  const [events, setEvents] = useState([]);

	@@ -15,17 +16,15 @@ const EventList = () => {
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
	@@ -34,22 +33,20 @@ const EventList = () => {
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

  export default EventList;