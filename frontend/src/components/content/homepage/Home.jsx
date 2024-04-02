import React from 'react';
import Comingsoon from '@content/homepage/Comingsoon'
import './Home.css';


const Home = () => {

  return (

    <div className="home-container">
      <div className="uppercontent">
        <p>Tulossa elokuvateattereihin</p>
        <div className="coming-soon-container">
          <Comingsoon />
        </div>
      </div>
    </div>
  );
};

export default Home;