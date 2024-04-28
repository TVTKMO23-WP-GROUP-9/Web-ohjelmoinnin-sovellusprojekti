import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Area from './Area';
import Dates from './Dates';
import NowShowing from './NowShowing';
import Group from './Group';
import { getHeaders } from '@auth/token';
import { animateScroll as scroll } from 'react-scroll';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import './events.css';

const Events = ({ user }) => {
  const [selectedArea, setSelectedArea] = useState('1018');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [events, setEvents] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [groupShowtimes, setGroupShowtimes] = useState([]);
  const [error, setError] = useState('');
  const currentDate = new Date();
  const headers = getHeaders();
  const [showMessages, setShowMessages] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  const profilename = user?.user;
  const profileid = user?.profileid;

  // hae näytökset ryhmälle
  useEffect(() => {
    const fetchGroupEvents = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/event/${selectedGroup}`, { headers });
        const showIds = response.data.map(event => event.eventid);
        setGroupShowtimes(showIds);
      } catch (error) {
        console.error('Virhe haettaessa ryhmän näytöksiä:', error);
      }
    };

    fetchGroupEvents();
  }, [selectedGroup]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleMovieSelection = (movie) => {
    setSelectedMovie(movie);
  };

  const handleGroupSelection = (groupid) => {
    setSelectedGroup(groupid);
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

    try {
      if (selectedMovie === '') {
        const showsResponse = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDateString}`);
      }

      const showsResponse = await fetch(`https://www.finnkino.fi/xml/Schedule/?area=${selectedArea}&dt=${formattedDateString}&eventID=${selectedMovie}`);
      const showsData = await showsResponse.text();
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
        profilename;

        return { id, title, start_time, end_time, theatre, auditorium, ratingImageUrl, genres, spokenLanguage, showUrl, eventPortrait, profilename };
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
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1700,
      smooth: 'easeInOutQuint',
    });
  };

  // lisää valittu näytös ryhmään
  const handleAddToGroup = async (eventInfo) => {
    const idAsInteger = parseInt(eventInfo.id, 10);
    console.log('Näytöksen alku', eventInfo.date, eventInfo.start_time);
    const [day, month, year] = eventInfo.date.split('.');

    const startDate = new Date(`${year}-${month}-${day}T${eventInfo.start_time}`);

    startDate.setDate(startDate.getDate() + 1);

    const formattedDate = startDate.toISOString();

    console.log('Näytöksen uusi päivämäärä', formattedDate);

    try {
      const data = {
        eventid: idAsInteger,
        groupid: selectedGroup,
        event_info: eventInfo,
        exp_date: formattedDate
      }
      const response = await axios.post(`${VITE_APP_BACKEND_URL}/event`, data, { headers });

      if (response.status === 201) {
        setShowMessages({ ...showMessages, [eventInfo.id]: 'Lisätty' });
        displayMessage();
        console.log('Näytös lisätty ryhmään');
        setGroupShowtimes([...groupShowtimes, idAsInteger]);
      }
    } catch (error) {
      console.error('Virhe lisättäessä näytöstä ryhmään', error);
    }
  };

  // poista näytös ryhmästä
  const handleRemoveFromGroup = async (eventInfo) => {
    const idAsInteger = parseInt(eventInfo.id, 10);
    console.log('Poistetaan näytös ryhmästä', idAsInteger);

    try {
      const response = await axios.delete(`${VITE_APP_BACKEND_URL}/event/${idAsInteger}`, { headers });
      if (response.status === 200) {
        setShowMessages({ ...showMessages, [eventInfo.id]: 'Poistettu' });
        displayMessage();
        console.log('Näytös poistettu ryhmästä');
        setGroupShowtimes(groupShowtimes.filter(show => show !== idAsInteger));
      }
    } catch (error) {
      console.error('Virhe poistettaessa näytöstä ryhmästä', error);
    }
  };

  const displayMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessages({});
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="content">
      <div className="form-view">
        <div className="flex-container">
          <h2 className='showtimeH2'>Finnkinon näytösajat</h2>
        </div>
        <div className="eventItems">
          <NowShowing setSelectedMovie={handleMovieSelection} />
          <Area setSelectedArea={setSelectedArea} />
          <Dates onSelectDate={handleDateSelection} />

          {profilename && <Group setSelectedGroup={handleGroupSelection} />}
          <button className='basicbutton' onClick={haeNaytokset}>Hae</button>
          <button className='basicbutton' onClick={tyhjennaHaku}>Tyhjennä</button>
        </div>
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
                      <br /><span className='eventInfo2'><b>{show.date}</b> &nbsp;klo <b>{show.start_time}</b></span>
                      <br /><span className='eventInfo2'>{show.auditorium}, {show.theatre}</span>
                    </td>
                    <td className="showContentCellRight">
                      <span className='eventInfo'>Näytös alkaa ja päättyy</span> <br />
                      <span className='eventInfo'>{show.start_time} - {show.end_time}</span> <br />
                      <div className='showRight-inside'>
                        <span className='userinfo'>{show.spokenLanguage}</span><img className='ratingImg' src={show.ratingImageUrl} alt={show.title} />
                      </div>
                    </td>
                    {profilename && selectedGroup !== 0 &&
                      <td className='addButtonTd'>
                        {groupShowtimes.map(id => id.toString()).includes(show.id) ? (
                          <button className='removefromgroupbutton' onClick={() => { handleRemoveFromGroup(show); }}>x</button>
                        ) : (
                          <button className='addtogroupbutton' onClick={() => { handleAddToGroup(show); }}>+</button>
                        )}
                      </td>}
                  </tr>

                </tbody>
              </table>

              <hr />
            </div>

          ))}
        </div>
        <div className='backToTop'>
          <button onClick={() => { scrollToTop(); }} className='basicbutton' >{'Palaa ylös'}</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
