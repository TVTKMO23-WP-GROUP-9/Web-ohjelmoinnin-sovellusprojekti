import React, { useState } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteGroups = ({ id, handleDelete }) => {

  const headers = getHeaders();
  const [confirmDeleteGroupId, setConfirmDeleteGroupId] = useState(null);


  const handleDeleteGroup = async () => {
    try {
        const response = await axios.delete(`${VITE_APP_BACKEND_URL}/group/${id}`, { headers });
        handleDelete(id);
        setConfirmDeleteGroupId(null);
    } catch (error) {
        console.error('Virhe poistaessa ryhmää:', error);
    }
};

  return (
    <div>
      <>
        {confirmDeleteGroupId === id.idgroup ? (
          <>
            <button className="confirm" onClick={() => handleDeleteGroup(id.idgroup)}><img src="/reject.png" className='emoji' />  Vahvista</button>
            <button className="compactButton" onClick={() => setConfirmDeleteGroupId(null)}>Peruuta</button>
          </>
        ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteGroupId(id.idgroup)}><img src="/reject.png" className='emoji' />  Poista ryhmä</button>
        )}
      </>

    </div>
  );
};

export default AdminDeleteGroups;
