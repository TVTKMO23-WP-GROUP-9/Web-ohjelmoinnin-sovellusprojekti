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

  useEffect(() => {
    search();
  }, [page]); 

  const search = async () => {
    try {
      let response;
      if (query !== '') {
        response = await axios.get('http://localhost:3001/movie/search', {
          params: {
            query: query,
            page: page,
            year: year
          }
        });
      } else {
        response = await axios.get('http://localhost:3001/movie/discover', {
          params: {
            genre: genre,
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
      }
      console.log(response.data); 
      setMovies(response.data); 
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
                <option value="scifi">Scifi</option>
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
                <b>Sivunumero:</b><br/>
                <input
                  className="field shortInput"
                  type="number" 
                  placeholder="..."
                  value={page}
                  onChange={handlePageChange}
                />
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
        {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <Link to={`/movie/${movie.id}`}>
          <img src={movie.poster_path} alt={movie.title} />
          </Link>
        </div>
        ))}
    </div>
    </>
  );
};

export default Movies;