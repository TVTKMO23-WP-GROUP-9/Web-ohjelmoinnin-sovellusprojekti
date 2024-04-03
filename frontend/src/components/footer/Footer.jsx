import React from 'react';

const Footer = ({ toggleTheme, theme }) => {
    return (
        <div id="footer">
            <span className="gh-mark"></span> <a href="https://github.com/TVTKMO23-WP-GROUP-9/Web-ohjelmoinnin-sovellusprojekti">Siirry tästä Github repoon</a><br/>
            <p>© OAMK Tietotekniikan opiskelijat, 2024</p>
            
            <button className="basicbutton" onClick={toggleTheme}>Vaihda teemaa</button>
            {/*<p>Tämä on {theme === 'light' ? 'vaalea' : 'tumma'} teema.</p>*/}
            
        </div>
    );
};

export default Footer;