import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
const { VITE_APP_BACKEND_URL } = import.meta.env;

const ReviewForm = ({ movieId }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState("");

    const closeReviewForm = () => {
        setShowReviewForm(false);
      }
    
      const openReviewForm = () => {
        setShowReviewForm(true);
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = sessionStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios.post(
                `${VITE_APP_BACKEND_URL}/movie/${movieId}/review`,
                {   
                    rating,
                    review,
                    mediatype: '0',
                    revieweditem: `${movieId}`,
                } , { headers }
            );

            window.location.reload();
            //setReview((reviews) => [...reviews, response.data]);
            
        } catch (error) {
            console.error("Virhe arvostelun lisäämisessä:", error);
        }
    }

    return (

        <div>
            
        {!showReviewForm ? (
            <button onClick={openReviewForm} className="basicbutton">Luo uusi arvostelu</button>
          ) : (
            <div id="createReview">
              <h2>Uusi arvostelu</h2> 
    
              <h4>Anna tähdet: </h4>
              <select   className="field"
                        type="number"
                        id="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required>

                <option value="">Valitse arvio</option>
                <option value="1">&#11088; [1/5] tähteä</option>
                <option value="2">&#11088;&#11088; [2/5] tähteä</option>
                <option value="3">&#11088;&#11088;&#11088; [3/5] tähteä</option>
                <option value="4">&#11088;&#11088;&#11088;&#11088; [4/5] tähteä</option>
                <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä</option>
              </select>
              <p><h4>Perustelut:</h4>
              <textarea 
                        className="textBox" 
                        placeholder="..." 
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required></textarea></p>
              <button onClick={handleSubmit} disabled={rating < 1 || rating > 5} className='basicbutton'>Lähetä arvostelu</button>
              <button onClick={closeReviewForm} className="basicbutton">Peruuta</button>
            </div>
          )}

        </div>

    );
};

export default ReviewForm;