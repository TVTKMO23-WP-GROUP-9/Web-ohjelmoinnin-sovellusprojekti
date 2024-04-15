import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../auth/authSignal';
const { VITE_APP_BACKEND_URL } = import.meta.env;


export default function Login({ setUser, window, fullpage }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [formData, setFormData] = useState({
    profilename: null,
    email: null,
    password: null
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password
      });

      if (response.status === 200) {
        jwtToken.value = response.data.jwtToken;
        setUser({ user: username });
        navigate('/myaccount');

        //setShowLogin(!showLogin);
      }
    } catch (error) {
      console.error('Kirjautumisvirhe:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const profilename = formData.profilename;
    const password = formData.password;
    const email = formData.email;
    try {
      const response = await axios.post(`${VITE_APP_BACKEND_URL}/auth/register`, {
        username: profilename,
        password: password,
        email: email
      });

      if (response.status === 201) {
        alert('Rekisteröinti onnistui, voit nyt kirjautua sisään');
        setShowRegisterForm(false);
        setUsername(profilename);
        setPassword(password);
      }

    } catch (error) {
      console.error('Virhe käyttäjän luomisessa:', error);
      if (error.response.status === 400) {
        alert('Käyttäjätunnus on jo käytössä, valitse toinen');
      } else if (error.response.status === 500) {
        alert('Rekisteröinti epäonnistui, tarkista tiedot ja yritä uudelleen');
      }
    }
  };

  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleToggleForgotPasswordForm = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Tarkistetaan, onko sähköposti olemassa järjestelmässä
      const response = await axios.post(`${VITE_APP_BACKEND_URL}/auth/forgot-password`, { email });

      if (response.status === 200) {
        alert('Uusi salasana on lähetetty sähköpostiisi.');
        setShowForgotPassword(false);
      }
    } catch (error) {
      console.error('Virhe unohtuneen salasanan käsittelyssä:', error);
      alert('Sähköpostiosoitetta ei löytynyt. Tarkista antamasi sähköpostiosoite.');
    }
  };

  if (window) {
    return (
      <div className="login-window">
        {showRegisterForm ? (
          <form onSubmit={handleRegister}>
            <input className="field" type="text" name="profilename" value={formData.profilename || null} onChange={handleChange} placeholder="Käyttäjänimi" /><br />
            <input className="field" type='email' name="email" value={formData.email || null} onChange={handleChange} placeholder="Sähköposti" /><br />
            <input className="field" type='password' name="password" value={formData.password || null} onChange={handleChange} placeholder="Salasana" /><br />
            <button className="formButton" type="submit">Rekisteröidy</button>
            <button className="formButton" type="button" onClick={handleToggleRegisterForm}>Peruuta</button>
          </form>
        ) : showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <input className="field" type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Sähköpostiosoite" required />
            <button className="formButton" type="submit">Lähetä uusi salasana</button>
            <button className="formButton" onClick={handleToggleForgotPasswordForm}>Peruuta</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input className="field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Käyttäjänimi"></input>
            <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Salasana"></input>
            <button className="formButton" type="submit">Kirjaudu sisään</button>
            <hr />
            <li className="boxLink">
              <button className="formButton" onClick={handleToggleRegisterForm}>Rekisteröidy</button>
            </li>
            <li className="boxLink">
              <button className="formButton" onClick={handleToggleForgotPasswordForm}>Unohtuiko salasana?</button>
            </li>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div className='content'>

        <div className="login-view">
          <h2>Kirjautuminen</h2>
          <div className="full-page">
            <span className="userinfo">Älä koskaan jaa käyttäjätunnustasi ja salasanaasi muille</span><br /><br />

            <form onSubmit={handleLogin}>
              Käyttäjätunnus: <br />
              <input className="field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Käyttäjänimi"></input>
              <br /><br />
              Salasana: <br />
              <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Salasana"></input> <br />
              <button className="basicbutton" type="submit">Kirjaudu sisään</button>
            </form>
          </div>
        </div>

        <div className="login-view">
          <h2>Unohtuiko salasana?</h2>
          <div className="full-page">
            <p>Syötä sähköpostiosoitteesi, niin lähetämme sinulle uuden salasanan.</p>
            <form onSubmit={handleForgotPassword}>
              <input type="email" value={email} onChange={handleEmailChange} placeholder="Sähköpostiosoite" required /> <br />
              <button className="basicbutton" type="submit">Lähetä uusi salasana</button>
            </form>
          </div>
        </div>

        <div className="login-view">
          <h2>Rekisteröidy käyttäjäksi</h2>
          <div className="full-page">
            <div className='form-view'>
              <form onSubmit={handleRegister}>
                <p>Kaikki kentät ovat pakollisia, sähköposti ei saa olla jo käytössä jollain käyttäjällä.</p>
                <b>Käyttäjänimi</b> <br />
                <input className="field" type="text" name="profilename" value={formData.profilename || null} onChange={handleChange} /><br />
                <b>Sähköposti</b><br />
                <input className="field" type='text' name="email" value={formData.email || null} onChange={handleChange} /><br />
                <b>Salasana</b><br />
                <input className="field" type='password' name="password" value={formData.password || null} onChange={handleChange} /><br />
                <button className="basicbutton" type="submit">Rekisteröidy</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}