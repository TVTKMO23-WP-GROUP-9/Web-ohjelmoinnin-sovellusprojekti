import React from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';
import { render } from 'react-dom';
import AllReviews from './AllReviews';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const AdminDeleteReview = ({ id }) => {
  const headers = getHeaders();

  const handleDeleteReview = async () => {
    try {
      const response = await axios.delete(`${VITE_APP_BACKEND_URL}/admin/deletereview/${id}`, { headers });
      console.log(response.data); 
      window.location.reload();
      
    } catch (error) {
      console.error('Virhe poistaessa arvostelua:', error);
    }
  };

  return (
    <button onClick={handleDeleteReview}>Poista arvostelu</button>
  );
};

export default AdminDeleteReview;
