const express = require('express');
const { Pool } = require('pg');
const favoritelistRouter = require('./favoritelistRouter');

const router = express.Router();

// PostgreSQL-yhteysasetukset
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
/*
// hakee kaikki suosikkilistat
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM favoritelist';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Virhe haettaessa Listaa:', error);
  }
});

// hakee tietyn suosikkilistan profiilista tai groupista
router.get('/favoritelist/:favoritelistid', async (req, res) => {
  const favoritelistid = req.params.favoritelistid;
  try {
    const query = {
      text: `
      SELECT fl.*, p.profilename, g.groupname
      FROM favoritelist_ fl
      LEFT JOIN profile p ON fl.profilename = p.id
      LEFT JOIN group g ON fl.groupname = g.id
      WHERE fl.favoritelistid = $1
    `,
      values: [favoritelistid],
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Listaa ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa Listaa:', error);
  }
});

// lisää uuden suosikkilistan
router.post('/favoritelist', async (req, res) => {
    try {
      const { favoritelistid, favoriteditem, showtime, timestamp } = req.body;
      
      const query = {
        text: 'INSERT INTO favoritelist_ (favoritelistid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
        values: [favoritelistid, favoriteditem, showtime, timestamp],
      };
  
      await pool.query(query);
      res.status(201).send('Suosikkilista lisätty onnistuneesti');
    } catch (error) {
      console.error('Virhe lisättäessä listaa:', error);
    }
  });
  

// poistaa tietyn suosikkilistan
router.delete('/favoritelist/:favoritelistid', async (req, res) => {
  const favoritelistid = req.params.favoritelistid;
  try {
    const query = {
      text: 'DELETE FROM favoritelist_ WHERE favoritelistid = $1',
      values: [favoritelistid],
    };

    const result = await pool.query(query);
    res.send(`Lista poistettu onnistuneesti ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe poistettaessa listaa:', error);
  }
});

module.exports = router;
*/