const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/NewsController');
const verifyToken = require('../auth/VerifyToken');


router.all('*', verifyToken);
router.get('/', NewsController.getAll);


module.exports = router;