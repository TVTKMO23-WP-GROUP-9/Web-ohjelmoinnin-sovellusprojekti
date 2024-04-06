import React, { useState } from 'react';
import Area from './Area';
import Dates from './Dates';
import Shows from './Shows';

const Events = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  // jaottelu pienempiin on paikallaan 

        // jäsennelty näytösaika näytöshakuihin
        const formattedShowtimes = showtimes.map(show => {
            const startDateTime = new Date(show.start_time);
            
            const day = startDateTime.getDate() < 10 ? `0${startDateTime.getDate()}` : startDateTime.getDate();
            const month = (startDateTime.getMonth() + 1) < 10 ? `0${startDateTime.getMonth() + 1}` : startDateTime.getMonth() + 1;
            const year = startDateTime.getFullYear();
            const hours = startDateTime.getHours() < 10 ? `0${startDateTime.getHours()}` : startDateTime.getHours();
            const minutes = startDateTime.getMinutes() < 10 ? `0${startDateTime.getMinutes()}` : startDateTime.getMinutes();
          
            const formattedStartTime = `${day}.${month}.${year} klo ${hours}:${minutes}`;
        
            return {
              ...show,
              start_time: formattedStartTime,
            };
        
          });
        
  
  // haetaan näytösajat valitulta alueelta ja päivältä
  const haeNaytokset = async () => {
    if (!selectedArea || !selectedDate) {
      console.error('Valitse alue ja päivämäärä');
      return;
    }
  
    console.log('Valittu alue:', selectedArea);
    console.log('Valittu päivämäärä:', selectedDate);
  
    setShowtimes([]);
    setEvents([]);

    // jäsennelty päivämäärä näytöshakuihin
    const formattedDate = new Date(selectedDate);
    const day = formattedDate.getDate() < 10 ? `0${formattedDate.getDate()}` : formattedDate.getDate();
    const month = (formattedDate.getMonth() + 1) < 10 ? `0${formattedDate.getMonth() + 1}` : formattedDate.getMonth() + 1;
    const formattedDateString = `${day}.${month}.${formattedDate.getFullYear()}`;
    
    console.log('Muotoiltu päivämäärä:', formattedDateString);
  
    try {
      const showsResponse = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDateString}`);
      const showsData = await showsResponse.text();
      const showsParser = new DOMParser();
      const showsXmlDoc = showsParser.parseFromString(showsData, 'text/xml');
      const shows = Array.from(showsXmlDoc.getElementsByTagName('Show')).map(show => {
        const id = show.querySelector('ID')?.textContent || '';
        const title = show.querySelector('Title')?.textContent || '';
        const start_time = show.querySelector('dttmShowStart')?.textContent || '';
  
        return { id, title, start_time };
      });
      setShowtimes(shows);
    } catch (error) {
      console.error('Virhe haettaessa näytösaikoja:', error);
    }
  };

  // haetaan tiedot elokuvista, jotka ovat teattereissa nyt
  const haeTapahtumat = () => {
    if (!selectedArea || !selectedDate) {
      console.error('Valitse alue ja päivämäärä ennen hakua.');
      return;
    }

    setEvents([]);
    setShowtimes([]);

    console.log('Teattereissa nyt, alue:', selectedArea);

    fetch(`https://www.finnkino.fi/xml/Events/?listType=NowInTheatres&area=${selectedArea}`)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const eventsData = Array.from(xmlDoc.getElementsByTagName('Event')).map(event => {
          const id = event.querySelector('ID')?.textContent || '';
          const title = event.querySelector('Title')?.textContent || '';
          const synopsis = event.querySelector('ShortSynopsis')?.textContent || '';
          const genres = event.querySelector('Genres')?.textContent || '';
          const imageUrl = event.querySelector('EventMediumImagePortrait')?.textContent || '';
          const trailerUrl = event.querySelector('Videos EventVideo Location')?.textContent || '';

          return { id, title, synopsis, genres, imageUrl, trailerUrl };
        });
        setEvents(eventsData);
      })
      .catch(error => console.error('Virhe haettaessa tapahtumia:', error));
  };

  // manuaalinen haun tyhjennys
  const tyhjennaHaku = () => {
    setEvents([]);
    setShowtimes([]);

    console.log('Lista tyhjennetty manuaalisesti');
  };
          
  return (
    <div className="content">
      
      <h2>Näytösajat ja Tapahtumat</h2>

        <p>Finnkinon näytösajat ja tapahtumat haettavissa teattereittain ympäri Suomea.</p>

        <Area setSelectedArea={setSelectedArea} /> <br/>
        <Dates onSelectDate={handleDateSelection} /> <br/>

        <label htmlFor="date"> Valitse metodi:</label>
        <button onClick={haeNaytokset}>Hae näytösajat</button>
        <button onClick={haeTapahtumat}>Teattereissa nyt</button>
        <button onClick={tyhjennaHaku}>Tyhjennä lista</button>

        <h3>Hakutulos:</h3>
        <hr/>
        
        <Shows events={events}/>

        {formattedShowtimes.map(show => ( 
          <div key={show.id}>
            <h4>{show.title}</h4>
            <p>Alkaa: {show.start_time}</p>
            <hr/>
          </div>
      ))}
    </div>

  );
};

export default Events;
