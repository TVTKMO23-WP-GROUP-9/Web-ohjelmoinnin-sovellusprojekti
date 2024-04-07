import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './group.css';

export default function GroupAccount () {

    
  return (

    <div className="content">

        <div id="accountinfo">

            <div className="section2">

            <h2>Olet kirjautunut käyttäjänä:</h2>
            <h1></h1>
            <hr/>

                <p>
                Siirry <br/><br />
                </p>

                <p>Omasta profiilista löydät omat tietosi ja pääset hallinnoimaan niitä. <br/>
                <span className="userinfo">Profiilikuva  | Esittelyteskti | Suosikkilista | Leffa-arvostelut | Ryhmät</span> <br />
                </p>
            </div>

            <div className="section3">
            <h1>Tilin hallinta</h1>

                <h2>Vaihda salasana</h2>

                <p>Textholder</p>

                <h2>Muuta sähköpostia (tai käyttäjänimeä)</h2>

                <p>Textholder</p>

                <h2>Poista tili</h2>

                <p>Jos poistat tilin, niin kaikki tilisi tiedot poistetaan pysyvästi. <br/>
                Huomioithan kuitenkin, että: <br/>
                Kirjoittamasi arvostelut jäävät järjestelmään anonyymeiksi arvosteluiksi. </p>
            </div>
        </div>
        
    </div>

  );
};

