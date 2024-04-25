import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminDeleteUsers from './AdminDeleteUsers';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const UsersAsList = ({ searchTerm, setSearchTerm, user }) => {
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
        profile.profilename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    const handleDelete = async (id) => {
        setProfiles(profiles.filter(profile => profile.profileid !== id));
     };

    return (
        <div className="admin-view">
            <div className="admin-left">

                <h2>Käyttäjien hallinnointi</h2>
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
                                        &#9664;
                                    </button>
                                    &nbsp; <span className="communityBox">selaa</span> &nbsp;
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredProfiles.length / profilesPerPage) ? currentPage + 1 : Math.ceil(filteredProfiles.length / profilesPerPage))}>
                                        &#9654;
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
                                <table className="communityTbl" key={profile.profileid} onMouseEnter={() => setHoveredProfile(profile)}
                                onMouseLeave={() => setHoveredProfile(null)}> 
                                    <tbody>
                                        <tr>
                                            <td width="250px"><b className='tdNames'><Link to={`/profile/${profile.profilename}`}>{profile.profilename}</Link></b></td>
                                            <td width="250px">{user !== null && user.usertype === 'admin' && (
                                            <AdminDeleteUsers id={profile.profileid} handleDelete={handleDelete} />
                                            )}</td>
                                            {profile && profile.description && (
                                            <td>{profile.description && profile.description.length > 74 ? profile.description.substring(0, 74) + '...' : profile.description}</td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </>
                )}

            </div>




        </div>
    );
};

export default UsersAsList;
