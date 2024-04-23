require('dotenv').config();
const express = require('express');
const authService = require('./authService');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');


router.post('/auth/register', async (req, res) => {
    const { username, password, email } = req.body;
    const result = await authService.registerUser(username, password, email);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else if (result.message === 'Käyttäjätunnus varattu') {
        res.status(400).json({ message: result.message });
    } else if (result.message === 'Rekisteröinti epäonnistui') {
        res.status(500).json({ message: result.message });
    }
});

router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    if (result.success) {
        const profileid = await authService.getProfileIdByName(username);
        const usertype = await authService.getUserTypeByUsername(username);
        const token = jwt.sign({ username: username, profileid: profileid, usertype: usertype }, process.env.JWT_SECRET);
        res.status(200).json({ jwtToken: token, usertype: usertype, profileid: profileid});
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.get('/auth/logout', async (req, res) => {
    try {
        //delete req.session.token;
        res.status(200).json({ message: "Kirjaudu ulos onnistui" });
    } catch (error) {
        console.error('Virhe uloskirjautumisessa:', error);
        res.status(500).json({ message: "Uloskirjautumisessa tapahtui virhe" });
    }
});

router.post('/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await authService.forgotPassword(email);
        if (result.success) {
            res.status(200).json({ message: "Salasanan vaihto onnistui" });
        } else {
            res.status(500).json({ message: "Salasanan vaihdossa tapahtui virhe" });
        }
    } catch (error) {
        console.error('Virhe salasanan vaihdossa:', error.message);
        res.status(500).json({ message: "Salasanan vaihdossa tapahtui virhe" });
    }
});

router.put('/auth/password', auth, async (req, res) => {
    const profileid = res.locals.profileid;
    const { password } = req.body;
    const result = await authService.changePassword(password, profileid);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;
