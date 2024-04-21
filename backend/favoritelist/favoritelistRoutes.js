const express = require('express');
const router = express.Router();
const favoritelistService = require('./favoritelistService')
router.use(express.json());
const {auth,optionalAuth } = require('../middleware/auth')


// mikään näistä ei ole vielä käytössä
router.get('/favoritelist', favoritelistService.getAllFavoritelist);
router.get('/favoritelist/profile/:profileid', favoritelistService.getFavoritelistByProfile);
router.get('/favoritelist/group/:groupid', favoritelistService.getFavoritelistByGroup);
router.post('/favoritelist', favoritelistService.createFavoritelist);
router.delete('/favoritelist/:profileid/:idfavoritelist', favoritelistService.deleteFavoritelist);
router.get('/favoritelist/favoriteditem', optionalAuth, favoritelistService.getFavorite);
router.delete('/favoritelist/:profileid/:idfavoritelist', favoritelistService.deleteFavorite);
router.delete('/favoritelist/:groupid', favoritelistService.deleteFavoritelist);
router.delete('/favoritelist/:profileid', favoritelistService.deletePIDFavoritelist);

module.exports = router;