import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import ReviewFormSerie from './ReviewFormSerie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './movies.css';
import Reviews from './Reviews';
import { getHeaders } from '@auth/token';


const SeriesDetails = (user) => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
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

          const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${response.data.profileid}/${id}/1`);

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
  
    const fetchSeries = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/series/${id}`);
        setSeries(response.data);
      } catch (error) {
        console.error('Hakuvirhe', error);
      }
    };

    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/tv/provider/${id}`);
        setProviders(response.data);
      } catch (error) {
        // asetetaan providers-tila tyhjään JSON-objektiin
        setProviders({});
      }
    };

    fetchSeries();

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
                  mediatype: 1
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
    <div id="backdrop" style={series && { backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`, backgroundSize: 'cover' }}>
      <div className="content">

        {series && (
          <>

            <div className="moviemain">
              <img className="posterimg" src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} alt={series.title} />

              <div className="movieinfo">
                <>
                <div className="flex-container">
                  <h2>{series.name}</h2> 
                  <button className="favorite-button" onClick={handleFavoriteAction}>{isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}</button>
                </div>


                <p><b>Kuvaus:</b> {series.overview}</p>
                <p><b>Kesto:</b> {series.episode_run_time.map(time => `${time}`).join('-')} min / per jakso</p>
                <p><b>Genre:</b> {series.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {series.first_air_date}</p>
                <p><b>Tuotantoyhtiöt:</b> {series.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Kerännyt ääniä:</b> {series.vote_count}</p>
                <p><b>Äänten keskiarvo:</b> {series.vote_average} / 10 </p>
                {providers && providers.flatrate && providers.rent && (
                  <>
                  <p><b>Katsottavissa:</b> <br/>
                    {providers.flatrate.map(provider => (
                      <span key={provider.provider_id}>
                        <a href={`https://www.themoviedb.org/tv/${series.id}/watch`}><img src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
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


              </div>
            </div>

            <div className="moviereviews">

            <div><ReviewFormSerie tvShowId={id} user={user} /></div>

            <br/>
            <h2>Viimeisimmät arvostelut</h2>

            <div className="reviewslisted"><Reviews movieId={id} mediatype={1} adult={series.adult}/></div>
            </div>
            
          </>
        )}

      </div>
    </div>
    </>
  );
};


export default SeriesDetails;