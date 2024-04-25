import React, { useState, useEffect } from 'react';

const Area = ({ setSelectedArea }) => {
  const [theatreAreas, setTheatreAreas] = useState([]);

  useEffect(() => {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const areas = Array.from(xmlDoc.getElementsByTagName('TheatreArea')).map(area => ({
          id: area.querySelector('ID').textContent,
          name: area.querySelector('Name').textContent,
        }));
        setTheatreAreas(areas);
      })
      .catch(error => console.error('Virhe haettaessa teatterialueita:', error));
  }, []);

  return (
    <div>
      <label htmlFor="area"></label>
      <select id="area" onChange={(e) => setSelectedArea(e.target.value)}>
        {theatreAreas.map(area => (
          <option key={area.id} value={area.id}>{area.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Area;