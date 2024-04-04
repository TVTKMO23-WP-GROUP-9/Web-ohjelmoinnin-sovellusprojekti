const express = require('express');
const router = express.Router();
const movieService = require('./movieService');

// // etsitään elokuvia, rajapinta tarjosi lähinnä hakusanan sekä pari muuta parametria
router.get('/movie/search', movieService.searchMovies);

// löydetään elokuvia esim. suosituimpien perusteella tai muita kivoja parametrejä käyttäen, ei taida varsinaisesti tukea "hakusanaa" eli searchia
router.get('/movie/discover', movieService.discoverMovies);

// find by id -haku, eli kun on haettu elokuvat vaikka listaan, niin klikkaamalla elokuvaa saadaan elokuvan lisäsivu auki, infot pöytään
router.get('/movie/:id', movieService.getMovieById);

module.exports = router;
