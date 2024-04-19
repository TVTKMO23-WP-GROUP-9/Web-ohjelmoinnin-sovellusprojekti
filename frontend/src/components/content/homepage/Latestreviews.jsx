import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin
const { VITE_APP_BACKEND_URL } = import.meta.env;


const Latestreviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const newReviewResponse = await axios.get(`${VITE_APP_BACKEND_URL}/review/new`);
        const anonReviewResponse = await axios.get(`${VITE_APP_BACKEND_URL}/reviews/anon`);
        
        const newReviews = newReviewResponse.data;
        const anonReviews = anonReviewResponse.data;
        
        const allReviews = [...newReviews, ...anonReviews];

        // Hae jokaisen arvostelun review.revieweditem arvolla liittyvä elokuva
        const reviewsWithMovies = await Promise.all(allReviews.map(async review => {
          try {
            let responseData;
            if (review.mediatype === 0) {
              const movieResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/movie/${encodeURIComponent(review.revieweditem)}`);
              responseData = movieResponse.data;
            } else if (review.mediatype === 1) {
              const tvResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/series/${encodeURIComponent(review.revieweditem)}`);
              responseData = tvResponse.data;
            }
            return {
              ...review,
              data: responseData
            };
          } catch (error) {
            console.error('Virhe tiedon hakemisessa:', error);
            // Palauta tyhjä objekti, jos hakeminen epäonnistuu
            return {};
          }
        }));

        // Suodata pois tyhjät arvostelut ja aseta arvostelut
        setReviews(reviewsWithMovies.filter(review => Object.keys(review).length !== 0));
        setLoading(false);
      } catch (error) {
        console.error('Virhe haettaessa arvosteluja:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);



  return (
    <>
      {loading ? (
        <p>Ladataan arvosteluja...</p>
      ) : (
        <div className="reviewmain">
          {reviews.map((review, index) => (
            <table className="review-item" key={index}>
              <tbody>
                <tr>
                <td className='tdimg'>
                {review.mediatype === 0 ? (
                <Link to={`/movie/${review.revieweditem}`} className="link-style">
                <img src={`https://image.tmdb.org/t/p/w342${review.data.poster_path}`} alt={review.data.title} />
                <div>             
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} >&#11088;</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i + review.rating}>&#x2605;</span>
                  ))}
                  </div>
                  </Link>
                  ) : (
                  <Link to={`/series/${review.revieweditem}`} className="link-style">
                  <img src={`https://image.tmdb.org/t/p/w342${review.data.poster_path}`} alt={review.data.name} />
                  <div>             
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} >&#11088;</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i + review.rating}>&#x2605;</span>
                  ))}
                  </div>
                  </Link>
                  )}
                  </td>
                  <td>

                  </td>
                  
                  <td className="review-info">
                    <h2>{review.data.title}{review.data.name}</h2>
                    <p><b>Arvostelu: </b> {review.review}</p>
                    <p><b>Arvosteltu: </b>{new Date(review.timestamp).toLocaleString('fi-FI', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}</p>
                    <p><b>Arvostelija: </b>   
                    {review.profilename ? (
                    <Link className="link-style" to={`/profile/${review.profilename}`}>
                    {review.profilename}
                    </Link>
                    ) : (
                    <i>anonyymi</i>
                    )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}
    </>
  );
};

export default Latestreviews;
