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
  
  // hakee tietyn suosikkilistan profiilista

  async function getFavoritelistByProfile(req, res) {
    const profileid = req.params.profileid;

    try {
        const query = {
            text: `SELECT * FROM favoritelist_ WHERE profileid = $1`,
            values: [profileid]
        };
        const result = await favoritelistModel.queryDatabase(query);

        if (result.rows && result.rows.length > 0) {
          res.json(result.rows);
        } else {
            res.status(404).send(`Suosikkilistaa ei löytynyt profiilista id:llä ${profileid}`);
        }
    } catch (error) {
        console.error('Virhe haettaessa suosikkilistaa profiilista:', error);
    }
}
//hakee tietyn suosikkilistan groupista
async function getFavoritelistByGroup(req, res) {
  const groupId = req.params.groupid;
  try {
      const query = {
          text: 'SELECT * FROM favoritelist_ WHERE groupid = $1',
          values: [groupId],
      };
      const result = await favoritelistModel.queryDatabase(query);

      if (result.rows && result.rows.length > 0) {
          res.json(result.rows);
      } else {
          res.status(404).send('Suosikkilistaa ei löytynyt tällä ryhmällä');
      }
  } catch (error) {
      console.error('Virhe haettaessa suosikkilistaa ryhmän perusteella:', error);
  }
}
// hakee profiilin tai gropin suosikkilistan (EI TOIMI)

  /*async function getfavoritelist (req, res)  {
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
  };*/

  //lisää uuden suosikkilistan profiiliin tai grouppiin
  async function createFavoritelist(req, res) {
    const { favoriteditem, showtime, groupid, profileid } = req.body;
    try {
        const now = new Date();
        let favoritelistQuery;
        if (groupid) {
            favoritelistQuery = {
                text: 'INSERT INTO favoritelist_ (groupid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
                values: [groupid, favoriteditem, showtime, now],
                
            };
        } else if (profileid) {
            favoritelistQuery = {
                text: 'INSERT INTO favoritelist_ (profileid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
                values: [profileid, favoriteditem, showtime, now],
            };
        } else {
            return res.status(400).send('Ryhmän tai profiilin id:tä ei annettu.');
        }
        await favoritelistModel.queryDatabase(favoritelistQuery);
        res.status(201).send('Suosikkilista lisätty onnistuneesti');
    } catch (error) {
        console.error('Virhe lisättäessä suosikkilistaa:', error);
    }
}
/*  // lisää uuden suosikkilistan ryhmään

  async function createGroupFavoritelist(req, res) {
    const {groupid, favoriteditem, showtime } = req.body;
    try {
        const now = new Date();
        const favoritelistQuery = {
            text: 'INSERT INTO favoritelist_ (groupid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
            values: [groupid, favoriteditem, showtime, now],
        };
        await favoritelistModel.queryDatabase(favoritelistQuery);
       
        res.status(201).send('Suosikkilista lisätty ryhmään onnistuneesti');
    } catch (error) {
        console.error('Virhe lisättäessä suosikkilistaa ryhmään:', error);
    }
}

// Lisää uusi suosikkilista profiiliin

async function createProfileFavoritelist(req, res) {
    const { favoriteditem, showtime, profileid } = req.body;
    try {
        const now = new Date();
        const favoritelistQuery = {
            text: 'INSERT INTO favoritelist_ (profileid, favoriteditem, showtime, timestamp) VALUES ($1, $2, $3, $4)',
            values: [profileid, favoriteditem, showtime, now],
        };
        await favoritelistModel.queryDatabase(favoritelistQuery);
        res.status(201).send('Suosikkilista lisätty profiiliin onnistuneesti');
    } catch (error) {
        console.error('Virhe lisättäessä suosikkilistaa profiiliin:', error);
    }
}*/
  
    async function deleteFavoritelist(req, res) {
      const idfavoritelist = req.params.idfavoritelist;
      try {
        const query = {
          text: 'DELETE FROM favoritelist_ WHERE idfavoritelist = $1',
          values: [idfavoritelist],
        };
    
        const result = await favoritelistModel.queryDatabase(query);
          res.send(`Lista poistettu onnistuneesti`);
      } catch (error) {
        console.error('Virhe poistettaessa listaa:', error);
        res.status(500).send('Virhe poistettaessa listaa');
      }
    };
    
  
  module.exports = {
    getAllFavoritelist,
   // getfavoritelist,
    createFavoritelist,
    deleteFavoritelist,
    getFavoritelistByProfile,
    getFavoritelistByGroup,
   // createGroupFavoritelist,
   // createProfileFavoritelist,
  };