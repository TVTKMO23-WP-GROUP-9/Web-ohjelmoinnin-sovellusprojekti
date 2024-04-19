import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';
import ReviewList from './ReviewList';
import Forum from './Forum';
import GroupEdit from './GroupEdit';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const GroupDetails = ({ user }) => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isPending, setIsPending] = useState(false);
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

            setProfileid(response.data.profileid);

            const groupResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${response.data.profileid}/${id}`);

            if (groupResponse.data.hasOwnProperty('pending') && groupResponse.data.pending === 0) {
              setIsMember(true);
            }
            if (groupResponse.data.hasOwnProperty('pending') && (groupResponse.data.pending === 1 || groupResponse.data.pending === 2 )) {
              setIsPending(true);
            }
            if (groupResponse.data.hasOwnProperty('mainuser') && groupResponse.data.mainuser === 1) {
              setMainuser(true);
            }

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

  const handleApplicationToJoin = async (profileId, groupId) => {
    try {
      await axios.post(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/0/${groupId}/1`);
      window.location.reload(); 
    } catch (error) {
      console.error('Virhe pyynnön lähettämisessä:', error);
    }
  };

  const handleRemoveApplication = async (profileId, id) => {
    try {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);
      console.log(memberResponse); 
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`);
          window.location.reload(); 
        } catch (error) {
          console.error('Virhe pyynnön poistamisessa:', error);
        }
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    } catch (error) {
      console.error('Virhe jäsennumeron hakemisessa:', error);
    }
  };

  return (
    <div className="content">
      <div className="ginner-view">
        <div className="ginner-left">
          {group?.grouppicurl && (
            <img src={group.grouppicurl} className="grouppic" alt="Ryhmän kuva" />
          )}
           {(isMainuser && !editMode) && <button onClick={() => setEditMode(true)} className="basicbutton">Muokkaa ryhmää</button>}
           {(!isMember && !isPending && user && user.user !== null && user.user !== undefined) && (
          <button className="basicbutton" onClick={() => handleApplicationToJoin(profileId, id)}>Liittymispyyntö</button>
          )}
          {isPending && (
          <button className="basicbutton" onClick={() => handleRemoveApplication(profileId, id)}>Peru Pyyntö</button>
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

      {editMode && <GroupEdit id={id} />}

      {isMember && (

      <div className='group-between'>
      
        <div className="group-view">
          <div className="group-content">
            <h2>Ryhmän suosikit &nbsp;<span className='emoji uni10'></span></h2>
            <span>Listaus tähän?</span>
          </div>
        </div>

        <div className="group-view">
          <div className="group-content">
            <h2>Jäsenet &nbsp;<span className='emoji uni07'></span></h2>
            <MemberList id={id} user={user} />
          </div>
        </div>
      </div>
      )}

      
      {isMember && (
      <div className='gmessages'>
        <h2>Keskustelu  &nbsp;<span className='emoji uni08'></span></h2>

        <div className='msgboard'>
          <Forum id={id} user={user} />
        </div>

      </div>
      )}


      {isMember && (
      <div className='greviews-view'>
        <h2>Arvostelut  &nbsp;<span className='emoji uni08'></span></h2>
        <ReviewList id={id} />
      </div>
      )}

      {isMember && (
      <>
        {confirmDeleteId === profileId ? (
          <>
          <button className="confirm" onClick={() => handleRemoveApplication(profileId, id)}>
            &nbsp;<span className='emoji'>&times;</span> Vahvista
          </button>
          <button className="compactButton" onClick={() => setConfirmDeleteId(null)}>Peruuta</button>
          </>
          ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteId(profileId)}>
            &nbsp;<span className='emoji'>&times;</span> Poistu ryhmästä
          </button>
        )}
      </>
    )}
    </div>
  );
};

export default GroupDetails;