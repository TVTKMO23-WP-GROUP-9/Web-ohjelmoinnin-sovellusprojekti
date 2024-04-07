import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import Popularmovies from '@content/homepage/Popularmovies'
import Leftsidebar from '@content/homepage/Leftsidebar'
import Rightsidebar from '@content/homepage/Rightsidebar'
import './Home.css';


const Home = () => {

  return (

    <div className='content'>

    <div className='home-container'>

      {/*
      <div className='left-container'>
        <Leftsidebar />
      </div>
      */}

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
        <div className='lowermiddlecontent'>
            <h2>Tuoreimmat arvostelut</h2>
        </div>
        <div className='lowercontent'>
            <h2>Lempileffat</h2> 
        </div>

      </div>
      
      <div className='right-container'>
        <h2>Seuraavat näytökset lähelläsi</h2> 
          <Rightsidebar />
      </div>

    </div>
    </div>
  );
};

export default Home;