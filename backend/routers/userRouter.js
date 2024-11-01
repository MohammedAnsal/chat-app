const express = require('express');
const { signUp,signIn, searchAllUser } = require('../controllers/userController');
const {protect} = require('../middleware/authMid');

const router = express.Router()

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

router.route('/').get(protect, searchAllUser);

module.exports = router