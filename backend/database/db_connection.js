require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Virhe tietokantayhteydessä', err);
    } else {
        console.log('Tietokantayhteys onnistui:', res.rows[0]);
    }
});

module.exports = pool;