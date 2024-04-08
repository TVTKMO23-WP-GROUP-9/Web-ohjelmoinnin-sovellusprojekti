const groupModel = require('./groupModel');


// GET-endpoint hakee groupname taulusta Group_ annetun groupid-arvon perusteella
async function getAllGroups(req, res) {
  try {
    const query = 'SELECT * FROM group_';
    const groups = await groupModel.queryDatabase(query);
    res.json(groups);
  } catch (error) {
    console.error('Virhe haettaessa tietueita:', error);
    res.status(500).send('Virhe haettaessa tietueita');
  }
}

// GET-endpoint hakee groupname taulusta Group_ annetun groupid-arvon perusteella
async function getGroupNameById(req, res) {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'SELECT groupname FROM group_ WHERE groupid = $1',
      values: [groupid],
    };

    const result = await groupModel.queryDatabase(query);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('nimeä ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
}

// GET-endpoint hakee groupid taulusta Group_ annetun groupname-arvon perusteella
async function getGroupIdByName(req, res) {
  const groupname = req.params.groupname;

  try {
    const query = {
      text: 'SELECT groupid FROM group_ WHERE groupname = $1',
      values: [groupname],
    };

    const result = await groupModel.queryDatabase(query);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('id:tä ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
}

// GET-endpoint hakee tietyn tietueen taulusta Group_ annetun groupid-arvon perusteella
async function getGroupById(req, res) {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'SELECT * FROM group_ WHERE groupid = $1',
      values: [groupid],
    };

    const result = await groupModel.queryDatabase(query);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('Tietuetta ei löytynyt');
    }
  } catch (error) {
    console.error('Virhe haettaessa tietuetta:', error);
    res.status(500).send('Virhe haettaessa tietuetta');
  }
}

// DELETE-endpoint poistaa tietueen annetulla groupid-arvolla
async function deleteGroupById(req, res) {
  const groupid = req.params.groupid;

  try {
    const query = {
      text: 'DELETE FROM group_ WHERE groupid = $1',
      values: [groupid],
    };

    const result = await groupModel.queryDatabase(query);
    res.send(`Tietue poistettu onnistuneesti: ${result.rowCount}`);
  } catch (error) {
    console.error('Virhe poistettaessa tietuetta:', error);
    res.status(500).send('Virhe poistettaessa tietuetta');
  }
}

// PUT-endpoint päivittää tietueen groupexplanation- ja timestamp-kentät annetulla groupid-arvolla
  async function updateGroupById(req, res) {
    const groupid = req.params.groupid;
    const { groupexplanation } = req.body;
  
    try {
      const now = new Date();
      const query = {
        text: 'UPDATE group_ SET groupexplanation = $1, timestamp = $2 WHERE groupid = $3',
        values: [groupexplanation, now, groupid],
      };
  
      const result = await groupModel.queryDatabase(query);
      res.send(`Tietue päivitetty onnistuneesti: ${result.rowCount}`);
    } catch (error) {
      console.error('Virhe päivitettäessä tietuetta:', error);
      res.status(500).send('Virhe päivitettäessä tietuetta');
    }
  }
  
  async function createGroup(req, res) {
    const { groupname, groupexplanation, profileid } = req.body;
  
    try {
      const now = new Date();
      const groupQuery = {
        text: 'INSERT INTO group_ (groupname, groupexplanation, timestamp) VALUES ($1, $2, $3) RETURNING groupid',
        values: [groupname, groupexplanation, now],
      };
      
      const groupResult = await groupModel.queryDatabase(groupQuery);
      const groupid = groupResult[0].groupid;
  
      const memberListQuery = {
        text: 'INSERT INTO memberlist_ (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
        values: [profileid, 1, groupid, 0],
      };
  
      await groupModel.queryDatabase(memberListQuery);
  
      res.send('Uusi tietue lisätty onnistuneesti');
    } catch (error) {
      console.error('Virhe lisättäessä uutta tietuetta:', error);
      res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
    }
  }
  
  async function createMember(req, res) {
    const { profileid, mainuser, groupid, pending } = req.body;
  
    try {
      const memberListQuery = {
        text: 'INSERT INTO memberlist_ (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
        values: [profileid, mainuser, groupid, pending],
      };
  
      await groupModel.queryDatabase(memberListQuery);
  
      res.send('Uusi tietue lisätty onnistuneesti');
    } catch (error) {
      console.error('Virhe lisättäessä uutta tietuetta:', error);
      res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
    }
  }
  
  async function createMessage(req, res) {
    const { profileid, groupid, message } = req.body;
  
    try {
      const now = new Date();
      const messageQuery = {
        text: 'INSERT INTO message_ (profileid, groupid, message, timestamp) VALUES ($1, $2, $3, $4)',
        values: [profileid, groupid, message, now],
      };
  
      await groupModel.queryDatabase(messageQuery);
  
      res.send('Uusi tietue lisätty onnistuneesti');
    } catch (error) {
      console.error('Virhe lisättäessä uutta tietuetta:', error);
      res.status(500).send('Virhe lisättäessä uutta tietuetta ' + error.message);
    }
  }

// GET user groups (ryhmälista käyttäjän profiilisivulle)
async function getUserGroups(req, res) {
  const profileid = req.params.profileid; 

  try {
    const grouplistQuery = {
      text: `
        SELECT g.groupname FROM Group_ g
        INNER JOIN Memberlist_ m ON g.groupid = m.groupid
        WHERE m.profileid = $1;
      `,
      values: [profileid],
    };

    const result = await groupModel.queryDatabase(grouplistQuery);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('Ryhmää ei löytynyt käyttäjälle');
    }
  } catch (error) {
    console.error('Virhe haettaessa käyttäjän ryhmiä:', error);
    res.status(500).send('Virhe haettaessa käyttäjän ryhmiä');
  }
}


// GET groups by profilename (ryhmälista käyttäjän profiilisivulle)
async function getGroupsByProfilename(req, res) {
  const profilename = req.params.profilename; 

  try {
    const grouplistQuery = {
      text: `
        SELECT g.groupname FROM Group_ g
        INNER JOIN Memberlist_ m ON g.groupid = m.groupid
        INNER JOIN Profile_ p ON m.profileid = p.profileid
        WHERE p.profilename = $1;
      `,
      values: [profilename],
    };

    const result = await groupModel.queryDatabase(grouplistQuery);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('Ryhmää ei löytynyt käyttäjälle');
    }
  } catch (error) {
    console.error('Virhe haettaessa käyttäjän ryhmiä:', error);
    res.status(500).send('Virhe haettaessa käyttäjän ryhmiä');
  }
}
// Hakee tietyn groupin memberlistin
async function GetMemeberList(req, res) {
  const groupid = req.params.groupid;
  try {
    const query = {
        text: `SELECT * FROM memberlist_ WHERE groupid = $1`,
        values: [groupid],
    };
    const result = await groupModel.queryDatabase(query);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send('groupid:llä ei löytynyt jäsenluetteloa');
    }
  } catch (error) {
    console.error('Virhe haettaessa jäsenluetteloa:', error);
    res.status(500).send('Virhe haettaessa jäsenluetteloa');
  }
}
// poistetaan memberlist tietyltä groupilta
async function deleteMemberlist(req, res) {
  const memberlist = req.params.groupid;
  try {
    const query = {
      text: 'DELETE FROM Memberlist_ WHERE groupid = $1',
      values: [memberlist],
    };

    const result = await groupModel.queryDatabase(query);
      res.send(`jäsenluettelo poistettu onnistuneesti`);
  } catch (error) {
    console.error('Virhe poistettaessa jäsenluetteloa:', error);
    res.status(500).send('Virhe poistettaessa jäsenluetteloa');
  }
};
// luodaan memberlist tietylle groupille
async function createMemberList(req, res) {
  const { profileid, mainuser, groupid, pending } = req.body;

  try {
    const query = {
      text: 'INSERT INTO memberlist_ (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
      values: [profileid, mainuser, groupid, pending],
    };
    await groupModel.queryDatabase(query);

    res.status(201).send('Jäsen lisätty onnistuneesti ryhmään');
  } catch (error) {
    console.error('Virhe lisättäessä jäsentä ryhmään:', error);
    res.status(500).send('Virhe lisättäessä jäsentä ryhmään');
  }
}


  module.exports = {
    getAllGroups,
    getGroupNameById,
    getGroupIdByName,
    getGroupById,
    deleteGroupById,
    updateGroupById,
    createGroup,
    createMember,
    createMessage,
    getUserGroups,
    getGroupsByProfilename,
    GetMemeberList,
    deleteMemberlist,
    createMemberList
  };