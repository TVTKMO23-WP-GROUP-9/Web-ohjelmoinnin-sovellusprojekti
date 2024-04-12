import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupList = ({ profile }) => {
  const [groups, setGroups] = useState([]);

  const [groupsPerPage, setGroupsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
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

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

  return (
    <>
        <span className="userinfo">
          Löytyi <b>{groups.length}</b> ryhmää.<br />
        </span>

        <ul className="pagination">
        <li>
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
            ⯇
          </button>
          &nbsp; <span className="communityinfo">selaa</span> &nbsp;
          <button className="buttonnext" onClick={() => 
            setCurrentPage(currentPage < Math.ceil(groups.length / groupsPerPage) ? 
            currentPage + 1 : Math.ceil(groups.length / groupsPerPage))}>
            ⯈
          </button>
        </li>
      </ul>
        
      <ul className="profileSections">
      {currentGroups.map((group, index) => (
        <li key={index}><Link to="#">{group.groupname}</Link></li>
        ))}
      </ul>
    </>
  );
};

export default GroupList;