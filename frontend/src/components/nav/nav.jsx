import React from 'react';

function Navigation() {
  return (
    <nav>
      <ul className="sivu-palkki">
        <li><a href="#Movies">Leffat</a></li>
        <li><a href="#Series">Sarjat</a></li>
        <li><a href="#Groups">Ryhmät</a></li>
        <li style={{ float: 'right' }}><a href="#login">Kirjaudu sisään</a></li>
      </ul>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navigation;