
import React, { useEffect, useState } from 'react';

const SliceSearch  = () => {
const [visibleMovies, setVisibleMovies] = useState([]);
const [visibleSeries, setVisibleSeries] = useState([]);

useEffect(() => {
  setVisibleMovies(sliceResults(movies));
}, [movies]);

useEffect(() => {
  setVisibleSeries(sliceResults(series));
}, [series]);

const sliceResults = (results) => {
  if (window.innerWidth < 576) {
    return results.slice(0, 2); // Pieni näyttö, esim. kännykkä
  } else if (window.innerWidth < 992) {
    return results.slice(0, 5); // Keskitason näyttö, esim. tabletti
  } else {
    return results.slice(0, 10); // Iso näyttö, esim. tietokone
  }
};

// Kuuntelee ikkunan leveyttä muutoksille ja päivittää tulokset tarvittaessa
useEffect(() => {
  const handleResize = () => {
    setVisibleMovies(sliceResults(movies));
    setVisibleSeries(sliceResults(series));
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [movies, series]);

}

export default SliceSearch;
