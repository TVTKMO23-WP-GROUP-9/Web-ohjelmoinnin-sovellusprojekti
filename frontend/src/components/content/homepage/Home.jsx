import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import Popularmovies from '@content/homepage/Popularmovies'
import Rightsidebar from '@content/homepage/Rightsidebar'
import Latestreviews from './Latestreviews';
import './Home.css';

const Home = () => {

  return (

    <div className='content'>

      <div className='home-container'>

        <div className='mid-container'>

          <div className='uppercontent'>
            <div className="coming-soon-container">
              <h2>Tulossa Finnkinoon</h2>
              <Comingsoon />
            </div>
          </div>
          <div className='uppermiddlecontent'>
              <h2>Tämän hetken suosituimmat</h2>
              <Popularmovies />
          </div>
        </div>
        <div className='right-container'>
            <Rightsidebar />
        </div>

      </div>

      <div className='home-container'>

        <div className='mid-container'>
          <div className='lowermiddlecontent'>
              <h2>Tuoreimmat arvostelut</h2>
              <Latestreviews/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;