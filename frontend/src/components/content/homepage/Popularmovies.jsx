import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Comingsoon.css';

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredEventIndex, setHoveredEventIndex] = useState(-1);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [visibleEvents, setVisibleEvents] = useState([]);
    const [intervalId, setIntervalId] = useState(null); // Lisätty intervalId

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movie/discover', {
                params: {
                    sort_by: 'popularity.desc'
                   
                  }
            });
            const popularMovies = response.data;
            setMovies(popularMovies);
            setLoading(false);
        } catch (error) {
            console.error('Hakuvirhe:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setVisibleEvents(movies.slice(currentEventIndex, currentEventIndex + 5));
      }, [currentEventIndex, movies]);
    
      const handleNext = () => {
        if (hoveredEventIndex === -1) {
          setCurrentEventIndex(prevIndex => Math.min(prevIndex + 1, movies.length - 5));
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
              {visibleEvents.map((movie, index) => (
            <div
                key={movie.id}
                className="event-item"
                onMouseEnter={() => setHoveredEventIndex(index)}
                onMouseLeave={() => setHoveredEventIndex(-1)}
            >
                <Link to={`/movie/${movie.id}`} className="link-style">
                    <img src={movie.poster_path} alt={movie.title} />
                    <div className="head">{movie.title}</div>
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

export default PopularMovies;