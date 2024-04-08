const express = require('express');
const router = express.Router();
const groupService = require('./groupService')

router.use(express.json());

router.get('/group', groupService.getAllGroups);
router.get('/group/groupname/:groupid', groupService.getGroupNameById);
router.get('/group/groupid/:groupname', groupService.getGroupIdByName);
router.get('/group/:groupid', groupService.getGroupById);
router.delete('/group/:groupid', groupService.deleteGroupById);
router.put('/group/:groupid', groupService.updateGroupById);
router.post('/group', groupService.createGroup);
router.post('/memberlist', groupService.createMember);
router.post('/messages', groupService.createMessage);
router.get('/grouplist/:profileid', groupService.getUserGroups);
router.get('/grouplist/profile/:profilename', groupService.getGroupsByProfilename);
router.get('/memberlist/group/:groupid', groupService.GetMemeberList);
router.delete('/memberlist/:groupid', groupService.deleteMemberlist);
router.post('/memberlist', groupService.createMemberList);

module.exports = router;
