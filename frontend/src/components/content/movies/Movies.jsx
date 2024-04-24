import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movies.css';
import { getHeaders } from '@auth/token';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const Movies = ( {user}) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [moviePage, setMoviePage] = useState(1); 
  const [seriesPage, setSeriesPage] = useState(1); 
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [showTitles, setShowTitles] = useState(false);
  const [pageSize, setPageSize] = useState([]); 
  const totalPages = Math.ceil(movies.length / pageSize);
  const [showMovies, setShowMovies] = useState(true);
  const [showSeries, setShowSeries] = useState(false);
  const [adult, setAdult] = useState(false);
  const [showText, setShowText] = useState(true);
  const headers = getHeaders();

  useEffect(() => {

    if ( user !== null || user !== undefined ) {
    const fetchProfile = async () => {
        const profresponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`, { headers });
      
        setAdult(profresponse.data.adult);
      }
      fetchProfile();
    };
    
  }, [user]);

  useEffect(() => {
    searchMovies();
    searchSeries();
  }, [moviePage, seriesPage]);

  useEffect(() => {
    if (!showMovies && !showSeries) {
      setShowText(true);
    }
  }, [showMovies, showSeries]);

  const searchMovies = async () => {
    try {
      let response;
      if (query !== '') {
        response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/search`, {
        params: { query, genre, page: moviePage, year, adult }
      });
      } else {
        response = await axios.get(`${VITE_APP_BACKEND_URL}/movie/discover`, {
        params: { genre, sort_by: 'popularity.desc', page: moviePage, year, adult }
        });
      }
      setMovies(response.data);
    } catch (error) {
      console.error('Hakuvirhe elokuvissa:', error);
    }
  };
  
  const searchSeries = async () => {
    try {
      let response;
      if (query !== '') {
        response = await axios.get(`${VITE_APP_BACKEND_URL}/series/search`, {
        params: { query, genre, page: seriesPage, year, adult }
      });
      } else {
        response = await axios.get(`${VITE_APP_BACKEND_URL}/series/discover`, {
        params: { genre, sort_by: 'popularity.desc', page: seriesPage, year, adult }
        });
      }
      setSeries(response.data);
    } catch (error) {
      console.error('Hakuvirhe sarjoissa:', error);
    }
  };

  const handleMoviePageChange = (action) => {
    if (action === 'prev') {
      setMoviePage((page) => Math.max(parseInt(page, 10) - 1, 1));
    } else {
      setMoviePage((page) => Math.max(parseInt(page, 10) + 1));
    }
  };

  const handleSeriesPageChange = (action) => {
    if (action === 'prev') {
      setSeriesPage((page) => Math.max(parseInt(page, 10) - 1, 1));
    } else {
      setSeriesPage((page) => Math.max(parseInt(page, 10) + 1));
    }
  };

  // setGenre ja setQuery nollaus:
  // laitoin nää siks, kun search ja discover kumoaa toisensa eli genreä ei huomioida jos on query annettu
  // tämä hidastaa hakuja, jos pitää tyhjentää toinen osio erikseen 
  const handleInputChange = (event) => {
    setGenre('');
    setQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setQuery('');
    setMoviePage(1);
    setSeriesPage(1);
    setGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSearch = () => {
    setMovies([]);
    setSeries([]);
    setShowTitles(true);
    searchMovies();
    searchSeries();
  };

  const toggleMovies = () => {
    setShowMovies(true);
    setSeriesPage(1);
    setMoviePage(1);
    setShowSeries(false);
  };

  const toggleSeries = () => {
    setShowSeries(true);
    setMoviePage(1);
    setSeriesPage(1);
    setShowMovies(false);
  };


  const handleNullify = () => {
    setQuery('');
    setGenre('');
    setYear('');
    setMovies([]);
    setSeries([]);
    setShowTitles(false);
    setMoviePage(1);
    setSeriesPage(1);
    setShowMovies(false);
    setShowSeries(false);
  };

  const scrollToTop = () => {
    scroll.scrollTo(600)({
      duration: 1700,
      smooth: 'easeInOutQuint', 
    });
  };
  
  return (
    <>
    <div className="content">
      <h2>Leffa- ja sarjahaku</h2>

      <div className="group-view-long">

        <div className="flex">

          <div className="pdd-right">
            <b>Hae nimellä</b>
            <div>
              <input
                className="field longInput"
                type="text"
                placeholder="..."
                value={query}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="pdd-right">
            <b>Valitse genre:</b><br />
            <select value={genre} onChange={handleGenreChange}>
              <option value="">...</option>
              <option value="all">Kaikki</option>
              <option value="action">Toiminta</option>
              <option value="adventure">Seikkailu</option>
              <option value="romance">Romantiikka</option>
              <option value="comedy">Komedia</option>
              <option value="drama">Draama</option>
              <option value="soap">Saippuasarjat</option>
              <option value="western">Länkkäri</option>
              <option value="thriller">Jännitys</option>
              <option value="science fiction">Scifi</option>
              <option value="fantasy">Fantasia</option>
              <option value="documentary">Dokumentti</option>
              <option value="animation">Animaatio</option>
              <option value="family">Perhe</option>
              <option value="kids">Lapsille</option>
              <option value="history">Historia</option>
              <option value="war">Sota ja politiikka</option>
              <option value="mystery">Mysteeri</option>
              <option value="crime">Rikos</option>
              <option value="horror">Kauhu</option>
              <option value="music">Musiikki</option>
              <option value="tv">Sarjoihin perustuvat</option>
              <option value="news">Uutiset</option>
              <option value="talk">Keskustelu</option>
              <option value="reality">TosiTV</option>
            </select>
          </div>

          <div className="pdd-right">
            <b>Vuosi:</b><br />
            <input
              className="field shortInput"
              type="number"
              placeholder="..."
              value={year}
              onChange={handleYearChange}
            />
          </div>
        </div>

        {showText && (
             <div> 
              <span className='userinfo'>Valitse tyyppi:</span>
              {showMovies && (
                <span className='userinfo'>elokuvat</span>
              )}
              {showSeries && (
                <span className='userinfo'>sarjat</span>
              )}
             </div>
            )} 

        <div className='toggleLinks'>
          <h2 className='activeSearch' onClick={toggleMovies}><span className='emoji uni01'></span> Leffat </h2>&nbsp;&nbsp;&nbsp;
          <h2 className='activeSearch' onClick={toggleSeries}><span className='emoji justMargin'>📺</span> Sarjat </h2>
        </div>
        <div>
          <button className="basicbutton" onClick={handleSearch}>Hae !</button> &nbsp;
          <button className="basicbutton" onClick={handleNullify}>Tyhjennä</button>
        </div>

      </div>

      <div className="group-view">
        <span className='movieinfo'>Löydä elokuvia ja sarjoja eri parametreillä tai etsi nimellä.</span><br/>
        <span className='movieinfo'>Valitse yltä haluatko nähdä leffoja vai sarjoja.</span>
      </div>

    {/* Näytetään sekä elokuvat että sarjat , allekain */}
    {(showMovies && movies !== null && movies.length > 0) && (
        <div>
        <div className="resultsTitle">
        <button onClick={() => handleMoviePageChange('prev')} className='bigArrow'>{'⯇'}</button>
            <h2>Elokuvat</h2>
            <button onClick={() => handleMoviePageChange('next')} className='bigArrow'>{'⯈'}</button>      
          </div>
          <div className="resultsTitle">
            <input
              id="moviesHideable"
              className="field shortInput"
              type="number"
              placeholder="..."
              value={moviePage}
              onChange={(event) => {
              setMoviePage(event.target.value);
              }}
            />
          </div>
        <div className="movie-container">
        {movies.map((result) => (
          <div key={result.id} className="movie-item">
            <Link to={`/movie/${result.id}`}>
              <img src={result.poster_path} alt={result.title} />
              <div className="headoverview">
                <div><h3>{result.title}</h3></div>
                <div>{result.overview.length > 200 ? `${result.overview.substring(0, 200)}...` : result.overview}</div>
              </div>
            </Link>
            
              <div className='movie-mini-item'><Link to={`/movie/${result.id}`}>{result.title}</Link></div>
            
          </div>
        ))}

        </div>
        <div className="resultsTitle">
        <button onClick={() => { handleMoviePageChange('prev'); scrollToTop(); }}className='bigArrow'>{'⯇'}</button>
            <h2>Elokuvat</h2>
            <button onClick={() =>{ handleMoviePageChange('next'); scrollToTop(); }} className='bigArrow'>{'⯈'}</button>      
          </div>
        </div>
        )}
        {(showSeries && series !== null && movies.length > 0) && (
        <div>
          <div className="resultsTitle">
            <button onClick={() => handleSeriesPageChange('prev')} className='bigArrow'>{'⯇'}</button>
            <h2>Sarjat</h2>
            <button onClick={() => handleSeriesPageChange('next')} className='bigArrow'>{'⯈'}</button>
          </div>
          <div className="resultsTitle">
            <input
              id="seriesHideable"
              className="field shortInput"
              type="number"
              placeholder="..."
              value={seriesPage}
              onChange={(event) => {
              setSeriesPage(event.target.value);
              }}
            />
          </div>
        <div className="movie-container">  
        {series.map((result) => (
        <div key={result.id} className="movie-item">
          <Link to={`/series/${result.id}`}>
            <img src={result.poster_path} alt={result.title} />
            <div className="headoverview">
              <div><h3>{result.title}</h3></div>
              <div>{result.overview.length > 200 ? `${result.overview.substring(0, 200)}...` : result.overview}</div>
            </div>
          </Link>
    
          <div className='movie-mini-item'><Link to={`/series/${result.id}`}>{result.title}</Link></div>
            
        </div>
        ))}
        </div>
        <div className="resultsTitle">
            <button onClick={() => { handleSeriesPageChange('prev'); scrollToTop(); }} className='bigArrow'>{'⯇'}</button>
            <h2>Sarjat</h2>
            <button onClick={() => { handleSeriesPageChange('next'); scrollToTop(); }} className='bigArrow'>{'⯈'}</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default Movies;
