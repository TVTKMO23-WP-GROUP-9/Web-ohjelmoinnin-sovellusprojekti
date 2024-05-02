import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getHeaders } from '@auth/token';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const ReviewForm = ({ movieId, user }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewButton, setNewReviewButton] = useState(true);
  const [actionForm, setShowActionForm] = useState(false);
  const [editButton, setEditButton] = useState(true);
  const [profileHasReview, setProfileHasReview] = useState(true); 
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [movieAdult, setMovieAdult] = useState(true); // Asetetaan oletusarvoksi true
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null); 
  const [ReviewId, setReviewId] = useState(null);  
  const [updatedReview, setUpdatedReview] = useState({
    review: '', rating: 0
  });

  const headers = getHeaders();

 if (user.user !== null) {
    useEffect(() => {
      const checkIfUserHasReview = async () => {
        try {
          const response = await axios.get(
            `${VITE_APP_BACKEND_URL}/moviereviews/thisuser/${movieId}`,
            { headers }
          );
          const reviewResponse = await axios.get(
            `${VITE_APP_BACKEND_URL}/review/${user.user.profileid}/${movieId}/0`
          );    
          setReviewId(reviewResponse.data);
          setProfileHasReview(response.data);
        } catch (error) {
          console.error("Virhe arvostelun tarkistuksessa:", error);
        }
      }
      checkIfUserHasReview();
    }, [movieId]);
  }
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/${movieId}`);
        setMovieAdult(response.data.adult); // Asetetaan elokuvan adult-arvo
      } catch (error) {
        console.error('Hakuvirhe:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setNewReviewButton(true);
  }

  const openReviewForm = () => {
    setShowReviewForm(true);
    setNewReviewButton(false);
  }

  const handleReviewEdit = (idreview) => {
    setEditReviewId(idreview);
  };

  const handleCancelEdit = () => {
    setEditReviewId(null);
    setConfirmDeleteId(null);
    setUpdatedReview({ review: '', rating: 0 });
  };

  const handleCancelDelete = () => { 
    setConfirmDeleteId(null);
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
          adult: `${movieAdult}`,
        }, { headers }
      );
      window.location.reload();
    } catch (error) {
      console.error("Virhe arvostelun lisäämisessä:", error);
    }
  }

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put(`${VITE_APP_BACKEND_URL}/reviews/update/${ReviewId}`, updatedReview, { headers });
      setEditReviewId(null);
      
      window.location.reload();
    } catch (error) {
      console.error('Muokkausvirhe:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const deleteresponse = await axios.delete(`${VITE_APP_BACKEND_URL}/review/${ReviewId}`);
      setConfirmDeleteId(null);
      window.location.reload();
    } catch (error) {
      console.error('Poistovirhe:', error);
    }
  };

  const setUpdateRating = (e) => {
    const newRating = e.target.value;
    setUpdatedReview(prevState => ({
      ...prevState,
      rating: newRating
    }));
  };

  const setUpdateReview = (e) => {
    const newReview = e.target.value;
    setUpdatedReview(prevState => ({
      ...prevState,
      review: newReview
    }));
  };

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
            <button onClick={handleSubmit} disabled={rating < 1 || rating > 5 } className='basicbutton'>Lähetä arvostelu</button>
            <button onClick={closeReviewForm} className="basicbutton">Peruuta</button>
          </div>
        )
      )}
      {user.user !== null && !profileHasReview && ( newReviewButton && (
        <button onClick={openReviewForm} className="basicbutton">Luo uusi arvostelu</button>
      ))}
    {user.user !== null && profileHasReview && editReviewId === null && ( editButton && (
        <button onClick={() => handleReviewEdit(review.idreview)} className="basicbutton"><img src="/pencil.png" className='emoji' />&nbsp; Muokkaa arvostelua</button>
      ))}
      
               {editReviewId === review.idreview && (
              <div className="edit-review">
                <b>Tähdet välillä 1-5</b> <br />
                <input className='updateRating' type="number" min="1" max="5" value={updatedReview.rating} onChange={setUpdateRating} /> <br />
                <b>Kommentti</b> <br />
                <textarea className="updateReview" value={updatedReview.review} onChange={setUpdateReview} /> <br />
                <button className="compactButton" onClick={() => handleUpdateReview(review.idreview)}><img src="/accept.png" className='emoji' /> Tallenna muutokset</button>
                <button className="compactButton" onClick={() => handleCancelEdit()}>Peruuta muutokset</button>
                {confirmDeleteId === review.idreview ? (
                  <>
                    <button className="confirm" onClick={() => handleConfirmDelete()}><img src="/reject.png" className='emoji' />Vahvista</button>
                    <button className="compactButton" onClick={() => handleCancelDelete()} >Peruuta</button>
   
                  </>
                ) : (
                  <>
                  <button className="compactButton" onClick={() => setConfirmDeleteId()}><img src="/reject.png" className='emoji' /> Poista arvostelu</button>
                  
                  </>
                )}

              </div>
            )}


    </div>
  );
};

export default ReviewForm;
