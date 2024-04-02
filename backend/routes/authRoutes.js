const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

// tietokantayhteys
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // tarkistetaan, onko käyttäjätunnus vapaana
        const existingUserQuery = {
            text: 'SELECT * FROM Profile_ WHERE profilename = $1',
            values: [username],
        };
        const existingUserResult = await pool.query(existingUserQuery);
        if (existingUserResult.rows.length > 0) {
            return res.status(400).json({ message: 'Käyttäjätunnus varattu' });
        }
        console.log(req.body);
        // salasanan salaus (bcrypt)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Saatu salasana:", password);
        // tallennetaan uusi käyttäjä tietokantaan
        const newUserQuery = {
            text: 'INSERT INTO Profile_ (profilename, hashedPassword) VALUES ($1, $2)',
            values: [username, hashedPassword],
            
        };
        
        await pool.query(newUserQuery);
        res.status(201).json({ message: 'Rekisteröinti onnistui' });
    } catch (error) {
        console.error('Virhe rekisteröinnissä:', error);
        res.status(500).json({ message: 'Rekisteröinti epäonnistui', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // etsitään käyttäjänimellä
        console.log(req.body);
        const userQuery = {
            text: 'SELECT * FROM Profile_ WHERE profilename = $1',
            values: [username],
        };
        const userResult = await pool.query(userQuery);
        const userMatch = userResult.rows[0];
        if (!userMatch) {
            return res.status(400).json({ message: 'Käyttäjätunnusta ei löydy' });
        }

        // salasanan tarkistus bcryptillä
        console.log(userMatch.hashedpassword + " || " + password);
        const passwordMatch = await bcrypt.compare(password, userMatch.hashedpassword);
        if (passwordMatch) {
            res.status(200).json({ message: 'Kirjautuminen onnistui' });
        } else {
            res.status(400).json({ message: 'Kirjautuminen epäonnistui' });
        }
    } catch (error) {
        console.error('Virhe kirjautumisessa:', error);
        res.status(500).json({ message: 'Kirjautumisvirhe' });
    }
});

module.exports = router;