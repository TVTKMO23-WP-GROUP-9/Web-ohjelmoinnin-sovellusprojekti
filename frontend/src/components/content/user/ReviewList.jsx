import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewList = ({ profile }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (profile && profile.profileid) {
          const response = await axios.get(`http://localhost:3001/reviews/profile/${profile.profileid}`);
          const reviewData = response.data;

          const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
            try {
              const movieResponse = await axios.get(`http://localhost:3001/movie/${review.revieweditem}`);
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
              console.error('Virhe elokuvan hakemisessa:', error);
              return review;
            }
          }));

          setReviews(reviewsWithMovies);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchReviews();
  }, [profile]);

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

  return (
    <div className="group-middle">
      <h2>Arvostelut</h2>
      <ul>
      {reviews.map((review, index) => (
        
        <li key={index}>
            <span>{formatDate(review.timestamp)}</span> <br/>
            {review.movie ? (
              <Link to={`/movie/${review.revieweditem}`}>{review.movie.title}</Link>
            ) : (
              <span>{review.revieweditem}</span>
            )}
            <br/>
            <span>{renderRatingIcons(review.rating)}</span> 
            <span className='userinfo'>|  <b>{review.rating}/5</b> tähteä</span> <br/>
            <span className='userinfo'>{review.review}</span> <hr/>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;


/*import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReviewList = ({ profile }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/byprofile/${profile.profilename}`);
        const reviewData = response.data;

        const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
          
          try {
            const movieResponse = await axios.get(`http://localhost:3001/movie/${review.revieweditem}`);
            const movieData = movieResponse.data;

            if (movieData && movieData.title) {
            return {
              ...review,
              movie: movieData
            } 
          } else {
              return review; 
            }
          } catch (error) {
            console.error('Virhe elokuvan hakemisessa:', error);
            return review; 
          }
        }));

        setReviews(reviewsWithMovies);
        setLoading(false);
      } catch (error) {
        console.error('Virhe haettaessa arvosteluja:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [profile]);


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
  

  return (
    <div className="group-middle">
      <h2>Arvostelut</h2>

      <ul>
        {loading ? (
          <p>Ladataan arvosteluja...</p>
        ) : (
          reviews.map((review, index) => (
            <li key={index}>
              <span>{formatDate(review.timestamp)}</span> <br/>
              <span><Link to={`/movie/${review.revieweditem}`}>{review.movie.title}</Link></span> <br/>
              <span>{renderRatingIcons(review.rating)}</span> 
              <span className='userinfo'>|  <b>{review.rating}/5</b> tähteä</span> <br/>
              <span className='userinfo'>{review.review}</span> <hr/>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReviewList;*/