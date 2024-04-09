const pool = require('../database/db_connection');

async function getAllProfiles() {
    const query = 'SELECT profileid, profilename, email, profilepicurl, timestamp, description FROM "profile_"';
    const result = await pool.query(query);
    return result.rows;
}

async function getProfileById(profileId) {
    const query = {
        text: 'SELECT profileid, profilename, email, profilepicurl, timestamp, description FROM "profile_" WHERE profileid = $1',
        values: [profileId],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function getProfileByName(profilename) {
    const query = {
        text: 'SELECT profileid, profilename, profilepicurl, description, is_private FROM profile_ WHERE profilename = $1',
        values: [profilename],
    };

    const result = await pool.query(query);
    return result.rows[0];
}

async function deleteProfileById(profileid) {
    const query = {
        text: 'DELETE FROM "profile_" WHERE profileid = $1',
        values: [profileid],
    };
    const result = await pool.query(query);
    return result.rowCount;
}

async function updateProfileById(profileid, profilename, email, profilepicurl, description) {
    const now = new Date();
    const query = {
        text: 'UPDATE "profile_" SET profilename = $2, email = $3, profilepicurl = $4, timestamp = $5, description = $6 WHERE profileid = $1',
        values: [profileid, profilename, email, profilepicurl, now, description],
    };
    const result = await pool.query(query);
    return result.rowCount;
}

async function updateProfileDetails(profileid, profilepicurl, description) {
    const now = new Date();
    const query = {
        text: 'UPDATE Profile_ SET profilepicurl = $2, timestamp = $3, description = $4 WHERE profileid = $1',
        values: [profileid, profilepicurl, now, description],
    };
    const result = await pool.query(query);
    return result.rowCount;
}

module.exports = {
    getAllProfiles,
    getProfileById,
    getProfileByName,
    deleteProfileById,
    updateProfileById,
    updateProfileDetails
};