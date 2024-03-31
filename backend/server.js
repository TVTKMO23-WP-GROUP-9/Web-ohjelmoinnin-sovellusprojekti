require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();

const profile = require('./routes/profileRoutes'); // Tuo 'profile' reitityksen
const group = require('./routes/groupRoutes'); // Tuo 'group' reitityksen

app.use('/', profile);  // Käytä 'profile' reititystä juuressa
app.use('/', group);  // Käytä 'group' reititystä juuressa

const PORT = process.env.PORT || 3001; // Määritä portti

app.listen(PORT, () => { // Käynnistä palvelin
    console.log(`Server running on port ` + PORT);
});

app.get('/', (req, res) => { // Juurireitityksen get-pyyntö
    res.send('Tervetuloa juureen');
});