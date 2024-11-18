const express = require('express');
const router = express.Router();
const {createTask, postUpdate, postDeleted} = require('../controllers/task')

router.post('/create_task', createTask)
router.post('/update', postUpdate);
router.post('/delete', postDeleted);
module.exports = router;

