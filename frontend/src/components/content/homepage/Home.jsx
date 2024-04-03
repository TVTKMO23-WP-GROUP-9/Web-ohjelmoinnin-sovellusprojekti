import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import './Home.css';


const Home = () => {

  return (

    <div className='home-container'>
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
          <p>alakontaineri</p>

        </div>
      </div>
      <div className='right-container'>
        <p>oikea marginaali</p>
      </div>
    </div>
  );
};

export default Home;