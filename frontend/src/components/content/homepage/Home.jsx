import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import Popularmovies from '@content/homepage/Popularmovies'
import Leftsidebar from '@content/homepage/Leftsidebar'
import Rightsidebar from '@content/homepage/Rightsidebar'
import './Home.css';


const Home = () => {

  return (

    /*<div className='home-container'>
      <div className='left-container'>
        <Leftsidebar />
      </div>
      <div className='mid-container'>
        <div className='uppercontent'>
          <div className="coming-soon-container">
            <h2>Tulossa Finnkinoon</h2>
            <Comingsoon />
          </div>
        </div>
        <div className='lowercontent'>
          <div className='lowerleftcontent'>
            <h2>Tämän hetken suosituimmat</h2>
            <Popularmovies />
          </div>
        </div>
      </div>
      <div className='right-container'>
        <Rightsidebar />
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