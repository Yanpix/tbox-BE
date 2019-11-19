const CONFIG = require('../config.json');
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/PhotoController');
const verifyToken = require('../auth/VerifyToken');
const bodyParser = require('body-parser');
const upload = require('../helpers/upload');
const resizeImages = require('../middleware/resizeImages');


router.all('*', verifyToken);
router.get('/', PhotoController.getAll);
router.post('/create', bodyParser.urlencoded({
        extended: true
    }),
    // set req.params.multerDestinationFolder    
    (req, res, next) => {
        req.params.multerDestinationFolder = CONFIG.photoUploadDir;
        next();
    },
    upload.any(),
    resizeImages,
    PhotoController.create);

router.get('/:id', PhotoController.getOne);
router.delete('/:id/delete', PhotoController.delete);

module.exports = router;