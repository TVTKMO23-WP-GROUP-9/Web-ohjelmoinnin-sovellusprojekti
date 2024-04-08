require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const username = jwt.verify(token, process.env.JWT_SECRET).username;
        res.locals.username = username;
        next();
    } catch (error) {
        console.error('Virhe tokenin tarkastuksessa:', error);
        return res.status(403).json({ message: 'Virheellinen token' });
    }
}

module.exports = { auth };