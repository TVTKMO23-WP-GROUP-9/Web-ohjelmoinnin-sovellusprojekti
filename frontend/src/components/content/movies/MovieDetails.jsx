import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Hakuvirhe:', error);
      }
    };

    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/provider/${id}`);
        setProviders(response.data);
      } catch (error) {
        // Jos pyyntö epäonnistuu, asetetaan providers-tila tyhjään JSON-objektiin
        setProviders({});
      }
    };

    fetchMovie();

    // Asetetaan timeout fetchProviders-funktiolle 5 sekunniksi
    const timeoutId = setTimeout(fetchProviders, 100);

    // Palautetaan poisto-funktio, joka suoritetaan komponentin purkamisen yhteydessä
    return () => clearTimeout(timeoutId);
  }, [id]);


  return (

    <>
    <div id="backdrop" style={movie && { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover' }}>
      <div className="content">

        {movie && (
          <>

            <div className="moviemain">
              <img className="posterimg" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />

              <div className="movieinfo">
              {movie && (

                <>
                <h2>{movie.title}</h2>
                <p><b>Kuvaus:</b> {movie.overview}</p>
                <p><b>Kesto:</b> {movie.runtime} min</p>
                <p><b>Genre:</b> {movie.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {movie.release_date}</p>
                <p><b>Tuotantoyhtiöt:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Kerännyt ääniä:</b> {movie.vote_count}</p>
                <p><b>Äänten keskiarvo:</b> {movie.vote_average} / 10 </p>

                {providers && providers.flatrate && providers.rent && (
                    <>
                      <p><b>Katsottavissa:</b> <br/>
                        {providers.flatrate.map(provider => (
                          <span key={provider.provider_id}>
                            <a href={`https://www.themoviedb.org/movie/${movie.id}/watch`}><img className='tinyImg' src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
                          </span>
                        ))}
                      </p>

                      <p><b>Vuokrattavissa:</b> <br/>
                        {providers.rent.map(provider => (
                          <span key={provider.provider_id}>
                            <a href={`https://www.themoviedb.org/movie/${movie.id}/watch`}><img className='tinyImg' src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
                          </span>
                        ))}
                      </p>

                      <p>
                        <a href='https://www.justwatch.com/'>Saatavuus Suomessa JustWatch</a>
                      </p>
                    </>
                  )}
                </>
              )}
                
              </div>
            </div>

            

            <div className="moviereviews">

              <div><ReviewForm movieId={id} /></div>

              <br/>
              <h2>Viimeisimmät arvostelut</h2>

              <div className="reviewslisted"><Reviews movieId={id} mediatype={0}/></div>
            </div>

          </>
          
        )}
      </div>
    </div>
    </>
  );
};

export default MovieDetails;
