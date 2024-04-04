import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import Popularmovies from '@content/homepage/Popularmovies'
import './Home.css';


const Home = () => {

  return (

    /*<div className='home-container'>
      <div className='left-container'>
        <p>vasen marginaali</p>
      </div>
      <div className='mid-container'>
        <div className='uppercontent'>
          <div className="coming-soon-container">
            <h2>Tulossa Finnkinoon</h2>
            <Comingsoon />
          </div>
        </div>
          <div className='lowercontent'>
            <h2>Tämän hetken suosituimmat</h2>
            <Popularmovies />
          </div>
        </div>
      <div className='right-container'>
        <p>oikea marginaali</p>
      </div>
    </div>*/

    // katosi Comingsoon, kun käytin yo. osaa. Koitin sijoittaa tän seuraavan sisään sitten

      <div class="content">
        <h2>Tulossa Finnkinoon</h2>
        <Comingsoon />

        <h2>Tämän hetken suosituimmat</h2>
        <Popularmovies />
      </div>

  );
};

export default Home;