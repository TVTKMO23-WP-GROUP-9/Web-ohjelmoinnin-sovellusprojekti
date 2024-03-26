require('dotenv').config();
const express = require('express');
const app = express();

const profile = require('./routes/profile'); // Tuo 'user' reitityksen

app.use('/', profile);  // Käytä 'user' reititystä juuressa

const PORT = process.env.PORT || 3001; // Määritä portti

app.listen(PORT, () => { // Käynnistä palvelin
    console.log(`Server running on port ` + PORT);
});

app.get('/', (req, res) => { // Juurireitityksen get-pyyntö
    res.send('Tervetuloa juureen');
});