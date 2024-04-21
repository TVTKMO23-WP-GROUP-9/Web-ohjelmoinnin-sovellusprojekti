const pool = require('../database/db_connection');

async function queryDatabase(query) {
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function reviewFromThisUser(profileid, revieweditem, mediatype) {
  try {
    console.log (profileid, revieweditem, mediatype);
    const query = {
      text: 'SELECT profileid, revieweditem, mediatype FROM Review_ WHERE profileid = $1 AND revieweditem = $2 AND mediatype = $3',
      values: [profileid, revieweditem, mediatype],
    };
    result = await pool.query(query);
    console.log(result.rows);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Hakuvirhe:', error);
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
    LEFT JOIN profile_ ON review_.profileid = profile_.profileid
    ORDER BY review_.timestamp DESC 
    LIMIT 12;
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

async function serieReviewExists(profileid, revieweditem, mediatype) {
  try {
    const query = {
      text: 'SELECT EXISTS(SELECT 1 FROM Review_ WHERE profileid = $1 AND revieweditem = $2 AND mediatype = $3) as "exists"',
      values: [profileid, revieweditem, mediatype],
    };
    const result = await queryDatabase(query);
    return result[0].exists;
  } catch (error) {
    throw error;
  }
}

async function getReviewsByItem(id, mediatype) {
  try {
    const query = {
      text: 'SELECT * FROM Review_ WHERE revieweditem = $1 AND mediatype = $2 ORDER BY review_.timestamp DESC ',
      values: [id, mediatype],
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function updateReviewToAnon(profileid) {
  try {
    const query = {
      text: 'UPDATE Review_ SET profileid = NULL WHERE profileid = $1',
      values: [profileid],
    };
    await queryDatabase(query);
  } catch (error) {
    throw error;
  }
}

async function getAnonReviews () {
  try {
    const query = {
      text: 'SELECT * FROM Review_ WHERE profileid IS NULL',
    };
    return await queryDatabase(query);
  } catch (error) {
    throw error;
  }
}


module.exports = {
  movieReviewFromUser,
  serieReviewFromUser,
  getAllReviews,
  getNewestReviews,
  updateReview,
  deleteReview,
  getReviewsByProfile,
  serieReviewExists,
  getReviewsByItem,
  updateReviewToAnon, 
  getAnonReviews,
  reviewFromThisUser,
};