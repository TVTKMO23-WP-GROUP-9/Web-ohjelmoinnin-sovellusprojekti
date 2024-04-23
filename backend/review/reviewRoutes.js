const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');
const { optionalAuth, auth } = require('../middleware/auth');

router.use(express.json());

// kaikki nämä ovat käytössä
router.get('/moviereviews/thisuser/:id', auth, reviewService.movieReviewFromThisUser);
router.get('/seriereviews/thisuser/:id', auth, reviewService.serieReviewFromThisUser);
router.post('/movie/:id/review', auth, reviewService.movieReviewFromUser);
router.post('/series/:id/review', auth, reviewService.serieReviewFromUser);
router.get('/series/:id/review', auth, reviewService.serieReviewExists);
router.get('/reviews', reviewService.getAllReviews);
router.get('/reviews/profile/:id', reviewService.getReviewsByProfile);
router.get('/reviews/:id/:mediatype', reviewService.getReviewsByItem);
router.get('/review/new', reviewService.getNewestReviews);
router.put('/reviews/update/:id', auth, reviewService.updateReview);
router.put('/reviews/toanon', auth, reviewService.updateReviewToAnon);
router.get('/reviews/anon', reviewService.getAnonReviews);
router.delete('/review/:id', reviewService.deleteReview);
router.delete('/admin/deletereview/:id', auth, reviewService.adminDeleteReview);

module.exports = router;