const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

async function getUserByUsername(username) {
    const query = {
        text: 'SELECT * FROM Profile_ WHERE profilename = $1',
        values: [username],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function createUser(username, hashedpassword) {
    const query = {
        text: 'INSERT INTO Profile_ (profilename, hashedpassword) VALUES ($1, $2)',
        values: [username, hashedpassword],
    };
    await pool.query(query);
}

module.exports = {
    getUserByUsername,
    createUser
};