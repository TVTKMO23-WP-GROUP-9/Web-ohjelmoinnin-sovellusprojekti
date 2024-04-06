import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rightsidebar.css'; // Sisällytä CSS-tiedosto suoraan komponenttiin

const Rightsidebar = () => {
  const [shows, setShows] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [nearestTheater, setNearestTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(10);
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
    const storedLocation = JSON.parse(sessionStorage.getItem('userLocation'));
    const storedTheater = JSON.parse(sessionStorage.getItem('nearestTheater'));

    if (storedLocation && storedTheater) {
      setLocation(storedLocation);
      setNearestTheater(storedTheater);
    } else {
      getLocation();
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          sessionStorage.setItem('userLocation', JSON.stringify(userLocation));
          setLocation(userLocation);
          findNearestTheater(userLocation);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation ei ole käytettävissä tässä selaimessa');
    }
  };

  const findNearestTheater = (userLocation) => {
    let nearestTheater = null;
    let minDistance = Infinity;

    teatterit.forEach((teatteri) => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        teatteri.latitude,
        teatteri.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestTheater = teatteri;
      }
    });

    sessionStorage.setItem('nearestTheater', JSON.stringify(nearestTheater));
    setNearestTheater(nearestTheater);
  };

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

  useEffect(() => {
    if (nearestTheater) {
      fetchData();
    }
  }, [nearestTheater]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${encodeURIComponent(nearestTheater.name)}`);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(data, "application/xml");

      const showElements = xmlData.querySelectorAll("Show");
      const showData = Array.from(showElements).map(show => ({
        auditorium: show.querySelector("TheatreAndAuditorium").textContent,
        image: show.querySelector("Images EventSmallImagePortrait").textContent,
        title: show.querySelector("OriginalTitle").textContent,
        year: show.querySelector("ProductionYear").textContent,
        startTime: show.querySelector("dttmShowStart").textContent
      }));

      setShows(showData);
      setLoading(false);
    } catch (error) {
      console.error('Virhe datan noudossa:', error);
      setLoading(false);
    }
  };

  // Funktio muuntaa ajan muodon muotoon 'tunnit:minuutit'
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0'); // Lisää etunolla, jos tunnit ovat yhden numeron mittaisia
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Lisää etunolla, jos minuutit ovat yhden numeron mittaisia
    return `${hours}:${minutes}`;
  };

  const handleClick = async (title, year) => {
    try {
      const response = await axios.get(`http://localhost:3001/movie/search?query=${encodeURIComponent(title)}&page=1&year=${encodeURIComponent(year)}&language=any`);
      const movieId = response.data[0].id; // Oletetaan, että haluat ensimmäisen id:n
      if (movieId) {
        // Navigoi elokuvan sivulle suoraan
        window.location.href = `/movie/${movieId}`;
      } else {
        console.error('Elokuvan id:tä ei löydy');
      }
    } catch (error) {
      console.error('Virhe elokuvien haussa:', error);
    }
  }; 

  const showMore = () => {
    setShowCount(prevCount => {
      const nextCount = prevCount + 10;
      return Math.min(nextCount, shows.length);
    });
  };
  
  const showLess = () => {
    setShowCount(prevCount => {
      return Math.max(prevCount - 10, 10);
    });
  };


  return (
    <div className="event-list">
      {loading && <p>Ladataan...</p>}
      {error && <p>{error}</p>}
      {location && (
        <div>
          {nearestTheater && (
            <div className="nearbyEvents" >
                
                {shows.slice(showCount - 10, showCount).map((show, index) => (
    
                    <div onClick={() => handleClick(show.title, show.year)}>
                      <table className="nearby"  key={index}>
                        <tbody>
                          <tr onClick={() => handleClick(show.title, show.year)}>
                            <td width="270px"><b>{show.auditorium}</b></td>
                            <td width="120px"><b>{formatTime(show.startTime)}</b></td>
                            <td>{show.title}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    ))}
                  
                <button onClick={showLess} className='show-more-button'>{'<'}</button>

               Selaa 
              
                <button onClick={showMore} className='show-more-button'>{'>'}</button>
                
            </div> 
          )}
        </div>
      )}
    </div>
  );
};

export default Rightsidebar;