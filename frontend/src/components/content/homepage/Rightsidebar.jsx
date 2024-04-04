import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rightsidebar.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const Rightsidebar = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [nearestTheater, setNearestTheater] = useState(null);
  const teatterit = [
    { name: "1012", latitude: 60.206, longitude: 24.656 }, //Espoo
    { name: "1002", latitude: 60.166, longitude: 24.943 }, //Helsinki 
    { name: "1013", latitude: 60.298, longitude: 25.006 }, //Vantaa 	
    { name: "1015", latitude: 62.241, longitude: 25.749 }, //Jyväskylä 	
    { name: "1016", latitude: 62.892, longitude: 27.688 }, //Kuopio 	
    { name: "1017", latitude: 60.980, longitude: 25.654 }, //Lahti 	
    { name: "1041", latitude: 61.058, longitude: 28.187 }, //Lappeenranta
    { name: "1018", latitude: 65.013, longitude: 25.472 }, //Oulu 	
    { name: "1019", latitude: 61.483, longitude: 21.795 }, //Pori 	
    { name: "1021", latitude: 61.497, longitude: 23.761 }, //Tampere 	
    { name: "1022", latitude: 60.451, longitude: 22.266 }, //Turku 	
    { name: "1046 ", latitude: 60.486, longitude: 22.171 } //Raisio 
  ];

  useEffect(() => {
    // Funktio sijainnin hakemiseksi
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation ei ole käytettävissä tässä selaimessa');
      }
    };

    getLocation(); // Kutsu sijainnin hakemisfunktiota
  }, []); // Tyhjä taulukko varmistaa, että useEffect suoritetaan vain kerran

  useEffect(() => {
    if (location) {
      let nearestTheater = null;
      let minDistance = Infinity;

      teatterit.forEach((teatteri) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          teatteri.latitude,
          teatteri.longitude
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestTheater = teatteri;
        }
      });

      setNearestTheater(nearestTheater);

    }
  }, [location]); // Suorita uudelleen aina, kun sijainti muuttuu

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Maapallon keskimääräinen säde kilometreinä
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Etäisyys kilometreinä
    return distance;
  };



  return (
    <div className="event-list">
    <h1>Käyttäjän sijainti</h1>
    {error && <p>{error}</p>}
    {location && (
      <div>
        <p>Leveysaste: {location.latitude}</p>
        <p>Pituusaste: {location.longitude}</p>
        {nearestTheater && (
          <div>
            <p>Lähin teatteri on: {nearestTheater.name}</p>
            <h2>Näytökset:</h2>
          </div>
        )}
      </div>
    )}
  </div>
);
};


export default Rightsidebar;
