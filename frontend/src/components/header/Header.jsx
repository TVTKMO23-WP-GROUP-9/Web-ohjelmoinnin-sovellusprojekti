import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, handleLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div id="header">
      <div id="header-bar">
        <div className="header-container">
          <h1>Fancy Title Here</h1>
          </div>
          <button className="hamburger-icon" onClick={toggleMenu}>
            ☰
          </button>
          <div className="menu-items">
            <ul>
              <li ><Link to="/">Etusivu</Link></li>
              <li><Link to="/search">Leffahaku</Link></li>
              <li><Link to="/community">Yhteisö</Link></li>
              {!user && <li style={{ marginLeft: 'auto' }}><Link to="/login">Kirjaudu</Link></li>}
              {!user && <li><Link to="/community">Rekisteröidy</Link></li>}
              {user && <li><Link to="/myaccount">Oma tili</Link></li>}
              {user && <li style={{ marginLeft: 'auto' }}><Link onClick={handleLogout}>Kirjaudu ulos</Link></li>}
              
            </ul>
            
       </div>
          </div>
      </div>
    
    
  );
};

export default Header;
