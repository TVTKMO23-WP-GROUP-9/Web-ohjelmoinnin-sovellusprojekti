const express = require('express');
const router = express.Router();
const favoritelistService = require('./favoritelistService')
router.use(express.json());


// mikään näistä ei ole vielä käytössä
router.get('/favoritelist', favoritelistService.getAllFavoritelist);
router.get('/favoritelist/profile/:profileid', favoritelistService.getFavoritelistByProfile);
router.get('/favoritelist/group/:groupid', favoritelistService.getFavoritelistByGroup);
router.post('/favoritelist', favoritelistService.createFavoritelist);
router.delete('/favorite/:idfavoritelist', favoritelistService.deleteFavorite);
router.delete('/favorite/:profileid/:favoriteditem', favoritelistService.deleteOnProfileFavorite);
router.delete('/favoritelist/:groupid', favoritelistService.deleteFavoritelist);
router.get('/favoritelist/profile/:profileid/:favoriteditem', favoritelistService.getFavorite);

module.exports = router;