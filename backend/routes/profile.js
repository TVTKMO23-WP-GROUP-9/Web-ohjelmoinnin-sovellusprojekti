const router = require('express').Router(); // Luo reititys

router.get('/user', (req, res) => { // Määritä reititys
    res.send('All profiles');
});

module.exports = router; // Viedään reititys käytettäväksi