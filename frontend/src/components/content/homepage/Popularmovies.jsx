import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../movies/movies.css';

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);

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
            const popularMovies = response.data.slice(0, 9);
            setMovies(popularMovies);
        } catch (error) {
            console.error('Hakuvirhe:', error);
        }
    };

    return (
        <div>
          <div className="movie-container">
              {movies.map(movie => (
              <div key={movie.id} className="movie-item">
                <Link to={`/movie/${movie.id}`}>
                <img src={movie.poster_path} alt={movie.title} />
                </Link>
              </div>
              ))}
          </div>
        </div>
    );
};

export default PopularMovies;