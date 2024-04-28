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

    const handleRemoveFromGroup = async (eventInfo) => {
        console.log('eventInfo', eventInfo);
        const idAsInteger = parseInt(eventInfo.eventid, 10);
        console.log('Poistetaan näytös ryhmästä', idAsInteger);

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
        <div>
            <table className='showTable'>
                <tbody>
                    {groupEvents.map((event, index) => (
                        <tr key={index} className='singleEvent'>
                            <td className='geventinfoLeft'>
                                <b>{event.event_info.date}</b><br/>
                                <b> klo {event.event_info.start_time}</b>
                            </td>

                            <td className='geventinfoCenter'>
                                <b>{event.event_info.title}</b>
                                <p>{event.event_info.theatre}, {event.event_info.auditorium}</p>
                                
                                
                            </td>
                            <td className='geventinfoRight'>
                                <p>Lisännyt: {event.event_info.profilename}</p>
                                
                                
                            </td>
                            <td>
                                <a href={event.event_info.showUrl} target="_blank" rel="noreferrer">Osta liput</a>
                                <button className='removefromgroupbutton' onClick={() => { handleRemoveFromGroup(event); }}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupEvent;