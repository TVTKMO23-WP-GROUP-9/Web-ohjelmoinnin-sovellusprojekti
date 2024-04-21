import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const FavoriteList = ({ profile}) => {
  const isOwnProfile = profile && profile.isOwnProfile;
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage, setfavoritesPerPage] = useState(10);
const [favorites, setFavorites] = useState([]);
useEffect(() => {
  const fetchFavorites = async () => {
    try {
      if (profile && profile.profileid) {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/favoritelist/profile/${profile.profileid}`);
        setFavorites(response.data);
        console.log("Saadut tiedot favoritelist", response.data); 
      }
    } catch (error) {
      console.error('Error fetching Favorites:', error);
    }
  };

  fetchFavorites();
}, [profile]);

// poistetaan suosikeista suosikki
const handleDeleteFavorite = async (idfavoritelist) => {
  try {
    await axios.delete(`${VITE_APP_BACKEND_URL}/favoritelist/${idfavoritelist}`);
    console.log(response.data);
    setFavorites(favorites.filter(favorite => favorite.idfavoritelist !== idfavoritelist));
    setConfirmDeleteId(null);
  } catch (error) {
  }
};



const indexOfLastFavorite = currentPage * favoritesPerPage;
const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
const currentFavorites = favorites.slice(indexOfFirstFavorite, indexOfLastFavorite);

  return (
    <>
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
        <ul className="profileSections">
        {currentFavorites.map((favorite, index) => (
  <li key={index}>
    <Link to="#">{favorite.favoriteditem}</Link>
    {isOwnProfile && (
    <button onClick={() => handleDeleteFavorite(favorite.idfavoritelist)}>Poista</button> ) }
  </li>
))}
      </ul>
    </>
  );
}
  
  export default FavoriteList;