import React, { useState } from 'react';

const LoginDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="login-dropdown-container">
      <button className="login-dropdown-button loginbutton" onClick={toggleMenu}>Kirjaudu</button>
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
      )}
    </div>
  );
};

export default LoginDropdown;