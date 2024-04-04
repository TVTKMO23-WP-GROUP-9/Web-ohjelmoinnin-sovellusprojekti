import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDropdown from './Login';

const Header = ({ user, handleLogout }) => {
  const [isburgerOpen, setIsburgerOpen] = useState(false);

  const toggleburger = () => {
    setIsburgerOpen(!isburgerOpen);
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  

  return (
    <div id="header">
      <div id="header-bar">
        <div className="header-container">
        

        <h2><Link className="mobile-menu-icon" onClick={toggleburger}>☰</Link></h2>
        <Link to="/"><span className="logo"></span></Link>

          <div className={`burger-items ${isburgerOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/">Etusivu</Link></li>
              <li><Link to="/search">Leffahaku</Link></li>
              <li><Link to="/search">Näytösajat</Link></li>
              <li><Link to="/community">Yhteisö</Link></li>
            </ul>
          </div>

          <div className="menu-items">
            <div className="menu-items-left">
            <ul>
              <li><Link to="/search">Leffat ja sarjat</Link></li>
              <li><Link to="/community">Yhteisö</Link></li>
            </ul>
            </div>

            <ul className="menu-items-right">
              <li className="lilogin"><Link onClick={toggleMenu}>Kirjautuminen</Link>

              {showMenu && (
                <div className="login-menu">
                  <form>
                    <input type="text" placeholder="Käyttäjänimi" />
                    <input type="password" placeholder="Salasana" />
                    <li><a href="/forgotPW">Unohtuiko salasana?</a></li>
                    <li><a href="/register">Rekisteröidy</a></li>
                    <button type="submit">Kirjaudu sisään</button>
                  </form>
                </div>
              )} </li> 

              {user && <li><Link to="/myaccount">Oma tili</Link></li>}
              {user && <li><Link onClick={handleLogout}>Kirjaudu ulos</Link></li>}
            </ul>

          </div>

          
        </div>
        </div>
        <LoginDropdown />
      </div>
  );
};

export default Header;
