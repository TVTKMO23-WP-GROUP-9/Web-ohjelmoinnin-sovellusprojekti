const express = require('express');
const router = express.Router();
const reviewService = require('./reviewService');

router.use(express.json());

router.get('/review', reviewService.getAllReviews);
router.get('/review/new', reviewService.getNewestReviews);
router.get('/review/:id', reviewService.getReviewById);
router.post('/review', reviewService.createReview);
router.put('/review/:id', reviewService.updateReview);
router.delete('/review/:id', reviewService.deleteReview);

module.exports = router;
