const pool = require('../database/db_connection');

async function queryDatabase(query) {
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getAllGroups() {
    const query = 'SELECT * FROM group_';
    return queryDatabase(query);
}

async function getGroupNameById(groupid) {
    const query = {
        text: 'SELECT groupname FROM group_ WHERE groupid = $1',
        values: [groupid],
    };
    return queryDatabase(query);
}

async function getGroupIdByName(groupname) {
    const query = {
        text: 'SELECT groupid FROM group_ WHERE groupname = $1',
        values: [groupname],
    };
    return queryDatabase(query);
}

async function getGroupById(groupid) {
    const query = {
        text: 'SELECT * FROM Group_ WHERE groupid = $1',
        values: [groupid],
    };
    const result = await pool.query(query);
    return result.rows[0];


}

async function deleteGroupById(groupid) {
    const query = {
        text: 'DELETE FROM group_ WHERE groupid = $1',
        values: [groupid],
    };
    return queryDatabase(query);
}

async function updateGroupById(groupid, grouppicurl, groupexplanation) {
    const now = new Date();
    const query = {
        text: 'UPDATE group_ SET grouppicurl = $2, groupexplanation = $3, timestamp = $4 WHERE groupid = $1',
        values: [groupid, grouppicurl, groupexplanation, now],
    };
    return queryDatabase(query);
}

async function createGroup(groupname, groupexplanation) {
    const now = new Date();
    const query = {
        text: 'INSERT INTO group_ (groupname, groupexplanation, timestamp) VALUES ($1, $2, $3) RETURNING groupid',
        values: [groupname, groupexplanation, now],
    };
    return queryDatabase(query);
}

async function createMember(groupid, mainuser, profileid, pending) {
    const query = {
        text: 'INSERT INTO memberlist_ (groupid, mainuser, profileid, pending) VALUES ($1, $2, $3, $4)',
        values: [groupid, mainuser, profileid, pending],
    };
    return queryDatabase(query);
}

async function createMessage(profileid, groupid, message) {
    const now = new Date();
    const query = {
        text: 'INSERT INTO message_ (profileid, groupid, message, timestamp) VALUES ($1, $2, $3, $4)',
        values: [profileid, groupid, message, now],
    };
    return queryDatabase(query);
}

async function deleteMessage(messageid) {
    const query = {
        text: 'DELETE FROM message_ WHERE messageid = $1',
        values: [messageid],
    };
    return queryDatabase(query);
}

async function getUserGroups(profileid) {
    const query = {
        text: `
            SELECT g.groupname FROM Group_ g
            INNER JOIN Memberlist_ m ON g.groupid = m.groupid
            WHERE m.profileid = $1;
        `,
        values: [profileid],
    };
    return queryDatabase(query);
}

async function getGroupsByProfilename(profilename) {
    const query = {
        text: `
            SELECT * FROM Group_ g
            INNER JOIN Memberlist_ m ON g.groupid = m.groupid
            INNER JOIN Profile_ p ON m.profileid = p.profileid
            WHERE p.profilename = $1;
        `,
        values: [profilename],
    };
    return queryDatabase(query);
}

async function GetMemberList(groupid, pending) {
    const query = {
        text: `SELECT * FROM memberlist_ WHERE groupid = $1 AND pending = $2`,
        values: [groupid, pending],
    };
    return queryDatabase(query);
}

async function getMemberStatus(profileid, groupid) {
    const query = {
        text: `SELECT * FROM memberlist_ WHERE profileid = $1 AND groupid = $2`,
        values: [profileid, groupid],
    };
    return queryDatabase(query);
}

async function deleteMember(memberlistid) {
    const query = {
        text: 'DELETE FROM memberlist_ WHERE memberlistid = $1',
        values: [memberlistid],
    };
    return queryDatabase(query);
}

async function createMemberList(profileid, mainuser, groupid, pending) {
    const query = {
        text: 'INSERT INTO memberlist_ (profileid, mainuser, groupid, pending) VALUES ($1, $2, $3, $4)',
        values: [profileid, mainuser, groupid, pending],
    };
    return queryDatabase(query);
}

async function getMessagesById(groupid) {
  const query = {
      text: 'SELECT * FROM message_ WHERE groupid = $1',
      values: [groupid],
  };
  return queryDatabase(query);
}

module.exports = {
    queryDatabase,
    getAllGroups,
    getGroupNameById,
    getGroupIdByName,
    getGroupById,
    deleteGroupById,
    updateGroupById,
    createGroup,
    createMember,
    createMessage,
    deleteMessage,
    getUserGroups,
    getGroupsByProfilename,
    GetMemberList,
    getMemberStatus,
    deleteMember,
    createMemberList,
    getMessagesById,
    deleteMessage
};