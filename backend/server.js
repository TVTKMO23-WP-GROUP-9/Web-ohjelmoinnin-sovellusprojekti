require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//const profile = require(origin: './routes/profileRoutes', credentials: true); // Tuo 'profile' reitityksen
const group = require('./group/groupRoutes'); // Tuo 'group' reitityksen
const favoritelist = require('./favoritelist/favoritelistRoutes'); // tuo 'favoritelist' reitityksen
const profile = require('./profile/profileRoutes'); // Tuo 'profile' reitityksen
const register = require('./auth/authRoutes'); // Tuo 'register' reitityksen
const login = require('./auth/authRoutes'); // Tuo 'login' reitityksen
const search = require('./movie/movieRoutes'); // Tuo 'search' reitityksen
const discover = require('./movie/movieRoutes'); // Tuo 'discover' reitityksen
const find = require('./movie/movieRoutes'); // Tuo 'find' reitityksen
const movie = require('./movie/movieRoutes'); // Tuo 'movie' reitityksen
const review = require('./review/reviewRoutes'); // Tuo 'review' reitityksen
const event = require('./event/eventRoutes'); // Tuo 'event' reitityksen

//app.use(cors({ origin: 'http://localhost:5173' })); // sallii CORS-pyynnöt alkuperästä localhost:5173 (react)
app.use('/', profile);  // Käytä 'profile' reititystä juuressa
app.use('/', group);  // Käytä 'group' reititystä juuressa
app.use('/', register); // Käytä 'register' reititystä juuressa
app.use('/', login); // Käytä 'login' reititystä juuressa
app.use('/', favoritelist); // käytä 'favoritelist' reititystä juuressa
// TMDB:
app.use('/', search); // Käytä 'search' reititystä juuressa
app.use('/', discover); // Käytä 'discover' reititystä juuressa
app.use('/', find); // Käytä 'find' reititystä juuressa
app.use('/', movie); // Käytä 'movie' reititystä juuressa
app.use('/', review); // Käytä 'review' reititystä juuressa
app.use('/', event); // Käytä 'event' reititystä juuressa

const PORT = process.env.PORT || 3001; // Määritä portti

app.listen(PORT, () => { // Käynnistä palvelin
    console.log(`Server running on port ` + PORT);
});

app.get('/', (req, res) => { // Juurireitityksen get-pyyntö
    res.send('Tervetuloa juureen');
});