const favoritelistModel = require('./favoritelistModel');

// hakee kaikki suosikkilistat
async function getAllFavoritelist (req, res)  {
    try {
      const query = 'SELECT * FROM favoritelist_';
      const favoritelist = await favoritelistModel.queryDatabase(query);
      res.json(favoritelist);
    } catch (error) {
      console.error('Virhe haettaessa Listaa:', error);
    }
  };
  
  // hakee tietyn suosikkilistan profiilista tai groupista
  async function getfavoritelist (req, res)  {
    const idfavoritelist = req.params.idfavoritelist;
    try {
      const query = {
  
        //???? 
        text: `
        SELECT fl.*, p.profilename, g.groupname
        FROM favoritelist_ fl
        LEFT JOIN profile_ p ON fl.profileid = p.id
        LEFT JOIN group_ g ON fl.groupid = g.id
        WHERE fl.idfavoritelist = $1
      `,
        values: [idfavoritelist],
      };
  
      const result = await favoritelistModel.queryDatabase(query);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Listaa ei löytynyt');
      }
    } catch (error) {
      console.error('Virhe haettaessa Listaa:', error);
    }
  };
  
  // lisää uuden suosikkilistan
  async function createFavoritelist (req, res)  {
      try {
        const { idfavoritelist, favoriteditem, showtime, timestamp } = req.body;
        const now = new Date();
        
        const favoritelistQuery = {
          text: 'INSERT INTO "favoritelist" (idfavoritelist, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
          values: [idfavoritelist, favoriteditem, showtime, now],
        };
    
        const favoritelistResult = await favoritelistModel.queryDatabase(query);
        res.status(201).send('Suosikkilista lisätty onnistuneesti');
      } catch (error) {
        console.error('Virhe lisättäessä listaa:', error);
      }
    };
    
  
  // poistaa tietyn suosikkilistan
  async function deleteFavoritelist (req, res)  {
    const idfavoritelist = req.params.idfavoritelist;
    try {
      const query = {
        text: 'DELETE FROM favoritelist_ WHERE idfavoritelist = $1',
        values: [idfavoritelist],
      };
  
      const result = await favoritelistModel.queryDatabase(query);
      res.send(`Lista poistettu onnistuneesti ${result.rowCount}`);
    } catch (error) {
      console.error('Virhe poistettaessa listaa:', error);
    }
  };
  
  module.exports = {
    getAllFavoritelist,
    getfavoritelist,
    createFavoritelist,
    deleteFavoritelist,
  };