import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Homepage.css';

const PopularSeries = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredEventIndex, setHoveredEventIndex] = useState(-1);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [visibleEvents, setVisibleEvents] = useState([]);
    const [intervalId, setIntervalId] = useState(null); // Lisätty intervalId

    useEffect(() => {
        fetchPopularSeries();
    }, []);

    const fetchPopularSeries = async () => {
        try {
            const response = await axios.get('http://localhost:3001/series/discover', {
                params: {
                    sort_by: 'popularity.desc'
                   
                  }
            });
            const popularSeries = response.data;
            setSeries(popularSeries);
            setLoading(false);
        } catch (error) {
            console.error('Hakuvirhe:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setVisibleEvents(series.slice(currentEventIndex, currentEventIndex + 5));
      }, [currentEventIndex, series]);
    
      const handleNext = () => {
        if (hoveredEventIndex === -1) {
          setCurrentEventIndex(prevIndex => Math.min(prevIndex + 1, series.length - 5));
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
              {visibleEvents.map((serie, index) => (
            <div
                key={serie.id}
                className="event-item"
                onMouseEnter={() => setHoveredEventIndex(index)}
                onMouseLeave={() => setHoveredEventIndex(-1)}
            >
                <Link to={`/series/${serie.id}`} className="link-style">
                    <img src={serie.poster_path} alt={serie.title} />
                    <div className="head">{serie.title}</div>
                </Link>
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

export default PopularSeries;