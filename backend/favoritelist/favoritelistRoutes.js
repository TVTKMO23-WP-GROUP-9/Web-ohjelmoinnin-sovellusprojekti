const express = require('express');
const router = express.Router();
const favoritelistService = require('./favoritelistService')
router.use(express.json());
const {auth,optionalAuth } = require('../middleware/auth')


router.get('/favoritelist', favoritelistService.getAllFavoritelist);
router.get('/favoritelist/profile/:profileid', favoritelistService.getFavoritelistByProfile);
router.get('/favoritelist/group/:groupid/:mediatype', favoritelistService.getFavoritelistByGroup);
router.post('/favoritelist', favoritelistService.createFavoritelist);
router.get('/favoritelist/:profileid/:favoriteditem/:mediatype', optionalAuth, favoritelistService.getFavorite);
router.delete('/favorite/:profileid/:favoriteditem/:mediatype', favoritelistService.deleteFavorite);
router.delete('/favoritefromgroup/:groupid/:favoriteditem/:mediatype', favoritelistService.deleteFavoriteFromGroup);
router.delete('/favoritelist/:groupid', favoritelistService.deleteFavoritelist);
router.get('/favoritelist/profile/:profileid/:favoriteditem', favoritelistService.getFavorite);

module.exports = router;