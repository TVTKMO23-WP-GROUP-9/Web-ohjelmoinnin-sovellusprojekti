import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './community.css';
import UserList from './Userlist';
import AllGroups from './AllGroups';

const Community = () => {
    const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchRandomBackdrop = async () => {
      try {

        const response = await axios.get(`http://localhost:3001/movie/discover`);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        const randomBackdrop = response.data.results[randomIndex].backdrop_path;
        setMovie(response.data.results[randomIndex]);
      } catch (error) {
        console.error('Error fetching random backdrop:', error);
      }
    };

    fetchRandomBackdrop();
  }, []);

    return (
        <div id="backdrop" style={movie && { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover' }}>
        <div className="content">
            <h2>Yhteisö</h2>
            Löydä palvelumme käyttäjät, ryhmät ja arvostelut täältä.
    
            <UserList />
            <AllGroups />

        </div>
        </div>
    );
};

export default Community;
