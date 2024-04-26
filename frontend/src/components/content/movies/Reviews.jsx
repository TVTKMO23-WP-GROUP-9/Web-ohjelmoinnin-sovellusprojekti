import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movies.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin
const { VITE_APP_BACKEND_URL } = import.meta.env;

const Reviews = ({ movieId, mediatype }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/reviews/${movieId}/${mediatype}`);
        const reviewData = response.data;

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
            
            let profileData = {}; 

            if (review.profileid !== null) {
              const profileResponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/id/${review.profileid}`);
              profileData = profileResponse.data; 
            } else {
              profileData.profilename = 'anonyymi';
              profileData.eilink = 'true';
            }
            
            return {
              ...review,
              data: responseData,      
              profile: profileData,
            };

          } catch (error) {
            console.error('Virhe tiedon hakemisessa:', error);
            return {};
          }
        }));

        setReviews(reviewsWithMovies.filter(review => Object.keys(review).length !== 0));
        setLoading(false);
      } catch (error) {
        console.error('Virhe haettaessa arvosteluja:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, mediatype]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview); 

  return (
    <>
      {loading ? (
        <p>Ladataan arvosteluja...</p>
      ) : (
        <div>
            {reviews.length > reviewsPerPage && (
              <ul className="pagination">
                  <li>
                      <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                    &#9664; </button>
                    &nbsp; <span className="movieinfo">sivu {currentPage} / {Math.ceil(reviews.length / reviewsPerPage)}</span> &nbsp;
                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(reviews.length / reviewsPerPage) ? currentPage + 1 : Math.ceil(reviews.length / reviewsPerPage))}>
                      &#9654; </button>
                  </li>
              </ul>
            )}

          {currentReviews.map((review, index) => (
  
            <div key={index}>
                <b>Lähetetty:</b> {new Date(review.timestamp).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })} <br />
                <b>Käyttäjältä:</b>&nbsp; 
                {(review.profile.eilink !== "true") && <b><Link to={`/profile/${review.profile.profilename}`}>{review.profile.profilename}</Link></b>}
                {(review.profile.eilink === "true") && <i>Anonyymi</i> }
                
                 <br /> 
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
