import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;



const Forum = ({ id, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messagesPerPage, setMessagesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileId, setProfileid] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isMainuser, setMainuser] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            
            const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${user.user}`);

            console.log("Token from sessionStorage:", token);
            console.log("Profilename from token:", user);
            console.log("Response from profile:", response.data);

            setProfileid(response.data.profileid);
            
            const groupResponse = await axios.get(`${VITE_APP_BACKEND_URL}/memberstatus/${response.data.profileid}/${id}`);
            
            console.log("Response from status:", groupResponse.data);

            if (groupResponse.data.hasOwnProperty('pending') && groupResponse.data.pending === 0) {
              setIsMember(true);
            }
            console.log("Response from setMember:", groupResponse.pending);
            if (groupResponse.data.hasOwnProperty('mainuser') && groupResponse.data.mainuser === 1) {
              setMainuser(true);
            }
            console.log("Response from profile:", groupResponse.data);
        } catch (error) {
            console.error('Virhe haettaessa profiilitietoja:', error);
        }
    };

    fetchProfile();
  }, [user]);
  

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${VITE_APP_BACKEND_URL}/messages/${id}`);
      const messageData = response.data;

      const messagesWithNames = await Promise.all(messageData.map(async message => {
        try {
          const nameResponse = await axios.get(`${VITE_APP_BACKEND_URL}/profile/id/${encodeURIComponent(message.profileid)}`);
          const nameData = nameResponse.data;
          return {
            ...message,
            name: nameData
          };
        } catch (error) {
          console.error('Virhe nimen hakemisessa:', error);
        }
      }));

      const sortedMessages = messagesWithNames.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setMessages(sortedMessages);
    } catch (error) {
      console.error('Virhe viestien hakemisessa:', error);
      setMessages([]);
    }
  };

  // Aja fetchMessages, kun komponentti renderöidään tai id-muuttuja muuttuu
  useEffect(() => {
    fetchMessages();
  }, [id]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSubmit = async (event) => {
    event.preventDefault();
    console.log(profileId); // Tarkista, että profileId on saatavilla
  
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const response = await axios.post(`${VITE_APP_BACKEND_URL}/messages`, {
        profileid: profileId, // Käytä profileId:tä tässä
        groupid: id,
        message: newMessage
      }, { headers });
      
      console.log(response.data);
      setNewMessage('');
      fetchMessages();
      setCurrentPage(1);
    } catch (error) {
      console.error('Virhe uuden viestin lähettämisessä:', error);
    }
  };

  const handleRemoveMessage = async (messageId) => {
    try {
      await axios.delete(`${VITE_APP_BACKEND_URL}/messages/${messageId}`);
      fetchMessages();
    } catch (error) {
      console.error('Virhe viestin poistamisessa:', error);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.message.toLowerCase()
  );

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);


  return (
    <>
      
      {isMember ? (
      <form className='justify' onSubmit={handleNewMessageSubmit}>
        <textarea className='newMessage'
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Syötä uusi viesti"
        /> &nbsp;
        <button className="basicbutton someMargin" type="submit">Lähetä</button>
      </form>) : null}

      <ul className="pagination">
        <li>
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
            ⯇
          </button>
          &nbsp; <span>selaa</span> &nbsp;
          <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredMessages.length / messagesPerPage) ? currentPage + 1 : Math.ceil(filteredMessages.length / messagesPerPage))}>
            ⯈
          </button>

          {(isMainuser && !editMode) && <button onClick={() => setEditMode(true)} className="basicbutton someMargin">Moderoi</button>}
      
          {(isMainuser && editMode) && <button onClick={() => setEditMode(false)} className="basicbutton someMargin">Lopeta</button>}
        </li>
      </ul>

      <div className="messageArea">
        {currentMessages.map((message, index) => (  
          <span className='msgRow' key={index}>
            {new Date(message.timestamp).toLocaleString('fi-FI', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })} &nbsp;<b><Link to={`/profile/${message.name.profilename}`}>{message.name.profilename}</Link> :</b>
          &nbsp;&nbsp;{message.message} 
          {(isMainuser && editMode) && <button className='remove' onClick={() => handleRemoveMessage(message.messageid)}>&nbsp;<span className='emoji'>&times;</span></button>}
         
          </span>
        ))}
      </div>
          
    </>
  );
};

export default Forum;