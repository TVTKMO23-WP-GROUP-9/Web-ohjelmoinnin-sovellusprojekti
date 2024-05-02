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
    const query = {
      text: 'SELECT profileid, revieweditem, mediatype FROM Review_ WHERE profileid = $1 AND revieweditem = $2 AND mediatype = $3',
      values: [profileid, revieweditem, mediatype],
    };
    result = await pool.query(query);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Hakuvirhe:', error);
    throw error;
  }
}

async function movieReviewFromUser(profileid, mediatype, rating, review, revieweditem, adult) {

  try {
    const query = {
      text: 'INSERT INTO Review_ (rating, revieweditem, review, profileid, mediatype, adult) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [rating, revieweditem, review, profileid, mediatype, adult],
    };
    await pool.query(query);
    return true;
  }
  catch (error) {
    console.error('Luontivirhe:', error);
    return false;
  }
}

async function serieReviewFromUser(profileid, mediatype, rating, review, revieweditem, adult) {

  try {
    const query = {
      text: 'INSERT INTO Review_ (rating, revieweditem, review, profileid, mediatype, adult) VALUES ($1, $2, $3, $4, $5, $6)',
      values: [rating, revieweditem, review, profileid, mediatype, adult],
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
      WHERE review_.adult = false
      ORDER BY review_.timestamp DESC 
      LIMIT 12
  `;
  return await queryDatabase(query);
}

async function updateReview(profileid, idreview, review, rating) {
  const query = {
    text: 'UPDATE Review_ SET review = $2, rating = $3 WHERE idreview = $1 AND profileid = $4',
    values: [idreview, review, rating, profileid],
  };
  await queryDatabase(query);
}

async function deleteReview(id, profileid) {
  const query = {
    text: 'DELETE FROM Review_ WHERE idreview = $1 AND profileid = $2',
    values: [id, profileid],
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
async function getReviewId(profileid, id, mediatype) {
  try {
    const query = {
      text: 'SELECT idreview FROM Review_ WHERE profileid = $1 AND revieweditem = $2 AND mediatype = $3 ORDER BY timestamp DESC LIMIT 1',
      values: [profileid, id, mediatype],
    };
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      return result.rows[0].idreview; // Palauta vain idreview
    } else {
      return null; 
    }
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
  getReviewId
};