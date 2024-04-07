import React, { useState, useEffect } from 'react';
import './group.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

//koodinpätkän alkuja muistutuksena
  //const isMainMember = user && profile && user.username && profile.profilename === user.username;
 // const isMember = user && profile && user.username && profile.profilename === user.username;
 //<img src={group?.grouppicurl || ''} className="grouppic" alt="ryhmän kuva" /> jos lisätään kuva
 //{isMainMember && <Link to={`/group/${profilename}/edit`} className="basicbutton">Muokkaa ryhmää</Link>}

  return (
    <div className="gcontent">
      <div className="ginner-view">
        <div className="ginner-left">
          
          <br />
         
        </div>

        <div className="ginner-right">

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
          <p>tarkista wireframesta</p>
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


export default GroupDetails;