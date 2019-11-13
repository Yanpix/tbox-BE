const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuthenticated = require('../auth/isAuthenticated');
const accessDashboard = require('../auth/accessDashboard');


// router.all('*', isAuthenticated, accessDashboard);

router.get('/', UserController.getAll);

router.post('/create', UserController.create);
router.get('/:id', UserController.getOne);
router.put('/:id/update', UserController.update);
router.delete('/:id/delete', UserController.delete);

module.exports = router;