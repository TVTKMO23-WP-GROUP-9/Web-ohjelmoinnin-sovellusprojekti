const express = require('express');
const router = express.Router();
const profileService = require('./profileService');
const { auth, optionalAuth } = require('../middleware/auth');


router.get('/profile', async (req, res) => {
    const result = await profileService.getAllProfiles();
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.get('/profile/id/:profileid', async (req, res) => {
    const profileid = req.params.profileid;
    const result = await profileService.getProfileById(profileid);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.get('/profile/:profilename', optionalAuth, async (req, res) => {
    const loggedInUsername = res.locals.username;
    const requestedProfileName = req.params.profilename;
    
    const isOwnProfile = loggedInUsername === requestedProfileName;

    const result = await profileService.getProfileByName(requestedProfileName, loggedInUsername);

    if (result.success) {
        result.message.isOwnProfile = isOwnProfile;
        res.status(200).json(result.message);
    } else {
        res.status(400).json({ message: result.message });
    }    
}); 

router.delete('/profile', auth, async (req, res) => {
    const profileid = res.locals.profileid;
    const result = await profileService.deleteProfileById(profileid);
    if (result.success) {
        res.status(200).json({ message: `Tietue poistettu onnistuneesti: ${result.message}` });
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.put('/profile', auth, async (req, res) => {
    const profileid = res.locals.profileid;
    const { profilepicurl, description } = req.body;
    const result = await profileService.updateProfileDetails(profileid, profilepicurl, description);
    if (result.success) {
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti: ${result.message}` });
    } else {
        res.status(400).json({ message: result.message });
    }
});

router.put('/profile', auth, async (req, res) => {
    const profileid = res.locals.profileid;
    const { profilename, email, profilepicurl, description } = req.body;
    const result = await profileService.updateProfileById(profileid, profilename, email, profilepicurl, description);
    if (result.success) {
        res.status(200).json({ message: `Tietue päivitetty onnistuneesti: ${result.message}` });
    } else {
        res.status(400).json({ message: result.message });
    }
});

module.exports = router;