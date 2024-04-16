import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movies.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin
const { VITE_APP_BACKEND_URL } = import.meta.env;


const Reviews = ({ movieId, mediatype }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/reviews/${movieId}/${mediatype}`);
        const reviewData = response.data;

        // Hae jokaisen arvostelun review.revieweditem arvolla liittyvä elokuva
        const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
          try {
            let responseData;
            if (review.mediatype === 0) {
              const movieResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/movie/${encodeURIComponent(review.revieweditem)}`);
              responseData = movieResponse.data;
            } else if (review.mediatype === 1) {
              const tvResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/series/${encodeURIComponent(review.revieweditem)}`);
              responseData = tvResponse.data;
            }
            console.log(responseData)
            // Haetaan profiilitiedot
            const profileResponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/id/${review.profileid}`);
            const profileData = profileResponse.data;

            if (profileResponse && profileResponse.data) {
            return {
              ...review,
              data: responseData,      
              profile: profileData,
            };
          } else {
            console.error('Profiilitiedon hakeminen epäonnistui:', profileResponse);
            return {};
          }
          } catch (error) {
            console.error('Virhe tiedon hakemisessa:', error);
            // Palauta tyhjä objekti, jos hakeminen epäonnistuu
            return {};
          }
        }));

        // Suodata pois tyhjät arvostelut ja aseta arvostelut
        setReviews(reviewsWithMovies.filter(review => Object.keys(review).length !== 0));
        setLoading(false);
      } catch (error) {
        console.error('Virhe haettaessa arvosteluja:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, mediatype]);



  return (
    <>
      {loading ? (
        <p>Ladataan arvosteluja...</p>
      ) : (
        <div>
          {reviews.map((review, index) => (
  
            <div key={index}>
                <b>Lähetetty:</b> {new Date(review.timestamp).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })} <br />
                <b>Käyttäjältä:</b> <i><Link to={`/profile/${review.profile.profilename}`}>{review.profile.profilename}</Link></i> <br />
                <b>Arvio:</b>                             
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} >&#11088;</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i + review.rating}>&#x2605;</span>
                  ))}
                  <br />
                <b>Perustelut:</b> <br />
                {review.review}<br /><br />
            </div>
              
            
          ))}
        </div>
      )}
    </>
  );
};

export default Reviews;
