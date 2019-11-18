const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/PhotoController');
const isAuthenticated = require('../auth/isAuthenticated');
const accessDashboard = require('../auth/accessDashboard');
const bodyParser = require('body-parser');
const upload = require('../helpers/upload');
const resizeImages = require('../middleware/resizeImages');


// router.all('*', isAuthenticated, accessDashboard);

router.get('/', PhotoController.getAll);

router.post('/create', bodyParser.urlencoded({
        extended: true
    }),
    // set req.params.multerDestinationFolder    
    (req, res, next) => {
        req.params.multerDestinationFolder = 'uploads';
        next();
    },
    upload.any(),
    resizeImages,
    PhotoController.create);

router.get('/:id', PhotoController.getOne);
router.delete('/:id/delete', PhotoController.delete);

module.exports = router;