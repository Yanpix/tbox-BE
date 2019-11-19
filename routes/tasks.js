const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const verifyToken = require('../auth/VerifyToken');


router.all('*', verifyToken);
router.get('/', TaskController.getAll);
router.post('/create', TaskController.create);
router.get('/:id', TaskController.getOne);
router.put('/:id/update', TaskController.update);
router.delete('/:id/delete', TaskController.delete);

module.exports = router;