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
  
  // hakee kaikki suosikkilistat profiiliid:llä

  async function getFavoritelistByProfile(req, res) {
    
    const profileid = req.params.profileid;
    try {
        const query = {
            text: `SELECT * FROM favoritelist_ WHERE profileid = $1`,
            values: [profileid],

        };
        const result = await favoritelistModel.queryDatabase(query);
        res.json(result); 
      } catch (error) {
        console.error('Virhe haettaessa tietuetta:', error);
        res.status(500).send('Virhe haettaessa tietuetta');
      }
    }
    

//hakee kaikki suosikkilistat groupid:llä
async function getFavoritelistByGroup(req, res) {
  const groupid = req.params.groupid;
  const mediatype = req.params.mediatype;
  let queryText = `SELECT * FROM favoritelist_ WHERE groupid = $1`;

  // Jos mediatype on ANY, muuta kyselyä vastaavasti
  const queryValues = [groupid];
  if (mediatype === 'ANY') {
    queryText = `SELECT * FROM favoritelist_ WHERE groupid = $1`;
  } else {
    queryText += ` AND mediatype = $2`;
    queryValues.push(mediatype);
  }

  try {
    const query = {
      text: queryText,
      values: queryValues,
    };
    const result = await favoritelistModel.queryDatabase(query);

    res.json(result);

  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
}

  //lisää uuden suosikkilistan profiiliin tai grouppiin
  async function createFavoritelist(req, res) {
    const profileid = res.locals.profileid;

    const { favoriteditem, groupid, mediatype, adult} = req.body;
    try {
        const now = new Date();
        let favoritelistQuery;
        
        if (groupid || profileid) {
            if (groupid) {
                favoritelistQuery = {
                    text: 'INSERT INTO favoritelist_ (groupid, favoriteditem, timestamp, mediatype, adult) VALUES ($1, $2, $3, $4, $5)',
                    values: [groupid, favoriteditem, now, mediatype, adult],
                };
            } else {
                favoritelistQuery = {
                    text: 'INSERT INTO favoritelist_ (profileid, favoriteditem, timestamp, mediatype, adult) VALUES ($1, $2, $3, $4, $5)',
                    values: [profileid, favoriteditem, now, mediatype, adult],
                };
            }
            await favoritelistModel.queryDatabase(favoritelistQuery);
            res.status(201).send('Suosikkilista lisätty onnistuneesti');
        } else {
            res.status(400).send('Profiili- tai ryhmätunniste puuttuu');
        }
    } catch (error) {
        console.error('Virhe lisättäessä suosikkilistaa:', error);
        res.status(500).send('Virhe lisättäessä suosikkilistaa');
    }
  }

  async function deleteFavorite(req, res) {
    const profileid = res.locals.profileid;
    const favoriteditem = req.params.favoriteditem
    const mediatype = req.params.mediatype

    try {
        const query = {
            text: 'DELETE FROM favoritelist_ WHERE profileid = $1 AND favoriteditem = $2 AND mediatype = $3',
            values: [profileid, favoriteditem, mediatype],
        };
            console.log("Profile ID:", req.params.profileid);
            console.log("Favorited Item:", req.params.favoriteditem);

        await favoritelistModel.queryDatabase(query);
        res.send(`Lista poistettu onnistuneesti deletefavorite`);
    } catch (error) {
        console.error('Virhe poistettaessa listaa:', error);
        res.status(500).send('Virhe poistettaessa listaa');
    }
}

async function deleteFavoriteFromGroup(req, res) {
  const profileid = res.locals.profileid;
  const groupid = req.params.groupid;
  const favoriteditem = req.params.favoriteditem;
  const mediatype = req.params.mediatype;

  try {
      const mainuserQuery = {
          text: 'SELECT mainuser FROM memberlist_ WHERE profileid = $1 AND groupid = $2',
          values: [profileid, groupid],
      };
      const mainuserResult = await favoritelistModel.queryDatabase(mainuserQuery);
      const mainuser = mainuserResult[0].mainuser;

      if (mainuser === 1 || mainuser === 0 || res.locals.usertype === 'admin') {
          const query = {
              text: 'DELETE FROM favoritelist_ WHERE groupid = $1 AND favoriteditem = $2 AND mediatype = $3',
              values: [groupid, favoriteditem, mediatype],
          };

          await favoritelistModel.queryDatabase(query);
          res.send(`Lista poistettu onnistuneesti deletefavorite`);
      } else {
          return res.status(403).json({ message: 'Permission denied' });
      }
  } catch (error) {
      console.error('Virhe poistettaessa listaa:', error);
      res.status(500).send('Virhe poistettaessa listaa');
  }
}

    async function deleteFavoritelist(req, res) {
      const groupid = req.params.groupid;
      try {
        const query = {
          text: 'DELETE FROM favoritelist_ WHERE groupid = $1',
          values: [groupid],
        };
    
        const result = await favoritelistModel.queryDatabase(query);
          res.send(`Lista poistettu onnistuneesti asdsa`);
      } catch (error) {
        console.error('Virhe poistettaessa listaa:', error);
        res.status(500).send('Virhe poistettaessa listaa');
      }
    }; 

    async function getFavorite(req, res) {
      const profileid = req.params.profileid;
      const favoriteditem = req.params.favoriteditem;
      const mediatype = req.params.mediatype;
      try {
      const query = {
      text: `SELECT * FROM favoritelist_ WHERE profileid = $1 AND favoriteditem = $2 AND mediatype = $3;`,
      values: [profileid, favoriteditem, mediatype],
      }
        const favoriteListResult = await favoritelistModel.queryDatabase(query);
    
        res.status(200).json({ favorites: favoriteListResult });
      } catch (error) {
        console.error('Virhe haettaessa suosikkilistaa:', error);
        res.status(500).json({ message: 'Virhe haettaessa suosikkilistaa' });
      }
    }
    

  module.exports = {
    getAllFavoritelist,
    createFavoritelist,
    deleteFavorite,
    deleteFavoriteFromGroup,
    deleteFavoritelist,
    getFavoritelistByProfile,
    getFavoritelistByGroup,
    getFavorite,
  };