const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');

router.use(express.json());

router.get('/review', reviewService.getAllReviews);
router.get('/reviews/profile/:id', reviewService.getReviewsByProfile);
router.get('/review/new', reviewService.getNewestReviews);
router.post('/review', reviewService.createReview);
router.put('/reviews/update/:id', reviewService.updateReview);
router.put('/review/:id', reviewService.updateReview);
router.delete('/review/:id', reviewService.deleteReview);

module.exports = router;
