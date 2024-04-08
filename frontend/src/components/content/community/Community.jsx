import React from 'react';
import './community.css';
import UserList from './Userlist';
import AllGroups from './AllGroups';

const Community = () => {

  return (

    <div className="content">
      <h2>Yhteisö</h2>
      Löydä palvelumme käyttäjät, ryhmät ja arvostelut täältä.

      <UserList />
      <AllGroups />

    </div>
  );
};

export default Community;