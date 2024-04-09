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


//Viimeksi kirjautunu
useEffect(() => {
    const simulateLogin = async () => {
        const timestamp = new Date().toLocaleString();
        setLastLoggedIn(timestamp);
    };

    simulateLogin();
}, [user]);

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

const isOwnProfile = user && profile && user.username === profile.username;

    return (
        <div className="content">

            <div className="inner-view">
                <div className="inner-left">
                    <img src={profile?.profilepicurl || ''} className="profilepic" alt="Käyttäjän kuva" />
                    {(!profile?.is_private || isOwnProfile) && <span className='userinfo'>Viimeksi kirjautuneena: {formatDate(lastLoggedIn)}</span>}

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
                    <h2>Suosikit &nbsp;<span className='emoji uni10'></span></h2>
                    <ul>
                        <li><span className='userinfo'>Ei vielä suosikkeja</span></li>
                    </ul>
                </div>

                <div className="three-middle">
                <h2>Ryhmät &nbsp;<span className='emoji uni07'></span></h2>  
                    <GroupList profile={profile} />
                </div>

                <div className="three-right">
                <h2>Arvostelut  &nbsp;<span className='emoji uni08'></span></h2>
                    <ReviewList profile={profile}/>
                </div>
            </div>}
        </div>
    );
};

export default ProfileDetails;