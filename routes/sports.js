const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const SportsController = require('../controllers/SportsController');

router.get('/getLosers', SportsController.getLosers);

module.exports = router;