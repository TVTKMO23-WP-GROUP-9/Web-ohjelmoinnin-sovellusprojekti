const express = require('express');
const router = express.Router();
const eventService = require('./eventService');
const { auth } = require('../middleware/auth');

router.get('/event/:groupid', auth, eventService.getGroupEvents);
router.post('/event', auth, eventService.addEvent);
router.delete('/event/:eventid', auth, eventService.deleteEvent);

module.exports = router;