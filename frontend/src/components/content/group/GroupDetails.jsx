import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';
import ReviewList from './ReviewList';
import Forum from './Forum';
import GroupEdit from './GroupEdit';
import { getHeaders } from '@auth/token';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const GroupDetails = ({ user }) => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isMainuser, setMainuser] = useState(null);
  const [profileId, setProfileid] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const headers = getHeaders();

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setAdmin(user.usertype === 'admin');
  
      const fetchPending = async () => {
        try {
          const groupResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${user.profileid}/${id}`, { headers });
  
          if (groupResponse.data.hasOwnProperty('pending') && groupResponse.data.pending === 0) {
            setIsMember(true);
          }
          if (groupResponse.data.hasOwnProperty('pending') && (groupResponse.data.pending === 1 || groupResponse.data.pending === 2 )) {
            setIsPending(true);
          }
          if (groupResponse.data.hasOwnProperty('mainuser') && groupResponse.data.mainuser === 1) {
            setMainuser(true);
          }

          setProfileid(user.profileid);
        } catch (error) {
          console.error('Virhe haettaessa profiilitietoja:', error);
        }
      };
  
      fetchPending();
    }
  }, [user]);


  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/group/${id}`);
        setGroup(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Virhe ryhmän hakemisessa:', error);
      }
    };

    fetchGroup();
  }, [id]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/memberlist/group/${id}/0`);
        setGroupMembers(response.data);
      } catch (error) {
        console.error('Virhe ryhmän jäsenten hakemisessa:', error);
      }
    };

    fetchGroupMembers();
  }, [id]);


  const handleApplicationToJoin = async (profileId, id) => {
    try {
      await axios.post(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/0/${id}/1`, {}, {headers});
      window.location.reload(); 
    } catch (error) {
      console.error('Virhe pyynnön lähettämisessä:', error);
    }
  };


  const handleRemoveApplication = async (profileId, id) => {
    try {
      if (groupMembers.length === 1) { 
        alert('Et voi poistua ryhmästä, koska olet ainoa jäsen. Voit poistaa koko ryhmän.');
      } else {
        if (isMainuser && groupMembers.filter(member => member.mainuser === 1).length === 1) { 
          alert('Et voi poistua ryhmästä, koska olet ainoa pääkäyttäjä ja ryhmä jäisi ilman ylläpitäjää. Ylennä ensin toinen jäsen pääkäyttäjäksi.');
        } else {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, {headers});
          window.location.reload(); 
        } catch (error) {
          console.error('Virhe pyynnön poistamisessa:', error);
        }
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    }
    }
    } catch (error) {
      console.error('Virhe jäsennumeron hakemisessa:', error);
    }
  };

  const toggleMembers = () => {
    setShowMembers(!showMembers);
    setShowEvents(false);
    setShowFavorites(false);
  };

  const toggleEvents = () => {
    setShowEvents(!showEvents);
    setShowFavorites(false);
    setShowMembers(false);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    setShowEvents(false);
    setShowMembers(false);
  }

  return (
    <div className="content"> 
    {loading ? (
      <div>Ladataan sisältöä</div>
    ) : (
      <>

      {editMode && <GroupEdit id={id} />}
        <div className="groupProfileMain">
          <div className="ginner-view">

            <div className="ginner-left">
              <img 
                  src={group?.grouppicurl ? group.grouppicurl : '/pic.png'} 
                  className="profilepic" 
                  alt="Käyttäjän kuva" 
                />

              {(isAdmin || isMainuser && !editMode) && <button onClick={() => setEditMode(true)} className="basicbutton">Muokkaa ryhmää</button>}
              {(!isMember && !isPending && user && user.user !== null && user.user !== undefined) && (
              <button className="basicbutton" onClick={() => handleApplicationToJoin(profileId, id)}>Liittymispyyntö</button>
              )}
              {isPending && (
              <button className="basicbutton" onClick={() => handleRemoveApplication(profileId, id)}>Peru Pyyntö</button>
              )}
              <br />

            </div>
              
            <div className="ginner-right">
              <h2 id="groupname">{group?.groupname}</h2>
              <ul>
                <p className="info">{group?.groupexplanation || ''} </p>
              </ul>

              {(isAdmin || isMember) && (
              <><h2>Näytä lisää</h2>
              <div className="toggleLinks">
                <h3 onClick={toggleMembers}><span className='emoji uni07'></span>&nbsp; Jäsenlista </h3>
                <h3 onClick={toggleFavorites}><span className='emoji uni10'></span> Suosikit &nbsp;</h3>
                <h3 onClick={toggleEvents}><span className='emoji uni15'></span> &nbsp; Näytösajat</h3>
              </div></>
            )}
            </div>
          </div>
        
          {(isAdmin || isMember) && (
          <div className='group-between'>
            <div className="group-view">
              <div className='group-content'>
                {showMembers && <MemberList id={id} user={user} />}
                {showFavorites && ( <span>Listaus tähän?</span>)}

                {showEvents && (
                
                  <>  
                    <span className='singleEvent'><b> Selaa / Hallinnoi / yms </b></span>
                
                    <span className='singleEvent'>
                      00.00.2024 &nbsp;&nbsp;
                      Paikkakunta &nbsp;&nbsp;
                      Teatteri, sali X &nbsp;&nbsp;
                      klo 00:00 &nbsp;&nbsp;
                      <a href="#"><b>Elokuvan nimi</b></a> &nbsp;&nbsp;
                      Lisätietoja
                    </span>

                    <span className='singleEvent'>
                      00.00.2024 &nbsp;&nbsp;
                      Paikkakunta &nbsp;&nbsp;
                      Teatteri, sali X &nbsp;&nbsp;
                      klo 00:00 &nbsp;&nbsp;
                      <a href="#"><b>Elokuvan nimi</b></a> &nbsp;&nbsp;
                      Lisätietoja
                    </span>

                    <span className='singleEvent'>
                      00.00.2024 &nbsp;&nbsp;
                      Paikkakunta &nbsp;&nbsp;
                      Teatteri, sali X &nbsp;&nbsp;
                      klo 00:00 &nbsp;&nbsp;
                      <a href="#"><b>Elokuvan nimi</b></a> &nbsp;&nbsp;
                      Lisätietoja
                    </span>
                    </>
                  )}

              </div>
            </div>
         </div>
        )}
      </div>

      {(isAdmin || isMember) && (
      <div className='gmessages'>
        <h2>Keskustelu  &nbsp;<span className='emoji uni08'></span></h2>

        <div className='msgboard'>
          <Forum id={id} user={user} />
        </div>

      </div>
      )}

      {(isAdmin || isMember) && (
      <div className='greviews-view'>
        <h2>Arvostelut  &nbsp;<span className='emoji uni08'></span></h2>
        <ReviewList user={user} id={id} />
      </div>
      )}

      {(isMember) && (
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
      </>
    )}
    </div>
  );
};

export default GroupDetails;