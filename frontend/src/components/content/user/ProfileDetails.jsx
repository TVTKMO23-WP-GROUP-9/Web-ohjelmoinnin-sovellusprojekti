import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import GroupList from './GroupList';
import ReviewList from './ReviewList';

const ProfileDetails = ({ user }) => {
    const [profile, setProfile] = useState(null);
    const { profilename } = useParams();
    const [lastLoggedIn, setLastLoggedIn] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${profilename}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Virhe haettaessa profiilitietoja:', error);
            }
        };
        
        fetchProfile();
    }, [user, user?.username, profilename]);


   //const isOwnProfile = user && profile && user.username === profile.username;

//Viimeksi kirjautunu
  /*useEffect(() => {
    const simulateLogin = async () => {
        const currentTime = new Date().toLocaleString();
        setLastLoggedIn(currentTime);
    };
    simulateLogin();
}, [user]); */

const isOwnProfile = user && profile && user.username && profile.profilename === user.username;


    return (
        <div className="content">
            <div className="inner-view">
                <div className="inner-left">
                    <img src={profile?.profilepicurl || ''} className="profilepic" alt="Käyttäjän kuva" />
      <span>Viimeksi kirjautuneena: {lastLoggedIn}</span> 
                    <br />
                    {isOwnProfile && <Link to={`/profile/${profilename}/edit`} className="basicbutton">Muokkaa profiilia</Link>}
                </div>

                <div className="inner-right">
                    <h2>{profile?.profilename}</h2>
                    {(!profile?.is_private || isOwnProfile) && <p className="info">{profile?.description || ''} </p>}
                    {profile?.is_private && !isOwnProfile && <span className="userinfo">Tämä profiili on yksityinen.</span>}
                </div>
            </div>

            {(!profile?.is_private || isOwnProfile) &&
        
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
                    <ReviewList profile={profile}/>
                </div>
            </div>}
        </div>
    );
};

export default ProfileDetails;
