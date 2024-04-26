import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
const { VITE_APP_FRONTEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';

const FavoriteList = ({ profile, user }) => {
  const isOwnProfile = profile && profile.isOwnProfile;
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage, setfavoritesPerPage] = useState(4);
  const [favorites, setFavorites] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [adult, setAdult] = useState(false);
  const headers = getHeaders();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (profile && profile.profileid) {
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/profile/${profile.profileid}`);
          console.log(profile);
          console.log('käyttäjä:', user);
          const aresponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`, { headers });
            
          setAdult(aresponse.data.adult);
          console.log('frontti: ', VITE_APP_FRONTEND_URL);
          
          const favoriteData = response.data;
          const favoritesWithMovies = await Promise.all(favoriteData.map(async favorite => {
            try {
              let responseData;
              if (favorite.mediatype === 0) {
                const movieResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/movie/${encodeURIComponent(favorite.favoriteditem)}`);
                responseData = movieResponse.data;
              } else if (favorite.mediatype === 1) {
                const tvResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/series/${encodeURIComponent(favorite.favoriteditem)}`);
                responseData = tvResponse.data;
              }
              if (responseData && (responseData.title || responseData.name)) {
                return {
                  ...favorite,
                  movie: responseData,
                };
              } else {
                return favorite;
              }
            } catch (error) {
              console.error('Hakuvirhe:', error);
              return favorite;
            }
          }));
          setFavorites(favoritesWithMovies);
        }
      } catch (error) {
        console.error('Hakuvirhe:', error);
      }
    };

    fetchFavorites();
  }, [profile, user]);
  const handleEditClick = () => {
    console.log("onko oma profiili", isOwnProfile)
    setEditMode(!editMode);
  };

  // Poistetaan suosikeista suosikki
  const DeleteFavorite = async (favoriteditem) => {
    try {
      if (profile && profile.profileid) {
        await axios.delete(`${VITE_APP_BACKEND_URL}/favorite/${profile.profileid}/${favoriteditem}`);
        setFavorites(favorites.filter(favorite => favorite.favoriteditem !== favoriteditem)); 
      } else {
        console.error('Profiili-id puuttuu');
      }
    } catch (error) {
      console.error('Ei pystytty poistamaan', error);
    }
  };




  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

  return (
    <>
    {(profile && profile.isOwnProfile) &&
        <span className="userinfo">
        jaa linkki <Link className="link-style" to={`/favorites/${profile.profilename}`}>{import.meta.env.VITE_APP_FRONTEND_URL}/favorites/{profile.profilename}</Link>
      </span>
    }
    <ul className="favorite-list">
      <span className="userinfo">
        Löytyi <b>{favorites.length}</b> Suosikkia.<br />
      </span>

      <ul className="pagination">
        <li>
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
            ⯇
          </button>
          &nbsp; <span className="communityinfo">selaa</span> &nbsp;
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(favorites.length / favoritesPerPage) ? currentPage + 1 : Math.ceil(favorites.length / favoritesPerPage))}>
            ⯈
          </button>
          
        </li>
      </ul>

        {currentFavorites        
        .filter(favorite => favorite.adult === false || adult === true)
        .map((favorite, index) =>  (
          <li key={index}>
            {favorite.mediatype === 0 ? (
           <div className="favorite-poster">
           <img className='favoriteimg' src={`https://image.tmdb.org/t/p/w342${favorite.movie.poster_path}`} alt={favorite.movie.title} />
           {isOwnProfile && editMode && ( 
                <button className="favoriteDButton" onClick={() => DeleteFavorite(favorite.favoriteditem)}>X</button> 
              )}
         </div>
       ) : (
          <div className="favorite-poster">
          <img className='favoriteimg' src={`https://image.tmdb.org/t/p/w342${favorite.movie.poster_path}`} alt={favorite.movie.name} />
          {isOwnProfile && editMode && (
                <button className="favoriteDButton" onClick={() => DeleteFavorite(favorite.favoriteditem)}>X</button> 
              )}
  </div>

          )}
            {favorite.mediatype === 0 ? (
              <Link className='favoritetitle' to={`/movie/${favorite.favoriteditem}`}>{favorite.movie.title}</Link>
            ) : (
              <Link className='favoritetitle' to={`/series/${favorite.favoriteditem}`}>{favorite.movie.name}</Link>
            )} 
             
          </li>
          
        ))}

     </ul>
     <button className="compactButton" onClick={handleEditClick}>
        {editMode ? 'Lopeta muokkaus' : 'Muokkaa suosikkeja'}
      </button>
    </>
  );
}

export default FavoriteList;
