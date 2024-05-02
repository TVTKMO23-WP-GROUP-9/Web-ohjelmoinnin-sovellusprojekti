const reviewModel = require('./reviewModel');


// arvostelun tarkistaminen onko käyttäjä jo arvostellut tämän elokuvan
async function movieReviewFromThisUser(req, res) {
  profileId = res.locals.profileid;
  revieweditem = req.params.id;
  mediatype = 0;

try {
  const checkIfExists = await reviewModel.reviewFromThisUser(profileId, revieweditem, mediatype);
  res.status(200).send(checkIfExists);
} catch (error) {
  console.error('Virhe haettaessa arvosteluja:', error);
  res.status(500).send('Virhe haettaessa arvosteluja');
}
}

// arvostelun tarkistaminen onko käyttäjä jo arvostellut tämän sarjan
async function serieReviewFromThisUser(req, res) {
  profileId = res.locals.profileid;
  revieweditem = req.params.id;
  mediatype = 1;

try {
  const checkIfExists = await reviewModel.reviewFromThisUser(profileId, revieweditem, mediatype);
  res.status(200).send(checkIfExists);
} catch (error) {
  console.error('Virhe haettaessa arvosteluja:', error);
  res.status(500).send('Virhe haettaessa arvosteluja');
}
}

// arvostelun lähettäminen käyttöliittymästä (elokuva)
async function movieReviewFromUser(req, res) {
  profileid = res.locals.profileid;

  const { mediatype, rating, review, revieweditem, adult } = req.body;

  const addReview = await reviewModel.movieReviewFromUser(profileid, mediatype, rating, review, revieweditem, adult);
  if (addReview) {
    res.status(201).send('Arvostelu lisätty onnistuneesti');
  } else {

    res.status(500).send('Virhe luotaessa arvostelua');
  }
}

// arvostelun lähettäminen käyttöliittymästä (SARJA)
async function serieReviewFromUser(req, res) {
  profileid = res.locals.profileid;

  const { mediatype, rating, review, revieweditem, adult } = req.body;

  const addReview = await reviewModel.serieReviewFromUser(profileid, mediatype, rating, review, revieweditem, adult);
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
  const profileid = res.locals.profileid;
  const idreview = req.params.id;
  const { review, rating } = req.body;
  try {
    await reviewModel.updateReview(profileid, idreview, review, rating);
    res.send('Arvostelu päivitetty onnistuneesti');
  } catch (error) {
    console.error('Virhe päivitettäessä arvostelua:', error);
    res.status(500).send('Virhe päivitettäessä arvostelua');
  }
}

// arvostekun poistaminen reviewid:n perusteella
async function deleteReview(req, res) {
  const profileid = res.locals.profileid;
  const id = req.params.id;
  try {
    await reviewModel.deleteReview(id, profileid);
    res.send('Arvostelu poistettu onnistuneesti');
  } catch (error) {
    console.error('Virhe poistettaessa arvostelua:', error);
    res.status(500).send('Virhe poistettaessa arvostelua');
  }
}

// arvostelun poistaminen adminin toimesta
async function adminDeleteReview(req, res) {
  const id = req.params.id;
  //const usertype = res.locals.usertype;
  const usertype = res.locals.usertype;
    if (usertype !== 'admin') {
        return res.status(403).json({ message: 'admin voi poistaa arvostelun' });
    }
    
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

async function getReviewsByItem(req, res) {
  const id = req.params.id;
  const mediatype = req.params.mediatype;
  try {
    const reviews = await reviewModel.getReviewsByItem(id, mediatype);
    res.json(reviews);
  } catch (error) {
    console.error('Virhe haettaessa arvosteluja:', error);
    res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

async function serieReviewExists(req, res) {

  const tvShowId = req.params.id;
  try {
    const reviewExists = await reviewModel.serieReviewExists(tvShowId);
    res.json({ reviewExists });
  } catch (error) {
    console.error('Virhe tarkistettaessa sarjan arvostelua:', error);
    res.status(500).send('Virhe tarkistettaessa sarjan arvostelua');
  }
}

async function updateReviewToAnon(req, res) {
  const profileid = res.locals.profileid;
  try {
    await reviewModel.updateReviewToAnon(profileid);
    res.send('Arvostelu päivitetty onnistuneesti');
  } catch (error) {
    console.error('Virhe päivitettäessä arvostelua:', error);
    res.status(500).send('Virhe päivitettäessä arvostelua');
  }
}

async function getAnonReviews(req, res) {
    const profileid = req.params.profileid;
    try {
    const reviews = await reviewModel.getAnonReviews(profileid);
    res.json(reviews);
  } catch (error) {
    console.error('Virhe haettaessa arvosteluja:', error);
    res.status(500).send('Virhe haettaessa arvosteluja');
  }
}

async function getReviewId(req, res) {
  const profileid = req.params.profileid;
  const id = req.params.id;
  const mediatype = req.params.mediatype;
  try {
    const review = await reviewModel.getReviewId(profileid, id, mediatype);
    res.json(review);
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
  getReviewsByItem,
  serieReviewExists,
  updateReviewToAnon,
  getAnonReviews,
  movieReviewFromThisUser,
  serieReviewFromThisUser,
  adminDeleteReview,
  getReviewId
};