import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getHeaders } from '@auth/token';
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

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

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
            console.log(headers);
            const data = {
                is_private: !visibility.is_private
            };
            await axios.put(`${VITE_APP_BACKEND_URL}/profile/visibility`, data, { headers });

            setVisibility({ is_private: !visibility.is_private });
        } catch (error) {
            console.error('Virhe muutettaessa profiilin näkyvyyttä:', error);
        }
    };

    const handlePassword = async (e) => {
        e.preventDefault();
        if (password1 == password2 && password1.length > 0) {
            try {
                await axios.put(VITE_APP_BACKEND_URL + `/auth/password`, { password: password1 }, { headers });
                alert('Salasana vaihdettu');
            } catch (error) {
                console.error('Virhe vaihdettaessa salasanaa:', error);
            }
        } else {
            alert('Salasanat eivät täsmää tai kentät ovat tyhjiä. Yritä uudelleen.');
        }
        setPassword1('');
        setPassword2('');
    };

    const handlePasswordChange = (e) => {
        if (e.target.name === 'password1') {
            setPassword1(e.target.value);
        } else {
            setPassword2(e.target.value);
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

    const handlePartialDelete = async () => {
        try {
            await axios.put(`${VITE_APP_BACKEND_URL}/reviews/toanon`, {}, { headers });
            handleDelete();
            alert('Käyttäjätilin arvostelut muutettu anonyymeiksi.');
        } catch (error) {
            console.error('Virhe muutettaessa arvosteluja:', error);
        }
    }

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
                    <div className="form-view">
                        <b>Profiilisi on nyt: {visibility.is_private ? 'yksityinen' : 'julkinen'}</b> <br />
                        <button className="basicbutton" onClick={handleVisibility}>Vaihda tilin näkyvyyttä</button>
                    </div>

                    <h2>Vaihda salasana</h2>
                    <div className='form-view'>
                        <b>Anna uusi salasana</b> <br />
                        <input className="input" type="password" name="password1" value={password1} onChange={handlePasswordChange} /><br />
                        <b>Salasana uudelleen</b> <br />
                        <input className="input" type="password" name="password2" value={password2} onChange={handlePasswordChange} /><br />
                        <button className="basicbutton" onClick={handlePassword}>Vaihda salasana</button>
                    </div>

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
                    <div className="form-view">
                        {!deleteClicked ? (
                            <button className="basicbutton" onClick={handleDeleteClick}>Poista tili</button>
                        ) : (
                            <div>
                                <b>Haluatko varmasti poistaa käyttäjätilisi?</b> <br />
                                <button className="basicbutton" onClick={handleDelete}>Kyllä, poista kaikki tietoni</button>
                                <button className="basicbutton" onClick={handlePartialDelete}>Kyllä, säästä arvosteluni</button>
                                <button className="basicbutton" onClick={handleCancelDelete}>En, peruuta</button>
                            </div>
                        )}
                        <p>Jos poistat tilin, niin kaikki tilisi tiedot poistetaan pysyvästi. Voit myös jättää tekemäsi arvostelut anonyymin nimimerkin alle.</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

