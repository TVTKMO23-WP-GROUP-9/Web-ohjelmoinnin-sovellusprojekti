import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { VITE_APP_BACKEND_URL } = import.meta.env;
import { getHeaders } from '@auth/token';

const Group = ({ setSelectedGroup }) => {
    const [groups, setGroups] = useState([]);
    const headers = getHeaders();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/grouplist`, { headers });
                const sortedGroups = response.data.sort((a, b) => a.groupname.localeCompare(b.groupname));
                setGroups(sortedGroups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <select className="selectMaxWidth eventItem" id="group" onChange={(e) => setSelectedGroup(e.target.value)}>
                <option value="">Kaikki ryhmäsi</option>
                {groups.map((group, index) => (
                    <option key={index} value={group.groupid}>{group.groupname}</option>
                ))}
            </select>
        </div>
    );
};

export default Group;