import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import Leftsidebar from '@content/homepage/Leftsidebar'
import Rightsidebar from '@content/homepage/Rightsidebar'
import Latestreviews from '@content/homepage/Latestreviews'
import Favoriteitems from '@content/homepage/Favoriteitems'
import './Home.css';


const Home = () => {

  return (

    <div className='home-container'>
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
            <Latestreviews />
          </div>
          <div className='lowerrightcontent'>
            <Favoriteitems />
          </div>
        </div>
      </div>
      <div className='right-container'>
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Home;