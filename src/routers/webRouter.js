const express = require('express');
const router = express.Router();
const {home, login, register, create, edit, logout, deleted} = require('../controllers/homeController');

router.get('/', home);
router.get('/login', login);
router.get('/register', register);
router.get('/addTask', create);
router.get('/logout', logout)
router.get('/edit/:id', edit)
router.post('/delete/:id', deleted)
module.exports = router;