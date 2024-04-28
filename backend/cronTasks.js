const cron = require('node-cron');
const pool = require('./database/db_connection');

cron.schedule('0 */12 * * *', async () => {
    try {
        const query = {
            text: 'DELETE FROM Event_ WHERE exp_date < NOW()',
        };
        const result = await pool.query(query);
        console.log('Poistettiin vanhentuneet tapahtumat:', result.rowCount);
    } catch (error) {
        console.error('Virhe tapahtumien poistamisessa:', error);
    }
});