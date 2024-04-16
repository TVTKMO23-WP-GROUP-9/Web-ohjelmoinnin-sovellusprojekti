import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GroupDetails';
const { VITE_APP_BACKEND_URL } = import.meta.env;


const GroupEdit = ({ id, user }) => {

    const [formData, setFormData] = useState({
        grouppicurl: '',
        groupexplanation: ''
    });
    

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                const response = await axios.get(`${VITE_APP_BACKEND_URL}/group/${id}`);

                const { grouppicurl, groupexplanation } = response.data;
                setFormData({ grouppicurl, groupexplanation });
            } catch (error) {
                console.error('Hakuvirhe:', error);
            }
        };

        fetchGroupData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(VITE_APP_BACKEND_URL + `/group/${id}`, formData, );

            window.location.reload();
        } catch (error) {
            console.error('Hakuvirhe:', error);
        }
    };

    return (
        <div className='form-view'>

            <h2>Muokkaa ryhmää</h2>

            <form onSubmit={handleSubmit}>
                <b>Ryhmäkuva URL</b> <br />
                <input className="veryLongInput" type="text" name="grouppicurl" value={formData.grouppicurl || ''} onChange={handleChange} /><br />
                <b>Kuvaus</b><br />
                <textarea className="textBox" name="groupexplanation" value={formData.groupexplanation || ''} onChange={handleChange} /><br /><br />
                <button className="basicbutton" type="submit">Tallenna muutokset</button>
                <button className="basicbutton" onClick={() => setEditMode(false)}>Peruuta</button>
            </form>

        </div>
    );
};

export default GroupEdit;
