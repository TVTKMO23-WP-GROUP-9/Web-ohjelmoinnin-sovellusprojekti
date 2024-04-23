import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import ReviewFormSerie from './ReviewFormSerie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './favoritebutton.css';
import Reviews from './Reviews';
import { getHeaders } from '@auth/token';


const SeriesDetails = (user) => {
  const { id, profilename } = useParams();
  const [series, setSeries] = useState(null);
  const [providers, setProviders] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 
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
          console.log("Profilename from token:", user);
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`);

          console.log("Response from profile id:", response.data.profileid);

          setProfileid(response.data.profileid);



          const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${response.data.profileid}/${favoriteditem}`);

         /* console.log(FLresponse.data)
          if (FLresponse.data.hasOwnProperty('favoriteditem') && FLresponse.data.favoriteditem === 1) {
          setIsFavorite(true);
          } */
          
          console.log("asdasdas", FLresponse.data)

            if (FLresponse.data && Array.isArray(FLresponse.data.favoritelist)) {
              const isFavorite = FLresponse.data.favoritelist.includes(favoriteditem);
              setIsFavorite(isFavorite);
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


  console.log('Käyttäjä:', user.user.profileid);
  if (user.user.profileid !== null) {

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {

              const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${user.user.profileid}/${id}`, { headers });
              console.log (FLresponse.data);
              if (FLresponse.data.hasOwnProperty('favoriteditem') && FLresponse.data.favoriteditem === true) {
                  setIsFavorite(true);
              } else {
                  setIsFavorite(false);
              }

            } catch (error) {
                console.error("Tarkistusvirhe:", error);
            }
        }
        
        checkFavoriteStatus();
    }, [user.user.profileid, id]);
}

const handleFavoriteAction = async () => {
  try {
    if (user.user.profileid !== null) {
      if (isFavorite === true) {

        await axios.delete(`${VITE_APP_BACKEND_URL}/favoritelist/${user.user.profileid}/${id}`);
        setIsFavorite(false);
        console.log('Suosikki poistettiin onnistuneesti');
      } else if (isFavorite === false) {

        const data = {
          favoriteditem: id,
          groupid: null,
          profileid: user.user.profileid,
          mediatype: 1
        };
        await axios.post(`${VITE_APP_BACKEND_URL}/favoritelist`, data);
        setIsFavorite(true);
        console.log('Suosikki lisättiin onnistuneesti');
      }
    } else {
      console.error('Profiili-id puuttuu');
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

            <div style={{ position: 'relative' }}>
              <button className="favorite-button" onClick={handleFavoriteAction}>
                {isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}
              </button>
            </div>

              <img className="posterimg" src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} alt={series.title} />
            </div>
              <div className="movieinfo">

                <>
                <h2>{series.name}</h2>
                <p><b>Kuvaus:</b> {series.overview}</p>
                <p><b>Kesto:</b> {series.episode_run_time.map(time => `${time}`).join('-')} min / per jakso</p>
                <p><b>Genre:</b> {series.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {series.first_air_date}</p>
                <p><b>Tuotantoyhtiöt:</b> {series.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Kerännyt ääniä:</b> {series.vote_count}</p>
                <p><b>Äänten keskiarvo:</b> {series.vote_average} / 10 </p>
                <button onClick={() => deleteFromFavorites(series)}>Poista testinappi</button>
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