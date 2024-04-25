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
            <select className="selectMaxWidth eventItem" id="group" onChange={(e) => {
                const selectedGroupName = e.target.value;
                const selectedGroupId = selectedGroupName === '' ? 0 : groups.find(group => group.groupname === selectedGroupName).groupid;
                setSelectedGroup(selectedGroupId);
            }}>
                <option value=''>Kaikki ryhmäsi</option>
                {groups.map((group, index) => (
                    <option key={index} value={group.groupname}>{group.groupname}</option>
                ))}
            </select>
        </div>
    );
};

export default Group;
