import React, { useState, useEffect, user } from 'react';
import './admins.css';
import UsersAsList from './UsersAsList';
import GroupsAsList from './GroupsAsList';
import ReviewsAsList from './ReviewsAsList';
import { getHeaders } from '@auth/token';

const AdminPage = ({ user }) => {
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [groupSearchTerm, setGroupSearchTerm] = useState('');
    const [reviewSearchTerm, setReviewSearchTerm] = useState('');

    const headers = getHeaders();
  
return (
    <div className="content">
      {user && user.usertype === 'admin' ? (
          <>
              <h2>Adminin paneeli</h2>
              <UsersAsList searchTerm={userSearchTerm} setSearchTerm={setUserSearchTerm} user={user} />
              <GroupsAsList searchTerm={groupSearchTerm} setSearchTerm={setGroupSearchTerm} user={user} />
              <ReviewsAsList searchTerm={reviewSearchTerm} setSearchTerm={setReviewSearchTerm} user={user} />
          </>
      ) : (
          <h2>Ei käyttöoikeutta sivulle.</h2>
      )}
    </div>
  );
};

export default AdminPage;
