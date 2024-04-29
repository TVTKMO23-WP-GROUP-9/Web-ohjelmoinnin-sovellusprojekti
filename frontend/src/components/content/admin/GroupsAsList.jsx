import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminDeleteGroups from './AdminDeleteGroups';
import './admins.css';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const GroupsAsList = ({ user, searchTerm, setSearchTerm }) => {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [groupsPerPage, setGroupsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [profileId, setProfileid] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [creatingGroup, setCreatingGroup] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/group`);
                const sortedGroups = response.data.sort((a, b) => a.groupname.localeCompare(b.groupname));
                setGroups(sortedGroups);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching groups:', error);
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const filteredGroups = groups.filter(group =>
        group.groupname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);

    const handleCreateGroup = async () => {
        try {
            const response = await axios.post(`${VITE_APP_BACKEND_URL}/group`, { groupname: newGroupName });  
            const groupid = response.data[0].groupid;
            await axios.post(`${VITE_APP_BACKEND_URL}/memberstatus/${profileId}/1/${groupid}/0`);
            setNewGroupName('');
            setCreatingGroup(false);
            window.location.href = `/group/${groupid}`;

        } catch (error) {
            console.error('Virhe luodessa ryhmää ja jäsentä:', error);
        }
    };

    const handleDelete = async (id) => {
       setGroups(groups.filter(group => group.groupid !== id));
    };

    return (
        <div className="admin-view">
            <div className="admin-left">
                <h2>Ryhmien hallinnointi</h2>
                {loading ? (
                    <div className="loading-text">Ladataan Ryhmiä...</div>
                ) : (
                    <>
                        {groups.length > groupsPerPage && (
                            <ul className="pagination">
                                <li>
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>&#9664;</button>
                                    &nbsp; <span className="communityBox">selaa</span> &nbsp;
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredGroups.length / groupsPerPage) ? currentPage + 1 : Math.ceil(filteredGroups.length / groupsPerPage))}>&#9654;</button>
                                    <span className='hideableBr'><br/></span>
                                    <input className='justMargin longInput' type="text" placeholder="Etsi ryhmiä..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </li>
                            </ul>
                        )}

                        <div className="communityDiv">
                            {currentGroups.map(group => (
                                <table className="communityTbl" key={group.groupid}>
                                    <tbody>
                                        <tr>
                                            <td width="250px"><b><Link to={`/group/${group.groupid}`}>{group.groupname}</Link></b></td>
                                            <td width="250px">{user !== null && user.usertype === 'admin' && (
                                            <AdminDeleteGroups id={group.groupid} handleDelete={handleDelete} />
                                            )}</td>
                                            {group.groupexplanation && (
                                            <td>{group.groupexplanation && group.groupexplanation .length > 74 ? group.groupexplanation .substring(0, 74) + '...' : group.groupexplanation }</td>
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

export default GroupsAsList;
