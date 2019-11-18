const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuthenticated = require('../auth/isAuthenticated');
const accessDashboard = require('../auth/accessDashboard');
const jwt = require('jsonwebtoken');


// router.all('*', isAuthenticated, accessDashboard);

router.get('/', UserController.getAll);

// router.post('/create', UserController.create);
router.get('/:id', UserController.getOne);
router.put('/:id/update', UserController.update);
router.delete('/:id/delete', UserController.delete);

router.post('/register', UserController.register);

// router.post('/login', passport.authenticate('local-login', {
//     failureRedirect: '/login',
//     failureFlash: true
// }), (req, res, next) => {
//     req.session.save((err) => {
//         if (err) return next(err);
//         res.status(200).json({
//             // message: 'OK',
//             authenticated: true,
//             token: jwt.sign({
//                 sub: req.body.username
//             }, 'nevertheless', {
//                 expiresIn: '60'
//             })
//         });
//     });
// });

router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null
        });
        var token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            auth: true,
            token: token
        });
    });
});

router.get('/logout', function (req, res) {
    res.status(200).send({
        authenticated: false,
        token: null
    });
});

module.exports = router;