const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const upload = require('../helpers/upload');
const CONFIG = require('../config.json');
const UserController = require('../controllers/UserController');
const verifyToken = require('../auth/VerifyToken');


router.get('/', verifyToken, UserController.getAll);
router.post('/register', bodyParser.urlencoded({
        extended: true
    }),
    // set req.params.multerDestinationFolder    
    (req, res, next) => {
        req.params.multerDestinationFolder = CONFIG.userProfilePictureUploadDir;
        next();
    },
    upload.single('picture'),
    UserController.register);

router.get('/:id', verifyToken, UserController.getOne);
router.put('/:id/update', verifyToken, UserController.update);
router.delete('/:id/delete', verifyToken, UserController.delete);

module.exports = router;