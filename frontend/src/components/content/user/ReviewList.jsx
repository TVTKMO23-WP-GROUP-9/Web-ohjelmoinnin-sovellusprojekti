import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const ReviewList = ({ profile }) => {

  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);
  const [updatedReview, setUpdatedReview] = useState({
    review: '', rating: 0
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const isOwnProfile = profile && profile.isOwnProfile;


  const fetchReviews = async () => {
    try {
      if (profile && profile.profileid) {

        const response = await axios.get(`${VITE_APP_BACKEND_URL}/reviews/profile/${profile.profileid}`);
        const reviewData = response.data;

        const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
          try {
            const movieResponse = await axios.get(`${VITE_APP_BACKEND_URL}/movie/${review.revieweditem}`);
            const movieData = movieResponse.data;

            if (movieData && movieData.title) {
              return {
                ...review,
                movie: movieData,
                link: `/movie/${review.revieweditem}`
              };
            } else {
              return review;
            }
          } catch (error) {
            console.error('Hakuvirhe:', error);
            return review;
          }
        }));

        const sortedReviews = reviewsWithMovies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setReviews(reviewsWithMovies, sortedReviews);
      }
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [profile]);

  {/*const handleDeleteReview = async (idreview) => {
      try {
        const response = await axios.delete(`${VITE_APP_BACKEND_URL}//review/${idreview}`);
        console.log(response.data);
        setReviews(reviews.filter(review => review.idreview !== idreview));
      } catch (error) {
        console.error('Poistovirhe:', error);
      }
    };*/}

  const handleConfirmDelete = async (idreview) => {
    try {
      const response = await axios.delete(`${VITE_APP_BACKEND_URL}//review/${idreview}`);
      console.log(response.data);
      setReviews(reviews.filter(review => review.idreview !== idreview));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Poistovirhe:', error);
    }
  };

  const handleReviewEdit = (idreview) => {
    setEditReviewId(idreview);
  };

  const handleUpdateReview = async (idreview) => {
    try {
      const response = await axios.put(`${VITE_APP_BACKEND_URL}//reviews/update/${idreview}`, updatedReview);
      setEditReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error('Muokkausvirhe:', error);
    }
  };

  const setRating = (e) => {
    const newRating = e.target.value;
    setUpdatedReview(prevState => ({
      ...prevState,
      rating: newRating
    }));
  };

  const setReview = (e) => {
    const newReview = e.target.value;
    setUpdatedReview(prevState => ({
      ...prevState,
      review: newReview
    }));
  };

  const renderRatingIcons = (rating) => {
    const ratingIcons = [];
    for (let i = 0; i < rating; i++) {
      ratingIcons.push(<span key={i} className="review uni06"></span>);
    }
    return ratingIcons;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const filteredReviews = reviews.filter(review =>
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  function truncateLongWords(text, maxLength) {
    return text.split(' ').map(word => {
      return word.length > maxLength ? word.substring(0, maxLength) + '...' : word;
    }).join(' ');
  }

  return (
    <>
      <ul className="review-list">
        <li className="userinfo">
          Kirjoittanut <b>{filteredReviews.length}</b> arvostelua. <br />
          Arvostelujen keskiarvo on <b>{filteredReviews.length > 0 && (filteredReviews.reduce((sum, review) => sum + review.rating, 0) / filteredReviews.length).toFixed(1)}</b>.<br /><br />
        </li>

        <ul className="pagination">
          <li>
            <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
              ⯇
            </button>
            &nbsp; <span className="communityinfo">selaa</span> &nbsp;
            <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredReviews.length / reviewsPerPage) ? currentPage + 1 : Math.ceil(filteredReviews.length / reviewsPerPage))}>
              ⯈
            </button>
          </li>
        </ul>

        <hr />

        {currentReviews.map((review, index) => (
          <li className='minheight' key={index}>
            <Link to={`/movie/${review.revieweditem}`}><img className='reviewimg' src={`https://image.tmdb.org/t/p/w342${review.movie.poster_path}`} alt={review.title} /></Link>
            <span className='reviewinfo'>{formatDate(review.timestamp)}</span> <br />
            {review.movie ? (
              <Link className='reviewtitle' to={`/movie/${review.revieweditem}`}>{review.movie.title}</Link>
            ) : (
              <span>{review.revieweditem}</span>
            )}
            <br />
            <span>{renderRatingIcons(review.rating)}</span>
            <span className='userinfo'>| <b>{review.rating}/5</b> tähteä</span> <br />
            <span className='userinfo'>{truncateLongWords(review.review, 25)}</span> <br />
            {!editReviewId && isOwnProfile && (
              <button className="compactButton" onClick={() => handleReviewEdit(review.idreview)}><span className='review uni11'></span> Muokkaa arvostelua</button>
            )}
            {editReviewId === review.idreview && (
              <div className="edit-review">
                <b>Tähdet välillä 1-5</b> <br />
                <input className='updateRating' type="number" min="1" max="5" value={updatedReview.rating} onChange={setRating} /> <br />
                <b>Kommentti</b> <br />
                <textarea className="updateReview" value={updatedReview.review} onChange={setReview} /> <br />
                <button className="compactButton" onClick={() => handleUpdateReview(review.idreview)}><span className='review uni13'></span> Tallenna muutokset</button>
                <button className="compactButton" onClick={() => setEditReviewId(null)}>Peruuta muutokset</button>
              </div>
            )}

            {!editReviewId && isOwnProfile && (
              <>
                {confirmDeleteId === review.idreview ? (
                  <>
                    <button className="confirm" onClick={() => handleConfirmDelete(review.idreview)}><span className='review uni12'></span> Vahvista</button>
                    <button className="compactButton" onClick={() => setConfirmDeleteId(null)}>Peruuta</button>
                  </>
                ) : (
                  <button className="compactButton" onClick={() => setConfirmDeleteId(review.idreview)}><span className='review uni12'></span> Poista arvostelu</button>
                )}
              </>
            )}

          </li>
        ))}
      </ul>

    </>
  );
}
export default ReviewList;