const express = require('express');
const router = express.Router();
const ParseController = require('../controllers/ParseController');



router.get('/:filename', ParseController.parse);


module.exports = router;