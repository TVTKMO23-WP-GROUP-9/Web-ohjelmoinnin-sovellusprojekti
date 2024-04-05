import React, { useState, useEffect } from 'react';
import './community.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [currentPageP, setCurrentPageP] = useState(1);
    const [groupsPerPage, setGroupsPerPage] = useState(10);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3001/group');
                const sortedGroups = response.data.sort((a, b) => a.groupname.localeCompare(b.groupname));
                setGroups(sortedGroups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    //grps
    const indexOfLastGroup = currentPageP * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

    return (
        <>
            <div className="two-view">
                <div className="two-left">
                    <h2>Ryhmät</h2>
                    <div>
                            {groups.length > groupsPerPage && (
                                <ul className="pagination">
                                    <li>
                                        <button className="buttonnext" onClick={() => setCurrentPageP(currentPageP > 1 ? currentPageP - 1 : 1)}>
                                        ⯇ 
                                        </button>
                                        &nbsp; <span className="communityinfo">selaa</span> &nbsp;
                                        <button className="buttonnext" onClick={() => setCurrentPageP(currentPageP < Math.ceil(groups.length / groupsPerPage) ? currentPageP + 1 : Math.ceil(groups.length / groupsPerPage))}>
                                        ⯈
                                        </button>
                                    </li>
                                </ul>
                            )}
                    </div>
                    <div className='results'>
                        <ul>
                            {currentGroups.map(group => (
                                <li key={group.groupid}><Link to={`/group/${group.groupid}`}>{group.groupname}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="two-right">
                    <h2>Muut ryhmätoiminnot</h2>
                    <span className="communityinfo">Meillä on jo <b>{groups.length}</b> ryhmää!</span>
                    <button className='basicbutton'>Luo uusi ryhmä</button>
                </div>
            </div>
        </>
    );
};

export default AllGroups;
