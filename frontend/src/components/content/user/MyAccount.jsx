import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './user.css';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { jwtToken } from '../../auth/authSignal';

export default function MyAccount({ user }) {

    console.log(user);
    if (user === null) {
        return <Navigate to="/" />
    }

    const handleDelete = async (e) => {
        try {
            const token = sessionStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            await axios.delete(VITE_APP_BACKEND_URL + `/profile/`, { headers });
            alert('Käyttäjätili poistettu');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            window.location.href = '/';

        } catch (error) {
            console.error('Virhe poistettaessa käyttäjää:', error);
        }
    };

    return (

        <div className="content">

            <div id="accountinfo">

                <div className="section2">

                    <h2>Olet kirjautunut käyttäjänä:</h2>
                    <h1>{user.user}</h1>
                    <hr />

                    <p>
                        Siirry <Link to={`/profile/${user.user}`}>profiiliin</Link> | tai <Link to={`/profile/${user.user}`} onClick={() => setEditMode(true)}>Muokkaa profiilia</Link> {/* Muokkaa profiilia -ei vielä avaa profiilimuokkausta sivua ladatessa*/} <br /><br />
                    </p>

                    <p>Omasta profiilista löydät omat tietosi ja pääset hallinnoimaan niitä. <br />
                        <span className="userinfo">Profiilikuva  | Esittelyteskti | Suosikkilista | Leffa-arvostelut | Ryhmät</span> <br />
                    </p>
                </div>

                <div className="section3">
                    <h1>Tilin hallinta</h1>

                    <h2>Profiilin näkyvyys</h2>

                    <p>Aseta profiili yksityiseksi tai julkiseksi tästä.</p>

                    <h2>Vaihda salasana</h2>

                    <p>Textholder</p>

                    <h2>Muuta sähköpostia ja käyttäjänimeä</h2>


                    <p>Textholder</p>

                    <h2>Poista käyttäjätili</h2>
                    <button className="basicbutton" onClick={handleDelete}>Poista tili</button>
                    <p>Jos poistat tilin, niin kaikki tilisi tiedot poistetaan pysyvästi. <br />
                        Huomioithan kuitenkin, että: <br />
                        Kirjoittamasi arvostelut jäävät järjestelmään anonyymeiksi arvosteluiksi. </p>
                </div>
            </div>

        </div>

    );
};

