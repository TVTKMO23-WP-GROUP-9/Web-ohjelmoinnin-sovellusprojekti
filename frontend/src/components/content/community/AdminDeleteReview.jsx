import React, { useState } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteReview = ({ id, handleDelete }) => {
  const headers = getHeaders();
  const [showConfirm, setShowConfirm] = useState(false); 
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteReview = async () => {
    try {
        const response = await axios.delete(`${VITE_APP_BACKEND_URL}/admin/deletereview/${id}`, { headers });
        console.log(response.data);
        handleDelete(id);
    } catch (error) {
        console.error('Virhe poistaessa arvostelua:', error);
    }
  };


  const toggleConfirm = () => {
    setShowConfirm(!showConfirm); 
  };

  return (
    <div>
      {showConfirm ? ( 
        <div>
          <p>Haluatko varmasti poistaa tämän arvostelun?</p>
          <button onClick={handleDeleteReview}>Kyllä</button>
          <button onClick={toggleConfirm}>Peruuta</button>
        </div>
      ) : (
        /*<button onClick={toggleConfirm}>Poista arvostelu</button>*/
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
      )}
    </div>
  );
};

export default AdminDeleteReview;
