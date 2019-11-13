const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const isAuthenticated = require('../auth/isAuthenticated');
const accessDashboard = require('../auth/accessDashboard');


// router.all('*', isAuthenticated, accessDashboard);

router.get('/', TaskController.getAll);

router.post('/create', TaskController.create);
router.get('/:id', TaskController.getOne);
router.put('/:id/update', TaskController.update);
router.delete('/:id/delete', TaskController.delete);

module.exports = router;