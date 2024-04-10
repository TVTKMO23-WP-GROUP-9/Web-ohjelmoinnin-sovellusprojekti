import React, { useState, useEffect } from 'react';
import './community.css';
import UserList from './Userlist';
import AllGroups from './AllGroups';

const Community = () => {
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [groupSearchTerm, setGroupSearchTerm] = useState('');


  return (

    <div className="content">
      <h2>Yhteisö</h2>
      Löydä palvelumme käyttäjät, ryhmät ja arvostelut täältä.
      <UserList searchTerm={userSearchTerm} setSearchTerm={setUserSearchTerm} />
      <AllGroups searchTerm={groupSearchTerm} setSearchTerm={setGroupSearchTerm} />
    

    </div>
  );
};

export default Community;