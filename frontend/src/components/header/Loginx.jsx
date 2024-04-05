import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Loginx({ setUser }) { 

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
        setUser({ user: username, password: password });
        console.log(username, password, setUsername);
        navigate('/myaccount');
        //setShowLogin(!showLogin);
      }
    } catch (error) {
      console.error('Kirjautumisvirhe:', error);
    }
  };
  
  return (

        <div className="content">
            <p>"Varaloginin" rakentaminen tänne, koska pikkunäytöillä ei saa ikkunaa auki ja burgerista pääsee</p>
          <form onSubmit={handleLogin}>
            <input className="field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Käyttäjänimi"></input>
            <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Salasana"></input>
            <button className="formButton" type="submit">Kirjaudu sisään</button>
            <hr/>
            <li className="boxLink"><a href="/forgotPW">Unohtuiko salasana?</a></li>
            <li className="boxLink"><a href="/register">Rekisteröidy</a></li>
            
          </form>
        </div>

  );
};
