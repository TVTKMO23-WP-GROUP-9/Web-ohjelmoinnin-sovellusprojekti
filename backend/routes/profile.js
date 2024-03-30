const router = require('express').Router(); // Luo reititys

router.get('/profile', (req, res) => { // Määritä reititys
    res.send('All profiles');
});

module.exports = router; // Viedään reititys käytettäväksi