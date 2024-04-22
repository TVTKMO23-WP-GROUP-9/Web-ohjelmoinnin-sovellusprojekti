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
  
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {

          
          const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`, { headers });

          setProfileid(response.data.profileid);
          
          const groupResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${response.data.profileid}/${id}`, { headers });
          
          console.log("Response from status:", groupResponse.data);

          if (groupResponse.data.hasOwnProperty('pending') && groupResponse.data.pending === 0) {
            setIsMember(true);
          }
          console.log("Response from setMember:", groupResponse.pending);
          if (groupResponse.data.hasOwnProperty('mainuser') && groupResponse.data.mainuser === 1) {
            setMainuser(true);
          }
          console.log("Response from profile:", groupResponse.data);
      } catch (error) {
          console.error('Virhe haettaessa profiilitietoja:', error);
      }
  };

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
        case 2:
          response = await axios.get(`${VITE_APP_BACKEND_URL}/memberlist/group/${id}/2`, { headers });
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
      console.log(memberResponse); 
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.delete(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}`, { headers });
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

  const handleAddUser= async (profileId, id) => {
    try {
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);
      console.log(memberResponse); 
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.put(`${VITE_APP_BACKEND_URL}/memberstatus/${memberResponse.data.memberlistid}/0`, {}, { headers });
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

  const updateMemberRank= async (profileId, id, rank) => {
    try {
      console.log("Pid", profileId);
      console.log("id", id);
      console.log("Rank", rank);
      
      
      const memberResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/${id}`);
      console.log("haettu memberstatus:", memberResponse);
      console.log("haettu memberlist:", memberResponse.data.memberlistid);  
      if (memberResponse && memberResponse.data && memberResponse.data.memberlistid) {
        try {
          await axios.put(`${VITE_APP_BACKEND_URL}/memberrank/${memberResponse.data.memberlistid}/${rank}`, {}, {headers});
          window.location.reload(); 
        } catch (error) {
          console.error('Virhe aseman muutoksessa:', error);
        }
      } else {
        console.error('Jäsennumeron hakeminen epäonnistui tai memberlistid puuttuu vastauksesta.');
      }
    } catch (error) {
      console.error('Virhe jäsennumeron hakemisessa:', error);
    }
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
            <span className='emoji'>&#x2B07;</span></button>
            )}
            {(isMainuser && editMode && member.mainuser===0 && member.pending ===0) && (
            <button className="remove" onClick={() => updateMemberRank(member.name.profileid, id, 1)}>
            <span className='emoji'>&#x2B06;</span></button>
            )}
            {(member.mainuser===1) && (
            <span className='emoji'>&#x1F451;</span> 
            )}
            <Link to={`/profile/${member.name.profilename}`}>{member.name.profilename}</Link>&nbsp;&nbsp;&nbsp;
            {(isMainuser && editMode && memberType===1) && (
            <button className="remove" onClick={() => handleAddUser(member.name.profileid, id)}>
            <span className='emoji'>&#10003;</span></button>
            )}
            {(isMainuser && editMode && member.profileid !== profileId) && (
              confirmRemove === member.name.profileid ? (
                <>
                  <button className="confirm" onClick={() => handleRemoveUser(member.name.profileid, id)}>
                  &nbsp;<span className='emoji'>&times;</span> Vahvista
                  </button>
                  <button className="compactButton" onClick={() => setConfirmRemove(null)}>Peruuta</button>
                </>
              ) : (
                <button className='remove' onClick={() => setConfirmRemove(member.name.profileid)}>
                  &nbsp;<span className='emoji'>&times;</span>
                </button>
              )
            )}
          </span>
        ))}
      </ul>
      )}
      {(isMainuser && editMode) &&
      <div>
        <button onClick={() => handleSetMemberType(0)}>Jäsenet</button>
        <button onClick={() => handleSetMemberType(1)}>Pyynnöt</button>
        <button onClick={() => handleSetMemberType(2)}>Kutsut</button>
      </div>}
      {(isMainuser && !editMode) && <button onClick={() => setEditMode(true)} className="basicbutton">Hallinnoi jäsenlistaa</button>}
      {(isMainuser && editMode) && <button onClick={() => setEditMode(false)} className="basicbutton">Lopeta</button>}
    </> 
  );
};

export default MemberList;