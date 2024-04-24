import React, { useEffect, useState } from 'react';
import Area from './Area';
import Dates from './Dates';
import NowShowing from './NowShowing';
import './events.css';

const Events = () => {
  const [selectedArea, setSelectedArea] = useState('1018');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [error, setError] = useState('');
  const currentDate = new Date();

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  // jäsennelty näytösaika näytöshakuihin
  const formattedShowtimes = showtimes.map(show => {
    const startDateTime = new Date(show.start_time);

    const day = startDateTime.getDate() < 10 ? `0${startDateTime.getDate()}` : startDateTime.getDate();
    const month = (startDateTime.getMonth() + 1) < 10 ? `0${startDateTime.getMonth() + 1}` : startDateTime.getMonth() + 1;
    const year = startDateTime.getFullYear();
    const hours = startDateTime.getHours() < 10 ? `0${startDateTime.getHours()}` : startDateTime.getHours();
    const minutes = startDateTime.getMinutes() < 10 ? `0${startDateTime.getMinutes()}` : startDateTime.getMinutes();

    const formattedStartTime = `${hours}:${minutes}`;
    const showDate = `${day}.${month}.${year}`;

    return {
      ...show,
      start_time: formattedStartTime,
      end_time: new Date(show.end_time).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }),
      date: showDate,
    };

  });

  // haetaan näytösajat valitulta alueelta ja päivältä
  const haeNaytokset = async () => {
    if (!selectedArea || !selectedDate) {
      console.error('Valitse alue ja päivämäärä');
      return;
    }
    setShowtimes([]);
    setEvents([]);

    // jäsennelty päivämäärä näytöshakuihin
    const formattedDate = new Date(selectedDate);
    const day = formattedDate.getDate() < 10 ? `0${formattedDate.getDate()}` : formattedDate.getDate();
    const month = (formattedDate.getMonth() + 1) < 10 ? `0${formattedDate.getMonth() + 1}` : formattedDate.getMonth() + 1;
    const formattedDateString = `${day}.${month}.${formattedDate.getFullYear()}`;
    console.log('Jäsennelty päivämäärä:', formattedDateString);

    try {
      if (selectedMovie === '') {
        const showsResponse = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDateString}`);
      }

      const showsResponse = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDateString}&eventID=${selectedMovie}`);
      const showsData = await showsResponse.text();
      console.log('Näytösajat:', showsData);
      const showsParser = new DOMParser();
      const showsXmlDoc = showsParser.parseFromString(showsData, 'text/xml');
      const shows = Array.from(showsXmlDoc.getElementsByTagName('Show')).map(show => {
        const id = show.querySelector('ID')?.textContent || '';
        const title = show.querySelector('Title')?.textContent || '';
        const start_time = show.querySelector('dttmShowStart')?.textContent || '';
        const end_time = show.querySelector('dttmShowEnd')?.textContent || '';
        const theatre = show.querySelector('Theatre')?.textContent || '';
        const auditorium = show.querySelector('TheatreAuditorium')?.textContent || '';
        const ratingImageUrl = show.querySelector('RatingImageUrl')?.textContent || '';
        const genres = show.querySelector('Genres')?.textContent || '';
        const spokenLanguage = show.querySelector('Name')?.textContent || '';
        const showUrl = show.querySelector('ShowURL')?.textContent || '';
        const eventPortrait = show.querySelector('EventSmallImagePortrait')?.textContent || '';

        return { id, title, start_time, end_time, theatre, auditorium, ratingImageUrl, genres, spokenLanguage, showUrl, eventPortrait };
      });
      const filteredShows = shows.filter(show => {
        const showDate = new Date(show.start_time);
        return showDate >= currentDate;
      });
      if (filteredShows.length === 0) {
        setError('Valituilla kriteereillä ei löytynyt näytöksiä');
      } else {
        setError('');
      }
      console.log('Näytösajat:', filteredShows);
      setShowtimes(filteredShows);
    } catch (error) {
      console.error('Virhe haettaessa näytösaikoja:', error);
      setError('Näytösaikojen haku epäonnistui');
    }
  };
  
  // manuaalinen haun tyhjennys
  const tyhjennaHaku = () => {
    setEvents([]);
    setShowtimes([]);
    console.log('Lista tyhjennetty manuaalisesti');
  };

  return (
    <div className="content">
      <div className="form-view">
        <h2>Näytösajat</h2>

        <p>Finnkinon näytösajat ja tapahtumat haettavissa teattereittain ympäri Suomea.</p>
        <NowShowing setSelectedMovie={handleMovieSelection} /> <br />
        <Area setSelectedArea={setSelectedArea} /> <br />
        <Dates onSelectDate={handleDateSelection} /> <br />

        <label htmlFor="date"> Valitse metodi:</label>
        <button className='basicbutton' onClick={haeNaytokset}>Hae näytösajat</button>
        <button className='basicbutton' onClick={tyhjennaHaku}>Tyhjennä lista</button>
      </div>
      <div className="form-view">

          <div className="showtimes">
          <h2>Hakutulokset:</h2>
          <hr />

          {error && <p className="error">{error}</p>}
          {formattedShowtimes.map(show => (
            <div key={show.id}>
              
              <table className="showTable">
              <tbody>
                <tr>
                  <td className='portraitTd'>
                    <div className='showPortrait'>
                      <img className='reviewimg' src={show.eventPortrait} alt={show.title} />
                    </div>
                  </td>

                  <td className="showContentCellLeft">
                    <span className='eventTitle2'><a href={show.showUrl} target="_blank" rel="noreferrer">{show.title}</a></span>
                    <br/><span className='eventInfo2'><b>{show.date}</b> &nbsp;klo <b>{show.start_time}</b></span>
                    <br/><span className='eventInfo2'>{show.auditorium}, {show.theatre}</span>
                  </td>

                  <td className="showContentCellRight">                    
                    <span className='eventInfo'>Näytös alkaa ja päättyy</span> <br/>
                    <span className='eventInfo'>{show.start_time} - {show.end_time}</span> <br/>
                    <div className='showRight-inside'>
                      <img src={show.ratingImageUrl} alt={show.title} />&nbsp;&nbsp;<span className='userinfo'>{show.spokenLanguage}</span>
                    </div>
                  </td>

                </tr>

              </tbody>
            </table>

            <hr/>
              
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Events;
