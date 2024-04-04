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
        text: 'SELECT * FROM profile_ WHERE profilename = $1',
        values: [username],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

async function createUser(username, hashedpassword, email) {
    const query = {
        text: 'INSERT INTO profile_ (profilename, hashedpassword, email) VALUES ($1, $2, $3)',
        values: [username, hashedpassword, email],
    };
    await pool.query(query);
}

module.exports = {
    getUserByUsername,
    createUser
};