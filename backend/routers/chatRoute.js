const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMid');
const { accessChat, fetchChat, createGroup, renameGroup, removeGroup, addToGroup } = require('../controllers/chatController');

router.route('/group').post(protect, accessChat).get(protect, fetchChat);
router.post('/groupCreate', protect, createGroup);
router.put('/groupRename', protect, renameGroup);
router.put('/groupAdd', protect, addToGroup);
router.put('/groupRemove', protect, removeGroup);

module.exports = router