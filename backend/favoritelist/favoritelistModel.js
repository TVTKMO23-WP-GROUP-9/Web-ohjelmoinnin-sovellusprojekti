const { Pool } = require('pg');
// PostgreSQL-yhteysasetukset
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
});

async function queryDatabase(query) {
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Virhe tietokantakyselyssä:', error);
    throw error;
  }
}
  
  module.exports = {
    queryDatabase,
  };