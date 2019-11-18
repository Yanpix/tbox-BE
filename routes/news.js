const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/NewsController');
const isAuthenticated = require('../auth/isAuthenticated');
const accessDashboard = require('../auth/accessDashboard');


// router.all('*', isAuthenticated, accessDashboard);

router.get('/', NewsController.getAll);


module.exports = router;