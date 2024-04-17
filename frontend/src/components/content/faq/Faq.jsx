import React, { useState } from 'react';
import './Faq.css';

const Faq = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const toggleContent = (index) => {
        setSelectedQuestion(index === selectedQuestion ? null : index);
    };

    return (
        <div className="faq">
            <h2 className={`faq-heading ${selectedQuestion === 1 ? 'open' : ''}`} onClick={() => toggleContent(1)}>Yleistä</h2>
            <div className={`faq-content ${selectedQuestion === 1 ? 'open' : ''}`}>
                <p>Leffaysi on Oulun ammattikorkeakoulun tietotekniikan opiskelijoiden tuotos toteutuksessa web-ohjelmoinnin sovellusprojekti (Q2/2024).</p> 
                <p>Elokuvasivusto on kokonaisvaltainen palvelu käyttäjälle, joka haluaa saada kattavaa tietoa elokuvista ja sarjoista yhdestä paikasta.</p>
                <p> Yhteisöllisyys on sivustolla merkittävässä roolissa. Sivustolla voi luoda ryhmiä, joissa käyttäjät voivat jakaa ja lukea arvosteluja elokuvista ja sarjoista. Jäsenet voivat kirjoittaa ryhmäsivulle viestejä ja jakaa näytösaikoja muille jäsenille.  
                Sovelluksen käyttämät tiedot elokuvista ja sarjoista haetaan The Movie Databasen tietokannasta rajapinta-avaimella. Tietoa Finnkinon tarjonnasta käytetään heidän jakamansa datan avulla. 
 </p>
            </div>
            
            <h2 className={`faq-heading ${selectedQuestion === 2 ? 'open' : ''}`} onClick={() => toggleContent(2)}>Nimen syntytarina</h2>
            <div className={`faq-content ${selectedQuestion === 2 ? 'open' : ''}`}>
                <p>Projektiryhmämme on aina kekseliäs, mutta kun uusien projektien nimeämiseen ei löytynyt sopivaa ideaa, he tunsivat pienen epätoivon hiipivän joukkoon. He olivat koluttaneet läpi kaikki mahdolliset nimet ja tuntuivat olevan umpikujassa. Mutta juuri silloin, kun toivo alkoi hiipua, heidän luovuutensa syttyi.
                He alkoivat heitellä ideoita ilmaan, yrittäen yhdistellä erilaisia sanoja ja käsitteitä, kunnes yksi heistä huudahti: "Miksi emme yhdistäisi elokuvan nimeä ja projektin numeroa? Se voisi toimia!" Ja niin syntyi "Projekti Leffaysi" - projekti ja numero yhdistettynä.</p> 
                <p> Se oli juuri sitä, mitä he olivat kaivanneet: ripaus huumoria ja ripaus nerokkuutta.
                Pian he alkoivat käyttää projektista leikkisästi nimitystä "L9", mikä tuntui paljon helpommalta ja rennommalta. </p>
            </div>

            <h2 className={`faq-heading ${selectedQuestion === 3 ? 'open' : ''}`} onClick={() => toggleContent(3)}>Käyttäjätilin luominen</h2>
            <div className={`faq-content ${selectedQuestion === 3 ? 'open' : ''}`}>
                <p>Tarvitsen käyttäjätunnustasi varten nimimerkin sekä sähköpostiosoitteen. Voit luoda käyttäjän klikkaamalla "Kirjautuminen" jonka jälkeen valitset "Rekisteröidy".
                </p>
            </div>
            
            <h2 className={`faq-heading ${selectedQuestion === 4 ? 'open' : ''}`} onClick={() => toggleContent(4)}>Ryhmään liittyminen</h2>
            <div className={`faq-content ${selectedQuestion === 4 ? 'open' : ''}`}>
                <p>Tekstisisältö tähän, jossa kerrotaan ohjeet ryhmään liittymiseen.</p>
            </div>
            <h2 className={`faq-heading ${selectedQuestion === 5 ? 'open' : ''}`} onClick={() => toggleContent(5)}>Saavutettavuus</h2>
            <div className={`faq-content ${selectedQuestion === 5 ? 'open' : ''}`}>
                <p>Sivusto ja sen osat on tehty mukautuviksi, joten esimerkiksi sivuston asettelut ja tyylit mukautuvat näytön koon muuttuessa. Samalla se on toteutettu saavutettavaksi ja käyttäjäystävälliseksi.</p>
                <p> Käyttäjän on esimerkiksi mahdollista valita sivustolle teema, joka asettaa sivuston värimaailman tummaksi tai vaaleaksi riittävillä kontrastieroilla. Kuvat ja sivulinkit on toteutettu siten, että ne voi muuttaa puheeksi helppokäyttötoiminnoilla.  </p>
            </div>
            <h2 className={`faq-heading ${selectedQuestion === 6 ? 'open' : ''}`} onClick={() => toggleContent(6)}>Teknologiat</h2>
            <div className={`faq-content ${selectedQuestion === 6 ? 'open' : ''}`}>
                <h3 className="sub-heading">Tietokanta</h3>
                <p>Sovelluksessa on käytössä PostgreSQL-tietokanta, johon tallennetaan käyttäjän tiedot, oikeudet, arvostelut, suosikit ja ryhmät. Tietokanta on viety Render-pilvipalveluntarjoajalle.</p>
                <h3 className="sub-heading">Käyttöliittymä</h3>
                <p>Palvelun käyttöliittymä on toteutettu käyttäen nykyaikaisia web-tekniikoita, kuten React-kirjastoa sekä Vite-kehitystyökalua. Reactin avulla saadaan luotua tehokas ja dynaaminen käyttöliittymä. Vite puolestaan tarjoaa kehittäjille nopean kehitysympäristön ja paketinhallintajärjestelmän. Nämä helpottavat käyttöliittymäkoodin kirjoittamista, testaamista ja optimointia.  </p>
                <p>Sovelluksen käyttämät tiedot elokuvista ja sarjoista haetaan The Movie Databasen tietokannasta rajapinta-avaimella. Tietoa Finnkinon tarjonnasta käytetään heidän jakamansa datan avulla.</p>
                <h3 className="sub-heading">Palvelin</h3>
                <p>Sovelluksen palvelin mahdollistaa tietokannan käytön sivustolla sekä ohjaa tietokantakyselyt ja sieltä palautuvat vastaukset oikeille paikoilleen. Palvelin vastaa myös tietoturvasta ja säilyttää arkaluontoiset tiedot, kuten rajapinta-avaimet ja salasanat käyttäjän ulottumattomissa. Palvelin tarjoaa REST-rajapinnan käyttöliittymälle, jolla se voi hakea dataa tietokannasta. Rajapinta itsessään sisältää lukuisia päätepisteitä eri toiminnallisuuksiin. </p>
                <h3 className="sub-heading">Tietoturva</h3>
                <p>Tietoturvan takaamiseksi on käytetty Cross-origin Resource Sharing (CORS), JSON Web Token (JWT), Middleware sekä Bcrypt -menetelmiä. Näillä teknologioilla voidaan varmentaa käyttäjän istuntojen oikeellisuutta (JWT) ja salata tietokantaan tallennettavat salasanat (Bcrypt). Middlewaren avulla suojataan haluttuja päätepisteitä, jolla voidaan estää luvattomat tietokannan toiminnot. CORS puolestaan mahdollistaa tiettyjen verkkosivujen sallimisen ja estämisen tarpeen mukaan.  </p>           
            </div>
        </div>

    );
};

export default Faq;
