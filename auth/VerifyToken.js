const CONFIG = require('../config.json');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

function failed(res) {
    return res.status(500).json({
        auth: false,
        message: 'Failed to authenticate token'
    });
}

module.exports = function (req, res, next) {
    let token = req.headers['x-access-token'];
    // console.log("TCL: token", token)
    if (!token) return res.status(401).json({
        auth: false,
        message: 'No token provided'
    });

    jwt.verify(token, CONFIG.JWTSecret, function (err, decoded) {
        if (err) failed(res);

        User.findOne({
                _id: decoded.id
            })
            .then(user => {
                if (user != null) {
                    req.isAuthenticated = true;
                    req.user = user;
                    next();
                } else {
                    failed(res);
                }
            })
            .catch(err => {
                console.log("TCL: err", err.message)
                failed(res);
            })
    });
}