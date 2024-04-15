import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getHeaders } from '../../auth/api';
import axios from 'axios';
import './user.css';
const { VITE_APP_BACKEND_URL } = import.meta.env;

export default function MyAccount({ user }) {

    //console.log(user);
    if (user === null) {
        return <Navigate to="/" />
    }

    const [visibility, setVisibility] = useState('');
    const [formData, setFormData] = useState({
        profilename: '',
        email: ''
    });

    const profilename = user.user;
    const headers = getHeaders();

    const [deleteClicked, setDeleteClicked] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${profilename}`, { headers });

                const { is_private, email } = response.data;
                setVisibility({ is_private });
                setFormData({ profilename, email });
            } catch (error) {
                console.error('Hakuvirhe:', error);
            }
        };

        fetchProfileData();
    }, [profilename]);

    const handleVisibility = async (e) => {
        try {
            const data = {
                is_private: !visibility.is_private
            };
            await axios.put(`${VITE_APP_BACKEND_URL}/profile/visibility`, data, { headers });

            setVisibility({ is_private: !visibility.is_private });
        } catch (error) {
            console.error('Virhe muutettaessa profiilin näkyvyyttä:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const usernameChanged = formData.profilename !== profilename;

            if (!usernameChanged) {
                await axios.put(VITE_APP_BACKEND_URL + `/profile/nameandemail`, formData, { headers });
                alert('Tiedot päivitetty');
            } else {
                await axios.put(VITE_APP_BACKEND_URL + `/profile/nameandemail`, formData, { headers });
                alert('Käyttäjätunnusta päivitetty. Sinut kirjataan ulos.');
                localStorage.removeItem('user');
                sessionStorage.removeItem('token');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Hakuvirhe:', error);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleDelete = async () => {
        try {
            await axios.delete(VITE_APP_BACKEND_URL + `/profile/`, { headers });

            alert('Käyttäjätili poistettu, sinut ohjataan etusivulle.');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            window.location.href = '/';

        } catch (error) {
            console.error('Virhe poistettaessa käyttäjää:', error);
        }
    };

    const handleDeleteClick = () => {
        setDeleteClicked(true);
    };

    const handleCancelDelete = () => {
        setDeleteClicked(false);
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
                    <p>Profiilisi on nyt: {visibility.is_private ? 'yksityinen' : 'julkinen'}</p>
                    <button className="basicbutton" onClick={handleVisibility}>Vaihda tilin näkyvyyttä</button>

                    <h2>Vaihda salasana</h2>

                    <p>Textholder</p>

                    <h2>Muuta sähköpostia ja käyttäjänimeä</h2>
                    <div className='form-view'>
                        <form onSubmit={handleSubmit}>
                            <b>Käyttäjänimi</b> <br />
                            <input className="input" type="text" name="profilename" value={formData.profilename || ''} onChange={handleChange} /><br />
                            <b>Sähköposti</b><br />
                            <input className="input" type='text' name="email" value={formData.email || ''} onChange={handleChange} /><br /><br />
                            <button className="basicbutton" type="submit">Tallenna muutokset</button>
                        </form>

                    </div>

                    <h2>Poista käyttäjätili</h2>
                    {!deleteClicked ? (
                        <button className="basicbutton" onClick={handleDeleteClick}>Poista tili</button>
                    ) : (
                        <div>
                            <p>Haluatko varmasti poistaa käyttäjätilisi?</p>
                            <button className="basicbutton" onClick={handleDelete}>Kyllä, poista tilini</button>
                            <button className="basicbutton" onClick={handleCancelDelete}>Peruuta</button>
                        </div>
                    )}
                    <p>Jos poistat tilin, niin kaikki tilisi tiedot poistetaan pysyvästi. </p>
                </div>
            </div>
        </div>

    );
};

