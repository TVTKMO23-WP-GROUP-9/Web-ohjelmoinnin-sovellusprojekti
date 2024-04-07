import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../auth/authSignal';


export default function Login({ setUser }) {

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

  return (

    <div className="login-menu">
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
};
