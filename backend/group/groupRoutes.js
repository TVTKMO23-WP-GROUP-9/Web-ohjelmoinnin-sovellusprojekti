const express = require('express');
const router = express.Router();
const groupService = require('./groupService')
const { auth, optionalAuth } = require('../middleware/auth');

router.use(express.json());

// kaikki nämä ovat käytössä
router.get('/group', groupService.getAllGroups);
router.get('/group/groupid/:groupname', groupService.getGroupIdByName);
router.get('/group/:groupid', groupService.getGroupById);
router.put('/group/:groupid', groupService.updateGroupById);
router.get('/grouplist/profile/:profilename', groupService.getGroupsByProfilename);
router.get('/memberlist/group/:groupid/:pending', groupService.GetMemberList);
router.get('/messages/:groupid', groupService.getMessagesById);
router.post('/messages', groupService.createMessage);
router.delete('/messages/:messageid', groupService.deleteMessage);
router.get('/memberstatus/:profileid/:groupid', groupService.getMemberStatus);

// ovatko nämä käytössä jossain? en löytänyt näitä!
router.get('/group/groupname/:groupid', groupService.getGroupNameById);
router.post('/group', groupService.createGroup);
router.delete('/group/:groupid', groupService.deleteGroupById);
router.delete('/memberlist/:groupid', groupService.deleteMemberlist);
router.post('/memberlist', groupService.createMemberList);
router.post('/memberlist', groupService.createMember);
router.get('/grouplist/:profileid', groupService.getUserGroups);

module.exports = router;
