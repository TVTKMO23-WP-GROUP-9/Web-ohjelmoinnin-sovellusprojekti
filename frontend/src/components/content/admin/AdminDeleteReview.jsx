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
        console.log(response.data);
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
            <button className="confirm" onClick={() => handleDeleteReview(id.idreview)}><span className='review uni12'></span> Vahvista</button>
            <button className="compactButton" onClick={() => setConfirmDeleteId(null)}>Peruuta</button>
          </>
        ) : (
          <button className="compactButton" onClick={() => setConfirmDeleteId(id.idreview)}><span className='review uni12'></span> Poista arvostelu</button>
        )}
      </>

    </div>
  );
};

export default AdminDeleteReview;
