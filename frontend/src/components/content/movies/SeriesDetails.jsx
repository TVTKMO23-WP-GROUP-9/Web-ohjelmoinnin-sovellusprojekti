import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import ReviewFormSerie from './ReviewFormSerie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './favoritebutton.css';
import Reviews from './Reviews';
import { getHeaders } from '@auth/token';


const SeriesDetails = ({user}) => {
  const { id} = useParams();
  const { profilename} = useParams();
  const [series, setSeries] = useState(null);
  const [providers, setProviders] = useState(null);
  const [profileid, setProfileid] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const headers = getHeaders();
  const { favoriteditem} = useParams();

  

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



  // tarkistetaan onko valmiiksi favoritelistalla
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        let isFavorite;
        if (profileid && series && typeof series.name === 'string') {
          console.log(`Profiililla ${profileid} on sarja ${series ? series.name : 'N/A'}`);
          console.log(`isFavorite ennen axios = ${isFavorite}`)
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${profileid}?favoriteditem=${series.name}`);
          isFavorite = response.data.isFavorites.length > 0;
          console.log(`isFavorite jälkeen axios= ${isFavorite}`)
        } else {
          console.log('profileid tai series puuttuu');

        } 
      } catch (error) {
        console.error('Virhe tarkistaessa checkfavorite:', error);
      }
    };
    checkFavorite();
  }, [profileid, series]);

const addToFavorites = async () => {
  try {
    if (profileid && series && typeof series.name === 'string') { 
      const data = {
        favoriteditem: series.name,
        groupid: null,
        profileid: profileid,
        mediatype: 1
      };
       // lisätään tässä suosikki suosikkilistaan 
      await axios.post(`${VITE_APP_BACKEND_URL}/favoritelist`, data);

      setIsFavorite(true); 
      console.log('Suosikki lisättiin onnistuneesti');
    } else {
      console.error('Sarjaa tai profiilia ei löydy');
    }
  } catch (error) {
    console.error('JEESUSKO EI TOIMI TÄMÄ ADDTOFAVORITES', error);
  }
};

// Poistetaan suosikeista sarja
async function deleteFromFavorites(profileid, favoriteditem) {
  try {
    const response = await axios.delete(`${VITE_APP_BACKEND_URL}/favoritelist/${profileid}?favoriteditem=${series.name}`);
    console.log(response.data);
    setIsFavorite(false);
    console.log('Suosikki poistettiin onnistuneesti');
  } catch (error) {
    console.error('Virhe suosikin poistossa:', error);
  }
}

  return (
    <div id="backdrop" style={series && { backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`, backgroundSize: 'cover' }}>
      <div className="content">
        {series && (
          <div id="backdropbg">
            <div className="moviemain">
            <div style={{ position: 'relative' }}>
        <button className="favorite-button" onClick={isFavorite ? deleteFromFavorites : addToFavorites}>
        {isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}
        </button>
        <img className="poster-img" src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} alt={series.title} />
      </div>
              <div className="movieinfo">

                <h2>{series.name}</h2>
                <p><b>Kuvaus:</b> {series.overview}</p>
                <p><b>Kesto:</b> {series.episode_run_time.map(time => `${time}`).join('-')} min / per jakso</p>
                <p><b>Genre:</b> {series.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {series.first_air_date}</p>
                <p><b>Tuotantoyhtiöt:</b> {series.production_companies.map(company => company.name).join(', ')}</p>
                <p><b>Kerännyt ääniä:</b> {series.vote_count}</p>
                <p><b>Äänten keskiarvo:</b> {series.vote_average} / 10 </p>
              <button onClick={() => deleteFromFavorites(series)}>Poista testinappi</button>
                {providers && providers.flatrate && (
                  <table className='providers'>
                    <tbody>
                      <tr>
                        <td><h3>Katso</h3></td>
                        {providers.flatrate.map(provider => (
                          <td key={provider.provider_id}>
                            <a href={`https://www.themoviedb.org/tv/${series.id}/watch`}><img src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td colSpan="6">
                          <a href='https://www.justwatch.com/'>Saatavuus Suomessa JustWatch</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="moviereviews">

            {/*<div><ReviewFormSerie tvShowId={id} /></div>*/}

            <br/>
            <h2>Viimeisimmät arvostelut</h2>

            <div className="reviewslisted"><Reviews movieId={id} mediatype={1}/></div>
            </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default SeriesDetails;
