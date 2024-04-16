const express = require('express');
const router = express.Router();
const movieService = require('./movieService');
const mediaService = require('./mediaService');

// kaikki nämä ovat käytössä
router.get('/movie/search', movieService.searchMovies);
router.get('/movie/discover', movieService.discoverMovies);
router.get('/movie/:id', movieService.getMovieById);
router.get('/movie/provider/:id', movieService.getMovieProvidersbyId);
router.get('/tv/provider/:id', movieService.getTvShowProvidersbyId);
router.get('/series/search', movieService.searchTvShows);
router.get('/series/discover', movieService.discoverTvShows);
router.get('/series/:id', movieService.getTvShowById);

// tämä ei ilmeisesti ole käytössä !!
router.get('/media', mediaService.searchMedia);


module.exports = router;
