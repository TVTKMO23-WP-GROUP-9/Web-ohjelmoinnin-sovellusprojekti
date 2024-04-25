import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Faq.css';

const { VITE_APP_BACKEND_URL } = import.meta.env;

const Faq = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [randomBackdrop, setRandomBackdrop] = useState('');

    const toggleContent = (index) => {
        setSelectedQuestion(index === selectedQuestion ? null : index);
    };

    useEffect(() => {
        const getRandomBackdrop = async () => {
          try {
            const response = await axios.get(`${VITE_APP_BACKEND_URL}/movierandom`);
            setRandomBackdrop(response.data.backdropUrl);
          } catch (error) {
            console.error('Virhe satunnaisen taustakuvan hakemisessa:', error);
          }
        };

        getRandomBackdrop(); 

        const intervalId = setInterval(getRandomBackdrop, 4500); 

        return () => clearInterval(intervalId); 
    }, []);
    
    return (
    <div id="backdrop" style={{ backgroundImage: `url(${randomBackdrop})`, backgroundSize: 'cover' }}>
              <div className="content">

            <div className='moviemain'>
        <div className="faq">
            <h1>FAQ</h1>
            <h2>Yleistä</h2>
            <div>
                <p>Leffaysi, tutummin L9 on Oulun ammattikorkeakoulun tietotekniikan opiskelijoiden tuotos toteutuksessa web-ohjelmoinnin sovellusprojekti (Q2/2024).</p> 
                <p>Nimi juontaa projektiaiheen ja -ryhmänumeron yhdistelmästä.</p>
                <p>L9 on kokonaisvaltainen palvelu käyttäjälle, joka haluaa saada kattavaa tietoa elokuvista ja sarjoista yhdestä paikasta.</p>
                <p> Yhteisöllisyys on sivustolla merkittävässä roolissa. Sivustolla voi luoda ryhmiä, joissa käyttäjät voivat jakaa ja lukea arvosteluja elokuvista ja sarjoista. Jäsenet voivat kirjoittaa ryhmäsivulle viestejä ja jakaa näytösaikoja muille jäsenille.  
                Sovelluksen käyttämät tiedot elokuvista ja sarjoista haetaan The Movie Databasen tietokannasta rajapinta-avaimella. Tietoa Finnkinon tarjonnasta käytetään heidän jakamansa datan avulla. </p>

            </div>

            <h2>Saavutettavuus</h2>
            <div>
                <p>Sivusto ja sen osat on tehty mukautuviksi, joten esimerkiksi sivuston asettelut ja tyylit muuntuvat näytön koon muuttuessa. Samalla se on toteutettu saavutettavaksi ja käyttäjäystävälliseksi.</p>
                <p> Käyttäjän on esimerkiksi mahdollista valita sivustolle teema, joka asettaa sivuston värimaailman tummaksi tai vaaleaksi riittävillä kontrastieroilla. Kuvat ja sivulinkit on toteutettu siten, että ne voi muuttaa puheeksi helppokäyttötoiminnoilla.  </p>
            </div>

            </div>

        <div className="faq">
            <h2>Teknologiat</h2>
            <div>
                <b>Tietokanta</b>
                <p>Sovelluksessa on käytössä PostgreSQL-tietokanta, johon tallennetaan käyttäjän tiedot, oikeudet, arvostelut, suosikit ja ryhmät. Tietokanta on viety Render-pilvipalveluntarjoajalle.</p>
                <b>Käyttöliittymä</b>
                <p>Palvelun käyttöliittymä on toteutettu käyttäen nykyaikaisia web-tekniikoita, kuten React-kirjastoa sekä Vite-kehitystyökalua. Reactin avulla saadaan luotua tehokas ja dynaaminen käyttöliittymä. Vite puolestaan tarjoaa kehittäjille nopean kehitysympäristön ja paketinhallintajärjestelmän. Nämä helpottavat käyttöliittymäkoodin kirjoittamista, testaamista ja optimointia.  </p>
                <p>Sovelluksen käyttämät tiedot elokuvista ja sarjoista haetaan The Movie Databasen tietokannasta rajapinta-avaimella. Tietoa Finnkinon tarjonnasta käytetään heidän jakamansa datan avulla.</p>
                <b>Palvelin</b>
                <p>Sovelluksen palvelin mahdollistaa tietokannan käytön sivustolla sekä ohjaa tietokantakyselyt ja sieltä palautuvat vastaukset oikeille paikoilleen. Palvelin vastaa myös tietoturvasta ja säilyttää arkaluontoiset tiedot, kuten rajapinta-avaimet ja salasanat käyttäjän ulottumattomissa. Palvelin tarjoaa REST-rajapinnan käyttöliittymälle, jolla se voi hakea dataa tietokannasta. Rajapinta itsessään sisältää lukuisia päätepisteitä eri toiminnallisuuksiin. </p>
                <b>Tietoturva</b>
                <p>Tietoturvan takaamiseksi on käytetty Cross-origin Resource Sharing (CORS), JSON Web Token (JWT), Middleware sekä Bcrypt -menetelmiä. Näillä teknologioilla voidaan varmentaa käyttäjän istuntojen oikeellisuutta (JWT) ja salata tietokantaan tallennettavat salasanat (Bcrypt). Middlewaren avulla suojataan haluttuja päätepisteitä, jolla voidaan estää luvattomat tietokannan toiminnot. CORS puolestaan mahdollistaa tiettyjen verkkosivujen sallimisen ja estämisen tarpeen mukaan.  </p>           
            </div>
            </div>
        </div>

        </div>
    </div>

    );
};

export default Faq;
