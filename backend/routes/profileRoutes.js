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
        const query = 'SELECT * FROM "Profile_"';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Virhe haettaessa tietueita:', error);
        res.status(500).send('Virhe haettaessa tietueita');
    }
});

// GET-endpoint hakee tietyn tietueen taulusta profile annetun profilename-arvon perusteella
router.get('/profile/:profilename', async (req, res) => {
    const profileName = req.params.profilename;

    try {
        const query = {
            text: 'SELECT * FROM "Profile_" WHERE profilename = $1',
            values: [profileName],
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

// DELETE-endpoint poistaa tietueen annetulla profilename-arvolla
router.delete('/profile/:profilename', async (req, res) => {
    const profileName = req.params.profilename;

    try {
        const query = {
            text: 'DELETE FROM "Profile_" WHERE profilename = $1',
            values: [profileName],
        };

        const result = await pool.query(query);
        res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
    } catch (error) {
        console.error('Virhe poistettaessa tietuetta:', error);
        res.status(500).send('Virhe poistettaessa tietuetta');
    }
});

// POST-endpoint luo uuden tietueen profile-tauluun
router.post('/profile', async (req, res) => {

    const { profilename, password, email, profilepicurl } = req.body;
    try {
        const now = new Date(); // Haetaan nykyinen aikaleima

        // Lisätään uusi tietue profile-tauluun
        const profileQuery = {
            text: 'INSERT INTO "Profile_" (profilename, password, email, profilepicurl, timestamp) VALUES ($1, $2, $3, $4, $5)',
            values: [profilename, password, email, profilepicurl, now],
        };

        await pool.query(profileQuery);

        res.send('Uusi tietue lisätty onnistuneesti');
    } catch (error) {
        console.error('Virhe lisättäessä uutta tietuetta:', error);
        res.status(500).send('Virhe lisättäessä uutta tietuetta');
    }
});

// PUT-endpoint päivittää tietueen email- ja timestamp-kentät annetulla profilename-arvolla
router.put('/profile/:profilename', async (req, res) => {
    const profileName = req.params.profilename;
    const { email } = req.body; // Otetaan vastaan uusi email

    try {
        const now = new Date(); // Haetaan nykyinen aikaleima
        const query = {
            text: 'UPDATE "Profile_" SET email = $1, timestamp = $2 WHERE profilename = $3',
            values: [email, now, profileName],
        };

        const result = await pool.query(query);

        res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
    } catch (error) {
        console.error('Virhe päivitettäessä tietuetta:', error);
        res.status(500).send('Virhe päivitettäessä tietuetta');
    }
});

module.exports = router;