import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';


const MemberList = ({ id, user }) => {
  const [profileId, setProfileid] = useState(null);
  const [members, setMembers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isMainuser, setMainuser] = useState(false);
  const [memberType, setMemberType] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const headers = getHeaders();

  const fetchMembers = async () => {
    try {
      let response;
      switch (memberType) {
        case 0:
          response = await axios.get(`${VITE_APP_BACKEND_URL}/memberlist/group/${id}/0`, { headers });
          break;
        case 1:
          response = await axios.get(`${VITE_APP_BACKEND_URL}/memberlist/group/${id}/1`, { headers });
          break;
        default:
          break;
      }
        const memberData = response.data;

        const membersWithnames = await Promise.all(memberData.map(async member => {
          try {
            const nameResponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/id/${encodeURIComponent(member.profileid)}`, { headers });
            const nameData = nameResponse.data;
            return {
              ...member,
              name: nameData
            };
          } catch (error) {
            console.error('Virhe nimen hakemisessa:', error);

            return {};
          }
        }));

        setMembers(membersWithnames.filter(member => Object.keys(member).length !== 0));
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`, { headers });
          setProfileid(response.data.profileid);
          
          const groupResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${response.data.profileid}/${id}`, { headers });

          if (groupResponse.data.hasOwnProperty('pending') && groupResponse.data.pending === 0) {
            setIsMember(true);
          }

          if (groupResponse.data.hasOwnProperty('mainuser') && groupResponse.data.mainuser === 1) {
            setMainuser(true);
          }

      } catch (error) {
          console.error('Virhe haettaessa profiilitietoja:', error);
      }
  };



    fetchProfile();
    fetchMembers();
  }, [id, user, memberType]);

  const handleSetMemberType = async (type) => {
    setLoading(true); 
    setMemberType(type);
  };

  const handleRemoveUser= async (profileId, id) => {
    try {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);

      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, { headers });
          
        } catch (error) {
          console.error('Virhe pyynnön poistamisessa:', error);
        }
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    } catch (error) {
      console.error('Virhe jäsennumeron hakemisessa:', error);
    }
    fetchMembers();
  };

  const handleAddUser= async (profileId, id) => {
    try {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);

      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.put(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}/0`, {}, { headers });
          
        } catch (error) {
          console.error('Virhe pyynnön poistamisessa:', error);
        }
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    } catch (error) {
      console.error('Virhe jäsennumeron hakemisessa:', error);
    }
    fetchMembers();
  };

  const updateMemberRank = async (profileId, memberId, rank) => {
    try {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${memberId}`);
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        await axios.put(`${VITE_APP_BACKEND_URL}/memberrank/${memberResponse.data.memberlistid}/${rank}`, {}, { headers });
        
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    } catch (error) {
      console.error('Virhe aseman muutoksessa:', error);
    }
    fetchMembers();
  };
  
  
  return (
    <>
      {loading ? (
      <p>Hetki pieni...</p> 
      ) : (
      <ul className="profileSections">
        {members.map((member, index) => (
          <span className='singleMember' key={index}>
            {(isMainuser && editMode && member.mainuser===1 && member.pending ===0 && member.profileid !== profileId) && (
            <button className="remove" onClick={() => updateMemberRank(member.name.profileid, id, 0)}>
            <img src="/down.png" className='emoji' /></button>
            )}
            {(isMainuser && editMode && member.mainuser===0 && member.pending ===0) && (
            <button className="remove" onClick={() => updateMemberRank(member.name.profileid, id, 1)}>
            <img src="/up.png" className='emoji' /></button>
            )}
            {(member.mainuser===1) && (
            <img src="/crown.png" className='emoji' />
            )}
            <Link to={`/profile/${member.name.profilename}`}>{member.name.profilename}</Link>&nbsp;&nbsp;&nbsp;
            {(isMainuser && editMode && memberType===1) && (
            <button className="remove" onClick={() => handleAddUser(member.name.profileid, id)}>
            <img src="/accept.png" className='emoji' /></button>
            )}
            {(isMainuser && editMode && member.profileid !== profileId) && (
              confirmRemove === member.name.profileid ? (
                <>
                  <button className="confirm" onClick={() => handleRemoveUser(member.name.profileid, id)}>
                  &nbsp;<img src="/reject.png" className='emoji' /> Vahvista
                  </button>
                  <button className="compactButton" onClick={() => setConfirmRemove(null)}>Peruuta</button>
                </>
              ) : (
                <button className='remove' onClick={() => setConfirmRemove(member.name.profileid)}>
                  &nbsp;<img src="/reject.png" className='emoji' />
                </button>
              )
            )}
          </span>
        ))}
      </ul>
      )}
      {(isMainuser && !editMode) && <button onClick={() => setEditMode(true)} className="basicbutton justMargin">Hallinnoi jäsenlistaa</button>}
     
      {(isMainuser && editMode) && (
        <>
        <button className='basicbutton brownBtn justMargin' onClick={() => handleSetMemberType(0)}>Jäsenet</button>
        <button className='basicbutton brownBtn' onClick={() => handleSetMemberType(1)}>Pyynnöt</button>
        </>
      )}
       {(isMainuser && editMode) && <button onClick={() => setEditMode(false)} className="basicbutton justMargin">Lopeta</button>}
      
    </> 
  );
};

export default MemberList;