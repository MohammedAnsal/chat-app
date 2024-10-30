const express = require('express');
const { signUp } = require('../controllers/userController');

const router = express()

router.post('/sign-up', signUp)


module.exports = router