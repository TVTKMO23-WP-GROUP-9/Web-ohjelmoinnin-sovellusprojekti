import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDropdown from './Login';

const Header = ({ user, handleLogout }) => {
  const [isburgerOpen, setIsburgerOpen] = useState(false);

  const toggleburger = () => {
    setIsburgerOpen(!isburgerOpen);
  };

  return (
    <div id="header">
      <div id="header-bar">
        <div className="header-container">
        <h1>Logo - &or name</h1> 
          <button className="mobile-menu-icon" onClick={toggleburger}>☰</button>
        
      <div className={`menu-items ${isburgerOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Etusivu</Link></li>
          <li><Link to="/search">Leffahaku</Link></li>
          <li><Link to="/community">Yhteisö</Link></li>
          {user && <li><Link to="/myaccount">Oma tili</Link></li>}
          {user && <li><Link onClick={handleLogout}>Kirjaudu ulos</Link></li>}
          <LoginDropdown />
        </ul>
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default Header;
