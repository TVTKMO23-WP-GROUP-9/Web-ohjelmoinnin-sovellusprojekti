import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const Latestreviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/review/new');
        const reviewData = response.data;
        
        // Hae jokaisen arvostelun review.revieweditem arvolla liittyvä elokuva
        const reviewsWithMovies = await Promise.all(reviewData.map(async review => {
          try {
            const movieResponse = await axios.get(`http://localhost:3001/movie/${encodeURIComponent(review.revieweditem)}`);
            const movieData = movieResponse.data;
            return {
              ...review,
              movie: movieData
            };
          } catch (error) {
            console.error('Virhe elokuvan hakemisessa:', error);
            return review; // Jos elokuvan haku epäonnistuu, palauta vain arvostelu
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
  }, []);


  return (
    <div className="review-list">
      {loading ? (
        <p>Ladataan arvosteluja...</p>
      ) : (
        <div className="reviewmain">
          {reviews.map((review, index) => (
            <table className="review-item" key={index + 1}>
              <tbody>
                <tr>
                  <td>
                    <div className='reviewimg'>
                      <Link to={`/movie/${review.revieweditem}`} className="link-style">
                        <img src={`https://image.tmdb.org/t/p/w342${review.movie.poster_path}`} alt={review.title} />
                        <div>             
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} >&#11088;</span>
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <span key={i + review.rating}>&#x2605;</span>
                        ))}
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="review-info">
                    <h2>{review.movie.title}</h2>
                    <p><b>Arvostelu: </b> {review.review}</p>
                    <p><b>Arvosteltu: </b>{new Date(review.timestamp).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}</p>
                    <p><b>Arvostelija: </b> {review.profilename}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );  
};

export default Latestreviews;