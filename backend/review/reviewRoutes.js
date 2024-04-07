const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');

router.use(express.json());

router.get('/review', reviewService.getAllReviews);
router.get('/reviews/:id', reviewService.getReviewById);
router.get('/reviews/profile/:id', reviewService.getReviewsByProfile);
router.post('/reviews', reviewService.createReview);
router.put('/reviews/update/:id', reviewService.updateReview);
router.delete('/reviews/:id', reviewService.deleteReview);

module.exports = router;
