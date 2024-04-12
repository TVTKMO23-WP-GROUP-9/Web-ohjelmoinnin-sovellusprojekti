// Lisää tv-sarjojen hakutoiminto
async function searchTvShows(req, res) {
    const { query, page, year, language } = req.query;
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=${page}&year=${year}&language=${language}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const tvShows = data.results.map(result => new tvShowModel(
            result.id,
            result.name,
            result.poster_path,
            result.overview
        )).filter(tvShow => tvShow.poster_path !== null);
        res.json(tvShows);
    } catch (error) {
        console.error('Virhe tv-sarjojen hakemisessa:', error);
        res.status(500).json({ message: 'Virhe palvelimella' });
    }
}

// Etsi tv-sarjoja erilaisilla parametreilla
async function discoverTvShows(req, res) {
    const { sort_by, page, year, language, genre } = req.query;
    const apiKey = process.env.TMDB_API_KEY;
    let genreId = '';

    if (genre === 'all' || genre === undefined) {
        genreId = '';
    } else {
        genreId = with_genres[genre];
    }

    paramYear = setUndefinedToEmptyStrings(year);
    paramLanguage = setUndefinedToEmptyStrings(language);
    paramPage = setUndefinedToEmptyStrings(page);
    paramSort_by = setUndefinedToEmptyStrings(sort_by);

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&sort_by=${paramSort_by}&page=${paramPage}&first_air_date_year=${paramYear}&language=${paramLanguage}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const tvShows = data.results.map(result => new tvShowModel(
            result.id,
            result.name,
            result.poster_path,
            result.overview
        )).filter(tvShow => tvShow.poster_path !== null);
        res.json(tvShows);
    } catch (error) {
        console.error('Virhe tv-sarjojen löytämisessä:', error);
        res.status(500).json({ message: 'Virhe palvelimella' });
    }
}

// Lisää tv-sarjan haku ID:n perusteella
async function getTvShowById(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const tvShowId = req.params.id;
    const url = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const tvShowData = response.data;
        res.json(tvShowData);
    } catch (error) {
        console.error('Virhe tv-sarjan hakemisessa:', error);
        res.status(500).json({ message: 'Virhe palvelimella' });
    }
}

// Lisää tv-sarjan saatavuuden hakeminen ID:n perusteella
async function getTvShowProvidersbyId(req, res) {
    const apiKey = process.env.TMDB_API_KEY;
    const tvShowId = req.params.id;
    const url = `https://api.themoviedb.org/3/tv/${tvShowId}/watch/providers?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const tvShowData = response.data;

        // Haetaan haluttu maakoodi, esim. FI (Suomi)
        const countryCode = "FI";

        // Tarkistetaan, onko maakoodi saatavilla vastauksessa
        if (tvShowData.results.hasOwnProperty(countryCode)) {
            // Jos koodi on saatavilla, palautetaan sen tiedot
            const countryData = tvShowData.results[countryCode];
            res.json(countryData);
        } else {
            // Jos koodia ei ole saatavilla, annetaan virheilmoitus
            res.status(404).json({ message: `Ei tietoja saatavilla maasta ${countryCode}` });
        }
    } catch (error) {
        console.error('Virhe tv-sarjan hakemisessa:', error);
        res.status(500).json({ message: 'Virhe palvelimella' });
    }
}

module.exports = {
    searchMovies,
    discoverMovies,
    getMovieById,
    getMovieProvidersbyId,
    searchTvShows,
    discoverTvShows,
    getTvShowById,
    getTvShowProvidersbyId
};
