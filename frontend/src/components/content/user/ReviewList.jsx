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
          setReviews(response.data);
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
            <Link to="#">{review.revieweditem}</Link> <br/>
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