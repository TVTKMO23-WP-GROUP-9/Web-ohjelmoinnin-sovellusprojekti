import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import GroupList from './GroupList';

const ProfileDetails = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const { profilename } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = user?.username || '';
        const response = await axios.get(`http://localhost:3001/profile/${user?.username || profilename || username}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Virhe haettaessa profiilitietoja:', error);
      }
    };
  
    fetchProfile();
  }, [user, user?.username, profilename]);


  //const isOwnProfile = user && profile && profile.profilename === user.username;
  const isOwnProfile = user && profile && user.username && profile.profilename === user.username;

  return (
    <div className="content">
      <div className="inner-view">
        <div className="inner-left">
          <img src={profile?.profilepicurl || ''} className="profilepic" alt="Käyttäjän kuva" />
          <br />
          {isOwnProfile && <Link to={`/profile/${profilename}/edit`} className="basicbutton">Muokkaa profiilia</Link>}
        </div>

        <div className="inner-right">
          <h2>{profile?.profilename}</h2>
          <p className="info">{profile?.description || ''} </p>
        </div>
      </div>

      <div className="three-view">
        <div className="three-left">
          <h2>Suosikit</h2>
          <ul>
            {/*ehkä vaikka tähän*/}
          </ul>
        </div>

        <div className="three-middle">
          <GroupList profile={profile} />
        </div>

        <div className="three-right">
          <h2>Arvostelut</h2>
          <ul>
            {/*ehkä tähän*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;