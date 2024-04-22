import React, { useState } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteUsers = ({ id, handleDelete }) => {

  const headers = getHeaders();
  const [confirmDeleteAccountId, setConfirmDeleteAccountId] = useState(null);


  const handleDeleteAccount = async () => {
      try {
          const response = await axios.delete(`${VITE_APP_BACKEND_URL}/admin/deleteprofile/${id}`, { headers });
          console.log(response.data);
          handleDelete(id);
          setConfirmDeleteAccountId(null);
      } catch (error) {
          console.error('Virhe poistaessa käyttäjää:', error);
      }
  };

  return (
    <div>

      <>
        {confirmDeleteAccountId === id.idprofile ? (
          <>
            <button className="confirm" onClick={() => handleDeleteAccount(id.idprofile)}><span className='user uni12'></span> Vahvista</button>
            <button className="compactButton" onClick={() => setConfirmDeleteAccountId(null)}>Peruuta</button>
          </>
        ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteAccountId(id.idprofile)}><span className='user uni12'></span> Poista käyttäjä</button>
        )}
      </>

    </div>
  );
};

export default AdminDeleteUsers;
