import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <div id="header">
      <div id="header-bar">
        <div className="header-container">
          <h1>Fancy Title Here</h1> 
          <div>
            <ul className={`navigate ${hamburgerOpen ? 'active' : ''}`}>
              <li><Link to="/">Etusivu</Link></li>
              <li><Link to="/search">Leffahaku</Link></li>
              <li><Link to="/community">Yhteisö</Link></li>
              {!user && <li><Link to="/login">Kirjaudu</Link></li>}
              {!user && <li><Link to="/community">Rekisteröidy</Link></li>}
              {user && <li><Link to="/myaccount">Oma tili</Link></li>}
              {user && <li><Link onClick={handleLogout}>Kirjaudu ulos</Link></li>}
            </ul>
            <div className="hamburger" onClick={toggleHamburger}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
