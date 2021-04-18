const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bouncer = require('../middlewares/bouncer');

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);

module.exports = router;

