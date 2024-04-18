import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const MovieCarousel = ({ movies, currentPage, pageSize, totalPages, setCurrentPage, handleScroll }) => {
  const carouselRef = useRef(null);

  const currentResults = movies.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <>
    <div className="carousel-container">
      <div className="resultsTitle">
        <button onClick={() => handleMoviePageChange('prev')} className='bigArrow'>&#10094;&#10094;</button>
        <button onClick={() => changePage('prev')} className='bigArrow'>&#10094;&nbsp;</button>
        <h2>Elokuvat</h2>
        <button onClick={() => changePage('next')} className='bigArrow'>&nbsp;&#10095;</button>
        <button onClick={() => handleMoviePageChange('next')} className='bigArrow'>&#10095;&#10095;</button>
      </div>

      <div ref={carouselRef} className="carousel" onScroll={handleScroll}>
        {currentResults.map((movie, index) => (
          <div key={index} className="movie-item">
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.poster_path} alt={movie.title} />
              <div className="headoverview">
                <div><h3>{movie.title}</h3></div>
                <div>{movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default MovieCarousel;