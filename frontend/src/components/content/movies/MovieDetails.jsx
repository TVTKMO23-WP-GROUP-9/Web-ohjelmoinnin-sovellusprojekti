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
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(false);
  const [groupsPerPage, setGroupsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const headers = getHeaders();
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const token = sessionStorage.getItem('token');
          const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };

          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user.user}`);
          
            setProfileId(response.data.profileid);

            console.log("Käyttäjän id:", response.data.profileid);
            console.log("sivun listatuotteen id:", id);

            const gresponse = await axios.get(`${VITE_APP_BACKEND_URL}/grouplist/profile/${user.user.user}/0`);
  
            setGroups(gresponse.data);

            console.log('käyttäjän ryhmät:', gresponse.data);

          const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${response.data.profileid}/${id}/0`);

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
            } else {
                const data = {
                    favoriteditem: id,
                    groupid: null,
                    profileid: profileId,
                    mediatype: 0
                };
                await axios.post(`${VITE_APP_BACKEND_URL}/favoritelist`, data, { headers });
                setIsFavorite(true);
            }
        } else {
            console.error('Profiili-id tai sarjan id puuttuu');
        }
    } catch (error) {
        console.error('Virhe suosikin käsittelyssä:', error);
    }
  };

  const toggleGroups = () => {
    setGroup(!group);
  };

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

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
                <div className="flex-container">
                  <h2>{movie.title}</h2> 
                  {profileId &&
                  <button className="favorite-button" onClick={handleFavoriteAction}>{isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}</button>
                  }
                  <button className="favorite-button" onClick={toggleGroups}><div className="uni06"></div></button>
                </div>

                <p><b>Kuvaus:</b> {movie.overview}</p>
                <p><b>Kesto:</b> {movie.runtime} min</p>
                <p><b>Genre:</b> {movie.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {new Date(movie.release_date).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}</p>
                <p><b>Tuotantoyhtiöt:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>

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
            <div className='group-between'>
            <div className="group-view">
              <div className='group-content'>
                {group && (
                
                  <>  

                <ul className="pagination">
                <li>
                <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                ⯇
                </button>
                &nbsp; <span className="communityinfo">selaa</span> &nbsp;
                <button className="buttonnext" onClick={() =>
                setCurrentPage(currentPage < Math.ceil(groups.length / groupsPerPage) ?
                currentPage + 1 : Math.ceil(groups.length / groupsPerPage))}>
                ⯈
                </button>
                </li>
              </ul>

              <ul className="profileSections">
              {currentGroups.map((group, index) => (
                <li key={index}><Link to={`/group/${group.groupid}`}>{group.groupname}</Link>                  {profileId &&
                  <button className="favorite-button" onClick={handleFavoriteAction}>{isFavorite ? <FaHeart className="favorite-icon" size={20} /> : <FaRegHeart size={20} />}</button>
                  }</li>
              ))}
              </ul>
                    </>
              )}

              </div>
            </div>
            </div>
            
            <div className="moviereviews">
              {profileId &&
              <div><ReviewForm movieId={id} user={user} /></div>
              }
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
