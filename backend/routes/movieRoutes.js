const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const bodyParser = require('body-parser');

const MovieData = require('./data/MovieData.js');

router.use(bodyParser.urlencoded({ extended: false }));

// tietokantayhteys
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

const with_genres = {
    "action": 28,
    "adventure": 12,
    "animation": 16,
    "comedy": 35,
    "crime": 80,
    "documentary": 99,
    "drama": 18,
    "family": 10751,
    "fantasy": 14,
    "history": 36,
    "horror": 27,
    "music": 10402,
    "mystery": 9648,
    "romance": 10749,
    "science fiction": 878,
    "tv": 10770,
    "thriller": 53,
    "war": 10752,
    "western": 37
  };

// etsitään elokuvia, rajapinta tarjosi lähinnä hakusanan sekä pari muuta parametria
router.get('/movie/search', async (req, res) => {
    const { query, page, year, language } = req.query;
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}&year=${year}&language=${language}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const movies = data.results.map(result => new MovieData(
        result.id,
        result.title,
        result.poster_path,
    )).filter(movie => movie.poster_path !== null);
      res.json(movies);
    } catch (error) {
      console.error('Virhe elokuvien hakemisessa:', error);
      res.status(500).json({ message: 'Virhe palvelimella' });
    }
  });
  
  // löydetään elokuvia esim. suosituimpien perusteella tai muita kivoja parametrejä käyttäen, ei taida varsinaisesti tukea "hakusanaa" eli searchia
  router.get('/movie/discover', async (req, res) => {
    const { sort_by, page, year, language } = req.query;

    const apiKey = process.env.TMDB_API_KEY;
    let genreId = '';

    if (req.query.genre === 'all') {
        genreId = '';
    } else {
        genreId = with_genres[req.query.genre]; 
    }

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=${sort_by}&page=${page}&primary_release_year=${year}&language=${language}`;

    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const movies = data.results.map(result => new MovieData(
        result.id,
        result.title,
        result.poster_path,
    )).filter(movie => movie.poster_path !== null);
      res.json(movies);
    } catch (error) {
      console.error('Virhe elokuvien löytämisessä:', error);
      res.status(500).json({ message: 'Virhe palvelimella' });
    }
  });

  // find by id -haun toteutus myöhemmin, eli kun on haettu elokuvat vaikka listaan, niin klikkaamalla elokuvaa saadaan elokuvan lisäsivu auki, infot pöytään

module.exports = router;