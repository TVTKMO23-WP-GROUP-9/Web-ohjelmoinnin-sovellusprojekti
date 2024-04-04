const express = require('express');
const router = express.Router();
const favoritelistService = require('./favoritelistService')

router.use(express.json());

router.get('/favoritelist', favoritelistService.getAllFavoritelist);
router.get('/favoritelist/:idfavoritelist', favoritelistService.getfavoritelist);
router.post('/favoritelist', favoritelistService.createFavoritelist);
router.delete('/favoritelist/:idfavoritelist', favoritelistService.deleteFavoritelist);

module.exports = router;