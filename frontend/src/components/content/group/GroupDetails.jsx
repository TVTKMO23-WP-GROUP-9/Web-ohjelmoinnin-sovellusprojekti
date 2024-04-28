import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';
import ReviewList from './ReviewList';
import Forum from './Forum';
import GroupEdit from './GroupEdit';
import FavoriteList from './FavoriteList';
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
  const [isMainuser, setMainuser] = useState(false);
  const [profileId, setProfileid] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messagePromoteUser, setMessagePromoteUser] = useState('');
  const [messageGroupDelete, setMessageGroupDelete] = useState('');
  const [confirmRequest, setConfirmRequest] = useState('');
  const headers = getHeaders();

  useEffect(() => {

    if (user !== null && user !== undefined) {
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

          if (user.usertype === 'admin') {
            setAdmin(true);
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
        setIsPending(true);
    } catch (error) {
      console.error('Virhe pyynnön lähettämisessä:', error);
    }
  };

  const handleDeleteGrp = async () => {
    try {
        await axios.delete(`${VITE_APP_BACKEND_URL}/group/${id}`, {headers});
        await axios.delete(`${VITE_APP_BACKEND_URL}/memberlist/${id}`, {headers});
        await axios.delete(`${VITE_APP_BACKEND_URL}/favoritelist/${id}`, {headers});
        
        setMessageGroupDelete('Ryhmä poistettu, sinut ohjataan etusivulle.');
        setTimeout(() => {
                 window.location.href = '/';
             }, 3000);


    } catch (error) {
        console.error('Virhe poistettaessa ryhmää:', error);
    }
};

  const handleRemoveApplication = async (profileId, id) => {
    try {
      
        const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);

        if (groupMembers.length === 1) {
          handleDeleteGrp();
        }

        else if (groupMembers.length > 1) {
          // Tarkistetaan, onko käyttäjä pääkäyttäjä (mainuser)
          const isMainUser = memberResponse.data.mainuser === 1;
  
          if (isMainUser) {
              // Tarkistetaan, onko muita pääkäyttäjiä ryhmässä
              const otherMainUsers = groupMembers.filter(member => member.mainuser === 1 && member.profileid !== profileId);
              
              if (otherMainUsers.length > 0) {
                // Jos muita pääkäyttäjiä on, poistetaan käyttäjä ryhmästä
                await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, {headers});
                window.location.reload();
              } else {
                // Jos muita pääkäyttäjiä ei ole, ei voida poistaa käyttäjää ryhmästä
                setMessagePromoteUser('Et voi poistua ryhmästä, koska olet ainoa pääkäyttäjä');
              }
          } else if (isPending) {
            // Jos käyttäjä on liittymispyynnön tilassa, poistetaan liittymispyyntö
            await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, {headers});
            setIsPending(false);  
          }
          else {
            // Jos käyttäjä ei ole pääkäyttäjä, poistetaan käyttäjä ryhmästä
            await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, {headers});
            window.location.reload();
          }
        } else {
          console.error('Virhe jäsennumeron hakemisessa tai jäsenlistan jäsenet puuttuvat vastauksesta.');
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
                {showFavorites && <FavoriteList id={id} user={user} />}

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

      {(isMember || isMainuser) && (
      <>
        {confirmDeleteId === profileId ? (
          <>
          <button className="confirm compactButton" onClick={() => handleRemoveApplication(profileId, id)}>
            &nbsp;<span className='updateState uni12'></span> Vahvista
          </button>
          <button className="compactButton" onClick={() => setConfirmDeleteId(null)}>Peruuta</button>
          {groupMembers.length === 1 && (
          <span className='userinfo'><br/> Jos olet ainoa jäsen, ryhmä poistetaan samalla </span>
          )}
          
          </> 
          ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteId(profileId)}>
            &nbsp;<span className='updateState uni12'></span> Poistu ryhmästä
          </button>
        )}
      </>
      )}
      <br/>
      {messagePromoteUser && <span className='userinfo'>{messagePromoteUser}</span>}
      {messageGroupDelete && <span className='userinfo'>{messageGroupDelete}</span>}

      </>
    )}
    </div>
  );
};

export default GroupDetails;