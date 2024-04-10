require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const profileid = decodedToken.profileid;
        res.locals.username = username;
        res.locals.profileid = profileid;
        next();
    } catch (error) {
        console.error('Virhe tokenin tarkastuksessa:', error);
        return res.status(403).json({ message: 'Virheellinen token' });
    }
}

function optionalAuth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token === undefined) return next();

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const profileid = decodedToken.profileid;
        res.locals.username = username;
        res.locals.profileid = profileid;
        next();
    } catch (error) {
        console.error('Virhe tokenin tarkastuksessa:', error);
        return res.status(403).json({ message: 'Virheellinen token' });
    }
}

module.exports = { auth, optionalAuth };