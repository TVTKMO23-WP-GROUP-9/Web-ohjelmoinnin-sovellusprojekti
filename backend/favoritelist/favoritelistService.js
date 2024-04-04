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
    const profileid = req.params.profileid;
    const groupid = req.params.profileid;
    try {
      const query = {
  
        //???? 
        text: `
        SELECT fl.*, p.profilename, g.groupname
        FROM favoritelist_ fl
        LEFT JOIN profile_ p ON fl.profileid = p.profileid
        LEFT JOIN group_ g ON fl.groupid = g.groupid
        WHERE fl.idfavoritelist = $1
      `,
        values: [idfavoritelist, profileid, groupid],
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
    const { favoriteditem, showtime, profileid, groupid } = req.body;
      try {
        const now = new Date();
      const favoritelistQuery = {
        text: 'INSERT INTO favoritelist_ (profileid, groupid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING idfavoritelist',
        values: [profileid, groupid, favoriteditem, showtime, now],
    };
  
        const favoritelistResult = await favoritelistModel.queryDatabase(favoritelistQuery);
        const idfavoritelist = favoritelistResult[0].idfavoritelist;
      
        res.status(201).send('Suosikkilista lisätty onnistuneesti');
      } catch (error) {
        console.error('Virhe lisättäessä listaa:', error);
      }
    };
    
  
    async function deleteFavoritelist(req, res) {
      const idfavoritelist = req.params.idfavoritelist;
      try {
        const query = {
          text: 'DELETE FROM favoritelist_ WHERE idfavoritelist = $1',
          values: [idfavoritelist],
        };
    
        const result = await favoritelistModel.queryDatabase(query);
        if (result.rowCount > 0) {
          res.send(`Lista poistettu onnistuneesti`);
        } else {
          res.status(404).send(`Suosikkilistaa ei löytynyt id:llä ${idfavoritelist}`);
        }
      } catch (error) {
        console.error('Virhe poistettaessa listaa:', error);
        res.status(500).send('Virhe poistettaessa listaa');
      }
    };
    
  
  module.exports = {
    getAllFavoritelist,
    getfavoritelist,
    createFavoritelist,
    deleteFavoritelist,
  };