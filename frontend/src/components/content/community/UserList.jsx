import React, { useState, useEffect } from 'react';
import './community.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [profiles, setProfiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(10);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile');
                const sortedProfiles = response.data.sort((a, b) => a.profilename.localeCompare(b.profilename));
                setProfiles(sortedProfiles);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    //prfls
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <>
            <div className="two-view">
                <div className="two-left">
                    <h2>Käyttäjät</h2> 
                    <div>
                            {profiles.length > profilesPerPage && (
                                <ul className="pagination">
                                    <li>
                                        <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                                        ⯇ 
                                        </button>
                                        &nbsp; <span className="communityinfo">selaa</span> &nbsp;
                                        <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(profiles.length / profilesPerPage) ? currentPage + 1 : Math.ceil(profiles.length / profilesPerPage))}>
                                        ⯈
                                        </button>
                                    </li>
                                </ul>
                            )}
                    </div>
                    <div className='results'>
                        <ul>{currentProfiles.map(profile => (
                            <li key={profile.profileid}><Link to={`/profile/${profile.profilename}`}>{profile.profilename}</Link></li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
                <div className="two-right">
                    <h2>Eläköön Elokuvayhteisö!</h2>
                    <span className="communityinfo">Meillä on tänään <b>{profiles.length}</b></span><br/>
                    <span className='communityinfo'>rekisteröitynyttä käyttäjää.</span> <br/><br/>
                    <span className="communityinfo">Liity mukaan jo tänään!</span><br/>
                    <button className='basicbutton'>Rekisteröidy</button>
                </div>
            </div>

        </>
    );
};

export default UserList;
