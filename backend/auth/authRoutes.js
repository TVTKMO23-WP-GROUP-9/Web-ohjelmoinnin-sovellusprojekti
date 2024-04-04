
const express = require('express');
const authService = require('./authService');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const result = await authService.registerUser(username, password, email);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;