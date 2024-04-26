const pool = require('../database/db_connection');

async function getGroupEvents(groupid) {
    const query = {
        text: 'SELECT eventid, event_info, exp_date FROM Event_ WHERE groupid = $1',
        values: [groupid],
    };
    const result = await pool.query(query);
    return result.rows;
}

async function addEvent(groupid, event_info, exp_date) {
    const query = {
        text: 'INSERT INTO Event_ ( groupid, event_info, exp_date) VALUES ($1, $2, $3)',
        values: [groupid, event_info, exp_date],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function deleteEvent(eventid) {
    const query = {
        text: 'DELETE FROM Event_ WHERE eventid = $1',
        values: [eventid],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    getGroupEvents,
    addEvent,
    deleteEvent,
};