import React, { useState, useEffect } from 'react';
import './community.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const UserList = ({ searchTerm, setSearchTerm }) => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [hoveredProfile, setHoveredProfile] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile`);
                const sortedProfiles = response.data.sort((a, b) => a.profilename.localeCompare(b.profilename));
                setProfiles(sortedProfiles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const filteredProfiles = profiles.filter(profile =>
        profile.profilename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (profile.profileid && profile.profileid.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <div className="two-view">
            <div className="two-left">

                <h2>Käyttäjät</h2>
                {loading ? (

                    <div className="loading-text">
                        Ladataan käyttäjiä...
                    </div>

                ) : (
                    <>
                        {profiles.length > profilesPerPage && (
                        <ul className="pagination">

                            <li>
                                <input className='longInput' type="text" placeholder="Etsi ..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
                                <span className='hideableBr'><br/></span>
                                <button className="buttonnext justMargin" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                                &#9664; </button>
                                &nbsp; <span className="userinfo">sivu {currentPage} / {Math.ceil(filteredProfiles.length / profilesPerPage)}</span> &nbsp;
                                <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredProfiles.length / profilesPerPage) ? currentPage + 1 : Math.ceil(filteredProfiles.length / profilesPerPage))}>
                                &#9654; </button>

                            </li>
                        </ul>
                        )}

                        <div className="communityDiv">
                            {currentProfiles.map(profile => (
                                <table className="communityTbl" key={profile.profileid} onMouseEnter={() => setHoveredProfile(profile)}
                                onMouseLeave={() => setHoveredProfile(null)}> 
                                    <tbody>
                                        <tr>
                                            <td width="250px"><b className='tdNames'><Link to={`/profile/${profile.profilename}`}>{profile.profilename}</Link></b></td>
                                            {profile && profile.description && profile.is_private === false && (
                                            <td>{profile.description && profile.description.length > 44 ? profile.description.substring(0, 54) + '...' : profile.description}</td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </>
                )}

            </div>

    <       div className="two-right">
                <h2>Eläköön Elokuvayhteisö!</h2>

                <div className="communityBox">
                    Meillä on täällä <b>{profiles.length}</b><br />
                    rekisteröitynyttä käyttäjää. <img src="/celebrate.png" className='emoji' /> <br /><br />
                </div>

                {token === '' && (
                    <div className="communityBox">
                        Liity mukaan jo tänään!
                    </div>
                )}
                
                {token === '' && (
                    <Link to={'/login'}><button className='basicbutton justMargin'>Rekisteröidy</button></Link>
                )}

                {hoveredProfile && (
                    <div className="communityBox">
                        <h1>Kurkistusikkunassa</h1>
                        <h3 className='title1'><b>{hoveredProfile.profilename}</b></h3>
                        {hoveredProfile.profilepicurl ? (
                        <span>
                            <img src={hoveredProfile.profilepicurl} className='tinyPrfPic' alt="Group Picture" />
                        </span>
                        ) : (
                        <span>
                            <img src="/pic.png" className='tinyPrfPic' alt="Default Group Picture" />
                        </span>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default UserList;
