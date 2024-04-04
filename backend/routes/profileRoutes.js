const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Tietokantayhteyden asetukset
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

// Testaa tietokantayhteyttä
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Virhe tietokantayhteydessä', err);
    } else {
        console.log('Tietokantayhteys onnistui:', res.rows[0]);
    }
});

// GET-endpoint hakee kaikki tietueet taulusta profile
router.get('/profile', async (req, res) => {
    try {
        const query = 'SELECT profileid, profilename, email, profilepicurl, timestamp, description FROM "profile_"';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Virhe haettaessa tietueita:', error);
        res.status(500).send('Virhe haettaessa tietueita');
    }
});

// GET-endpoint hakee tietyn tietueen taulusta profile annetun profileid-arvon perusteella
router.get('/profile/:profileid', async (req, res) => {
    const profileId = req.params.profileid;

    try {
        const query = {
            text: 'SELECT profileid, profilename, email, profilepicurl, timestamp, description FROM "profile_" WHERE profileid = $1',
            values: [profileId],
        };

        const result = await pool.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Tietuetta ei löytynyt');
        }
    } catch (error) {
        console.error('Virhe haettaessa tietuetta:', error);
        res.status(500).send('Virhe haettaessa tietuetta');
    }
});

// DELETE-endpoint poistaa tietueen annetulla profileId-arvolla
router.delete('/profile/:profileid', async (req, res) => {
    const profileId = req.params.profileid;

    try {
        const query = {
            text: 'DELETE FROM "profile_" WHERE profileid = $1',
            values: [profileId],
        };

        const result = await pool.query(query);
        res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
    } catch (error) {
        console.error('Virhe poistettaessa tietuetta:', error);
        res.status(500).send('Virhe poistettaessa tietuetta');
    }
});

// PUT-endpoint päivittää tietueen profilename, email, profilepicurl, description ja timestamp-kentät annetulla profileid-arvolla
router.put('/profile/:profileid', async (req, res) => {
    const profileId = req.params.profileid;
    const { profilename, email, profilepicurl, description } = req.body; // Otetaan vastaan uudet arvot

    try {
        const now = new Date(); // Haetaan nykyinen aikaleima
        const query = {
            text: 'UPDATE "profile_" SET profilename = $1, email = $2, profilepicurl = $3, description = $4, timestamp = $5 WHERE profileid = $6',
            values: [profilename, email, profilepicurl, description, now, profileId],
        };

        const result = await pool.query(query);

        res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
    } catch (error) {
        console.error('Virhe päivitettäessä tietuetta:', error);
        res.status(500).send('Virhe päivitettäessä tietuetta');
    }
});

module.exports = router;