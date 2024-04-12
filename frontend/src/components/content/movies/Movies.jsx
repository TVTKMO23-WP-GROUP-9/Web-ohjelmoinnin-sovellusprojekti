import React, { useState, useEffect } from 'react';
// frontendin juuressa: npm install axios --no-fund || npm install axios
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movies.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  

  useEffect(() => {
    search();
  }, [page]); 

  const search = async () => {
    try {
      let moviesResponse;
      let seriesResponse;
  
      if (query !== '') {
        moviesResponse = await axios.get(`http://localhost:3001/movie/search`, {
          params: {
            query: query,
            page: page,
            year: year
          }
        });
  
        seriesResponse = await axios.get(`http://localhost:3001/series/search`, {
          params: {
            query: query,
            page: page,
            year: year
          }
        });
      } else {
        moviesResponse = await axios.get(`http://localhost:3001/movie/discover`, {
          params: {
            genre: genre,
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
  
        seriesResponse = await axios.get(`http://localhost:3001/series/discover`, {
          params: {
            genre: genre,
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
      }
  
      const moviesData = moviesResponse.data;
      const seriesData = seriesResponse.data;
  
      setMovies(moviesData);
      setSeries(seriesData);
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };

  const handleInputChange = (event) => {
    setGenre('');
    setQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setQuery(''); 
    setGenre(event.target.value);
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSearch = () => {
    setMovies([]);
    setSeries([]);
    search();
  };

  return (
    <>
    <h2>Leffahaku</h2>

    <p className="info">Löydä elokuvia ja sarjoja eri parametreillä tai etsi nimellä. <br/> Annetaan enintään 20 hakutulosta per. sivu.</p>
    
    <div className="group-view">

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
                <b>Valitse genre:</b><br/>
                <select value={genre} onChange={handleGenreChange}>
                <option value="">...</option>
                <option value="all">Kaikki</option>
                <option value="action">Toiminta</option>
                <option value="comedy">Komedia</option>
                <option value="drama">Draama</option>
                <option value="horror">Kauhu</option>
                <option value="romance">Romantiikka</option>
                <option value="thriller">Jännitys</option>
                <option value="science fiction">Scifi</option>
                <option value="fantasy">Fantasia</option>
                <option value="documentary">Dokumentti</option>
                <option value="animation">Animaatio</option>
                <option value="family">Perhe</option>
                <option value="mystery">Mysteeri</option>
                <option value="crime">Rikos</option>
                <option value="adventure">Seikkailu</option>
                <option value="history">Historia</option>
                <option value="war">Sota</option>
                <option value="music">Musiikki</option>
                <option value="western">Lännenelokuva</option>
                <option value="tv">TV-sarja</option>
                </select>
            </div>

            <div className="pdd-right">
                <b>Vuosi:</b><br/>
                <input
                  className="field shortInput"
                  type="number" 
                  placeholder="..."
                  value={year}
                  onChange={handleYearChange}
                />
            </div>
        </div>
        <div>
            <button className="basicbutton" onClick={handleSearch}>Hae</button>
        </div>
    </div>

    <div className="movie-container">
        {/* Näytetään sekä elokuvat että sarjat yhdessä osassa */}
        {movies.map((result) => (
  <div key={result.id} className="movie-item">
    <Link to={`/movie/${result.id}`}>
      <img src={result.poster_path} alt={result.title} />
      <div className="headoverview">
        <div><h3>{result.title}</h3></div>
        <div>{result.overview.length > 200 ? `${result.overview.substring(0, 200)}...` : result.overview}</div>
      </div>
    </Link>
  </div>
))}
{series.map((result) => (
  <div key={result.id} className="movie-item">
    <Link to={`/series/${result.id}`}>
      <img src={result.poster_path} alt={result.title} />
      <div className="headoverview">
        <div><h3>{result.title}</h3></div>
        <div>{result.overview.length > 200 ? `${result.overview.substring(0, 200)}...` : result.overview}</div>
      </div>
    </Link>
  </div>
))}
          <div className="pdd-bottom">         
            <br/>
            <button onClick={() => setPage(Page => Math.max(Page - 1, 1))} className='show-more-button'>{'<'}</button>
            <input
              className="field shortInput"
              type="number" 
              placeholder="..."
              value={page}
              onChange={handlePageChange}
            />
            <button onClick={() => setPage(Page => Page + 1)} className='show-more-button'>{'>'}</button>
          </div>
      </div>
    </>
  );
};

export default Movies;