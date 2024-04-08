const express = require('express');
const pool = require('../database/db_connection');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());


// GET-endpoint hakee kaikki tietueet taulusta message_
router.get('/message', async (req, res) => {
  try {
    const query = 'SELECT * FROM "message_"';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Virhe haettaessa tietueita:', error);
    res.status(500).send('Virhe haettaessa tietueita');
  }
});

// GET-endpoint hakee message taulusta message_ annetun messageid-arvon perusteella
router.get('/message/messages/:messageid', async (req, res) => {
  const messageid = req.params.messageid;

  try {
    const query = {
      text: 'SELECT message FROM "message_" WHERE messageid = $1',
      values: [messageid],
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

// GET-endpoint hakee messageid taulusta message_ annetun message-arvon perusteella (Voiko ees tehdä näin kun message niin pitkä?)
router.get('/message/messageid/:message', async (req, res) => {
  const message = req.params.message;

  try {
    const query = {
      text: 'SELECT messageid FROM "message_" WHERE message = $1',
      values: [message],
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

// GET-endpoint hakee tietyn tietueen taulusta message_ annetun messageid-arvon perusteella
router.get('/message/:messageid', async (req, res) => {
  const messageid = req.params.messageid;

  try {
    const query = {
      text: 'SELECT * FROM "message_" WHERE messageid = $1',
      values: [messageid],
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

// DELETE-endpoint poistaa tietueen annetulla messageid-arvolla
router.delete('/messages/:messageid', async (req, res) => {
  const messageid = req.params.messageid;

  try {
    const query = {
      text: 'DELETE FROM "message_" WHERE messageid = $1',
      values: [messageid],
    };

    const result = await pool.query(query);
    res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe poistettaessa tietuetta:', error);
    res.status(500).send('Virhe poistettaessa tietuetta');
  }
});

// PUT-endpoint päivittää tietueen message- ja timestamp-kentät annetulla messageid-arvolla
router.put('/messages/:messageid', async (req, res) => {
  const messageid = req.params.messageid;
  const { message } = req.body; // Otetaan vastaan muutettu viesti

  try {
    const now = new Date(); // Haetaan nykyinen aikaleima
    const query = {
      text: 'UPDATE "message_" SET message = $1, timestamp = $2 WHERE messageid = $3',
      values: [message, now, messageid],
    };

    const result = await pool.query(query);
    res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe päivitettäessä tietuetta:', error);
    res.status(500).send('Virhe päivitettäessä tietuetta');
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
