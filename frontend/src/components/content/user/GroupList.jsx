import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupList = ({ profile }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (profile && profile.profilename) {
          const response = await axios.get(`http://localhost:3001/grouplist/profile/${profile.profilename}`);
          setGroups(response.data);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [profile]);

  return (
    <>
        <span className="userinfo">
          Käyttäjällä on <b>{groups.length}</b> ryhmää.<br />
        </span>
        
      <ul className="profileSections">
      {groups.map((group, index) => (
        <li key={index}><Link to="#">{group.groupname}</Link></li>
        ))}
      </ul>
    </>
  );
};

export default GroupList;