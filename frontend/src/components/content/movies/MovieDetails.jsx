import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null); 
    const [providers, setProviders] = useState(null);

    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/movie/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Virhe elokuvan hakemisessa:', error);
        }
      };
    
      const fetchProviders = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/movie/provider/${id}`);
          setProviders(response.data);
        } catch (error) {
          console.error('Virhe palveluntarjoajien hakemisessa:', error);
          // Jos pyyntö epäonnistuu, asetetaan providers-tila tyhjään JSON-objektiin
          setProviders({});
        }
      };

      fetchMovie();
      
      // Asetetaan timeout fetchProviders-funktiolle 5 sekunniksi
      const timeoutId = setTimeout(fetchProviders, 100);
    
      // Palautetaan poisto-funktio, joka suoritetaan komponentin purkamisen yhteydessä
      return () => clearTimeout(timeoutId);
    }, [id]);


      return (
        <div id="backdrop" style={movie && { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover' }}>
          <div className="content">

            {movie && (
              <div id="backdropbg">
                <div className="moviemain">
                  <img className="posterimg" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />

                  <div className="movieinfo">
                    <hr />
                    <h2>{movie.title}</h2>
                    <p><b>Kuvaus:</b> {movie.overview}</p>
                    <p><b>Kesto:</b> {movie.runtime} min</p>
                    <p><b>Genre:</b> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><b>Julkaistu:</b> {movie.release_date}</p>
                    <p><b>Tuotantoyhtiöt:</b> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    <p><b>Kerännyt ääniä:</b> {movie.vote_count}</p>
                    <p><b>Äänten keskiarvo:</b> {movie.vote_average} / 10 </p>
                  

                   {providers && providers.flatrate && providers.rent && (
                    <table className='providers'>
                      <tbody>
                        <tr>
                        <td><h3>Katso</h3></td>
                        {providers.flatrate.map(provider => (
                          <td key={provider.provider_id}>
                            <a href={`https://www.themoviedb.org/movie/${movie.id}/watch`}><img src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
                          </td>
                        ))}
                        </tr>
                        <tr>
                        <td><h3>Vuokraa</h3></td>
                        {providers.rent.map(provider => (
                        <td key={provider.provider_id}>
                          <a href={`https://www.themoviedb.org/movie/${movie.id}/watch`}><img src={`https://image.tmdb.org/t/p/w185${provider.logo_path}`} alt={provider.provider_name} /></a>
                        </td>
                        ))}
                        </tr>
                        <tr>
                        <td colSpan="6">
                          <a href='https://www.justwatch.com/'>Saatavuus Suomessa JustWatch</a>
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="moviereviews">
            <h2>Viimeisimmät arvostelut</h2>

              <div className="reviewslisted">
                <b>Lähetetty:</b> 00.00.2024 <br/>
                <b>Käyttäjältä:</b> <i>Anonymous</i> <br/>
                <b>Arvio:</b> &#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä <br/>
                <b>Perustelut:</b> <br/>
                Esimerkkiarvostelu, tämä on placeholder vaikkapa. Ihan kiva leffa ois, jos katsoa ehtis. Kaikki aika katoaa nykyään johonkin. Epäoleelliseen? 
                Ehkä ei kuitenkaan. Annan silti runsaat viisi tähteä, koska voin. Koska tämähän oli vain.. esimerkki yhdestä arvostelusta?<br/><br/>
              </div>

              <div className="reviewslisted">
                <b>Lähetetty:</b> 00.00.2024 <br/>
                <b>Käyttäjältä:</b> <i>Anonymous</i> <br/>
                <b>Arvio:</b> &#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä <br/>
                <b>Perustelut:</b> <br/>
                Esimerkkiarvostelu, tämä on placeholder vaikkapa. Ihan kiva leffa ois, jos katsoa ehtis. Kaikki aika katoaa nykyään johonkin. Epäoleelliseen? 
                Ehkä ei kuitenkaan. Annan silti runsaat viisi tähteä, koska voin. Koska tämähän oli vain.. esimerkki yhdestä arvostelusta?<br/><br/>
              </div>

              <div className="reviewslisted">
                <b>Lähetetty:</b> 00.00.2024 <br/>
                <b>Käyttäjältä:</b> <i>Anonymous</i> <br/>
                <b>Arvio:</b> &#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä <br/>
                <b>Perustelut:</b> <br/>
                Esimerkkiarvostelu, tämä on placeholder vaikkapa. Ihan kiva leffa ois, jos katsoa ehtis. Kaikki aika katoaa nykyään johonkin. Epäoleelliseen? 
                Ehkä ei kuitenkaan. Annan silti runsaat viisi tähteä, koska voin. Koska tämähän oli vain.. esimerkki yhdestä arvostelusta?<br/><br/>
              </div>

              <div className="reviewslisted">
                <b>Lähetetty:</b> 00.00.2024 <br/>  
                <b>Käyttäjältä:</b> <i>Anonymous</i> <br/>
                <b>Arvio:</b> &#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä <br/>
                <b>Perustelut:</b> <br/>
                Esimerkkiarvostelu, tämä on placeholder vaikkapa. Ihan kiva leffa ois, jos katsoa ehtis. Kaikki aika katoaa nykyään johonkin. Epäoleelliseen? 
                Ehkä ei kuitenkaan. Annan silti runsaat viisi tähteä, koska voin. Koska tämähän oli vain.. esimerkki yhdestä arvostelusta?<br/><br/>
              </div>

              <div className="reviewslisted">
                <b>Lähetetty:</b> 00.00.2024 <br/>
                <b>Käyttäjältä:</b> <i>Anonymous</i> <br/>
                <b>Arvio:</b> &#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä <br/>
                <b>Perustelut:</b> <br/>
                Esimerkkiarvostelu, tämä on placeholder vaikkapa. Ihan kiva leffa ois, jos katsoa ehtis. Kaikki aika katoaa nykyään johonkin. Epäoleelliseen? 
                Ehkä ei kuitenkaan. Annan silti runsaat viisi tähteä, koska voin. Koska tämähän oli vain.. esimerkki yhdestä arvostelusta?<br/><br/>
              </div>

            </div>
              

            </div>
          )}
        </div>
      </div>
    );
};

export default MovieDetails;
