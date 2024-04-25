import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHeaders } from '@auth/token';
import './ProfileDetails';
const { VITE_APP_BACKEND_URL } = import.meta.env;

const ProfileEdit = ({ profilename }) => {

    const [formData, setFormData] = useState({
        profilepicurl: '',
        description: ''
    });
    const headers = getHeaders();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/profile/${profilename}`, { headers });

                const { profilepicurl, description } = response.data;
                setFormData({ profilepicurl, description });
            } catch (error) {
                console.error('Hakuvirhe:', error);
            }
        };

        fetchProfileData();
    }, [profilename]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(VITE_APP_BACKEND_URL + `/profile/`, formData, { headers });

            window.location.reload();
        } catch (error) {
            console.error('Hakuvirhe:', error);
        }
    };

    return (
        <div className='form-view'>
            <h2>Muokkaa profiilia</h2>

            <form onSubmit={handleSubmit}>
                <b>Profiilikuva URL</b> <br />
                <input className="veryLongInput" type="text" name="profilepicurl" value={formData.profilepicurl || ''} onChange={handleChange} /><br />
                <b>Kuvaus</b><br />
                <textarea className="textBox" name="description" value={formData.description || ''} onChange={handleChange} /><br /><br />
                <button className="basicbutton" type="submit">Tallenna muutokset</button>
                <button className="basicbutton" onClick={() => setEditMode(false)}>Peruuta</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
