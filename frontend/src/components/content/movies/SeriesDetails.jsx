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
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(false);
  const [groupsPerPage, setGroupsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [adult, setAdult] = useState(false);
  const headers = getHeaders();
 
  useEffect(() => {
    if (user.user) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user.user}`, { headers });
          setProfileId(response.data.profileid);
          
          const gresponse = await axios.get(`${VITE_APP_BACKEND_URL}/grouplist/profile/${user.user.user}/0`, { headers });
          const groupData = [];
  
          for (const group of gresponse.data) {
            try {
              const FLGresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/group/${group.groupid}/1`, { headers });
              const isGFavoriteItem = FLGresponse.data.find(item => item.favoriteditem === id);
              const isGFavorite = isGFavoriteItem ? true : false;
  
              groupData.push({
                ...group,
                isGFavorite
              });
            } catch (error) {
              console.error('Virhe haettaessa ryhmätietoja:', error);
              // Jos suosikkeja ei löydy, aseta isGFavorite arvoksi false
              groupData.push({
                ...group,
                isGFavorite: false
              });
            }
          }
  
          setGroups(groupData);
  
          const FLresponse = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/${response.data.profileid}/${id}/1`, { headers });
          const isitFavorite = FLresponse.data.favorites.find(item => item.favoriteditem === id);
  
          if (isitFavorite) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        } catch (error) {
          console.error('Virhe haettaessa profiilitietoja:', error);
        }
      };
  
      fetchProfile();

    }
  
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
  

  useEffect(() => {
    if (series) {
      setAdult(series.adult);
    }
  }, [series]);
  
    
  
const handleFavoriteAction = async () => {
  try {
      if (profileId&& id) {
          if (isFavorite) {
              await axios.delete(`${VITE_APP_BACKEND_URL}/favorite/${profileId}/${id}/1`, { headers });
              setIsFavorite(false);
          } else {
              const data = {
                  favoriteditem: id,
                  groupid: null,
                  profileid: profileId,
                  mediatype: 1,
                  adult: series.adult
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

const handleFavoriteGroupAction = async (groupId, isGFavorite) => {
  try {
    let updatedGroups = [];
    if (groupId && id) {
      
      if (isGFavorite) {
        await axios.delete(`${VITE_APP_BACKEND_URL}/favoritefromgroup/${groupId}/${id}/1`, { headers });
        
        // Päivitä isGFavorite arvo ryhmätiedossa
        updatedGroups = groups.map(groupItem => {
          if (groupItem.groupid === groupId) {
            return { ...groupItem, isGFavorite: false };
          }
          return groupItem;
        });
        setGroups(updatedGroups);
      } else {
        const data = {
          favoriteditem: id,
          groupid: groupId,
          profileid: null,
          mediatype: 1,
          adult: series.adult
        };
        await axios.post(`${VITE_APP_BACKEND_URL}/favoritelist`, data, { headers });
        updatedGroups = groups.map(groupItem => {
          if (groupItem.groupid === groupId) {
            return { ...groupItem, isGFavorite: true };
          }
          return groupItem;
        });
        
        setGroups(updatedGroups);
      }
      
    } else {
      console.error('group-id tai sarjan id puuttuu');
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
                  {profileId && 
                  <button className="favorite-button" onClick={handleFavoriteAction}>{isFavorite ? <FaHeart className="favorite-icon" size={34} /> : <FaRegHeart size={34} />}</button>
                  }
                  {profileId &&
                  <button className="favorite-button" onClick={toggleGroups}><img src="/plus.png" className='emoji' /></button>
                  }
                </div>

                <p><b>Kuvaus:</b> {series.overview}</p>
                <p><b>Kesto:</b> {series.episode_run_time.map(time => `${time}`).join('-')} min / per jakso</p>
                <p><b>Genre:</b> {series.genres.map(genre => genre.name).join(', ')}</p>
                <p><b>Julkaistu:</b> {new Date(series.first_air_date).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}</p>
                <p><b>Tuotantoyhtiöt:</b> {series.production_companies.map(company => company.name).join(', ')}</p>

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
            <div className='group-between'>
            {profileId &&
            <div className="moviegroup-view">
              <div className="profile-content">
                {group && (
                
                  <>  

                <ul className="pagination">
                <li>
                <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                &#9664;
                </button>
                &nbsp; <span className="communityinfo">selaa</span> &nbsp;
                <button className="buttonnext" onClick={() =>
                setCurrentPage(currentPage < Math.ceil(groups.length / groupsPerPage) ?
                currentPage + 1 : Math.ceil(groups.length / groupsPerPage))}>
                &#9654;
                </button>
                </li>
              </ul>
              
              <ul className="profileSections">
              {currentGroups.map((group, index) => (
                <li key={index}><Link to={`/group/${group.groupid}`}>{group.groupname}</Link>          
                {profileId &&
                       <button className="favorite-button" onClick={() => handleFavoriteGroupAction(group.groupid, group.isGFavorite)}>
                       {group.isGFavorite ? <FaHeart className="favorite-icon" size={20} /> : <FaRegHeart size={20} />}
                     </button> }</li>
              ))}
              </ul>
                    </>
              )}

              </div>
            </div>
            }
            </div>
            
            <div className="moviereviews">
            {profileId &&
            <div><ReviewFormSerie tvShowId={id} user={user} /></div>
            }
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