import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import ReviewForm from './ReviewForm';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './movies.css';
import Reviews from './Reviews';
import { getHeaders } from '@auth/token';

const MovieDetails = (user) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 
  const [profileId, setProfileId] = useState(false); 
  const { favoriteditem } = useParams();
  const headers = getHeaders();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const token = sessionStorage.getItem('token');
          const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };
          console.log("Token from sessionStorage:", token);
          console.log("Profilename from token:", user.user.user);
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user.user}`);

          console.log("Käyttäjän id:", response.data.profileid);
          
          setProfileId(response.data.profileid);

          console.log("Käyttäjän id:", response.data.profileid);
          console.log("sivun listatuotteen id:", id);

          const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${response.data.profileid}/${id}/0`);

         /* console.log(FLresponse.data)
          if (FLresponse.data.hasOwnProperty('favoriteditem') && FLresponse.data.favoriteditem === 1) {
          setIsFavorite(true);
          } */
          
          console.log("asdasdas", FLresponse.data.favorites)

          const isitFavorite = FLresponse.data.favorites.find(item => item.favoriteditem === id);

          if (isitFavorite) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
          

          console.log("Response from profile:", response.data);
      } catch (error) {
          console.error('Virhe haettaessa profiilitietoja:', error);
      }
  };

  fetchProfile();

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/${id}`);
        setMovie(response.data);
        console.log(response.data.adult)
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
  }, [id, user]);

  const handleFavoriteAction = async () => {
    try {
        if (profileId&& id) {
            if (isFavorite) {
                await axios.delete(`${VITE_APP_BACKEND_URL}/favorite/${profileId}/${id}`, { headers });
                setIsFavorite(false);
                console.log('Suosikki poistettiin onnistuneesti');
            } else {
                const data = {
                    favoriteditem: id,
                    groupid: null,
                    profileid: profileId,
                    mediatype: 0
                };
                await axios.post(`${VITE_APP_BACKEND_URL}/favoritelist`, data, { headers });
                setIsFavorite(true);
                console.log('Suosikki lisättiin onnistuneesti');
            }
        } else {
            console.error('Profiili-id tai sarjan id puuttuu');
        }
    } catch (error) {
        console.error('Virhe suosikin käsittelyssä:', error);
    }
  };

  return (

    <>
    <div id="backdrop" style={movie && { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover' }}>
      <div className="content">

        {movie && (
          <>

            <div className="moviemain">
              <img className="posterimg" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
              <div style={{ position: 'relative' }}>
              <button className="favorite-button" onClick={handleFavoriteAction}>
                {isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}
              </button>
              </div>
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

              <div><ReviewForm movieId={id} user={user} /></div>

              <br/>
              <h2>Viimeisimmät arvostelut</h2>

              <div className="reviewslisted"><Reviews movieId={id} mediatype={0} adult={movie.adult}/></div>
            </div>

          </>
          
        )}
      </div>
    </div>
    </>
  );
};

export default MovieDetails;
