// routes/groupRoutes.js
const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

// PostgreSQL-yhteysasetukset
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET-endpoint hakee kaikki tietueet taulusta Group
router.get('/group', async (req, res) => {
    try {
      const query = 'SELECT * FROM "Group"';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Virhe haettaessa tietueita:', error);
      res.status(500).send('Virhe haettaessa tietueita');
    }
  });
  
  // GET-endpoint hakee tietyn tietueen taulusta Group annetun groupname-arvon perusteella
  router.get('/group/:groupname', async (req, res) => {
    const groupName = req.params.groupname;
  
    try {
      const query = {
        text: 'SELECT * FROM "Group" WHERE groupname = $1',
        values: [groupName],
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

// DELETE-endpoint poistaa tietueen annetulla groupname-arvolla
router.delete('/group/:groupname', async (req, res) => {
  const groupName = req.params.groupname;

  try {
    const query = {
      text: 'DELETE FROM "Group" WHERE groupname = $1',
      values: [groupName],
    };

    const result = await pool.query(query);
    res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe poistettaessa tietuetta:', error);
    res.status(500).send('Virhe poistettaessa tietuetta');
  }
});

// PUT-endpoint päivittää tietueen groupexplanation- ja timestamp-kentät annetulla groupname-arvolla
router.put('/group/:groupname', async (req, res) => {
    const groupName = req.params.groupname;
    const { groupexplanation } = req.body; // Otetaan vastaan uusi groupexplanation
  
    try {
      const now = new Date(); // Haetaan nykyinen aikaleima
      const query = {
        text: 'UPDATE "Group" SET groupexplanation = $1, modified_at = $2 WHERE groupname = $3',
        values: [groupexplanation, now, groupName],
      };
  
      const result = await pool.query(query);
      res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
    } catch (error) {
      console.error('Virhe päivitettäessä tietuetta:', error);
      res.status(500).send('Virhe päivitettäessä tietuetta');
    }
});

// POST-endpoint luo uuden tietueen Group- ja Memberlist-tauluihin
router.post('/group', async (req, res) => {
    const { groupname, groupexplanation, profilename } = req.body;
  
    try {
      const now = new Date(); // Haetaan nykyinen aikaleima
  
      // Lisätään uusi tietue Group-tauluun
      const groupQuery = {
        text: 'INSERT INTO "Group" (groupname, groupexplanation, modified_at) VALUES ($1, $2, $3)',
        values: [groupname, groupexplanation, now],
      };
  
      await pool.query(groupQuery);
  
      // Lisätään uusi tietue Memberlist-tauluun
      const memberListQuery = {
        text: 'INSERT INTO Memberlist (profilename, mainuser, groupname, pending) VALUES ($1, $2, $3, $4)',
        values: [profilename, 1, groupname, 0],
      };
  
      await pool.query(memberListQuery);
  
      res.send('Uusi tietue lisätty onnistuneesti');
    } catch (error) {
      console.error('Virhe lisättäessä uutta tietuetta:', error);
      res.status(500).send('Virhe lisättäessä uutta tietuetta');
    }
  });

module.exports = router;
