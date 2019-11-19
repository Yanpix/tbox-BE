const express = require('express');
const router = express.Router();
const SportsController = require('../controllers/SportsController');

router.get('/getLosers', SportsController.parse);

module.exports = router;