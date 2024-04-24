const express = require('express');
const router = express.Router();
const profileService = require('./profileService');
const { auth, optionalAuth } = require('../middleware/auth');

// kaikki nämä ovat käytössä
router.get('/profile', profileService.getAllProfiles);
router.get('/profile/id/:profileid', profileService.getProfileById);
router.get('/profile/:profilename', optionalAuth, profileService.getProfileByName);
router.delete('/profile', auth, profileService.deleteProfileById);
router.delete('/admin/deleteprofile/:id', auth, profileService.deleteProfileAsAdmin);
router.put('/profile/nameandemail', auth, profileService.updateProfilenameAndEmail);
router.put('/profile', auth, profileService.updateProfileDetails);
router.put('/profile/visibility', auth, profileService.updateProfileVisibility);
router.put('/profile/k18', auth, profileService.updateProfileAdultcontent);

module.exports = router;