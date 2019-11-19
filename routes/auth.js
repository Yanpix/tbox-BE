const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../auth/VerifyToken');


router.post('/login', AuthController.login);
router.post('/logout', verifyToken, AuthController.logout);

module.exports = router;