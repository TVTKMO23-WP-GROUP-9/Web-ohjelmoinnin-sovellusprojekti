import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null); 
  
    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/movie/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Virhe elokuvan hakemisessa:', error);
        }
      };
      
      fetchMovie(); 
    }, [id]); 
  
    return (
      <div className="content">

        <Link to="/search">Tee uusi haku</Link> <br/><br/>

        {movie && (
          <div>
            
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p><b>Kuvaus:</b> {movie.overview}</p>
            <p><b>Kesto:</b> {movie.runtime} min</p>
            <p><b>Genre:</b> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><b>Julkaistu:</b> {movie.release_date}</p>
            <p><b>Tuotantoyhtiöt:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>
            <p><b>Kerännyt ääniä:</b> {movie.vote_count}</p>
            <p><b>Äänten keskiarvo:</b> {movie.vote_average} / 10 </p>

          </div>
        )}
      </div>
    );
  };
  
  export default MovieDetails;