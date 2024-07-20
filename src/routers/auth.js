const express = require('express');
const router = express.Router();

const {postLogin, postRegister} = require('../controllers/user');

router.post('/postLogin', postLogin);

router.post('/postRegister', postRegister);

module.exports = router;