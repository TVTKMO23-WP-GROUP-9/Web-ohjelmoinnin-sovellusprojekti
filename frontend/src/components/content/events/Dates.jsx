import React from 'react';

const Dates = ({ onSelectDate }) => {

  return (
    <div>
      <input className='eventItem' type="date" id="date" onChange={(e) => onSelectDate(e.target.value)} /> <br/>
    </div>
  );
};

export default Dates;