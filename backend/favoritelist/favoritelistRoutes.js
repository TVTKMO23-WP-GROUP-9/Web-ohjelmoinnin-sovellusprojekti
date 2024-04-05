const express = require('express');
const router = express.Router();
const favoritelistService = require('./favoritelistService')

router.use(express.json());

router.get('/favoritelist', favoritelistService.getAllFavoritelist);
router.get('/favoritelist/profile/:profileid', favoritelistService.getFavoritelistByProfile);
router.get('/favoritelist/group/:groupid', favoritelistService.getFavoritelistByGroup);
router.post('/favoritelist', favoritelistService.createFavoritelist);
router.delete('/favoritelist/:idfavoritelist', favoritelistService.deleteFavoritelist);

module.exports = router;