require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();

const profile = require('./routes/profileRoutes'); // Tuo 'profile' reitityksen
const group = require('./routes/groupRoutes'); // Tuo 'group' reitityksen
const register = require('./routes/authRoutes'); // Tuo 'register' reitityksen
const login = require('./routes/authRoutes'); // Tuo 'login' reitityksen
const search = require('./routes/movieRoutes'); // Tuo 'search' reitityksen
const discover = require('./routes/movieRoutes'); // Tuo 'discover' reitityksen

app.use(cors({ origin: 'http://localhost:5173' })); // sallii CORS-pyynnöt alkuperästä localhost:5173 (react)

app.use('/', profile);  // Käytä 'profile' reititystä juuressa
app.use('/', group);  // Käytä 'group' reititystä juuressa
// REGISTER, LOGIN, LOGOUT(puuttuu):
app.use('/', register); // Käytä 'register' reititystä juuressa
app.use('/', login); // Käytä 'login' reititystä juuressa
// TMDB:
app.use('/', search); // Käytä 'search' reititystä juuressa
app.use('/', discover); // Käytä 'discover' reititystä juuressa

const PORT = process.env.PORT || 3001; // Määritä portti

app.listen(PORT, () => { // Käynnistä palvelin
    console.log(`Server running on port ` + PORT);
});

app.get('/', (req, res) => { // Juurireitityksen get-pyyntö
    res.send('Tervetuloa juureen');
});