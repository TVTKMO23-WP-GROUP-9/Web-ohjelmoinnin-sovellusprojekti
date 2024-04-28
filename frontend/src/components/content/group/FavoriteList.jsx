import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';

const FavoriteList = ({ id, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage, setfavoritesPerPage] = useState(4);
  const [favorites, setFavorites] = useState([]);
  const [adult, setAdult] = useState(false);
  const headers = getHeaders();
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const aresponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`, { headers });
          
        setAdult(aresponse.data.adult);
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/group/${id}/ANY`);
 
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
        
      } catch (error) {
        console.error('Hakuvirhe:', error);
      }
    };

    fetchFavorites();
  }, [id, user]); 



  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

  return (
    <>
    
    <ul className="favorite-list">
      <span className="userinfo">
        Löytyi <b>{favorites.length}</b> Suosikkia.<br />
      </span>
      <ul className="pagination">
        <li>
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
            &#9664;
          </button>
          &nbsp; <span className="communityinfo">selaa</span> &nbsp;
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(favorites.length / favoritesPerPage) ? currentPage + 1 : Math.ceil(favorites.length / favoritesPerPage))}>
            &#9654;
          </button>
          
        </li>
      </ul>

      {currentFavorites        
        .filter(favorite => favorite.adult === false || adult === true)
        .map((favorite, index) =>  (
          <li key={index}>
            {favorite.mediatype === 0 ? (
           <div className="favorite-poster">
           <Link className='favoritetitle' to={`/movie/${favorite.favoriteditem}`}><img className='favoriteimg' src={`https://image.tmdb.org/t/p/w342${favorite.movie.poster_path}`} alt={favorite.movie.title} />
           </Link>
         </div>
       ) : (
          <div className="favorite-poster">
            <Link className='favoritetitle' to={`/series/${favorite.favoriteditem}`}>
             <img className='favoriteimg' src={`https://image.tmdb.org/t/p/w342${favorite.movie.poster_path}`} alt={favorite.movie.name} />
            </Link>
          </div>

          )}
            {favorite.mediatype === 0 ? (
              <Link className='favoritetitle' to={`/movie/${favorite.favoriteditem}`}><span>{favorite.movie.title.length > 20 ? `${favorite.movie.title.substring(0, 20)}...` : favorite.movie.title}</span></Link>
              
            ) : (
              <Link className='favoritetitle' to={`/series/${favorite.favoriteditem}`}><span>{favorite.movie.name.length  > 20 ? `${favorite.movie.name.substring(0, 20)}...` : favorite.movie.name}</span></Link>
            )} 
             
          </li>
          
        ))}

     </ul>

    </>
  );
}

export default FavoriteList;
