const express = require('express');
const router = express.Router();

// router.use('/auth', require('./auth.js'));

router.use('/users', require('./users.js'));
router.use('/tasks', require('./tasks.js'));


module.exports = router;