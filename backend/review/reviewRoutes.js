const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');
const { auth } = require('../middleware/auth');

router.use(express.json());

router.get('/reviews', reviewService.getAllReviews);
router.get('/reviews/profile/:id', reviewService.getReviewsByProfile);
router.get('/reviews/:id/:mediatype', reviewService.getReviewsByItem);
router.get('/review/new', reviewService.getNewestReviews);
//router.post('/review', reviewService.createReview);
router.post('/movie/:id/review', auth, reviewService.movieReviewFromUser);
router.post('/series/:id/review', auth, reviewService.serieReviewFromUser);
router.put('/reviews/update/:id', reviewService.updateReview);
router.delete('/review/:id', reviewService.deleteReview);


module.exports = router;