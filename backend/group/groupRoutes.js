const express = require('express');
const router = express.Router();
const groupService = require('./groupService')
const { auth, optionalAuth } = require('../middleware/auth');

router.use(express.json());

// kaikki nämä ovat käytössä
router.get('/group', groupService.getAllGroups);
router.get('/group/groupid/:groupname', groupService.getGroupIdByName);
router.get('/group/:groupid', groupService.getGroupById);
router.get('/grouplist/profile/:profilename', groupService.getGroupsByProfilename);
router.get('/memberlist/group/:groupid/:pending', groupService.GetMemberList);

// tämä ehkä käytössä Forum.jsx
router.get('/memberstatus/:profileid/:groupid', groupService.getMemberStatus);

// puuttuu get "/messages/${id}" Forum.jsx


// nämä eivät ole missään käytössä!!! 
router.get('/group/groupname/:groupid', groupService.getGroupNameById);
router.post('/group', groupService.createGroup);
router.delete('/group/:groupid', groupService.deleteGroupById);
router.put('/group/:groupid', groupService.updateGroupById);
router.get('/messages/:groupid', groupService.getMessagesById);
router.post('/messages', groupService.createMessage);
router.delete('/memberlist/:groupid', groupService.deleteMemberlist);
router.post('/memberlist', groupService.createMemberList);
router.post('/memberlist', groupService.createMember);
router.get('/grouplist/:profileid', groupService.getUserGroups);


module.exports = router;
