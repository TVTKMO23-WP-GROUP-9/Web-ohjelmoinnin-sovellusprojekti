import React, { useState, useEffect } from 'react';
import './community.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllGroups = ({ searchTerm, setSearchTerm }) => {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [groupsPerPage, setGroupsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3001/group');
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

    return (
            <div className="two-view">
                <div className="two-left">

                    <h2>Ryhmät</h2>
                     {loading ? (
                    <div className="loading-text">
                        Ladataan Ryhmiä...
                    </div>
                    ) : (
                        <>
                        {groups.length > groupsPerPage && (
                            <ul className="pagination">
                                <li>
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
                                        ⯇
                                    </button>
                                    &nbsp; <span className="communityBox">selaa</span> &nbsp;
                                    <button className="buttonnext" onClick={() => setCurrentPage(currentPage < Math.ceil(filteredGroups.length / groupsPerPage) ? currentPage + 1 : Math.ceil(filteredGroups.length / groupsPerPage))}>
                                        ⯈
                                    </button>
                                </li>
                                <li>
                                <input className='justMargin longInput'
                                    type="text"
                                    placeholder="Etsi ryhmiä..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                </li>
                            </ul>
                        )}
      
                        <div className="communityDiv">

                            {currentGroups.map(group => (
                            <table className="communityTbl" key={group.groupid}>
                                <tbody>
                                    <tr>
                                        <td width="250px"><b><Link to={`/group/${group.groupid}`}>{group.groupname}</Link></b></td>
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
                    <h2>Muut ryhmätoiminnot</h2>
                    <div className="communityBox">Mikäs sen mukavampaa, kuin löytää samanhenkistä leffaporukkaa,<br />
                    jonka kanssa jakaa leffa-elämyksiä ja chattailla reaaliajassa. <br /><br />
                    Meillä on jo <b>{filteredGroups.length}</b> ryhmää, mistä valita <br />
                    Tai saitko uuden ryhmä-idean? Voit luoda sellaisen itsellesi ja kavereillesi <br />
                    tai koko maailman parhaalle leffakansalle! <span className='emoji uni01'></span></div> <br />
                    <button className='basicbutton justMargin'>Luo uusi ryhmä</button>
                </div>

            </div>
    );
};

export default AllGroups;
