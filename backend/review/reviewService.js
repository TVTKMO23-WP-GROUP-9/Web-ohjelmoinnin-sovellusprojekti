const reviewModel = require('./reviewModel');


// GET-endpoint hakee groupname taulusta review annetun groupid-arvon perusteella
async function getAllReviews(req, res) {
  try {
      const query = 'SELECT * FROM Review_';
      const review = await reviewModel.queryDatabase(query);
      res.json(review);
  } catch (error) {
      console.error('Virhe haettaessa tietueita:', error);
      res.status(500).send('Virhe haettaessa tietueita');
  }
};

// arvostelut käyttäjältä x esim. profiilisivulle
async function getReviewsByProfile(req, res) {
  const id = req.params.id;
  try {
    const query = {
      text: 'SELECT * FROM Review_ WHERE profileid = $1',
      values: [id],
    }; 
    const reviews = await reviewModel.queryDatabase(query); 
    res.json(reviews);
  } catch (error) {
    console.error('Virhe haettaessa arvosteluja:', error);
    res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

async function getReviewById(req, res) {
  const id = req.params.id;
  try {
    const review = await reviewModel.getReviewById(id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).send('Arvostelua ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa arvostelua:', error);
    res.status(500).send('Virhe haettaessa arvostelua');
  }
}

async function getNewestReviews(req, res) {
  try {
    const query = `
      SELECT review_.*, profile_.profilename 
      FROM review_ 
      INNER JOIN profile_ ON review_.profileid = profile_.profileid
      ORDER BY review_.timestamp DESC 
      LIMIT 10
    `;
    const reviews = await reviewModel.queryDatabase(query);
    res.json(reviews);
  } catch (error) {
    console.error('Virhe haettaessa arvosteluja:', error);
    res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

async function createReview(req, res) {
  const { user_id, product_id, rating, comment, date_posted } = req.body;
  try {
    await reviewModel.createReview(user_id, product_id, rating, comment, date_posted);
    res.status(201).send('Arvostelu lisätty onnistuneesti');
  } catch (error) {
    console.error('Virhe luotaessa arvostelua:', error);
    res.status(500).send('Virhe luotaessa arvostelua');
  }
}

async function updateReview(req, res) {
  const idreview = req.params.id;
  const { profileid, revieweditem, review, rating } = req.body;
  try {
    const query = {
      text: 'UPDATE Review_ SET profileid = $1, revieweditem = $2, review = $3, rating = $4 WHERE idreview = $5',
      values: [profileid, revieweditem, review, rating, idreview],
    }; 
    await reviewModel.queryDatabase(query); 
    res.send('Arvostelu päivitetty onnistuneesti');
  } catch (error) {
    console.error('Virhe päivitettäessä arvostelua:', error);
    res.status(500).send('Virhe päivitettäessä arvostelua');
  }
}


async function deleteReview(req, res) {
  const id = req.params.id;
  try {
    await reviewModel.deleteReview(id);
    res.send('Arvostelu poistettu onnistuneesti');
  } catch (error) {
    console.error('Virhe poistettaessa arvostelua:', error);
    res.status(500).send('Virhe poistettaessa arvostelua');
  }
}

module.exports = {
  getAllReviews,
  getNewestReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByProfile,
};
