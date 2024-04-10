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

// arvostelun päivittäminen reviewid:n perusteella
async function updateReview(req, res) {
  const idreview = req.params.id;
  const { review, rating } = req.body;
  
  try {
    const query = {
      text: 'UPDATE Review_ SET review = $2, rating = $3 WHERE idreview = $1',
      values: [idreview, review, rating ],
    }; 
    await reviewModel.queryDatabase(query); 
    res.send('Arvostelu päivitetty onnistuneesti');
  } catch (error) {
    console.error('Virhe päivitettäessä arvostelua:', error);
    res.status(500).send('Virhe päivitettäessä arvostelua');
  }
}

// arvostekun poistaminen reviewid:n perusteella
async function deleteReview(req, res) {
  const id = req.params.id;
  
  try {
    const query = {
      text: 'DELETE FROM Review_ WHERE idreview = $1',
      values: [id],
    };
    await reviewModel.queryDatabase(query);
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
