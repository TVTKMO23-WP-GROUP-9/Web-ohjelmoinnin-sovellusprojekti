import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../auth/authSignal';

export default function Login({ setUser, window, fullpage }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
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
  if  (window) {
    return (
      <div className="login-window">
        <form onSubmit={handleLogin}>
          <input className="field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Käyttäjänimi"></input>
          <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Salasana"></input>
          <button className="formButton" type="submit">Kirjaudu sisään</button>
          <hr />
          <li className="boxLink"><a href="/forgotPW">Unohtuiko salasana?</a></li>
          <li className="boxLink"><a href="/register">Rekisteröidy</a></li>
        </form>
      </div>
    );
  } else {
    return (
      <div className='content'>
        
        <div className="login-view">
          <h2>Kirjautuminen</h2>
          <div className="full-page">
            <span className="userinfo">Älä koskaan jaa käyttäjätunnustasi ja salasanaasi muille</span><br/><br/>

          <form onSubmit={handleLogin}>
            Käyttäjätunnus: <br/>
            <input className="field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Käyttäjänimi"></input>
            <br/><br/>
            Salasana: <br/>
            <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Salasana"></input> <br/>
            <button className="basicbutton" type="submit">Kirjaudu sisään</button>
          </form>
          </div>
        </div>

        <div className="login-view">
          <h2>Unohtuiko salasana?</h2>
          <div className="full-page">
            <p>Placeholder</p>
          </div>
        </div>

        <div className="login-view">
          <h2>Rekisteröidy käyttäjäksi</h2>
          <div className="full-page">
            <p>Placeholder</p>
          </div>
        </div>
          
      </div>
    );
  } 
}