import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Faq.css';
import l9 from './leffasovellus-r9.png';
import fk from './finnkino.png';
import tmdb from './tmdb.svg';


const { VITE_APP_BACKEND_URL } = import.meta.env;

const Intro = () => {
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

        const intervalId = setInterval(getRandomBackdrop, 8000); 

        return () => clearInterval(intervalId); 
    }, []);
    
    return (
    <div id="backdrop" style={{ backgroundImage: `url(${randomBackdrop})`, backgroundSize: 'cover' }}>
              <div className="content">

            <div className='moviemain intromain'>
            <div className="faq">

                <h4>Leffaysi </h4>
                
            <div className="introRoll">
                <img src={l9} alt="L9" /> 
                <img src={fk} className='resize' alt="Finnkino" /> 
                <img src={tmdb} className='resize200' alt="TMDB" /> 
            </div>

            </div>

            <div className="faq">

            <h2 className={`introHeading ${selectedQuestion === 1 ? 'open' : ''}`} onClick={() => toggleContent(1)}>Yleistä</h2>
            <div className={`introContent ${selectedQuestion === 1 ? 'open' : ''}`}>
                <p>Oulun ammattikorkeakoulun tietotekniikan opiskelijoiden tuotos toteutuksessa <b>web-ohjelmoinnin sovellusprojekti</b> (Q2/2024).</p> 
                <p>Elokuvasivusto on kokonaisvaltainen palvelu käyttäjälle, joka haluaa saada kattavaa tietoa elokuvista ja sarjoista yhdestä paikasta.</p>
            </div>

            <h2 className={`introHeading ${selectedQuestion === 2 ? 'open' : ''}`} onClick={() => toggleContent(2)}>Tekijät</h2>
            <div className={`introContent ${selectedQuestion === 2 ? 'open' : ''}`}>
                <p>Hannu Karjalainen <br />
                Tapio Kylmämaa <br />
                Jimi Jakola <br />
                Matti Nieminen <br />
                Rebecca Soisenniemi</p>

            </div>
            <h2 className={`introHeading ${selectedQuestion === 3 ? 'open' : ''}`} onClick={() => toggleContent(3)}>Teknologiat</h2>
            <div className={`introContent ${selectedQuestion === 3 ? 'open' : ''}`}>
                <p>
                Tietokanta:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PostgreSql<br />
                Käyttöliittymä:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; React, Vite<br />
                Palvelin:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node.js<br />
                Tietoturva:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CORS, JWT, Middleware, Bcrypt<br />
                Testaus:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; yksikkötestit Mocha Chai, end-2-end Robot Framework<br />
                Konttiteknologia:&nbsp;&nbsp;&nbsp; Docker<br />
                Arkkitehtuuri:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; modulaarinen, separation into components<br />
                </p>
            </div>

            </div>
        </div>

        </div>
    </div>

    );
};

export default Intro;
