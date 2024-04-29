import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';

const GroupEvent = ({ id }) => {
    const [groupEvents, setGroupEvents] = useState([]);
    const headers = getHeaders();
    const groupid = id;

    useEffect(() => {
        const fetchGroupEvents = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/event/${groupid}`, { headers });
                setGroupEvents(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroupEvents();
    }, []);

    const handleRemoveFromGroup = async (eventInfo) => {
        const idAsInteger = parseInt(eventInfo.eventid, 10);

        try {
            const response = await axios.delete(`${VITE_APP_BACKEND_URL}/event/${idAsInteger}`, { headers });
            if (response.status === 200) {
                console.log('Näytös poistettu ryhmästä');
                setGroupEvents(prevEvents => prevEvents.filter(event => event.eventid !== idAsInteger));
            }
        } catch (error) {
            console.error('Virhe poistettaessa näytöstä ryhmästä', error);
        }
    };

    return (
        <>
        {groupEvents.map((event, index) => (
            <div key={index} className='singleEvent'>
                <div className='geventinfoLeft'>
                <div className='geventShowLater'>
                    <h2 className='eventInfoTitle'>{event.event_info.title}</h2>
                    </div>
                    <b>{event.event_info.date}</b><br/>
                    klo <b>{event.event_info.start_time}</b>
                    <div className='geventShowLater'>
                        {event.event_info.theatre}, {event.event_info.auditorium}<br/>
                        <a href={event.event_info.showUrl} target="_blank" rel="noreferrer">Osta liput</a>
                    </div>
                </div>

                <div className='geventShowLater2'>
                        <img className='reviewimg' src={event.event_info.eventPortrait} alt={event.event_info.title} />
                    </div>

                <div className='geventinfoCenter'>
                    <b>{event.event_info.title}</b>
                    <p>{event.event_info.theatre}, {event.event_info.auditorium}</p>
                    
                </div>
                <div className='geventRightHideable1'>
                    <p>Lisännyt: {event.event_info.profilename}thematti</p>
                    <a href={event.event_info.showUrl} target="_blank" rel="noreferrer">Osta liput</a>
                </div>
                
                <div className='geventRightHideable2'>
                    <button className='removefromgroupbutton' onClick={() => { handleRemoveFromGroup(event); }}>X</button> 
                </div>
            </div>
        ))}

        </>
    );
};

export default GroupEvent;