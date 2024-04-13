import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import.meta.env.VITE_APP_BACKEND_URL;

const ReviewList = ({ id }) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}memberlist/group/${id}/0`);
      const memberData = response.data;
      
      // Haetaan arviot kaikilta profiileilta
      const reviewsFromMembers = await Promise.all(memberData.map(async profile => {
        try {
          const userresponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}reviews/profile/${profile.profileid}`);
          const reviewData = userresponse.data;

          // Haetaan profiilitiedot
          const userProfileResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}profile/id/${profile.profileid}`);
          const userProfileData = userProfileResponse.data;
  
          // Haetaan elokuvan tiedot jokaiselle arviolle
          const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
            try {
              const movieResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}movie/${review.revieweditem}`);
              const movieData = movieResponse.data;
  
              if (movieData && movieData.title) {
                return {
                  ...review,
                  movie: movieData,
                  userProfile: userProfileData,
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
  
          // Lajitellaan arviot päivämäärän mukaan
          const sortedReviews = reviewsWithMovies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          return sortedReviews;
        } catch (error) {
          console.error('Hakuvirhe:', error);
          return [];
        }
      }));
  
      // Yhdistetään arviot kaikilta profiileilta
      const allReviews = reviewsFromMembers.flat();
      
      // Lajitellaan kaikki arviot päivämäärän mukaan
      const sortedAllReviews = allReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Päivitetään arviot
      setReviews(sortedAllReviews);
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };
  

  useEffect(() => {
    fetchReviews();
  }, [id]);

    {/*const handleDeleteReview = async (idreview) => {
      try {
        const response = await axios.delete(`http://localhost:3001/review/${idreview}`);
        console.log(response.data);
        setReviews(reviews.filter(review => review.idreview !== idreview));
      } catch (error) {
        console.error('Poistovirhe:', error);
      }
    };*/}



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
    
      <ul className="greview-list">
        <li className="userinfo">
          Ryhmän jäsenillä <b>{filteredReviews.length}</b> arvostelua. <br />
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

      <hr/>
  
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
            <span className='userinfo'>Arvostelija: {review.userProfile.profilename}</span> <br />
            

            
          </li>
        ))}
      </ul>
  );
}
export default ReviewList;