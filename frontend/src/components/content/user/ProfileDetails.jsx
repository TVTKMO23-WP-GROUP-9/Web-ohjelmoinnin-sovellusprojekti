import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import GroupList from './GroupList';
import ReviewList from './ReviewList';
import ProfileEdit from './ProfileEdit'; 

const ProfileDetails = ({ user }) => {
    const [profile, setProfile] = useState(null);
    const { profilename } = useParams();
    const [lastLoggedIn, setLastLoggedIn] = useState(null);
    const [editMode, setEditMode] = useState(false); 
    const [isOwnProfile, setOwnProfile] = useState(false);
    const [isPrivate, setPrivate] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
    
                const response = await axios.get(`http://localhost:3001/profile/${profilename}`, { headers });
    
                console.log("Token from sessionStorage:", token);
                console.log("Profilename from token:", profilename);
                console.log("Response from profile:", response.data);
    
                setProfile(response.data);
                setOwnProfile(response.data.isOwnProfile);
                setPrivate(response.data.is_private);


            } catch (error) {
                console.error('Virhe haettaessa profiilitietoja:', error);
            }
        };
    
        fetchProfile();
    }, [profilename]);

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

    const handleEditClick = () => {
        setEditMode(true); 
    };

    return (
        <div className="content">
            <div className="inner-view">
                <div className="inner-left">
                    <img src={profile?.profilepicurl || ''} className="profilepic" alt="Käyttäjän kuva" />
                    {(!isPrivate || isOwnProfile) && <span className='userinfo'>Viimeksi kirjautuneena: {formatDate(lastLoggedIn)}</span>}

                    {(isOwnProfile && !editMode) && <button onClick={handleEditClick} className="basicbutton">Muokkaa profiilia</button>}
                </div>

                <div className="inner-right">
                    <h2>{profile?.profilename}</h2>
                    <ul>
                        {(!isPrivate  || isOwnProfile) && <p className="info">{profile?.description || ''} </p>}
                        {isPrivate && !isOwnProfile && <span className="userinfo">Tämä profiili on yksityinen.</span>}
                    </ul>
                </div>
            </div>
           
            {editMode && <ProfileEdit profilename={profilename} />}

            {(!isPrivate || isOwnProfile) && (
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
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
