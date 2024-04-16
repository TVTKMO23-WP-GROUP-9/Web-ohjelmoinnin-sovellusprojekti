const pool = require('../database/db_connection');

async function queryDatabase(query) {
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function movieReviewFromUser(profileid, mediatype, rating, review, revieweditem) {
  
  try {
    const query = {
      text: 'INSERT INTO Review_ (rating, revieweditem, review, profileid, mediatype) VALUES ($1, $2, $3, $4, $5)',
      values: [rating, revieweditem, review, profileid, mediatype],
    };
    await pool.query(query);
    return true;
  }
  catch (error) {
    console.error('Luontivirhe:', error);
    return false;
  }
}

async function serieReviewFromUser(profileid, mediatype, rating, review, revieweditem) {
  
  try {
    const query = {
      text: 'INSERT INTO Review_ (rating, revieweditem, review, profileid, mediatype) VALUES ($1, $2, $3, $4, $5)',
      values: [rating, revieweditem, review, profileid, mediatype],
    };
    await pool.query(query);
    return true;
  }
  catch (error) {
    console.error('Luontivirhe:', error);
    return false;
  }
}

async function getAllReviews() {
  const query = 'SELECT * FROM Review_';
  return await queryDatabase(query);
}

async function getNewestReviews() {
  const query = `
      SELECT review_.*, profile_.profilename 
      FROM review_ 
      INNER JOIN profile_ ON review_.profileid = profile_.profileid
      ORDER BY review_.timestamp DESC 
      LIMIT 12
  `;
  return await queryDatabase(query);
}

async function updateReview(idreview, review, rating) {
  const query = {
      text: 'UPDATE Review_ SET review = $2, rating = $3 WHERE idreview = $1',
      values: [idreview, review, rating],
  };
  await queryDatabase(query);
}

async function deleteReview(id) {
  const query = {
      text: 'DELETE FROM Review_ WHERE idreview = $1',
      values: [id],
  };
  await queryDatabase(query);
}

async function getReviewsByProfile(id) {
  const query = {
      text: 'SELECT * FROM Review_ WHERE profileid = $1',
      values: [id],
  };
  return await queryDatabase(query);
}

module.exports = {
  movieReviewFromUser,
  serieReviewFromUser,
  getAllReviews,
  getNewestReviews,
  updateReview,
  deleteReview,
  getReviewsByProfile,
};