import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const ReviewList = ({ id, user }) => {

  const [reviews, setReviews] = useState([]);
  const [reviewsPerPage, setReviewsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [adult, setAdult] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const profresponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`);

            setAdult(profresponse.data.adult);

        } catch (error) {
            console.error('Virhe haettaessa profiilitietoja:', error);
        }
    };

    fetchProfile();
  }, [user]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${VITE_APP_BACKEND_URL}/memberlist/group/${id}/0`);
      const memberData = response.data;

      // Haetaan arviot kaikilta profiileilta
      const reviewsFromMembers = await Promise.all(memberData.map(async profile => {
        try {
          const userresponse = await axios.get(`${VITE_APP_BACKEND_URL}/reviews/profile/${profile.profileid}`);
          const reviewData = userresponse.data;

          // Haetaan profiilitiedot
          const userProfileResponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/id/${profile.profileid}`);
          const userProfileData = userProfileResponse.data;

          // Haetaan elokuvan tiedot jokaiselle arviolle
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
              if (responseData && responseData.title || responseData.name) {
                return {
                  ...review,
                  movie: responseData,
                  userProfile: userProfileData,
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
      
      {currentReviews
        .filter(review => review.adult === false || adult === true)
        .map((review, index) => (
          <li className='minheight' key={index}>
            {review.mediatype === 0 ? (
            <Link to={`/movie/${review.revieweditem}`}><img className='reviewimg' src={`https://image.tmdb.org/t/p/w342${review.movie.poster_path}`} alt={review.movie.title} /></Link>
            ) : (
            <Link to={`/series/${review.revieweditem}`}><img className='reviewimg' src={`https://image.tmdb.org/t/p/w342${review.movie.poster_path}`} alt={review.movie.name} /></Link>
            
            )}
            <span className='reviewinfo'>{formatDate(review.timestamp)}</span> <br />      
            {review.mediatype === 0 ? (
              <Link className='reviewtitle' to={`/movie/${review.revieweditem}`}>{review.movie.title}</Link>
            ) : (
              <Link className='reviewtitle' to={`/series/${review.revieweditem}`}>{review.movie.name}</Link>
            )}     
            <br />
            {[...Array(review.rating)].map((_, i) => (
                    <span key={i} >&#11088;</span>
                  ))}
            {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i + review.rating}>&#x2605;</span>
            ))}
            <span className='userinfo'>| <b>{review.rating}/5</b> tähteä</span> <br />
            <span className='userinfo'>{truncateLongWords(review.review, 25)}</span> <br />
            <span className='userinfo'>Arvostelija:  <Link className='reviewtitle' to={`/profile/${review.userProfile.profilename}`}>{review.userProfile.profilename}</Link></span><br />
                    
          </li>

        ))}
      </ul>
  );
}
export default ReviewList;