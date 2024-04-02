import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDropdown from './Login';

const Header = ({ user, handleLogout }) => {
<<<<<<< HEAD
  const [isburgerOpen, setIsburgerOpen] = useState(false);

  const toggleburger = () => {
    setIsburgerOpen(!isburgerOpen);
=======
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
>>>>>>> fe1bf6988e83d3988dc0d35d059ab605a6edf960
  };

  return (
    <div id="header">
      <div id="header-bar">
        <div className="header-container">
          <h1>Fancy Title Here</h1>
<<<<<<< HEAD
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
=======
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
    
>>>>>>> fe1bf6988e83d3988dc0d35d059ab605a6edf960
    
  );
};

export default Header;
