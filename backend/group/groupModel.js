const pool = require('../database/db_connection');

async function queryDatabase(query) {
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  queryDatabase,
};