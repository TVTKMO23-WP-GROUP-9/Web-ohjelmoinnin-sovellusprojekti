import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getHeaders } from '@auth/token';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const ReviewForm = ({ movieId, user }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewButton, setNewReviewButton] = useState(true);
  const [profileHasReview, setProfileHasReview] = useState(true); 
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const headers = getHeaders();

  console.log("user", user === null, user.user);

 if (user.user !== null) {
    useEffect(() => {
      const checkIfUserHasReview = async () => {
        try {
          const response = await axios.get(
            `${VITE_APP_BACKEND_URL}/moviereviews/thisuser/${movieId}`,
            { headers }
          );
          setProfileHasReview(response.data);
        } catch (error) {
          console.error("Virhe arvostelun tarkistuksessa:", error);
        }
      }
      checkIfUserHasReview();
    }, [movieId]);
  }
  

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setNewReviewButton(true);
  }

  const openReviewForm = () => {
    setShowReviewForm(true);
    setNewReviewButton(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_APP_BACKEND_URL}/movie/${movieId}/review`,
        {
          rating,
          review,
          mediatype: '0',
          revieweditem: `${movieId}`,
        }, { headers }
      );
      window.location.reload();
    } catch (error) {
      console.error("Virhe arvostelun lisäämisessä:", error);
    }
  }

  console.log("profileHasReview", profileHasReview);
  
  return (
    <div>
      {user.user !== null && !profileHasReview && ( 
        showReviewForm && (
          <div id="createReview">
            <h2>Uusi arvostelu</h2>
            <h4>Anna tähdet: </h4>
            <select
              className="field"
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Valitse arvio</option>
              <option value="1">&#11088; [1/5] tähteä</option>
              <option value="2">&#11088;&#11088; [2/5] tähteä</option>
              <option value="3">&#11088;&#11088;&#11088; [3/5] tähteä</option>
              <option value="4">&#11088;&#11088;&#11088;&#11088; [4/5] tähteä</option>
              <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä</option>
            </select>
            <p>
              <h4>Perustelut:</h4>
              <textarea
                className="textBox"
                placeholder="..."
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
            </p>
            <button onClick={handleSubmit} disabled={rating < 1 || rating > 5} className='basicbutton'>Lähetä arvostelu</button>
            <button onClick={closeReviewForm} className="basicbutton">Peruuta</button>
          </div>
        )
      )}
      {user.user !== null && !profileHasReview && ( newReviewButton && (
        <button onClick={openReviewForm} className="basicbutton">Luo uusi arvostelu</button>
      ))}
    </div>
  );
};

export default ReviewForm;
