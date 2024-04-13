const axios = require('axios');
const movieModel = require('./movieModel');

async function searchMedia(req, res) {
    const { query, page, year, language } = req.query;
    const apiKey = process.env.TMDB_API_KEY;

    try {
        // Haetaan sekä elokuvat että tv-sarjat samalla haulla
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}&year=${year}&language=${language}`);
        const seriesResponse = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=${page}&year=${year}&language=${language}`);

        // Käsitellään hakutulokset ja yhdistetään ne yhdeksi listaksi
        const movieData = movieResponse.data.results.map(result => new movieModel(
            result.id,
            result.title,
            result.poster_path,
            result.overview
        )).filter(movie => movie.poster_path !== null);

        const seriesData = seriesResponse.data.results.map(result => new movieModel(
            result.id,
            result.name,
            result.poster_path,
            result.overview
        )).filter(tv => tv.poster_path !== null);

        // Yhdistetään elokuvat ja tv-sarjat yhteen listaan
        const mediaData = [...movieData, ...seriesData];

        res.json(mediaData);
    } catch (error) {
        console.error('Virhe medioiden hakemisessa:', error);
        res.status(500).json({ message: 'Virhe palvelimella' });
    }
}

module.exports = {
    searchMedia,
};