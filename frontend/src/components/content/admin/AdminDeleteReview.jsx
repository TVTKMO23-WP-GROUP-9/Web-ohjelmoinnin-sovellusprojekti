import React, { useState } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteReview = ({ id, handleDelete }) => {

  const headers = getHeaders();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteReview = async () => {
    try {
        const response = await axios.delete(`${VITE_APP_BACKEND_URL}/admin/deletereview/${id}`, { headers });
        handleDelete(id);
        setConfirmDeleteId(null);
    } catch (error) {
        console.error('Virhe poistaessa arvostelua:', error);
    }
  };

  return (
    <div>
        <>
        {confirmDeleteId === id.idreview ? (
          <>
            <button className="confirm" onClick={() => handleDeleteReview(id.idreview)}><img src="/reject.png" className='emoji' /> Vahvista</button>
            <button className="compactButton" onClick={() => setConfirmDeleteId(null)}>Peruuta</button>
          </>
        ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteId(id.idreview)}><img src="/reject.png" className='emoji' /> Poista arvostelu</button>
        )}
      </>

    </div>
  );
};

export default AdminDeleteReview;
