const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// PostgreSQL-yhteysasetukset
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
});

// GET-endpoint hakee kaikki tietueet taulusta Group_
router.get('/group', async (req, res) => {
  try {
    const query = 'SELECT * FROM "group_"';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Virhe haettaessa tietueita:', error);
    res.status(500).send('Virhe haettaessa tietueita');
  }
});

// GET-endpoint hakee groupname taulusta Group_ annetun groupid-arvon perusteella
router.get('/group/groupname/:groupid', async (req, res) => {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'SELECT groupname FROM "group_" WHERE groupid = $1',
      values: [groupid],
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('nimeä ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
});

// GET-endpoint hakee groupid taulusta Group_ annetun groupname-arvon perusteella
router.get('/group/groupid/:groupname', async (req, res) => {
  const groupname = req.params.groupname;

  try {
    const query = {
      text: 'SELECT groupid FROM "group_" WHERE groupname = $1',
      values: [groupname],
    };

    const result = await pool.query(query);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('id:tä ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
});

// GET-endpoint hakee tietyn tietueen taulusta Group_ annetun groupid-arvon perusteella
router.get('/group/:groupid', async (req, res) => {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'SELECT * FROM "group_" WHERE groupid = $1',
      values: [groupid],
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

// DELETE-endpoint poistaa tietueen annetulla groupid-arvolla
router.delete('/group/:groupid', async (req, res) => {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'DELETE FROM "group_" WHERE groupid = $1',
      values: [groupid],
    };

    const result = await pool.query(query);
    res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe poistettaessa tietuetta:', error);
    res.status(500).send('Virhe poistettaessa tietuetta');
  }
});

// PUT-endpoint päivittää tietueen groupexplanation- ja timestamp-kentät annetulla groupid-arvolla
router.put('/group/:groupid', async (req, res) => {
  const groupid = req.params.groupid;
  const { groupexplanation } = req.body; // Otetaan vastaan uusi groupexplanation

  try {
    const now = new Date(); // Haetaan nykyinen aikaleima
    const query = {
      text: 'UPDATE "group_" SET groupexplanation = $1, timestamp = $2 WHERE groupid = $3',
      values: [groupexplanation, now, groupid],
    };

    const result = await pool.query(query);
    res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe päivitettäessä tietuetta:', error);
    res.status(500).send('Virhe päivitettäessä tietuetta');
  }
});

router.post('/group', async (req, res) => {
  const { groupname, groupexplanation, profileid } = req.body;

  try {
    const now = new Date(); // Haetaan nykyinen aikaleima

    // Lisätään uusi tietue Group_-tauluun
    const groupQuery = {
      text: 'INSERT INTO "group_" (groupname, groupexplanation, timestamp) VALUES ($1, $2, $3) RETURNING groupid',
      values: [groupname, groupexplanation, now],
    };
    
    const groupResult = await pool.query(groupQuery);
    const groupid = groupResult.rows[0].groupid;

    // Lisätään uusi tietue Memberlist-tauluun
    const memberListQuery = {
      text: 'INSERT INTO "memberlist_" (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
      values: [profileid, 1, groupid, 0],
    };

    await pool.query(memberListQuery);

    res.send('Uusi tietue lisätty onnistuneesti');
  } catch (error) {
    console.error('Virhe lisättäessä uutta tietuetta:', error);
    res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
  }
});

router.post('/memberlist', async (req, res) => {
  const { profileid, mainuser, groupid, pending } = req.body;

  try {
    // Lisätään uusi tietue Memberlist-tauluun
    const memberListQuery = {
      text: 'INSERT INTO memberlist_ (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
      values: [profileid, mainuser, groupid, pending],
    };

    await pool.query(memberListQuery);

    res.send('Uusi tietue lisätty onnistuneesti');
  } catch (error) {
    console.error('Virhe lisättäessä uutta tietuetta:', error);
    res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
  }
});

router.post('/messages', async (req, res) => {
  const { profileid, groupid, message } = req.body;

  try {
    // Lisätään uusi tietue Memberlist-tauluun
    const now = new Date(); // Haetaan nykyinen aikaleima
    const memberListQuery = {
      text: 'INSERT INTO message_ (profileid, groupid, message, timestamp) VALUES ($1, $2, $3, $4)',
      values: [profileid, groupid, message, now],
    };

    await pool.query(memberListQuery);

    res.send('Uusi tietue lisätty onnistuneesti');
  } catch (error) {
    console.error('Virhe lisättäessä uutta tietuetta:', error);
    res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
  }
});
module.exports = router;
