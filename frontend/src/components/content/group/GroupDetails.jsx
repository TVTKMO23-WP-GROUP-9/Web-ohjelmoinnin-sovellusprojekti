import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MemberList from './MemberList';
import ReviewList from './ReviewList';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${VITE_APP_BACKEND_URL}/group/${id}`);
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
          {group?.grouppicurl && (
            <img src={group.grouppicurl} className="grouppic" alt="Ryhmän kuva" />
          )}
          <br />

        </div>

        <div className="ginner-right">
          <h2>{group?.groupname}</h2>
          <ul>
            <p className="info">{group?.groupexplanation || ''} </p>

          </ul>
        </div>
      </div>

      <div className='group-between'>

        <div className="group-view">
          <div className="group-content">
            <h2>Suosikit &nbsp;<span className='emoji uni10'></span></h2>
            <ul>
              <li><span className='userinfo'>Ei vielä suosikkeja</span></li>
            </ul>
          </div>
        </div>

        <div className="group-view">
          <div className="group-content">
            <h2>Jäsenet &nbsp;<span className='emoji uni07'></span></h2>
            <MemberList id={id} />
          </div>
        </div>
      </div>

      <div className='greviews-view'>
        <h2>Arvostelut  &nbsp;<span className='emoji uni08'></span></h2>
        <ReviewList id={id} />
      </div>
    </div>
  );
};

export default GroupDetails;