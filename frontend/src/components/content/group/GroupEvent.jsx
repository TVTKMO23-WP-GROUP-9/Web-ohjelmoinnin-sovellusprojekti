import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';

const GroupEvent = ({ id }) => {
    const [groupEvents, setGroupEvents] = useState([]);
    const headers = getHeaders();
    const groupid = id;
    console.log('groupid', groupid);

    useEffect(() => {
        const fetchGroupEvents = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/event/${groupid}`, { headers });
                console.log('response.data', response.data);
                setGroupEvents(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroupEvents();
    }, []);

    return (
        <div>
            <span className='singleEvent'><b> Selaa / Hallinnoi / yms </b></span>
            {groupEvents.map((event, index) => (
                <span key={index} className='singleEvent'>
                    {event.event_info.date} &nbsp;&nbsp;
                    {event.event_info.theatre}, {event.event_info.auditorium} &nbsp;&nbsp;
                    klo {event.event_info.start_time} &nbsp;&nbsp;
                    {event.event_info.title} &nbsp;&nbsp;
                    <a href={event.event_info.showUrl} target="_blank" rel="noreferrer">Osta liput</a> &nbsp;&nbsp;
                    Lisännyt: {event.event_info.profilename}
                </span>
            ))}
        </div>
    );
};

export default GroupEvent;