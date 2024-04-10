import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';

const GroupDetails = () => {
  const { id } = useParams(); 
  const [group, setGroup] = useState(null); 
  
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error('Virhe ryhmän hakemisessa:', error);
      }
    };
  
    fetchGroup();
  }, [id]);

  return (
    <div className="content">
      <div className="ginner-view">
        <div className="ginner-left">
          <img src={group?.grouppicurl || ''} className="grouppic" alt="Ryhmän kuva" />
          <br />
         
        </div>

        <div className="ginner-right">
          <h2>{group?.groupname}</h2>
            <ul>
                <p className="info">{group?.groupexplanation || ''} </p>

            </ul>
        </div>
      </div>

      <div className="gthree-view">
        <div className="gthree-left">
          <h2>Suosikit</h2>
          <ul>
            {/*ehkä vaikka tähän*/}
          </ul>
        </div>

        <div className="gthree-middle">
          <h2>Jäsenet</h2>
          <ul>
            <MemberList id={id} />
          </ul>
        </div>

        <div className="three-right">
          <h2>Arvostelut</h2>
          <ul>
            {/*ehkä tähän*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;