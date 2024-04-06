const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');

router.use(express.json());

router.get('/reviews', reviewService.getAllReviews);
router.get('/reviews/:id', reviewService.getReviewById);
router.post('/reviews', reviewService.createReview);
router.put('/reviews/:id', reviewService.updateReview);
router.delete('/reviews/:id', reviewService.deleteReview);

module.exports = router;
