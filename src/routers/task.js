const express = require('express');
const router = express.Router();
const {listTask, postUpdate, postDeleted} = require('../controllers/task')

router.post('/create_task', listTask)
router.post('/update', postUpdate);
router.post('/delete', postDeleted);
module.exports = router;

