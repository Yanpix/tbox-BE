const CONFIG = require('../config.json');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


module.exports.login = function (req, res) {
    let name = req.body.name;
    let pass = req.body.password;

    if (name == null || pass == null) {
        return res.status(403).json({
            auth: false,
            token: null
        });
    }

    User.findOne({
        name: name
    }, function (err, user) {
        if (err) return res.status(500).json('Error on the server.');
        if (!user) return res.status(400).json('No user found.');
        if (!user.passwordIsValid(pass)) return res.status(403).json({
            auth: false,
            token: null
        });
        let token = jwt.sign({
            id: user._id
        }, CONFIG.JWTSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.json({
            auth: true,
            token: token,
            user
        });
    });
}

module.exports.logout = function (req, res) {
    // let token = req.headers['x-access-token'];
    // console.log("TCL: module.exports.logout -> token", token)
    // console.log("TCL: module.exports.logout -> req", req.isAuthenticated)
    // console.log("TCL: module.exports.logout -> req", req.user)

    res.json({
        auth: false,
        token: null
    });
}