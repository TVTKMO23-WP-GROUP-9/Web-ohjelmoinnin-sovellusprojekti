import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // kovakoodattu käyttäjään 1 :D 
        const response = await axios.get('http://localhost:3001/grouplist/1'); 
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="group-middle">
      <h2>Käyttäjän ryhmät</h2>
      <ul>
        {groups.map(group => (
          <li key={group.groupid}>- <Link to="#">{group.groupname}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;