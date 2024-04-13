import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import.meta.env.VITE_APP_BACKEND_URL;


const MemberList = ({ id }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}memberlist/group/${id}/0`);
          const memberData = response.data;

          const membersWithnames = await Promise.all(memberData.map(async member => {
            try {
              const nameResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}profile/id/${encodeURIComponent(member.profileid)}`);
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
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [id]);

  return (
    <>
      <ul className="profileSections">
      {members.map((member, index) => (
        <li key={index}><Link to={`/profile/${member.name.profilename}`}>{member.name.profilename}</Link></li>
        ))}
      </ul>
    </>
  );
};

export default MemberList;