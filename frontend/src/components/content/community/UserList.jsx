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
        profile.profilename.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                                        ⯇
                                    </button>
                                    &nbsp; <span className="communityBox">selaa</span> &nbsp;
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredProfiles.length / profilesPerPage) ? currentPage + 1 : Math.ceil(filteredProfiles.length / profilesPerPage))}>
                                        ⯈
                                    </button>
                                </li>
                                <li>
                                    <input className='justMargin longInput'
                                        type="text"
                                        placeholder="Etsi käyttäjää..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </li>
                            </ul>
                        )}


                        <div className="communityDiv">
                            {currentProfiles.map(profile => (
                                <table className="communityTbl" key={profile.profileid}>
                                    <tbody>
                                        <tr>
                                            <td width="250px"><b><Link to={`/profile/${profile.profilename}`}>{profile.profilename}</Link></b></td>
                                            <td><b>---</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </>
                )}

            </div>

            <div className="two-right">
                <h2>Eläköön Elokuvayhteisö!</h2>

                <div className="communityBox">
                    Meillä on täällä <b>{filteredProfiles.length}</b><br />
                    rekisteröitynyttä käyttäjää. <span className="emoji uni03"></span> <br /><br />
                    Liity mukaan jo tänään!</div>
                <button className='basicbutton justMargin'>Rekisteröidy</button>
            </div>

        </div>
    );
};

export default UserList;
