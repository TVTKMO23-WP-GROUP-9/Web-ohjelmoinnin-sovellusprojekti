import React from 'react';
import './user.css';
import GroupList from './GroupList';

const ProfileDetails = () => {

  return (
    <div className="content">


        <div className="inner-view">


            <div className="inner-left">
                <img src="https://via.placeholder.com/250" className="profilepic" alt="Käyttäjän kuva"></img>
                
                <br/>
                <button className="basicbutton">Muokkaa profiilia</button>
            </div>

            
            <div className="inner-right">
                <h2>Käyttäjän nimimerkki</h2>
                <p className="info">Käyttäjän oma kuvaus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>

            </div>


            <div className="three-view">

            <div className="three-left">
                <h2>Suosikit</h2>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                </ul>
            </div>

            <div className="three-middle">
                <GroupList />
            </div>

            <div className="three-right">
                <h2>Arvostelut</h2>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                </ul>
            </div>

            </div>

    </div>

  );
};

export default ProfileDetails;