const pool = require('../database/db_connection');

async function getAllProfiles() {
    const query = 'SELECT profileid, profilename, email, profilepicurl, timestamp, description, is_private FROM Profile_';
    const result = await pool.query(query);
    return result.rows;
}

async function getProfileById(profileId) {
    const query = {
        text: 'SELECT * FROM Profile_ WHERE profileid = $1',
        values: [profileId],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function getProfileByName(profilename) {
    
    const query = {
        text: 'SELECT * FROM Profile_ WHERE profilename = $1',
        values: [profilename],
    };

    const result = await pool.query(query);
    return result.rows[0];
}

async function deleteProfileById(profileid) {
    try {
        console.log('deleteProfileById', profileid);
        await pool.query('BEGIN');
        const query1 = {
            text: 'DELETE FROM Memberlist_ WHERE profileid = $1',
            values: [profileid],
        };
        // Poista ryhmät, joissa ei ole jäseniä
        const query2 = {
            text: 'DELETE FROM Group_ WHERE groupid NOT IN (SELECT DISTINCT groupid FROM Memberlist_)',
            values: [],
        };
        const query3 = {
            text: 'DELETE FROM Profile_ WHERE profileid = $1',
            values: [profileid],
        };
        const result = await pool.query(query1);
        await pool.query(query2);
        await pool.query(query3);
        await pool.query('COMMIT');
        console.log('deleteProfileById result', result);
        return result.rowCount;
    }
    catch (error) {
        await pool.query('ROLLBACK');
        throw error; 
    }
} 
  
async function updateProfilenameAndEmail(profileid, profilename, email) {
    const now = new Date();
    const query = {
        text: 'UPDATE Profile_ SET profilename = $2, email = $3, timestamp = $4 WHERE profileid = $1',
        values: [profileid, profilename, email, now],
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

async function updateProfileVisibility(profileid, is_private) {
    const query = {
        text: 'UPDATE "profile_" SET is_private = $2 WHERE profileid = $1',
        values: [profileid, is_private],
    };
    const result = await pool.query(query);
    return result.rowCount;
}

async function updateProfileAdultcontent(profileid, adult) {
    const query = {
        text: 'UPDATE "profile_" SET adult = $2 WHERE profileid = $1',
        values: [profileid, adult],
    };
    const result = await pool.query(query);
    return result.rowCount;
}

module.exports = {
    getAllProfiles,
    getProfileById,
    getProfileByName,
    deleteProfileById,
    updateProfilenameAndEmail,
    updateProfileDetails,
    updateProfileVisibility,
    updateProfileAdultcontent
};