const reviewModel = require('./reviewModel');

// arvostelun lähettäminen käyttöliittymästä (elokuva)
async function movieReviewFromUser (req, res) {
  profileid = res.locals.profileid;

  const { mediatype, rating, review, revieweditem} = req.body;

  const addReview = await reviewModel.movieReviewFromUser(profileid, mediatype, rating, review, revieweditem);
  if (addReview) {
    res.status(201).send('Arvostelu lisätty onnistuneesti');
  } else {

    res.status(500).send('Virhe luotaessa arvostelua');
  }
}

// arvostelun lähettäminen käyttöliittymästä (SARJA)
async function serieReviewFromUser (req, res) {
  profileid = res.locals.profileid;

  const { mediatype, rating, review, revieweditem} = req.body;

  const addReview = await reviewModel.serieReviewFromUser(profileid, mediatype, rating, review, revieweditem);
  if (addReview) {
    res.status(201).send('Arvostelu lisätty onnistuneesti');
  } else {

    res.status(500).send('Virhe luotaessa arvostelua');
  }
}

async function getAllReviews(req, res) {
  try {
      const reviews = await reviewModel.getAllReviews();
      res.json(reviews);
  } catch (error) {
      console.error('Virhe haettaessa arvosteluja:', error);
      res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

async function getNewestReviews(req, res) {
  try {
      const reviews = await reviewModel.getNewestReviews();
      res.json(reviews);
  } catch (error) {
      console.error('Virhe haettaessa arvosteluja:', error);
      res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

// arvostelun päivittäminen reviewid:n perusteella
async function updateReview(req, res) {
  const idreview = req.params.id;
  const { review, rating } = req.body;
  try {
      await reviewModel.updateReview(idreview, review, rating);
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
      await reviewModel.deleteReview(id);
      res.send('Arvostelu poistettu onnistuneesti');
  } catch (error) {
      console.error('Virhe poistettaessa arvostelua:', error);
      res.status(500).send('Virhe poistettaessa arvostelua');
  }
}

// arvostelut käyttäjältä x esim. profiilisivulle
async function getReviewsByProfile(req, res) {
  const id = req.params.id;
  try {
      const reviews = await reviewModel.getReviewsByProfile(id);
      res.json(reviews);
  } catch (error) {
      console.error('Virhe haettaessa arvosteluja:', error);
      res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

module.exports = {
  getAllReviews,
  getNewestReviews,
  updateReview,
  deleteReview,
  getReviewsByProfile,
  movieReviewFromUser,
  serieReviewFromUser,
};

