import React, { useState } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteUsers = ({ id, handleDelete }) => {

  const headers = getHeaders();
  const [confirmDeleteAccountId, setConfirmDeleteAccountId] = useState(null);

  console.log("poistettava id:", id);
  const handleDeleteAccount = async () => {
      try {
          const response = await axios.delete(`${VITE_APP_BACKEND_URL}/admin/deleteprofile/${id}`, { headers });
          
          console.log("poistettava id poiston jälkeen:", id);
          handleDelete(id);
          setConfirmDeleteAccountId(null);
      } catch (error) {
          console.error('Virhe poistaessa käyttäjää:', error);
      }
  };
  

  return (
    <div>

      <>
        {confirmDeleteAccountId === id.profileid ? (
          <>
            <button className="confirm" onClick={() => handleDeleteAccount(id.profileid)}><img src="/reject.png" className='emoji' /> Vahvista</button>
            <button className="compactButton" onClick={() => setConfirmDeleteAccountId(null)}>Peruuta</button>
          </>
        ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteAccountId(id.profileid)}><img src="/reject.png" className='emoji' /> Poista käyttäjä</button>
        )}
      </>

    </div>
  );
};

export default AdminDeleteUsers;
