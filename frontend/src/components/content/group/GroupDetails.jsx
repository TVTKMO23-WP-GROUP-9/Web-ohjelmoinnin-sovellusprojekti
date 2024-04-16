import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';
import ReviewList from './ReviewList';
import Forum from './Forum';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const GroupDetails = ({ user }) => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isMainuser, setMainuser] = useState(null);
  const [profileId, setProfileid] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`);

            console.log("Token from sessionStorage:", token);
            console.log("Profilename from token:", user);
            console.log("Response from profile:", response.data);

            setProfile(response.data);
            setProfileid(response.data.profileid);


        } catch (error) {
            console.error('Virhe haettaessa profiilitietoja:', error);
        }
    };

    fetchProfile();
  }, [user]);


console.log("Token from sessionStorage:", user);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/group/${id}`);
        setGroup(response.data);
        console.log('ryhmätiedot:', response.data)
      } catch (error) {
        console.error('Virhe ryhmän hakemisessa:', error);
      }
    };

    fetchGroup();
  }, [id]);

  return (
    <div className="content">
      <div className="ginner-view">
        <div className="ginner-left">
          {group?.grouppicurl && (
            <img src={group.grouppicurl} className="grouppic" alt="Ryhmän kuva" />
          )}
          <br />

        </div>

        <div className="ginner-right">
          <h2>{group?.groupname}</h2>
          <ul>
            <p className="info">{group?.groupexplanation || ''} </p>

          </ul>
        </div>
      </div>

      <div className='group-between'>

        <div className="group-view">
          <div className="group-content">
            <h2>Viestit &nbsp;<span className='emoji uni10'></span></h2>
            <ul>
              <Forum id={id} user={user} />
            </ul>
          </div>
        </div>

        <div className="group-view">
          <div className="group-content">
            <h2>Jäsenet &nbsp;<span className='emoji uni07'></span></h2>
            <MemberList id={id} />
          </div>
        </div>
      </div>

      <div className='greviews-view'>
        <h2>Arvostelut  &nbsp;<span className='emoji uni08'></span></h2>
        <ReviewList id={id} />
      </div>
    </div>
  );
};

export default GroupDetails;