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

module.exports = {
  queryDatabase,
  movieReviewFromUser,
};
